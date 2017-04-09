<?php
    $conn = oci_connect($username = 'cgfussel', $password = 'Economy321', $connection_string = '//oracle.cise.ufl.edu/orcl');

    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    } 

    //Get needed variables from Javascript
    $check = $_GET['check'];
    $var1 = $_GET['var1'];
    $var2 = $_GET['var2'];
    $var3 = $_GET['var3'];
    $var4 = $_GET['var4'];

    //Results stored in $data
    $data = '';

    //Queries stored in $q
    $q = '';

    //Fill in 'Area' dropdown based on Area Type
    if($check == 'areatype') {
        //$var1 is the name of the state we are using
        $q = "SELECT distinct communities.name 
                FROM Communities, States 
                WHERE communities.belongsTo = states.stateid 
                    AND states.name = '" . $var1 . "'";
        $stid = oci_parse($conn, $q); //. $var1);
        oci_define_by_name($stid, 'NAME', $name);
        oci_execute($stid);

        $data = '<li role="presentation"><a role="menuitem" tabindex="-1" href="#"><b>' . $var1 . '</b></a></li>';
        while(oci_fetch($stid)) {
            $data = $data . '<li role="presentation"><a role="menuitem" tabindex="-1" href="#">' . $name . '</a></li>';
        }
        echo $data; 
    } //Add Data when "Add Series" is selected
    else if($check == 'add') { 
        //$var1 is the data series
        //$var2 is area type (state or community)
        //$var3 is the specific state or community 
        //$var4 is the year we're looking at
        if($var1 == 'Age') {
            //ADD DIFFERENT QUERY
            $q = "SELECT median(person.agep) 
                    FROM Person, Communities 
                    WHERE communities.name = '" . $var3 . 
                    "' AND communities.year = '" . $var4 . "'";
            $stid = oci_parse($conn, $q);
            oci_define_by_name($stid, 'NAME', $name);
            oci_execute($stid);
        }
        else if($var1 == 'Fertility Rate') {
            //ADD DIFFERENT QUERY
            $q = "SELECT distinct name 
                    FROM '" . $var2;
            $stid = oci_parse($conn, $q);
            oci_define_by_name($stid, 'NAME', $name);
            oci_execute($stid);
        }
        else if($var1 == 'Income') {
            $q = "SELECT distinct name 
                    FROM '" . $var2;
            $stid = oci_parse($conn, $q);
            oci_define_by_name($stid, 'NAME', $name);
            oci_execute($stid);
        }
        else if($var1 == 'Industry') {
            //ADD DIFFERENT QUERY
            $q = "SELECT distinct name 
                    FROM '" . $var2;
            $stid = oci_parse($conn, $q);  
            oci_define_by_name($stid, 'NAME', $name);
            oci_execute($stid);
        }
        else if($var1 == 'Mobility Status') {
            //ADD DIFFERENT QUERY
            $q = "SELECT distinct name 
                    FROM '" . $var2;
            $stid = oci_parse($conn, $q);  
            oci_define_by_name($stid, 'NAME', $name);
            oci_execute($stid);
        }
        else if($var1 == 'Poverty Rate') {
            //ADD DIFFERENT QUERY
            $q = "SELECT distinct name 
                    FROM '" . $var2;
            $stid = oci_parse($conn, $q);  
            oci_define_by_name($stid, 'NAME', $name);
            oci_execute($stid);
        }
        else if($var1 == 'Primary Language') {
            //ADD DIFFERENT QUERY
            $q = "SELECT distinct name 
                    FROM " . $var2;
            $stid = oci_parse($conn, $q);  
            oci_define_by_name($stid, 'NAME', $name);
            oci_execute($stid);
        }
        else if($var1 == 'Property Value') {
            //ADD DIFFERENT QUERY
            $q = "SELECT distinct name 
                    FROM '" . $var2;
            $stid = oci_parse($conn, $q);  
            oci_define_by_name($stid, 'NAME', $name);
            oci_execute($stid);
        }
        else if($var1 == 'Race') {
            //ADD DIFFERENT QUERY
            $q = "SELECT distinct name 
                    FROM '" . $var2;
            $stid = oci_parse($conn, $q);  
            oci_define_by_name($stid, 'NAME', $name);
            oci_execute($stid);
        }
        
        while(oci_fetch($stid)) {
            $data = $name;
        }
        echo $data;
    }
    else if($check == 'compare') {
        //$var1 is the first area to compare
        //$var2 is the second area to compare
        //$var3 is the first data series to compare
        //$var4 is the second data series to compare
        $q = "SELECT distinct name 
                    FROM States";
            $stid = oci_parse($conn, $q);  
            oci_define_by_name($stid, 'NAME', $name);
            oci_execute($stid);

        while(oci_fetch($stid)) {
            $data = $name;
        }
        echo $data;
    }


    // Close the Oracle connection
    oci_free_statement($stid);
    oci_close($conn);
?>