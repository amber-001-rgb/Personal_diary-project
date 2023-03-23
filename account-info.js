/*
* This is where we store account details (we can only store 10 different amounts,we can maybe change that later if we want)
*/
const accountInfo = [
    {
        email: "",
        password: "",
        name: "",
        id : 0, 
        numOfEntries: 0
    },
    {
        email: "",
        password: "",
        name: "",
        id: 1, 
        numOfEntries: 0
    },
    {
        email: "",
        password: "",
        name: "",
        id: 2, 
        numOfEntries: 0
    },
    {
        email: "",
        password: "",
        name: "",
        id: 3, 
        numOfEntries: 0
    },
    {
        email: "",
        password: "",
        name: "",
        id: 4, 
        numOfEntries: 0
    },
    {
        email: "",
        password: "",
        name: "",
        id: 5, 
        numOfEntries: 0
    },
    {
        email: "",
        password: "",
        name: "",
        id: 6, 
        numOfEntries: 0
    },
    {
        email: "",
        password: "",
        name: "",
        id: 7, 
        numOfEntries: 0
    },
    {
        email: "",
        password: "",
        name: "",
        id: 8, 
        numOfEntries: 0
    },
    {
        email: "",
        password: "",
        name: "",
        id: 9, 
        numOfEntries: 0
    }
];

/*
* This is where we store the entries, the array number corresponds to the id number and thats how we know who has what
* the text and all the time details go on arrays, they have the same array number so we can match the time with text, and pull texts as we want
*/

const diaryEntries = [
    {
        text_entry: [],
        day: [],
        month: [],
        year: [],
        hour: [],  
        minute: []
    },
    {
        text_entry: [],
        day: [],
        month: [],
        year: [],
        hour: [],  
        minute: []
    },
    {
        text_entry: [],
        day: [],
        month: [],
        year: [],
        hour: [],  
        minute: []
    },
    {
        text_entry: [],
        day: [],
        month: [],
        year: [],
        hour: [],  
        minute: []
    },
    {
        text_entry: [],
        day: [],
        month: [],
        year: [],
        hour: [],  
        minute: []
    },
    {
        text_entry: [],
        day: [],
        month: [],
        year: [],
        hour: [],  
        minute: []
    },
    {
        text_entry: [],
        day: [],
        month: [],
        year: [],
        hour: [],  
        minute: []
    },
    {
        text_entry: [],
        day: [],
        month: [],
        year: [],
        hour: [],  
        minute: []
    },
    {
        text_entry: [],
        day: [],
        month: [],
        year: [],
        hour: [],  
        minute: []
    },
    {
        text_entry: [],
        day: [],
        month: [],
        year: [],
        hour: [],  
        minute: []
    }
];
