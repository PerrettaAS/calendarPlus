Template.header.helpers({
	currentUser: function () {
		return Session.get("currentUser") !== undefined;
	}
});

Template.header.events({
    'click #nav-login': function(e){
		displayLogin(e);
    },
    'click #nav-register': function(e){
		displayRegister(e);
    },
    'click #nav-logout': function(e){
		$(".dashboard-content").fadeOut(500, function() {
			Session.set("currentUser", undefined);
			$(".login-container").fadeIn(0);
        });
    },
    'click #nav-pull': function(e){
		Session.set("currentUser", undefined);
    }
});