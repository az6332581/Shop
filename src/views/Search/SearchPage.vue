<template>
  <div>
    <NavPage />
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <li class="with-x" v-if="params.categoryName">
              {{ params.categoryName }}<i @click="delCategoryName">×</i>
            </li>
            <li class="with-x" v-if="params.keyword">
              {{ params.keyword }}<i @click="delKeyWord">×</i>
            </li>
            <li class="with-x" v-if="params.trademark">
              {{ params.trademark.split(":")[1] }}<i @click="delTradeMark">×</i>
            </li>
            <li
              class="with-x"
              v-for="(attr, index) in params.props"
              :key="index"
            >
              {{ attr.split(":")[1] }}<i @click="delattr(index)">×</i>
            </li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector @tradeMarkInfo="tradeMarkInfo" @attrInfo="attrInfo" />

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li :class="{ active: orderOne }" @click="orderchange('1')">
                  <a>综合</a>
                  <div v-show="orderOne">
                    <span v-if="ordercheck">⬆</span>
                    <span v-else>⬇</span>
                  </div>
                </li>
                <li :class="{ active: orderTwo }" @click="orderchange('2')">
                  <a>价格</a>
                  <div v-show="orderTwo">
                    <span v-if="ordercheck">⬆</span>
                    <span v-else>⬇</span>
                  </div>
                </li>
                <li>
                  <a href="#">销量</a>
                </li>
                <li>
                  <a href="#">新品</a>
                </li>
                <li>
                  <a href="#">评价</a>
                </li>
              </ul>
            </div>
          </div>
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="good in goodsList" :key="good.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <router-link :to="`/detail/${good.id}`"
                      ><img v-lazy="good.defaultImg" :key="good.id"
                    /></router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i> {{ good.price }}.00</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a
                      target="_blank"
                      href="item.html"
                      title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】"
                      >{{ good.title }}</a
                    >
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <Pagination
            :pageNo="params.pageNo"
            :pageSize="params.pageSize"
            :total="SearchData.total"
            :pageRange="5"
            @oderInfo="oderInfo"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import SearchSelector from "./SearchSelector/SearchSelector";
export default {
  name: "SearchPage",
  components: { SearchSelector },
  data() {
    return {
      params: {
        category1Id: "",
        category2Id: "",
        category3Id: "",
        categoryName: "",
        keyword: "",
        order: "1:asc",
        pageNo: 1,
        pageSize: 5,
        props: [],
        trademark: "",
      },
    };
  },
  beforeMount() {
    this.sendParams();
  },
  mounted() {
    this.getData();
  },
  computed: {
    ...mapGetters("searchInfo", ["goodsList"]),
    ...mapState("searchInfo", ["SearchData"]),
    orderOne() {
      return this.params.order.indexOf("1") !== -1;
    },
    orderTwo() {
      return this.params.order.indexOf("2") !== -1;
    },
    ordercheck() {
      return this.params.order.indexOf("asc") !== -1;
    },
  },
  methods: {
    getData() {
      this.$store.dispatch("searchInfo/getSearchData", this.params);
    },
    sendParams() {
      let category = {
        categoryName: this.$route.query.categoryName || undefined,
        category1Id: this.$route.query.list1id || undefined,
        category2Id: this.$route.query.list2id || undefined,
        category3Id: this.$route.query.list3id || undefined,
      };
      Object.assign(this.params, category, this.$route.params);
    },
    delCategoryName() {
      this.params.categoryName = undefined;
      this.params.category1Id = undefined;
      this.params.category2Id = undefined;
      this.params.category3Id = undefined;
      this.getData();
      if (this.$route.params) {
        this.$router.push({ name: "search", params: this.$route.params });
      }
    },
    delKeyWord() {
      this.params.keyword = undefined;
      this.getData();
      this.$bus.$emit("clearKeyWord");
      if (this.$route.query) {
        this.$router.push({ name: "search", query: this.$route.query });
      }
    },
    tradeMarkInfo(val) {
      this.params.trademark = val;
      this.getData();
    },
    delTradeMark() {
      this.params.trademark = undefined;
      this.getData();
    },
    attrInfo(attrs, attrValue) {
      let attr = `${attrs.attrId}:${attrValue}:${attrs.attrName}`;
      if (this.params.props.indexOf(attr) == -1) {
        this.params.props.push(attr);
      }
      this.getData();
    },
    delattr(index) {
      this.params.props.splice(index, 1);
      this.getData();
    },
    orderchange(current) {
      let originOrder = this.params.order.split(":")[0];
      let originSwitch = this.params.order.split(":")[1];
      if (current !== originOrder) {
        this.params.order = `${current}:${originSwitch}`;
      } else if (current == originOrder) {
        if (originSwitch == "asc") {
          this.params.order = `${current}:desc`;
        } else if (originSwitch == "desc") {
          this.params.order = `${current}:asc`;
        }
      }
      this.getData();
    },
    oderInfo(val) {
      this.params.pageNo = val;
      this.getData();
    },
  },
  watch: {
    $route() {
      this.sendParams();
      this.getData();
    },
  },
};
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;
              display: flex;
              align-items: center;
              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
              > div {
                background: #e1251b;
                padding-right: 3px;
                > span {
                  line-height: 40px;
                  color: white;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>