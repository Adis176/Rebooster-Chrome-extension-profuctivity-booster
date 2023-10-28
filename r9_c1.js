//alert("r9_c1 starts")

var storage = chrome.storage.local;

scanningw();

function scanningw(){
    storage.get("words", function(data)
    {
        for(index in data.words)
        {
            replaceText(document.body, data.words[index]);
        }
    });
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
            element.parentElement.style.color='transparent';
            element.parentElement.style.textShadow='0 0 8px rgba(0,0,0,0.5)';
        }
    }
} 


