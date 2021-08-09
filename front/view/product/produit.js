/**Gére les intéractions avec la page produit */




let idOfPage = localStorage.getItem('pageId');
//on enregistre l'objet obtenu par le fetch dans une variable
let article = {};
//div dans laquelle on va placer les éléments créés ici
const articleContainer = document.getElementById('article-content');


function createPage(object) {
    //on change le titre de la page avec le nom du produit
    let titleOfPage = document.querySelector('title');
    titleOfPage.innerText = `${object.name} - Orinoco`;

    //création de l'image du produit
    let articleImg = document.createElement('img');
    articleImg.src = object.imageUrl;
    articleImg.height = 215;
    articleImg.width = 320;
    articleContainer.appendChild(articleImg);
    //intégration du prix
    let articlePrice = document.createElement('p');
    articlePrice.classList.add('mt-3', 'font-weight-bold');
    articlePrice.textContent = (object.price / 100) + '€';
    articleContainer.appendChild(articlePrice);
    //div pour englober la description et les options de personnalisation
    let descOptionsCtn = document.createElement('div');
    descOptionsCtn.classList.add('row', 'my-5');
    articleContainer.appendChild(descOptionsCtn);
    //div pour la description du produit
    let divDescription = document.createElement('div');
    divDescription.classList.add('col', 'col-md-6');
    let descriptionTitle = document.createElement('h2');
    descriptionTitle.classList.add('mb-5');
    descriptionTitle.innerText = 'Description';
    let descriptionText = document.createElement('p');
    descriptionText.innerText = object.description;
    divDescription.appendChild(descriptionTitle);
    divDescription.appendChild(descriptionText);
    descOptionsCtn.appendChild(divDescription);
    //div pour les options de personalisation
    let divOptions = document.createElement('div');
    divOptions.classList.add('col', 'col-md-6', 'd-flex', 'flex-column');
    let optionsTitle = document.createElement('h2');
    optionsTitle.classList.add('mb-5');
    optionsTitle.innerText = 'Couleur(s) disponible(s)';
    let optionsChoices = document.createElement('div');
    //le nombre de couleurs disponibles n'étant le même pour chaque article
    //on crée ici une fonction pour créer le nombre de bouton radio en fonction des couleurs disponibles
    (object.colors).forEach((color) => {
        let wrapper = document.createElement('div');//uniquement pour la mise en page
        let colorOption = document.createElement('input');
        colorOption.type = 'radio';
        colorOption.name = 'color-choice';
        let colorOptionLabel = document.createElement('label');
        colorOptionLabel.classList.add('ml-3');
        colorOptionLabel.for = 'color-choice'
        colorOptionLabel.innerHTML = color;
        wrapper.appendChild(colorOption);
        wrapper.appendChild(colorOptionLabel);
        optionsChoices.appendChild(wrapper);
    });
    divOptions.appendChild(optionsTitle);
    divOptions.appendChild(optionsChoices);
    descOptionsCtn.appendChild(divOptions);
    let cartBtn = document.createElement('button');
    cartBtn.classList.add('btn', 'btn-warning', 'float-right', 'btnAddCart', 'align-self-center');
    cartBtn.textContent = 'Ajouter au panier';
    articleContainer.appendChild(cartBtn);
}

//on se sert de la valeur de l'id stockée dans localStorage pour
//faire la requête
fetch(`http://localhost:3000/api/teddies/${idOfPage}`)
    .then(function (res) {
        if (res.ok) {
            return res.json();
        }
    })
    .then(function (data) {
        createPage(data);
        //console.log(article);
    })
    .catch(function (err) {
        console.log(err);
    });
;




