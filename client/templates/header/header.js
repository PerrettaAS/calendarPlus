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
    	let user = prompt("Type in the username of the calendar you want to pull.");
    	let currentUser = Session.get('currentUser');
    	if(AccountsCollection.findOne({'username' : user}).events !== undefined) {
	    	let events = AccountsCollection.findOne({'username' : user}).events;
	    	let currentEvents = AccountsCollection.findOne({'username' : currentUser}).events;
			let desc = AccountsCollection.findOne({'username' : user}).desc;
	    	let currentDesc = AccountsCollection.findOne({'username' : currentUser}).desc;
	    	let newEvents = currentEvents.concat(events);
	    	let newDesc = currentDesc.concat(desc);
			Meteor.call('updateUser', currentUser, newEvents, newDesc);
			$('.calendar, .day-calendar, .calendar2').fullCalendar('addEventSource', events);
	    }
    }
});