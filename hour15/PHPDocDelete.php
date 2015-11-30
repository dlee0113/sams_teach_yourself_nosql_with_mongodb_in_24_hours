<?php
  $mongo = new MongoClient("");
  $db = $mongo->words;
  $collection = $db->word_stats;
  print_r("\nBefore Deleting: \n");
  showNewDocs($collection);
  removeNewDocs($collection);
  function showNewDocs($collection){
    $query = array('category' => 'New');
    $cursor = $collection->find($query);
    foreach ($cursor as $id => $doc){
      print_r(json_encode($doc)."\n");
    }
  }
  function removeNewDocs($collection){
    $query = array('category' => "New");
    $options = array('w' => 1, 'j' => true);
    $results = $collection->remove($query, $options);
    print_r("\nDelete Docs Result: \n");
    print_r(json_encode($results)."\n");
    print_r("\nAfter Deleting Docs: \n");
    showNewDocs($collection);
  }
?>