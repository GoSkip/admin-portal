const StoreDetailsCard = (): JSX.Element => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 col-span-1 m-none ml-4">
      <h2 className="text-xl font-medium text-gray-900">Store details</h2>
      <div className="mt-4 text-md text-gray-500">Name</div>
      <p className="mt-1 text-gray-400">#306 Leominster</p>
      <div className="mt-4 text-md text-gray-500">POS Site ID</div>
      <p className="mt-1 text-gray-400">600</p>
      <div className="mt-4 text-md text-gray-500">Address</div>
      <p className="mt-1 text-gray-400">280 New Lancaster Rd</p>
      <p className="text-gray-400">Leominster, MA 01453</p>
      <div className="mt-4 text-md text-gray-500">Phone</div>
      <p className="mt-1 text-gray-400">978-466-3945</p>
      <div className="mt-4 text-md text-gray-500">Timezone</div>
      <p className="mt-1 text-gray-400">GMT-0500 Eastern</p>
    </div>
  );
};

export default StoreDetailsCard;
