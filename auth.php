<?php
/**
 * Project: storage
 * User: gamism@gmail.com
 * Date: 2015/04/02 11:08
 */

session_start();

$action = $_REQUEST['action'];

//Logout

if($action == 'logout')
{
	$_SESSION['islogin'] = false;
	header('location:login.html');
}

//Login

if($action == 'login')
{
	$user = $_POST['Email1'];
	$passwd = $_POST['Password1'];

	if ($user == "admin" && $passwd == "caroline") {
		$_SESSION['islogin'] = true;
		header('location:index.html');
	} else {
		$_SESSION['islogin'] = false;
		header('location:login.html');
	}
}
