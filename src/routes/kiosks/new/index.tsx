import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import {
  SessionContext,
  SessionContextType,
} from "../../../contexts/SessionContext";
import { Store, emptyStore } from "../../../types/store";
import Select from "../../../components/select";
import SecondaryButton from "../../../components/buttons/secondary";
import PrimaryButton from "../../../components/buttons/primary";
import { BeatLoader } from "react-spinners";

interface SelectStore {
  key: string;
  value: string;
}

const NewKiosk = (): JSX.Element => {
  const { session } = useContext<SessionContextType>(SessionContext);
  const navigate = useNavigate();
  const { selectable_stores } = session;

  const [store, setStore] = useState<Store>(emptyStore);

  const selectStore: SelectStore = {
    key: String(store.id),
    value: store.name,
  };

  const selectStores: SelectStore[] = selectable_stores.map(
    (sStore: Store) => ({
      key: String(sStore.id),
      value: sStore.name,
    })
  );

  const goToDetails = () => {
    navigate(`/kiosks/new/${store.id}`);
  };

  useEffect(() => {
    if (selectable_stores.length > 0) {
      setStore(selectable_stores[0]);
    }
  }, [selectable_stores]);

  const setSelectStore = (sStore: SelectStore) => {
    const newStore =
      selectable_stores.find((s) => String(s.id) === sStore.key) || store;
    setStore(newStore);
  };

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
            <div className="grid grid-cols-2 gap-x-6 gap-y-8 mb-4 sm:grid-cols-2">
              {!!store ? (
                <>
                  {!!store.address ? (
                    <>
                      <div className="col-span-1">
                        <Select
                          selectedItem={selectStore}
                          setSelectedItem={setSelectStore}
                          label="Store"
                          items={selectStores}
                        />
                      </div>
                      <div className="col-span-1">
                        <div className="text-gray-800 text-sm">Address</div>
                        <div className="text-sm text-gray-400">
                          {store.address}
                        </div>
                        <div className="text-sm text-gray-400">
                          {store.address2}
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="col-span-2">
                      <Select
                        selectedItem={selectStore}
                        setSelectedItem={setSelectStore}
                        label="Store"
                        items={selectStores}
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
              <SecondaryButton label="Cancel" additionalClasses="mr-2" />
              <PrimaryButton
                label="Create"
                disabled={!store.id}
                onClick={goToDetails}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewKiosk;
