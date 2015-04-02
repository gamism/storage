<?php
/**
 * Project: storage
 * User: gamism@gmail.com
 * Date: 2015/04/02 11:04
 */

session_start();

if ($_SESSION['islogin'] != true) {
	header('location:login.html');
}

