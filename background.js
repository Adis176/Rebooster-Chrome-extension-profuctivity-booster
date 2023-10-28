setInterval(()=>{
    // Fetching current active tab 
    chrome.windows.getLastFocused({ populate: true }, function(currentWindow) {
        
        if (currentWindow.focused) {
            let activeTab = currentWindow.tabs.find(t => t.active === true);
            
            // Redirecting back the page removed from blacklist
            redirectBack(activeTab);

            // Managing Current active tab in storage
            chrome.storage.local.get({tabs:[]},(result)=>{
                let arr = result.tabs;
                let tab = arr.find(t=> t.domain === getHostName(activeTab.url));
                chrome.storage.local.get({allTabs:[]},(res)=>{
                    let allArr = res.allTabs;
                    let alltab = allArr.find(t => t.domain === getHostName(activeTab.url));
                    chrome.browserAction.setBadgeText({text: ''});
                    if(tab){
                        showBadge(tab.limit,tab.counter);
                        showNotification(tab.limit);
                        counterAndLimitManager(tab);
                        faviconValidator(tab,activeTab);
                        blacklistAndStorageUpdate(tab,arr);
                        alltab.counter++;
                        faviconValidator(alltab,activeTab);
                        chrome.storage.local.set({allTabs:allArr}, ()=> {});
                    } else {
                        if(alltab){
                            alltab.counter++;
                            faviconValidator(alltab,activeTab);
                            chrome.storage.local.set({allTabs:allArr}, ()=> {});
                        } else {
                            let alldomain = getHostName(activeTab.url);
                            let allfavicon = activeTab.favIconUrl;
                            if(isValidUrl(activeTab.url)){
                                let tb = new Tab(alldomain,allfavicon,0);
                                tb.blacklist = false;
                                tb.limit = -1;
                                faviconValidator(tb,{});
                                allArr.push(tb);
                                chrome.storage.local.set({allTabs:allArr},()=>{});
                            }
                        }
                        let domain = getHostName(activeTab.url);
                        let favicon = activeTab.favIconUrl;
                        if(isValidUrl(activeTab.url)){
                            addNewTab(domain,favicon,arr,-1);
                        }
                    }
                    chrome.storage.local.get(['s'], (res)=>{
                        let ss = res.s;
                        if(!ss) ss = 15600;
                        console.log(ss);
                        let time = getTimeLong(ss)
                        let d = new Date();
                        let h = d.getHours();
                        let m = d.getMinutes();
                        if(h == time[0] && m == time[1]){
                            removeData();
                        }
                    });
                });
            });
        }
    });
},1000);


var storage = chrome.storage.local;
setDefault();

function setDefault() 
{
    console.log("Set the default");
    storage.set({"words": ['sex', 'porn']});
    storage.set({"nfsw": ["javatpoint"]});
    storage.set({"clickbait": [
        "tutorialspoint", 
        "collegehumor.com",
        "theblaze.com",
        "iflscience.com",
        "dorkly.com",
        "geeksaresexy.net",
        "zergnet.com",
        "joblo.com",
        "maxim.com",
        "wegotthiscovered.com",
        "cinemablend.com",
        "screenrant.com",
        "news.moviefone.com",
        "moviefone.com",
        "offbeatbride.com",
        "cheezburger.com",
        "cracked.com",
        "wimp.com",
        "new.damn.com",
        "damn.com",
        "metaspoon.com",
        "buzzfeed.com",
        "playbuzz.com",
        "clickhole.com",
        "ijreview.com",
        "zanzle.com",
        "bustle.com",
        "dailymail.co.uk",
        "drudgereport.com",
        "home.ijreview.com",
        "thepoliticalinsider.com",
        "ca.complex.com",
        "collective-evolution.com",
        "themindunleashed.org",
        "naturalnews.com",
        "heritage.org",
        "conservativetribune.com",
        "newsmax.com",
        "tpnn.com",
        "deadspin.com",
        "foodbabe.com",
        "clickhole.com",
        "fortafy-daily.com",
        "taldisparate.net",
        "upworthy.com",
        "positivemed.com",
        "viralchoka.net",
        "moviepilot.com",
        "vh1.com",
        "bitecharge.com",
        "viralfury.com",
        "dailymotion.com",
        "wittyfeed.com",
        "diply.com",
        "tv.bamargera.com",
        "bamargera.com",
        "mytop.fm",
        "clipuri.net",
        "boredomtherapy.com",
        "themighty.com",
        "facebooknow.info",
        "failyfailcenter.com",
        "reshareworthy.com",
        "twistedbeans.com",
        "mobilelikez.com",
        "allyourlolzarebelongtous.com",
        "crafinot.com",
        "hightimes.com",
        "guff.com",
        "bamargeraworld.com",
        "answers.com",
        "all-that-is-interesting.com",
        "ranker.com",
        "oola.com",
        "uproxx.com",
        "odometer.com",
        "cheeserank.com",
        "hellogiggles.com",
        "topix.com",
        "egokick.com",
        "cafemom.com",
        "distractify.com",
        "memes.com",
        "brainjet.com",
        "emgn.com",
        "jokemine.com",
        "good.is",
        "com-news.site",
        "clipd.com",
        "swifty.com",
        "ratemyjob.com",
        "poltell.com",
        "sheldonsfans.com",
        "stuffhappens.us",
        "likes.com",
        "absurdabilia.com",
        "tumblerposts4days.com",
        "vamoslaportugal.com",
        "funnees.com",
        "doidices.com",
        "littlethings.com",
        "movoto.com",
        "canyouactually.com",
        "sliptalk.com",
        "viralnow.net",
        "lolnation.me",
        "omgviral.net",
        "constantlyviral.org",
        "technologyreview.com"]});
}

setInterval(check_siteww, 500);

function block_NFSWWW(){
    chrome.tabs.update({url: "h11.html"})
}

function block_clickbaitww(){
    chrome.tabs.update({url: "h12.html"})
}

function check_siteww() 
{
    chrome.storage.local.get(["nfsw", "clickbait"], function(data) 
    {

        // Gets the data from the local storage
        nfsw = data.nfsw;
        clickbait = data.clickbait;

        chrome.tabs.query({active:true, lastFocusedWindow: true}, tabs => 
        {
            if (tabs.length == 0) return;
            let url = tabs[0].url;


            if (url.includes("h11.html")) return;
            if (url.includes("h12.html")) return;

                // check if nfsw site first.
                for(index=0; index< nfsw.length; index++) 
                {

                    // check if there is a URL and if it should be blocked
                    if (url && url.includes(nfsw[index])) 
                    {
                        // This link shows when wanting to add a link to the blocked list
                        //if (url.includes("settings.html?add_link=" + nfsw[index])) return;

                        // This will update the tab to not go to the blocked URL.
                        block_NFSWWW();
                        return;
                    }
                }

                // check if clickbait.
                for(i=0; i< clickbait.length; i++) 
                {

                    // check if there is a URL and if it should be blocked
                    if (url && url.includes(clickbait[i])) 
                    {
                        block_clickbaitww();
                        return;
                    }
                }
        });
    })
}

