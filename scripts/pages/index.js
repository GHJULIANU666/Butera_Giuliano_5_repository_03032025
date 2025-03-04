/**
 * name photographerList
 * @type {array}
 * @description Tableau contenant les objets instancier avec la class photographer
 *
 */

/**
 * name linkToData
 * @type {string}
 * @description le lien vers les données Json Fisheye
 *
 */

const linkToData = "./data/photographers.json";

const loader = document.querySelector(".loader-container");

window.addEventListener("load", () => {
  fetch(linkToData)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then((photographes) => {
      // Accès aux données des photographes
      const listePhotographes = photographes.photographers;
      console.log(photographes);
      const photographersSection = document.querySelector(".photographer-container");
      listePhotographes.forEach ((photographe)=> {
        console.log(photographe)
        const a=document.createElement("cards-photographer-link")
        
        const h2=document.createElement("h2")
        h2.innerText=photographe.name
        photographersSection.appendChild(h2)
        photographersSection.classList.add("cards-title");
        const photographerModel = photographerTemplate(photographe);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
      }

      

      // Appeler la factory pour créer les photographes (appeler la fonction présente dans le templates/photographers.js)

          //     <section class="photographer-cards">
          //     <header>
          //    <a class="cards-photographer-link" role="link" href="photographer.html?id=243">
          //     <img class="cards-img" src="https://stoyann-open-classrooms.github.io/-StoyannVelten_6_15062021/sources/img/1_small/PhotographersID/MimiKeel.jpg" alt="">
          //     <h2 class="cards-title">Mimi Keel</h2>
          //    </a>
          //    </header>
          //    <div class="cards-body">
          //      <h3 class="cards-location">London, UK</h3>
          //      <p class="cards-tagline">Voir le beau dans le quotidien</p>
          //      <p class="cards-price">400€/Jour</p>
          //    </div> 
          //   </section>  
        );
   })       
});


async function init() {
  // Récupère les datas des photographes
  const { photographers } = await photographers();
  console.log (photographers)
  /*displayData(photographers);*/
}

init();


  
  const section = document.createElement('section');
  section.classList.add('photographer-cards');
  const header = document.createElement('header'); 
  /*linkToPage.classList.add = "photographerPage.html?id=" + cardPhotographer.id;*/
  const linkToPhoto =
" ./sources/img/1_small/PhotographersID/" + photographer.portrait;
  const cardPhotographer = document.createElement("section");
  const cardPhotographerHeader = document.createElement("header");
  const cardPhotographerFooter = document.createElement("div");
  const cardLink = document.createElement("a");
  const cardImg = document.createElement("img");
  const cardTitle = document.createElement("h2");
  const cardBody = document.createElement("div");
  const cardLocation = document.createElement("h3");
  const cardTagline = document.createElement("p");
  const cardPrice = document.createElement("p");
  const cardTags = document.createElement("nav");
  const modalBg = document.createElement("form");


/**
 *créer un objet pour chaque photographe et les push dans un nouveaux tableau
 * @param {string} data linkToData
 * @returns {array}
 */

function displayPage() {
  /*displayTags();*/
  displayPhotographers();
  /*displayReturnMain();*/
  }

// creation et affichages des tags (header) plus ajout toggle au click

function displayPhotographers() {
  const main = document.querySelector("#main");
  /**
   * name filters
   * @type {array}
   * @description tableau contenant les tags selectionner
   *
   */
  const filters = [];

  //index.innerHTML = "";
  document.querySelectorAll(".tag--selected").forEach((tagselected) => {
    filters.push(tagselected.textContent.replace("#", ""));
  });

  /*photographerList.getPhotographerList(...filters).forEach((photographer) => {
    const linkToPage = "photographerPage.html?id=" + photographer.id;
    const linkToPhoto =
      "./sources/img/1_small/PhotographersID/" + photographer.portrait;
    const cardPhotographer = document.createElement("section");
    const cardPhotographerHeader = document.createElement("header");
    const cardPhotographerFooter = document.createElement("div");
    const cardLink = document.createElement("a");
    const cardImg = document.createElement("img");
    const cardTitle = document.createElement("h2");
    const cardBody = document.createElement("div");
    const cardLocation = document.createElement("h3");
    const cardTagline = document.createElement("p");
    const cardPrice = document.createElement("p");
    const cardTags = document.createElement("nav");
    const modalBg = document.createElement("form");

    photographer.tags.forEach((el) => {
      const tagsA = document.createElement("a");
      const tagsspan = document.createElement("span");
      cardTags.classList.add("cards-tags");
      cardTags.append(tagsA);
      tagsA.append(tagsspan);
      tagsspan.textContent = "#" + el;
      tagsA.classList.add("tags-link");
      tagsspan.classList.add("tags");

      tagsA.setAttribute("aria-labelledby", `${el}`);

      tagsA.href = linkToPage + "&tag=" + el;
    });

    cardPhotographer.classList.add("photographer-cards");
    cardImg.classList.add("cards-img");
    cardTitle.classList.add("cards-title");
    cardLocation.classList.add("cards-location");
    cardLink.classList.add("cards-photographer-link");
    cardTagline.classList.add("cards-tagline");
    cardPrice.classList.add("cards-price");
    modalBg.classList.add("modal");
    cardBody.classList.add("cards-body");
    cardPhotographerFooter.classList.add("footer-cards");

    cardLink.setAttribute("role", "link");
    cardLink.href = linkToPage;
    cardImg.src = linkToPhoto;
    cardImg.alt = "";

    cardTitle.textContent = photographer.name;
    cardLocation.textContent = photographer.city + ", " + photographer.country;
    cardTagline.textContent = photographer.tagline;
    cardPrice.textContent = photographer.price + "€/Jour";

    main.append(cardPhotographer);
    cardPhotographer.append(
      cardPhotographerHeader,
      cardBody,
      cardPhotographerFooter
    );
    cardPhotographerHeader.append(cardLink);
    cardPhotographerFooter.append(cardTags);
    cardLink.append(cardImg, cardTitle);

    cardBody.append(cardLocation, cardTagline, cardPrice);
  });*/
}

