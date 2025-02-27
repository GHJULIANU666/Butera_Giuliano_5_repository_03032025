/**
 * @module photographer
 */

const linkToData = "./photographers.json"; 
const loader = document.querySelector(".loader-container");
const urlParams = new URLSearchParams(window.location.search);
const main = document.querySelector(".main");

let currentPhotographer;
let mediasPhotographers;
let totalLikes = [];
let totalLikesPhotographer;

// Ajout du fetch pour récupérer les données
fetch("./data/photographers.json")
.then(response => response.json())
.then(data => {
 
// récupérer l'id du photographe qui est dans l'url 
// exemple : const id = urlParams.get("id");


// grace à cet id on va aller chercher le photographe dans la variable "data" (par exemple avec une fonction find)
// const photographeTrouve = data.photographers.find(photographer => photographer.id === idRecupereUrl);

// Etape d'après : créer un fichier mediaFactory dans le dossier templates pour afficher les medias du photographes
})
.catch(error => {
console.error("Erreur lors du chargement des données:", error);
})


export function displayMediaList() {
  let displayMediaList = [];

  const filters = [];
  const cardsMediaContainer = document.querySelector(".cards-media-container");
  const sort = document
    .querySelector(".filter-option.selected")
    ?.getAttribute("data-value");

  cardsMediaContainer.innerHTML = "";
  document.querySelectorAll(".tag--selected").forEach((tagSelected) => {
    filters.push(tagSelected.textContent.replace("#", ""));
  });

  displayMediaList = mediaList.getMediaList(sort, ...filters);

  displayMediaList.forEach((media) => {
    const mediaElement = media.createImg(currentPhotographer.getFolderName());
    const cardsMedia = document.createElement("section");
    const cardsMediaImg = document.createElement("a");
    const cardsMediaFooter = document.createElement("div");
    const cardsMediaTitle = document.createElement("p");
    const cardsMediaHeaderLike = document.createElement("div");
    const lightboxLink = document.querySelectorAll(".cards-media-img");

    lightboxLink.forEach((link) => {
      link.addEventListener("click", openLightbox);
    });
    const cardsMediaCompteurLike = document.createElement("p");
    const heartLink = document.createElement("button");
    const heart = document.createElement("i");

    cardsMedia.classList.add("cards-media");
    cardsMediaImg.classList.add("cards-media-img");
    cardsMediaFooter.classList.add("cards-media-footer");
    cardsMediaTitle.classList.add("cards-media-title");
    cardsMediaHeaderLike.classList.add("header-like");
    cardsMediaCompteurLike.classList.add("compteur");
    heartLink.classList.add("heart-link");
    heart.classList.add("heart");
    heart.classList.add("far");
    heart.classList.add("fa-heart");

    cardsMediaCompteurLike.setAttribute("aria-label", `likes`);
    heartLink.setAttribute("aria-label", "aimer cette photo");
    heartLink.setAttribute("role", "button");
    cardsMediaImg.setAttribute("role", "button");
    cardsMediaImg.setAttribute("title", media.alt);
    cardsMediaImg.setAttribute("aria-describedby", "ouvrir le slider");
    cardsMediaImg.href = "#";
    heartLink.setAttribute("tabindex", "0");
    cardsMediaCompteurLike.setAttribute("tabindex", "0");
    cardsMediaCompteurLike.setAttribute(
      "aria-label",
      `Nombre de likes ${media.likes}`
    );

    cardsMediaTitle.textContent = `${media.title}`;
    cardsMediaCompteurLike.textContent = `${media.likes}`;

    cardsMediaContainer.append(cardsMedia);
    cardsMedia.append(cardsMediaImg, cardsMediaFooter);
    cardsMediaImg.append(mediaElement);
    cardsMediaFooter.append(cardsMediaTitle, cardsMediaHeaderLike);
    cardsMediaHeaderLike.append(cardsMediaCompteurLike, heartLink);
    heartLink.append(heart);
    compteurLikes(totalLikes);

    // compteur de likes
    function compteurLikes() {
      heartLink.addEventListener("click", () => {
        if (heart.classList.contains("fas")) {
          media.likes--;
          heart.classList.remove("fas");
          heart.classList.add("far");
          cardsMediaCompteurLike.textContent = media.likes;
          heart.classList.remove("heart-anim");
          displayInfo();
        } else {
          media.likes++;
          heart.classList.remove("far");
          heart.classList.add("fas");
          cardsMediaCompteurLike.textContent = media.likes;
          heart.classList.add("heart-anim");
          displayInfo();
        }
      });
    }

    cardsMediaImg.addEventListener("click", (e) => e.preventDefault());

    cardsMediaImg.addEventListener("click", () =>
      displayLightbox(media, displayMediaList, currentPhotographer)
    );
    cardsMediaImg.addEventListener("keyCode", (e) => {
      if (e.code === "13") {
        displayLightbox(media, displayMediaList, currentPhotographer);
      }
    });
  });
}

