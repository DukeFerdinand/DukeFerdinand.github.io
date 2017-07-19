var resizeCount = 0;
if (resizeCount < 1){
	removeDropDown();
	addDropDown();
	resizeCount ++;
}
//Scrolling navbar ==============================================

if ($(window).width() > 500 ){
	removeDropDown();
}

if ($(window).width() >=500){

	$(window).scroll(function () {
	  	if ($(window).width() >=500) {
		    if ($(window).scrollTop() > 250) {
		    	$('#wrapper-hidden').fadeIn(250);
		    }
		    if ($(window).scrollTop() < 250) {
		    	$('#wrapper-hidden').slideUp(75);
		    }
		}
  	});
}

//Resizing window ========================================================
$(window).on('resize', function(){
    var win = $(this); //this = window
    if ( resizeCount == 0){

	    if (win.width() <= 500) {
	    	$('#navbar').css('display', 'none');
	    	addDropDown();
	    	resizeCount ++;
	    }
	}
	    if (win.width() >=500) {
	    	$('#navbar').slideDown(400);
	    	removeDropDown();
	    	resizeCount = 0;
	    }
});



	function dropDown() {
		removeDropDown();
		if ($(window).width() <=500 ){
			$('#navbar').slideToggle(400, function(){
				addDropDown();
			});
		}
	}
	function addDropDown(){
		$('.positioner').on('click', dropDown);
	}
	function removeDropDown(){
		$('.positioner').off('click', dropDown);
	}


// The Titles ================================================================
// 
// TODO: try and get the navbar to scroll back up without breaking

// $('#about-title, #about-title-hidden').click(function(){
// 	$('.work, .skills, .contact').fadeOut(1, function() {
// 		// $('#navbar').slideUp(400);
// 		$('.about').fadeIn(450);
// 	});
// });
// $('#work-title, #work-title-hidden').click(function() {
// 	$('.about, .skills, .contact').fadeOut(1, function() {
// 		// $('#navbar').slideUp(400);
// 		$('.work').fadeIn(450);
// 	});
// });
// $('#skills-title, #skills-title-hidden').click(function(){
// 	$('.about, .work, .contact').fadeOut(1, function() {
// 		// $('#navbar').slideUp(400);
// 		$('.skills').fadeIn(450);
// 	});
// });
// $('#contact-title, #contact-title-hidden').click(function(){
// 	$('.about, .work, .skills').fadeOut(1, function() {
// 		// $('#navbar').slideUp(400);
// 		$('.contact').fadeIn(450);
// 	});
// });