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
btnLoggaUt.style.display = "none";
	
	
	// testa
	
//console.log('html element:',inputName, btnLoggaIn, btnLoggaUt); 

	
	
	
	// logga in button
	
	 btnLoggaIn.addEventListener('click', function(){
     localStorage.setItem("username", inputName.value);
	 inputName.style.display = "none";
	 efterNamn.style.display = "none";
	 meddelande.innerHTML = "Välkommen hit " +  inputName.value + " " + efterNamn.value;
	 btnLoggaIn.style.display = "none";
	 btnLoggaUt.style.display = "inline";
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
	 });
	
	
	//send message
	
	
	btnSend.addEventListener('click', function(){
	chatMe.innerHTML="";	
	firebase.database().ref('inputMessage/').push({
    name: inputName.value,
	name2: efterNamn.value, 
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
	var currentTime = new Date(),
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
	
	
	
	
	
	
	
	
	
});  // load