<?php
  $mongo = new MongoClient("");
  $db = $mongo->words;
  $collection = $db->word_stats;
  print_r("\nNumber of Documents: ");
  print_r("\n".$collection->find()->count()."\n");
?>