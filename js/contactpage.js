// Defining a function to display error message
function printError(elemId, hintMsg) {
    document.getElementById(elemId).innerHTML = hintMsg;
}

// Defining a function to validate form 
function validateForm(e) {

    e.preventDefault();

    var URL = "https://juzkz5py88.execute-api.eu-central-1.amazonaws.com/default/sendContactMessage";

    // Retrieving the values of form elements 
    var name = document.getElementById("username").value;
    var email = document.getElementById("mailaddr").value;
    var subject = document.getElementById("subject").value;
    var desc = document.getElementById("mailbody").value;
    // Defining error variables with a default value
    var nameErr = emailErr = subjErr= true;
    
    // Validate name
    if(name == "") {
        printError("nameErr", "* Please enter your name");
    } else {
        var regex = /^[a-zA-Z\s]+$/;                
        if(regex.test(name) === false) {
            printError("nameErr", "* Please enter a valid name");
        } else {
            printError("nameErr", "");
            nameErr = false;
        }
    }
    
    // Validate email address
    if(email == "") {
        printError("emailErr", "* Please enter your email address");
    } else {
        // Regular expression for basic email validation
        var regex = /^\S+@\S+\.\S+$/;
        if(regex.test(email) === false) {
            printError("emailErr", "* Please enter a valid email address");
        } else{
            printError("emailErr", "");
            emailErr = false;
        }
    }

        // Validate subject
    if(subject == "") {
        printError("subjErr", "* Please enter your topic here");
    }else{
        subjErr = false;
    }
    
    // Prevent the form from being submitted if there are any errors
    if((nameErr || emailErr || subjErr) == true) {
        return false;
    } else {
        var data = JSON.stringify({
            name : name,
            email : email,
            subject: subject,
            desc : desc
        });

        //subject: subject,
        //console.log(data);

        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("POST", URL);
        xmlhttp.setRequestHeader("Content-Type", "text/plain");
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState === 4) {
                var response = JSON.parse(xmlhttp.responseText);
                if (xmlhttp.status === 200 ) {
                    console.log('successful');
                    document.getElementById("contact-form").innerHTML = "<h3>Thank you for your message/feedback<br>our team will get back to you soon!</h3>";
                } else {
                    console.log('failed');
                }
            }
        }
        xmlhttp.send(data);
        document.getElementById('contact-form').reset();
    }
};
