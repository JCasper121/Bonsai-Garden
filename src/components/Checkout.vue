<template>
    <h1>Checkout</h1>
    <div class="container">
        <form action="">
            <div class="category panel panel-default panel-info" data-toggle="collapse" data-target="#sub-checkout1">
                <div class="panel-body"><h3>Your Order</h3></div>
            </div><br>
            <div id="sub-checkout1" class="sub-menu">
                <h2 class="section-heading">Your order</h2>
                <article class="dropdown panel panel-default panel-info" >
                    <ul>
                        <li>
                            <h4 v-for='i in orderList' :key='i.index'>{{ i.title }}  x{{ i.quantity }}</h4>
                        </li>
                    </ul>
                    <h4>Total: {{ formattedPrice }}</h4>
                </article>
            </div>

            <div class="category panel panel-default panel-info" data-toggle="collapse" data-target="#sub-checkout2">
                <div class="panel-body"><h3>Order details</h3></div>
            </div><br>
            <div id="sub-checkout2" class="collapse sub-menu">
                <h2 class="section-heading">Order Details</h2>
                <article class="dropdown panel panel-default panel-info" >
                    <div class="container-fluid">

                        <div class="row">
                            <span class="warning">The maximum delivery distance is 5 miles</span><br>
                        </div>

                        <div class="row">
                            <div class="col-6">
                                <div class="btn-group">
                                    <label for="takeout">Takeout</label>
                                    <input id="takeout" v-model='deliveryBool' type="radio" name="deliveryBool" value="false">
                                    <label for="delivery">Delivery</label>
                                    <input id="delivery" v-model='deliveryBool' type="radio" name="deliveryBool" value="true">
                                </div>
                                    
                                <br>
                                <form id="address-form" class="hide">
                                    <label for="street">Street:</label>
                                    <input type="text" id="street" v-model='address.street'><br>
                                    <label for="city">City:</label>
                                    <input type="text" v-model='address.city' id="city"><br>
                                    <label for="state">State:</label>
                                    <input type="text" v-model='address.state' maxlength="2"><br>
                                    <label for="zip">ZIP code:</label>
                                    <input type="number" v-model='address.zip' id="zip">

                                </form>
                            </div>
                            <hr>
                            <div class="col-6">
                                <div id="map-container" class="hide">
                                    <Map/>

                                </div>
                            </div>
                        </div>
                    </div>
                </article>
            </div>

            <div class="category panel panel-default panel-info" data-toggle="collapse" data-target="#sub-checkout3">
                <div class="panel-body"><h3>Payment</h3></div>
            </div><br>
            <div id="sub-checkout3" class="collapse sub-menu">
                <h2 class="section-heading">Payment</h2>
                <article class="dropdown panel panel-default panel-info" >
                    <div class="col-lg-6">

                        <div class="btn-group">
                            <label for="cash">Cash</label>
                            <input id="cash" v-model='cardBool' type="radio" name="cardBool" value="false">
                            <label for="card">Card</label>
                            <input id="card" v-model='cardBool' type="radio" name="cardBool" value="true">
                        </div>
                        <form id="cardForm" class="hide">
                            <label for="cardName">Name on Card: </label>
                            <input type="text" v-model="cardInfo.cardName" id="cardName">

                            <label for="cardNumber">Card number: </label>
                            <input type="number" v-model="cardInfo.cardNumber" id="cardNumber">

                            <label for="expriationDate">Expiration date: </label>
                            <div id="expirationDate">
                                <select id="month">
                                    <option value="1">JAN</option>
                                    <option value="2">FEB</option>
                                    <option value="3">MAR</option>
                                    <option value="4">APR</option>
                                    <option value="5">MAY</option>
                                    <option value="6">JUN</option>
                                    <option value="7">JUL</option>
                                    <option value="8">AUG</option>
                                    <option value="9">SEPT</option>
                                    <option value="10">OCT</option>
                                    <option value="11">NOV</option>
                                    <option value="12">DEC</option>
                                </select>
                                <select id="year">
                                    <option value="20">2020</option>
                                    <option value="21">2021</option>
                                    <option value="22">2022</option>
                                    <option value="23">2023</option>
                                    <option value="24">2024</option>
                                    <option value="25">2025</option>
                                </select>
                            </div>
                            <label for="securityCode">Security code: </label>
                            <input type="number" id="securityCode" maxlength="3">
                        </form>
                    </div>
                    <div class="col-lg-6">
                        <h4>Total: {{ formattedPrice }}</h4>
                    </div>
                </article>
            </div>
        </form>
    </div>
</template>
<script>
import Map from './Map';

export default {
    name: "Checkout",
    components: {
        Map
    },
    data() {
        return {
            cardInfo: {
                nameOnCard: '',
                expirationMonth: 0,
                expirationYear: 0,
                cardNumber: 0,
                securityCode: 0,
            },
            address: {
                street: '',
                city: '',
                state: '',
                zip: 0,
            },
            // order: [],
            price: 0,
            deliveryBool: "false",
            cardBool: "false",
            
    }
  },
    computed: {
      orderList() {
          return this.$store.getters.getOrder;
      },
      total() {
          var menu = this.$store.getters.getFoodItems;
          var total = 0;
          for(var i = 0; i < this.orderList.length; i++) {
              var foodId = this.orderList[i].foodId;
              var quantity = this.orderList[i].quantity;
              console.log("Menu length:" + menu.length);
              var menuItem = menu.find(i => i.id === foodId);
              var itemPrice = menuItem.price * quantity;
              total += itemPrice;
          }
          return total;
      },
      formattedPrice() {
        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2
        })

        var formattedPrice = formatter.format(this.total);
        return formattedPrice;
    }
  },
  updated() {
    //   Keeps hidden elements in sync
      if(this.deliveryBool == "true") {
          document.getElementById("map-container").removeAttribute("class");
          document.getElementById("address-form").removeAttribute("class");
          console.log("removed attribute");
      } else {
          document.getElementById("map-container").setAttribute("class", "hide");
          document.getElementById("address-form").setAttribute("class", "hide");
          console.log("added attribute");
      }

      if(this.cardBool == "true") {
          document.getElementById("cardForm").removeAttribute("class");
          console.log("removed attribute");
      } else {
          document.getElementById("cardForm").setAttribute("class", "hide");
          console.log("added attribute");
      }
  },


}
</script>
<style scoped>
.sub-menu {
    text-align: center;
}

ul {
    list-style: none;
}

.dropdown {
    padding: 20px;
    width: 40vw;
    /* text-align: left; */
    display: flex;
     /* display: inline; */
     justify-content: space-between;
    border: 2px solid rgb(63, 187, 228);
}

@media only screen and (max-width: 1190px) {
    .category, .dropdown {
        margin-left: 20%;
    }
    .section-heading {
        margin-left: -30vw;
    }
}

.category {
    background-color: rgb(63, 187, 228);
    width: 40vw;
}

#map-container {
    width: 100%;
    height: 300px;
}

.hide {
    display: none;
}

#map {
    height: 60%;
    width: 60%;
}



</style>