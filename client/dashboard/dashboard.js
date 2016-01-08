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

function loadCalendar() {
	if(AccountsCollection.findOne({'username' : Session.get('currentUser')}) === undefined) {
		return;
	}
	$('.calendar, .day-calendar').fullCalendar('addEventSource', AccountsCollection.findOne({'username' : Session.get('currentUser')}).events);
}

function addNewEvent() {
	let title = $('#title').val();
	let start = $('#start-date').val();
	let end = $('#end-date').val();
	let color = $('#html5colorpicker').val();
	let allDay = false;
	if($('#all-day').val() !== "on") 
		allDay = true;
	let event = addCalanderEvent(title, start, end, color, allDay);
	$('.calendar, .day-calendar').fullCalendar('addEventSource', event);
	let length = AccountsCollection.findOne({'username' : Session.get('currentUser')}).events.length;
	let newEvents = AccountsCollection.findOne({'username' : Session.get('currentUser')}).events;
	newEvents[length] = event;
	Meteor.call('updateUser', Session.get('currentUser'), newEvents);
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