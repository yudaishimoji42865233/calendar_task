// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
// vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require rails-ujs
//= require moment
//= require moment/ja.js
//= require bootstrap
//= require fullcalendar
//= require fullcalendar/lang/ja
//= require activestorage
//= require_tree .

$(function () {
  $('#calendar').fullCalendar({
    events: '/tasks.json',
    header: {
      left: "title",
      center: "",
      right: "month,agendaWeek,agendaDay,listYear today prevYear,prev,next,nextYear"
    },
    timeFormat: "HH:mm",
    //イベントの色を変える
    eventColor: '#63ceef',
    //イベントの文字色を変える
    eventTextColor: '#000000',
  });
});


$(document).ready(function() {


  /* initialize the external events
  -----------------------------------------------------------------*/

  $('#external-events .fc-event').each(function() {

      // store data so the calendar knows to render an event upon drop
      $(this).data('event', {
          title: $.trim($(this).text()), // use the element's text as the event title
          stick: true // maintain when user navigates (see docs on the renderEvent method)
      });

      // make the event draggable using jQuery UI
      $(this).draggable({
          zIndex: 999,
          revert: true,      // will cause the event to go back to its
          revertDuration: 0  //  original position after the drag
      });

  });


  /* initialize the calendar
  -----------------------------------------------------------------*/

  $('#calendar').fullCalendar({
      header: {
          left: 'prev,next today',
          center: 'title',
          right: 'month,agendaWeek,agendaDay'
      },
      editable: true,
      droppable: true, // this allows things to be dropped onto the calendar
      dragRevertDuration: 0,
      drop: function() {
          // is the "remove after drop" checkbox checked?
          if ($('#drop-remove').is(':checked')) {
              // if so, remove the element from the "Draggable Events" list
              $(this).remove();
          }
      },
      eventDragStop: function( event, jsEvent, ui, view ) {
          
          if(isEventOverDiv(jsEvent.clientX, jsEvent.clientY)) {
              $('#calendar').fullCalendar('removeEvents', event._id);
              var el = $( "<div class='fc-event'>" ).appendTo( '#external-events-listing' ).text( event.title );
              el.draggable({
                zIndex: 999,
                revert: true, 
                revertDuration: 0 
              });
              el.data('event', { title: event.title, id :event.id, stick: true });
          }
      }
  });


  var isEventOverDiv = function(x, y) {

      var external_events = $( '#external-events' );
      var offset = external_events.offset();
      offset.right = external_events.width() + offset.left;
      offset.bottom = external_events.height() + offset.top;

      // Compare
      if (x >= offset.left
          && y >= offset.top
          && x <= offset.right
          && y <= offset .bottom) { return true; }
      return false;

  }


});