function displayPage() {
  const dialogTile = document.querySelector(".modal-title");
  const btnContact = document.querySelector(".contact-btn");
  const closeBtn = document.querySelector(".close-btn");
  closeBtn.href = "#";

  document.title += " - " + currentPhotographer.name;
  dialogTile.textContent = `Contactez-moi ${currentPhotographer.name}`;

  closeBtn.addEventListener("click", () => closeDialog());

  btnContact.addEventListener("click", () => openDialog());
  closeBtn.addEventListener("keydown", (e) => {
    if (e.code === "Escape") {
      closeDialog();
    }
  });

  displayBanner(currentPhotographer, displayMediaList);
  verifModal(currentPhotographer);
  displayFilterMenu(displayMediaList);
  displayInfo(displayMediaList);
  displayMediaList();
}

function displayInfo() {
  const totalLikesContainer = document.createElement("div");
  const priceContainer = document.createElement("div");
  const price = document.createElement("p");

  const totalLikesNb = document.createElement("div");
  const heart = document.createElement("i");

  heart.classList.add(`fas`);
  heart.classList.add(`fa-heart`);
  heart.classList.add(`heart`);
  heart.classList.add(`heart-global`);

  priceContainer.classList.add("price-container");
  price.classList.add("price");
  totalLikesContainer.classList.add("total-likes-container");
  totalLikesNb.classList.add("total-likes");
  totalLikesNb.textContent = `${mediaList.getLikes()}`;
  price.textContent = `${currentPhotographer.price}€/ jour`;

  main.append(totalLikesContainer);
  totalLikesNb.append(heart);
  priceContainer.append(price);
  totalLikesContainer.append(totalLikesNb, priceContainer);
}


