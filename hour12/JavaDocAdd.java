import com.mongodb.MongoClient;
import com.mongodb.WriteConcern;
import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.DBObject;
import com.mongodb.BasicDBObject;
import com.mongodb.DBCursor;
import com.mongodb.WriteResult;
public class JavaDocAdd {
  public static void main(String[] args) {
    try {
      MongoClient mongoClient = new MongoClient("localhost", 27017);
      mongoClient.setWriteConcern(WriteConcern.JOURNAL_SAFE);
      DB db = mongoClient.getDB("words");
      DBCollection collection = db.getCollection("word_stats");
      JavaDocAdd.showNewDocs(collection, "Before Additions");
      JavaDocAdd.addSelfie(collection);
      JavaDocAdd.showNewDocs(collection, "After adding single");
      JavaDocAdd.addGoogleAndTweet(collection);
      JavaDocAdd.showNewDocs(collection, "After adding mutliple");
    } catch (Exception e) {
      System.out.println(e);
    }
  }
  public static void addSelfie(DBCollection collection){
    BasicDBObject selfie = new BasicDBObject("word","selfie");
    selfie.append("first", "s").append("last", "e");
    selfie.append("size", 6).append("category", "New");
    BasicDBObject stats = new BasicDBObject("consonants", 3);
    stats.append("vowels",  3);
    selfie.append("stats", stats);
    selfie.append("letters", new String[]{"s","e","l","f","i"});
    BasicDBObject cons = new BasicDBObject("type", "consonants");
    cons.append("chars", new String[]{"s","l","f"});
    BasicDBObject vowels = new BasicDBObject("type", "vowels");
    vowels.append("chars", new String[]{"e","i"});
    BasicDBObject[] charsets = new BasicDBObject[]{cons, vowels};
    selfie.append("charsets", charsets);
    WriteResult result = collection.insert(selfie);
    System.out.println("Insert One Result: \n" + result.toString());
  }
  public static void addGoogleAndTweet(DBCollection collection){
    //Create google Object
    BasicDBObject google = new BasicDBObject("word","google");
    google.append("first", "g").append("last", "e");
    google.append("size", 6).append("category", "New");
    BasicDBObject stats = new BasicDBObject("consonants", 3);
    stats.append("vowels",  3);
    google.append("stats", stats);
    google.append("letters", new String[]{"g","o","l","e"});
    BasicDBObject cons = new BasicDBObject("type", "consonants");
    cons.append("chars", new String[]{"g","l"});
    BasicDBObject vowels = new BasicDBObject("type", "vowels");
    vowels.append("chars", new String[]{"o","e"});
    BasicDBObject[] charsets = new BasicDBObject[]{cons, vowels};
    google.append("charsets", charsets);
    //Create tweet Object
    BasicDBObject tweet = new BasicDBObject("word","tweet");
    tweet.append("first", "t").append("last", "t");
    tweet.append("size", 6).append("category", "New");
    BasicDBObject tstats = new BasicDBObject("consonants", 3);
    stats.append("vowels",  2);
    tweet.append("stats", tstats);
    tweet.append("letters", new String[]{"t","w","e"});
    BasicDBObject tcons = new BasicDBObject("type", "consonants");
    tcons.append("chars", new String[]{"t","w"});
    BasicDBObject tvowels = new BasicDBObject("type", "vowels");
    tvowels.append("chars", new String[]{"e"});
    BasicDBObject[] tcharsets = new BasicDBObject[]{tcons, tvowels};
    tweet.append("charsets", tcharsets);
    //Insert object array
    WriteResult result = collection.insert(
        new BasicDBObject[]{google, tweet});
    System.out.println("Insert Multiple Result: \n" + 
                       result.toString());
  }
  public static void showNewDocs(DBCollection collection, String msg){
    System.out.println("\n" + msg + ": ");
    BasicDBObject query = new BasicDBObject("category", "New");
    DBCursor cursor = collection.find(query);
    while(cursor.hasNext()) {
      DBObject doc = cursor.next();
      System.out.println(doc);
    }
  }
}
