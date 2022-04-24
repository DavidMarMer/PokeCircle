package PokeCircle.src.java.Database;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.Properties;

/**
 * Authors: David Martínez Merencio and María León Pérez
 */

public class DBManagement {

    private static Connection connection;

    /*Connects to database*/
    public static boolean createConnection() {
        boolean correct = false;
        Properties properties = new Properties();
        try {
            properties.load(new FileReader("PokeCircle/resources/MySQL.properties"));
            Class.forName(properties.getProperty("driver"));
            properties.load(new FileReader("PokeCircle/resources/MySQL.properties".replace('/', File.separatorChar)));
            connection = DriverManager.getConnection(properties.getProperty("url"), properties.getProperty("user"), properties.getProperty("password"));
            System.out.println("Database connection successful");
            correct = true;
        } catch (ClassNotFoundException cnfe) {
            System.err.println("Driver not found");
        } catch (SQLException sqle) {
            System.err.println("Database connection failed");
        } catch (FileNotFoundException fnfe) {
            System.err.println("MySQL.properties not found");
        } catch (IOException ioe) {
            System.err.println("In/Out Error");
        }
        return correct;
    }

    /*Disconnects from database*/
    public static boolean closeConnection() {
        boolean correct = true;
        try {
            connection.close();
            System.out.println("Database connection closed");
        } catch (SQLException sqle) {
            System.err.println("Database disconnection failed");
            correct =  false;
        }
        return correct;
    }

    /*Inserts into the database a new pokemon*/
    public static boolean insert(short number, String name, String type1, String type2, float weight, float height, String img) {
        boolean correct = true;
        try {
            String command = "INSERT INTO pokecircle.pokemon VALUES ("
                    + "" + number + ","
                    + "'" + name + "',"
                    + "'" + type1 + "',"
                    + "'" + type2 + "',"
                    + "" + weight + ","
                    + "" + height + ","
                    + "'" + img + "',"
                    + ");";
            Statement st = connection.createStatement();
            st.executeUpdate(command);
        } catch (SQLException sqle) {
            System.err.println("Error inserting into the database");
            correct = false;
        }
        return correct;
    }

    /*Returns only one row.
    If and error happens, returns null. If no row is found, returns empty*/
    public static String selectOne(short number) {
        String pokemon = "";
        String command = "SELECT * FROM pokecircle.pokemon WHERE number = " + number + ";";
        try {
            Statement st = connection.createStatement();
            ResultSet rs = st.executeQuery(command);
            if (rs.next()) {
                pokemon = rs.getShort("number") + ";"
                    + rs.getString("name") + ";"
                    + rs.getString("type1") + ";"
                    + rs.getString("type2") + ";"
                    + rs.getFloat("weight") + ";"
                    + rs.getFloat("height") + ";"
                    + rs.getString("img");
            }
        } catch (SQLException sqle) {
            System.err.println("Unique select failed");
            pokemon = null;
        }
        return pokemon;
    }

    /*Returns an ArrayList with the pokemons found applying a condition.
    If no condition is applied, it returns all pokemons. If and error happens, returns null. If no row is found, returns empty*/
    public static ArrayList<String> select(String condition) {
        ArrayList<String> pokemons = new ArrayList<String>();
        String pokemon = "";
        try {
            String command = "SELECT * FROM pokecircle.pokemon";
            if (condition != null && !condition.isEmpty()) {
                command += " WHERE " + condition;
            }
            command += ";";
            Statement st = connection.createStatement();
            ResultSet rs = st.executeQuery(command);
            while (rs.next()) {
                pokemon = rs.getShort("number") + ";"
                    + rs.getString("name") + ";"
                    + rs.getString("type1") + ";"
                    + rs.getString("type2") + ";"
                    + rs.getFloat("weight") + ";"
                    + rs.getFloat("height") + ";"
                    + rs.getString("img");
                pokemons.add(pokemon);
            }
        } catch (SQLException sqle) {
            System.err.println("General select failed");
            pokemons = null;
        }
        return pokemons;
    }

    /*Deletes a pokemon*/
    public static boolean delete(short number){
        boolean correct = true;
        String command = "DELETE FROM pokecircle.pokemon WHERE number = " + number + ";";
        try {
            Statement st = connection.createStatement();
            st.executeUpdate(command);
            System.out.println("Pokemon deleted");
        } catch (SQLException ex) {
            System.err.println("Error deleting the pokemon");
            correct = false;
        }
        return correct;
    }

    /*Updates a pokemon*/
    public static boolean update(short number, String name, String type1, String type2, float weight, float height, String img) {
        boolean correct = true;
       String command = "UPDATE pokecircle.pokemon SET name = '" + name + "', type1 = '"
                + type1 + "', type2 = '" + type2 + "', weight = " + weight + ", height = "
                + height + ", img = '" + img + "' WHERE number = " + number + ";";
        try {
            Statement st = connection.createStatement();
            st.executeUpdate(command);
            System.out.println("Pokemon updated");
        } catch (SQLException sqle) {
            System.err.println("Error updating the pokemon");
            correct = false;
        }
        return correct;
    }

    /*Returns Connection object*/
    public static Connection getConexion() {
        return connection;
    }

    /*Provisional*/
    public static void main(String[] args) {
        createConnection();
    }
}
