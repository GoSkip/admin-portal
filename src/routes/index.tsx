import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "@routes/protectedRoute";
import Dashboard from "@routes/dashboard";
import Page404 from "@routes/404";
import Files from "@routes/admin/files";
import Taxes from "@routes/admin/taxes";
import Loyalty from "@routes/admin/loyalty";
import Payments from "@routes/admin/payments";
import Stores from "@routes/admin/stores";
import Retailer from "@routes/admin/retailer";
import Kiosks from "@routes/kiosks";
import KioskNew from "@routes/kiosks/new";
import KioskDetail from "@routes/kiosks/detail";
import TerminalNew from "@routes/terminals/new";
import TerminalNewSignup from "@routes/terminals/signup";
import Clerks from "@routes/people/clerks";
import PortalUsers from "@routes/people/portalUsers";
import PortalUserDetail from "@routes/people/portalUsers/detail";
import PortalUserNew from "@routes/people/portalUsers/new";
import Products from "@routes/products";
import Promotions from "@routes/promotions";
import Reports from "@routes/reports";
import Login from "@routes/login";
import Logout from "@routes/logout";
import FileDetails from "@routes/admin/files/detail";
import FileNew from "@routes/admin/files/new";
import { AccountSettingsPage } from "@routes/account-settings/index";
import { MyProfilePage } from "@routes/me/index";
import FileNewDetails from "@routes/admin/files/new/details";

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
            <Route path="files/new/:fileType" element={<FileNewDetails />} />
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
