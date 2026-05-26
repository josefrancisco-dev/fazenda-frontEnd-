import { createBrowserRouter } from "react-router-dom";
import Home from "@/pages /public/webSite";
import LoginPage from "@/pages /public/login";
import { Dashboard } from "@/pages /private/dashboard";
import { Clients } from "@/pages /private/clients";
import { Supplier } from "@/pages /private/supplier";
import { Products } from "@/pages /private/products";
import { Orders } from "@/pages /private/orders";
import { Stock } from "@/pages /private/stock";
import { Shopping } from "@/pages /private/shopping";
import { NotFound } from "@/pages /public/notFound";
import Auth from "@/app/layout /appAuth";
import Acount from "@/pages /public/acount";
import { AppPrivate } from "@/app/layout /appPrivate";
import { CheckoutPage } from "@/pages /private/checout";
import { ProfilePage } from "@/pages /private/profile";
import { Categories } from "@/pages /private/categories";

export const router = createBrowserRouter([
  { path: '/home',   
     Component: Home   
   },
   
  {
    path: "/",
    Component: Auth,
     children: [
      {   index: true, path: "/", Component: LoginPage,},
      {   path: "/acount", Component: Acount,}
     ],
   },

  {
    path: "/",
    Component: AppPrivate,
    children: [
     { 
        index: true, 
        path: "dashboard",
        Component: Dashboard,
      },
      { path: 'profile',   Component: ProfilePage},
      { path: 'clients',   Component: Clients   },
      {path :  'categories' , Component :  Categories},
      { path  : "/checkout/:id", Component :  CheckoutPage},
      { path: 'supplier',   Component: Supplier  },
      { path: 'products',   Component: Products  },
      { path: 'orders',   Component: Orders  },
      { path: 'stock',   Component: Stock  },
      { path: 'shopping',   Component: Shopping  },
     {
      path: "/*",
      Component: NotFound,
    }
    ],
  }
]);
