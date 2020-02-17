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
//= require rails-ujs
//= require moment
//= require moment/ja.js
//= require bootstrap
//= require fullcalendar
//= require activestorage
//= require turbolinks
//= require_tree .

$(function () {
  $(document).on('turbolinks:load', function () {
    if ($('#calendar').length) {
        function eventCalendar() {
            return $('#calendar').fullCalendar({
            });
        };
        function clearCalendar() {
            $('#calendar').html('');
        };

        $(document).on('turbolinks:load', function () {
            eventCalendar();
        });
        $(document).on('turbolinks:before-cache', clearCalendar);
        $('#calendar').fullCalendar({
          events: '/tasks.json',
          header: {
            left: "title",
            center: "",
            right: "month,agendaWeek,agendaDay,listYear today prevYear,prev,next,nextYear"
          },
          timeFormat: "HH:mm",
          eventColor: '#63ceef',
          eventTextColor: '#000000',
        });
      }
  });
});
