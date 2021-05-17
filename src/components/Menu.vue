<template>
    <h1>Menu</h1>
    <div id="menu">
        <div class="container">
            <!-- Appetizers section -->
            <div class="category panel panel-default panel-info" data-toggle="collapse" data-target="#sub-menu1">
                <div class="panel-body pl-2"><h3>Appetizers</h3></div>
            </div>
            <div id="sub-menu1" class="collapse sub-menu">
                <ul>
                    <li v-for="i in foodItems" :key="i.id">
                        <article v-if="i.category == 'appetizer'" class="foodItem panel panel-default panel-info" >
                            <h3 class="foodTitle">{{ i.title }}</h3>
                            <h4 class="foodPrice">{{ formatPrice(i.price) }}</h4>
                            <div class="quantity">
                                <span  @click="incrementQuantity(i.id)" class="icon is-small">
                                    <i class="fas fa-plus" ></i>
                                </span>
                                <h3>{{ order[i.id] }}</h3>
                                <span  @click="decrementQuantity(i.id)" class="icon is-small">
                                    <i class="fas fa-minus" ></i>
                                </span>
                            </div>
                        </article>
                    </li>
                </ul>
                <br>
            </div>
            <!-- Main dishes section -->
            <div class="category panel panel-default panel-info" data-toggle="collapse" data-target="#sub-menu2">
                <div class="panel-body"><h3>Main Dishes</h3></div>
            </div>
            <div id="sub-menu2" class="collapse sub-menu">
                <ul>
                    <li v-for="i in foodItems" :key="i.id">
                        <article v-if="i.category == 'main'" class="foodItem panel panel-default panel-info" >
                            <h3 class="foodTitle">{{ i.title }}</h3>
                            <h4 class="foodPrice">{{ formatPrice(i.price) }}</h4>
                            <div class="quantity">
                                <span  @click="incrementQuantity(i.id)" class="icon is-small">
                                    <i class="fas fa-plus" ></i>
                                </span>
                                <h3>{{ order[i.id] }}</h3>
                                <span  @click="decrementQuantity(i.id)" class="icon is-small">
                                    <i class="fas fa-minus" ></i>
                                </span>
                            </div>
                        </article>
                    </li>
                </ul>
                <br>
            </div>
            <!-- Sides section -->
            <div class="category panel panel-default panel-info" data-toggle="collapse" data-target="#sub-menu3">
                <div class="panel-body"><h3>Sides</h3></div>
            </div>
            <div id="sub-menu3" class="collapse sub-menu">
                <ul>
                    <li v-for="i in foodItems" :key="i.id">
                        <article v-if="i.category == 'side'" class="foodItem panel panel-default panel-info" >
                            <h3 class="foodTitle">{{ i.title }}</h3>
                            <h4 class="foodPrice">{{ formatPrice(i.price) }}</h4>
                            <div class="quantity">
                                <span  @click="incrementQuantity(i.id)" class="icon is-small">
                                    <i class="fas fa-plus" ></i>
                                </span>
                                <h3>{{ order[i.id] }}</h3>
                                <span  @click="decrementQuantity(i.id)" class="icon is-small">
                                    <i class="fas fa-minus" ></i>
                                </span>
                            </div>
                        </article>
                    </li>
                </ul>
                <br>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "Menu",
    data() {
        return {
            foodItems: [],
            order: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        }
    },

    methods: {
        incrementQuantity(id) {
            this.$store.dispatch('incrementQuantity', this.foodItems[id]);
            
                this.order[id] ++;
        },

        decrementQuantity(id) {
            this.$store.dispatch('decrementQuantity', this.foodItems[id]);
            if(this.order[id] !== 0) {
                this.order[id] --;
            }
        },

        formatPrice(price) {
            const formatter = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 2
            })

            var formattedPrice = formatter.format(price);
            return formattedPrice;
        }
    },
    computed: {

    },

    mounted() {
        this.foodItems = this.$store.getters.getFoodItems;

    }
}
</script>
<style scoped>
ul {
    list-style: none;
}
li {
    margin-top: 10px;
}

h3 {
    display: inline;
}

.foodItem {
    padding: 2%;
    width: 40vw;
    /* text-align: left; */
    display: flex;
     /* display: inline; */
     justify-content: space-between;
    border: 2px solid rgb(63, 187, 228);
}

/* .foodTitle {
    width: 250px;
} */

.foodPrice {

    font-weight: bold;
}

.sub-menu {
    text-align: center;
}

.category {
    background-color: rgb(63, 187, 228);
    width: 60vh;
}

/* @media only screen and (max-width: 1190px) {
    .category, .foodItem {
        margin-left: 20%;
    }
} */

.quantity {
    margin-bottom: -20px;
}
@media only screen and (max-width: 655px) {
    /* .category {
        width: 60vh
    } */
    .quantity { 
        display: flex;
    }

    .quantity icon, .quantity h3 {
        flex-direction: column;
        width: 100%;
    }

    .foodItem, .category {
        width: 100%;
    }
}
i {
    margin: 5px;
}
</style>