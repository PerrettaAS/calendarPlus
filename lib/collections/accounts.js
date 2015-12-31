Accounts = new Mongo.Collection("accounts");

/*if (Meteor.isServer) {
	Meteor.publish('accounts', function() {
		return Accounts.find();
	});
}

Accounts.allow({
	insert: function() {
		return true;
	},
	update: function() {
		return true;
	}
});*/
