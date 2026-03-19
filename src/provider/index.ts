import { createBrowserRouter } from "react-router-dom";
import { AppLayout } from "../_layuout /idenx";
import { Dashboard } from "../pages /dashboard";
import { NotFound } from "../pages /notFound";

export const router = createBrowserRouter([
//   {
//     path: "/login",
//     Component:SingIn,
//     children: [],
//   },

  {
    path: "/",
    Component:AppLayout,
    children: [
     { 
        index: true, 
        path: "dashboard",
        Component: Dashboard,
      },
    //   { path: 'products',   Component: Produtos   },
    //   { path: 'orders',    Component: Pedidos    },
    //   { path: 'shopping',    Component: Compras    },
    //   { path: 'clients',   Component: Clientes   },
    //   { path: '*',          Component: NotFound   },
    {
          path: "/*",
          Component: NotFound,
        }
    ],
  }
  ,
//   {
//     path: "/home",
//     Component: CondominoElegance,
//   },
]);
