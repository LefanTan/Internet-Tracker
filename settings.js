document.getElementById("emailSubmit").addEventListener("click", UserAddress);

function UserAddress(){
    var userEmail = document.getElementById("email").value;
	chrome.storage.sync.set({"email": userEmail}, function() {
                console.log('email updated');
              }); 
}

document.getElementById("changepass").addEventListener("click", PassChange);

function PassChange(){
    var userOldInput = document.getElementById("OldPassword").value;
	var userNewInput = document.getElementById("NewPassword").value;
	
    chrome.storage.sync.get("pass", function(result){
        if(result.pass == userOldInput){
              chrome.storage.sync.set({"pass": userNewInput}, function() {
                // Notify that we saved.
                console.log('password saved');
				alert("Password Changed");  
              });
        }else{
            alert("Wrong Password, try again");  
        }
    })
}