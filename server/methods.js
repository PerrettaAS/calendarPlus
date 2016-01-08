Meteor.methods({
	'createNewUser': function(name) {
		let username = name;
		let events = [];
		let desc = [];
		AccountsCollection.insert({
			'username': username,
			'events': events,
			'desc': desc
		});
	},
	'updateUser': function(name, event, desc) {
		AccountsCollection.update({'username' : name}, {
			'username': name,
			'events': event,
			'desc': desc
		});
	}
});