<?php
//Query
    $stid = oci_parse($conn, 'SELECT name FROM States');

    oci_define_by_name($stid, 'NAME', $name);

    oci_execute($stid);

    while(oci_fetch($stid)) {
        echo "Name: $name";
    }
    
    // Close the Oracle connection
    oci_free_statement($stid)
?>