import Vue from "vue";
import VueRouter from "vue-router";
import Index from "../views/Index.vue";


// inventory
import AllItems from '@/components/inventory/AllItems'


Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Index",
    component: Index
  },
  {
    path: "/all",
    name: "AllItems",
    component: AllItems
  },


];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
