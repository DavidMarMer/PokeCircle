function pruebaGet() {

    let httpRequest = new XMLHttpRequest();
    httpRequest.open("GET", "http://localhost:8080/api/selectName/nido");
    httpRequest.send();
    httpRequest.onload = function() {
        document.getElementById("p1").innerHTML = httpRequest.responseText;
    }
    console.log("inside the .js file");
}