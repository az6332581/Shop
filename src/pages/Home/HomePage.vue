<template>
  <div>
    <NavPage />
    <ListContainerPage />
    <RecommendPage />
    <RankPage />
    <LikePage />
    <FloorPage v-for="f in FloorData" :key="f.id" :list="f" />
    <BrandPage />
  </div>
</template>

<script>
import ListContainerPage from "./ListContainer/ListContainerPage.vue";
import RecommendPage from "./Recommend/RecommendPage.vue";
import RankPage from "./Rank/RankPage.vue";
import LikePage from "./Like/LikePage.vue";
import FloorPage from "./Floor/FloorPage.vue";
import BrandPage from "./Brand/BrandPage.vue";
import { mapState } from "vuex";
export default {
  name: "HomePage",
  components: {
    ListContainerPage,
    RecommendPage,
    RankPage,
    LikePage,
    FloorPage,
    BrandPage,
  },
  mounted() {
    this.$store.dispatch("homeInfo/getFloorData");
  },
  computed: {
    ...mapState("homeInfo", ["FloorData"]),
  },
};
</script>

<style lang="less" scoped>
</style>