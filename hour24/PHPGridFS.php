<?php
  $mongo = new MongoClient("");
  $db = $mongo->myFS;
  print_r("\nFiles Before Put:");
  listGridFSFiles($db);
  putGridFSFile($db);
  print_r("\nFiles After Put:");
  listGridFSFiles($db);
  print_r("\nContents of Retrieve File:");
  getGridFSFile($db);
  deleteGridFSFile($db);
  print_r("\nFiles After Delete:");
  listGridFSFiles($db);
  function listGridFSFiles($db){
    $myFS = $db->getGridFS();
    $files = $myFS->find();
    foreach ($files as  $id => $file){
      print_r($file->getFileName());
    }
    print_r("\n");
  }
  function putGridFSFile($db){
    file_put_contents('php.txt', "Stored from PHP");
    $myFS = $db->getGridFS();
    $file = $myFS->put('php.txt');
  }
  function getGridFSFile($db){
    $myFS = $db->getGridFS();
    $file = $myFS->findOne('php.txt');
    print_r("\n".$file->getBytes()."\n");
  }
  function deleteGridFSFile($db){
    $myFS = $db->getGridFS();
    $file = $myFS->findOne('php.txt');
    $myFS->delete($file->file["_id"]);
  }
?>