function displayBanner(currentPhotographer, displayMediaList) {
  const urlParams = new URLSearchParams(window.location.search);

  /**
   * name LinkToPhoto
   * @type {string}
   * @description Chemin (path) vers la photo du photographe
   *
   */
  const linkToPhoto =
    "./sources/img/1_small/PhotographersID/" + currentPhotographer.portrait;

  //  création des elements html
  const banerBody = document.createElement("div");
  const banerTitle = document.createElement("h1");
  const banerLocation = document.createElement("p");
  const banerTagline = document.createElement("p");
  const containerTagsBanner = document.createElement("nav");
  const containerImgBanner = document.createElement("div");
  const bannerImg = document.createElement("img");
  const btnModal = document.createElement("button");
  const banner = document.querySelector(".banner");

  btnModal.addEventListener("click", (e) => {
    const dialog = document.querySelector(".dialog");
    const main = document.querySelector(".main");
    const closeBtn = document.querySelector(".close-btn");
    const dialogMask = document.querySelector(".dialog-mask");

    dialog.classList.add("opened");
    closeBtn.focus();
    dialogMask.addEventListener("click", (e) => {
      const dialog = document.querySelector(".dialog");
      const main = document.querySelector(".main");
      dialog.classList.remove("opened");
      main.classList.remove("anti-scroll");
      main.setAttribute("aria-hidden", "false");
      dialog.setAttribute("aria-hidden", "true");
    });
    main.classList.add("anti-scroll");
    main.setAttribute("aria-hidden", "true");
    dialog.setAttribute("aria-hidden", "false");
  });
  // ajouts des classes et attributs html

  banerBody.classList.add("banner-body");
  btnModal.classList.add("banner-btn");
  containerImgBanner.classList.add("banner-img");
  banerTitle.classList.add("banner-body-title");
  banerLocation.classList.add("banner-body-location");
  banerTagline.classList.add("banner-body-tagline");
  banerTagline.classList.add("banner-body-tagline");
  bannerImg.src = linkToPhoto;
  banerTitle.setAttribute("lang", "en");
  bannerImg.setAttribute("alt", `${currentPhotographer.name}`);

  banerTitle.textContent = currentPhotographer.name;
  banerLocation.textContent =
    currentPhotographer.city + " ," + currentPhotographer.country;
  banerTagline.textContent = currentPhotographer.tagline;
  btnModal.textContent = "Contacter-moi";

  // ajout des tags
  currentPhotographer.tags.forEach((el) => {
    const tagsLink = document.createElement("a");
    const tagsSpan = document.createElement("span");
    containerTagsBanner.classList.add("banner-tags-container");
    tagsLink.classList.add("tags-link");
    tagsSpan.classList.add("tags");
    tagsLink.id = `${el}`;
    tagsLink.setAttribute("role", "button");
    tagsLink.textContent = "#";
    tagsSpan.textContent = el;
    tagsLink.href = "#";

    tagsLink.addEventListener("click", (e) => {
      e.preventDefault();
      tagsLink.classList.toggle("tag--selected");
      displayMediaList();
    });

    if (urlParams.get("tag") && urlParams.get("tag") === el) {
      tagsLink.classList.toggle("tag--selected");
    }
    tagsLink.appendChild(tagsSpan);
    containerTagsBanner.appendChild(tagsLink);
  });

  // ajout des elements dans le DOM
  banner.append(banerBody, btnModal, containerImgBanner);

  banerBody.append(
    banerTitle,
    banerLocation,
    banerTagline,
    containerTagsBanner
  );

  containerImgBanner.appendChild(bannerImg);
  return btnModal;
}

export { displayBanner };


function openDialog() {
  const dialog = document.querySelector(".dialog");
  const main = document.querySelector(".main");
  const closeBtn = document.querySelector(".close-btn");
  const dialogMask = document.querySelector(".dialog-mask");

  dialog.classList.add("opened");
  closeBtn.focus();
  dialogMask.addEventListener("click", closeDialog);
  main.classList.add("anti-scroll");
  main.setAttribute("aria-hidden", "true");
  dialog.setAttribute("aria-hidden", "false");
}
function closeDialog() {
  const dialog = document.querySelector(".dialog");
  const main = document.querySelector(".main");
  dialog.classList.remove("opened");
  main.classList.remove("anti-scroll");
  main.setAttribute("aria-hidden", "false");
  dialog.setAttribute("aria-hidden", "true");
}

