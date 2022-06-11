var pkmNumber, pkmName, pkmAuthor, pkmType1, pkmType2;
/*Spring Boot base url*/
const SPRINGBOOT_URL = 'http://localhost:8080/api/';

/*Begin Login*/
var swithToRegister = document.getElementById('swithToRegister');
var swithToLogin = document.getElementById('swithToLogin');
var register_form = document.getElementById('register-form');
var login_form = document.getElementById('login-form');
swithToRegister.addEventListener('click', function() {
    login_form.style.display = 'none';
    register_form.style.display = 'block';
});

swithToLogin.addEventListener('click', function() {
    login_form.style.display = 'block';
    register_form.style.display = 'none';
});

function register() {
    let registerName = document.getElementById('registerName').value;
    let registerPassword = document.getElementById('registerPassword').value;
    let registerRepeatPassword = document.getElementById('registerRepeatPassword').value;

    if (registerPassword == registerRepeatPassword) {
        let httpRequest = new XMLHttpRequest();
        httpRequest.open('GET', SPRINGBOOT_URL + 'createUser/' + registerName + '/' + registerPassword);
        httpRequest.send();
        httpRequest.onload = function() {
            if (httpRequest.responseText == 'true') {
                localStorage.setItem('username', registerName);
                loadMainPage(registerPassword, registerRepeatPassword);
            } else {
                alert('This user already exists');
            }
        }
    } else {
        alert("Passwords don't match");
    }
};

function login() {
    let loginName = document.getElementById('loginName').value;
    let loginPassword = document.getElementById('loginPassword').value;

    let httpRequest = new XMLHttpRequest();
    httpRequest.open('GET', SPRINGBOOT_URL + 'checkUser/' + loginName + '/' + loginPassword);
    httpRequest.send();
    httpRequest.onload = function() {
        if (httpRequest.responseText == 'true') {
            localStorage.setItem('username', loginName);
            loadMainPage(loginPassword);
        } else {
            alert('Incorrect user');
        }
    }
};
/*End Login*/

function updateBakend(method) {
    let httpRequest = new XMLHttpRequest();
    httpRequest.open('GET', SPRINGBOOT_URL + method);
    httpRequest.send();
    httpRequest.onload = function() {
        console.log('Update done', httpRequest.responseText);
    }
}

function loadMainPage(password, repeatPassword) {
    if (password == repeatPassword || typeof repeatPassword == 'undefined') {
        window.location.replace('http://127.0.0.1:5500/src/main/resources/static/index.html');
        alert(localStorage.getItem('username'));
        
        var submitButton = document.getElementById('submitButton');
        /*Select called when filter applied*/
        submitButton.addEventListener('click', function() {
            let nameText = document.getElementById('name').value;
            let numberText = document.getElementById('number').value;
            let authorText = document.getElementById('author').value;
            let type1Text = document.getElementById('type1').value;
            let type2Text = document.getElementById('type2').value;
    
            if (numberText == '') {
                numberText = '0';
            }
            if (nameText == '') {
                nameText = '""';
            }
            if (authorText == '') {
                authorText = '""';
            }
    
            selectFilterPokemons(nameText, numberText, authorText, type1Text, type2Text);
        });
    }
}

function selectFilterPokemons(nameText, numberText, authorText, type1Text, type2Text) {
    let httpRequest = new XMLHttpRequest();
    httpRequest.open('GET', SPRINGBOOT_URL + 'selectFilter/' + nameText + '/' + numberText + '/' + authorText + '/' + type1Text + '/' + type2Text);
    httpRequest.send();
    httpRequest.onload = function() {
        console.log('selectFilterPokemons', httpRequest.responseText);
    }
}

function selectOfficialPokemons() {
    let httpRequest = new XMLHttpRequest();
    httpRequest.open('GET', SPRINGBOOT_URL + 'selectAuthor/Nintendo');
    httpRequest.send();
    httpRequest.onload = function() {
        console.log('selectAuthor', httpRequest.responseText);
    }
}

function deletePokemon(number) {
    updateBakend('delete/' + number);
}

function updatePokemon(pokemon) {
    updateBakend('update/' + pokemon.toJson());
}

function insertPokemon(pokemon) {
    updateBakend('insert/' + pokemon.toJson());
}

function addLike(pkmNumber) {
    updateBakend('addLike/' + pkmNumber);
}

function removeLike(pkmNumber) {
    updateBakend('removeLike/' + pkmNumber);
}

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

    /*Transforms a Pokemon into a JSON*/
    toJson() {
        return JSON.stringify(this);
    }
}

/*Converts a json into a Pokemon or Array<Pokemon>*/
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