Template.index.helpers({
	currentUser: function () {
		return Session.get("currentUser") !== undefined;
	}
});