function verifModal(currentPhotographer) {
  const formFirstNameInp = document.querySelector(".firstName-inp");
  const formLastNameInp = document.querySelector(".lastName-inp");
  const formEmailInp = document.querySelector(".email-inp");
  const formMsgInp = document.querySelector(".msg-inp");
  const errorMessage = document.querySelectorAll(".message-alert");

  let verifFirst;
  let verifLast;
  let verifMail;
  let verifMsg;

  // verifie si les champs de la modal sont bien rempli
  formFirstNameInp.addEventListener("input", (e) => {
    if (e.target.value.length <= 3) {
      errorMessage[0].style.display = "inline";
      formFirstNameInp.classList.add("echec");
      formFirstNameInp.classList.add("border");

      setTimeout(() => {
        formFirstNameInp.classList.remove("echec");
        formFirstNameInp.classList.remove("border");
      }, 500);
      verifFirst = false;
    } else {
      errorMessage[0].style.display = "none";
      verifFirst = true;
    }
  });
  formLastNameInp.addEventListener("input", (e) => {
    if (e.target.value.length <= 3) {
      errorMessage[1].style.display = "inline";
      formLastNameInp.classList.add("echec");
      formLastNameInp.classList.add("border");

      setTimeout(() => {
        formLastNameInp.classList.remove("echec");
        formLastNameInp.classList.remove("border");
      }, 500);
      verifLast = false;
    } else {
      errorMessage[1].style.display = "none";
      verifLast = true;
    }
  });
  formEmailInp.addEventListener("input", (e) => {
    const regexMail = /\S+@\S+\.\S+/;
    if (e.target.value.search(regexMail) === 0) {
      errorMessage[2].style.display = "none";
      verifMail = true;
    } else if (e.target.value.search(regexMail) === -1) {
      errorMessage[2].style.display = "inline";
      formEmailInp.classList.add("echec");
      formEmailInp.classList.add("border");

      setTimeout(() => {
        formEmailInp.classList.remove("echec");
        formEmailInp.classList.remove("border");
      }, 500);
      verifMail = false;
    }
  });

  formMsgInp.addEventListener("input", (e) => {
    if (e.target.value.length <= 3) {
      errorMessage[3].style.display = "inline";
      formMsgInp.classList.add("echec");
      formMsgInp.classList.add("border");

      setTimeout(() => {
        formMsgInp.classList.remove("echec");
        formMsgInp.classList.remove("border");
      }, 500);
      verifMsg = false;
    } else {
      errorMessage[3].style.display = "none";
      verifMsg = true;
    }
  });

  // submit form
  document.getElementById("contact").addEventListener("submit", function (e) {
    e.preventDefault();
    if (
      verifFirst === true &&
      verifLast === true &&
      verifMail === true &&
      verifMsg === true
    ) {
      const contactModal = document.querySelector(".dialog-windows");
      const modalTitle = document.querySelector(".modal-title");
      const close = document.querySelector(".close-btn");

      const bannerModal = document.querySelector(".modal-form");
      bannerModal.style.display = "none";
      bannerModal.setAttribute("aria-hidden", "true");
      close.focus();
      modalTitle.innerHTML = `Votre message a bien été envoyé à <br>${currentPhotographer.name} `;
      modalTitle.classList.add("message-valid");

      // contactModal.append(photographersName);
      // log des information entrée par l'uttisatteur
      let datas = new FormData(bannerModal);
      for (let i of datas.entries()) {
        console.log(i[0], ":", i[1]);
      }
    }
  });
}

export { verifModal, openDialog, closeDialog };



/**
 * @module dropdown
 */

export function displayFilterMenu(displayMediaList) {
  const dropDownMenu = document.querySelector(".dropdownMenu ");
  const filterSelect = document.querySelector(".filter-select");
  const filterSelectTrigger = document.querySelector(".filter-select__trigger");
  const filterOptions = document.querySelectorAll(".filter-option");
  //selection du premier enfant de l'element filter select
  const firstFilterOption = document.querySelector(
    ".filter-select a:first-child"
  );
  //selection du dernier enfant de l'element filter select

  const lastFilterOption = document.querySelector(
    ".filter-select a:last-child"
  );
  // parcours le tableau filterOptions au click sur le menu dropdown
  for (const filter of filterOptions) {
    filter.addEventListener("click", function (e) {
      e.preventDefault();
      // si un filtre ne contient pas la classe selected alors alors selection du premier parent du filtre qui contient la classe
      // filterOptions.selected
      if (!this.classList.contains("selected")) {
        const selected = this.parentNode.querySelector(
          ".filter-option.selected"
        );

        selected.classList.remove("selected");
        this.classList.add("selected");
        this.setAttribute("aria-selected", "true");
        //  l'ancêtre le plus proche de l'élément filter-select __trigger span
        // et remplace le texte (passe le filtre selectionner en haut de liste)
        this.closest(".filter-select").querySelector(
          ".filter-select__trigger span"
        ).textContent = this.textContent;
        hideDropdown();
        displayMediaList();
      }
    });
  }

  dropDownMenu.addEventListener("click", function (e) {
    e.preventDefault();
    if (filterSelect.classList.contains("open")) {
      hideDropdown();
    } else {
      displayDropdown();
    }
  });

  lastFilterOption.addEventListener("keydown", function (e) {
    if (e.code === "Tab" && !e.shiftKey) {
      hideDropdown();
    }
  });

  firstFilterOption.addEventListener("keydown", function (e) {
    if (e.code === "Tab" && e.shiftKey) {
      hideDropdown();
    }
  });

  window.addEventListener("click", function (e) {
    if (!filterSelect.contains(e.target)) {
      hideDropdown();
    }
  });

  function displayDropdown() {
    filterSelect.classList.add("open");
    filterSelectTrigger.setAttribute("aria-expanded", "true");
  }

  function hideDropdown() {
    filterSelect.classList.remove("open");
    filterSelectTrigger.setAttribute("aria-expanded", "false");
  }
}


