const express = require('express');
const fileUpload = require('./lib/index');
const bodyParser = require('body-parser');
const request = require('request');
const testFolder = './uploads/';
const fs = require('fs');
const app = express()

const apiKey = '*****************';

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());
app.set('view engine', 'ejs')

app.get('/', function (req, res) {

  let filenames = get_files();

  res.render('index', {filelist: filenames, error: null});
})

app.post('/', function (req, res) {

  let sampleFile;
  let uploadPath;

  if (!req.files || Object.keys(req.files).length === 0) {
    res.status(400).send('No files were uploaded.');
    return;
  }

  console.log('req.files >>>', req.files); // eslint-disable-line

  sampleFile = req.files.sampleFile;

  uploadPath = __dirname + '/uploads/' + sampleFile.name;

  sampleFile.mv(uploadPath, function(err) {
    if (err) {
      res.render('index', {filelist: null, error: 'Error, please try again' + err});
    }

    let filenames = get_files();
  
    res.render('index', {filelist: filenames, error: null});
      
  });
});

app.listen(3331, function () {
  console.log('Example app listening on port 3331!')
})


function get_files(argument) {
  let filenames = [];

  fs.readdirSync(testFolder).forEach(file => {
    //console.log(file);
    filenames.push(file);
  });

  return filenames;
}
