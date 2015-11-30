<?php
  $mongo = new MongoClient("");
  $db = $mongo->words;
  $collection = $db->word_stats;
  print_r("\nBefore Inserting: \n");
  showNewDocs($collection);
  addSelfie($collection);
  addGoogleAndTweet($collection);
  function showNewDocs($collection){
    $query = array('category' => 'New');
    $cursor = $collection->find($query);
    foreach ($cursor as $id => $doc){
      print_r(json_encode($doc)."\n");
    }
  }
  function addSelfie($collection){
    $selfie = array(
        'word' => 'selfie', 'first' => 's', 'last' => 'e', 
        'size' => 6, 'category' => 'New', 
        'stats' => array('vowels' => 3, 'consonants' => 3),
        'letters' => ["s","e","l","f","i"], 
        'charsets' => [ 
          array('type' => 'consonants', 'chars' => ["s","l","f"]),
          array('type' => 'vowels', 'chars' => ["e","i"])]
    );
    $options = array('w' => 1, 'j' => true);
    $results = $collection->insert($selfie, $options);
    print_r("\nInserting One Results: \n");
    print_r(json_encode($results)."\n");
    print_r("After Inserting One: \n");
    showNewDocs($collection);
  }
  function addGoogleAndTweet($collection){
    $google = array(
        'word' => 'google', 'first' => 'g', 'last' => 'e',
        'size' => 6, 'category' => 'New',
        'stats' => array('vowels' => 3, 'consonants' => 3),
        'letters' => ["g","o","l","e"],
        'charsets' => [
        array('type' => 'consonants', 'chars' => ["g","l"]),
        array('type' => 'vowels', 'chars' => ["o","e"])]
    );
    $tweet = array(
        'word' => 'tweet', 'first' => 't', 'last' => 't',
        'size' => 5, 'category' => 'New',
        'stats' => array('vowels' => 2, 'consonants' => 3),
        'letters' => ["t","w","e"],
        'charsets' => [
        array('type' => 'consonants', 'chars' => ["t","w"]),
        array('type' => 'vowels', 'chars' => ["e"])]
    );
    $options = array('w' => 1, 'j' => true);
    $results = 
       $collection->batchInsert([$google, $tweet], $options);
    print_r("\nInserting Multiple Results: \n");
    print_r(json_encode($results)."\n");
    print_r("After Inserting Multiple: \n");
    showNewDocs($collection);
  }
//   cleanup($collection);
//   function cleanup($collection){
//     $collection->remove(array('category' => "New"));
//   }
?>