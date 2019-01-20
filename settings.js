document.getElementById("emailSubmit").addEventListener("click", Submit);

function UserAddress(){
    var userEmail = document.getElementById("email").value;
	chrome.storage.sync.set({"email": userEmail}, function() {
                console.log('email updated');
              }); 
}
