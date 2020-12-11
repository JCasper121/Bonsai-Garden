<template>
    <div id="banner">
        <h1>Bonsai Garden</h1>
        <h3>Japanese Cuisine</h3>
    </div>
    <div id="nav">
        <router-link to="/"><h2>Home</h2></router-link> <h2>|</h2>
        <router-link to="/order"><h2>Order online</h2></router-link>
    </div>
</template>
<script>
export default {
    name: "BannerNav"
}
</script>
<style lang="css" scoped>
#banner {
    background-image: url("../assets/sushi_banner.jpg");
    width: 100%;
    height: 25vh;
    background-position: center;
    padding-top: 100px;

}

h2 {
    display: inline;
}

h1, h3 {
    text-shadow: 1px 1px white;
}

#nav {
    background-color: rgb(119, 188, 211);
    padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: rgb(19, 158, 100);
}
</style>