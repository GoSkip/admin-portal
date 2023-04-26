import { Store } from "../../../types/store";

type StoreDetailsCardProps = {
  store: Store | null;
};

const StoreDetailsCard = ({ store }: StoreDetailsCardProps): JSX.Element => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 col-span-4 sm:col-span-1 mt-4 sm:mt-0 sm:ml-4">
      <h2 className="text-xl font-medium text-gray-900">Store details</h2>
      {store ? (
        <>
          <div className="mt-4 text-md text-gray-500">Name</div>
          <p className="mt-1 text-gray-400">{store.name}</p>
          {store.posSiteId ? (
            <>
              <div className="mt-4 text-md text-gray-500">POS Site Id</div>
              <p className="mt-1 text-gray-400">{store.posSiteId}</p>
            </>
          ) : null}
          {store.address ? (
            <>
              <div className="mt-4 text-md text-gray-500">Address</div>
              <p className="mt-1 text-gray-400">{store.address}</p>
              {store.address2 ? (
                <p className="text-gray-400">{store.address2}</p>
              ) : null}
            </>
          ) : null}
          {store.phone ? (
            <>
              <div className="mt-4 text-md text-gray-500">Phone</div>
              <p className="mt-1 text-gray-400">{store.phone}</p>
            </>
          ) : null}
          {store.dayClose ? (
            <>
              <div className="mt-4 text-md text-gray-500">Day close</div>
              <p className="mt-1 text-gray-400">{store.dayClose}</p>
            </>
          ) : null}
          <div className="mt-4 text-md text-gray-500">Timezone</div>
          <p className="mt-1 text-gray-400">
            {store.timezone.replace("_", " ")}
          </p>
        </>
      ) : null}
    </div>
  );
};

export default StoreDetailsCard;
