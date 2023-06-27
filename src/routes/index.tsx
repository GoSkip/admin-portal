import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./protectedRoute";
import Dashboard from "./dashboard";
import Page404 from "./404";
import Files from "./admin/files";
import Taxes from "./admin/taxes";
import Loyalty from "./admin/loyalty";
import Payments from "./admin/payments";
import Stores from "./admin/stores";
import Retailer from "./admin/retailer";
import Kiosks from "./kiosks";
import KioskNew from "./kiosks/new";
import KioskDetail from "./kiosks/detail";
import TerminalNew from "./terminals/new";
import TerminalNewSignup from "./terminals/signup";
import Clerks from "./people/clerks";
import PortalUsers from "./people/portalUsers";
import PortalUserDetail from "./people/portalUsers/detail";
import PortalUserNew from "./people/portalUsers/new";
import Products from "./products";
import Promotions from "./promotions";
import Reports from "./reports";
import Login from "./login";
import Logout from "./logout";
import FileDetails from "./admin/files/detail";
import FileNew from "./admin/files/new";
import { AccountSettingsPage } from "./account-settings/index";
import { MyProfilePage } from "./me/index";

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
          <Route path="/admin">
            <Route path="files" element={<Files />} />
            <Route path="files/:storeId/:fileId" element={<FileDetails />} />
            <Route path="files/new" element={<FileNew />} />
            <Route path="taxes" element={<Taxes />} />
            <Route path="loyalty" element={<Loyalty />} />
            <Route path="payments" element={<Payments />} />
            <Route path="stores" element={<Stores />} />
            <Route path="retailer" element={<Retailer />} />
          </Route>
          <Route path="/kiosks" element={<Kiosks />} />
          <Route path="/kiosks/new" element={<KioskNew />} />
          <Route path="/kiosks/:storeId/:kioskId" element={<KioskDetail />} />
          <Route path="/terminals/signup" element={<TerminalNew />} />
          <Route path="/terminals/signup/:storeId/:terminalSignupId" element={<TerminalNewSignup />} />
          <Route path="/people">
            <Route path="clerks" element={<Clerks />} />
            <Route path="portal-users" element={<PortalUsers />} />
            <Route path="portal-users/:userId" element={<PortalUserDetail />} />
            <Route path="portal-users/new" element={<PortalUserNew />} />
          </Route>
          <Route path="/products" element={<Products />} />
          <Route path="/promotions" element={<Promotions />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/me" element={<MyProfilePage />} />
          <Route path="/account-settings" element={<AccountSettingsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
