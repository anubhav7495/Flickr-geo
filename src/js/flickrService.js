'use-strict';

angular
  .module('app')
  .factory('Flickr', flickrService);

flickrService.$inject = ['$http', '$q'];

function flickrService($http, $q) {
  return {
    getImages: getImages
  };

  function getImages(lat, lon, page) {
    page = (typeof page !== 'undefined') ?  page : 1;

    var baseUrl = "https://api.flickr.com/services/rest";
    var params = {
      api_key: "5446942decc9260a1b6fc82682d68f7b",
      method: "flickr.photos.search",
      lat: lat,
      lon: lon,
      page: page,
      per_page: 20,
      format: "json",
      nojsoncallback: 1
    };

    return $http.get(baseUrl, { params: params })
                .then(resolve)
                .catch(reject);
  }

  function resolve(response) {
    return response.data;
  }

  function reject(error) {
    return $q.reject(error);
  }
}
