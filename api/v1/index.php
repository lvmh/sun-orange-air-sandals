<?php
require '.././libs/Slim/Slim.php';
require_once 'dbHelper.php';

\Slim\Slim::registerAutoloader();
$app = new \Slim\Slim();
$app = \Slim\Slim::getInstance();
$db = new dbHelper();

/**
 * Database Helper Function templates
 */
/*
select(table name, where clause as associative array)
insert(table name, data as associative array, mandatory column names as array)
update(table name, column names as associative array, where clause as associative array, required columns as array)
delete(table name, where clause as array)
*/


// Products
$app->get('/products', function() {
    global $db;
    $rows = $db->select("products","id,sku,name,description,price,mrp,stock,image,packing,status",array());
    echoResponse(200, $rows);
});

$app->post('/products', function() use ($app) {
    $data = json_decode($app->request->getBody());
    $mandatory = array('name');
    global $db;
    $rows = $db->insert("products", $data, $mandatory);
    if($rows["status"]=="success")
        $rows["message"] = "Product added successfully.";
    echoResponse(200, $rows);
});

$app->put('/products/:id', function($id) use ($app) {
    $data = json_decode($app->request->getBody());
    $condition = array('id'=>$id);
    $mandatory = array();
    global $db;
    $rows = $db->update("products", $data, $condition, $mandatory);
    if($rows["status"]=="success")
        $rows["message"] = "Product information updated successfully.";
    echoResponse(200, $rows);
});

$app->delete('/products/:id', function($id) {
    global $db;
    $rows = $db->delete("products", array('id'=>$id));
    if($rows["status"]=="success")
        $rows["message"] = "Product removed successfully.";
    echoResponse(200, $rows);
});

// Orders
$app->get('/orders', function() {
    global $db;
    $rows = $db->select("orders","id, productid, amount, customerid, status",array());
    echoResponse(200, $rows);
});

$app->post('/orders', function() use ($app) {
    $data = json_decode($app->request->getBody());
    $mandatory = array('productid');
    global $db;
    $rows = $db->insert("orders", $data, $mandatory);
    if($rows["status"]=="success")
        $rows["message"] = "Order added successfully.";
    echoResponse(200, $rows);
});

$app->put('/orders/:id', function($id) use ($app) {
    $data = json_decode($app->request->getBody());
    $condition = array('id'=>$id);
    $mandatory = array();
    global $db;
    $rows = $db->update("orders", $data, $condition, $mandatory);
    if($rows["status"]=="success")
        $rows["message"] = "Order information updated successfully.";
    echoResponse(200, $rows);
});

$app->delete('/orders/:id', function($id) {
    global $db;
    $rows = $db->delete("orders", array('id'=>$id));
    if($rows["status"]=="success")
        $rows["message"] = "Order removed successfully.";
    echoResponse(200, $rows);
});

// Customers
$app->get('/customers', function() {
    global $db;
    $rows = $db->select("customers","id, address, name, phone, status",array());
    echoResponse(200, $rows);
});

$app->post('/customers', function() use ($app) {
    $data = json_decode($app->request->getBody());
    $mandatory = array('address');
    global $db;
    $rows = $db->insert("customers", $data, $mandatory);
    if($rows["status"]=="success")
        $rows["message"] = "Customer added successfully.";
    echoResponse(200, $rows);
});

$app->put('/customers/:id', function($id) use ($app) {
    $data = json_decode($app->request->getBody());
    $condition = array('id'=>$id);
    $mandatory = array();
    global $db;
    $rows = $db->update("customers", $data, $condition, $mandatory);
    if($rows["status"]=="success")
        $rows["message"] = "Customer information updated successfully.";
    echoResponse(200, $rows);
});

$app->delete('/customers/:id', function($id) {
    global $db;
    $rows = $db->delete("customers", array('id'=>$id));
    if($rows["status"]=="success")
        $rows["message"] = "Customer removed successfully.";
    echoResponse(200, $rows);
});


function echoResponse($status_code, $response) {
    global $app;
    $app->status($status_code);
    $app->contentType('application/json');
    echo json_encode($response,JSON_NUMERIC_CHECK);
}

$app->run();
?>