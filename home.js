var visitedLinkData = {};
var totalTimeSpent = 0;
var topFour = {};

chrome.storage.sync.get("visitedLink", function(result) {
    visitedLinkData = result.visitedLink;

    for(key in visitedLinkData){
        totalTimeSpent += visitedLinkData[key];
    }

    document.getElementById("timeSpent").innerHTML = GetTimeString(totalTimeSpent);
 });
 
 function GetTimeString(minutes){
     var hours = Math.floor(minutes/60);
     var remainingMinutes = minutes - hours*60;

     if(hours == 0){
        var time = remainingMinutes + " minutes";
        return time;
     }

     var time = hours + " hours " + remainingMinutes + " minutes";
     return time;
 }

