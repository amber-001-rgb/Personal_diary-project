const express = require('express');
const morgan = require('morgan');

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
    res.sendFile('./views/diary.html', {root: __dirname})
})

app.get('/', (req, res) =>{    
    res.sendFile('./views/signUp.html', {root: __dirname})
})

// 404 page
app.use((req, res) =>{
    res.status(404).sendFile('./views/404.html', {root: __dirname})
})

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


