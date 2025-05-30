var media = [
  {
    name: 'Citizen Kane',
    type: 'film',
    imbibed: false,
    favorite: false,
    link: 'unknown,'
  },
  {
    name: 'V for Vendetta',
    type: 'film',
    imbibed: true,
    favorite: true,
    link: 'unknown,'
  },
  {
    name: 'Ogre Battle 64: Person of Lordly Caliber',
    type: 'game',
    imbibed: true,
    favorite: true,
    link: 'unknown,'
  },
  {
    name: 'How I Met Your Mother',
    type: 'show',
    imbibed: true,
    favorite: true,
    link: 'unknown,'
  },
  {
    name: 'The Blade Itself',
    type: 'book',
    imbibed: true,
    favorite: true,
    link: 'unknown,'
  },
  {
    name: 'The Great Gatsby',
    type: 'book',
    imbibed: true,
    favorite: false,
    link: 'unknown,'
  },
];

function loadMedia() {
  let htmlElements = '';

  for (let i = 0; i < media.length; i++) {
    let classification = '';

    if (media[i].type === 'game') {
      classification = 'games';
      icon = "gamepad";
    } else if (media[i].type === 'book') {
      classification = 'books';
      icon = "book";
    } else if (media[i].type === 'film') {
      classification = 'films';
      icon = "video";
    } else if (media[i].type === 'show') {
      classification = 'shows';
      icon = "television";
    } else {
      classification = 'none';
      icon = "question-circle-o";
    }

    if (media[i].imbibed) {
      classification += " imbibed";
    } else {
      classification += " not-imbibed";
    }

    if (media[i].favorite) {
      classification += " favorites";
    }

    htmlElements +=
      "<div class=\"col-lg-3 col-md-4 " + classification + "\">" +
        "<div class=\"media-item\">" +
          "<div class=\"media-img\">" +
            "<span style=\"color: #008080;\">" +
              "<i class=\"icon-" + icon + "\"></i>" +
            "</span>" +
          "</div>" +
          "<div class=\"product-content text-center py-3\">" +
            "<h5 class=\"card-title\">" + media[i].name + "</h5>" +
          "</div>" +
        "</div>" +
      "</div>"
  }

  document.getElementById('media-filter').innerHTML = htmlElements;

  // Initialize Isotope
  var grid = document.querySelector('#media-filter');
  iso = new Isotope(grid, {
    itemSelector: '.col-lg-3',
    layoutMode: 'fitRows'
  });
}