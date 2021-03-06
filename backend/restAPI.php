<?php
// header('content')
$weatherURL = 'http://www.weather.com.cn/adat/cityinfo/101010100.html';//get weather
$temperURL = 'http://www.weather.com.cn/adat/sk/101010100.html';//get temp

function curlGet($url){
	$ch = curl_init();
	
	curl_setopt($ch, CURLOPT_URL, $url);
	curl_setopt($ch, CURLOPT_HEADER, false);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 3);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 2);

    $ret = curl_exec($ch);
	$err = curl_error($ch);

	curl_close($ch);

	$r = json_decode($ret);
	return $r;
}
try{
	$config = parse_ini_file('config.ini');
	$conn = new mysqli($config['host'],$config['username'],$config['password'],$config['name']);
	if($conn->connect_error){
		throw new Exception("Error Processing Request", 1);
	}

	$conn->multi_query('set names utf8');

	// get all
	if(isset($_GET['category'])){
		$str = ($_GET['category']=='all')?(1):('category = "'.$_GET["category"].'"');
		$sql = 'SELECT * FROM Assign WHERE '.$str;
		$result = $conn->query($sql);
		if(!$result||!$result->num_rows){
			$data = array(
				'errorCode' => 200,
				'errorMessage' => 'not find!');
			echo json_encode($data);
			exit();
		}
		$assignArr = array();
		if ($result->num_rows > 0) {
		    while($row = $result->fetch_object()) {
		        array_push($assignArr, $row);

		    }
		}
		$data = array(
			'errorCode' => 200,
			'errorMessage' => 'get all!',
			'data'=>$assignArr);
		echo json_encode($data);
	}


	// insert some
	if(file_get_contents("php://input")&&$_SERVER['REQUEST_METHOD'] == 'POST'){
		$raw = json_decode(file_get_contents("php://input"));
		// var_dump($raw);
		// var_dump(file_get_contents("php://input"));
		$sql = 'INSERT INTO Assign (content,isdone,isimportant,end_time)VALUES (?,?,?,?)';
		$stmt = $conn->prepare($sql);

		for($i=0;$i<count($raw->assign);$i++){
			$assTemp = $raw->assign[$i];
			$isimportant = (isset($assTemp->isImportant))?($assTemp->isImportant):(0);
			$isdone = (isset($assTemp->isdone))?($assTemp->isdone):(0);
			$endTime = (isset($assTemp->endTime))?($assTemp->endTime):(0);
			$context = $assTemp->context;
			// $context = ($assTemp->context);
			$stmt->bind_param("siis",$context,$isdone,$isimportant,$endTime);
			$stmt->execute();
		}

		$stmt->close();
		$response = array(
			'errorMessage' => 'added!',
			'errorCode' => 200);
		echo json_encode($response);
	}

	// delete some 
	if(isset($_GET['deleteId'])){
		$arr = explode('|',$_GET['deleteId']);
		$sql = "DELETE FROM Assign WHERE id=?";
		$stmt = $conn->prepare($sql);

		for($i=0;$i<count($arr);$i++){
			$stmt->bind_param("i",$arr[$i]);
			$stmt->execute();
		}
		$stmt->close();
		$response = array(
			'errorMessage' => 'deleted!',
			'errorCode' => 200);
		echo json_encode($response);
	}

	// finish some
	if(isset($_GET['id'])){
		$arr = explode('|',$_GET['id']);
		$sql = 'UPDATE Assign SET isdone=1 WHERE id=?';
		$stmt = $conn->prepare($sql);

		for($i=0;$i<count($arr);$i++){
			$stmt->bind_param("i",$arr[$i]);
			$stmt->execute();
		}
		$stmt->close();
		$response = array(
			'errorMessage' => 'finished!',
			'errorCode' => 200);
		echo json_encode($response);
	}	

	//search some
	if(isset($_GET['keyword'])){
		$str = ($_GET['keyword']);
		$sql = 'SELECT * FROM Assign WHERE content LIKE "%'.$str.'%"';
		$result = $conn->query($sql);
		if(!$result||!$result->num_rows){
			$data = array(
				'errorCode' => 200,
				'errorMessage' => 'can not find!');
			echo json_encode($data);
			exit();
		}
		$assignArr = array();
		if ($result->num_rows > 0) {
		    while($row = $result->fetch_object()) {
		        array_push($assignArr, $row);

		    }
		}
		$data = array(
			'errorCode' => 200,
			'errorMessage' => 'get all!',
			'data'=>$assignArr);
		echo json_encode($data);
	}

	//get weather
	if(isset($_GET['weather'])&&$_GET['weather']){
		$weather = curlGet($weatherURL);
		$temper = curlGet($temperURL);
		$weatherArr = $weather->weatherinfo;
		$temperArr = $temper->weatherinfo;
		$weaResult = array(
			'data'=>array(
				'city' => $weatherArr->city,
				'weather'=> $weatherArr->weather,
				'temp' => $temperArr->temp));
		echo json_encode($weaResult);
	}
}catch(Exception $e){
	echo $e->getMessage();
}