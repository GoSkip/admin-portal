import Layout from "../components/layout";
import MobileSidebar from "../components/mobileSidebar";
import DesktopSidebar from "../components/desktopSidebar";
import SessionProvider from "../providers/SessionProvider";
import GlobalStateProvider from "../providers/GlobalStateProvider";
import { navigation } from "../utils/navigation";
import { SessionContext } from "../contexts/SessionContext";
import { LoadingContext, LoadingContextType } from "../contexts/LoadingContext";
import { useQuery } from "@tanstack/react-query";
import { getRetailers } from "../api/retailer";
import { Retailer } from "../types/retailer";
import { toastError } from "../toasts";
import { useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import LoadingProvider from "../providers/LoadingProvider";

const Root = (): JSX.Element => {
  const { setIsLoading } = useContext<LoadingContextType>(LoadingContext);
  const { session, setActiveRetailer } = useContext(SessionContext);
  const [sortedRetailers, setSortedRetailers] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { active_retailer } = session;
  console.log(session);
  const { isLoading } = useQuery({
    queryKey: ["retailers"],
    queryFn: () => {
      console.log("taco bell")
      getRetailers({
        jwt: session.token_info.token,
        storeIds: session.store_ids,
        retailerIds: session.retailer_ids,
      });
    },
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
  
  console.log("--- sorted retailers ---", sortedRetailers)

  return (
    <SessionProvider renderException={false}>
      <GlobalStateProvider>
        <div className="h-full">
          <MobileSidebar
            retailers={sortedRetailers}
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
            navigation={navigation}
          />
          {/* Static sidebar for desktop */}
          <DesktopSidebar retailers={sortedRetailers} navigation={navigation} />
          <div className="flex flex-1 flex-col lg:pl-64 h-full">
            <Layout setSidebarOpen={setSidebarOpen} />
            <main className="h-full">
              <div className="py-6 h-full">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-full">
                  <LoadingProvider noBlur={false}>
                    <Outlet />
                  </LoadingProvider>
                </div>
              </div>
            </main>
          </div>
        </div>
      </GlobalStateProvider>
    </SessionProvider>
  );
};

export default Root;
