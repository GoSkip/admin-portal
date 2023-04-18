import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./protectedRoute";
import Dashboard from "./dashboard";
import Page404 from "./404";
import Admin from "./admin";
import Kiosks from "./kiosks";
import KioskNew from "./kiosks/new";
import KioskSingle from "./kiosks/single";
import People from "./people";
import Products from "./products";
import Promotions from "./promotions";
import Reports from "./reports";
import Login from "./login";
import Logout from "./logout";

const Router = (): JSX.Element => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute routeExceptions={["/login", "/logout"]}>
              <Dashboard renderExceptions={["/login", "/logout"]} />
            </ProtectedRoute>
          }
          errorElement={<Page404 />}
        >
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/kiosks" element={<Kiosks />} />
          <Route path="/kiosks/new" element={<KioskNew />} />
          <Route path="/kiosks/:storeId/:kioskId" element={<KioskSingle />} />
          <Route path="/people" element={<People />} />
          <Route path="/products" element={<Products />} />
          <Route path="/promotions" element={<Promotions />} />
          <Route path="/reports" element={<Reports />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
