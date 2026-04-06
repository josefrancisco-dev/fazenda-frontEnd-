import { createBrowserRouter } from "react-router-dom";
import Home from "@/pages /webSite";
import LoginPage from "@/pages /login";
import { AppLayout } from "@/_layuout /idenx";
import { Dashboard } from "@/pages /manegment/dashboard";
import { Clients } from "@/pages /manegment/clients";
import { Supplier } from "@/pages /manegment/supplier";
import { Products } from "@/pages /manegment/products";
import { Orders } from "@/pages /manegment/orders";
import { Stock } from "@/pages /manegment/stock";
import { Shopping } from "@/pages /manegment/shopping";
import { NotFound } from "@/pages /notFound";
import Auth from "@/auth";
import Acount from "@/pages /acount";

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
    Component:AppLayout,
    children: [
     { 
        index: true, 
        path: "dashboard",
        Component: Dashboard,
      },
      { path: 'clients',   Component: Clients   },
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
