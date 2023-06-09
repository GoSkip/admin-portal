import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  SessionContext,
  SessionContextType,
} from "../../contexts/SessionContext";
import {
  LoadingContext,
  LoadingContextType,
} from "../../contexts/LoadingContext";
import { useQuery } from "@tanstack/react-query";
import { fetchTerminalSignup } from "../../api/terminal";
import { toastError, toastSuccess } from "../../toasts";
import { fetchStores } from "../../api/store";
import { Store } from "../../types/store";
import { Retailer } from "../../types/retailer";

const Signup = (): JSX.Element => {
  const { storeId, terminalSignupId } = useParams();
  const { session } = useContext<SessionContextType>(SessionContext);
  const { setIsLoading } = useContext<LoadingContextType>(LoadingContext);
  const [store, setStore] = useState<Store | null>(null);
  const {
    active_retailer,
    token_info: { token },
  } = session;

  const { isFetching: storeIsFetching } = useQuery(
    ["store", storeId],
    () =>
      fetchStores({
        jwt: token,
        storeIds: [Number(storeId)],
      }),
    {
      enabled: !!storeId && !!terminalSignupId && !!token,
      refetchOnWindowFocus: false,
      onError: (error) => {
        console.error(error);
        toastError(`Problem loading store: ${storeId}`);
      },
      onSuccess: (data) => {
        let store = data.data.retailers
          .find((retailer: Retailer) => retailer.id === active_retailer.id)
          .stores.find((store: Store) => store.id === Number(storeId));

        store.dayClose = store.day_close;
        delete store.day_close;

        setStore(store);
      },
    }
  );

  const { isFetching: terminalSignupIsFetching } = useQuery(
    ["terminalSignup", storeId, terminalSignupId],
    () =>
      fetchTerminalSignup({
        jwt: token,
        storeId,
        terminalSignupId,
      }),
    {
      enabled: !!storeId && !!terminalSignupId && !!token,
      refetchOnWindowFocus: false,
      onError: (error) => {
        console.error(error);
        toastError(`Problem loading terminal signup: ${terminalSignupId}`);
      },
      onSuccess: ({ data: { id, qr_svg } }) => {
        console.log("--- data ---", id, qr_svg);
      },
    }
  );

  const isLoading = storeIsFetching || terminalSignupIsFetching;

  useEffect(() => {
    if (isLoading) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [isLoading]);

  return <div>HOLA</div>;
};

export default Signup;
