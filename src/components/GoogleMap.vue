<template>
  <div id="map-container row">


    <br>
    <div>

      <span id="checkSuccess" class="checkResult text text-success"></span>
      <span id="checkFail" class="checkResult text text-danger"></span>
    </div>
    <div class="form-container col-lg-3 col-md-3 col-sm-12">
      <button id="validAdd" type="button" @click.prevent ="validTestAddress()" class="btn btn-primary">
          Test a valid address
      </button>
      
      <form id="address-form" >
      <!-- class="hide col-lg-3 col-md-3 col-sm-12" >-->
      
          <label for="street">Street:</label>
          <input type="text" id="street" v-model='address.street'><br>
          <label for="city">City:</label>
          <input type="text" v-model='address.city' id="city"><br>
          <label for="state">State:</label>
          <input type="text" v-model='address.state' maxlength="2"><br>
          <label for="zip">ZIP code:</label>
          <input type="number" v-model='address.zip' id="zip">
          <button  id="submit" class="btn btn-primary" @click.prevent="checkDistance()">Check</button>
          <button class="btn btn-primary" @click.prevent="resetForm()">Reset</button>
      </form>
    </div>

    <div id="GoogleMap" class="col-lg-6 col-md-6 col-sm-12"/></div>
  <br>
</template>

<script>

import {Loader} from 'google-maps';

// Initialized in mounted()
var google = null;
var map = null;
var directionsService = null;
var directionsRenderer = null;


export default {
  name: 'GoogleMap',
  data() {
    return {
      address: {
      street: '',
      city: '',
      state: '',
      zip: '',
      },
      restaurant: "1650 w state st boise, id",
      coordinates : {
        lat: 43.624403,
         lng: -116.209083
      },
      deliveryAddress: null
    


    }
  },

  async created() {
    if(google == null && map == null ) {
      try {
          const loader = new Loader('AIzaSyABEbEI3sIsaJSXiuEDhSeSbMD2ifEh8vA');
          google = await loader.load();
          map = new google.maps.Map(document.getElementById("GoogleMap"), {
            center: this.coordinates,
            zoom: 10
          });
          new google.maps.Marker({
            position: this.coordinates,
            map: map,
            title: "Bonsai Garden"
          });

          directionsService = new google.maps.DirectionsService();
          directionsRenderer = new google.maps.DirectionsRenderer();

          // Mounts Direction Renderer to our map
          directionsRenderer.setMap(map);
      } catch (error) {
        console.error("Error: " + error);
      }
    }
  },

  methods: {
    checkDistance() {
        //Delivery address
        var destination = this.address.street + " " + this.address.city + " " + this.address.state + " " + this.address.zip;

        //Building the request to send to the API
        var request = {
          // 
            origin: this.restaurant,
            destination,
            travelMode: google.maps.TravelMode.DRIVING,
            unitSystem: google.maps.UnitSystem.IMPERIAL
          }

        directionsService.route(request,(response, status) => {
            if(status === "OK") {
              directionsRenderer.setDirections(response);
              var distanceString = response.routes[0].legs[0].distance.text;
              var distance = parseFloat(distanceString.substr(0, distanceString.length - 2));
              document.getElementById("checkFail").innerHTML = "";
              document.getElementById("checkSuccess").innerHTML = "";
              if(distance > 5) {
                document.getElementById("checkFail").innerHTML = "Distance " + response.routes[0].legs[0].distance.text + "les exceeds our delivery range. Consider takeout?";
              } else {
                document.getElementById("checkSuccess").innerHTML = "Distance " + response.routes[0].legs[0].distance.text + "les is within delivery range!";
                this.deliveryAddress = destination;
              }
            } else {
              window.alert("Distance check failed");
            }
          }
        )
    },
    resetForm() {
      this.address.street = '';
      this.address.city = "";
      this.address.state= "";
      this.address.zip = "";
      document.getElementById("checkFail").innerHTML = "";
      document.getElementById("checkSuccess").innerHTML = "";
      map.removeMarkers
    },

    validTestAddress() {
      this.address.street = '348 S 13th St';
      this.address.city = "Boise";
      this.address.state= "ID";
      this.address.zip = "83702";
    }


  }
  
};
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
  width: 100vw;
}

.form-container {
  width: 30%;
  height: auto;
  display: inline-block;
}

.checkResult {
  margin-bottom: 10px;
  font-weight: 900;
}

button {
  margin: 5px;
}

#validAdd {
  display: block;
}

#GoogleMap {
  display: inline-block;
  width: 250px;
  height: 250px;
  margin-left: 15%;
}
@media only screen and (max-width: 1247px) {
  .map-container {
    text-align: center;
  }
  #GoogleMap {
  display: block;
}
}
@media only screen and (max-width: 768px) {
.form-container {
  margin-left: -55%;

}
}
@media only screen and (max-width: 450px) {
  #GoogleMap {
  display: block;
  width: 150px;
  height: 150px;
}

body {
  margin: 0 30% 0 10%;
}
}
</style>