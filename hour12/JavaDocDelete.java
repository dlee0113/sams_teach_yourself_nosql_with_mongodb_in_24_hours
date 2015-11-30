import com.mongodb.MongoClient;
import com.mongodb.WriteConcern;
import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.DBObject;
import com.mongodb.BasicDBObject;
import com.mongodb.DBCursor;
import com.mongodb.WriteResult;
public class JavaDocDelete {
  public static void main(String[] args) {
    try {
      MongoClient mongoClient = new MongoClient("localhost", 27017);
      mongoClient.setWriteConcern(WriteConcern.JOURNAL_SAFE);
      DB db = mongoClient.getDB("words");
      DBCollection collection = db.getCollection("word_stats");
      JavaDocDelete.showNewDocs(collection, "Before delete");
      JavaDocDelete.removeNewDocs(collection);
      JavaDocDelete.showNewDocs(collection, "After delete");
    } catch (Exception e) {
      System.out.println(e);
    }
  }
  public static void removeNewDocs(DBCollection collection){
    BasicDBObject query = new BasicDBObject("category", "New");
    WriteResult result = collection.remove(query);
    System.out.println("Delete Result: \n" + 
        result.toString());
  }
  public static void showNewDocs(DBCollection collection, 
                                 String msg){
    System.out.println("\n" + msg + ": ");
    BasicDBObject query = new BasicDBObject("category", "New");
    DBCursor cursor = collection.find(query);
    while(cursor.hasNext()) {
      DBObject doc = cursor.next();
      System.out.println(doc);
    }
  }
}
