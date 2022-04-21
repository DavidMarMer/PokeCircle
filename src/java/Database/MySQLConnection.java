package PokeCircle.src.java.Database;

/**
 * Authors: David Martínez Merencio and María León Pérez
 */

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class MySQLConnection {

    private static Connection connection;

    public static boolean createConnection(String user, String password, String url, String classForName){
        boolean correct = true;
        try {
            Class.forName(classForName);
            connection = (Connection) DriverManager.getConnection(url ,user, password);
            System.out.println("Database connection successful");
        } catch (ClassNotFoundException cnfe) {
            System.err.println("Driver not found");
            correct = false;
        } catch (SQLException sqle) {
            System.err.println("Database connection refused");
            correct = false;
        }
        return correct;
    }

    public static Connection getConexion() {
        return connection;
    }

    public static void main(String[] args) {
        createConnection("root", "", "jdbc:mysql://localhost:3306/pokecircle", "com.mysql.cj.jdbc.Driver");
    }
}
