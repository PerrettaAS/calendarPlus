Template.dashboard.rendered = function () {
	$('.calendar').fullCalendar({
		header: {
	     	left   : 'prev,today,next',
	    	center : 'title',
	    	right  : 'basicDay,basicWeek,month',
	    },
	    dayClick: function(date) {
	        alert('Clicked on: ' + date.format());
	    },
	    eventClick: function(calEvent) {
	    	let r = confirm("Are you sure you want to delete this event?");
			if (r == true) {
	    		let title = calEvent.title;
	    		removeEvent(eventIndex(title), calEvent.id);
			}
    	}
	});
	$('.day-calendar').fullCalendar({
		header: {
	     	left   : 'title',
	    	center : '',
	    	right  : 'agendaWeek,agendaDay',
	    },
	    defaultView: 'agendaDay'
	});
	$('.datetimepicker1').datetimepicker();
	$('.datetimepicker2').datetimepicker();
	loadCalendar();
};

Template.dashboard.events({
    'click #submit-add-event': function(event){
    	event.preventDefault();
		addNewEvent();
    },
});

function removeEvent(eventIndex, id) {
	let events = AccountsCollection.findOne({'username' : Session.get('currentUser')}).events;
	let desc = AccountsCollection.findOne({'username' : Session.get('currentUser')}).desc;
	if(eventIndex > -1) {
		events.splice(eventIndex, 1);
		desc.splice(eventIndex, 1);
		Meteor.call('updateUser', Session.get('currentUser'), events, desc);
		$('.calendar, .day-calendar').fullCalendar('removeEvents', id);
	}
}

function loadCalendar() {
	if(AccountsCollection.findOne({'username' : Session.get('currentUser')}) === undefined) {
		return;
	}
	$('.calendar, .day-calendar').fullCalendar('addEventSource', AccountsCollection.findOne({'username' : Session.get('currentUser')}).events);
}

function eventIndex(title) {
	let events = AccountsCollection.findOne({'username' : Session.get('currentUser')}).events;
	for (let e in events) {
	    let t = events[e].title;
	    if(t === title) {
	    	console.log('remove');
	    	return e;
	    }
	}
	return -1;
}

function addNewEvent() {
	let title = $('#title').val();
	let start = $('#start-date').val();
	let end = $('#end-date').val();
	let color = $('#html5colorpicker').val();
	let allDay = false;
	let desc = $('#comment').val();
	if($('#all-day').val() !== "on") 
		allDay = true;
	let event = addCalanderEvent(title, start, end, color, allDay);
	$('.calendar, .day-calendar').fullCalendar('addEventSource', event);
	let length = AccountsCollection.findOne({'username' : Session.get('currentUser')}).events.length;
	let newEvents = AccountsCollection.findOne({'username' : Session.get('currentUser')}).events;
	newEvents[length] = event;
	let newDesc = AccountsCollection.findOne({'username' : Session.get('currentUser')}).desc;
	newDesc[length] = desc;
	Meteor.call('updateUser', Session.get('currentUser'), newEvents, newDesc);
	$('#title').val("");
	$('#start-date').val("");
	$('#end-date').val("");
	$('#html5colorpicker').val("#000000");
	$('#all-day').val(false);
}

function addCalanderEvent(title, start, end, color, allDay, desc) {
    let eventObject = {
	    'title': title,
	    'start': start,
	    'end': end,
	    'color': color,
	    'allDay': allDay
    };
    $('.calendar, .day-calendar').fullCalendar('renderEvent', eventObject, true);
    return eventObject;
}