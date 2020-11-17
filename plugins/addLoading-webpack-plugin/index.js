class addLoadingPlugin {
  constructor (options) {
    this.options = Object.assign({
      className: 'loading-wrapper',
      id: 'loading',
      autoRemove: true
    }, options)
    const { className, id, autoRemove } = this.options
    this.id = id
    this.autoRemove = autoRemove
    this.html = this.defaultHtml(className)
    this.css = this.defaultCss(className)
  }
  addFileToWebpackOutput(compilation, filename, fileContent) {
    compilation.assets[filename] = {
      source: () => {
        return fileContent
      },
      size: () => {
        return Buffer.byteLength(fileContent, 'utf8')
      }
    }
  }
  defaultHtml (className) {
    return (
      `
      <div id="${this.id}" class="loading-mask">
        <div class="${className}">
        </div>
      </div>
      `
    )
  }
  defaultCss (className) {
    return (
      `
      .loading-mask {
        position: fixed;
        z-index: 9999;
        background-color: rgba(255,255,255,0.8);
        margin: 0;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 100%;
        transition: opacity 0.3s;
        text-align: center;
        line-height: 100vh;
      }
      .${className} {
        background-color: rgba(62,127,238,75%);
        animation: rectangle 1.2s infinite ease-in-out;
        display: inline-block;
        width: 40px;
        height: 40px;
        color: inherit;
        vertical-align: middle;
        pointer-events: none;
      }
      @keyframes rectangle {
        0% {
            -webkit-transform: perspective(120px) rotateX(0deg) rotateY(0deg);
            transform: perspective(120px) rotateX(0deg) rotateY(0deg);
        }
        50% {
            -webkit-transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg);
            transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg);
        }
        100% {
            -webkit-transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);
            transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);
        }
    }
    `
    )
  }
  apply (compiler) {
    compiler.plugin('emit', (compilation, callback) => {
      for (let file in compilation.assets) {
        if (/\.html$/.test(file)) {
          let htmlStr = compilation.assets[file].source()
          htmlStr = htmlStr.replace('<head>', `
            <head>
              ${this.html}
          `)
          htmlStr = htmlStr.replace('<head>', `
            <head>
              <style type="text/css">
                ${this.css}
              </style>
              <script>
              var loaderFn = function() {
                var $id = document.getElementById("${this.id}")
                if ($id) {
                  $id.parentNode && ($id.parentNode.removeChild($id))
                }
              }
              // 如果有自动移除
              if (${this.autoRemove}) {
                if (!window.addEventListener) {
                  setTimeout(function() {
                    loaderFn()
                  }, 500)
                } else {
                  window.addEventListener('load', loaderFn, false)
                }
              } else {
                // 手动移除
                window.removeLoading = function() {
                  loaderFn()
                }
              }
              </script>
          `)
          this.addFileToWebpackOutput(compilation, file, htmlStr)
        }
      }
      callback()
    })
  }
}

module.exports = addLoadingPlugin
