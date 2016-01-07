Template.dashboard.rendered = function () {
	$('.calendar').fullCalendar({
		header: {
	     	left   : 'prev,today,next',
	    	center : 'title',
	    	right  : 'basicDay,basicWeek,month',
	    },
	    dayClick: function(date) {
	    	loadCalendar();
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
};

Template.dashboard.events({
    'click #submit-add-event': function(event){
    	event.preventDefault();
		addNewEvent();
    },
});

function loadCalendar() {
	$('.calendar, .day-calendar').fullCalendar('addEventSource', addCalanderEvent("Test event", "1/4/2016 12:00:00 AM", "1/7/2016 12:00:00 AM", "#0000FF", false));
}

function addNewEvent() {
	let title = $('#title').val();
	let start = $('#start-date').val();
	let end = $('#end-date').val();
	let color = $('#html5colorpicker').val();
	let allDay = false;
	if($('#all-day').val() !== "on") 
		allDay = true;
	$('.calendar, .day-calendar').fullCalendar('addEventSource', addCalanderEvent(title, start, end, color, allDay));
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