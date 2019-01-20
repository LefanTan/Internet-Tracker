
//key is url, value is time
var visitedLinks = {};

chrome.tabs.onUpdated.addListener(TabUpdated);

function TabUpdated(tabId,changeInfo,tab){
    var url = tab.url;
    var hostName = GetDomain(url);

    if(hostName in visitedLinks){
        visitedLinks[hostName] += 3;
    }else{
        visitedLinks[hostName] = 1;
    } 

    for (var key in visitedLinks){
        console.log(key + "'s amount of time visited: " + visitedLinks[key]);
    }
}


function GetDomain(url){
    var hostname = (new URL(url)).hostname;
    return hostname;
}