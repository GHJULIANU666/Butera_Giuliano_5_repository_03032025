function photographerTemplate(data) {
    const { name, portrait } = data;

    const picture = `assets/Sample Photos/Photographers ID Photos/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        article.appendChild(img);
        article.appendChild(h2);
        return (article);

        // const section = document.createElement('section');
        // section.classList.add('photographer-cards');
        // const header = document.createElement('header');
    }
    return { name, picture, getUserCardDOM }


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
}