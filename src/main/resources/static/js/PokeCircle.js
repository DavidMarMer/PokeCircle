/*Spring Boot base url*/
const SPRINGBOOT_URL = 'http://localhost:8080/api/';

/*Begin Login*/
var swithToRegister = document.getElementById('swithToRegister');
var swithToLogin = document.getElementById('swithToLogin');
var register_form = document.getElementById('register-form');
var login_form = document.getElementById('login-form');

if (swithToRegister != null) {
    swithToRegister.addEventListener('click', function() {
        login_form.style.display = 'none';
        register_form.style.display = 'block';
    });
}

if (swithToLogin != null) {
    swithToLogin.addEventListener('click', function() {
        login_form.style.display = 'block';
        register_form.style.display = 'none';
    });
}

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
                setTimeout(() => {
                    if (registerPassword == registerRepeatPassword) {
                        window.location.replace('index.html');
                    }
                },1);
            } else {
                alert('This user already exists');
            }
        }
    } else {
        alert("Passwords don't match");
        document.getElementById('registerPassword').value = '';
        document.getElementById('registerRepeatPassword').value = '';
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
            setTimeout(() => {
                window.location.replace('index.html');
            },1);
        } else {
            alert('Incorrect user');
            document.getElementById('loginPassword').value = '';
        }
    }
};
/*End Login*/

function updateBakend(method) {
    let httpRequest = new XMLHttpRequest();
    httpRequest.open('GET', SPRINGBOOT_URL + method);
    httpRequest.send();
    httpRequest.onload = function() {
        console.log('Update', httpRequest.responseText);
        localStorage.setItem('update', httpRequest.responseText);
    }
}

function loadMainPage() {
    showOfficialPokemons();

    let submitButton = document.getElementById('imgSearch');
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

        showFilterPokemons(nameText, numberText, authorText, type1Text, type2Text);
    });
}

function changeIMG() {
    let imgURL = document.getElementById('imgURL').value;
    document.getElementById('linkCreatorImg').setAttribute('src', imgURL);
}

function createPokemon() {
    let httpRequest = new XMLHttpRequest();
    httpRequest.open('GET', SPRINGBOOT_URL + 'selectLastPokemon');
    httpRequest.send();
    httpRequest.onload = function() {
        let number = parseInt(jsonToPokemon(httpRequest.responseText).number) + 1;
        let name = document.getElementById('name').value;
        let height = parseFloat(document.getElementById('height').value);
        let weight = document.getElementById('weight').value;
        let hp = document.getElementById('hp').value;
        let attack = parseInt(document.getElementById('attack').value);
        let sp_attack = document.getElementById('special attack').value;
        let defense = document.getElementById('defense').value;
        let sp_defense = document.getElementById('special defense').value;
        let speed = document.getElementById('speed').value;
        let image = document.getElementById('imgURL').value;
        let type1 = document.getElementById('type1').value;
        let type2 = document.getElementById('type2').value;
        
        insertPokemon(new Pokemon(number, name, type1, type2, weight, height, image, hp, attack, sp_attack, defense, sp_defense, speed, 0, localStorage.getItem('username')));
    }
}

function showFilterPokemons(nameText, numberText, authorText, type1Text, type2Text) {
    let httpRequest = new XMLHttpRequest();
    httpRequest.open('GET', SPRINGBOOT_URL + 'selectFilter/' + nameText + '/' + numberText + '/' + authorText + '/' + type1Text + '/' + type2Text);
    httpRequest.send();
    httpRequest.onload = function() {
        console.log('selectFilterPokemons', httpRequest.responseText);
    }
}