function displayLightbox(media, displayMediaList, currentPhotographer) {
  let currentMedia = media;
  const lightboxModal = document.querySelector(".lightbox");
  const slideContainer = document.querySelector(".container-slides");
  const closeBtn = document.querySelector(".close");
  const next = document.querySelector(".right");
  const previous = document.querySelector(".left");
  const titleMedia = document.querySelector(".titre-media-lightbox");
  const mediaImg = document.createElement("img");
  const mediaVid = document.createElement("video");

  next.addEventListener("click", nextSlide);
  previous.addEventListener("click", previousSlide);
  closeBtn.addEventListener("click", closelightbox);

  lightboxModal.addEventListener("keydown", (e) => {
    if (e.code === "Escape") {
      closelightbox(e, media);
    }
    if (e.code === "ArrowRight") {
      nextSlide(e);
    }
    if (e.code === "ArrowLeft") {
      previousSlide(e);
    }
  });

  function nextSlide(e) {
    e.preventDefault;
    if (displayMediaList.indexOf(currentMedia) + 1 >= displayMediaList.length) {
      currentMedia = displayMediaList[0];
    } else {
      currentMedia =
        displayMediaList[displayMediaList.indexOf(currentMedia) + 1];
    }
    displayContent();
  }

  function previousSlide(e) {
    e.preventDefault;
    if (displayMediaList.indexOf(currentMedia) <= +0) {
      currentMedia = displayMediaList[displayMediaList.length - 1];
      displayContent(currentMedia);
    } else {
      currentMedia =
        displayMediaList[displayMediaList.indexOf(currentMedia) - 1];
      displayContent(currentMedia);
    }
  }

  function closelightbox() {
    const lightboxModal = document.querySelector(".lightbox");
    const main = document.querySelector(".main");
    lightboxModal.style.display = "none";
    main.classList.remove("anti-scroll");
    main.style.display = "block";
  }

  displayContent(currentMedia);
  function displayContent() {
    if (currentMedia.type === "jpg") {
      mediaVid.replaceWith(mediaImg);
      mediaImg.src = `sources/img/2_medium/${currentPhotographer.getFolderName()}/${
        currentMedia.link
      }`;
      titleMedia.textContent = `${currentMedia.title}`;
      mediaImg.alt = currentMedia.alt;
      slideContainer.appendChild(mediaImg);
    } else if (currentMedia.type === "mp4") {
      mediaVid.src = `sources/img/2_medium/${currentPhotographer.getFolderName()}/${
        currentMedia.link
      }`;
      titleMedia.textContent = `${currentMedia.title}`;

      mediaImg.replaceWith(mediaVid);
      mediaVid.setAttribute("alt", currentMedia.alt);
      mediaVid.autoplay = true;
      mediaVid.loop = true;
      slideContainer.appendChild(mediaVid);
    }
  }
}
function openLightbox() {
  const main = document.querySelector(".main");
  const close = document.querySelector(".close");
  const lightboxModal = document.querySelector(".lightbox");
  lightboxModal.style.display = "flex";
  main.classList.add("anti-scroll");
  close.focus();
  main.style.display = "none";
}
export { displayLightbox, openLightbox };


