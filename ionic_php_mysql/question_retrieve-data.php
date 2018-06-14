<?php
    header('Access-Control-Allow-Origin: *');
   // Define database connection parameters
   $hn      = 'localhost';
   $un      = 'root';
   $pwd     = '';
   $db      = 'quizapp';
   $cs      = 'utf8';

   // Set up the PDO parameters
   $dsn 	= "mysql:host=" . $hn . ";port=3306;dbname=" . $db . ";charset=" . $cs;
   $opt 	= array(
                        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
                        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_OBJ,
                        PDO::ATTR_EMULATE_PREPARES   => false,
                       );
   // Create a PDO instance (connect to the database)
   $pdo 	= new PDO($dsn, $un, $pwd, $opt);
   $data    = array();

   $lectureName = $_GET['lectureName'];
   $moduleNumber = $_GET['moduleNumber'];
   $questionNumber = $_GET['questionNumber'];
   $key = $_GET ['key'];

switch($key)
{
   // Attempt to query database table and retrieve data
case "answers":
   try {
      $stmt 	= $pdo->query("SELECT * FROM questions WHERE which_lecture ='".$lectureName."'AND which_module='".$moduleNumber."'ORDER BY question_number ASC");
      while($row  = $stmt->fetch(PDO::FETCH_OBJ))
      {
         // Assign each row of data to associative array
         $data[] = $row;
      }

      // Return data as JSON
      echo json_encode($data);
   }
   catch(PDOException $e)
   {
      echo $e->getMessage();
   }

   break;

   case "questions":
   // Attempt to query database table and retrieve data
   try {
      $stmt 	= $pdo->query("SELECT question_number, question_content, explanation, degreeOfdifficulty, degreeOfimportance,
      questions.which_module, questions.which_lecture, answer_number,answer_content, result, which_question FROM questions 
      RIGHT JOIN answer ON questions.which_lecture = answer.which_lecture AND questions.which_module = answer.which_module AND question_number = which_question
      WHERE questions.which_lecture ='".$lectureName."'AND questions.which_module='".$moduleNumber."'
      ORDER BY which_question, answer_number ASC");
      while($row  = $stmt->fetch(PDO::FETCH_OBJ))
      {
         // Assign each row of data to associative array
         $data[] = $row;
      }

      // Return data as JSON
      echo json_encode($data);
   }
   catch(PDOException $e)
   {
      echo $e->getMessage();
   }

   break;
}
?>