function showOfficialPokemons() {
    let httpRequest = new XMLHttpRequest();
    httpRequest.open('GET', SPRINGBOOT_URL + 'selectAuthor/Nintendo');
    httpRequest.send();
    httpRequest.onload = function() {
        let pokemons = jsonToPokemon(httpRequest.responseText);
        /*Pokemons targets auto-generator*/
        let pokemon_cards_container = document.getElementById('pokemon_cards_container');
        for (let pkmNumber = 0; pkmNumber < pokemons.length; pkmNumber++) {
            let pokemon = pokemons[pkmNumber];

            let pokemon_card = document.createElement('div');
            pokemon_card.setAttribute('class', 'pokemon_card');
            pokemon_cards_container.appendChild(pokemon_card);

            let a_pokemon_name = document.createElement('a');
            a_pokemon_name.setAttribute('class', 'redirectInfoPokemon');
            a_pokemon_name.setAttribute('href', 'info.html?number=' + pokemon.number);
            pokemon_card.appendChild(a_pokemon_name);
            let pokemon_name = document.createElement('h2');
            pokemon_name.setAttribute('class', 'pokemon_name');
            pokemon_name.innerHTML = pokemon.name.toUpperCase();
            a_pokemon_name.appendChild(pokemon_name);

            let a_pokemon_img = document.createElement('a');
            a_pokemon_img.setAttribute('class', 'redirectInfoPokemon');
            a_pokemon_img.setAttribute('href', 'info.html?number=' + pokemon.number);
            pokemon_card.appendChild(a_pokemon_img);
            let pokemon_img = document.createElement('img');
            pokemon_img.setAttribute('class', 'pokemon_img');
            pokemon_img.setAttribute('src', pokemon.image);
            pokemon_img.setAttribute('alt', 'no image');
            a_pokemon_img.appendChild(pokemon_img);

            let pokemon_data = document.createElement('div');
            pokemon_data.setAttribute('class', 'pokemon_data');
            pokemon_card.appendChild(pokemon_data);
            let num = document.createElement('label');
            num.setAttribute('class', 'num');
            num.innerHTML = '#' + pokemon.number;
            pokemon_data.appendChild(num);
            let types = document.createElement('label');
            types.setAttribute('class', 'types');
            types.innerHTML = (pokemon.type1 + ' - ' + pokemon.type2).toUpperCase();
            pokemon_data.appendChild(types);

            let like = document.createElement('div');
            like.setAttribute('class', 'like');
            pokemon_card.appendChild(like);
            let like_button = document.createElement('button');
            like_button.setAttribute('class', 'like_button');
            like_button.innerHTML = '♥';
            like.appendChild(like_button);

            let total_likes = document.createElement('total_likes');
            total_likes.setAttribute('class', 'total_likes');
            total_likes.innerHTML = pokemon.likes + '♥';
            pokemon_card.appendChild(total_likes);
        }
    }
}

function deletePokemon(number) {
    updateBakend('delete/' + number);
}

function updatePokemon(pokemon) {
    updateBakend('update/' + pokemon.toString());
}

function insertPokemon(pokemon) {
    updateBakend('insert/' + pokemon.toString());
    setTimeout(() => {
        if (localStorage.getItem('update') == 'true') {
            alert('New Pokemon created');
            window.location.href = 'index.html';
        } else {
            alert("Error creating Pokemon. Maybe other Pokemon doesn't have the same name or image url");
        }
    }, 1000);
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
        this.number = parseInt(number);
        this.name = name;
        this.type1 = type1;
        this.type2 = type2;
        this.weight = parseFloat(weight);
        this.height = parseFloat(height);
        this.image = image;
        this.hp = parseInt(hp);
        this.attack = parseInt(attack);
        this.sp_attack = parseInt(sp_attack);
        this.defense = parseInt(defense);
        this.sp_defense = parseInt(sp_defense);
        this.speed = parseInt(speed);
        this.likes = parseInt(likes);
        this.author = author;
    }

    /*Transforms a Pokemon into a JSON*/
    toJson() {
        return JSON.stringify(this);
    }

    /*Transforms a Pokemon into a String*/
    toString() {
        return `${this.number},${this.name},${this.type1},${this.type2},${this.weight},${this.height},${this.image.replaceAll('/', '-7bs-')},` +
            `${this.hp},${this.attack},${this.sp_attack},${this.defense},${this.sp_defense},${this.speed},${this.likes},${this.author}`;
    }
}

/*Converts a json into a Pokemon or Array<Pokemon>*/
function jsonToPokemon(json) {
    let pkm = JSON.parse(json);
    if (typeof pkm.length == 'undefined') {
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
// console.log(jsonToPokemon('[{"number":1,"name":"Pikachu","type1":"electric","type2":"none","weight":1,"height":1,"image":"img","hp":1,"attack":1,"sp_attack":1,"defense":1,"sp_defense":1,"speed":1,"likes":0,"author":"Nintendo"}]'));
// console.log(jsonToPokemon('[{"number":1,"name":"Pikachu","type1":"electric","type2":"none","weight":1,"height":1,"image":"img","hp":1,"attack":1,"sp_attack":1,"defense":1,"sp_defense":1,"speed":1,"likes":0,"author":"Nintendo"},{"number":1,"name":"Pikachu","type1":"electric","type2":"none","weight":1,"height":1,"image":"img","hp":1,"attack":1,"sp_attack":1,"defense":1,"sp_defense":1,"speed":1,"likes":0,"author":"Nintendo"}]'));