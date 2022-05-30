package com.pokecirlce.PokeCircle;

import java.util.List;

import com.pokecirlce.Database.DBManagement;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

/**
 * Authors: David Martínez Merencio and María León Pérez
 */

@RestController
@RequestMapping("/api")
public class PokeCircle {

    /*Connects to database*/
    @GetMapping("/createDatabaseConnection")
    public static Boolean createDatabaseConnection() {
        return DBManagement.createConnection();
    }

    /*Disconnects from database*/
    @GetMapping("/closeDatabaseConnection")
    public static boolean closeDatabaseConnection() {
        return DBManagement.closeConnection();
    }

    /*Inserts a new pokemon into the PokeCircle database*/
    @GetMapping("/insert/{strPokemon}")
    @ResponseBody
    public static boolean insert(@PathVariable String strPokemon) {
        createDatabaseConnection();
        return DBManagement.insert(stringToPokemon(strPokemon));
    }

    /*Returns a json with all pokemons whose names match the first characters (namePart)*/
    @GetMapping("/selectName/{namePart}")
    @ResponseBody
    public static String selectName(@PathVariable String namePart) {
        createDatabaseConnection();
        if (namePart == null || namePart.isEmpty())
            return pokemonListToJson(DBManagement.select(""));
        else
            return pokemonListToJson(DBManagement.select("UPPER(name) LIKE UPPER('" + namePart + "%')"));
    }

    /*Returns a json with all pokemons whose author is the one specified*/
    @GetMapping("/selectAuthor/{author}")
    @ResponseBody
    public static String selectAuthor(@PathVariable String author) {
        createDatabaseConnection();
        if (author == null || author.isEmpty())
            return pokemonListToJson(DBManagement.select(""));
        else
            return pokemonListToJson(DBManagement.select("UPPER(author) LIKE UPPER('" + author + "%')"));
    }

    /*Selects all pokemons from PokeCircle database*/
    @GetMapping("/selectAll")
    public static String selectAll() {
        createDatabaseConnection();
        return pokemonListToJson(DBManagement.select(null));
    }

    /*Selects one pokemon from PokeCircle database*/
    @GetMapping("/selectOne/{number}")
    @ResponseBody
    public static String selectOne(@PathVariable int number) {
        createDatabaseConnection();
        return ((Pokemon)DBManagement.selectOne(number)).toString();
    }

    public static void main(String[] args) {
        System.out.println(selectFilter(0, "''", "''", "steel", "none"));
    }
    /*Selects pokemons from PokeCircle database applying HTML filter*/
    @GetMapping("/selectFilter/{number}/{name}/{author}/{type1}/{type2}")
    @ResponseBody
    public static String selectFilter(@PathVariable("number") int number, @PathVariable("name") String name, @PathVariable("author") String author, @PathVariable("type1") String type1, @PathVariable("type2") String type2) {
        createDatabaseConnection();
        if (name == null || name == "''") {
            name = "";
        }
        if (author == null || author.isEmpty() || author == "''") {
            author = "Nintendo";
        }
        return pokemonListToJson(DBManagement.select("number = " + number + " AND UPPER(name) LIKE UPPER('" + name + "%') AND UPPER(author) LIKE UPPER('" + author + "%') AND UPPER(type1) = UPPER('" + type1 + "') AND UPPER(type2) = UPPER('" + type2 + "')"));
    }

    /*Updates a pokemon from PokeCircle database*/
    @GetMapping("/update/{strPokemon}")
    @ResponseBody
    public static boolean update(@PathVariable String strPokemon) {
        createDatabaseConnection();
        return DBManagement.update(stringToPokemon(strPokemon));
    }

    /*Adds a like to a pokemon from PokeCircle database*/
    @GetMapping("/addLike/{number}")
    @ResponseBody
    public static boolean addLike(@PathVariable int number) {
        createDatabaseConnection();
        Pokemon pokemon = DBManagement.selectOne(number);
        pokemon.setLikes(pokemon.getLikes() + 1);
        return DBManagement.update(pokemon);
    }

    /*Removes a like from a pokemon from PokeCircle database*/
    @GetMapping("/removeLike/{number}")
    @ResponseBody
    public static boolean removeLike(@PathVariable int number) {
        createDatabaseConnection();
        Pokemon pokemon = DBManagement.selectOne(number);
        pokemon.setLikes(pokemon.getLikes() - 1);
        return DBManagement.update(pokemon);
    }

    /*Deletes a pokemon from PokeCircle database*/
    @GetMapping("/delete/{number}")
    @ResponseBody
    public static boolean delete(@PathVariable int number) {
        createDatabaseConnection();
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
