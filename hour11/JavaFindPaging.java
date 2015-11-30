import com.mongodb.DBCursor;
import com.mongodb.DBObject;
import com.mongodb.MongoClient;
import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.BasicDBObject;
public class JavaFindPaging {
  public static void main(String[] args) {
    try {
      MongoClient mongoClient = new MongoClient("localhost", 27017);
      DB db = mongoClient.getDB("words");
      DBCollection collection = db.getCollection("word_stats");
      JavaFindPaging.pageResults(collection, 0);
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
  public static void pageResults(DBCollection collection, 
                                 Integer skip) {
    BasicDBObject query = new BasicDBObject("first", "w");
    DBCursor cursor = collection.find(query);
    cursor.sort(new BasicDBObject("word", 1));
    cursor.limit(10);
    cursor.skip(skip);
    System.out.println("Page " + new Integer(skip+1).toString() + 
                       " to " + 
                       new Integer(skip+cursor.size()).toString() + 
                       ":");
    JavaFindPaging.displayCursor(cursor);
    if (cursor.size() == 10){
      JavaFindPaging.pageResults(collection, skip+10);
    }
  }
}