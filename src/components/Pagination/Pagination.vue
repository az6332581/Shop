<template>
  <div class="pagination">
    <button :disabled="pageNo == 1" @click="oderInfo(pageNo - 1)">
      上一頁
    </button>
    <button
      v-if="showRange.start > 1"
      @click="oderInfo(1)"
      :class="{ active: pageNo == 1 }"
    >
      1
    </button>
    <button v-if="showRange.start > 2">···</button>

    <button
      v-for="(range, index) in showRange.end"
      :key="index"
      v-if="range >= showRange.start"
      @click="oderInfo(range)"
      :class="{ active: pageNo == range }"
    >
      {{ range }}
    </button>

    <button v-if="showRange.end < totalPage - 1">···</button>
    <button
      v-if="showRange.end < totalPage"
      @click="oderInfo(totalPage)"
      :class="{ active: pageNo == totalPage }"
    >
      {{ totalPage }}
    </button>
    <button :disabled="pageNo == totalPage" @click="oderInfo(pageNo + 1)">
      下一頁
    </button>
    <button style="margin-left: 30px">共 {{ total }} 個</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: ["pageNo", "pageSize", "total", "pageRange"],
  computed: {
    totalPage() {
      return Math.ceil(this.total / this.pageSize);
    },
    showRange() {
      let start = 0;
      let end = 0;
      if (this.total < this.pageSize) {
        start = 1;
        end = this.total;
      } else {
        start = this.pageNo - Math.floor(this.pageRange / 2);
        end = this.pageNo + Math.floor(this.pageRange / 2);
        if (start < 1) {
          start = 1;
          end = this.pageRange;
        }
        if (end > this.totalPage) {
          start = this.totalPage - this.pageRange + 1;
          end = this.totalPage;
        }
      }
      return { start, end };
    },
  },
  methods: {
    oderInfo(val) {
      this.$emit("oderInfo", val);
    },
  },
};
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #e1251b;
      color: #fff;
    }
  }
}
</style>
