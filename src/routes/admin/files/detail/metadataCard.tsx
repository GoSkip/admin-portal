const MetadataCard = (): JSX.Element => {
  return (
    <div className="bg-white rounded-lg shadow px-4 pb-4 col-span-4 sm:col-span-1 mt-4 sm:mt-0 sm:ml-4">
      <h2 className="text-lg font-medium text-gray-500 py-5">Metadata</h2>
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-1">
          <div className="text-sm font-medium text-gray-500">File name</div>
          <p className="text-sm text-gray-400">--</p>
        </div>
        <div className="flex flex-col gap-1">
          <div className="text-sm font-medium text-gray-500">File ID</div>
          <p className="text-sm text-gray-400">--</p>
        </div>
        <div className="flex flex-col gap-1">
          <div className="text-sm font-medium text-gray-500">File size</div>
          <p className="text-sm text-gray-400">--</p>
        </div>
        <div className="flex flex-col gap-1">
          <div className="text-sm font-medium text-gray-500">Uploaded</div>
          <p className="text-sm text-gray-400">--</p>
        </div>
        <div className="flex flex-col gap-1">
          <div className="text-sm font-medium text-gray-500">Updated</div>
          <p className="text-sm text-gray-400">--</p>
        </div>
      </div>
    </div>
  );
};

export default MetadataCard;
