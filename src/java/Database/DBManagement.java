package PokeCircle.src.java.Database;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

/**
 * Authors: David Martínez Merencio and María León Pérez
 */

public class DBManagement {

    private static Connection connection;

    /*Connects to database*/
    public static boolean createConnection(String user, String password, String url, String classForName) {
        boolean correct = true;
        try {
            Class.forName(classForName);
            connection = (Connection) DriverManager.getConnection(url ,user, password);
            System.out.println("Database connection successful");
        } catch (ClassNotFoundException cnfe) {
            System.err.println("Driver not found");
            correct = false;
        } catch (SQLException sqle) {
            System.err.println("Database connection failed");
            correct = false;
        }
        return correct;
    }

    /*Disconnects from database*/
    public void closeConnection() {
        try {
            connection.close();
            System.out.println("Database connection closed");
        } catch (SQLException sqle) {
            System.err.println("Database disconnection failed");
        }       
    }

    public static Connection getConexion() {
        return connection;
    }

    /*Provisional*/
    public static void main(String[] args) {
        createConnection("root", "", "jdbc:mysql://localhost:3306/pokecircle", "com.mysql.cj.jdbc.Driver");
    }
}
