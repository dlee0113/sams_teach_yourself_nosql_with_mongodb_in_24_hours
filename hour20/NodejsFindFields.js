var MongoClient = require('mongodb').MongoClient;
var Server = require('mongodb').Server;
var mongo = new MongoClient();
var myDB = null;
mongo.connect("mongodb://localhost/", function(err, db) {
  myDB = db.db("words");
  myDB.collection("word_stats", function(err, collection){
    includeFields(collection, ['word', 'size']);
    includeFields(collection, ['word', 'letters']);
    excludeFields(collection, ['letters', 'stats', 'charsets']);
    setTimeout(function(){myDB.close();}, 3000);
  });
});
function displayCursor(doc, msg){
  console.log("\n" + msg);
  console.log(doc);
}
function includeFields(collection, fields){
  var query = {'first': 'p'};
  var fieldObj = {};
  for (var i in fields){
    fieldObj[fields[i]] = true;
  }
  collection.findOne(query, {fields: fieldObj}, function(err, doc){
    displayCursor(doc, "Including " + fields +" fields:");
  });
}
function excludeFields(collection, fields){
  var query = {'first': 'p'};
  var fieldObj = {};
  for (var i in fields){
    fieldObj[fields[i]] = false;
  }
  collection.findOne(query, {fields: fieldObj}, function(err, doc){
    displayCursor(doc, "Excluding " + fields +" fields:");
  });
}