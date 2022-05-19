package PokeCircle.src.java.PokeCircle;

import java.util.List;

import PokeCircle.src.java.Database.DBManagement;

/**
 * Authors: David Martínez Merencio and María León Pérez
 */

public class PokeCircle {

    public static boolean createDatabaseConnection() {
        return DBManagement.createConnection();
    }

    public static boolean closeDatabaseConnection() {
        return DBManagement.closeConnection();
    }

    /*Inserts a new pokemon into the PokeCircle database*/
    public static boolean insert(String strPokemon) {
        return DBManagement.insert(stringToPokemon(strPokemon));
    }

    /*Returns a List with all pokemons whose names match the first characters (namePart)*/
    public static String selectNames(String namePart) {
        if (namePart == null)
            namePart = "";
        return pokemonListToJson(DBManagement.select("name LIKE '" + namePart + "%'"));
    }

    public static String selectAuthor(String author) {
        return pokemonListToJson(DBManagement.select("author LIKE '" + author + "%'"));
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

    /*Adss a like to a pokemon from PokeCircle database*/
    public static boolean addLike(short number) {
        return true;
    }

    /*Deletes a pokemon from PokeCircle database*/
    public static boolean delete(short number) {
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
        Integer likes;
        try {
            likes = Integer.parseInt(attributesList[13]);
        } catch (NumberFormatException nfe) {
            likes = null;
        }
        String author = attributesList[14];

        //System.out.println(new Pokemon(number, name, type1, type2, weight, height, image, hp, attack, sp_attack, defense, sp_defense, speed, likes, author).toString());
        return new Pokemon(number, name, type1, type2, weight, height, image, hp, attack, sp_attack, defense, sp_defense, speed, likes, author);
    }

    /*Converts a Pokemon into a json*/
    private static String pokemonListToJson(List<Pokemon> pokemons) {
        String json = "[";
        for (Pokemon pokemon : pokemons) {
            json += pokemon.toString();
        }
        json += "]";
        return json;
    }

    public static void main(String[] args) {
        createDatabaseConnection();
        String strPokemon = "{34,Nidoking,Poison,Ground,62,1.4,https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/34.png,81,102,85,77,75,85,null,Nintendo}";
        System.out.println("Actualizando " + strPokemon);
        if (insert(strPokemon)) {
            System.out.println(strPokemon + " actualizado correctamente");
        }
        // delete((short)34);
    }
}
