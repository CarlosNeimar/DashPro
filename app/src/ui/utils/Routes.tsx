import { createBrowserRouter } from "react-router-dom";
import { App } from "../App";
import { Load } from "../pages/Load";
import { Layout } from "../layout";
import { Newclass } from "../pages/Newclass";
import { Home } from '../pages/Home'; // Importe o componente Home

export const Routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Load />
      },
      {
        path: "/home",
        element: <Layout />,
        children: [
          {
            path: "",
            element: <Home />
          },
          {
            path: "newclass",
            element: <Newclass />
          }
        ]
      },
    ]
  }
]);