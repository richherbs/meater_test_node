const express = require("express");
const fs = require("fs");
const app = express();
const EMAILADDRESS = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;

/**
 * Read all files within a directory and return an array with the contents
 * of the files as JSON objects.
 * @param {string} aDirectory
 */
const readFiles = (aDirectory) => {
  let someFileNames = fs.readdirSync(aDirectory);
  let someFiles = [];
  someFileNames.forEach((file) => {
    someFiles.push(JSON.parse(fs.readFileSync(`files/${file}`)));
  });
  return someFiles;
};

/**
 * Returns true if a string matches a regular expression else false
 * @param {Object} anEnquiry
 * @param {RegEx} aRegex
 */
const checkRegex = (anEnquiry, aRegex) => {
  let email = sanitiseInput(anEnquiry.email);
  return aRegex.test(email);
};

/**
 * Return true if the answer to the challenge question was correct
 * else false
 * @param {Enquiry} anEnquiry
 */
const checkTestQuestion = (anEnquiry) => {
  let testQuestion = sanitiseInput(anEnquiry.testQuestion);
  return testQuestion === "white";
};

/**
 * Return true if the honeyPot field is blank
 * @param {Object} anEnquiry
 */
const checkHoneyPot = (anEnquiry) => {
  return anEnquiry.honeyPot === "";
};

/**
 * Take a string and return the result of removing white space
 * and the characters all lower case
 * @param {string} aString
 */
const sanitiseInput = (aString) => {
  let result = aString.toLowerCase();
  result = result.replace(/\s/g, "");
  return result;
};

app.use(express.json());
app.use(express.static(__dirname + "/dist"));

app.set("view engine", "pug");

app.get("/", (req, res) => {
  res.render("index", {
    title: "Tasty Treats: Newsletter Signup",
  });
});

app.post("/files", (req, res) => {
  let enquiry = req.body;

  if (checkRegex(enquiry, EMAILADDRESS)) {
    if (checkTestQuestion(enquiry)) {
      if (checkHoneyPot(enquiry)) {
        fs.appendFile(
          `files/enquiry_${req.body.time}`,
          JSON.stringify(enquiry),
          (err) => {
            if (err) throw err;
          }
        );
        res.send("success");
      } else {
        res.send("honey");
      }
    } else {
      res.send("test");
    }
  } else {
    res.send("email");
  }
});

app.get("/admin", (req, res) => {
  let filesObjectData = {
    title: "Tasty Treats: Admin Page",
  };

  filesObjectData.enquiries = readFiles("files/");

  res.render("admin", filesObjectData);
});

const server = app.listen(7000, () => {
  console.log(`Express running → PORT ${server.address().port}`);
});
