var temp;
//------------------DROPDOWN OPTIONS---------------------
var ds1selector = '.dropdown#dataseries1 ul li';
var yearselector = '.dropdown#year ul li';
var areatypeselector = '.dropdown#areatype ul li';
var areaselector = '.dropdown#area ul li';

$(document).on('click', '.dropdown ul li', function(event) { //make selected option the active element
    var target = $(event.target);

    //Set elements in dropdown to active if clicked
    if(target.parents('#dataseries1').length) {
    	$('#dataseries1button').text($(this).text());
    	$(ds1selector).removeClass('active');
   		$(this).addClass('active');
    }

    if(target.parents('#year').length) {
        $('#yearbutton').text($(this).text());
        $(yearselector).removeClass('active');
        $(this).addClass('active');
    }

    if(target.parents('#areatype').length) {
    	$('#areatypebutton').text($(this).text());
    	$(areatypeselector).removeClass('active');
   		$(this).addClass('active');

        //Fix area list
        $('#arealist li').remove();
        
        $.get("functions.php", 
            { 'check': 'areatype',
                'var1': $(this).text(),
            },
            function(data) { 
                $('#arealist').append(data); 
            }, 
            "text"
        );
    }

    if(target.parents('#area').length) {
    	$('#areabutton').text($(this).text());
    	$(areaselector).removeClass('active');
   		$(this).addClass('active');
    }
});

//-------------------ADD BUTTON----------------------
var count = 0;

$(document).on('click', '.add', function() {
    var ds1 = $('#dataseries1button').text();
    var year = $('#yearbutton').text();
    var areatype = $('#areatypebutton').text();
    var area = $('#areabutton').text();

    //Alert if fields need to be completed
    if(ds1.search('Data Series') != -1 || 
        year.search('Year') != -1 ||
        areatype.search('States') != -1 || 
        area.search('Area') != -1) {
            alert('Cannot add series - fill in all menus');
    }
    else {
        if(!$('table').html() || ($('table').html() == '<tr></tr>')) { //Add columns if there are none
            var col = "<tr><th><button class = \"compare\">Compare Series</button></th>";
            col += "<th>Remove</th>";
            col += "<th>Correlation</th>";
            col += "<th>Area 1</th>";
            col += "<th>Area 2</th>";
            col += "<th>" + ds1 + "</th></tr>";
            count += 1;
            $('table').append(col);
        }
        else {
            if($('th').text().search(ds1) == -1) {
                //add new column name
                $('table').find('tr:first-child th:last-child').after('<th>' + ds1 + '</th>');

                //add the new column
                $('table').find('tr').each(function() {
                    $(this).find('td:last-child').after('<td></td>');
                });

                count += 1;
            }
        }

        //Add empty rows
        var markup = '<tr><td><input type="checkbox" id="comparecheck"></td>';
        markup += "<td><button class = \"remove\">Remove Series</button></td>";
        markup += "<td>N/A</td>"; //Correlation
        markup += "<td>" + area + "</td>"; //Area 1
        markup += "<td>N/A</td>"; //Area 2
        for(i = 0; i < count; i++) {
            markup += "<td></td>";
        }
        $('table').append(markup);

        //Get query results for data series 1
        $.get("functions.php", 
            { 'check': 'add',
                'var1': ds1,
                'var2': areatype,
                'var3': area,
                'var4': year
            },
            function(data) { 
                temp = data; 
            }, 
            "text"
        );

        //Put data in the table
        var colcount = 1;
        $('table').find('th').each(function() {
            if($(this).text() == ds1) {
                $('table').find('tr:last-child').each(function() {
                    $(this).find('td:nth-child(' + colcount +')').text(temp);
                });
            }
            colcount += 1;            
        }); 
    }
});

//-------------------COMPARE BUTTON----------------
var checkbox = 2;
$(document).on('change', '#comparecheck', function() {
   if($('#comparecheck:checked').length > checkbox) {
       $(this).prop('checked', false);
       alert("You can only compare 2 data series!");
   }
});

$(document).on('click', '.compare', function() {
    if($('#comparecheck:checked').length < checkbox) {
        alert("Select 2 data series to compare!");
    }
    else {
        var checked = 0;
        var area1, area2, first, second = '';

        $('table').find($('#comparecheck:checked').parents('tr').children('td')).each(function() {
            if($(this).text() && (checked == 0 || checked == 1)) {
                checked += 1; //Skip remove series and correlation
            }
            else if($(this).text() && checked == 2) {
                area1 = $(this).text(); //Get area1
                checked += 1;
            }
            else if($(this).text() && checked == 3) {
                area2 = $(this).text(); //Get area2
                checked += 1;
            }
            else if($(this).text() && checked == 4) {
                first = $(this).text(); //Get first data series value
                checked += 1;
            }
            else if($(this).text() && checked == 5) {
                second = $(this).text(); //Get second data series value
                checked += 1;
            }
        });

        console.log("Area1: " + area1);
        console.log("Area2: " + area2);
        console.log("First data series: " + first);
        console.log("Second data series: " + second);


        $.get("functions.php", 
            { 'check': 'compare',
                'var1': area1,
                'var2': area2,
                'var3': first,
                'var4': second
            },
            function(data) { 
                temp = data; 
            }, 
            "text"
        );

        var markup = '<tr><td><input type="checkbox" id="comparecheck"></td>';
        markup += "<td><button class = \"remove\">Remove Series</button></td>";
        markup += "<td>" + temp + "</td>"; //Correlation
        markup += "<td>" + area1 + "</td>"; //Area 1
        markup += "<td>" + area2 + "</td>"; //Area 2
        for(i = 0; i < count; i++) {
            markup += "<td></td>";
        }
        $('table').append(markup);

        var colcount = 1;
        $('table').find('th').each(function() {
            if($(this).text() == "Age") { //CHANGE TO CHECK REAL HEADER NAME
                $('table').find('tr:last-child').each(function() {
                    $(this).find('td:nth-child(' + colcount +')').text(first);
                });
            }
            else if($(this).text() == "Fertility Rate") { //CHANGE TO CHECK REAL HEADER NAME
                $('table').find('tr:last-child').each(function() {
                    $(this).find('td:nth-child(' + colcount +')').text(second);
                });
            }
            colcount += 1;            
        }); 

    }
    // var ds2 = $('#dataseries2button').text();
    // var corr = $('#correlationbutton').text();

    // //Alert if fields need to be completed
    // if(ds2.search('Data Series') != -1 || corr.search('Correlation') != -1) {
    //     alert('Cannot compare series - fill in all menus');
    // }
    // else {
    //     console.log("comparing");
    // }

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



