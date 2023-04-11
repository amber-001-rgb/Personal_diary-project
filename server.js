const express = require('express');
const morgan = require('morgan');

// express app
const app = express();

//listen for requests
app.listen(3000)

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

//All User Info Details
var names = [];
var userNames = [];
var passWords = [];


app.post('/signinServer', (req, res)=> {
    console.log("Received A Sign In Request")
    var signin = signIn(req.body) 
    var signin0 = signin[0]
    var signin1 = signin[1]
    dataEntries = returnDiaryEnties(signin1)
    if (signIn[1] <0){
        res.json(signin0)
    }else{
        res.json({signin0,dataEntries})
    }
})
app.post('/signupServer', (req, res)=> {
    console.log("Received A Sign Up Request")
    signUpStatus = signUp(req.body)
    console.log(signUpStatus)
    res.json(signUpStatus);
})

// permanent redirect to signup page
app.use((req, res) =>{
    res.redirect("/signUp")
})

//call these functions when receiving requests from the server
function signIn(req){
    var username = '' + req.usernameEntered;
    var password = '' + req.passwordEntered;
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

function signUp(req){
    var name = '' + req.nameEntered;
    var username = '' + req.usernameEntered;
    var password = '' + req.passwordEntered;

    
    usernameIsTaken = false
    index = 0;
    for(i=0;i<userNames.length;i++){
        if(username.toLowerCase() === userNames[i].toLowerCase()){
            usernameIsTaken = true
            index = i;
        }
    }

    if(usernameIsTaken == false){
        userNames.push(username);
        passWords.push(password);
        names.push(name);
        return ["signedUp", username , password, userNames[index], passWords[index], index]
    }
    return ["emailIsTaken", username , password, userNames[index], passWords[index], index]
}

function addDiaryEntry(i,entry){
    diaryEntries[i].text_entry.push(entry);
}

function removeDiaryEntries(i,entry){
    const index = diaryEntries[i].text_entry.indexOf(entry)
    diaryEntries[i].text_entry.splice(index,1)
}

function returnDiaryEnties(i){
    return diaryEntries[i]
}

//All User Info Details
var names = ["name"];
var userNames = ["password"];
var passWords = ["password"];


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


