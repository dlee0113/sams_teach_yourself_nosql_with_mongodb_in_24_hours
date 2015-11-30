<?php
  $mongo = new MongoClient("");
  $db = $mongo->words;
  $collection = $db->word_stats;
  print_r("\nBefore Upserting: \n");
  showWord($collection);
  addUpsert($collection);
  updateUpsert($collection);
  function showWord($collection){
    $query = array('word' => 'righty');
    $doc = $collection->findOne($query);
    print_r(json_encode($doc)."\n");
  }
  function addUpsert($collection){
    $query = array('word' => 'righty');
    $update = array( '$set' =>
       array(
         'word' => 'righty', 'first' => 'r', 'last' => 'y', 
         'size' => 4, 'category' => 'New', 
         'stats' => array('vowels' => 1, 'consonants' => 4),
         'letters' => ["r","i","g","h"], 
         'charsets' => [ 
           array('type' => 'consonants', 'chars' => ["r","g","h"]),
           array('type' => 'vowels', 'chars' => ["i"])]
       ));
    $options = array('w' => 1, 'j' => true,
                     'upsert' => true, 'multiple' => false);
    $results = $collection->update($query, $update, $options);
    print_r("\nUpsert as insert results: \n");
    print_r(json_encode($results)."\n");
    print_r("After Upsert as insert: \n");
    showWord($collection);
  }
  function updateUpsert($collection){
    $query = array('word' => 'righty'); 
    $update = array( '$set' =>
       array(
         'word' => 'righty', 'first' => 'r', 'last' => 'y', 
         'size' => 6, 'category' => 'Updated', 
         'stats' => array('vowels' => 1, 'consonants' => 5),
         'letters' => ["r","i","g","h","t","y"], 
         'charsets' => [ 
           array('type' => 'consonants', 'chars' => ["r","g","h","t","y"]),
           array('type' => 'vowels', 'chars' => ["i"])]
       ));
    $options = array('w' => 1, 'j' => true,
                     'upsert' => true, 'multiple' => false);
    $results = $collection->update($query, $update, $options);
    print_r("\nUpsert as update results: \n");
    print_r(json_encode($results)."\n");
    print_r("After Upsert as update: \n");
    showWord($collection);
    cleanupWord($collection);
  }
  function cleanupWord($collection){
    $collection->remove(array('word' => 'righty'));
  }
?>