var MongoClient = require('mongodb').MongoClient;
var Server = require('mongodb').Server;
var mongo = new MongoClient();
var myDB = null;
mongo.connect("mongodb://localhost/", function(err, db) {
  myDB = db.db("words");
  myDB.collection("word_stats", function(err, collection){
    getOne(collection);
    setTimeout(function(){myDB.close();}, 3000);
  });
});
function getOne(collection){
  collection.findOne({}, function(err, item){
    console.log("Single Document: ");
    console.log(item);
    getManyFor(collection);
  });
}
function getManyFor(collection){
  var cursor = collection.find();
  cursor.toArray(function(err, itemArr){
    console.log("\nWords Using Array For Loop: ");
    for(var i=0; i<5; i++){
      console.log(itemArr[i].word);
    }
    getManyEach(collection);
  });
}
function getManyEach(collection){
  var cursor = collection.find().limit(5);
  console.log("\nWords Using Each Loop: ");
  cursor.each(function(err, item){
    if(item){
      console.log(item['word']);
    }
  });
}