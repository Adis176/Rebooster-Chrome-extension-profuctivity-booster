const displayArea = document.getElementById('displayArea');
const activetab = document.getElementById('activetab');
const options = document.getElementById('options');
const btnAllTime = document.getElementById('btnAllTime');
const btnToday = document.getElementById('btnToday');
const allTDispArea = document.getElementById('allTDispArea');

let currentDomainName;

document.addEventListener('DOMContentLoaded',()=>{
    chrome.windows.getLastFocused({ populate: true }, function(currentWindow){
        if (currentWindow.focused){
            let activeTab = currentWindow.tabs.find(t => t.active === true);
            currentDomainName = getHostName(activeTab.url);
        }
    });
    
    activetab.innerHTML = '';
    displayArea.innerHTML = '';
    chrome.storage.local.get({tabs:[]},(res)=>{
        let arr = res.tabs;
        arr = sortTabs(arr);
        for(let i = 0; i < arr.length; i++){
            if(arr[i].domain === currentDomainName){
                dispCurActiveDomain(arr[i]);
            } else {
                let tab = arr[i];
                let counter = arr[i].counter;
                let timeStr = getTimeStringBig(counter);
                let favicon = tab.favicon;
                let domain = tab.domain;
                let placeholder = tab.limit === 0 ? 'Blacklisted!' : '';
                let htmlc = html(timeStr,placeholder,favicon,domain);
                if(i === (arr.length - 1)){
                    htmlc += '<hr>';
                }
                displayArea.insertAdjacentHTML('beforeend',htmlc);
            }
        }
    });
    

    options.addEventListener('click',()=>{
        if (chrome.runtime.openOptionsPage) {
            chrome.runtime.openOptionsPage();
        } else {
            window.open(chrome.runtime.getURL('options.html'));
        }
    });

    btnAllTime.addEventListener('click',()=>{
        window.open(chrome.runtime.getURL('allTime.html'));
    });

});


var fastez = document.getElementById("fast1");
fastez.addEventListener("click", open_fastz);

function open_fastz(){
    chrome.tabs.create({url: "fastz.html"});
}


var try1 = document.getElementById("try1");
try1.addEventListener("click", tryzw1);

function tryzw1(){
    console.log("TRY  to load sitezw");
    chrome.tabs.query({ currentWindow: true, active: true }, function(tabs) {
        var newURL = tabs[0].url;

        var url =
            'https://developers.google.com/speed/pagespeed/insights/?url=https%3A%2F%2F';

        var newURLL;

        newURLL = url.concat(
            newURL.slice(newURL.indexOf('//') + 2, newURL.indexOf('/', 8) + 1)
        );

        chrome.tabs.create({ url: newURLL });
        });
    return;
}



var w_blockedw = document.getElementById("wblock_w");
w_blockedw.addEventListener("click", createw_blokw);;

function createw_blokw(){
    chrome.tabs.create({url: "wordz_scr.html"});
}