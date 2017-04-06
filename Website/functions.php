<?php
//Query
    $stid = oci_parse($conn, 'SELECT name FROM States');
    oci_define_by_name($stid, 'NAME', $name);
    oci_execute($stid);
    // while(oci_fetch($stid)) {
    //     echo "Name: $name";
    // }
	if(isset($_POST['action']) && function_exists($_POST['action'])) {
	    $action = $_POST['action'];
	    $var = isset($_POST['name']) ? $_POST['name'] : null;
	    $getData = $action($var);
	    // do whatever with the result
	}
    //$arg = "hello";
    function hello($arg) {
    	return $arg . '123';
    }
    echo $action($var);
    // Close the Oracle connection
    oci_free_statement($stid)
?>