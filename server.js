const express = require('express');
const morgan = require('morgan');
const { send } = require('process');

// express app
const app = express();

//listen for requests
app.listen(3000)

//middleware and static files
app.use(express.static('public'))
app.use(morgan('dev'));

//routing requests and webpages
app.get('/signUp', (req, res) =>{
    res.sendFile('./views/signUp.html', {root: __dirname})
})

app.get('/diary', (req, res) =>{
    res.sendFile('./views/maindiary.html', {root: __dirname});
})

app.get('/', (req, res) =>{    
    res.sendFile('./views/signUp.html', {root: __dirname})
})

app.get('/signIn', (req, res) =>{    
    console.log("cnjds")
    alert("nd na")
})

// 404 page
app.use((req, res) =>{
    res.status(404).sendFile('./views/404.html', {root: __dirname})
})

//call these functions when receiving requests from the server
function signIn(username, password){
    usernameExists = false
    for(i=0;i<userNames.length;i++){
        if(username == userNames[i]){
            usernameExists = true;
            if(password == passWords[i]){
                return "signedIn"
            }else{
                return "wrongPassword"
            }
        }
    }
    if(usernameExists == false){
        return "noUser"
    }
}

function signUp(username, password){
    usernameIsTaken = false
    for(i=0;i<userNames.length;i++){
        if(username == userNames[i]){
            usernameIsTaken = true
        }
    }
    if(usernameIsTaken == false){
        userNames.push(username);
        passWords.push(password);
        return "signedUp"
    }
    return "emailIsTaken"
}

function addDiaryEntry(i,entry){
    diaryEntries[i].text_entry.push(entry);
}

function removeDiaryEntries(i,entry){
    const index = diaryEntries[i].text_entry.indexOf(entry)
    diaryEntries[i].text_entry.splice(index,1)
}

function returnDiaryEnties(i){
    return diaryEntries[i].text_entry
}

//All User Info Details
var userNames = [];
var passWords = [];


// can only contain diary entries for 10 accounts
var diaryEntries = [
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
    },
    {   text_entry: [],
    }
];


