package PokeCircle.src.java.PokeCircle;

/**
 * Authors: David Martínez Merencio and María León Pérez
 */

 public class Pokemon {

    private int number;
    private String name;
    private String type1;
    private String type2;
    private float weight;
    private float height;
    private String image;
    private short hp;
    private short attack;
    private short sp_attack;
    private short defense;
    private short sp_defense;
    private short speed;
    private int likes;
    private boolean official;
    private String author;

    /*Constructor with all attributes except likes and type2, because its can be null*/
    public Pokemon(int number, String name, String type1, float weight, float height, String image, short hp,
        short attack, short sp_attack, short defense, short sp_defense, short speed, boolean official, String author) {
        this.number = number;
        this.name = name;
        this.type1 = type1;
        this.weight = weight;
        this.height = height;
        this.image = image;
        this.hp = hp;
        this.attack = attack;
        this.sp_attack = sp_attack;
        this.defense = defense;
        this.sp_defense = sp_defense;
        this.speed = speed;
        this.official = official;
        this.author = author;
    }

    /*Constructor with all attributes*/
    public Pokemon(int number, String name, String type1, String type2, float weight, float height, String image, short hp,
        short attack, short sp_attack, short defense, short sp_defense, short speed, int likes, boolean official, String author) {
        this.number = number;
        this.name = name;
        this.type1 = type1;
        this.type2 = type2;
        this.weight = weight;
        this.height = height;
        this.image = image;
        this.hp = hp;
        this.attack = attack;
        this.sp_attack = sp_attack;
        this.defense = defense;
        this.sp_defense = sp_defense;
        this.speed = speed;
        this.likes = likes;
        this.official = official;
        this.author = author;
    }

    /*Tramsform a Pokemon into a String*/
    @Override
    public String toString() {
        return "{" + number + "," + name + "," + type1 + "," + type2 + "," + weight + "," + height + "," + image + "," + hp + "," +
            attack + "," + sp_attack + "," + defense + "," + sp_defense + "," + speed + "," + likes + "," + official + "," + author + "}";
    }

    /*Getters*/

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

    public String getImage() {
        return image;
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

    public String getAuthor() {
        return author;
    }

    /*Setters*/

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

    public void setImage(String image) {
        this.image = image;
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

    public void setAuthor(String author) {
        this.author = author;
    }
 }