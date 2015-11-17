var app = angular.module('weather', ['ngAnimate']);

app.controller('weatherController', function($http, $scope) {

    $scope.running = false;

    $scope.Title = 'WEATHER CHECK';

    $scope.location = '';
    $scope.longitude = '';
    $scope.latitude = '';

    $scope.district = '';
    $scope.country = '';

    //Build bounding box
    $scope.lowerLatitude = $scope.latitude - 10;
    $scope.lowerLongitude = $scope.longitude - 10;

    $scope.currentWeather = '';
    $scope.apiKey = '477ab7fcd153782aac9f01ed3e4822ad/';
    $scope.icon = ''
    $scope.placeId = '';

    $scope.picApiKey = '94308bac02d396177549eb2c7605f652';
    $scope.secret = '6cebb5196a796473';



    $scope.picFarm = '';
    $scope.picSecret = '';
    $scope.picOwner = '';
    $scope.picServer = '';
    $scope.picId = '';

    $scope.background = 'images/tree.jpg';

    //wraps the 2 function calls 
    $scope.getWeather = function() {
        $scope.getLocation();
    }

    $scope.getLocation = function() {
        console.log("Postcode api called");
        $scope.running = true;
        $http({
            method: 'GET',
            url: 'http://api.postcodes.io/postcodes/' + $scope.location
        }).then(function successCallback(response) {
            console.log("response recived");
            $scope.longitude = response.data.result.longitude;
            $scope.latitude = response.data.result.latitude;
            $scope.location = response.data.result.longitude;
            $scope.district = response.data.result.admin_district;
            $scope.country = response.data.result.country;
            console.log(response);
            $scope.currentWeather = response;
            $scope.requestWeather();
        }, function errorCallback(response) {
            console.log(response);
            $scope.location = response;
        });

    }

    $scope.requestWeather = function() {
        console.log("WeatherAPI called");
        $http({
            method: 'GET',
            url: "https://api.forecast.io/forecast/" + $scope.apiKey + $scope.latitude + ',' + $scope.longitude
        }).then(function successCallback(response) {
            console.log("response recived");
            console.log(response);
            $scope.icon = response.data.currently.icon;
            $scope.currentWeather = response.data.currently;
            console.log($scope.icon);
            $scope.getPlaceId();
        }, function errorCallback(response) {
            console.log(response);
        });

    }




    $scope.getPlaceId = function() {
        console.log("FlickR called to get Place Id");
        $http({
            method: 'GET',
            url: "https://api.flickr.com/services/rest/?method=flickr.places.find&api_key=" + $scope.picApiKey + "&query=" + $scope.district + " " + $scope.country + "&format=json&nojsoncallback=1"
        }).then(function successCallback(response) {
            console.log("response recived");
            console.log(response);
            console.log($scope.district + " " + 
    $scope.country)
            $scope.placeId = response.data.places.place[0].place_id;
            console.log("Place ID is: " + $scope.placeId);
            $scope.getPic();
        }, function errorCallback(response) {
            console.log(response);
        });

    }



    $scope.getPic = function() {
        console.log("FlickR called");
        $http({
            method: 'GET',
            url: "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=" + $scope.picApiKey + "&place_id=" + $scope.placeId + "&format=json&nojsoncallback=1"
        }).then(function successCallback(response) {
            console.log("response recived");
            console.log(response);
            random = Math.floor((Math.random() * 10) + 1);
              console.log(random);
          $scope.picFarm = response.data.photos.photo[random].farm;
               console.log($scope.picFarm = response.data.photos.photo[random].farm);
               $scope.picSecret = response.data.photos.photo[random].secret;
              console.log($scope.picSecret = response.data.photos.photo[random].secret);
               $scope.picOwner = response.data.photos.photo[random].owner;
               console.log($scope.picOwner = response.data.photos.photo[random].owner);
               $scope.picServer = response.data.photos.photo[random].server;
                console.log($scope.picServer = response.data.photos.photo[random].server);
                $scope.picId = response.data.photos.photo[random].id;
               console.log($scope.picId = response.data.photos.photo[random].id);

               $scope.buildUrl();
            $scope.buildUrl();

        }, function errorCallback(response) {
            console.log(response);
        });

    }




    $scope.buildUrl = function() {

        $scope.background = "https://farm" + $scope.picFarm + ".staticflickr.com/" + $scope.picServer + "/" + $scope.picId + "_" + $scope.picSecret + ".jpg";
        console.log($scope.background);
    }

});