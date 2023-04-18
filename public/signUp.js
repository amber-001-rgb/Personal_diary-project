//this variable tracks if the login page is in the sign in or signout state
var signinSignout = 1;
var signinTracker = false;


function signInClicked(){
    var err = document.getElementById("emailerror")
    err.style.visibility = "hidden"
    document.getElementById("nameField").style.maxHeight="0";
    document.getElementById("questionField").style.maxHeight="0";
    document.getElementById("title").innerHTML ="Sign In"
    document.getElementById("signupBtn").classList.add("disable");
    document.getElementById("signupBtn").classList.remove("disable");

    var usernameEntered = document.getElementById("emailSpace").value;
    var passwordEntered = document.getElementById("passwordSpace").value;
    if(signinSignout === 1){
    signIn(usernameEntered,passwordEntered)
    }else if (signinSignout === 0){
        signinSignout = 1;
    }
}
function signIn(usernameEntered,passwordEntered){
    var toBeSent = JSON.stringify({usernameEntered,passwordEntered});   
    var track = sendSignIn(toBeSent);
    console.log(signinSignout)
    return track;
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

        if(res[0] === "signedIn"){
            signinTracker = true
            openDiary()
        }else {
            signinTracker = false;
            
            var err = document.getElementById("emailerror")
            err.style.visibility = "visible"
            err.innerText = "One (Or More) Of Your Entries Is Wrong";

                //this is used as opposed to the cole below to not give away implicit user information
                /**if(res[0] === "wrongPassword"){
                    var err = document.getElementById("emailerror")
                    err.style.visibility = "visible"
                    err.innerText = "You Have Entered The Wrong Password";
                }else if(res[0] === "noUser"){
                    var err = document.getElementById("emailerror")
                    err.style.visibility = "visible"
                    err.innerText = "This email is not registered";
                }**/
        }
    })
    return signinTracker
}


function signUp(){
    var err = document.getElementById("emailerror")
    err.style.visibility = "hidden"
    document.getElementById("nameField").style.maxHeight = "60px";
    document.getElementById("questionField").style.maxHeight="60px";
    document.getElementById("title").innerHTML = "Sign Up"
    document.getElementById("signupBtn").classList.add("disable");
    document.getElementById("signupBtn").classList.remove("disable");
    var usernameEntered = document.getElementById("emailSpace").value;
    var passwordEntered = document.getElementById("passwordSpace").value;
    var nameEntered = document.getElementById("nameSpace").value;
    var questionEntered = document.getElementById("questionSpace").value;
    if(signinSignout == 0){
        if(usernameEntered.length>7 && passwordEntered.length>7 && nameEntered.length >0 && questionEntered.length > 7){
            
            sendSignUp(usernameEntered,passwordEntered,nameEntered,questionEntered)
            
        }else{
            var err = ""
            if(nameEntered.length < 1){
                err += "Name must contain a character \n"
            }
            if(usernameEntered.length < 8){
                err += "User-Name must contain a minimum of 8 characters \n"
            }
            if(passwordEntered.length <8){
                err += "Password must contain a minimum of 8 characters \n"
            }
            if(questionEntered.length <8){
                err += "Security Response must contain a minimum of 8 characters \n"
            }
            alert(err)
        }
    }else if(signinSignout == 1){
        signinSignout = 0;
    }
    console.log(signinSignout)
}
function sendSignUp(usernameEntered,passwordEntered,nameEntered,questionEntered){  
    var toBeSent = JSON.stringify({usernameEntered,passwordEntered,nameEntered,questionEntered})
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
        if(res.signUpStatus === "emailIsTaken"){
            var err = document.getElementById("emailerror")
            err.style.visibility = "visible"
        }else{
            alert("Your Account has been created, You Will Now Be Redirected")
            signIn(usernameEntered,passwordEntered)
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
       if(returned == "Changed"){
        alert("Your Password Has Been Changed You Will Now Be Redirected")
        newurl = "/signUp"
        window.location.replace(newurl)
       }else{
        var err = document.getElementById("questionerror")
        err.innerText = "One (Or More) Of Your Entries Is Wrong"
       }

    })
}

function Logout(){
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: null   
    }
    fetch('/LogoutUserServer',options)
    signinTracker = false;
    newurl = "/signUp"
    window.location.replace(newurl)
}

function openDiary(){
    newurl = "/diary"
    window.location.replace(newurl) 
    signinTracker = true;
}

function changeUserIndex(i){
    userIndex = i;
}


function showPassword(){
    var x = document.getElementById("passwordSpace");
    if (x.type === "password") {
        x.type = "text";
    } else {
        x.type = "password";
    }
}


/**
 * 
 * 
 * START OF  DIARY PAGE JS
 * 
 *
 */


window.onload = () => {
    var form = document.querySelector("#new-task-entry");
    var input = document.querySelector("#content");
    var list_el = document.querySelector("#entries");

    form.onsubmit = (e) => {
        e.preventDefault();
        var entry = input.value
        if(!entry){
            alert("Please make an entry");
        }
        saveEntry(entry)
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

/** 
function saveEntry(entered){
    entry = JSON.stringify(entered)
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: entry   
        }
        fetch('/addEntryServer',options).then(async res=>{
            console.log(res.body)
        })
}
*/