import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import {
  SessionContext,
  SessionContextType,
} from "../../contexts/SessionContext";
import {
  LoadingContext,
  LoadingContextType,
} from "../../contexts/LoadingContext";
import { Store } from "../../types/store";
import Select from "../../components/select";
import SecondaryButton from "../../components/buttons/secondary";
import { BeatLoader } from "react-spinners";

type SelectableStore = {
  key: string;
  value: string;
};

const NewKiosk = (): JSX.Element => {
  const { session } = useContext<SessionContextType>(SessionContext);
  const { setIsLoading } = useContext<LoadingContextType>(LoadingContext);
  const {
    active_retailer: { id: activeRetailerId },
    selectable_stores,
    token_info: { token },
  } = session;

  const [selectedStore, setSelectedStore] = useState<SelectableStore | null>(
    null
  );

  useEffect(() => {
    if (selectable_stores.length > 0) {
      const store: SelectableStore = {
        key: String(selectable_stores[0].id),
        value: selectable_stores[0].name,
      };

      setSelectedStore(store);
    }
  }, [selectable_stores]);

  const stores: SelectableStore[] = selectable_stores.map((store: Store) => ({
    key: String(store.id),
    value: store.name,
  }));

  return (
    <div className="w-full h-full">
      <nav className="flex" aria-label="Breadcrumb">
        <ol role="list" className="flex items-center space-x-4 pb-6">
          <li>
            <div>
              <Link
                to="/kiosks"
                className="text-gray-400 hover:text-gray-500 text-xl"
              >
                Kiosks
              </Link>
            </div>
          </li>
          <li>
            <div className="flex items-center">
              <ChevronRightIcon
                className="h-5 w-5 flex-shrink-0 text-gray-400"
                aria-hidden="true"
              />
              <Link to="#" className="ml-4 text-xl">
                New Kiosk
              </Link>
            </div>
          </li>
        </ol>
      </nav>
      <div>
        <hr />
      </div>
      <div className="space-y-10 divide-y divide-gray-900/10 mt-8 grid grid-cols-2">
        <form className="bg-white shadow-sm ring-1 ring-gray-900/5 rounded-xl sm:rounded-xl col-span-2 md:col-span-1">
          <div className="px-4 pt-2 text-xl font-normal">Select store</div>
          <div className="px-4 pb-2 text-sm text-gray-500">
            Kiosks are assigned to a specific store
          </div>
          <div className="px-4 py-6">
            <div className="grid grid-cols-1 gap-x-6 gap-y-8 mb-4 sm:grid-cols-1">
              {!!selectedStore ? (
                <Select
                  selectedItem={selectedStore}
                  setSelectedItem={setSelectedStore}
                  label="Store"
                  items={stores}
                />
              ) : (
                <BeatLoader size={15} margin={2} />
              )}
            </div>
            <hr />
            <div className="flex justify-end mt-4">
              <SecondaryButton label="Cancel" additionalClasses="mr-2" />
              <SecondaryButton label="Create" disabled />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewKiosk;
