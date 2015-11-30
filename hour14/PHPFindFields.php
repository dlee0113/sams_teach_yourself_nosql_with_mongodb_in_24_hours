<?php
  $mongo = new MongoClient("");
  $db = $mongo->words;
  $collection = $db->word_stats;
  excludeFields($collection, []);
  includeFields($collection, ["word", "size"]);
  includeFields($collection, ["word", "letters"]);
  excludeFields($collection, ["chars", "letters", "charsets"]);
  function displayCursor($doc){
    print_r(json_encode($doc)."\n");
  }
  function includeFields($collection, $fields){
    $query = array('first' => 'p');
    $fieldObj = array();
    foreach ($fields as $id => $field){
      $fieldObj[$field] = true;
    }
    $word = $collection->findOne($query, $fieldObj);
    print_r("\nIncluding ".json_encode($fields)." fields: \n");
    displayCursor($word);
  }
  function excludeFields($collection, $fields){
    $query = array('first' => 'p');
    $fieldObj = array();
    foreach ($fields as $id => $field){
      $fieldObj[$field] = false;
    }
    $doc = $collection->findOne($query, $fieldObj);
    print_r("\nExcluding ".json_encode($fields)." fields: \n");
    displayCursor($doc);
  }
?>
