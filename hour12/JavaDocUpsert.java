import com.mongodb.MongoClient;
import com.mongodb.WriteConcern;
import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.DBObject;
import com.mongodb.BasicDBObject;
import com.mongodb.DBCursor;
import com.mongodb.WriteResult;
public class JavaDocUpsert {
  public static void main(String[] args) {
    try {
      MongoClient mongoClient = new MongoClient("localhost", 27017);
      mongoClient.setWriteConcern(WriteConcern.JOURNAL_SAFE);
      DB db = mongoClient.getDB("words");
      DBCollection collection = db.getCollection("word_stats");
      JavaDocUpsert.showWord(collection, "Before upsert");
      JavaDocUpsert.addUpsert(collection);
      JavaDocUpsert.updateUpsert(collection);
    } catch (Exception e) {
      System.out.println(e);
    }
  }
  public static void showWord(DBCollection collection, String msg){
    System.out.println("\n" + msg + ": ");
    BasicDBObject query = new BasicDBObject("word", "righty");
    DBObject doc = collection.findOne(query);
    System.out.println(doc);
  }
  public static void addUpsert(DBCollection collection){
    BasicDBObject query = new BasicDBObject("word", "righty");
    BasicDBObject setOp = new BasicDBObject("word","righty");    
    setOp.append("first", "l").append("last", "y");
    setOp.append("size", 4).append("category", "New");
    BasicDBObject stats = new BasicDBObject("consonants", 4);
    stats.append("vowels",  1);
    setOp.append("stats", stats);
    setOp.append("letters", new String[]{"r","i","g","h"});
    BasicDBObject cons = new BasicDBObject("type", "consonants");
    cons.append("chars", new String[]{"r","g","h"});
    BasicDBObject vowels = new BasicDBObject("type", "vowels");
    vowels.append("chars", new String[]{"i"});
    BasicDBObject[] charsets = new BasicDBObject[]{cons, vowels};
    setOp.append("charsets", charsets);
    BasicDBObject update = new BasicDBObject("$set", setOp);
    WriteResult result = collection.update(query, update, 
                                            true, false);
    System.out.println("Update as insert Result: \n" + 
                       result.toString());
    JavaDocUpsert.showWord(collection, "After upsert as insert");
  }
  public static void updateUpsert(DBCollection collection){
    BasicDBObject query = new BasicDBObject("word", "righty");
    BasicDBObject setOp = new BasicDBObject("word","righty");    
    setOp.append("first", "l").append("last", "y");
    setOp.append("size", 6).append("category", "New");
    BasicDBObject stats = new BasicDBObject("consonants", 5);
    stats.append("vowels",  1);
    setOp.append("stats", stats);
    setOp.append("letters", new String[]{"r","i","g","h","t","y"});
    BasicDBObject cons = new BasicDBObject("type", "consonants");
    cons.append("chars", new String[]{"r","g","h","t","y"});
    BasicDBObject vowels = new BasicDBObject("type", "vowels");
    vowels.append("chars", new String[]{"i"});
    BasicDBObject[] charsets = new BasicDBObject[]{cons, vowels};
    setOp.append("charsets", charsets);
    BasicDBObject update = new BasicDBObject("$set", setOp);
    WriteResult result = collection.update(query, update, 
                                            true, false);
    System.out.println("Update as insert Result: \n" + 
                        result.toString());
    JavaDocUpsert.showWord(collection, "After upsert as update");
    JavaDocUpsert.cleanupWord(collection);
  }
  public static void cleanupWord(DBCollection collection){
    BasicDBObject query = new BasicDBObject("word", "righty");
    collection.remove(query);
  }
}
