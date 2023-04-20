<template>
    <div class="py-4 container-fluid">
        <div class="row d-flex justify-content-center mt-8">
            <div class="col-lg-12">
                <div class="col-lg-12">
                    <RecordCard />
                </div>
            </div>
        </div>
    </div>
</template>
<script>
//import Carousel from "./components/Carousel.vue";
//import CategoriesCard from "./components/CategoriesCard.vue";
import RecordCard from "./components/RecordCard.vue";


export default {
    name: "dashboard-default",
    data() {
        return {}
    },
    components: {
       // Carousel,
        //CategoriesCard,
        RecordCard
    },
};
</script>
  