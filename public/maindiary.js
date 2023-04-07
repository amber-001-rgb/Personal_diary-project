window.onload = () => {
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
