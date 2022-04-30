package PokeCircle.src.java.PokeCircle;

/**
 * Authors: David Martínez Merencio and María León Pérez
 */

 public class Pokemon {

    /*PokeCircle database Pokemon attributes*/

    private int number;
    private String name;
    private String type1;
    private String type2;
    private float weight;
    private float height;
    private short hp;
    private short attack;
    private short sp_attack;
    private short defense;
    private short sp_defense;
    private short speed;
    private int likes;
    private boolean official;

    public int getNumber() {
        return number;
    }

    public String getName() {
        return name;
    }

    public String getType1() {
        return type1;
    }

    public String getType2() {
        return type2;
    }

    public float getWeight() {
        return weight;
    }

    public float getHeight() {
        return height;
    }

    public short getHp() {
        return hp;
    }

    public short getAttack() {
        return attack;
    }

    public short getSp_attack() {
        return sp_attack;
    }

    public short getDefense() {
        return defense;
    }

    public short getSp_defense() {
        return sp_defense;
    }

    public short getSpeed() {
        return speed;
    }

    public int getLikes() {
        return likes;
    }

    public boolean isOfficial() {
        return official;
    }

    public void setNumber(int number) {
        this.number = number;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setType1(String type1) {
        this.type1 = type1;
    }

    public void setType2(String type2) {
        this.type2 = type2;
    }

    public void setWeight(float weight) {
        this.weight = weight;
    }

    public void setHeight(float height) {
        this.height = height;
    }

    public void setHp(short hp) {
        this.hp = hp;
    }

    public void setAttack(short attack) {
        this.attack = attack;
    }

    public void setSp_attack(short sp_attack) {
        this.sp_attack = sp_attack;
    }

    public void setDefense(short defense) {
        this.defense = defense;
    }

    public void setSp_defense(short sp_defense) {
        this.sp_defense = sp_defense;
    }

    public void setSpeed(short speed) {
        this.speed = speed;
    }

    public void setLikes(int likes) {
        this.likes = likes;
    }

    public void setOfficial(boolean official) {
        this.official = official;
    }
 }