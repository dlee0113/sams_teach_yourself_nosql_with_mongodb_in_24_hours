mongo = new Mongo('localhost');
wordsDB = mongo.getDB('words');
wordsDB.runCommand( { getLastError: 1, w: 1, j: true, wtimeout: 1000 } );
wordsColl = wordsDB.getCollection('word_stats');
wordsColl.insert({word:"the"});
lastError = wordsDB.getLastError();
if(lastError){
  print("ERROR: " + lastError);
}
results = wordsDB.runCommand( { getLastError: 1});
if(results.err){
  print("ERROR: " + results.err);
}