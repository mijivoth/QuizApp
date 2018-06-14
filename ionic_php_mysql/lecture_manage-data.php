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


   // Retrieve the posted data
   $json    =  file_get_contents('php://input');
   $obj     =  json_decode($json);
   $key     =  strip_tags($obj->key);


   // Determine which mode is being requested
   switch($key)
   {

      // Add a new record to the technologies table
      case "insert":

         // Sanitise URL supplied values  
         $lecture_name 		         = filter_var($obj->lecture_name, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
         $instructor_email 		     = filter_var($obj->instructor_email, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
         


         // Attempt to run PDO prepared statement
         try {
            $sql 	= "INSERT INTO lectures(lecture_name, instructor_email) VALUES(:lecture_name, :instructor_email)";
            $stmt 	= $pdo->prepare($sql);
            $stmt->bindParam(':lecture_name', $lecture_name, PDO::PARAM_STR);
            $stmt->bindParam(':instructor_email', $instructor_email, PDO::PARAM_STR);
            $stmt->execute();

            echo json_encode(array('message' => 'Congratulations the record ' . $lecture_name . ' was added to the database'));
         }
         // Catch any errors in running the prepared statement
         catch(PDOException $e)
         {
            echo $e->getMessage();
         }

      break;



      // Update an existing record in the technologies table
      case "update":

         // Sanitise URL supplied values
         $name 		     = filter_var($obj->name, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
         $description	  = filter_var($obj->description, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
         $recordID	     = filter_var($obj->recordID, FILTER_SANITIZE_NUMBER_INT);

         // Attempt to run PDO prepared statement
         try {
            $sql 	= "UPDATE technologies SET name = :name, description = :description WHERE id = :recordID";
            $stmt 	=	$pdo->prepare($sql);
            $stmt->bindParam(':name', $name, PDO::PARAM_STR);
            $stmt->bindParam(':description', $description, PDO::PARAM_STR);
            $stmt->bindParam(':recordID', $recordID, PDO::PARAM_INT);
            $stmt->execute();

            echo json_encode('Congratulations the record ' . $name . ' was updated');
         }
         // Catch any errors in running the prepared statement
         catch(PDOException $e)
         {
            echo $e->getMessage();
         }

      break;



      // Remove an existing record in the technologies table
      case "delete":

         // Sanitise supplied record ID for matching to table record
         $lecture_name	=	filter_var($obj->lecture_name, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);

         // Attempt to run PDO prepared statement
         try {
            $pdo 	= new PDO($dsn, $un, $pwd);
            $sql 	= "DELETE FROM lectures WHERE lectures.lecture_name = :lecture_name";
            $stmt 	= $pdo->prepare($sql);
            $stmt->bindParam(':lecture_name', $lecture_name, PDO::PARAM_STR);
            $stmt->execute();

            echo json_encode('Congratulations the record ' . $lecture_name . ' was removed');
         }
         // Catch any errors in running the prepared statement
         catch(PDOException $e)
         {
            echo $e->getMessage();
         }

      break;
   }

?>