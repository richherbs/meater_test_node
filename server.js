const express = require('express');
const app = express();

app.set('view engine', 'pug');

app.use(express.static(__dirname + '/dist/scripts'));

app.get('/', (req, res) => {
  res.render('index');
});

const server = app.listen(7000, () => {
    console.log(`Express running → PORT ${server.address().port}`);
  });