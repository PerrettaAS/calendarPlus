Template.dashboard.rendered = function () {
	$('.calendar').fullCalendar({
	    dayClick: function(date) {
	    	loadCalendar();
	        alert('Clicked on: ' + date.format());
	    }
	});
};

function loadCalendar() {
	var newEvent = new Object();
	newEvent.title = "some text";
	newEvent.start = new Date();
	newEvent.allDay = false;
	$('.calendar').fullCalendar('addEventSource', addCalanderEvent("Test event", "1/4/2016 12:00:00 AM", "1/7/2016 12:00:00 AM", "#000000", false));
}

function addCalanderEvent(title, start, end, color, allDay) {
    var eventObject = {
	    'title': title,
	    'start': start,
	    'end': end,
	    'color': color,
	    'allDay': allDay
    };
    $('.calendar').fullCalendar('renderEvent', eventObject, true);
    return eventObject;
}