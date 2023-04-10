import React from "react";
import ReactDOM from "react-dom/client";
import { ToastContainer } from "react-toastify";
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Admin from "./routes/admin";
import Kiosks from "./routes/kiosks";
import NewKiosk from "./routes/kiosks/new";
import KioskSingle from "./routes/kiosks/single";
import People from "./routes/people";
import Products from "./routes/products";
import Promotions from "./routes/promotions";
import Reports from "./routes/reports";
import Root from "./routes/root";
import Page404 from "./routes/404";
import Login from "./routes/login";
import Logout from "./routes/logout";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";

const queryClient = new QueryClient();
const router = createBrowserRouter(
  createRoutesFromElements([
    <Route path="/" element={<Root />} errorElement={<Page404 />}>
      <Route path="/admin" element={<Admin />} />
      <Route path="/kiosks" element={<Kiosks />} />
      <Route path="/kiosks/new" element={<NewKiosk />} />
      <Route path="/kiosks/:storeId/:kioskId" element={<KioskSingle />} />
      <Route path="/people" element={<People />} />
      <Route path="/products" element={<Products />} />
      <Route path="/promotions" element={<Promotions />} />
      <Route path="/reports" element={<Reports />} />
    </Route>,
    <Route path="/login" element={<Login />} />,
    <Route path="/logout" element={<Logout />} />,
  ])
);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </QueryClientProvider>
  </React.StrictMode>
);
