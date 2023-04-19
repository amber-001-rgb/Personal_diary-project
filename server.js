const express = require('express');
const morgan = require('morgan');

//since this server will be hosgted locally on a pc, it has been specifically designed to host one user at a time
//var currentUser = -1;

// express app
const app = express();

//listen for requests
app.listen(4000)

//middleware and static files
app.use(express.static('public'));
app.use(morgan('dev'));
app.use(express.json({limit: '1mb'}));

//routing requests and webpages
app.get('/signUp', (req, res) =>{
    res.sendFile('./views/signUp.html', {root: __dirname})
})

app.get('/diary', (req, res) =>{
    res.sendFile('./views/maindiary.html', {root: __dirname});
})

app.get('/forgetPassword', (req,res) =>{
    res.sendFile("./views/forgetPassword.html", {root: __dirname})
})

//All User Info Details
//we have hardcoded entries for dev testing, it does not affect the functionality of the code
var names = ["name","name2"];
var userNames = ["username","username2"];
var passWords = ["password","password2"];
var questions = ["answer","answer2"]
var username_length = userNames.length
var passwords_length = passWords.length

function test(username_length, passwords_length ){
    if (username_length === passwords_length) {
        return true;
      } 
    }

function checkUniqueUsernames(userNames, username_length) {
        for (let i = 0; i < username_length; i++) {
          for (let j = i + 1; j < username_length; j++) {
            if (userNames[i] === userNames[j]) {
              return false; // If any two usernames are the same, return false
            }
          }
        }
        return true; // If all usernames are unique, return true
      }

 function checkPasswordLength(passWords, passwords_length) {
        for (let i = 0; i < passwords_length; i++) {
          if (passWords[i].length < 8) {
            return false; // If any password is less than 8 characters, return false
          }
        }
        return true; // If all passwords are at least 8 characters, return true
      }


app.post('/signinServer', (req, res)=> {
    console.log("Received A Sign In Request")
    var signin = signIn(req.body) 
    var signin0 = signin[0]
    var index = signin[1]
    currentUser = index
    dataEntries = returnDiaryEntries(index)
    res.json([signin0])
})

app.post('/signupServer', (req, res)=> {
    console.log("Received A Sign Up Request")
    signUpStatus = signUp(req.body)
    console.log(signUpStatus)
    res.json(signUpStatus);
})

app.post('/changePasswordServer', (req, res)=>{
    var changepassword = changePassword(req.body)
    console.log(changepassword,passWords[0])
    res.json({changepassword})
})

// permanent redirect to signup page
app.use((req, res) =>{
    res.redirect(308, '/signUp')
});

function changeCurrentUser(num){
    currentUser = num;
}

/*
*
*call these functions when receiving requests from the client
*
*/

//we call on this function to sign in clients
function signIn(req){
    //we take in the values from the object and place them in variables 
    var username = '' + req.usernameEntered;
    var password = '' + req.passwordEntered;
    //we use the index variable to identify the user if they are eventually signed in
    let index;
    usernameExists = false
    for(i=0;i<userNames.length;i++){
        if(username.toLowerCase() === userNames[i].toLowerCase()){
            index = i;
            usernameExists = true;
            if(password === passWords[i]){
                return ["signedIn",i]
            }else{
                return ["wrongPassword", -1]
            }
        }
    }
    if(usernameExists == false){
        return ["noUser",-1]
    }
}

//we call on this function to sign up new accounts
function signUp(req){
    //we take in the values from the object and place them in variables 
    var name = '' + req.nameEntered;
    var username = '' + req.usernameEntered;
    var password = '' + req.passwordEntered;
    var question = '' + req.questionEntered;

    //this variable tracks if the username provided is taken
    usernameIsTaken = false
    index = 0;
    //loops throught the usernames array to check if useername provided is taken
    for(i=0;i<userNames.length;i++){
        if(username.toLowerCase() === userNames[i].toLowerCase()){
            usernameIsTaken = true
            index = i;
        }
    }
    //if username is not taken we then assign the provided necessary values to their corresponding array's---
    //-- and then return a string that we interpret on the client side 
    if(usernameIsTaken == false){
        userNames.push(username);
        passWords.push(password);
        names.push(name);
        questions.push(question)
        return ["signedUp"]
    }
    return ["emailIsTaken"]
}
//we call on this function to change a user's password
function changePassword(res){
    //we take in the values from the object and place them in variables 
    username = res.usernameEntered
    question = res.question
    password = res.newPassword
	//we loop through the array of usernames looking for a match, we then check that the security answer----- 
	//-----provided is the same as the one on the server, if so we replace the current password with the new password 
	//we return a string that reflects the status of the process we just underwent 
	//on the client side the string js compatrd and the expected response is provided
    for(i=0;i<userNames.length;i++){
        if(username.toLowerCase() === userNames[i].toLowerCase()){
            if(question.toLowerCase() === questions[i].toLowerCase()){
                passWords[i] = password
                return ["Changed"]
            }else{
                return ["WrongAnswer"]
            }
        }
    }
    return("noUser")


}
//adds entries to the array of text entries 
function addEntry(entry){
    diaryEntries[currentUser].text_entry.push(entry)
}
//removes an exact entry from the entry array of the user provided to it
function removeDiaryEntries(i,entry){
    const index = diaryEntries[i].text_entry.indexOf(entry)
    diaryEntries[i].text_entry.splice(index,1)
}
//returns the array of text entries for one paricular user
function returnDiaryEntries(i){
    return diaryEntries[i];
}
//





// can only contain diary entries for 10 accounts
var diaryEntries = [
    {   text_entry: ["whfevwbuvew","cnno wbobewbvboevwo","ACBOVOWUBEIBIEVUWB"],
    },
    {   text_entry: [],
    },
    {   text_entry: [],
    },
    {   text_entry: [],
    },
    {   text_entry: [],
    },
    {   text_entry: [],
    },
    {   text_entry: [],
    },
    {   text_entry: [],
    },
    {   text_entry: [],
    },
    {   text_entry: [],
    }
];




