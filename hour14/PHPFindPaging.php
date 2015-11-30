<?php
  $mongo = new MongoClient("");
  $db = $mongo->words;
  $collection = $db->word_stats;
  pageResults($collection, 0);
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
  function pageResults($collection, $skip){
    $query = array('first' => 'w');    
    $cursor = $collection->find($query);
    $cursor->limit(10);
    $cursor->skip($skip);
    print_r("\nPage ".($skip+1)." to ");
    print_r(($skip+$cursor->count(true)).": \n");
    displayCursor($cursor);
    if($cursor->count(true) == 10){
      pageResults($collection, $skip+10);
    }
  }
?>
