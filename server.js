const express = require('express');
const app = express();

app.use(express.static(__dirname + '/dist'));

app.set('view engine', 'pug');

app.get('/', (req, res) => {
  res.render('index', {title : "Tasty Treats: Newsletter Signup"});
});

app.get('/admin', (req, res) => {
  res.render('index');
});

app.get('/files', (req, res) => {
  res.render('admin', {title: "Tasty Treats: Admin Page"});
});



const server = app.listen(7000, () => {
  console.log(`Express running → PORT ${server.address().port}`);
});