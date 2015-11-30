import com.mongodb.MongoClient;
import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.BasicDBObject; 
import com.mongodb.DBObject;
import com.mongodb.DBCursor;
import com.mongodb.AggregationOutput;
import java.util.Iterator;
public class JavaAggregate {
  public static void main(String[] args) {
    try {
      MongoClient mongoClient = new MongoClient("localhost", 27017);
      DB db = mongoClient.getDB("words");
      DBCollection collection = db.getCollection("word_stats");
      JavaAggregate.largeSmallVowels(collection);
      JavaAggregate.top5AverageWordFirst(collection);
    } catch (Exception e) {
      System.out.println(e);
    }
  }
  public static void displayAggregate(AggregationOutput result){
    for (Iterator<DBObject> items = result.results().iterator(); 
         items.hasNext();){
      System.out.println(items.next());
    }
  }
  public static void largeSmallVowels(DBCollection collection){
    BasicDBObject match = new BasicDBObject("$match", 
        new BasicDBObject("first",
            new BasicDBObject ("$in", 
                new String[]{"a","e","i","o","u"})));
    BasicDBObject groupOps = new BasicDBObject("_id", "$first");
    groupOps.append("largest", new BasicDBObject("$max", "$size"));
    groupOps.append("smallest", new BasicDBObject("$min", "$size"));
    groupOps.append("total", new BasicDBObject("$sum", 1));
    BasicDBObject group = new BasicDBObject("$group", groupOps);
    BasicDBObject sort = new BasicDBObject("$sort", 
        new BasicDBObject("first", 1));
    AggregationOutput result = 
        collection.aggregate(match, group, sort);
    System.out.println("\nLargest and smallest word sizes for " +
                       "words beginning with a vowel: ");
    JavaAggregate.displayAggregate(result);
  }
  public static void top5AverageWordFirst(DBCollection collection){
    BasicDBObject groupOps = new BasicDBObject("_id", "$first");
    groupOps.append("average", new BasicDBObject("$avg", "$size"));
    BasicDBObject group = new BasicDBObject("$group", groupOps);
    BasicDBObject sort = new BasicDBObject("$sort", 
        new BasicDBObject("average", -1));
    BasicDBObject limit = new BasicDBObject("$limit", 5);
    AggregationOutput result = 
        collection.aggregate(group, sort, limit);
    System.out.println("\nFirst letter of top 5 largest average " + 
                       "word size: ");
    JavaAggregate.displayAggregate(result);
  }
}