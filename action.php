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

function query($sql)
{
	$result = mysql_query($sql) or die("DB cannot handle this query.");
	return $result;
}

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
				case 'edit':
					editCompany();
					break;
				case 'del':
					delCompany();
					break;
			}
			break;
		case 'subclient':
			subclient();
			break;
		case 'getTitle':
			getTitle();
			break;
		default:
			break;
	}
}

function getTitle()
{
	$cid = $_GET['cid'];
	$sid = $_GET['sid'];

	if($sid != "")
	{
		$sql = "SELECT company FROM `subclient` where sid = $sid";
		$ret = query($sql);
		$list = [];
		while ($v = mysql_fetch_array($ret)) {
			array_push($list, $v);
		}
		print(json_encode($list));
	}
	else
	{
		$sql = "SELECT company FROM `company` where cid = $cid";
		$ret = query($sql);
		$list = [];
		while ($v = mysql_fetch_array($ret)) {
			array_push($list, $v);
		}
		print(json_encode($list));
	}
}

function subclient()
{
	switch($_GET['method'])
	{
		case 'get':
			$cid = $_GET['cid'];
			$sql = "SELECT * FROM `subclient` where cid = $cid";
			$ret = query($sql);
			$list = [];
			while ($v = mysql_fetch_array($ret)) {
				array_push($list, $v);
			}
			print(json_encode($list));
			break;
		case 'add':
			$company = $_REQUEST['company'];
			$tel = $_REQUEST['tel'];
			$address = $_REQUEST['address'];
			$cid = $_GET['cid'];
			$reciver = $_GET['reciver'];

			$sql = "INSERT INTO `storage`.`subclient` (`cid`, `sid`, `company`, `address`, `tel`, `reciver`, `createTime`) VALUES ('$cid', NULL, '$company', '$address', '$tel', '$reciver', CURRENT_TIMESTAMP)";
			query($sql);
			break;
		case 'del':
			$sid = $_GET['sid'];
			$sql = "DELETE FROM `storage`.`subclient` WHERE `subclient`.`sid` = $sid";
			query($sql);
			break;
		case 'edit':
			$company = $_GET['company'];
			$address = $_REQUEST['address'];
			$tel = $_REQUEST['tel'];
			$reciver = $_GET['reciver'];
			$sid = $_GET['sid'];

			$sql = "UPDATE `storage`.`subclient` SET `company` = '$company', `address` = '$address', `tel` = '$tel', `reciver` = '$reciver' WHERE `subclient`.`sid` = $sid";
			query($sql);
			break;
	}
}

function delCompany()
{
	$cid = $_GET['cid'];
	$sql = "DELETE FROM `storage`.`company` WHERE `company`.`cid` = $cid";
	query($sql);
	$sql = "DELETE FROM `storage`.`subclient` WHERE `subclient`.`cid` = $cid";
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

function editCompany()
{
	$cid = $_GET['cid'];
	$company = $_GET['company'];
	$tel = $_GET['tel'];
	$address = $_GET['address'];
	echo "$cid $company $tel $address";
	$sql = "UPDATE `storage`.`company` SET `company` = '$company', `tel` = '$tel', `address` = '$address' WHERE `company`.`cid` = $cid;";
	query($sql);
}