Template.login.events({
    'click #login-form-link': function(e){
		displayLogin(e);
    },
    'click #register-form-link': function(e){
		displayRegister(e);
    },
    'click #register-submit': function(event){
        event.preventDefault();
        var username = $('#username').val();
        username = capitalizeFirstLetter(username);
        var email = $('#email').val();
        var password = $('#password').val();
        var confirmPassword = $('#confirm-password').val();
        if(password !== confirmPassword) {
        	alert("Your passwords did not match!");
        	return;
        }
        Accounts.createUser({
            'username': username,
            'email': email,
            'password': password,
            'events': []
        }, function(error){
		    if(error){
		        alert(error.reason);
		    } else {
                Meteor.call('createNewUser', username);
		        Meteor.loginWithPassword(username, password);
		        Session.set('currentUser', username);
		    }
		});
    },
    'click #login-submit': function(event){
        event.preventDefault();
        var username = $('#login-username').val();
        username = capitalizeFirstLetter(username);
        var password = $('#login-password').val();
        Meteor.loginWithPassword(username, password, function(error) {
        	if(error) {
        		alert(error.reason);
        	} else {
        		Session.set('currentUser', username);
        	}
        });
    }
});

displayLogin = function(e) {
	e.preventDefault();
    $("#login-form").delay(100).fadeIn(100);
	$("#register-form").fadeOut(100);
	$('#register-form-link').removeClass('active');
	$(this).addClass('active');
}

displayRegister = function(e) {
	e.preventDefault();
    $("#register-form").delay(100).fadeIn(100);
	$("#login-form").fadeOut(100);
	$('#login-form-link').removeClass('active');
	$(this).addClass('active');
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}