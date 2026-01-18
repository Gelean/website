import media from '../media/media.json' assert { type: 'json' };

function loadMedia() {
  let htmlElements = '';

  for (let i = 0; i < media.length; i++) {
    let classification = '';
    let icon = '';

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
