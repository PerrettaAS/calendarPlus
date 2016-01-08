Meteor.methods({
	'createNewUser': function(name) {
		let username = name;
		let events = [];
		AccountsCollection.insert({
			'username': username,
			'events': events
		});
	},
	'updateUser': function(name, event) {
		AccountsCollection.update({'username' : name}, {
			'username': name,
			'events': event
		});
	}
});