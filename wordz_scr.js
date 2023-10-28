 // get array, for each its element, we first convert to lowercase, then pass

var storage = chrome.storage.local;

update_output();

var in_valo = document.getElementById("iw1");
var de_valo = document.getElementById("dw1");

// unordered list
var print_w = document.getElementById("wordsw");

var input_bw1 = document.getElementById("bw1");
input_bw1.addEventListener("click", add_wordsw);

var input_bw2 = document.getElementById("bw2");
input_bw2.addEventListener("click", delete_wordsw);

var input_bw3 = document.getElementById("print_wordsw");
input_bw3.addEventListener("click", getw_lis);

function update_output()
{
    storage.get("words", function(data)
    {
        // create a new list
        var listww = document.createElement('ul');

        // takes list from local data and save it to the new list.
        for(index in data.words)
        {
            var listItem = document.createElement('li');
            listItem.innerText= data.words[index];

            listww.appendChild(listItem);
        }

        // set the inner html to the new list.
        print_w.innerHTML = listww.innerHTML;
        if(print_w.style.display == "block"){
            print_w.style.display = "none";
            input_bw3.innerHTML = "SHOW WORDS";
        }
    });
}

function add_wordsw(){
    var inputValuew = in_valo.value;
    inputValuew = inputValuew.toLowerCase();
    console.log("<Attempting to add '" + inputValuew);
    // alert("entering: " + inputValuew);

    // in the case that a user tries to add undefined value.
    if(inputValuew == 0) 
    {
        alert("This is empty!");
        return;
    }
    
    storage.get("words", function(xw)
    {
        // checks if its already in the list.
        for(i in xw.words) {
            if(xw.words[i] == inputValuew) {
                alert("It is already in the list!");
                return;
            }
        }

        // if not, push it into the list
        new_words = xw.words;
        new_words.push(inputValuew);

        // save it into the local storage.
        storage.set({"words": new_words});
        // alert("<Successfully added '" + inputValuew);
        update_output();
        reloadww();
    });   
}

function delete_wordsw(){

    var deleteValuew = de_valo.value;
    deleteValuew = deleteValuew.toLowerCase();
    // alert("<Attempting to delete " + deleteValue);

    // if input was empty, 
    if(deleteValuew == 0) 
    {
        alert("This is empty!");
        return;
    }

    storage.get("words", function(xw)
    {
        // go through all of the links
        for(i in xw.words) 
        {
            // if found,
            if(xw.words[i] == deleteValuew) 
            {
                // delete it from the list
                xw.words.splice(i,1);
                console.log("<Successfully deleted '" + deleteValuew);
                
                //saved it into the local storage.
                storage.set({"words": xw.words});
                console.log(xw.words);
                update_output();
                reloadww();
                return;
            }
        }
        alert("Input entered not found in list !");
    });
}

function getw_lis(){
    if (print_w.style.display === "none") 
    {
        print_w.style.display = "block";
        input_bw3.innerHTML = "HIDE WORDS";
    } 
    else 
    {
        print_w.style.display = "none";
        input_bw3.innerHTML = "SHOW WORDS";
    }
}

var scan_doc = document.getElementById("scan_w");
scan_doc.addEventListener("click", scanningw);

function scanningw(){
    var arr = ["sex", "AnD"]
    for (var i = 0; i < arr.length; i++){
        replaceText(document.body, arr[i].toLowerCase())
    }
}




function replaceText(element, str)
{
    if( element.hasChildNodes())
    {
        //element.childNodes.forEach(replaceText)
        var arr = Array.from(element.childNodes)
        for(var i=0; i<arr.length; i++){
            replaceText(arr[i], str)
        }
    }
    else if (element.nodeType === Text.TEXT_NODE)
    {
        if(element.textContent.toLowerCase().match(str))
        {
            //color the blocked word
            // const newElement = document.createElement('span')
            // newElement.innerHTML = element.textContent.replace(/(sex|porn)/gi,
            // '<span style="background-color: black; color:black">$1</span>'
            // )
            // element.replaceWith(newElement)

            //to remove the blocked word
            //element.parentElement.remove()

            //to change word to no
            element.textContent = element.textContent.toLowerCase().replace(str,'***')

            //to animate word
            //     const newElement = document.createElement('span')
            //     newElement.innerHTML = element.textContent.replace(/(sex|porn)/gi,
            //     '<span class="rainbow">$1</span>'
            //     )
            //     element.replaceWith(newElement)

            //to paragraph
            //element.parentElement.style.color ='black'
            //     element.parentElement.style.backgroundColor = 'black'
        }
            
    }
} 


function reloadww(){
    chrome.tabs.getAllInWindow(null, function(tabs) {
        for(var i = 0; i < tabs.length; i++) {
            chrome.tabs.update(tabs[i].id, {url: tabs[i].url});
        }
    }); 
}