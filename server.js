const Vue = require('vue')
const express = require('express')
const { createBundleRenderer } = require('vue-server-renderer')
const bundle = require('./dist/vue-ssr-server-bundle.json')
const clientManifest = require('./dist/vue-ssr-client-manifest.json')
const renderer = createBundleRenderer(bundle, {
  runInNewContext: false,
  clientManifest,
  template: require('fs').readFileSync('./src/index.template.html', 'UTF-8')
})
const app = express()

app.use('/dist', express.static('./dist'))

app.get('*', (req, res) => {
  const context = { url: req.url }

  renderer.renderToString(context, (err, html) => {
    if (err) {
      if (err.code === 404) {
        res.status(404).end('Page not found')
      } else {
        console.log(err)
        res.status(500).end('Internal Server Error')
      }
    } else {
      res.end(html)
    }
  })

})

app.listen(8080)