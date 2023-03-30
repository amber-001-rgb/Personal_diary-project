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

function clearContent() {
    document.getElementById('content').value = '';
}
//this code eill only work when the php is done
/*function saveContent() {
  var content = document.getElementById('content').value;

  // Send content to server using AJAX
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      // Handle response from server (if any)
      console.log(this.responseText);
    }
  };
  xhr.open("POST", "save_content.php", true);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.send("content=" + content);
}

// Attach saveContent() function to "Save" button click event
document.querySelector('input[value="Save"]').addEventListener('click', saveContent);
 */

/*In this example, the saveContent() function is called when the "Save" button is clicked. 
It sends the content of the textarea to a PHP script called save_content.php using an AJAX POST 
request. The content is sent in the request body using the application/x-www-form-urlencoded content
 type. The PHP script would then read the content from the request and save it to a file on the server. 
 The response from the PHP script (if any) is logged to the console for debugging purposes. */