/*function displayReturnMain() {
  const returnMain = document.querySelector(".return-main ");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      returnMain.style.display = "block";
      returnMain.style.opacity = "1";
    } else {
      returnMain.style.display = "none";
      returnMain.style.opacity = "0";
    }
  });
}*/

/**
 * Photographer class module
 * @module Photographer-class
 */

/**
 * Class pour créer un nouveaux photographe
 */
/**
 * Détails concernant le photographe
 * @param {string} name nom du photographe
 * @param {number} id   Id du photographe
 * @param {string} city  Ville du photographe
 * @param {string} country  Pays du photographe
 * @param {array} tags      Tags du photographe
 * @param {string} tagline Tagline du photographe
 * @param {number} price   Prix par impression du photographe
 * @param {string} portrait Lien vers la photo du photographe
 */

export class Photographers {
  constructor(name, id, city, country, tags, tagline, price, portrait) {
    /**
     * @property {string} name nom du photographe
     */
    this.name = name;
    /**
     * @property {number} id Id du photographe
     */
    this.id = id;
    /**
     * @property {string} city ville du Photographe
     */
    this.city = city;
    /**
     * @property {string} country Pays du photographe
     */
    this.country = country;
    /**
     * @property {Array} Tags tags du photographe
     */
    this.tags = tags;
    /**
     * @property {string} tagline Tagline du photographe
     */
    this.tagline = tagline;
    /**
     * @property {number} price Prix par impression du photographe
     */
    this.price = price;
    /**
     * @property {string} portrait lien vers la photo du photographe
     */
    this.portrait = portrait;
  }

  /**
   *@name getFolderName
   * @returns le nom du dossier pour les photos  chaque photographes
   */
  getFolderName() {
    return this.name.toLowerCase().replace(" ", "");
  }
}

/**
 * Photographer class module
 * @module Photographer-List
 */

/**
 *  Class pour créer un nouveaux photographe
 */
export class PhotographerList {
  /**
   *
   * creation du tableau photographer list
   * @returns {Array}
   */
  constructor() {
    /**
     * @property {Array} name photographer List
     */
    this.photographerList = [];
  }
  /**
   *
   * @property {function} addPhotographer ajoute l'objet creer avec la classe Photographer dans le tableau photographerList
   * @returns {Array}
   
   */
  addPhotographer(photographer) {
    this.photographerList.push(photographer);
  }

  /**
   * @property {function} getPhotographerList  retourne un nouveaux tableau  avec les photographes triés selon le tag selectionner par l'uttilisateur
   }}
   * @param  {...tags} tags 
   * @returns {Array}
   */
  getPhotographerList(...tags) {
    let returnedList = [];

    if (tags.length !== 0) {
      this.photographerList.forEach((photograph) => {
        photograph.tags.forEach((tag) => {
          if (tags.includes(tag) && !returnedList.includes(photograph)) {
            returnedList.push(photograph);
          }
        });
      });
    } else {
      returnedList = this.photographerList.slice();
    }

    return returnedList;
  }

  // retourne un tableau qui contient tous les tags
  getAllTags() {
    const tags = [];

    this.photographerList.forEach((photographer) => {
      photographer.tags.forEach((tag) => {
        tags.push(tag);
      });
    });

    return new Set(tags);
  }
  // retourne un photographe depuis son ID
  getPhotographerById(id) {
    for (const photographer of this.photographerList) {
      if (photographer.id === id) {
      }
    }
  }
}
