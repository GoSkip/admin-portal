import { Store } from "../../../../types/store";

type StoreDetailsCardProps = {
  store: Store | null;
};

const StoreDetailsCard = ({ store }: StoreDetailsCardProps): JSX.Element => {
  return (
    <div className="bg-white rounded-lg shadow px-4 pb-4 col-span-4 sm:col-span-1 mt-4 sm:mt-0 sm:ml-4">
      <h2 className="text-lg font-medium text-gray-900 py-5">Store details</h2>
      <div className="flex flex-col gap-5">
        {store ? (
          <>
            <div className="flex flex-col gap-1">
              <div className="text-sm font-medium text-gray-500">Name</div>
              <p className="text-sm text-gray-400">
                #{store.id} {store.name}
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <div className="text-sm font-medium text-gray-500">Address</div>
              <p className="text-sm text-gray-400">{store.address || "--"}</p>
              {store.address2 && (
                <p className="text-sm text-gray-400">{store.address2}</p>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <div className="text-sm font-medium text-gray-500">
                POS Site ID
              </div>
              <p className="text-sm text-gray-400">{store.posSiteId || "--"}</p>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default StoreDetailsCard;
