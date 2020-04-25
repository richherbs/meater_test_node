const express = require('express');
const app = express();

app.use(express.static(__dirname + '/dist'));

app.set('view engine', 'pug');

app.get('/', (req, res) => {
  res.render('index', {title : "Tasty Treats: Newsletter Signup"});
});

app.get('/files', (req, res) => {
  res.render('admin', {title: "Tasty Treats: Admin Page"});
});

app.get('/admin', (req, res) => {
  res.render('admin', {
    title: "Tasty Treats: Admin Page", 
    inquiries: [
      {time: 1500,
      name: 'Richard Herbert',
      email: 'rich@rich-herbert.com',
      message: 'Hi I would like to order some bagels',
      newsLetterChoice: true},
      {time: 1500,
      name: 'Ben Herbert',
      email: 'ben@rich-herbert.com',
      message: 'Hi I would like to order some bagels',
      newsLetterChoice: false},
      {time: 1500,
      name: 'Will Herbert',
      email: 'will@rich-herbert.com',
      message: 'Hi I would like to order some bagels',
      newsLetterChoice: true}
    ]});
});



const server = app.listen(7000, () => {
  console.log(`Express running → PORT ${server.address().port}`);
});