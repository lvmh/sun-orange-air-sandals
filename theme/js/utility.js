$(function() {

  $str = location.href;
  $last = $(this).split("/", $str, 3); // so at second index rest of the string will come.
  alert($last[2]);
  $('nav a[href^="/' + location.href.split("/")[1] + '"]').addClass('active');
});