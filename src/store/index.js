import { createStore } from 'vuex'

export default createStore({
  state: {
    foodItems: [
        {
          id: 0,
          title: "White Rice",
          price: 1.5,
          quantity: 0,
          category: 'appetizer',
          stripeId: "prod_JUxY8moPYDwT5u",
          stripePriceId:"price_1IrxdCAPgXpqYwqKD9nvmkrA"
        }, 
        {
          id: 1,
          title: "Miso Soup",
          price: 2.5,
          quantity: 0,
          category: 'appetizer',
          stripeId: "prod_JUxYVNf4UVl182",
          stripePriceId:"price_1IrxdmAPgXpqYwqKkIfNBR4L"
        }, 
        {
          id: 2,
          title:"Tamago",
          price: 3.5,
          quantity: 0,
          category: 'appetizer',
          stripeId: "prod_JUxZE4cwS6mnkn",
          stripePriceId:"price_1IrxeDAPgXpqYwqKcoxRGMrz"
        },
        {
          id: 3,
          title:"Nori Sushi",
          price: 4.0,
          quantity: 0,
          category: 'appetizer',
          stripeId: "prod_JUxZT7MNnyY5cX",
          stripePriceId:"price_1IrxeeAPgXpqYwqKp7hKEBXF"
        },
        {
          id: 4,
          title:"Gyoza",
          price: 3.85,
          quantity: 0,
          category: 'appetizer',
          stripeId: "prod_JUxaAhgeklqyeI",
          stripePriceId:"price_1IrxfAAPgXpqYwqK2pOR9Qxz"
        },
        {
          id: 5,
          title:"Tempura",
          price: 4.0,
          quantity: 0,
          category: 'appetizer',
          stripeId: "prod_JUxaUMzeCyGEAs",
          stripePriceId:"price_1IrxfUAPgXpqYwqKYdXIypbf"
        },

        {
          id: 6,
          title: 'California Roll',
          price: 7,
          quantity: 0,
          category: 'main',
          stripeId: "prod_JUxbiid2jkY4rd",
          stripePriceId:"price_1IrxfvAPgXpqYwqKPMyLiIsK"
        },
        {
          id: 7,
          title: 'Beef Katsu',
          price: 8,
          quantity: 0,
          category: 'main',
          stripeId: "prod_JUxbyyRYJNxy4t",
          stripePriceId: "price_1IrxgJAPgXpqYwqKq2eJeSmu"
        },
        {
          id: 8,
          title: 'Ginger Pork',
          price: 8.5,
          quantity: 0,
          category: 'main',
          stripeId: "prod_JUxb5sRdxeWsMf",
          stripePriceId: "price_1IrxglAPgXpqYwqKQicPwko1"
        },
        {
          id: 9,
          title: 'Yakisoba',
          price: 7,
          quantity: 0,
          category: 'main',
          stripeId: "prod_JUxcaRVLGriceO",
          stripePriceId:"price_1IrxhFAPgXpqYwqKPTrh1vgR"
        },
        {
          id: 10,
          title: 'Tonkatsu',
          price: 8,
          quantity: 0,
          category: 'main',
          stripeId: "prod_JUxcyniKdp9GfH",
          stripePriceId:"price_1IrxhXAPgXpqYwqKLsvaVMnF"
        },
        {
          id: 11,
          title: 'Spinach Ohitashi',
          price: 2,
          quantity: 0,
          category: 'side',
          stripeId: "prod_JUxdIUF9666bmq",
          stripePriceId:"price_1IrxiAAPgXpqYwqKPOeh2hOz"
        }, 
        {
          id: 12,
          title: 'Tofu',
          price: 2.5,
          quantity: 0,
          category: 'side',
          stripeId: "prod_JUxd1zpPOTB9LC",
          stripePriceId:"price_1IrxiUAPgXpqYwqKAUPpZECq"
        }, 
        {
          id: 13,
          title: 'Soft Boiled Egg',
          price: 1.5,
          quantity: 0,
          category: 'side',
          stripeId: "prod_JUxedtWfmMS0gl",
          stripePriceId:"price_1IrxivAPgXpqYwqKwQ31NyzU"
        }, 
        
      ],
      currentOrder: [],
      deliveryAddress: ''
  },
  // synchronous
  mutations: {
    INCREMENT_QUANTITY(state, payload) {
      var index = state.currentOrder.findIndex(o => o.foodId == payload.id);
      if(index >= 0) {
        state.currentOrder[index].quantity ++;
      } else {
        state.currentOrder.push({
          foodId: payload.id,
          title: payload.title,
          quantity: 1,
        })
      }
      for(var i = 0; i < state.currentOrder.length; i++) {
        console.log(state.currentOrder[i]);
      }
    },

    DECREMENT_QUANTITY(state, payload) {
      var index = state.currentOrder.findIndex(o => o.foodId === payload.id);
      if(index >= 0) {
        state.currentOrder[index].quantity --;
        var quant = state.currentOrder[index].quantity;

        // If the item has 0 quantity, remove it from currentOrder
        if(quant === 0) {
          state.currentOrder.splice(index, 1);
        }
          

      }
    },

    SET_DELIVERY(state, payload) {
      state.deliveryAddress = payload;
    }
  },
  actions: {
    incrementQuantity(context, payload) {
      context.commit('INCREMENT_QUANTITY', payload);
    },
    decrementQuantity(context, payload) {
      context.commit('DECREMENT_QUANTITY', payload);
    },
    setDelivery(context, payload) {
      context.commit('SET_DELIVERY', payload)
    }
  },
  modules: {
  },
  getters: {
    getFoodItems: state => state.foodItems,
    getOrder: state => state.currentOrder,
  }
})
