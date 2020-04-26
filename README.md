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

/user

POST

Create new user.
{"email":"example@email.com", "name":"Fred Smith", "time":"1800", "test_id":"1"}
test_id is optional, will default to test id 1
Time is optional, will default to 1800
Returns user object.
GET

Get all registered users, including deleted ones.
No request data
Returns array of user objects.
GET

Find specific registered user.
Send users email as a GET parameter using the key of email.
Returns user object.
/user/delete/{userID}
