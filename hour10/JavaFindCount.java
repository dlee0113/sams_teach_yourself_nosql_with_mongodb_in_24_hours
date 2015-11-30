import com.mongodb.MongoClient;
import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.BasicDBObject;
public class JavaFindCount {
  public static void main(String[] args) {
    try {
      MongoClient mongoClient = new MongoClient("localhost", 27017);
      DB db = mongoClient.getDB("words");
      DBCollection collection = db.getCollection("word_stats");
      JavaFindCount.countWords(collection);
    } catch (Exception e){
      System.out.println(e);
    }
  }
  public static void countWords(DBCollection collection) {
    Integer count = collection.find().count();
    System.out.println("Total words in the collection: " + count);
    BasicDBObject query = new BasicDBObject("first", "a");
    count = collection.find(query).count();
    System.out.println("Total words starting with A: " + count);
  }
}