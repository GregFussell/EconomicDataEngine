<?php
    $conn = oci_connect($username = 'cgfussel', $password = 'Economy321', $connection_string = '//oracle.cise.ufl.edu/orcl');

    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    } 

    $check = $_GET['check'];
    $var1 = $_GET['var1'];
    $data = '';

    if($check == 'areatype') {
        if($var1 == "State") { //GET STATES
            $stid = oci_parse($conn, 'SELECT distinct name FROM States');
            oci_define_by_name($stid, 'NAME', $name);
            oci_execute($stid);

            while(oci_fetch($stid)) {
             $data = $data . '<li role="presentation"><a role="menuitem" tabindex="-1" href="#">' . $name . '</a></li>';
            }
            echo $data;
        }
        else if($var1 == "Community") { //GET COMMUNITIES
            $stid = oci_parse($conn, 'SELECT distinct name FROM Communities');
            oci_define_by_name($stid, 'NAME', $name);
            oci_execute($stid);

            while(oci_fetch($stid)) {
             $data = $data . '<li role="presentation"><a role="menuitem" tabindex="-1" href="#">' . $name . '</a></li>';
            }
            echo $data;
        }     
    }

    // Close the Oracle connection
    oci_free_statement($stid);
    oci_close($conn);
?>