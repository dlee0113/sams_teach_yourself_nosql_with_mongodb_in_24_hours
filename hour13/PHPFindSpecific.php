<?php
  $mongo = new MongoClient("");
  $db = $mongo->words;
  $collection = $db->word_stats;
  over12($collection);
  startingABC($collection);
  startEndVowels($collection);
  over6Vowels($collection);
  nonAlphaCharacters($collection);
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
  function over12($collection){
    print_r("\n\nWords with more than 12 characters: \n");
    $query = array('size' => array('$gt' => 12));
    $cursor = $collection->find($query);
    displayCursor($cursor);
  }
  function startingABC($collection){
    print_r("\n\nWords starting with A, B or C: \n");
    $query = array('first' => array('$in' => ["a","b","c"]));
    $cursor = $collection->find($query);
    displayCursor($cursor);
  }
  function startEndVowels($collection){
    print_r("\n\nWords starting and ending with a vowel: \n");
    $query = array('$and' => [
        array('first' => array('$in' => ["a","e","i","o","u"])),
        array('last' => array('$in' => ["a","e","i","o","u"]))]);
    $cursor = $collection->find($query);
    displayCursor($cursor);
  }
  function over6Vowels($collection){
    print_r("\n\nWords with more than 5 vowels: \n");
    $query = array('stats.vowels' => array('$gt' => 5));
    $cursor = $collection->find($query);
    displayCursor($cursor);
  }
  function nonAlphaCharacters($collection){
    print_r("\n\nWords with 1 non-alphabet characters: \n");
    $query = array('charsets' => 
        array('$elemMatch' => 
          array('$and' => [
            array('type' => 'other'),
            array('chars' => array('$size' => 1))])));
    $cursor = $collection->find($query);
    displayCursor($cursor);
  }
?>
