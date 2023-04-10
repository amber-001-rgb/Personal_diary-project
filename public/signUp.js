var http = require('http');
function signIn(){
    document.getElementById("nameField").style.maxHeight="0";
    document.getElementById("title").innerHTML ="Sign In"
    document.getElementById("signupBtn").classList.add("disable");
    document.getElementById("signupBtn").classList.remove("disable");
    var usernameEntered = document.getElementById("emailSpace").value;
    var passwordEntered = document.getElementById("passwordSpace").value;
    
    var toBeSent = JSON.stringify({
        "usernameSent": usernameEntered,
        "passwordSent": passwordEntered
    })   
    
    /**$.post("/signIn",toBeSent, (ret)=>{
        if(ret == true){
            alert("ncis")
        }else{

        }
    })**/
    alert(usernameEntered + " " + passwordEntered)
}

function signUp(){
    document.getElementById("nameField").style.maxHeight = "60px";
    document.getElementById("title").innerHTML = "Sign Up"
    document.getElementById("signupBtn").classList.add("disable");
    document.getElementById("signupBtn").classList.remove("disable");
    var usernameEntered = document.getElementById("emailSpace").value;
    var passwordEntered = document.getElementById("passwordSpace").value;
    
    
    var toBeSent = JSON.stringify({
        usernameSent: usernameEntered,
        passwordSent: passwordEntered
    })


    $.post("/signUp",toBeSent,function aftsignIn(ret){
        if(ret){
            alert("cnja")
        }else{

        }
    })
    alert(usernameEntered + " " + passwordEntered)
}



