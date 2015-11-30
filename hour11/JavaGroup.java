import com.mongodb.MongoClient;
import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.BasicDBObject; 
import com.mongodb.DBObject;
import com.mongodb.DBCursor;
public class JavaGroup {
  public static void main(String[] args) {
    try {
      MongoClient mongoClient = new MongoClient("localhost", 27017);
      DB db = mongoClient.getDB("words");
      DBCollection collection = db.getCollection("word_stats");
      JavaGroup.firstIsALastIsVowel(collection);
      JavaGroup.firstLetterTotals(collection);
    } catch (Exception e) {
      System.out.println(e);
    }
  }
  public static void displayGroup(DBObject result){
    for (Object name: result.toMap().values()) {
      System.out.println(name);
    }
  }
  public static void firstIsALastIsVowel(DBCollection collection){
    BasicDBObject key = new BasicDBObject("first", true);
    key.append("last", true);
    BasicDBObject cond = new BasicDBObject("first", "a");
    cond.append("last", 
        new BasicDBObject("$in", 
            new String[]{"a","e","i","o","u"}));
    BasicDBObject initial = new BasicDBObject("count", 0);
    String reduce = "function (obj, prev) { prev.count++; }";
    DBObject result = collection.group(key, cond, initial, reduce);
    System.out.println("\n'A' words grouped by first and last" +
                       " letter that end with a vowel");
    JavaGroup.displayGroup(result);
  }
  public static void firstLetterTotals(DBCollection collection){
    BasicDBObject key = new BasicDBObject("first", true);
    BasicDBObject cond = new BasicDBObject();
    BasicDBObject initial = new BasicDBObject("vowels", 0);
    initial.append("cons", 0);
    String reduce = "function (obj, prev) { " +
                        "prev.vowels += obj.stats.vowels; " +
                        "prev.cons += obj.stats.consonants; " +
                    "}";
    String finalize = "function (obj) { " +
                        "obj.total = obj.vowels + obj.cons; " +
                      "}";
    DBObject result = collection.group(key, cond, initial, 
                                        reduce, finalize);
    System.out.println("\nWords grouped by first letter " +
                       "with totals: ");
    JavaGroup.displayGroup(result);
  }
}