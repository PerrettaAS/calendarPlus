Template.dashboard.rendered = function () {
	$('.calendar').fullCalendar({
		header: {
	     	left   : 'prev,today,next',
	    	center : 'title',
	    	right  : 'basicDay,basicWeek,month',
	    },

	    dayClick: function(date) {
	    	$('.day-calendar').fullCalendar('gotoDate', date);
	    },

	    eventClick: function(calEvent) {
	    	let confirmDelete = confirm("Are you sure you want to delete this event?");
			if (confirmDelete) {
	    		let title = calEvent.title;
	    		removeEvent(eventIndex(title), calEvent.id);
			}
    	},

    	height: (screen.width / 4.5)
	});
	$('.calendar2').fullCalendar({
		header: {
	     	left   : 'prev,today,next',
	    	center : 'title',
	    	right  : '',
	    },
	    dayClick: function(date) {
	    	$('.day-calendar').fullCalendar('gotoDate', date);
	    },
	    eventClick: function(calEvent) {
	    	let r = confirm("Are you sure you want to delete this event?");
			if (r == true) {
	    		let title = calEvent.title;
	    		removeEvent(eventIndex(title), calEvent.id);
			}
    	},
    	height: (screen.height / 2.5),
    	defaultView: 'agendaWeek'
	});
	$('.day-calendar').fullCalendar({
		header: {
	     	left   : '',
	    	center : 'title',
	    	right  : '',
	    },
	    eventClick: function(calEvent) {
			$('#event-title').html("Event: <i>" + calEvent.title + "</i>");
			$('#event-description-content').html(
				AccountsCollection.findOne({'username' : Session.get('currentUser')}).desc[eventIndex(calEvent.title)]);
    	},
	    defaultView: 'agendaDay',
	    height: (screen.height / 1.215)
	});
	$('.datetimepicker1').datetimepicker();
	$('.datetimepicker2').datetimepicker();
	loadCalendar(Session.get('currentUser'));
};

Template.dashboard.events({
    'click #submit-add-event': function(event){
    	event.preventDefault();
		addNewEvent();
    },
});

selectedEvent = undefined

function removeEvent(eventIndex, id) {
	let events = AccountsCollection.findOne({'username' : Session.get('currentUser')}).events;
	let desc = AccountsCollection.findOne({'username' : Session.get('currentUser')}).desc;
	if(eventIndex > -1) {
		events.splice(eventIndex, 1);
		desc.splice(eventIndex, 1);
		Meteor.call('updateUser', Session.get('currentUser'), events, desc);
		$('.calendar, .day-calendar, .calendar2').fullCalendar('removeEvents', id);
		$('.calendar, .day-calendar, .calendar2').fullCalendar('addEventSource', events);
	}
}

function loadCalendar(user) {
	if(AccountsCollection.findOne({'username' : user}) === undefined) {
		return;
	}
	$('.calendar, .day-calendar, .calendar2').fullCalendar('addEventSource', AccountsCollection.findOne({'username' : Session.get('currentUser')}).events);
}

function eventIndex(title) {
	let events = AccountsCollection.findOne({'username' : Session.get('currentUser')}).events;
	for (let e in events) {
	    let t = events[e].title;
	    if(t === title) {
	    	return e;
	    }
	}
	return -1;
}

function addNewEvent() {
	if (eventIndex(title) === -1) {
		let newEvent = addCalendarEvent();
		let user = Session.get('currentUser');
		let length = AccountsCollection.findOne({'username' : user}).events.length;
		let newEvents = AccountsCollection.findOne({'username' : user}).events;
		let newDesc = AccountsCollection.findOne({'username' : user}).desc;
		newEvents[length] = newEvent;
		$('.calendar, .day-calendar, .calendar2').fullCalendar('addEventSource', newEvent);
		newDesc[length] = $('#comment').val();
		Meteor.call('updateUser', user, newEvents, newDesc);
		resetForm();
	} else {
		alert("The title of this event already exists!");
	}
}

function resetForm() {
	$('#title').val("");
	$('#start-date').val("");
	$('#end-date').val("");
	$('#html5colorpicker').val("#000000");
	$('#all-day').val("on");
}

function addCalendarEvent() {
	let title = $('#title').val();
	let start = $('#start-date').val();
	let end = $('#end-date').val();
	let color = $('#html5colorpicker').val();
	let desc = $('#comment').val();
	let allDay = $('#all-day').val() !== "on" ? true : false;
    let eventObject = {
	    'title': title,
	    'start': start,
	    'end': end,
	    'color': color,
	    'allDay': allDay
    };

    $('.calendar, .day-calendar, .calendar2').fullCalendar('renderEvent', eventObject, true);
    return eventObject;
}