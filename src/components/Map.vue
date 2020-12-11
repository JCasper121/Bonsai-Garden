<template>
    <div id="map">
    </div>
</template>

<script>
export default {
    data() {
        return {
            coordinates: {
                lat: 0,
                lng: 0
            }
        }
    },
    created() {
        
    }
}
</script>
<style scoped>
#map {
    height: 120px;
    width: 200px;
    background-image: url('../assets/map.jpg');
    background-size: contain;
}
</style>