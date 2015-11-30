import com.mongodb.DBCursor;
import com.mongodb.DBObject;
import com.mongodb.MongoClient;
import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.BasicDBObject;
public class JavaFindLimit {
  public static void main(String[] args) {
    try {
      MongoClient mongoClient = new MongoClient("localhost", 27017);
      DB db = mongoClient.getDB("words");
      DBCollection collection = db.getCollection("word_stats");
      JavaFindLimit.limitResults(collection, 1);
      JavaFindLimit.limitResults(collection, 3);
      JavaFindLimit.limitResults(collection, 5);
      JavaFindLimit.limitResults(collection, 7);
    } catch (Exception e){
      System.out.println(e);
    }
  }
  public static void displayCursor(DBCursor cursor){
    String words = "";
    while(cursor.hasNext()){
      DBObject doc = cursor.next();
      words = words.concat(doc.get("word").toString()).concat(",");
    }
    if(words.length() > 65){
      words = words.substring(0, 65) + "...";
    }
    System.out.println(words);
  }
  public static void limitResults(DBCollection collection, 
                                  Integer limit) {
    BasicDBObject query = new BasicDBObject("first", "p");
    DBCursor cursor = collection.find(query);
    cursor.limit(limit);
    System.out.println("\nP words Limited to " + 
                       limit.toString() + " :");
    JavaFindLimit.displayCursor(cursor);
  }
}
