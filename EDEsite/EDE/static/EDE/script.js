//------------------DROPDOWN OPTIONS---------------------
var corrselector = '.dropdown#correlation ul li';
var ds1selector = '.dropdown#dataseries1 ul li';
var ds2selector = '.dropdown#dataseries2 ul li';
var areatypeselector = '.dropdown#areatype ul li';
var areaselector = '.dropdown#area ul li';

$(document).on('click', '.dropdown ul li', function(event) { //make selected option the active element
    var target = $(event.target);

    //Set elements in dropdown to active if clicked
    if(target.parents('div#dataseries1').length) {
    	$('#dataseries1button').text($(this).text());
    	$(ds1selector).removeClass('active');
   		$(this).addClass('active');
    }

    if(target.parents('div#areatype').length) {
    	$('#areatypebutton').text($(this).text());
    	$(areatypeselector).removeClass('active');
   		$(this).addClass('active');

        //Put in state names if "State" is selected from Area Type
        if($(this).text() == "State") {
            $('#arealist li').remove();

            var markup = '';
            var lines = '';
            
            $.ajax({
                url: "test",
                success: function(result){
                    lines = result.split('\n'); 
                    for(i = 0; i < lines.length; i++) {
                        markup += '<li role="presentation"><a role="menuitem" tabindex="-1" href="#">' + lines[i] + '</a></li>';
                    }  
                    $('#arealist').append(markup);                
                }, 
                error: function(abc) {
                    console.log(abc.statusText);
                }
            });
        } //Put in community names if "Community" is selected from Area Type
        else if($(this).text() == "Community") {
            $('#arealist li').remove();

            var markup = '';
            var lines = '';
            
            $.ajax({
                url: "test2",
                success: function(result){
                    lines = result.split('\n'); 
                    for(i = 0; i < lines.length; i++) {
                        markup += '<li role="presentation"><a role="menuitem" tabindex="-1" href="#">' + lines[i] + '</a></li>';
                    }  
                    $('#arealist').append(markup);                
                }, 
                error: function(abc) {
                    console.log(abc.statusText);
                }
            });
        }
    }

    if(target.parents('div#area').length) {
    	$('#areabutton').text($(this).text());
    	$(areaselector).removeClass('active');
   		$(this).addClass('active');
    }

    if(target.parents('div#dataseries2').length) {
        $('#dataseries2button').text($(this).text());
        $(ds2selector).removeClass('active');
        $(this).addClass('active');
    }

    if(target.parents('div#correlation').length) {
        $('#correlationbutton').text($(this).text());
        $(corrselector).removeClass('active');
        $(this).addClass('active');
    }
});

//-------------------ADD BUTTON----------------------
var map = {};
var count = 0;

$(document).on('click', '.add', function() {
    var ds1 = $('#dataseries1button').text();
    var areatype = $('#areatypebutton').text();
    var area = $('#areabutton').text();

    //Alert if fields need to be completed
    if(ds1.search('Data Series') != -1 || 
        areatype.search('Area Type') != -1 || 
        area.search('Area') != -1) {
            alert('Cannot add series - fill in all menus');
    }
    else {
        if(!$('table').html() || ($('table').html() == '<tr></tr>')) { //Add columns if there are none
            var col = "<tr><th>Remove</th>";
            col += "<th>" + ds1 + "</th></tr>";
            map[count] = ds1;
            count += 1;
            $('table').append(col);
        }
        else {
            if($('th').text().search(ds1) == -1) {
                var col = $('table tr:first-child').html();
                $('table tr:first-child').remove();
                col = col.substring(0, col.length - 5);
                col = "<tr>" + col;
                col += "<th>" + ds1 + "</th></tr>";

                $('table').find('tr').each(function() {
                    $(this).find('td:last-child').after('<td></td>');
                });

                map[count] = ds1;
                count += 1;

                $('table').first('tr').prepend(col); 
            }
        }

        //Add rows
        var markup = "<tr><td><button class = \"remove\">Remove Series</button></td>";
        var lines = '';
        for(i = 0; i < count; i++) {
            markup += "<td></td>";
        }

        $('table').append(markup);

        $.ajax({ //Row names
            url: "test",
            success: function(result){
                lines = result.split('\n'); 
                var colcount = 1;
                $('table').find('th').each(function() {
                    if($(this).text() == ds1) {
                        $('table').find('tr:last-child').each(function() {
                            $(this).find('td:nth-child(' + colcount +')').text(lines[0]);
                        });
                    }
                    colcount += 1;            
                }); 
            }, 
            error: function(abc) {
                console.log(abc.statusText);
            }
        });
    }
});

//-------------------COMPARE BUTTON----------------
$(document).on('click', '.compare', function() {
    var ds2 = $('#dataseries2button').text();
    var corr = $('#correlationbutton').text();

    //Alert if fields need to be completed
    if(ds2.search('Data Series') != -1 || corr.search('Correlation') != -1) {
        alert('Cannot compare series - fill in all menus');
    }
    else {
        console.log("comparing");
    }
});

//-------------------REMOVE BUTTON----------------
$(document).on('click', '.remove', function() {
    $(this).parents('tr').remove();

    var colcount = 1;
    $('table').find('th').each(function() {
        var rowcount = 0;
        $("table tr td:nth-child(" + colcount + ")").each(function () {
            if($(this).html()) {
                rowcount += 1;
            }
        });
        if(rowcount == 0) {
            $(this).remove();
        }
    }); 

    if($('table').html() == '<tr></tr>') {
        count = 0;
    }          
    
});



