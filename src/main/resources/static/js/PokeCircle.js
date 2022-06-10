/*Begin Login*/
// var register_form = document.getElementById('register-form');
// var login_form = document.getElementById('login-form');

// register_form.addEventListener('click', switctToLogin, false);
// login_form.addEventListener('click', switctToRegister, false);

// function switctToLogin() {
//   register_form.style.display = 'none';
//   login_form.style.display = 'block';
// }

// function switctToRegister() {
//   register_form.style.display = 'block';
//   login_form.style.display = 'none';
// }
/*End Login*/

var pkmNumber, pkmName, pkmAuthor, pkmType1, pkmType2;
const SPRINGBOOT_URL = 'http://localhost:8080/api/';

function callBackend(method) {

    let httpRequest = new XMLHttpRequest();
    httpRequest.open('GET', SPRINGBOOT_URL + method);
    httpRequest.send();
    httpRequest.onload = function() {
        document.getElementById("p1").innerHTML = httpRequest.responseText;
        var answer = httpRequest.responseText;
    }
    console.log("inside the .js file");
}

var submitButton = document.getElementById('submitButton');
submitButton.addEventListener('click', function(event) {
    let nameText = document.getElementById('name').value;
    let numberText = document.getElementById('number').value;
    let authorText = document.getElementById('author').value;
    let type1Text = document.getElementById('type1').value;
    let type2Text = document.getElementById('type2').value;

    urlMethod = 'selectFilter/';
    if (numberText != '') {
        urlMethod += numberText + '/';
    } else {
        urlMethod += '0' + '/';
    }
    if (nameText != '') {
        urlMethod += nameText + '/';
    } else {
        urlMethod += "''" + '/';
    }
    if (authorText != '') {
        urlMethod += authorText + '/';
    } else {
        urlMethod += "''" + '/';
    }
    urlMethod += type1Text + '/' + type2Text;

    callBackend(urlMethod);
});

/*Pokemon class*/
class Pokemon {
    constructor(number, name, type1, type2, weight, height, image, hp, attack, sp_attack, defense, sp_defense, speed, likes, author) {
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
        this.author = author;
    }

    toJson() {
        return JSON.stringify(this);
    }
}

function jsonToPokemon(json) {
    let pkm = JSON.parse(json);
    if (typeof pkm.length == 'undefinied') {
        return new Pokemon(pkm.number, pkm.name, pkm.type1, pkm.type2, pkm.weight, pkm.height, pkm.image, pkm.hp,
            pkm.attack, pkm.sp_attack, pkm.defense, pkm.sp_defense, pkm.speed, pkm.likes, pkm.author);
    } else {
        pkmList = new Array();
        let actualPkm;
        for (let i = 0; i < pkm.length; i++) {
            actualPkm = pkm[i];
            pkmList.push(new Pokemon(actualPkm.number, actualPkm.name, actualPkm.type1, actualPkm.type2, actualPkm.weight, actualPkm.height, actualPkm.image, actualPkm.hp,
                actualPkm.attack, actualPkm.sp_attack, actualPkm.defense, actualPkm.sp_defense, actualPkm.speed, actualPkm.likes, actualPkm.author));
        }
        return pkmList;
    }
}

// var pokemon =  new Pokemon(1, 'Pikachu', 'electric', 'none', 1, 1, 'img', 1, 1, 1, 1, 1, 1, 0, 'Nintendo');
// console.log(jsonToPokemon('{"number":1,"name":"Pikachu","type1":"electric","type2":"none","weight":1,"height":1,"image":"img","hp":1,"attack":1,"sp_attack":1,"defense":1,"sp_defense":1,"speed":1,"likes":0,"author":"Nintendo"}'));
console.log(jsonToPokemon('[{"number":1,"name":"Pikachu","type1":"electric","type2":"none","weight":1,"height":1,"image":"img","hp":1,"attack":1,"sp_attack":1,"defense":1,"sp_defense":1,"speed":1,"likes":0,"author":"Nintendo"},{"number":1,"name":"Pikachu","type1":"electric","type2":"none","weight":1,"height":1,"image":"img","hp":1,"attack":1,"sp_attack":1,"defense":1,"sp_defense":1,"speed":1,"likes":0,"author":"Nintendo"}]'));