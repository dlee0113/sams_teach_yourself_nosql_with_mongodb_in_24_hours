<?php
  $mongo = new MongoClient("");
  $db = $mongo->words;
  $collection = $db->word_stats;
  limitResults($collection, 1);
  limitResults($collection, 3);
  limitResults($collection, 5);
  limitResults($collection, 7);
  function displayCursor($cursor){
    $words = "";
    foreach ($cursor as  $id => $doc){
      $words .= $doc["word"].",";
    }
    if (strlen($words) > 65){
      $words = substr($words, 0, 65)."...";
    }
    print_r($words);
  }
  function limitResults($collection, $limit){
    $query = array('first' => 'p');
    $cursor = $collection->find($query);
    $cursor->limit($limit);
    print_r("\n\nP words Limited to ".$limit." :\n");
    displayCursor($cursor);
  }
?>
