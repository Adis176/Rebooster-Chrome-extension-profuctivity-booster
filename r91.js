//alert("Start");

setInterval(update_word_blurw, 1000);

function update_word_blurw(){
    chrome.tabs.query({}, function (tabs) {
        for (var i = 0; i < tabs.length; i++) {
            chrome.tabs.executeScript(tabs[i].id, {file: "r9_c1.js"});
        }
    });
};


//alert("Start2");