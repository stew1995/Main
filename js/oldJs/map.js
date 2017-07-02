//Used for google maps
var map, infoWindow, long1, lat1, userFirstCharacter;
$(document).ready(function() {
  var user = firebase.auth().currentUser.uid;
  var locationMRef = firebase.database().ref().child("Location").child(user);
  locationMRef.once('value', function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      var childKey = childSnapshot.key;
      var childData = childSnapshot.val();

      $("#testtest").val(childKey);
      // ...
    });
  });
})
function getLocationFromFirebase() {
  var locationMRef = firebase.database().ref().child("Location").child(user);
}
      function initMap() {



        infoWindow = new google.maps.InfoWindow;

        // Try HTML5 geolocation.
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            map = new google.maps.Map(document.getElementById('map'), {
              center: {lat: lat1, lng: long1},
              zoom: 6
            });
            long1 = position.coords.longitude;
            lat1 = position.coords.latitude;
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            var user = firebase.auth().currentUser.uid;

            var mRef = firebase.database().ref().child("Users").child(user);

            mRef.on("value", function(snapshot) {
                var name = snapshot.val().Name;
                userFirstCharacter = name.charAt(0);
                var lRef = firebase.database().ref().child("Locations").child(user);

                lRef.set({
                  label: userFirstCharacter,
                  lat: lat1,
                  lng: long1,

                });
            });

            console.log(userFirstCharacter);

            /*

            map.panTo(new google.maps.LatLng(
                        position.coords.latitude,
                        position.coords.longitude
                    ));

            */

            console.log(lat1);
            console.log(long1);
            //infoWindow.setPosition(pos);
            //infoWindow.setContent('Location found.');
            //infoWindow.open(map);
            //map.setCenter(pos);

            //firebase reading
            var key = mRef.key;
            var ref = firebase.database().ref().child("Locations");
            var markers = []

            ref.on("child_added", function(snapshot) {
                var newPosition = snapshot.val()
                var latLng = new google.maps.LatLng(newPosition.lat, newPosition.lng)




                var marker = new google.maps.Marker({
                  position: latLng,
                  map: map,
                  label: newPosition.label,
                });
            })
          }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
          });
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
        }

        //Other locations




      }

      function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(map);
      }
