import com.mongodb.MongoClient;
import com.mongodb.DB;
import com.mongodb.DBObject;
import com.mongodb.DBCursor;
import com.mongodb.gridfs.*;
import java.io.*;
public class JavaGridFS {
  public static void main(String[] args) {
    try {
      MongoClient mongoClient = new MongoClient("localhost", 27017);
      DB db = mongoClient.getDB("myFS");
      System.out.println("\nFiles Before Put:");
      JavaGridFS.listGridFSFiles(db);
      JavaGridFS.putGridFSFile(db);
      System.out.println("\nFiles After Put:");
      JavaGridFS.listGridFSFiles(db);
      System.out.println("\nContents of Retrieve File:");
      JavaGridFS.getGridFSFile(db);
      JavaGridFS.deleteGridFSFile(db);
      System.out.println("\nFiles After Delete:");
      JavaGridFS.listGridFSFiles(db);
    } catch (Exception e) { System.out.println(e); }
  }
  public static void listGridFSFiles(DB db){
    GridFS myFS = new GridFS(db);
    DBCursor files = myFS.getFileList();
    for(final DBObject file : files) {
      System.out.println(file);
    }
  }
  public static void putGridFSFile(DB db){
    try{
      File newFile = new File("java.txt");
      BufferedWriter output = 
          new BufferedWriter(new FileWriter(newFile));
      output.write("Stored From Java");
      output.close();
      newFile = new File("java.txt");
      GridFS myFS = new GridFS(db);
      GridFSInputFile gridFile = myFS.createFile(newFile);
      gridFile.save();
    } catch (Exception e) { System.out.println(e); }
  }
  public static void getGridFSFile(DB db){
    try{
      GridFS myFS = new GridFS(db);
      GridFSDBFile file = myFS.findOne("java.txt");
      file.writeTo(new File("JavaRetrieved.txt"));
      File inFile = new File("JavaRetrieved.txt");
      BufferedReader input = 
          new BufferedReader(new FileReader(inFile));
      System.out.println(input.readLine());
      input.close();
    } catch (Exception e) { System.out.println(e); }
  }
  public static void deleteGridFSFile(DB db){
    GridFS myFS = new GridFS(db);
    myFS.remove("java.txt");
  }
}