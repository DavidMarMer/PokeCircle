package PokeCircle.src.java.PokeCircle;

import java.util.List;

import PokeCircle.src.java.Database.DBManagement;

/**
 * Authors: David Martínez Merencio and María León Pérez
 */

public class PokeCircle {

    /*Inserts a new pokemon into the PokeCircle database*/
    public static boolean insert(short number, String name, String type1, String type2, float weight, float height, String img) {
        return DBManagement.insert(number, name, type1, type2, weight, height, img);
    }

    /*Returns a List with all pokemons whose names match the first characters (namePart)*/
    public static List<String> selectNames(String namePart) {
        if (namePart == null)
            namePart = "";
        return DBManagement.select("name LIKE '" + namePart + "%'");
    }

    /*Selects all pokemons from PokeCircle database*/
    public static List<String> selectAll() {
        return DBManagement.select(null);
    }

    /*Selects one pokemon from PokeCircle database*/
    public static String selectOne(short number) {
        return DBManagement.selectOne(number);
    }

    /*Updates a pokemon from PokeCircle database*/
    public static boolean update(short number, String name, String type1, String type2, float weight, float height, String img) {
        return DBManagement.update(number, name, type1, type2, weight, height, img);
    }

    /*Adss a like to a pokemon from PokeCircle database*/
    public static boolean addLike(short number) {
        return true;
    }

    /*Deletes a pokemon from PokeCircle database*/
    public static boolean delete(short number) {
        return DBManagement.delete(number);
    }

    

    /*Provisional*/
    public static void main(String[] args) {
        DBManagement.createConnection();
        List<String> list = selectNames(null);
        for (String cad : list)
            System.out.println(cad);
    }
}
