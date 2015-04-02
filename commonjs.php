<?php
/**
 * Project: storage
 * User: gamism@gmail.com
 * Date: 2015/04/02 11:04
 */

session_start();

if ($_SESSION['islogin'] != true) {
	echo 'if(parent)
	{
		parent.location.href="login.html";
	}
	else
	{
		location.href="login.html";
	}
	';
}
else
{
	echo 'var auth={result:'. $_SESSION['islogin'] .'};';
}


