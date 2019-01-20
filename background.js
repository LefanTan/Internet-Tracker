var visitedLinks = {};
console.log("tabs[0].url");

var currentUrl = "";

chrome.tabs.onActivated.addListener(NewActive);
chrome.tabs.onUpdated.addListener(TabUpdated);

function NewActive(tab){
    console.log(currentUrl);
}

function TabUpdated(tab){
    currentUrl = tab.url;
}