/**
 * @module MediumList
 */
/**
 * Class pour creer un tableau constructor avec des methodes de tri sur les objets instancié avec la class Medium
 */
export class MediumList {
  constructor() {
    this.mediaList = [];
  }

  addMedia(media) {
    this.mediaList.push(media);
  }

  getMediaList(sort, ...tags) {
    const localMediaList = this.mediaList.slice();
    let returnedList = [];

    if (sort === "popularite") {
      localMediaList.sort((a, b) => b.likes - a.likes);
    } else if (sort === "date") {
      localMediaList.sort((a, b) => b.date - a.date);
    } else if (sort === "titre") {
      localMediaList.sort(function (a, b) {
        const titleA = a.title.toUpperCase();
        const titleB = b.title.toUpperCase();
        if (titleA < titleB) {
          return -1;
        }
        if (titleA > titleB) {
          return 1;
        }
        return 0;
      });
    }

    if (tags.length !== 0) {
      localMediaList.forEach((media) => {
        media.tags.forEach((tag) => {
          if (tags.includes(tag) && !returnedList.includes(media)) {
            returnedList.push(media);
          }
        });
      });
    } else {
      returnedList = localMediaList.slice();
    }

    return returnedList;
  }

  getLikes() {
    let sum = 0;
    this.mediaList.forEach((media) => {
      sum += media.likes;
    });
    return sum;
  }
}

/**
 * @module Medium-class
 */
/**
 * Class pour creer un nouveaux media video ou image
 */
export class Medium {
  /**
   * detais concernant le media
   * @param {string} type type de médias image ou vidéos
   * @param {string} alt  balise Alt
   * @param {date} date   date d'ajout du média
   * @param {number} id   ID du médias
   * @param {string} link Liens vers le média
   * @param {number} likes Nombre de likes du média
   * @param {number} photographerId ID du photographe liée au média
   * @param {string} tags tag associées au média
   * @param {string} title titre du média
   * @param {string} path Chemin vers le média
   * @returns {object}
   */
  createMedia(type, alt, date, id, link, likes, photographerId, tags, path) {
    if (type === "jpg") {
      const photo = new Photo();
      photo.type = type;
      photo.alt = alt;
      photo.date = new Date(date);
      photo.id = id;
      photo.link = link;
      photo.likes = likes;
      photo.photographerId = photographerId;
      photo.tags = tags;
      photo.title = link.replace(".jpg", "").replaceAll("_", " ");
      photo.path = path + link;

      return photo;
    } else if (type === "mp4") {
      const video = new Video();
      video.type = type;
      video.alt = alt;
      video.date = new Date(date);
      video.id = id;
      video.link = link;
      video.likes = likes;
      video.photographerId = photographerId;
      video.tags = tags;
      video.title = link.replace(".mp4", "").replaceAll("_", " ");
      return video;
    }
  }
}

export class Photo extends Medium {
  createImg(photographer) {
    const linkToSmalPhoto = `./sources/img/1_small/${photographer}/`;

    const cardsMediaImg = document.createElement("img");

    cardsMediaImg.src = linkToSmalPhoto + this.link;
    cardsMediaImg.alt = this.alt;
    cardsMediaImg.classList.add("media-img");

    return cardsMediaImg;
  }
}

export class Video extends Medium {
  createImg(photographer) {
    const linkToSmalPhoto = `./sources/img/1_small/${photographer}/`;
    const cardsMediaVideo = document.createElement("video");
    cardsMediaVideo.loop = true;
    cardsMediaVideo.muted = true;

    cardsMediaVideo.src = linkToSmalPhoto + this.link;
    cardsMediaVideo.alt = this.alt;
    cardsMediaVideo.classList.add("media-img");

    return cardsMediaVideo;
  }
}

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
