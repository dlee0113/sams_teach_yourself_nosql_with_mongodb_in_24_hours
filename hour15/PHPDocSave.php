<?php
  $mongo = new MongoClient("");
  $db = $mongo->words;
  $collection = $db->word_stats;
  print_r("\nBefore Saving: \n");
  showWord($collection);
  saveBlueDoc($collection);
  resetDoc($collection);
  function showWord($collection){
    $query = array('word' => 'ocean');
    $fields = array('word' => true, 'category' => true);
    $doc = $collection->findOne($query, $fields);
    print_r(json_encode($doc)."\n");
  }
  function saveBlueDoc($collection){
    $query = array('word' => "ocean");
    $doc = $collection->findOne($query);
    $doc["category"] = "blue";
    $options = array('w' => 1, 'j' => true);
    $results = $collection->save($doc, $options);
    print_r("\nSave Docs Result: \n");
    print_r(json_encode($results)."\n");
    print_r("\nAfter Saving Doc: \n");
    showWord($collection);
  }
  function resetDoc($collection){
    $query = array('word' => "ocean");
    $doc = $collection->findOne($query);
    $doc["category"] = "";
    $options = array('w' => 1, 'j' => true);
    $results = $collection->save($doc, $options);
    print_r("\nReset Docs Result: \n");
    print_r(json_encode($results)."\n");
    print_r("\nAfter Resetting Doc: \n");
    showWord($collection);
  }
?>