<template>
    <h1>Checkout</h1>
    <div class="container">
            <div class="category panel panel-default panel-info" data-toggle="collapse" data-target="#sub-checkout1">
                <div class="panel-body"><h3>Your Order</h3></div>
            </div><br>
            <div id="sub-checkout1" class="sub-menu">
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
                <article class="dropdown panel panel-default panel-info" >
                    <div class="container-fluid">

                        <div class="row">
                            <span class="warning">The maximum delivery distance is 5 miles</span><br>
                        </div>

                        <div class="row">
                            <div class="btn-group col-lg-3 radio-group">
                                <label class="radio-label" for="takeout">Takeout</label>
                                <input id="takeout" class="radioButton" v-model='deliveryBool' type="radio" name="deliveryBool" value="false">
                                <label for="delivery">Delivery</label>
                                <input id="delivery" class="radioButton" v-model='deliveryBool' type="radio" name="deliveryBool" value="true">
                            </div>

                            <br>
                            <div id="map-container" class="hide col-lg-9">
                                <GoogleMap/>
                            </div>
                        </div>

                    </div>
                </article>
            </div>

            <div class="category panel panel-default panel-info" data-toggle="collapse" data-target="#sub-checkout3">
                <div class="panel-body"><h3>Payment</h3></div>
            </div><br>
            <div id="sub-checkout3" class="collapse sub-menu">
                <article class="dropdown panel panel-default panel-info" >
                        <!-- <stripe-checkout
                            ref="checkoutRef"
                            mode="payment"
                            :pk="publishableKey"
                            :line-items="lineItems"
                            :success-url="successURL"
                            :cancel-url="cancelURL"
                            @loading="v => loading = v"
                            />
                            <button class="btn btn-primary" @click="submit()">Pay</button> -->
                    <!-- <div class="col-lg-6">

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
                    </div> -->
                    <div class="col-lg-6">
                        <h4>Total: {{ formattedPrice }}</h4>
                    </div>
                </article>
            </div>
    </div>
</template>
<script>
import GoogleMap from './GoogleMap';
//import { StripeCheckout } from '@vue-stripe/vue-stripe';
export default {
    name: "Checkout",
    components: {
        GoogleMap,
        //StripeCheckout
    },
    data() {
        this.publishableKey = "pk_test_51IrFZ9APgXpqYwqKatm9jGmrpsJZRqsXptjNUQAKzcgnapVkvZIKi1JvibHzgPdAAFjtUZ402Dtf3OPFj9rP5RyG00LBcCDO9t"
        return {
            loading: false,
            lineItems: [],
            cardInfo: {
                nameOnCard: '',
                expirationMonth: 0,
                expirationYear: 0,
                cardNumber: 0,
                securityCode: 0,
            },
            order: [],
            price: 0,
            deliveryBool: "false",
            cardBool: "false",
            
        }
    },
    methods: {
        // submit() {
        //     this.$refs.checkoutRef.redirectToCheckout();
        // }
    },
    computed: {
      orderList() {
          var orderList = this.$store.getters.getOrder
          return orderList;
      },
      total() {
          var menu = this.$store.getters.getFoodItems;
          var total = 0;
          for(var i = 0; i < this.orderList.length; i++) {
            //   Calculate total
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
    //   Keeps toggle-to-show elements in sync
      if(this.deliveryBool == "true") {
          document.getElementById("map-container").removeAttribute("class");
          document.getElementById("address-form").removeAttribute("class");
      } else {
          document.getElementById("map-container").setAttribute("class", "hide");
          document.getElementById("address-form").setAttribute("class", "hide");
      }

      if(this.cardBool == "true") {
          //document.getElementById("cardForm").removeAttribute("class");
      } else {
          //document.getElementById("cardForm").setAttribute("class", "hide");
      }
  },


}
</script>
<style scoped>
.sub-menu {
    text-align: center;

}

.radio-group {
    vertical-align: top;
    text-align: left;
    display: inline-block;
}
#map-container {
    display: inline-block;
}
ul {
    list-style: none;
}
.delivery {
    width: 25%;
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
/* @media only screen and (max-width: 1550px) {
    .map-menu {
            margin-left: 20%;
    }
} */
@media only screen and (max-width: 1190px) {
    .dropdown {
        width: 100%;
    }

    .panel-body {
        width: 100%;
    }


}

@media only screen and (max-width: 655px) {
    .category {
        width: 100%;
    }
}

.category {
    background-color: rgb(63, 187, 228);
    width: 60vh;
}


.hide {
    display: none;
}





</style>