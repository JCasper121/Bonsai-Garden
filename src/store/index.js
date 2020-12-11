import { createStore } from 'vuex'

export default createStore({
  state: {
    foodItems: [
        {
          id: 0,
          title: "White Rice",
          price: 1.5,
          quantity: 0,
          category: 'appetizer'
        }, 
        {
          id: 1,
          title: "Miso Soup",
          price: 2.5,
          quantity: 0,
          category: 'appetizer'
        }, 
        {
          id: 2,
          title:"Tamago",
          price: 3.5,
          quantity: 0,
          category: 'appetizer'
        },
        {
          id: 3,
          title:"Nori Sushi",
          price: 4.0,
          quantity: 0,
          category: 'appetizer'
        },
        {
          id: 4,
          title:"Gyoza",
          price: 3.85,
          quantity: 0,
          category: 'appetizer'
        },
        {
          id: 5,
          title:"Tempura",
          price: 4.0,
          quantity: 0,
          category: 'appetizer'
        },

        {
          id: 6,
          title: 'California Roll',
          price: 7,
          quantity: 0,
          category: 'main'
        },
        {
          id: 7,
          title: 'Beef Katsu',
          price: 8,
          quantity: 0,
          category: 'main'
        },
        {
          id: 8,
          title: 'Ginger Pork',
          price: 8.5,
          quantity: 0,
          category: 'main'
        },
        {
          id: 9,
          title: 'Yakisoba',
          price: 7,
          quantity: 0,
          category: 'main'
        },
        {
          id: 10,
          title: 'Tonkatsu',
          price: 8,
          quantity: 0,
          category: 'main'
        },
        {
          id: 11,
          title: 'Spinach Ohitashi',
          price: 2,
          quantity: 0,
          category: 'side'
        }, 
        {
          id: 12,
          title: 'Tofu',
          price: 2.5,
          quantity: 0,
          category: 'side'
        }, 
        {
          id: 13,
          title: 'Soft Boiled Egg',
          price: 1.5,
          quantity: 0,
          category: 'side'
        }, 
        
      ],
      currentOrder: []
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
    }
  },
  actions: {
    incrementQuantity(context, payload) {
      context.commit('INCREMENT_QUANTITY', payload);
    },
    decrementQuantity(context, payload) {
      context.commit('DECREMENT_QUANTITY', payload);
    }
  },
  modules: {
  },
  getters: {
    getFoodItems: state => state.foodItems,
    getOrder: state => state.currentOrder,
  }
})
