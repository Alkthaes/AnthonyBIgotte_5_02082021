/**Gére les intéractions avec la page produit */

fetch('http://localhost:3000/api/teddies/5beaa8bf1c9d440000a57d94')
    .then(function (res) {
        if (res.ok) {
            console.log(res);
        }
    })
    .catch(function (err) {
        console.log(err);
    });