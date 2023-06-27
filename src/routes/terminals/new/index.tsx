import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import {
  SessionContext,
  SessionContextType,
} from "../../../contexts/SessionContext";
import { Store } from "../../../types/store";
import Select, { Option } from "../../../components/inputs/select";
import SecondaryButton from "../../../components/buttons/secondary";
import PrimaryButton from "../../../components/buttons/primary";
import { BeatLoader } from "react-spinners";
import { useMutation } from "@tanstack/react-query";
import Breadcrumbs from "../../../components/breadcrumbs";
import {
  LoadingContext,
  LoadingContextType,
} from "../../../contexts/LoadingContext";
import {
  CreateTerminalSignupQueryParams,
  createTerminalSignup,
} from "../../../api/terminal";
import { toastError } from "../../../toasts";

type NewTerminalForm = {
  store: Option | null;
};

type CreateTerminalSignupMutationProps = {
  queryParams: CreateTerminalSignupQueryParams;
};

const NewTerminal = (): JSX.Element => {
  const { session } = useContext<SessionContextType>(SessionContext);
  const { setIsLoading } = useContext<LoadingContextType>(LoadingContext);
  const [formState, setFormState] = useState<NewTerminalForm>({
    store: null,
  });
  const { selectable_stores } = session;
  const navigate = useNavigate();

  const { isLoading, mutate } = useMutation({
    mutationFn: (props: CreateTerminalSignupMutationProps) =>
      createTerminalSignup(props.queryParams),
    onError: (error: any) => {
      console.error(error);
      toastError("Failed to create terminal.");
    },
    onSuccess: ({ data: { id } }: any) => {
      navigate(`/terminals/signup/${formState.store?.key}/${id}`);
    },
  });

  const onCreateTerminal = () => {
    const props: CreateTerminalSignupMutationProps = {
      queryParams: {
        jwt: session.token_info.token,
        storeId: Number(formState.store?.key),
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

      setFormState((prevState: NewTerminalForm) => ({ ...prevState, store }));
    }
  }, [selectable_stores]);

  const stores: Option[] = selectable_stores.map((store: Store) => ({
    key: String(store.id),
    value: store.name,
  }));

  const handleStoreChange = (option: Option | null) => {
    if (option) {
      setFormState((prevState: NewTerminalForm) => ({
        ...prevState,
        store: option,
      }));
    }
  };

  const ogStore = formState.store
    ? selectable_stores.find(
        (store: Store) => String(store.id) === formState.store?.key
      )
    : null;

  useEffect(() => {
    setIsLoading(isLoading);
  }, [isLoading]);

  return (
    <div className="w-full h-auto">
      <Breadcrumbs
        root={{ target: "/kiosks", label: "Kiosks" }}
        branches={[{ target: "#", label: "New Terminal" }]}
      />
      <div>
        <hr />
      </div>
      <div className="space-y-10 divide-y divide-gray-900/10 mt-8 mb-8 grid grid-cols-2 drop-shadow-sm">
        <form className="bg-white shadow-sm ring-1 ring-gray-900/5 rounded-xl sm:rounded-xl col-span-2 md:col-span-1">
          <div className="px-4 pt-2 text-xl font-normal">Select store</div>
          <div className="px-4 pb-2 text-sm text-gray-500">
            Terminals are assigned to a specific store
          </div>
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
                        <div className="text-sm text-gray-400">
                          {ogStore.address}
                        </div>
                        <div className="text-sm text-gray-400">
                          {ogStore.address2}
                        </div>
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
              <SecondaryButton
                label="Cancel"
                additionalClasses="mr-2"
                onClick={() => navigate("/kiosks")}
              />
              <PrimaryButton
                label="Create"
                disabled={!formState.store}
                onClick={onCreateTerminal}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewTerminal;
