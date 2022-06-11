package com.pokecirlce.Database;

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

import com.pokecirlce.PokeCircle.Pokemon;

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
            properties.load(new FileReader("src/main/resources/MySQL.properties".replace('/', File.separatorChar)));
            Class.forName(properties.getProperty("driver"));
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

    /*Returns Connection object*/
    public static Connection getConexion() {
        return connection;
    }

    /*Inserts into the database a new pokemon*/
    public static boolean insert(Pokemon pokemon) {
        boolean correct = true;
        try {
            String command = "INSERT INTO pokecircle.pokemon VALUES (" +
                    pokemon.getNumber() + "," +
                    "'" + pokemon.getName() + "'," +
                    "'" + pokemon.getType1() + "'," +
                    "'" + pokemon.getType2() + "'," +
                    pokemon.getWeight() + "," +
                    pokemon.getHeight() + "," +
                    "'" + pokemon.getImage() + "'," +
                    pokemon.getHp() + "," +
                    pokemon.getAttack() + "," +
                    pokemon.getSp_attack() + "," +
                    pokemon.getDefense() + "," +
                    pokemon.getSp_defense() + "," +
                    pokemon.getSpeed() + "," +
                    pokemon.getLikes() + "," +
                    "'" + pokemon.getAuthor() + "'" +
                    ");";
            Statement st = connection.createStatement();
            st.executeUpdate(command);
        } catch (SQLException sqle) {
            System.err.println("Error inserting into the database:");
            System.out.println(sqle.getMessage());
            correct = false;
        }
        return correct;
    }

    /*Returns only one row*/
    public static Pokemon selectOne(String number) {
        Pokemon pokemon = null;
        String command = "SELECT * FROM pokecircle.pokemon WHERE number = " + number + ";";
        try {
            Statement st = connection.createStatement();
            ResultSet rs = st.executeQuery(command);
            if (rs.next()) {
                pokemon = new Pokemon(rs.getShort("number"), rs.getString("name"), rs.getString("type1"), rs.getString("type2"),
                    rs.getFloat("weight"), rs.getFloat("height"), rs.getString("image"), rs.getShort("hp"),
                    rs.getShort("attack"), rs.getShort("sp_attack"), rs.getShort("defense"), rs.getShort("sp_defense"),
                    rs.getShort("speed"), rs.getInt("likes"), rs.getString("author"));
            }
        } catch (SQLException sqle) {
            System.err.println("Unique select failed");
        }
        return pokemon;
    }

    /*Returns an ArrayList with the pokemons found applying a condition. If no condition is applied, it returns all pokemons.*/
    public static ArrayList<Pokemon> select(String condition) {
        ArrayList<Pokemon> pokemons = new ArrayList<Pokemon>();
        Pokemon pokemon = null;
        try {
            String command = "SELECT * FROM pokecircle.pokemon";
            if (condition != null && !condition.isEmpty())
                command += " WHERE " + condition;
            command += ";";
            Statement st = connection.createStatement();
            ResultSet rs = st.executeQuery(command);
            while (rs.next()) {
                pokemon = new Pokemon(rs.getShort("number"), rs.getString("name"), rs.getString("type1"), rs.getString("type2"),
                    rs.getFloat("weight"), rs.getFloat("height"), rs.getString("image"), rs.getShort("hp"),
                    rs.getShort("attack"), rs.getShort("sp_attack"), rs.getShort("defense"), rs.getShort("sp_defense"),
                    rs.getShort("speed"), rs.getInt("likes"), rs.getString("author"));
                pokemons.add(pokemon);
            }
        } catch (SQLException sqle) {
            System.err.println("General select failed");
        }
        return pokemons;
    }

    /*Updates a pokemon*/
    public static boolean update(Pokemon pokemon) {
        boolean correct = true;
        if (selectOne(Integer.toString(pokemon.getNumber())) != null) {
            String command = "UPDATE pokecircle.pokemon SET name = '" + pokemon.getName() + "', type1 = '" + pokemon.getType1() + "', type2 = '" + pokemon.getType2() +
            "', weight = " + pokemon.getWeight() + ", height = " + pokemon.getHeight() + ", image = '" + pokemon.getImage() + "', hp = " + pokemon.getHp() +
            ", attack = " + pokemon.getAttack() + ", sp_attack = " + pokemon.getSp_attack() + ", defense = " + pokemon.getDefense() +
            ", sp_defense = " + pokemon.getSp_defense() + ", speed = " + pokemon.getSpeed() + ", likes = " + pokemon.getLikes() +
            ", author = '" + pokemon.getAuthor() + "' WHERE number = " + pokemon.getNumber() + ";";
            try {
                Statement st = connection.createStatement();
                st.executeUpdate(command);
                System.out.println("Pokemon updated");
            } catch (SQLException sqle) {
                System.err.println("Error updating the pokemon");
                correct = false;
            }
        } else {
            System.err.println("Error updating the pokemon, it doesn't exist");
            correct = false;
        }
        return correct;
    }

    /*Deletes a pokemon*/
    public static boolean delete(int number){
        boolean correct = true;
        if (selectOne(Integer.toString(number)) != null) {
            String command = "DELETE FROM pokecircle.pokemon WHERE number = " + number + ";";
            try {
                Statement st = connection.createStatement();
                st.executeUpdate(command);
                System.out.println("Pokemon deleted");
            } catch (SQLException sqle) {
                System.err.println("Error deleting the pokemon");
                correct = false;
            }
        } else {
            System.err.println("Error deleting the pokemon, it doesn't exist");
            correct = false;
        }
        return correct;
    }

    /*Creates a new user in "USER" table from PokeCircle database*/
    public static boolean createUser(String username, String password) {
        boolean correct = false;
        String command = "INSERT INTO pokecircle.user (USERNAME, PASSWORD) VALUES ('" + username + "', '" + password + "');";
        if (!existsUsername(username)) {
            try {
                Statement st = connection.createStatement();
                st.executeUpdate(command);
                correct = true;
                System.out.println("User created");
            } catch (SQLException sqle) {
                System.err.println("Error creating an user");
            }
        }
        return correct;
    }

    public static boolean checkUser(String username, String password) {
        boolean correct = false;
        String command = "SELECT username, password FROM pokecircle.user WHERE username = '" + username + "';";
        try {
            Statement st = connection.createStatement();
            ResultSet rs = st.executeQuery(command);
            if (rs.next() && rs.getString("password").equals(password)) {
                correct = true;
                System.out.println("Correct user");
            } else {
                System.out.println("Incorrect user");
            }
        } catch (SQLException sqle) {
            System.err.println("Error cheking that an user exists");
        }
        return correct;
    }

    private static boolean existsUsername(String username) {
        boolean correct = false;
        String command = "SELECT username FROM pokecircle.user WHERE username = '" + username + "';";
        try {
            Statement st = connection.createStatement();
            ResultSet rs = st.executeQuery(command);
            if (rs.next()) {
                correct = true;
                System.out.println("User exists");
            } else {
                System.out.println("User doesn't exist");
            }
        } catch (SQLException sqle) {
            System.err.println("Error cheking that an username exists");
        }
        return correct;
    }
}
