var iso;

document.addEventListener('DOMContentLoaded', function () {
  var filterGroup = document.querySelector('.filter-button-group');

  filterGroup.addEventListener('click', function (event) {
    if (!event.target.matches('button')) return;
    var filterValue = event.target.getAttribute('data-filter');
    if (iso) {
      iso.arrange({ filter: filterValue });
    } else {
      console.warn("Isotope not initialized yet.");
    }
  });
});