package PokeCircle.src.java.PokeCircle;

import java.util.List;

import PokeCircle.src.java.Database.DBManagement;

/**
 * Authors: David Martínez Merencio and María León Pérez
 */

public class PokeCircle {

    /*Connects to database*/
    public static boolean createDatabaseConnection() {
        return DBManagement.createConnection();
    }

    /*Disconnects from database*/
    public static boolean closeDatabaseConnection() {
        return DBManagement.closeConnection();
    }

    /*Inserts a new pokemon into the PokeCircle database*/
    public static boolean insert(String strPokemon) {
        return DBManagement.insert(stringToPokemon(strPokemon));
    }

    /*Returns a json with all pokemons whose names match the first characters (namePart)*/
    public static String selectName(String namePart) {
        if (namePart == null)
            namePart = "";
        return pokemonListToJson(DBManagement.select("UPPER(name) LIKE UPPER('" + namePart + "%')"));
    }

    /*Returns a json with all pokemons whose author is the one specified*/
    public static String selectAuthor(String author) {
        return pokemonListToJson(DBManagement.select("UPPER(author) LIKE UPPER('" + author + "%')"));
    }

    /*Selects all pokemons from PokeCircle database*/
    public static String selectAll() {
        return pokemonListToJson(DBManagement.select(null));
    }

    /*Selects one pokemon from PokeCircle database*/
    public static String selectOne(int number) {
        return ((Pokemon)DBManagement.selectOne(number)).toString();
    }

    /*Updates a pokemon from PokeCircle database*/
    public static boolean update(String strPokemon) {
        return DBManagement.update(stringToPokemon(strPokemon));
    }

    /*Adds a like to a pokemon from PokeCircle database*/
    public static boolean addLike(int number) {
        Pokemon pokemon = DBManagement.selectOne(number);
        pokemon.setLikes(pokemon.getLikes() + 1);
        return DBManagement.update(pokemon);
    }

    /*Removes a like from a pokemon from PokeCircle database*/
    public static boolean removeLike(int number) {
        Pokemon pokemon = DBManagement.selectOne(number);
        pokemon.setLikes(pokemon.getLikes() - 1);
        return DBManagement.update(pokemon);
    }

    /*Deletes a pokemon from PokeCircle database*/
    public static boolean delete(int number) {
        return DBManagement.delete(number);
    }

    /*Converts a String into a Pokemon*/
    private static Pokemon stringToPokemon(String strPokemon) {
        String[] attributesList = strPokemon.substring(strPokemon.indexOf("{")+1, strPokemon.indexOf("}")).split(",");
        int number = Integer.parseInt(attributesList[0]);
        String name = attributesList[1];
        String type1 = attributesList[2];
        String type2 = attributesList[3];
        float weight = Float.parseFloat(attributesList[4]);
        float height = Float.parseFloat(attributesList[5]);
        String image = attributesList[6];
        short hp = Short.parseShort(attributesList[7]);
        short attack = Short.parseShort(attributesList[8]);
        short sp_attack = Short.parseShort(attributesList[9]);
        short defense = Short.parseShort(attributesList[10]);
        short sp_defense = Short.parseShort(attributesList[11]);
        short speed = Short.parseShort(attributesList[12]);
        int likes = Integer.parseInt(attributesList[13]);;
        String author = attributesList[14];

        return new Pokemon(number, name, type1, type2, weight, height, image, hp, attack, sp_attack, defense, sp_defense, speed, likes, author);
    }

    /*Converts a Pokemons list into a json*/
    private static String pokemonListToJson(List<Pokemon> pokemons) {
        String json = "[";
        for (Pokemon pokemon : pokemons) {
            json += pokemon.toString() + ",";
        }
        if (json.length() > 1) {
            json = json.substring(0, json.length()-1);
        }
        json += "]";
        return json;
    }
}
