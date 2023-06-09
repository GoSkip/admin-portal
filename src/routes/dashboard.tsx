import { useContext, useEffect, useState } from "react";
import { LoadingContext, LoadingContextType } from "@contexts/LoadingContext";
import { SessionContext, SessionContextType } from "@contexts/SessionContext";
import { Retailer } from "@itypes/retailer";
import { useQuery } from "@tanstack/react-query";
import { Outlet, useLocation } from "react-router-dom";
import { getRetailers } from "@api/retailer";
import { toastError } from "@/toasts";
import NavBar from "@components/navBar";
import Sidebar from "@components/sideBar";
import LoadingProvider from "@providers/LoadingProvider";

interface DashboardProps {
  renderExceptions: string[];
}

const Dashboard = ({ renderExceptions }: DashboardProps): JSX.Element => {
  const location = useLocation();
  const { setIsLoading } = useContext<LoadingContextType>(LoadingContext);
  const { session, setActiveRetailer } = useContext<SessionContextType>(SessionContext);
  const [sortedRetailers, setSortedRetailers] = useState<Retailer[]>([]);
  const { active_retailer } = session;
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { isLoading } = useQuery({
    queryKey: ["retailers"],
    queryFn: () =>
      getRetailers({
        jwt: session.token_info.token,
        storeIds: session.store_ids,
        retailerIds: session.retailer_ids,
      }),
    enabled: !!session.token_info.token,
    onError: error => {
      console.error(error);
      toastError("Problem loading retailers.");
    },
    onSuccess: data => {
      const sortedRetailers = data.data.retailers.sort((a: Retailer, b: Retailer) => a.name.localeCompare(b.name));
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
      <div>
        <Outlet />
      </div>
    );
  }

  return (
    <>
      <div>
        <Sidebar retailers={sortedRetailers} open={sidebarOpen} setOpen={setSidebarOpen} />
        <div className="lg:pl-72">
          <NavBar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <main className="pt-6 pb-10">
            <div className="px-4 sm:px-6 lg:px-8">
              <LoadingProvider noBlur={false}>
                <Outlet />
              </LoadingProvider>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
