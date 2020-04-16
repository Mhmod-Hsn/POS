import Vue from "vue";
import VueRouter from "vue-router";
import Index from "../views/Index.vue";


// inventory
import AllItems from '@/components/inventory/AllItems'
import AddItem from '@/components/inventory/AddItem'

// category
import AddCategory from '@/components/category/AddCategory'
import AllCategories from '@/components/category/AllCategories'

// users
import AddUser from '@/components/user/AddUser'
import AllUsers from '@/components/user/AllUsers'

// operations
import AllOperations from '@/components/operations/AllOperations'


Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Index",
    component: Index
  },
  {
    path: "/items/all",
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
  {
    path: "/user/add",
    name: "AddUser",
    component: AddUser
  },
  {
    path: "/user/all",
    name: "AllUsers",
    component: AllUsers
  },
  {
    path: "/operation",
    name: "AllOperations",
    component: AllOperations
  }


];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
