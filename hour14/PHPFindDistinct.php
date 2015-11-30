<?php
  $mongo = new MongoClient("");
  $db = $mongo->words;
  $collection = $db->word_stats;
  sizesOfAllWords($collection);
  sizesOfQWords($collection);
  firstLetterOfLongWords($collection);
  function sizesOfAllWords($collection){
    $results = $collection->distinct("size");
    print_r("\nDistinct Sizes of words: \n");
    print_r(json_encode($results)."\n");
  }
  function sizesOfQWords($collection){
    $query = array('first' => 'q');
    $results = $collection->distinct("size", $query);
    print_r("\nDistinct Sizes of words starting with Q: \n");
    print_r(json_encode($results)."\n");
  }
  function firstLetterOfLongWords($collection){
    $query = array('size' => array('$gt' => 12));
    $results = $collection->distinct("first", $query);
    print_r("\nDistinct first letters of words longer than".
            "  12 characters: \n");
    print_r(json_encode($results)."\n");
  }
?>