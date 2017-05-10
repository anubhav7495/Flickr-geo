'use-strict';

angular
  .module('lbb')
  .controller('appController', appController);

appController.$inject = ['Flickr'];

function appController(Flickr) {
  var vm = this;       // view-model
  var lat = 40.7128;   // default latitude
  var lon = -74.0059;  // default longitude

  vm.isLoading = true; // flag to hide or display loading animation
  vm.images = [];      // array to store current location images
  vm.modalImg = "";    // image to be displayed in image modal
  /* metadata related to each map location's public images */
  vm.imagesMetaData = { page: 1, pages: 1, total: 0 };

  /* default initialization for google map */
  vm.map = {
    center: { latitude: lat, longitude: lon },
    zoom: 8
  };

  /* default initialization for map marker */
  vm.marker = {
    id: 0,
    coords: { latitude: lat, longitude: lon },
    options: {
      draggable: true,
      title: 'Drag me for magic'
    },
    events: {
      dragend: function (marker, dragend, args) {
        lat = marker.getPosition().lat();
        lon = marker.getPosition().lng();
        fetchImages(lat, lon);
      }
    }
  };

  vm.firstPage = function () {
    fetchImages(lat, lon, 1);
  };

  vm.prevPage = function () {
    if(vm.imagesMetaData.page === 1) return;
    else fetchImages(lat, lon, (vm.imagesMetaData.page - 1));
  };

  vm.nextPage = function () {
    if(vm.imagesMetaData.page === vm.imagesMetaData.pages) return;
    else fetchImages(lat, lon, (vm.imagesMetaData.page + 1));
  };

  vm.lastPage = function () {
    fetchImages(lat, lon, vm.imagesMetaData.pages);
  };

  /* dirty technique for invoking image modal */
  vm.showImage = function (image) {
    var modal = document.getElementById("modal");
    modal.style.display = "flex";
    vm.modalImg = image;
  };

  /* function to fetchImages based on lat, lon and page number */
  function fetchImages(lat, lon, page) {
    vm.isLoading = true;
    Flickr.getImages(lat, lon, page).then(function (data) {
      vm.images = data.photos.photo;
      vm.imagesMetaData = {
        page: data.photos.page,
        pages: data.photos.pages,
        total: data.photos.total
      };
      vm.isLoading = false;
    })
    .catch(function (e) {
      console.log(e);
    });
  }

  /* initial call to load images for default location */
  fetchImages(lat, lon, 1);
}
