<?php
//Query
    

    // $stid = oci_parse($conn, 'SELECT name FROM States');
    // oci_define_by_name($stid, 'NAME', $name);
    // oci_execute($stid);

    // while(oci_fetch($stid)) {
    //     echo "Name: $name";
    // }

    $check = $_GET['check'];
    $var1 = $_GET['var1'];
    $var2 = $_GET['var2'];

    if($check == 'areatype') {
        if($var1 == "State") { //GET STATES
            // $stid = oci_parse($conn, 'SELECT name FROM States');
            // oci_define_by_name($stid, 'NAME', $name);
            // oci_execute($stid);

            // while(oci_fetch($stid)) {
            //  $data = '<li role="presentation"><a role="menuitem" tabindex="-1" href="#">' . $name . '</a></li>';
            //  echo $data;
            // }
        }
        else if($var1 == "Community") { //GET COMMUNITIES
            // $stid = oci_parse($conn, 'SELECT name FROM Communities');
            // oci_define_by_name($stid, 'NAME', $name);
            // oci_execute($stid);

            // while(oci_fetch($stid)) {
            //  $data = '<li role="presentation"><a role="menuitem" tabindex="-1" href="#">' . $name . '</a></li>';
            //  echo $data;
            // }
        }

        $data = '<li role="presentation"><a role="menuitem" tabindex="-1" href="#">' . $var1 . '</a></li>';
        $data = $data . '<li role="presentation"><a role="menuitem" tabindex="-1" href="#">' . $var2 . '</a></li>';
        echo $data;        
    }

    // Close the Oracle connection
    //oci_free_statement($stid)
?>