/**Gére les intéractions avec la page produit */


let idOfPage = localStorage.getItem('pageId');
//on enregistre l'objet obtenu par le fetch dans une variable
let article = {};
//on se sert de la valeur de l'id stockée dans localStorage pour
//faire la requête
fetch(`http://localhost:3000/api/teddies/${idOfPage}`)
    .then(function (res) {
        if (res.ok) {
            //console.log(res.json());
            return res.json();
        }
    })
    .then(function (data) {
        article = data;
        console.log(article);
        //localStorage.removeItem('pageId');
    })
    .catch(function (err) {
        console.log(err);
    });
;


