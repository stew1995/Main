//Used for google maps
var map, infoWindow, long1, lat1;
      function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: -34.397, lng: 150.644},
          zoom: 6
        });


        infoWindow = new google.maps.InfoWindow;

        // Try HTML5 geolocation.
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            long1 = position.coords.longitude;
            lat1 = position.coords.latitude;
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            console.log(pos);

            var marker = new google.maps.Marker({
              position: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
              map: map,
              Label: "S"
            });
            map.panTo(new google.maps.LatLng(
                        position.coords.latitude,
                        position.coords.longitude
                    ));

            var user = firebase.auth().currentUser.uid;
            var mRef = firebase.database().ref().child("Users").child(user).child("Location");
            mRef.set({
              lat: position.coords.latitude,
              lng: position.coords.longitude
            });

            console.log(pos);
            //infoWindow.setPosition(pos);
            //infoWindow.setContent('Location found.');
            //infoWindow.open(map);
            //map.setCenter(pos);
          }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
          });
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
        }




      }

      function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(map);
      }


      
