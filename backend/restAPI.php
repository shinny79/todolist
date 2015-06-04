<?php
// header('content')
$method = $_SERVER['REQUEST_METHOD'];
// var_dump($method);
try{
	$config = parse_ini_file('config.ini');
	$conn = new mysqli($config['host'],$config['username'],$config['password'],$config['name']);
	if($conn->connect_error){
		throw new Exception("Error Processing Request", 1);
	}

	$conn->multi_query('set names utf8');

	// get all
	if(isset($_GET['userId'])&&$_GET['userId']==1){
		$sql = 'SELECT * FROM Assign WHERE 1';
		$result = $conn->query($sql);
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


	// post some
	if(file_get_contents("php://input")&&$_SERVER['REQUEST_METHOD'] == 'POST'){
		$raw = json_decode(file_get_contents("php://input"));

		$sql = 'INSERT INTO Assign (content,isdone,isimportant,end_time)VALUES (?,?,?,?)';
		$stmt = $conn->prepare($sql);

		for($i=0;$i<count($raw->assign);$i++){
			$assTemp = $raw->assign[$i];
			$isimportant = (isset($assTemp->isImportant))?($assTemp->isImportant):(0);
			$isdone = (isset($assTemp->isdone))?($assTemp->isdone):(0);
			$endTime = (isset($assTemp->endTime))?($assTemp->endTime):(0);
			$stmt->bind_param("siis",$assTemp->context,$isdone,$isimportant,$endTime);
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

}catch(Exception $e){
	echo $e->getMessage();
}

