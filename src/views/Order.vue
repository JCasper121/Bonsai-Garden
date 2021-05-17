<template>
  <div class="container-fluid">
    <div class="row">
      <span class="warning">The maximum delivery distance is 5 miles</span>
        <div class="col col-lg-6 col-md-12 col-sm-12">
          <Menu/>
        </div>

        <div class="col col-lg-6 col-md-12 col-sm-12">
          <Checkout/>
        </div>
    </div>
  </div>
</template>

<script>
import Menu from '../components/Menu';
import Checkout from '../components/Checkout';

export default {
  name: "Order",
  components: {
    Menu,
    Checkout
  },

}
</script>

<style>
.warning {
  color: red;
}

.row {
  text-align: center;
}
</style>
