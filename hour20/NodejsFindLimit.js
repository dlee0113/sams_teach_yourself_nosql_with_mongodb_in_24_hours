var MongoClient = require('mongodb').MongoClient;
var Server = require('mongodb').Server;
var mongo = new MongoClient();
var myDB = null;
mongo.connect("mongodb://localhost/", function(err, db) {
  myDB = db.db("words");
  myDB.collection("word_stats", function(err, collection){
    limitResults(collection, 1);
  });
});
function displayCursor(cursor, callback, collection, limit){
  cursor.toArray(function(err, itemArr){
    var wordStr = "";
    for(var i in itemArr){
      wordStr += itemArr[i].word + ",";
    }
    if (wordStr.length > 65){
      wordStr = wordStr.slice(0, 65) + "...";
    }
    console.log(wordStr);
    if(collection){
      callback(collection, limit);      
    } else {
      myDB.close();
    }
  });
}
function limitResults(collection, limit){
  var query = {'first': 'p'};
  var cursor = collection.find(query);
  cursor.limit(limit, function(err, items){
    console.log("\nP words Limited to " + limit + ":");
    if(limit < 7){
      displayCursor(items, limitResults, collection, limit + 2);
    } else {
      displayCursor(items, limitResults, null, null);
    }
  });
}