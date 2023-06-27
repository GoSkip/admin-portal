import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import { SessionContext, SessionContextType } from "../../../contexts/SessionContext";
import { Store } from "../../../types/store";
import Select, { Option } from "../../../components/inputs/select";
import SecondaryButton from "../../../components/buttons/secondary";
import PrimaryButton from "../../../components/buttons/primary";
import { BeatLoader } from "react-spinners";
import { useMutation } from "@tanstack/react-query";
import Breadcrumbs from "../../../components/breadcrumbs";
import { LoadingContext, LoadingContextType } from "../../../contexts/LoadingContext";
import { CreateKioskPayloadParams, CreateKioskQueryParams, createKiosk } from "../../../api/kiosk";
import { toastError } from "../../../toasts";

type NewKioskForm = {
  store: Option | null;
};

type CreateKioskMutationProps = {
  queryParams: CreateKioskQueryParams;
  payloadParams: CreateKioskPayloadParams;
};

const NewKiosk = (): JSX.Element => {
  const { session } = useContext<SessionContextType>(SessionContext);
  const { setIsLoading } = useContext<LoadingContextType>(LoadingContext);
  const [formState, setFormState] = useState<NewKioskForm>({
    store: null,
  });
  const { selectable_stores } = session;
  const navigate = useNavigate();

  const { isLoading, mutate } = useMutation({
    mutationFn: (props: CreateKioskMutationProps) => createKiosk(props.queryParams, props.payloadParams),
    onError: (error: any) => {
      console.error(error);
      toastError("Failed to create kiosk.");
    },
    onSuccess: (data: any) => {
      const {
        data: { id },
      } = data;

      if (formState.store?.key) {
        navigate(`/kiosks/${formState.store.key}/${id}`);
      }
    },
  });

  const onCreateKiosk = () => {
    const props: CreateKioskMutationProps = {
      queryParams: {
        jwt: session.token_info.token,
        storeId: Number(formState.store?.key),
      },
      payloadParams: {
        kiosk_number: 1,
      },
    };

    mutate(props);
  };

  useEffect(() => {
    if (selectable_stores.length > 0) {
      const store: Option = {
        key: String(selectable_stores[0].id),
        value: selectable_stores[0].name,
      };

      setFormState({ store });
    }
  }, [selectable_stores]);

  const stores: Option[] = selectable_stores.map((store: Store) => ({
    key: String(store.id),
    value: store.name,
  }));

  const handleStoreChange = (option: Option | null) => {
    if (option) {
      setFormState({ store: option });
    }
  };

  const ogStore = formState.store
    ? selectable_stores.find((store: Store) => String(store.id) === formState.store?.key)
    : null;

  useEffect(() => {
    setIsLoading(isLoading);
  }, [isLoading]);

  return (
    <div className="w-full h-auto">
      <Breadcrumbs root={{ target: "/kiosks", label: "Kiosks" }} branches={[{ target: "#", label: "New Kiosk" }]} />
      <div>
        <hr />
      </div>
      <div className="space-y-10 divide-y divide-gray-900/10 mt-8 mb-8 grid grid-cols-2 drop-shadow-sm">
        <form className="bg-white shadow-sm ring-1 ring-gray-900/5 rounded-xl sm:rounded-xl col-span-2 md:col-span-1">
          <div className="px-4 pt-2 text-xl font-normal">Select store</div>
          <div className="px-4 pb-2 text-sm text-gray-500">Kiosks are assigned to a specific store</div>
          <div className="px-4 py-6">
            <div className="grid grid-cols-2 gap-x-6 gap-y-8 mb-4 sm:grid-cols-2">
              {!!formState.store ? (
                <>
                  {!!ogStore?.address ? (
                    <>
                      <div className="col-span-1">
                        <Select
                          selectedItem={formState.store}
                          setSelectedItem={handleStoreChange}
                          label="Store"
                          items={stores}
                        />
                      </div>
                      <div className="col-span-1">
                        <div className="text-gray-800 text-sm">Address</div>
                        <div className="text-sm text-gray-400">{ogStore.address}</div>
                        <div className="text-sm text-gray-400">{ogStore.address2}</div>
                      </div>
                    </>
                  ) : (
                    <div className="col-span-2">
                      <Select
                        selectedItem={formState.store}
                        setSelectedItem={handleStoreChange}
                        label="Store"
                        items={stores}
                      />
                    </div>
                  )}
                </>
              ) : (
                <BeatLoader size={16} margin={2} />
              )}
            </div>
            <hr />
            <div className="flex justify-end mt-4">
              <SecondaryButton label="Cancel" additionalClasses="mr-2" onClick={() => navigate("/kiosks")} />
              <PrimaryButton label="Create" disabled={!formState.store} onClick={onCreateKiosk} />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewKiosk;
