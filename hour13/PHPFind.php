<?php
  $mongo = new MongoClient("");
  $db = $mongo->words;
  $collection = $db->word_stats;
  getOne($collection);
  getManyWhile($collection);
  getManyForEach($collection);
  function getOne($collection){
    $doc = $collection->findOne();
    print_r("Single Document: \n");
    print_r(json_encode($doc));
  }
  function getManyWhile($collection){
    print_r("\n\nMany Using While Loop: \n");
    $cursor = $collection->find();
    $cursor->limit(10);
    while($cursor->hasNext()){
      $doc = $cursor->getNext();
      print_r($doc["word"]);
      print_r(",");
    }
  }
  function getManyForEach($collection){
    print_r("\n\nMany Using For Each Loop: \n");
    $cursor = $collection->find();
    $cursor->limit(10);
    foreach ($cursor as  $id => $doc){
      print_r($doc["word"]);
      print_r(",");
    }
  }
?>