<?php
  $mongo = new MongoClient("");
  $db = $mongo->words;
  $collection = $db->word_stats;
  firstIsALastIsVowel($collection);
  firstLetterTotals($collection);
  function displayGroup($results){
    foreach($results['retval'] as $idx => $result){
      print_r(json_encode($result)."\n");
    }
  }
  function firstIsALastIsVowel($collection){
    $key = array('first' => true, "last" => true);
    $cond = array('first' => 'a', 'last' => 
                    array('$in' => ["a","e","i","o","u"]));
    $initial = array('count' => 0);
    $reduce = "function (obj, prev) { prev.count++; }";
    $options = array('condition' => $cond);
    $results = $collection->group($key, $initial, $reduce, $options);
    print_r("\n\n'A' words grouped by first and last".
            " letter that end with a vowel:\n");
    displayGroup($results);
  }
  function firstLetterTotals($collection){
    $key = array('first' => true);
    $cond = array();
    $initial = array('vowels' => 0, 'cons' => 0);
    $reduce = "function (obj, prev) { " .
                 "prev.vowels += obj.stats.vowels; " .
                  "prev.cons += obj.stats.consonants; " .
              "}";
    $finalize = "function (obj) { " .
                   "obj.total = obj.vowels + obj.cons; " .
                "}";
    $options = array('condition' => $cond, 
                     'finalize' => $finalize);
    $results = $collection->group($key, $initial, $reduce, $options);
    print_r("\n\nWords grouped by first letter ".
            "with totals:\n");
    displayGroup($results);
  }
?>
