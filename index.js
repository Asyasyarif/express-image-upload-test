const express = require('express')
const ejsLayouts = require('express-ejs-layouts')
const fileUpload = require('express-fileupload')
const bodyParser = require('body-parser');
const path = require('path')
const app = express()
app.use(fileUpload())
app.use(bodyParser.json());
app.set('view engine', 'ejs')
app.use(ejsLayouts)
app.use(express.static('public'))

app.use(express.urlencoded({ extended: true }))

//routes
app.post('/test', (req, res) => {
  res.json({
    status: "ok"
  })
})

app.get('/', (req, res) => res.render('upload'))
app.post('/uploads', function(req, res) {

    const file = req.files.upload
    if(file){
      let timestamp = Date.now();
      const filePath = path.join(__dirname, 'public', 'images', `${timestamp+"-"+file.name}`)
      try {
        file.mv(filePath, err => {
          if (err) return res.status(500).send(err)

          // res.redirect('/')
        })
      } catch (error) {

      }
      res.json({
        "statue": true,
        "message": "image uploaded successfully"
      });
    }
  })

  app.post('/yiha', function(req, res) {
    // console.log("he%s", req.body)
    timeStamp(req.body)
    res.json({
      "statue": true,
      "message": "image uploaded successfully"
    });
  })

  app.get('/aha', function(req, res) {
    res.json({
      "statue": true,
      "message": "image uploaded successfully"
    });
  })

function timeStamp(message){
    console.log ( '[' + new Date().toISOString() + '] -', message )
}
app.listen(3000)