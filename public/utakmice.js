var token = localStorage.getItem("token");
var timovi = [];
var utakmice = [];

$(document).ready(function () {
    ucitajTimove();
});

function ucitajTimove() {
    $.getJSON("https://obrada.in.rs/kladionica/api/ucitajTimove/" + token, function (json) {
        $.each(json, function (key, value) {
            timovi[value.id] = value.naziv_tima;
            $(".timovi").append('<option value="' + value.id + '">' + value.naziv_tima + '</option>');
        });
        ucitajUtakmice();
    });
}

function ucitajUtakmice() {
    $.getJSON("https://obrada.in.rs/kladionica/api/ucitajUtakmice/" + token, function (json) {
        $("#dostupne_utakmice tbody").empty();
        $.each(json, function (key, value) {
            if (value.rezultat == null) {
                utakmice.push(value);
                $("#dostupne_utakmice tbody").append("<tr><td>" + timovi[value.tim1] + "</td><td>" + timovi[value.tim2] + "</td><td>" + value.kvota1 + "</td><td>" + value.kvotax + "</td><td>" + value.kvota2 + "</td><td><select class='form-control' onchange='izmeniRezultat(this.value, " + value.id + ");'> <option value='' >Izaberi rezultat</option> <option value='1'>1</option> <option value='3'>X</option> <option value='2'>2</option></select></td></tr>");
            }
        });
    });
}

function ocisti_polja() {
    $("#tim1").val("");
    $("#tim2").val("");
    $("#kvota1").val("");
    $("#kvotax").val("");
    $("#kvota2").val("");
}

function dodajUtakmicu() {
    var tim1 = $("#tim1").val();
    var tim2 = $("#tim2").val();
    var kvota1 = $("#kvota1").val();
    var kvotax = $("#kvotax").val();
    var kvota2 = $("#kvota2").val();

    if (tim1.length == 0 || tim2.length == 0 || kvota1.length == 0 || kvota2.length == 0 || kvotax.length == 0) {
        Swal.fire("Upozorenje", "Popunite sva polja!", "warning");
        return;
    }
    if (tim1 == tim2) {
        Swal.fire("Greska", "Ne mogu igrati dva ista tima!", "error");
        return;
    }
    var utakmica = {};
    utakmica['tim1'] = tim1;
    utakmica['tim2'] = tim2;
    utakmica['kvota1'] = kvota1;
    utakmica['kvota2'] = kvota2;
    utakmica['kvotax'] = kvotax;

    var json_utakmica = JSON.stringify(utakmica);
    $.post("https://obrada.in.rs/kladionica/api/dodajUtakmicu/" + token, json_utakmica, function (json) {
        if (json.sifra == 1) {
            Swal.fire("Info!", json.poruka, "success");
            for (var i = 0; i < utakmice.length; i++) {
                if (utakmice[i].tim1 == tim1 && utakmice[i].tim2 == tim2) {
                    Swal.fire("Greska", "Isti par se ne moze ponavljati u listi!", "error");
                    return;
                }
            }      
            ucitajUtakmice();
            ocisti_polja();
        } else {
            Swal.fire("Upozorenje", json.poruka, "error");
        }
    });
}

function izmeniRezultat(rezultat, utakmica_id) {
    $.getJSON("https://obrada.in.rs/kladionica/api/izmeniRezultat/" + token + "/" + utakmica_id + "/" + rezultat, function (json) {
        if (json.sifra == 1) {
            Swal.fire("Info!", json.poruka, "success");
            ucitajUtakmice();
            localStorage.removeItem('tiket');
        } else {
            Swal.fire("Upozorenje", json.poruka, "error");
        }
    })
}