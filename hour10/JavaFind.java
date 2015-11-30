import com.mongodb.MongoClient;
import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.DBObject;
import com.mongodb.DBCursor;
import java.util.List;
public class JavaFind {
  public static void main(String[] args) {
    try {
      MongoClient mongoClient = new MongoClient("localhost", 27017);
      DB db = mongoClient.getDB("words");
      DBCollection collection = db.getCollection("word_stats");
      JavaFind.getOne(collection);
      JavaFind.getManyWhile(collection);
      JavaFind.getManyFor(collection);
      JavaFind.getManyToArray(collection);
    } catch (Exception e) {
      System.out.println(e);
    }
  }
  public static void getOne(DBCollection collection){
    DBObject doc = collection.findOne();
    System.out.println("Single Document: ");
    System.out.println(doc.toString());
  }
  public static void getManyWhile(DBCollection collection){
    DBCursor cursor = collection.find();
    Double count = 0.0;
    while(cursor.hasNext()) {
      DBObject doc = cursor.next();
      count += Double.parseDouble(doc.get("size").toString());
    }
    System.out.println("\nTotal characters using While loop: ");
    System.out.println(count);
  }
  public static void getManyFor(DBCollection collection){
    System.out.println("\nFor loop iteration: ");
    DBCursor cursor = collection.find();    
    for(Integer i=0; i<5; i++){
      DBObject doc = cursor.next();
      System.out.println(doc.get("word"));
    }
  }
  public static void getManyToArray(DBCollection collection){
    System.out.println("\nConverted to array iteration: ");
    DBCursor cursor = collection.find();
    List<DBObject> docs = cursor.toArray(5);
    for(final DBObject doc : docs) {
      System.out.println(doc.get("word"));
    }
  }
}