import Vue from "vue";
import VueRouter from "vue-router";
import Index from "../views/Index.vue";


// inventory
import AllItems from '@/components/inventory/AllItems'
import AddItem from '@/components/inventory/AddItem'
import AddCategory from '@/components/category/AddCategory'
import AllCategories from '@/components/category/AllCategories'


Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Index",
    component: Index
  },
  {
    path: "/items",
    name: "AllItems",
    component: AllItems
  },
  {
    path: "/items/add",
    name: "AddItem",
    component: AddItem
  },
  {
    path: "/category/add",
    name: "AddCategory",
    component: AddCategory
  },
  {
    path: "/category/all",
    name: "AllCategories",
    component: AllCategories
  },


];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
