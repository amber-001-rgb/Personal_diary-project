let signinSignout = 0;
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
    fetch('/signinServer',options).then(res=>{

    })
}

function signUp(){
    document.getElementById("nameField").style.maxHeight = "60px";
    document.getElementById("title").innerHTML = "Sign Up"
    document.getElementById("signupBtn").classList.add("disable");
    document.getElementById("signupBtn").classList.remove("disable");
    var usernameEntered = document.getElementById("emailSpace").value;
    var passwordEntered = document.getElementById("passwordSpace").value;
    
    if(usernameEntered.length>7 && passwordEntered.length>7 && Name > 0){
        if(signinSignout == 0){
            var nameEntered = document.getElementById("nameSpace").value;
            var toBeSent = JSON.stringify({usernameEntered,passwordEntered,nameEntered})
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
        if(res == "emailIsTaken"){
            var err = document.getElementById("emailerror")
            err.style.visibility = "visible"
        }else{
            //alert("changing")
            //window.open('localhost:3000/diary')
        }
    })
}  
