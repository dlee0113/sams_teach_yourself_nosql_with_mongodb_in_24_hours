<?php
  $mongo = new MongoClient("");
  $db = $mongo->words;
  $collection = $db->word_stats;
  largeSmallVowels($collection);
  top5AverageWordFirst($collection);
  function displayAggregate($result){
    foreach($result['result'] as $idx => $item){
       print_r(json_encode($item)."\n");
    }
  }
  function largeSmallVowels($collection){
    $match = array('$match' =>
               array('first' =>
                 array('$in' => ['a','e','i','o','u'])));
    $group = array('$group' => 
               array('_id' => '$first', 
                     'largest' => array('$max' => '$size'),
                     'smallest' => array('$min' => '$size'),
                     'total' => array('$sum' => 1)));
    $sort = array('$sort' => array('first' => 1));
    $result = $collection->aggregate($match, $group, $sort);
    print_r("\nLargest and smallest word sizes for ".
            "words beginning with a vowel:\n");
    displayAggregate($result);
  }
  function top5AverageWordFirst($collection){
    $group = array('$group' => 
               array('_id' => '$first', 
                     'average' => array('$avg' => '$size')));
    $sort = array('$sort' => array('average' => -1));
    $limit = array('$limit' => 5);
    $result = $collection->aggregate($group, $sort, $limit);
    print_r("\nFirst letter of top 5 largest average ".
            "word size:\n");
    displayAggregate($result);
  }
?>