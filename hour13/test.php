<?php
  $mongo = new MongoClient("");
  $db = $mongo->words;
  $collection = $db->word_stats;
  sortWordsAscending($collection);
  sortWordsDescending($collection);
  sortWordsAscAndSize($collection);
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
  function sortWordsAscending($collection){
    $query = array('first' => 'w');
    $cursor = $collection->find($query);
    $sorter = array('word' => 1);
    $cursor->sort($sorter);
    print_r("\n\nW words ordered ascending: \n");
    displayCursor($cursor);
  }
  function sortWordsDescending($collection){
    $query = array('first' => 'w');
    $cursor = $collection->find($query);
    $sorter = array('word' => -1);
    $cursor->sort($sorter);
    print_r("\n\nW words ordered descending: \n");
    displayCursor($cursor);
  }
  function sortWordsAscAndSize($collection){
    $query = array('first' => 'q');
    $cursor = $collection->find($query);
    $sorter = array('last' => 1, 'size' => -1);
    $cursor->sort($sorter);
    print_r("\n\nQ words ordered first by last letter ");
    print_r("and then by size: \n");
    displayCursor($cursor);
  }
?>