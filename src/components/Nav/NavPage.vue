<template>
  <div class="type-nav">
    <div class="container">
      <div @mouseleave="mouseLeaveAll" @mouseenter="mouseInAll">
        <h2 class="all">全部商品分类</h2>
        <transition name="sort">
          <div class="sort"  v-show="show">
            <div class="all-sort-list2" @click="goSearch">
              <div
                class="item"
                v-for="(l1, index) in NavData.slice(0, 16)"
                :key="l1.categoryId"
                :class="{ focus: focusIndex == index }"
              >
                <h3 @mouseenter="mouseIn(index)">
                  <a :data-listname = l1.categoryName :data-list1id = l1.categoryId>{{ l1.categoryName }}</a>
                </h3>
                <div
                  class="item-list clearfix"
                  :style="{ display: focusIndex === index ? 'block' : 'none' }"
                >
                  <div class="subitem">
                    <dl
                      class="fore"
                      v-for="l2 in l1.categoryChild"
                      :key="l2.categoryId"
                    >
                      <dt>
                        <a :data-listname = l2.categoryName :data-list2id = l2.categoryId>{{ l2.categoryName }}</a>
                      </dt>
                      <dd>
                        <em v-for="l3 in l2.categoryChild" :key="l3.categoryId">
                          <a :data-listname = l3.categoryName :data-list3id = l3.categoryId>{{ l3.categoryName }}</a>
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import throttle from 'lodash/throttle'
export default {
  name: "NavPage",
  data() {
    return {
      focusIndex: -1,
      show:true
    };
  },
  mounted() {
    // console.log(this);
    if (this.$route.path != '/home') {
      this.show = false
    }
  },
  computed: {
    ...mapState('homeInfo', ["NavData"]),
  },
  methods: {
    mouseIn:throttle(function (index) {
      this.focusIndex = index;
      // console.log(index);
    },50),
    goSearch(event){
      let {listname,list1id,list2id,list3id} = event.target.dataset
      let loc = {name:'search'}
      let query = {'listname':listname}
      if(listname){
        if (list1id) {
          query.list1id = list1id
        }else if(list2id){
          query.list2id = list2id
        }else {
          query.list3id = list3id
        }
        loc.query = query
      }
      if (this.$route.params) {
        loc.params = this.$route.params
      }
      this.$router.push(loc)
    },
    mouseInAll(){
      this.show = true
    },
    mouseLeaveAll(){
      this.focusIndex = -1
      if (this.$route.path != '/home') {
        this.show = false
      }
    }
  },
};
</script>

<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 480px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }
        }
        .focus {
          background-color: skyblue;
        }
      }
    }
    .sort-enter{
      height: 0;
    }
    .sort-enter-to{
      height: 416px;
    }
    .sort-enter-active{
      transition: all .1s linear;
    }
    .sort-leave{
      height: 416px;
    }
    .sort-leave-to{
      height: 0;
    }
    .sort-leave-active{
      transition: all .1s linear;
    }
  }
}
</style>