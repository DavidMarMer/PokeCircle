// function pruebaGet() {

//     let httpRequest = new XMLHttpRequest();
//     httpRequest.open("GET", "http://localhost:8080/api/selectName/nido");
//     httpRequest.send();
//     httpRequest.onload = function() {
//         document.getElementById("p1").innerHTML = httpRequest.responseText;
//     }
//     console.log("inside the .js file");
// }
function submitForm() {

    /* stop form from submitting normally */
    // event.preventDefault();

    /* get the action attribute from the <form action=""> element */
    var $form = docuemnt.forms["pokemonFilter"],
        url = $form.attr('action');
        console.log(url);

    /* Send the data using post with element id name and name2*/
    var posting = $.post(url, {
        number: $('#number').val(),
        name: $('#name').val(),
        author: $('#author').val(),
        type1: $('#type1').val(),
        type2: $('#type2').val()
    });
    console.log(posting);

    /* Alerts the results */
    posting.done(function (data) {
        $('#result').text('success');
    });
    posting.fail(function () {
        $('#result').text('failed');
    });
}