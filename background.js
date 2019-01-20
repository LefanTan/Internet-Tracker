
//key is url, value is time
var visitedLinks = {};

chrome.tabs.onActivated.addListener(TabActivated);

var currentTime = 0;
var timeSpent = 0;
var startSet;
var endSet;
var currentHostName = "";

function TabActivated(activeInfo){
    if(!CheckIfTracking()){
        return;
    }

    chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
        var url = tabs[0].url;
        if(url == ""){
        }else{
            currentHostName = GetDomain(url);
        }
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

    chrome.storage.sync.set({"visitedLink": visitedLinks}, function() {
        // Notify that we saved.
        console.log('Link data saved');
    });
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

function CheckIfTracking(){
    chrome.storage.sync.get("startSet", function(result){
        if(result.startSet != null){
            startSet = result.startSet;
        }
    });

    chrome.storage.sync.get("endSet", function(result){
        if(result.endSet != null){
            endSet = result.endSet;
        }
    });

    var date = new Date();
    var hour = date.getHours();
    var state = true;
    if(hour >= startSet && hour < endSet){
        state = true;
    }else{
        state =false;
    }

    chrome.storage.sync.set({"trackingState": state}, function(){});

    return state;
    
}