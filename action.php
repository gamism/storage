<?php
/**
 * Project: storage
 * User: gamism@gmail.com
 * Date: 2015/04/02 11:00
 */

include_once('common.php');

$dbhost = "localhost";
$dbuser = "root";
$dbpass = "h19831026";
$dbname = "storage";

$con = mysql_connect($dbhost, $dbuser, $dbpass);
if (!$con) {
	die('Could not connect: ' . mysql_error());
}
mysql_select_db($dbname, $con);

$action = $_REQUEST['action'];

if($action)
{
	switch($action)
	{
		case 'company':
			switch($_GET['method']) {
				case 'add':
					addCompany();
					break;
				case 'get':
					getCompanyList();
					break;
				case 'del':
					delCompany();
					break;
			}
			break;
		default:
			break;
	}
}

function query($sql)
{
	$result = mysql_query($sql) or die("DB cannot handle this query.");
	return $result;
}

function delCompany()
{
	$cid = $_GET['cid'];
	$sql = "DELETE FROM `storage`.`company` WHERE `company`.`cid` = $cid";
	query($sql);
}

function getCompanyList()
{
	$sql = 'select * from `company`';
	$ret = query($sql);
	$list = [];
	while($v = mysql_fetch_array($ret))
	{
		array_push($list, $v);
	}
	print(json_encode($list));
}

function addCompany()
{
	$company = $_REQUEST['company'];
	$tel = $_REQUEST['tel'];
	$address = $_REQUEST['address'];
	$sql = "INSERT INTO `storage`.`company` (`cid`, `company`, `tel`, `address`, `createDate`) VALUES (NULL, '$company', '$tel', '$address', CURRENT_TIMESTAMP)";
	query($sql);
}
