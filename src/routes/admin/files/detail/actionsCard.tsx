import { Fragment } from "react";

export type TaxStrategyType = {
  id: string | number;
  value: string | number;
};

type ActionsCardType = {
  taxStrategies: TaxStrategyType[];
};

const ActionsCard = ({ taxStrategies }: ActionsCardType): JSX.Element => {
  return (
    <div className="space-y-10 divide-y divide-gray-900/10 mt-4 mb-4 col-span-4 sm:col-span-3">
      <div className="grid grid-cols-4">
        <div className="text-gray-500 text-xs font-medium bg-white overflow-hidden shadow ring-1 ring-gray-900/5 rounded-xl col-span-4 sm:col-span-2 sm:rounded-xl grid grid-cols-4">
          <div className="col-span-2 text-left bg-gray-50 rounded-tl-xl pl-6 py-3">
            TAX STRATEGY ID
          </div>
          <div className="col-span-2 text-left bg-gray-50 pl-6 py-3">ITEMS</div>
          <div className="col-span-4">
            <hr />
          </div>
          {taxStrategies.length > 0 ? (
            <>
              {taxStrategies.map((taxStrategy: TaxStrategyType) => (
                <Fragment key={taxStrategy.id}>
                  <div className="col-span-2 bg-white border border-gray-50 py-3 pl-6 flex justify-start items-center rounded-bl-xl leading-5">
                    <span className="text-success text-sm font-bold">
                      {taxStrategy.id}
                    </span>
                  </div>
                  <div className="col-span-2 bg-white border border-gray-50 flex justify-start items-center pl-6 py-3">
                    <span className="text-success text-sm">
                      {taxStrategy.value}
                    </span>
                  </div>
                </Fragment>
              ))}
            </>
          ) : (
            <p className="text-center col-span-4 mt-4 mb-4 font-semibold">
              No data found for this file.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ActionsCard;
