//****************Username,Loggain,loggaut************//


window.addEventListener('load', function(){
	
	
	
	
	// hämta elementer
	
let inputName  = document.getElementById('name');
let efterNamn = document.getElementById('name2');
let btnLoggaIn = document.getElementById('loggain');
let btnLoggaUt = document.getElementById('loggaut');
let meddelande = document.getElementById('message');
let msm = document.getElementById('comment');
let btnSend = document.getElementById('send');
let chat = document.getElementById('chatMe');
let btnGitHub = document.getElementById('gitHub');
let btnGitUt = document.getElementById('git');
let btnKlick = document.getElementById('klick');
let bild = document.getElementById('bild');
let zeena = document.getElementById('zeena');
let btnSort = document.getElementById('sortera');
let chatMeNamn = document.getElementById('chatMeNamn');
let btnMedd = document.getElementById('sorteraMedd');
let btnDat = document.getElementById('sorteraDat');
 btnLoggaUt.style.display = "none";
 btnGitUt.style.display = "none";
 msm.style.display = "none";
 chat.style.display = "none";
 btnSend.style.display = "none";
 btnKlick.disabled = true;
 chatMeNamn.style.display = "none";

	
	
	// testa
	
//console.log('html element:',inputName, btnLoggaIn, btnLoggaUt); 

	
	
	
	// logga in button
	 btnLoggaIn.addEventListener('click', function(){

     localStorage.setItem("username", inputName.value);
	 zeena.innerHTML ="Du är inloggad som " + inputName.value;
	 inputName.style.display = "none";
	 efterNamn.style.display = "none";
	 meddelande.innerHTML = "Välkommen hit " +  inputName.value + " " + efterNamn.value;
	 btnLoggaIn.style.display = "none";
	 btnLoggaUt.style.display = "inline";
	 msm.style.display = "inline";
	 chat.style.display = "inline";
	 btnSend.style.display = "inline";
	 
	 });
	

	
	
	
	
	// logga ut button
	
	 btnLoggaUt.addEventListener('click', function(){
     localStorage.removeItem("username");
	 inputName.style.display = "none";
	 efterNamn.style.display = "none";
	 btnLoggaUt.style.display = "inline";	
	 btnLoggaUt.style.display = "none";	
	 meddelande.innerHTML = "Tack för besöket " + inputName.value + " " + efterNamn.value;
	 btnLoggaIn.style.display = "inline";
	 btnLoggaUt.style.display = "none";
	 msm.style.display = "none";
	 chat.style.display = "none";
	 btnSend.style.display = "none";
	 
	 });
	
	
	//send message,,firebase
	
	
	btnSend.addEventListener('click', function(){
		chatMe.innerHTML="";	
		firebase.database().ref('inputMessage/').push({
			name: localStorage.getItem('username'), // inputName.value,
			name2: '',//efterNamn.value, 
			message: comment.value,
			postDate: day + "/" + month + "/" + year,
			postTime: hours + ":" + minutes + " " + suffix

		})

		message.value="";
	});
	
	
	//visa innehållet i database
	
	firebase.database().ref('inputMessage/').on('value', function(snapshot){
	 let dataobject = snapshot.val();
	 for(let x in dataobject){
		 let li = document.createElement('li');
		 //console.log('data', dataobject[x]);
		 li.innerHTML = dataobject[x].name + " " + dataobject[x].name2 + " : " + dataobject[x].message + " ," + dataobject[x].postDate + "," + dataobject[x].postTime;
		 
		 
		 
		 
		 // För att få meddelanden att hamna längst up
		 chatMe.insertBefore(li, chatMe.firstChild);
		 
	 }
		
	
	//console.log(snapshot.val());
	});
	
	
	
	// date 
	var currentDate = new Date(),
      day = currentDate.getDate(),
      month = currentDate.getMonth() + 1,
      year = currentDate.getFullYear();
    //console.log(day + "/" + month + "/" + year)
	
	  
	  
	  //time
	var  currentTime = new Date(),
      hours = currentTime.getHours(),
      minutes = currentTime.getMinutes();

	if (minutes < 10) {
	 minutes = "0" + minutes;
  }

	var suffix = "AM";
	if (hours >= 12) {
    suffix = "PM";
    hours = hours - 12;
	}
	if (hours == 0) {
	 hours = 12;
	}

	//console.log(hours + ":" + minutes + " " + suffix)
	
	
	
	
	
	
	// logga in med github
	
	
	let provider = new firebase.auth.GithubAuthProvider(); // Ett objekt för att hantera GitHub-autentisering
	btnGitHub.addEventListener('click', function(){
		firebase.auth().signInWithPopup(provider).then(function(result) {
			// Om autentisering lyckas, så finns användarinfo i user
			let user = result.user;
            localStorage.setItem("username",user.providerData[0].displayName);  //för att visa namn i meddelande
			
			let bildGit = document.createElement('img');  // för att visa bilden 
			bildGit.style.width = "100px";
			bildGit.style.height = "100px";
			bildGit.setAttribute('src', user.providerData[0].photoURL);
			bild.appendChild(bildGit);
			console.log(user);
		    
			zeena.innerHTML ="Du är inloggad som " + user.providerData[0].displayName;
	        
			
			msm.style.display = "inline";
	        chat.style.display = "inline";
	        btnSend.style.display = "inline";
			btnGitUt.style.display = "inline";
		
		
			if(user.providerData[0].email === 'zeena_aywaz@yahoo.com'){

			   btnKlick.disabled = false;  // slår på ett avstängt element
			}
	       
                 
		});
		console.log(provider);
	});
	
	
	// logga ut med github
	
	btnGitUt.addEventListener('click', function(){
	
	
	  firebase.auth().signOut().then(function(result) {
		         localStorage.clear()
	             window.location.reload();  
		  
		  
		   msm.style.display = "none";
	       chat.style.display = "none";
	       btnSend.style.display = "none";
           btnGitUt.style.display = "none";        })
                .catch(function(error) {
	               console.log('Utloggning misslyckades');
                });

           });
	
	

	
	
	
	
	// sortering efter namn
	
	btnSort.addEventListener('click', function(){	
	
	    let db = firebase.database();
            db.ref('inputMessage/').orderByChild('name').on('value', function(snapshot) {
	           snapshot.val();  // VARNING! Behåller inte sorteringen
	           snapshot.forEach( child => {
		       let objekt = child.val();// objekten kommer i ordning
				   console.log (child.val());
				   
				    chatMeNamn.style.display ="inline";
				    chat.style.display = "none";			   				   

				   let li = document.createElement('li');
		
		 li.innerHTML = objekt.name + " " + objekt.name2 + " : " + objekt.message + " ," + objekt.postDate + "," + objekt.postTime;
		 
		 chatMeNamn.appendChild(li);
	           })
			   
			   
			 
            });

          });	
	
	
	
	
	
	
	// sortering efter meddelande
	
	btnSort.addEventListener('click', function(){	
	
	    let db = firebase.database();
            db.ref('inputMessage/').orderByChild('message').on('value', function(snapshot) {
	           snapshot.val();  // VARNING! Behåller inte sorteringen
	           snapshot.forEach( child => {
		       let objekt = child.val();// objekten kommer i ordning
				   console.log (child.val());
				   
				    chatMeNamn.style.display ="inline";
				    chat.style.display = "none";			   				   

				   let li = document.createElement('li');
		
		 li.innerHTML = objekt.name + " " + objekt.name2 + " : " + objekt.message + " ," + objekt.postDate + "," + objekt.postTime;
		 
		 chatMeNamn.appendChild(li);
	           })
			   
			   
			 
            });

          });	
	
	
	
	
	
	
	
	
	
	
	
	
});  // load