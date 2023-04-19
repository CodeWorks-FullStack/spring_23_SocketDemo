<template>
  <div class="col-md-3 bgLight">
    <div class="row ">
      <div class="col-12" v-for="a in ads" :key="a.id">
        <div class="row justify-content-center">
          <div class="col-8 mt-4">
            <img class="img-fluid" :src=a.tall alt="">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from "vue";
import { AppState } from "../../AppState";
import { logger } from "../../utils/Logger";
import Pop from "../../utils/Pop";

export default {



  setup() {




    return {
      users: computed(() => AppState.users),
      ads: computed(() => AppState.ads)

    }
  }
}
</script>

<style scoped>
.onlinePicture {
  height: 35px;
  width: 35px;
  aspect-ratio: 1/1;
  border-radius: 50%;
}

.bgLight {
  background-color: #265e49;
  color: whitesmoke;
}
</style>
