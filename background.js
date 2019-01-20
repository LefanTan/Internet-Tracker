
//key is url, value is time
var visitedLinks = {};

chrome.tabs.onUpdated.addListener(TabUpdated);
chrome.tabs.onActivated.addListener(TabActivated);

var currentTime = 0;
var timeSpent = 0

function TabActivated(activeInfo){

    if(currentTime == 0){
        currentTime = GetTime();
        console.log("CurrentTIme : " + currentTime);
    }else{
        timeSpent = GetTimeSpent(currentTime, GetTime());
        currentTime = 0;
        console.log("Time spent: " + timeSpent);
    }
}

function TabUpdated(tabId,changeInfo,tab){
    var url = tab.url;
    var hostName = GetDomain(url);

    

    for (var key in visitedLinks){
        //console.log(key + "'s amount of time visited: " + visitedLinks[key]);
    }
    //console.log(GetTime());
}


function GetDomain(url){
    var hostname = (new URL(url)).hostname;
    return hostname;
}

function GetTime(){
    var date = new Date();
    var hour = date.getHours();
    var minutes = date.getMinutes();
    //return current time in minutes
    return hour * 60 + minutes;
    //return date.getSeconds();
}

function GetTimeSpent(previousTime, currentTime){
    var timeSpent = currentTime - previousTime;
    return timeSpent;
}