function displayBanner(currentPhotographer) {
  

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
  const containerImgBanner = document.createElement("article");
  const bannerImg = document.createElement("img");
  const btnModal = document.createElement("button");
  const banner = document.querySelector(".banner");

  btnModal.addEventListener("click", () => {
    const dialog = document.querySelector(".dialog");
    const main = document.querySelector(".main");
    const closeBtn = document.querySelector(".close-btn");
    const dialogMask = document.querySelector(".dialog-mask");

    dialog.classList.add("opened");
    closeBtn.focus();
    dialogMask.addEventListener("click", () => {
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
  btnModal.textContent = "Contactez-moi";

  // ajout des tags
  

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



