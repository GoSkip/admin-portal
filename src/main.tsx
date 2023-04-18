import React from "react";
import ReactDOM from "react-dom/client";
import { ToastContainer } from "react-toastify";
import Router from "./routes";
import SessionProvider from "./providers/SessionProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <Router />
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
    </SessionProvider>
  </React.StrictMode>
);
