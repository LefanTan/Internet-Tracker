chrome.storage.sync.get("pass", function(result){
    document.getElementById("Intro").innerHTML = result.pass;
})

document.getElementById("submit").addEventListener("click", Submit);

function Submit(){
    var userInput = document.getElementById("Password").value;
 
    chrome.storage.sync.get("pass", function(result){
        if(result.pass == "" || result.pass == null){
              chrome.storage.sync.set({"pass": userInput}, function() {
                // Notify that we saved.
                console.log('password saved');
              });
        }else{
            chrome.storage.sync.get("pass", function(result) {
               var correctPass = result.pass;
               if(correctPass != userInput){
                    alert("Wrong Password, try again");
                }else{
                    window.location.href = "home.html"
                }
            });   
        }
    })
    

}