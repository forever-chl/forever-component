import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)

Vue.use(Router)

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      meta: { title: "首页" },
      component: _import("Index/index")
    },
    {
      path: "/book",
      name: "book",
      meta: { title: "预定会议" },
      component: _import("Book/index")
    },
    {
      path: "/detail/:id",
      name: "detail",
      meta: { title: "会议详情" },
      component: _import("Detail/index")
    },
    {
      path: "/meeting/:roomNum",
      name: "meeting",
      meta: { title: "会议" },
      component: _import("Meeting/index")
    }
  ]
});
