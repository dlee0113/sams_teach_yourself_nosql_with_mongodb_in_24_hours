<?php
  $mongo = new MongoClient("");
  $db = $mongo->words;
  $collection = $db->word_stats;
  print_r("\nBefore Updating: \n");
  showWord($collection);
  updateDoc($collection);
  resetDoc($collection);
  function showWord($collection){
    $query = array('word' => array('$in' => ['left', 'lefty']));
    $cursor = $collection->find($query);
    foreach ($cursor as $id => $doc){
      print_r(json_encode($doc)."\n");
    }
  }
  function updateDoc($collection){
    $query = array('word' => "left");
    $update = array(
        '$set' => array('word' => 'lefty'),
        '$inc' => array('size' => 1, 'stats.consonants' => 1),
        '$push' => array('letters' => 'y'));
    $options = array('w' => 1, 'j' => true, 
                     'upsert' => false, 'multiple' => false);
    $results = $collection->update($query, $update, $options);
    print_r("\nUpdate Doc Result: \n");
    print_r(json_encode($results)."\n");
    print_r("\nAfter Updating Doc: \n");
    showWord($collection);
  }
  function resetDoc($collection){
    $query = array('word' => "lefty");
    $update = array(
        '$set' => array('word' => 'left'),
        '$inc' => array('size' => -1, 'stats.consonants' => -1),
        '$pop' => array('letters' => 1));
    $options = array('w' => 1, 'j' => true, 'upsert' => false, 
                     'multiple' => false);
    $results = $collection->update($query, $update, $options);
    print_r("\nReset Doc Result: \n");
    print_r(json_encode($results)."\n");
    print_r("\nAfter Resetting Doc: \n");
    showWord($collection);
  }
?>