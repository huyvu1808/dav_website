function validate() {
	var fname = $("#fname").val();
    var lname = $("#lname").val();
 
	var genm = $("#genm").prop("checked"); 
	var genf = $("#genf").prop("checked");
    var geno = $("#geno").prop("checked");

    var email = $("#email").val();
    var pn = $("#pn").val();
    var street = $("#street").val();
    var city = $("#city").val();
    var sp = $("#sp").val();
    var pzc = $("#pzc").val();
    var country = $("#country").val();


    var sid = $("#sid").val(); 
	var pwd1 = $("#pwd1").val(); 
	var pwd2 = $("#pwd2").val(); 

	var errMsg = "";								/* create variable to store the error message */
	var result = true;								/* assumes no errors */
	var pattern = /^[a-zA-Z ]+$/;					/* regular expression for letters and spaces only */

	if (fname == "") {
        errMsg += "<li>First name cannot be empty.</li>";
    }
    
    if (lname == "") {
        errMsg += "<li>First name cannot be empty.</li>";
    }

    /* Rule 1, check if all required date are entered */
	
	if ((!genm)&&(!genf)&&(!geno)) {				//check whether gender is selected
		errMsg += "<li>A gender must be selected.</li>";
	}
	
    if (email == "") {
        errMsg += "<li>Email cannot be empty</li>";
    }

    if (pn == "") {
        errMsg += "<li>Phone number cannot be empty";
    }

    if (street == "") {
        errMsg += "<li>Street cannot be empty";
    }

    if (city == "") {
        errMsg += "<li>City cannot be empty";
    }

    if (sp == "") {
        errMsg += "<li>State/province cannot be empty";
    }

    if (pzc == "") {
        errMsg += "<li>Postal/zip code cannot be empty";
    }




	if (sid == "") {								//check whether User ID is empty
		errMsg += "<li>User ID cannot be empty.</li>";
	}
	if (pwd1 == "") {								//check whether Password is empty
		errMsg += "<li>Password cannot be empty.</li>";
	}
	if (pwd2 == "") {								//check whether re-typed Password is empty
		errMsg += "<li>Retype password cannot be empty.</li>";
	}

	/* Rule 2, check if the user ID contains an @ symbol */
	if (sid.indexOf('@') == 0 ) {
		errMsg += "<li>User ID cannot start with an @ symbol.</li>";
	}
	if (email.indexOf('@') < 0 ) {
		errMsg += "<li>Email must contain an @ symbol.</li>";
	}
	
	/* Rule 3, check if password and retype password are the same */
	if (pwd1 != pwd2) {
		errMsg += "<li>Passwords do not match.</li>";
	}
	
	/* Rule 4, check if user name contains only letters and spaces */
	if (! uname.match (pattern)) {
		errMsg += "<li>User name contains symbols.</li>";
	}

	/* Display error message any error(s) is/are detected */
	if (errMsg != "") { 
		errMsg =   "<div id='scrnOverlay'></div>"                     
			+ "<section id='errWin' class='window'><ul>"     
		   + errMsg                        
			+  "</ul><a href='#' id='errBtn' class='button'>Close</a></section>"; 
		 
		var numOfItems = ((errMsg.match(/<li>/g)).length) + 15;    
		 
		$("body").after(errMsg);       
		$("#scrnOverlay").css('visibility', 'visible');   
		$("#errWin").css('height', numOfItems.toString() + 'em'); 
		$("#errWin").css('margin-top', (numOfItems/-2).toString() + 'em'); 
		$("#errWin").show();       
		$("#errBtn").click (function () {      
				$("#scrnOverlay").remove();    
				$("#errWin").remove(); 
			  }  ); 
		 
		result = false; 
	   }
	}

   /* link HTML elements to corresponding event function */ 
	
function init() { 
	$("#registration").submit(validate);/*link function validate() to the submit event 
   of the form */  
}
   
/* link HTML elements to corresponding event function */


/* execute function init() once the window is loaded*/
$(document).ready(init); 