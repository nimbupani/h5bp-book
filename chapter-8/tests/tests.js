	
test("activate navigation tabs", function() { 						   			
	$('#lineup .js-tabitem').each(function() {		
		$(this).trigger('click'); 		
		var $that = $(this);			

	    ok($that.hasClass('t-tab__navitem--active'), 
	       	'The clicked navigation item has the correct active class');   			    				

	    $('.js-tabitem').not($that).each(function() {
		ok(!$(this).hasClass('t-tab__navitem--active'),
			'Inactive item does not have active class');
		}); 
	});		
});