import com.mongodb.MongoClient;
import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.BasicDBObject; 
import com.mongodb.DBObject;
import com.mongodb.DBCursor;
import java.util.List;
public class JavaFindDistinct {
  public static void main(String[] args) {
    try {
      MongoClient mongoClient = new MongoClient("localhost", 27017);
      DB db = mongoClient.getDB("words");
      DBCollection collection = db.getCollection("word_stats");
      JavaFindDistinct.sizesOfAllWords(collection);
      JavaFindDistinct.sizesOfQWords(collection);
      JavaFindDistinct.firstLetterOfLongWords(collection);
    } catch (Exception e) {
      System.out.println(e);
    }
  }
  public static void sizesOfAllWords(DBCollection collection){
    List<Double> results = collection.distinct("size");
    System.out.println("\nDistinct Sizes of words: ");
    System.out.println(results.toString());
  }
  public static void sizesOfQWords(DBCollection collection){
    BasicDBObject query = new BasicDBObject("first", "q"); 
    List<Double> results = collection.distinct("size", query);
    System.out.println("\nDistinct Sizes of words starting with Q: ");
    System.out.println(results.toString());
  }
  public static void firstLetterOfLongWords(DBCollection collection){
    BasicDBObject query = 
        new BasicDBObject("size", 
            new BasicDBObject("$gt", 12)); 
    List<String> results = collection.distinct("first", query);
    System.out.println("\nDistinct first letters of words longer " +
                       "than  12 characters: ");
    System.out.println(results.toString());
  }
}