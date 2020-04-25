const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

const readFiles = (aDirectory) => {
  let someFileNames = fs.readdirSync(aDirectory);
  someFiles = [];
  someFileNames.forEach((file) => {
    someFiles.push(JSON.parse(fs.readFileSync(`files/${file}`)))
  })
  return someFiles
}

app.use(express.json());
app.use(express.static(__dirname + '/dist'));

app.set('view engine', 'pug');

app.get('/', (req, res) => {
  res.render('index', {title : "Tasty Treats: Newsletter Signup"});
});

app.post('/files', (req, res) => {
  let enquiry = JSON.stringify(req.body);
  fs.appendFile(`files/enquiry_${req.body.time}`, enquiry, (err) => {
    if(err) throw err;
    res.send(req.body);
  });
});

app.get('/admin', (req, res) => {
  let filesObjectData = {title: "Tasty Treats: Admin Page"};
  
  filesObjectData.enquiries = readFiles('files/');

  res.render('admin', filesObjectData);
});

const server = app.listen(7000, () => {
  console.log(`Express running → PORT ${server.address().port}`);
});