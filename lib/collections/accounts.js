AccountsCollection = new Mongo.Collection("accounts");

/*if (Meteor.isServer) {
	Meteor.publish('accounts', function() {
		return AccountsCollection.find();
	});
}

AccountsCollection.allow({
	insert: function() {
		return true;
	},
	update: function() {
		return true;
	}
});*/
