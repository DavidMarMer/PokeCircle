/**
 * Authors: David Martínez Merencio and María León Pérez
 */

/*Spring Boot base url*/
const SPRINGBOOT_URL = 'http://localhost:8080/api/';

/*Begin Login*/
var swithToRegister = document.getElementById('swithToRegister');
var swithToLogin = document.getElementById('swithToLogin');
var register_form = document.getElementById('register-form');
var login_form = document.getElementById('login-form');

if (swithToRegister != null) {
    swithToRegister.addEventListener('click', function () {
        login_form.style.display = 'none';
        register_form.style.display = 'block';
    });
}

if (swithToLogin != null) {
    swithToLogin.addEventListener('click', function () {
        login_form.style.display = 'block';
        register_form.style.display = 'none';
    });
}

/*Creates a new user if everything is correct*/
function register() {
    let registerName = document.getElementById('registerName').value;
    let registerPassword = document.getElementById('registerPassword').value;
    let registerRepeatPassword = document.getElementById('registerRepeatPassword').value;

    if (registerPassword == registerRepeatPassword) {
        let httpRequest = new XMLHttpRequest();
        httpRequest.open('GET', SPRINGBOOT_URL + 'createUser/' + registerName + '/' + registerPassword);
        httpRequest.send();
        httpRequest.onload = function () {
            if (httpRequest.responseText == 'true') {
                localStorage.setItem('username', registerName);
                setTimeout(() => {
                    if (registerPassword == registerRepeatPassword) {
                        window.location.replace('index.html');
                    }
                }, 1);
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

/*Checks that user and passwords are corrects*/
function login() {
    let loginName = document.getElementById('loginName').value;
    let loginPassword = document.getElementById('loginPassword').value;

    let httpRequest = new XMLHttpRequest();
    httpRequest.open('GET', SPRINGBOOT_URL + 'checkUser/' + loginName + '/' + loginPassword);
    httpRequest.send();
    httpRequest.onload = function () {
        if (httpRequest.responseText == 'true') {
            localStorage.setItem('username', loginName);
            setTimeout(() => {
                window.location.replace('index.html');
            }, 1);
        } else {
            alert('Incorrect user');
            document.getElementById('loginPassword').value = '';
        }
    }
};
/*End Login*/

/*Calls backend in order to update something from database*/
function updateBakend(method) {
    let httpRequest = new XMLHttpRequest();
    httpRequest.open('GET', SPRINGBOOT_URL + method);
    httpRequest.send();
    httpRequest.onload = function () {
        console.log('Update', httpRequest.responseText);
        localStorage.setItem('update', httpRequest.responseText);
    }
}

/*Loads pokemon selected stats into info.html getting the number parameter*/
function loadInfoPage() {
    let httpRequest = new XMLHttpRequest();
    httpRequest.open('GET', SPRINGBOOT_URL + 'selectOne/' + new URLSearchParams(window.location.search).get('number'));
    httpRequest.send();
    httpRequest.onload = function () {
        /*Pokemon info generator*/
        let pokemon = jsonToPokemon(httpRequest.responseText);

        let name_value = document.getElementById('pokemon_name');
        let number_author_value = document.getElementById('numero');
        let img_value = document.getElementById('pokemon_img_info');
        let attack_value = document.getElementsByClassName('attack_value');
        let sp_attack_value = document.getElementsByClassName('sp_attack_value');
        let defense_value = document.getElementsByClassName('defense_value');
        let sp_defense_value = document.getElementsByClassName('sp_defense_value');
        let hp_value = document.getElementsByClassName('hp_value');
        let speed_value = document.getElementsByClassName('speed_value');
        let info_stats = document.getElementsByClassName('info_stats');

        name_value.innerHTML = pokemon.name.toUpperCase();
        number_author_value.innerHTML = '#' + pokemon.number + ' - ' + pokemon.author.toUpperCase();
        img_value.setAttribute('src', pokemon.image);

        attack_value[0].setAttribute('value', pokemon.attack);
        attack_value[1].innerHTML = pokemon.attack;

        sp_attack_value[0].setAttribute('value', pokemon.sp_attack);
        sp_attack_value[1].innerHTML = pokemon.sp_attack;

        defense_value[0].setAttribute('value', pokemon.defense);
        defense_value[1].innerHTML = pokemon.defense;

        sp_defense_value[0].setAttribute('value', pokemon.sp_defense);
        sp_defense_value[1].innerHTML = pokemon.sp_defense;

        hp_value[0].setAttribute('value', pokemon.hp);
        hp_value[1].innerHTML = pokemon.hp;

        speed_value[0].setAttribute('value', pokemon.speed);
        speed_value[1].innerHTML = pokemon.speed;

        if (pokemon.author.toUpperCase() == localStorage.getItem('username').toUpperCase()) {
            document.getElementsByClassName('modify_button')[0].style.display = 'block';
            document.getElementsByClassName('modify_button')[1].style.display = 'block';
        }

        if (pokemon.type2 != 'none') {
            info_stats[0].innerHTML = pokemon.type1 + ' - ' + pokemon.type2;
        } else {
            info_stats[0].innerHTML = pokemon.type1;
        }
        info_stats[1].innerHTML = 'WEIGHT: ' + pokemon.weight;
        info_stats[2].innerHTML = 'HEIGHT: ' + pokemon.height;
        info_stats[3].innerHTML = 'LIKES: ' + pokemon.likes;
    }
}

/*Changes the image of creator.html*/
function changeIMG() {
    let imgURL = document.getElementById('imgURL').value;
    document.getElementById('linkCreatorImg').setAttribute('src', imgURL);
}

/*Creates a pokemon into the database*/
function createPokemon() {
    let httpRequest = new XMLHttpRequest();
    httpRequest.open('GET', SPRINGBOOT_URL + 'selectLastPokemon');
    httpRequest.send();
    httpRequest.onload = function () {
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

/*Pokemons cards auto-generator of index.html*/
function generatePokemonCards(pokemons) {
    let pokemon_cards_container = document.getElementById('pokemon_cards_container');
    pokemon_cards_container.innerHTML = '';
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

        if (pokemon.type2 != 'none') {
            types.innerHTML = (pokemon.type1 + ' - ' + pokemon.type2).toUpperCase();
        } else {
            types.innerHTML = pokemon.type1.toUpperCase();
        }
        pokemon_data.appendChild(types);

        let like = document.createElement('div');
        like.setAttribute('class', 'like');
        pokemon_card.appendChild(like);
        let like_button = document.createElement('button');
        like_button.setAttribute('class', 'like_button');
        like_button.setAttribute('id', 'like_button_' + pokemon.number);
        like_button.setAttribute('onclick', 'javascript:addLike(' + pokemon.number + ')');
        like_button.innerHTML = '♥';
        like.appendChild(like_button);

        let total_likes = document.createElement('total_likes');
        total_likes.setAttribute('class', 'total_likes');
        total_likes.setAttribute('id', 'total_likes_' + pokemon.number);
        total_likes.innerHTML = pokemon.likes + '♥';
        pokemon_card.appendChild(total_likes);
    }
}

/*Shows filtered pokemons*/
function showFilterPokemons() {
    let filters = document.getElementsByClassName('selectFil');
    let order = filters[0][filters[0].options.selectedIndex].value;
    let authorFilter = filters[1][filters[1].options.selectedIndex].value;
    let typeFilter = filters[2][filters[2].options.selectedIndex].value;

    let nameText = document.getElementById('input_pokemon_name').value;
    if (nameText == '') {
        nameText = "''";
    }
    let authorText;
    if (authorFilter == 'you') {
        authorText = localStorage.getItem('username');
    } else if (authorFilter == 'all_authors') {
        authorText = "''";
    } else {
        authorText = authorFilter;
    }

    let httpRequest = new XMLHttpRequest();
    httpRequest.open('GET', SPRINGBOOT_URL + 'selectFilter/' + nameText + '/' + authorText + '/' + typeFilter + '/' + order);
    httpRequest.send();
    httpRequest.onload = function () {
        generatePokemonCards(jsonToPokemon(httpRequest.responseText));
    }
}

/*Shows official pokemons*/
function showOfficialPokemons() {
    let httpRequest = new XMLHttpRequest();
    httpRequest.open('GET', SPRINGBOOT_URL + 'selectAuthor/Nintendo');
    httpRequest.send();
    httpRequest.onload = function () {
        generatePokemonCards(jsonToPokemon(httpRequest.responseText));
    }
}

/*Deletes a pokemon from database*/
function deletePokemon() {
    if (window.confirm('Are you sure you want to delete this pokemon?')) {
        updateBakend('delete/' + new URLSearchParams(window.location.search).get('number'));

        setTimeout(() => {
            if (localStorage.getItem('update') == 'true') {
                alert('Pokemon deleted');
                window.location.href = 'index.html';
            } else {
                alert("An error has occurred while deleting the pokemon");
            }
        }, 1000);
    }
}

/*Updates a pokemon from database*/
function updatePokemon(pokemon) {
    if (window.confirm('Are you sure you want to update this pokemon?')) {
        if (typeof pokemon == 'undefined') {
            let number = new URLSearchParams(window.location.search).get('number');
            let name = document.getElementById('name').value;
            let height = document.getElementById('height').value;
            let weight = document.getElementById('weight').value;
            let hp = document.getElementById('hp').value;
            let attack = document.getElementById('attack').value;
            let sp_attack = document.getElementById('special attack').value;
            let defense = document.getElementById('defense').value;
            let sp_defense = document.getElementById('special defense').value;
            let speed = document.getElementById('speed').value;
            let image = document.getElementById('imgURL').value;
            let type1 = document.getElementById('type1').value;
            let type2 = document.getElementById('type2').value;
            let likes = new URLSearchParams(window.location.search).get('likes');
            let author = localStorage.getItem('username');

            pokemon = new Pokemon(number, name, type1, type2, weight, height, image, hp, attack, sp_attack, defense, sp_defense, speed, likes, author);
        }
        updateBakend('update/' + pokemon.toString());
        setTimeout(() => {
            if (localStorage.getItem('update') == 'true') {
                alert('Pokemon updated');
                window.location.href = 'index.html';
            } else {
                alert("An error has occurred while updating the pokemon");
            }
        }, 1000);
    }
}

/*Shows creator.html with pokemon data*/
function showUpdatePage() {
    likes = document.getElementById('stat_likes').innerText;
    window.location.href = 'creator.html?number=' + new URLSearchParams(window.location.search).get('number') +
        '&likes=' + likes.substring(likes.indexOf(' ') + 1);
}

/*Set pokemon data if creator.html is called from info.html, that means that is an user who wants to edit this pokemon*/
function changeIfUpdate() {
    let number = parseInt(new URLSearchParams(window.location.search).get('number'));
    if (!Number.isNaN(number)) {


        let httpRequest = new XMLHttpRequest();
        httpRequest.open('GET', SPRINGBOOT_URL + 'selectOne/' + number);
        httpRequest.send();
        httpRequest.onload = function () {
            let pokemon = jsonToPokemon(httpRequest.responseText);

            document.getElementById('creation_title').innerText = 'Update your pokemon';
            document.getElementById('name').value = pokemon.name;
            document.getElementById('height').value = pokemon.height;
            document.getElementById('weight').value = pokemon.weight;
            document.getElementById('hp').value = pokemon.hp;
            document.getElementById('attack').value = pokemon.attack;
            document.getElementById('special attack').value = pokemon.sp_attack;
            document.getElementById('defense').value = pokemon.defense;
            document.getElementById('special defense').value = pokemon.sp_defense;
            document.getElementById('speed').value = pokemon.speed;
            document.getElementById('imgURL').value = pokemon.image;
            document.getElementById('type1').value = pokemon.type1;
            document.getElementById('type2').value = pokemon.type2;
            changeIMG();
            document.getElementById('creatorButton').innerText = 'UPDATE';
            document.getElementById('creatorForm').setAttribute('action', `javascript:updatePokemon()`);
        }
    }
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

/*Adds a like to a Pokemon*/
function addLike(pkmNumber) {
    updateBakend('addLike/' + pkmNumber);
    let likes = document.getElementById('total_likes_' + pkmNumber).innerHTML;
    document.getElementById('total_likes_' + pkmNumber).innerHTML = parseInt(likes.slice(0, -1)) + 1 + '♥';

    document.getElementById('like_button_' + pkmNumber).disabled = true;
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

/*Converts a JSON into a Pokemon or Array<Pokemon>*/
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

/*Transforms a String into a Pokemon*/
function stringToPokemon(strPokemon) {
    let attributesList = strPokemon.split(",");
    let number = parseInt(attributesList[0]);
    let name = attributesList[1];
    let type1 = attributesList[2];
    let type2 = attributesList[3];
    let weight = parseFloat(attributesList[4]);
    let height = parseFloat(attributesList[5]);
    let image = attributesList[6].replaceAll("-7bs-", "/");
    let hp = parseInt(attributesList[7]);
    let attack = parseInt(attributesList[8]);
    let sp_attack = parseInt(attributesList[9]);
    let defense = parseInt(attributesList[10]);
    let sp_defense = parseInt(attributesList[11]);
    let speed = parseInt(attributesList[12]);
    let likes = parseInt(attributesList[13]);
    let author = attributesList[14];

    return new Pokemon(number, name, type1, type2, weight, height, image, hp, attack, sp_attack, defense,
        sp_defense, speed, likes, author);
}