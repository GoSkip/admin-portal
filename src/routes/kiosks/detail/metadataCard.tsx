import { format, isValid } from "date-fns";
import { KioskMetadata } from ".";

type MetadataCardProps = {
  kioskMetadata: KioskMetadata;
};

const MetadataCard = ({ kioskMetadata }: MetadataCardProps): JSX.Element => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 col-span-4 sm:col-span-1 mt-4 sm:mt-0 sm:ml-4">
      <h2 className="text-xl font-medium text-gray-900">Metadata</h2>
      {kioskMetadata.insertedAt !== null && isValid(kioskMetadata.insertedAt) ? (
        <>
          <div className="mt-4 text-md text-gray-500">Created</div>
          <p className="mt-1 text-gray-400">{format(kioskMetadata.insertedAt, "LLLL d, y")}</p>
        </>
      ) : null}
      {kioskMetadata.updatedAt !== null && isValid(kioskMetadata.updatedAt) ? (
        <>
          <div className="mt-4 text-md text-gray-500">Updated</div>
          <p className="mt-1 text-gray-400">{format(kioskMetadata.updatedAt, "LLLL d, y")}</p>
        </>
      ) : null}
    </div>
  );
};

export default MetadataCard;
