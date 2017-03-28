var corrselector = '.dropdown#correlation ul li';
var ds1selector = '.dropdown#dataseries1 ul li';
var ds2selector = '.dropdown#dataseries2 ul li';
var areatypeselector = '.dropdown#areatype ul li';
var areaselector = '.dropdown#area ul li';

$('.dropdown ul li').click(function(event) {
    var target = $(event.target);

    if(target.parents('div#correlation').length) {
    	$('#correlationbutton').text($(this).text());
    	$(corrselector).removeClass('active');
   		$(this).addClass('active');
    }
    if(target.parents('div#dataseries1').length) {
    	$('#dataseries1button').text($(this).text());
    	$(ds1selector).removeClass('active');
   		$(this).addClass('active');
    }
    if(target.parents('div#dataseries2').length) {
    	$('#dataseries2button').text($(this).text());
    	$(ds2selector).removeClass('active');
   		$(this).addClass('active');
    }
    if(target.parents('div#areatype').length) {
    	$('#areatypebutton').text($(this).text());
    	$(areatypeselector).removeClass('active');
   		$(this).addClass('active');
    }
    if(target.parents('div#area').length) {
    	$('#areabutton').text($(this).text());
    	$(areaselector).removeClass('active');
   		$(this).addClass('active');
    }
});

$('.add').click(function() {
	var attr1 = $('#attr1').text();
	var attr2 = $('#attr2').text();
	var attr3 = $('#attr3').text();

	var markup = "<tr><td>" + attr1 + "</td><td>" + attr2 + 
		"</td><td>" + attr3 + "</td></tr>";
	$('table').append(markup);
});

$('.remove').click(function() {
	
});



