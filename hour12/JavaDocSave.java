import com.mongodb.MongoClient;
import com.mongodb.WriteConcern;
import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.DBObject;
import com.mongodb.BasicDBObject;
import com.mongodb.DBCursor;
import com.mongodb.WriteResult;
public class JavaDocSave {
  public static void main(String[] args) {
    try {
      MongoClient mongoClient = new MongoClient("localhost", 27017);
      mongoClient.setWriteConcern(WriteConcern.JOURNAL_SAFE);
      DB db = mongoClient.getDB("words");
      DBCollection collection = db.getCollection("word_stats");
      JavaDocSave.showWord(collection, "Before save");
      JavaDocSave.saveBlueDoc(collection);
      JavaDocSave.showWord(collection, "After save");
      JavaDocSave.resetDoc(collection);
      JavaDocSave.showWord(collection, "After reset");
    } catch (Exception e) {
      System.out.println(e);
    }
  }
  public static void saveBlueDoc(DBCollection collection){
    BasicDBObject query = new BasicDBObject("word", "ocean");
    DBObject word = collection.findOne(query);
    word.put("category", "blue");
    WriteResult result = collection.save(word);
    System.out.println("Update Result: \n" + result.toString());
  }
  public static void resetDoc(DBCollection collection){
    BasicDBObject query = new BasicDBObject("word", "ocean");
    DBObject word = collection.findOne(query);
    word.put("category", "");
    WriteResult result = collection.save(word);
    System.out.println("Update Result: \n" + result.toString());
  }
  public static void showWord(DBCollection collection, String msg){
    System.out.println("\n" + msg + ": ");
    BasicDBObject query = new BasicDBObject("word", "ocean");
    BasicDBObject fields = new BasicDBObject("word", 1);
    fields.append("category", 1);
    DBObject doc = collection.findOne(query, fields);
    System.out.println(doc);
  }
}
