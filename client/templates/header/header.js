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
		Session.set("currentUser", undefined);
    }
});