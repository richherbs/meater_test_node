const express = require('express');
const fs = require('fs');
const app = express();
const EMAILADDRESS = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/

const readFiles = (aDirectory) => {
  let someFileNames = fs.readdirSync(aDirectory);
  someFiles = [];
  someFileNames.forEach((file) => {
    someFiles.push(JSON.parse(fs.readFileSync(`files/${file}`)))
  })
  return someFiles
}

/**
 * Returns true if a string matches a regular expression else false
 * @param aString - an HTMLElement
 * @param aRegex 
 */
const checkRegex = (anEnquiry, aRegex) => {
  let email = anEnquiry.email;
  return aRegex.test(email)
}

const checkTestQuestion = (anEnquiry) => {
  testQuestionAnswer = anEnquiry.testQuestion;
  testQuestionAnswer.toLowerCase();
  testQuestionAnswer.replace();
  return testQuestionAnswer == 'white'
}

const checkHoneyPot = (anEnquiry) => anEnquiry.honeyPot == '';

app.use(express.json());
app.use(express.static(__dirname + '/dist'));

app.set('view engine', 'pug');

app.get('/', (req, res) => {
  res.render('index', {title : "Tasty Treats: Newsletter Signup"});
});

app.post('/files', (req, res) => {
  let enquiry = req.body;
    if(checkRegex(enquiry.email, EMAILADDRESS)){
      if(checkHoneyPot(enquiry) && checkTestQuestion(enquiry)){
        fs.appendFile(`files/enquiry_${req.body.time}`, JSON.stringify(enquiry), (err) => {
          if(err) throw err;
        });
        res.send('success')
      } else {
        res.send('bot')
      }
    } else {
      res.send('email')
    }
});

app.get('/admin', (req, res) => {
  let filesObjectData = {title: "Tasty Treats: Admin Page"};
  
  filesObjectData.enquiries = readFiles('files/');

  res.render('admin', filesObjectData);
});

const server = app.listen(7000, () => {
  console.log(`Express running → PORT ${server.address().port}`);
});