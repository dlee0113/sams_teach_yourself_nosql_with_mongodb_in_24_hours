import com.mongodb.DBCursor;
import com.mongodb.DBObject;
import com.mongodb.MongoClient;
import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.BasicDBObject;
import java.util.Arrays;
public class JavaFindFields {
  public static void main(String[] args) {
    try {
      MongoClient mongoClient = new MongoClient("localhost", 27017);
      DB db = mongoClient.getDB("words");
      DBCollection collection = db.getCollection("word_stats");
      JavaFindFields.excludeFields(collection, 
          new String[]{});
      JavaFindFields.includeFields(collection, 
          new String[]{"word"});
      JavaFindFields.includeFields(collection, 
          new String[]{"word", "stats"});
      JavaFindFields.excludeFields(collection, 
          new String[]{"stats", "charsets"});
    } catch (Exception e){
      System.out.println(e);
    }
  }
  public static void displayCursor(DBCursor cursor){
    while(cursor.hasNext()){
      DBObject doc = cursor.next();
      System.out.println(doc);
    }
  }
  public static void includeFields(DBCollection collection, 
                                   String[] fields) {
    BasicDBObject query = new BasicDBObject("first", "p");
    BasicDBObject fieldDoc = new BasicDBObject();
    for(final String field : fields) {
      fieldDoc.append(field, 1);
    }
    DBCursor cursor = collection.find(query, fieldDoc);
    cursor.limit(1);
    System.out.println("\nIncluding " + Arrays.toString(fields) +
                       " fields: ");
    JavaFindFields.displayCursor(cursor);
  }
  public static void excludeFields(DBCollection collection, 
                                   String[] fields) {
    BasicDBObject query = new BasicDBObject("first", "p");
    BasicDBObject fieldDoc = new BasicDBObject();
    for(final String field : fields) {
      fieldDoc.append(field, false);
    }
    DBCursor cursor = collection.find(query, fieldDoc);
    cursor.limit(1);
    System.out.println("\nExcluding " + Arrays.toString(fields) +
                       " fields: ");
    JavaFindFields.displayCursor(cursor);
  }
}
