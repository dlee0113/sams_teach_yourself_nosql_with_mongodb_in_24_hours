var MongoClient = require('mongodb').MongoClient;
var Server = require('mongodb').Server;
var mongo = new MongoClient();
var myDB = null;
mongo.connect("mongodb://localhost/", function(err, db) {
  myDB = db.db("words");
  myDB.collection("word_stats", function(err, collection){
    console.log("Before Upserting:");
    showWord(collection, addUpsert);
  });
});
function showWord(collection, callback){
  var query = {'word': 'righty'};
  collection.find(query, function(err, items){
    items.toArray(function(err, itemsArr){
      for (var i in itemsArr){
        console.log(itemsArr[i]);
      }
      callback(collection);
    });
  });
}
function addUpsert(collection){
  var query = {'word' : 'righty'};
  var update = { '$set' :
     { 'word' : 'righty', 'first' : 'r', 'last' : 'y', 
       'size' : 4, 'category' : 'New', 
       'stats' : {'vowels' : 1, 'consonants' : 4},
       'letters' : ["r","i","g","h"], 
       'charsets' : [ 
         {'type' : 'consonants', 'chars' : ["r","g","h"]},
         {'type' : 'vowels', 'chars' : ["i"]}]}};
  var options = {w:1, wtimeout:5000, journal:true, fsync:false, 
                 upsert:true, multi:false};
  collection.update(query, update, options, function(err, results){
    console.log("\nUpsert as insert results:");
    console.log(results);
    console.log("\nAfter Upsert as insert:");
    showWord(collection, updateUpsert);
  });
}
function updateUpsert(collection){
  var query = {'word' : 'righty'} 
  var update = { '$set' :
     { 'word' : 'righty', 'first' : 'r', 'last' : 'y', 
       'size' : 6, 'category' : 'Updated', 
       'stats' : {'vowels' : 1, 'consonants' : 5},
       'letters' : ["r","i","g","h","t","y"], 
       'charsets' : [ 
         {'type' : 'consonants', 'chars' : ["r","g","h","t","y"]},
         {'type' : 'vowels', 'chars' : ["i"]}]}}
  var options = {w:1, wtimeout:5000, journal:true, fsync:false, 
      upsert:true, multi:false};
  collection.update(query, update, options, function(err, results){
    console.log("\nUpsert as update results:");
    console.log(results);
    console.log("\nAfter Upsert as update:");
    showWord(collection, cleanup);
  });
}
function cleanup(collection){
  collection.remove({word:'righty'}, function(err, results){
    myDB.close();
  });
}
