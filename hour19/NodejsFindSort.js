var MongoClient = require('mongodb').MongoClient;
var Server = require('mongodb').Server;
var mongo = new MongoClient();
var myDB = null;
mongo.connect("mongodb://localhost/", function(err, db) {
  myDB = db.db("words");
  myDB.collection("word_stats", function(err, collection){
    sortWordsAscending(collection);
    sortWordsDescending(collection);
    sortWordsAscAndSize(collection);
    setTimeout(function(){myDB.close();}, 3000);
  });
});
function displayCursor(cursor, msg){
  cursor.toArray(function(err, itemArr){
    var wordStr = "";
    for(var i in itemArr){
      wordStr += itemArr[i].word + ",";
    }
    if (wordStr.length > 65){
      wordStr = wordStr.slice(0, 65) + "...";
    }
    console.log("\n" + msg + "\n" + wordStr);
  });
}
function sortWordsAscending(collection){
  var query = {'first': 'w'};
  var sorter = [['word', 1]];
  var cursor = collection.find(query);
  cursor = cursor.sort(sorter);
  displayCursor(cursor, "W words ordered ascending:");
}
function sortWordsDescending(collection){
  var query = {'first': 'w'};
  var sorter = [['word', -1]];
  var cursor = collection.find(query);
  cursor = cursor.sort(sorter);
  displayCursor(cursor, "W words ordered descending:");
}
function sortWordsAscAndSize(collection){
  var query = {'first': 'q'};
  var sorter = [['last', 1], ['size', -1]];
  var cursor = collection.find(query);
  cursor = cursor.sort(sorter);
  displayCursor(cursor, "Q words ordered first by last "+
                        "letter and then by size:");
}