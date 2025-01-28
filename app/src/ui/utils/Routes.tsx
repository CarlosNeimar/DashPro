import { createBrowserRouter } from "react-router-dom";
import { App } from "../App";
import { Load } from "../pages/Load";
import { Layout } from "../layout";

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
        path: "/loading",
        element: <Layout />,
      }
    ]
  }
])