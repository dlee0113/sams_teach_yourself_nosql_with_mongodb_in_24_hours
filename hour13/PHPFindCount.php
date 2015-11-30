<?php
  $mongo = new MongoClient("");
  $db = $mongo->words;
  $collection = $db->word_stats;
  countWords($collection);
  function countWords($collection){
    $cursor = $collection->find();
    print_r("Total words in the collection: \n");
    print_r($cursor->count());
    $query = array('first' => 'a');
    $cursor = $collection->find($query);
    print_r("\n\nTotal words starting with A: \n");
    print_r($cursor->count());
  }
?>
