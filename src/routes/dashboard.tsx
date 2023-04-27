import MobileSidebar from "../components/mobileSidebar";
import DesktopSidebar from "../components/desktopSidebar";
import Layout from "../components/layout";
import { useContext, useEffect, useState } from "react";
import { LoadingContext, LoadingContextType } from "../contexts/LoadingContext";
import { SessionContext, SessionContextType } from "../contexts/SessionContext";
import { Retailer } from "../types/retailer";
import { useQuery } from "@tanstack/react-query";
import { Outlet, useLocation } from "react-router-dom";
import { getRetailers } from "../api/retailer";
import { toastError } from "../toasts";
import { navigation } from "../utils/navigation";
import LoadingProvider from "../providers/LoadingProvider";

interface DashboardProps {
  renderExceptions: string[];
}

const Dashboard = ({ renderExceptions }: DashboardProps): JSX.Element => {
  const location = useLocation();
  const { setIsLoading } = useContext<LoadingContextType>(LoadingContext);
  const { session, setActiveRetailer } =
    useContext<SessionContextType>(SessionContext);
  const [sortedRetailers, setSortedRetailers] = useState<Retailer[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const { active_retailer } = session;
  const { isLoading } = useQuery({
    queryKey: ["retailers"],
    queryFn: () =>
      getRetailers({
        jwt: session.token_info.token,
        storeIds: session.store_ids,
        retailerIds: session.retailer_ids,
      }),
    enabled: !!session.token_info.token,
    onError: (error) => {
      console.error(error);
      toastError("Problem loading retailers.");
    },
    onSuccess: (data) => {
      const sortedRetailers = data.data.retailers.sort(
        (a: Retailer, b: Retailer) => a.name.localeCompare(b.name)
      );
      setSortedRetailers(sortedRetailers);

      if (!active_retailer.id && !active_retailer.name) {
        setActiveRetailer(sortedRetailers[0]);
      }
    },
  });

  useEffect(() => {
    setIsLoading(isLoading);
  }, [isLoading]);

  if (renderExceptions.includes(location.pathname)) {
    return (
      <div className="h-auto">
        <Outlet />
      </div>
    );
  }

  return (
    <div className="h-full bg-gray-100">
      <MobileSidebar
        retailers={sortedRetailers}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        navigation={navigation}
      />
      {/* Static sidebar for desktop */}
      <DesktopSidebar retailers={sortedRetailers} navigation={navigation} />
      <div className="flex flex-1 flex-col lg:pl-64 h-auto">
        <Layout setSidebarOpen={setSidebarOpen} />
        <main className="h-auto">
          <div className="py-6 h-auto">
            <div className="max-w-7xl px-4 sm:px-6 lg:px-8 h-auto">
              <LoadingProvider noBlur={false}>
                <Outlet />
              </LoadingProvider>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
