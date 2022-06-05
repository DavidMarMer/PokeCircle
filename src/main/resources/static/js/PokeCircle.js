/*Begin Login*/
var register_form = document.getElementById('register-form');
var login_form = document.getElementById('login-form');

register_form.addEventListener('click', switctToLogin, false);
login_form.addEventListener('click', switctToRegister, false);

function switctToLogin() {
  register_form.style.display = 'none';
  login_form.style.display = 'block';
}

function switctToRegister() {
  register_form.style.display = 'block';
  login_form.style.display = 'none';
}
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