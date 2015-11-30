var MongoClient = require('mongodb').MongoClient;
var Server = require('mongodb').Server;
var mongo = new MongoClient();
var myDB = null;
mongo.connect("mongodb://localhost/", function(err, db) {
  myDB = db.db("words");
  myDB.collection("word_stats", function(err, collection){
    pageResults(collection, 0);
  });
});
function displayCursor(cursor, callback, collection, skip, more){
  cursor.toArray(function(err, itemArr){
    var wordStr = "";
    for(var i in itemArr){
      wordStr += itemArr[i].word + ",";
    }
    if (wordStr.length > 65){
      wordStr = wordStr.slice(0, 65) + "...";
    }
    console.log(wordStr);
    if(more){    
      callback(collection, skip);
    } else {
      myDB.close();  
    }
  });
}
function pageResults(collection, skip){
  var query = {'first': 'w'};
  var cursor = collection.find(query);
  cursor.skip(skip).limit(10, function(err, items){
    items.count(true, function(err, count){
      var pageStart = skip+1;
      var pageEnd = skip+count;
      var more = count==10;
      console.log("Page " + pageStart + " to " + pageEnd + ":");
      displayCursor(items, pageResults, collection, pageEnd, more);
    });
  });
}