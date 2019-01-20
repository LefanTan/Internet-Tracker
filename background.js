
//key is url, value is time
var visitedLinks = {};

chrome.tabs.onUpdated.addListener(TabUpdated);
chrome.tabs.onActivated.addListener(TabActivated);

var currentTime = 0;
var timeSpent = 0

var isTracking = true;

var currentHostName = "";

chrome.storage.sync.get("trackingTime", function(result){

});

function TabActivated(activeInfo){
    chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
        var url = tabs[0].url;
        currentHostName = GetDomain(url);
    });

    if(currentTime == 0){
        currentTime = GetTime();
        //console.log("CurrentTIme : " + currentTime);
    }else{
        timeSpent = GetTimeSpent(currentTime, GetTime());
        currentTime = GetTime();
        //console.log("Time spent: " + timeSpent);
    }

    if (currentHostName in visitedLinks){
        visitedLinks[currentHostName] += timeSpent;
    }else{
        visitedLinks[currentHostName] = timeSpent;
    }

    //for debugs
    if(visitedLinks){
        for (var key in visitedLinks){
           // console.log(key + "'s amount of time: " + visitedLinks[key]);
        }
    }

    chrome.storage.sync.set({"visitedLink": visitedLinks}, function() {
        // Notify that we saved.
        console.log('Link data saved');
    });
}

function TabUpdated(tabId,changeInfo,tab){

}

//domain filter can be implemented here
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