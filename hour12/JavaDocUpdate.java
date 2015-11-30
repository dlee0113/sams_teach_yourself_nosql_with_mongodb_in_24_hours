import com.mongodb.MongoClient;
import com.mongodb.WriteConcern;
import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.DBObject;
import com.mongodb.BasicDBObject;
import com.mongodb.DBCursor;
import com.mongodb.WriteResult;
public class JavaDocUpdate {
  public static void main(String[] args) {
    try {
      MongoClient mongoClient = new MongoClient("localhost", 27017);
      mongoClient.setWriteConcern(WriteConcern.JOURNAL_SAFE);
      DB db = mongoClient.getDB("words");
      DBCollection collection = db.getCollection("word_stats");
      JavaDocUpdate.showWord(collection, "Before update");
      JavaDocUpdate.updateDoc(collection);
      JavaDocUpdate.showWord(collection, "After update");
      JavaDocUpdate.resetDoc(collection);
      JavaDocUpdate.showWord(collection, "After reset");
    } catch (Exception e) {
      System.out.println(e);
    }
  }
  public static void updateDoc(DBCollection collection){
    BasicDBObject query = new BasicDBObject("word", "left");
    BasicDBObject update = new BasicDBObject();
    update.append("$set",  new BasicDBObject("word", "lefty"));
    BasicDBObject inc = new BasicDBObject("size", 1);
    inc.append("stats.consonants", 1);
    update.append("$inc",  inc);
    update.append("$push",  new BasicDBObject("letters", "y"));
    WriteResult result = collection.update(query, update, 
                                           false, false);
    System.out.println("Update Result: \n" + result.toString());
  }
  public static void resetDoc(DBCollection collection){
    BasicDBObject query = new BasicDBObject("word", "lefty");
    BasicDBObject update = new BasicDBObject();
    update.append("$set",  new BasicDBObject("word", "left"));
    BasicDBObject inc = new BasicDBObject("size", -1);
    inc.append("stats.consonants", -1);
    update.append("$inc",  inc);
    update.append("$pop",  new BasicDBObject("letters", 1));
    WriteResult result = collection.update(query, update, 
                                           false, false);
    System.out.println("Reset Result: \n" + result.toString());
  }
  public static void showWord(DBCollection collection, String msg){
    System.out.println("\n" + msg + ": ");
    BasicDBObject query = new BasicDBObject("word", 
        new BasicDBObject("$in", new String[]{"left", "lefty"}));
    DBCursor cursor = collection.find(query);
    while(cursor.hasNext()) {
      DBObject doc = cursor.next();
      System.out.println(doc);
    }
  }
}
