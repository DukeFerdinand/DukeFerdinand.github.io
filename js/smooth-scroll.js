//*********************************************************//
//             I found this on Stack Overflow              //
//https://jsfiddle.net/o92wrpg8/2/                         //
//https://stackoverflow.com/questions/18891188/twitter-\   //
//bootstrap-scrollspy-disable-on-smooth-scroll#18895225    //
//*********************************************************//

$("body").scrollspy({
  target: ".active-spy"
});

$(document).on('click', 'a', function(event) {
  $('html, body').animate({
    scrollTop: $($.attr(this, 'href')).offset().top
  }, {
    duration: 750,
    start: function() {
      $("#nav").removeClass("active-spy");
    },
    complete: function() {
      $("#nav").addClass("active-spy");
      $(".active").removeClass("active");
      $(event.target.parentNode).addClass("active");
    }
  });
});

