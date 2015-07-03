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

echo "(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-560770-9', 'auto');
ga('send', 'pageview');
";
