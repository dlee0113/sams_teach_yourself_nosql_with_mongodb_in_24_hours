var MongoClient = require('mongodb').MongoClient;
var Server = require('mongodb').Server;
var mongo = new MongoClient();
var myDB = null;
mongo.connect("mongodb://localhost/", function(err, db) {
  myDB = db.db("words");
  myDB.collection("word_stats", function(err, collection){
    firstIsALastIsVowel(collection);
    setTimeout(function(){myDB.close();}, 3000);
  });
});
function displayGroup(results){
  for (var i in results){
    console.log(results[i]);
  }
}
function firstIsALastIsVowel(collection){
  var key = {'first' : true, "last" : true};
  var cond = {'first' : 'a', 'last' : 
                  {'$in' : ["a","e","i","o","u"]}};
  var initial = {'count' : 0};
  var reduce = "function (obj, prev) { prev.count++; }";
  collection.group(key, cond, initial, reduce, 
    function(err, results){
    console.log("\n'A' words grouped by first and last" + 
                " letter that end with a vowel:");
    displayGroup(results);
    firstLetterTotals(collection);
  });
}
function firstLetterTotals(collection){
  var key = {'first' : true};
  var cond = {};
  var initial = {'vowels' : 0, 'cons' : 0};
  var reduce = "function (obj, prev) { " + 
                  "prev.vowels += obj.stats.vowels; " + 
                  "prev.cons += obj.stats.consonants; " + 
                "}";
  var finalize = function (obj) { 
                   obj.total = obj.vowels + obj.cons;
                 }
  collection.group(key, cond, initial, reduce, finalize, 
    function(err, results){
      console.log("\nWords grouped by first letter " + 
                  "with totals:");
      displayGroup(results);
  });
}
