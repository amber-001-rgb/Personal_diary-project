let signinSignout = 0;
let userIndex = -1;
function signIn(){
    document.getElementById("nameField").style.maxHeight="0";
    document.getElementById("title").innerHTML ="Sign In"
    document.getElementById("signupBtn").classList.add("disable");
    document.getElementById("signupBtn").classList.remove("disable");
    
    var usernameEntered = document.getElementById("emailSpace").value;
    var passwordEntered = document.getElementById("passwordSpace").value;
    if(signinSignout == 1){
        var toBeSent = JSON.stringify({usernameEntered,passwordEntered});   
        sendSignIn(toBeSent);
    }
   

    if (signinSignout == 0){
        signinSignout = signinSignout + 1;
    }
    console.log(signinSignout)
}

function sendSignIn(toBeSent){
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: toBeSent
    }
    fetch('/signinServer',options).then(async res=>{
        res = await res.json();
        console.log(res)
        if(res.dataEntries){
            //write code to open diary and plant the diary entries
            openDiary();
            fillEntries(res.dataEntries.text_entry);
        }else {
            if(res.signin0 === "wrongPassword"){
                var err = document.getElementById("emailerror")
                err.style.visibility = "visible"
                err.innerText = "You Have Entered The Wrong Password";
            }else if(res.signin0 === "noUser"){
                var err = document.getElementById("emailerror")
                err.style.visibility = "visible"
                err.innerText = "This email is not registered";
            }
        }
    })
}

function signUp(){
    document.getElementById("nameField").style.maxHeight = "60px";
    document.getElementById("title").innerHTML = "Sign Up"
    document.getElementById("signupBtn").classList.add("disable");
    document.getElementById("signupBtn").classList.remove("disable");
    var usernameEntered = document.getElementById("emailSpace").value;
    var passwordEntered = document.getElementById("passwordSpace").value;
    
    if(usernameEntered.length>7 && passwordEntered.length>7){
        if(signinSignout == 0){
            var nameEntered = document.getElementById("nameSpace").value;
            var questionEntered = document.getElementById("questionSpace").value;
            var toBeSent = JSON.stringify({usernameEntered,passwordEntered,nameEntered,questionEntered})
            sendSignUp(toBeSent)
        }
        if (signinSignout == 1){
            signinSignout = signinSignout - 1;
        }
    }else{
        alert("User And Password Must Contain A Minimum Of 8 Characters")
    }
    console.log(signinSignout)
}
function sendSignUp(toBeSent){  
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: toBeSent   
    }
    fetch('/signupServer',options).then(async res=>{
        res = await res.json()
        console.log(res)
        if(res[0] === "emailIsTaken"){
            var err = document.getElementById("emailerror")
            err.style.visibility = "visible"
        }else{
            openDiary()
        }
    })
}  

function changePassword(){
    
    var question = document.getElementById("questionSpace").value;
    var usernameEntered = document.getElementById("usernameSpace").value;
    var newPassword = document.getElementById("newPasswordSpace").value;
    var toBeSent = JSON.stringify({question,usernameEntered,newPassword})

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: toBeSent   
    }
    fetch('/changePasswordServer',options).then(async res=>{
        res = await res.json()
        returned = res.changepassword
        alert(returned)
       if(returned = "Changed"){
        newurl = "/signUp"
        window.location.replace(newurl)
       }else{
        var err = document.getElementById("questionerror")
        err.innerText = "One (Or More) Of Your Entries Is Wrong"
       }

    })
}

function openDiary(){
    newurl = "/diary"
    window.location.replace(newurl)
}

function fillEntries(entries){
    
}


/**
 * 
 * 
 * START OF  DIARY PAGE JS
 * 
 *
 */


window.onload = () => {
    for(i=0;i<entries.length;i++){
    var form = document.querySelector("#new-task-entry");
    var input = document.querySelector("#content");
    var list_el = document.querySelector("#entries");

    form.onsubmit = (e) => {
        e.preventDefault();
        var entry = input.value
        if(!entry){
            alert("Please make an entry");
            return;
        }
        var entry_el = document.createElement("div");
        entry_el.classList.add("entry");

        var entry_content_el=document.createElement("div");
        entry_content_el.classList.add("content");

        entry_el.appendChild(entry_content_el);

        var entry_input_el = document.createElement("input");
        entry_input_el.classList.add("text")
        entry_input_el.type ="text";
        entry_input_el.value = entry;
        entry_input_el.setAttribute("readonly","readonly");
        entry_content_el.appendChild(entry_input_el);

        var entry_actions_el = document.createElement("div");
        entry_actions_el.classList.add("actions");

        var entry_edit_el = document.createElement("button");
        entry_edit_el.classList.add("edit");
        entry_edit_el.innerHTML="Edit";

        var entry_delete_el = document.createElement("button");
        entry_delete_el.classList.add("delete");
        entry_delete_el.innerHTML="Delete";

        entry_actions_el.appendChild(entry_edit_el);
        entry_actions_el.appendChild(entry_delete_el);

        list_el.appendChild(entry_el);
        entry_el.appendChild(entry_actions_el);
        input.value="";
    }
        entry_edit_el.onclick = () => {
            if(entry_edit_el.innerText.toLowerCase() == "edit")
            {
                entry_input_el.removeAttribute("readonly");
                entry_input_el.focus();
                entry_edit_el.innerText ="Save";
            } else
            {
                entry_input_el.setAttribute("readonly","readonly");
                entry_edit_el.innerHTML="Edit";
            }

        };
        entry_delete_el.onclick = () =>{
            list_el.removeChild(entry_el)
        };

    };
};

function changeFont(font) {
    document.getElementById('content').style.fontFamily = font.value;
}

function changeSize(size) {
    document.getElementById('content').style.fontSize = size.value + 'px';
}

function Bold(){
    var bol=document.getElementById('content').style.fontWeight;
    if(bol=='normal'){
        document.getElementById('content').style.fontWeight="bold";
    }
    else{
        document.getElementById('content').style.fontWeight='normal';
    }
}

function Italic(){
    var ital=document.getElementById('content').style.fontStyle;
    if(ital=='normal'){
        document.getElementById('content').style.fontStyle="italic";
    }
    else{
        document.getElementById('content').style.fontStyle='normal';
    }
}

function Underline(){
    var under=document.getElementById('content').style.textDecoration;
    if(under=='none'){
        document.getElementById('content').style.textDecoration="underline";
    }
    else{
        document.getElementById('content').style.textDecoration='none';
    }
}
