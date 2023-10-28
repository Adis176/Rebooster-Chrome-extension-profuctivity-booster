var btnscrw = document.getElementById("screen_blurwqy");
btnscrw.addEventListener("click", screen_blurz);

var btnscrq = document.getElementById("screen_unblurwqy");
btnscrq.addEventListener("click", screen_unblurz);

function screen_blurz(){
        chrome.tabs.query({}, function (tabs) 
        {
            //for (var i = 0; i < tabs.length; i++) {
                chrome.tabs.insertCSS(tabs[0].url.id, {file: "b41.css"});
                //chrome.tabs.insertCSS(tabs[i].id, {file: "b41.css"});
            //}
        });
    }

function screen_unblurz(){
    {
        chrome.tabs.query({}, function (tabs) 
        {
            //for (var i = 0; i < tabs.length; i++) {
                //chrome.tabs.insertCSS(tabs[i].id, {file: "b42.css"});
                chrome.tabs.insertCSS(tabs[0].url.id, {file: "b42.css"});
            //}
        });
    }
    //alert(3);
}