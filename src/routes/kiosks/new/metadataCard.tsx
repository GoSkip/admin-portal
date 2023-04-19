const MetadataCard = (): JSX.Element => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 col-span-1 m-none ml-4">
      <h2 className="text-xl font-medium text-gray-900">Metadata</h2>
      <div className="mt-4 text-md text-gray-500">Created</div>
      <p className="mt-1 text-gray-400">April 6, 2023</p>
      <div className="mt-4 text-md text-gray-500">Updated</div>
      <p className="mt-1 text-gray-400">April 6, 2023</p>
    </div>
  );
};

export default MetadataCard;
