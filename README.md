# meater_test_node
Tasty Treats Newsletter Signup

I have used node.js with express as the web server, pug.js as the html templating engine,
SCSS for the css preprocessor gulp to manage the project and finally type script for the 
front end logic.

I decided not to use too many libraries or node modules so that I could show that I understood
what is happening under the hood. Other options for bot protection would have been captcha and
two factor authentiation.

Local setup

Clone this Repo

Run: - npm install - from the root of this project.

Run: - npm start - DO NOT CLOSE THIS TAB OR TURN THE SERVER OFF

Routes

for local development use localhost:7000/ as your URL

/

GET

Route to display the enquiry page

/admin

GET

Route to display the admin page containing all enquiries

/files

POST

Route to create a new enquiry file on the server. 
Uses JSON in the format: {name: '', email: '', message: '', newsletterWanted: boolean, testQuestion: '', honeyPot: ''}
Returns a success message.
