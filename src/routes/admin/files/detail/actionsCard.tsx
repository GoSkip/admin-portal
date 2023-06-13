import { Fragment } from "react";
import classNames from "classnames";
import { Action } from "../../../../types/kiosk";

type ActionsCardProps = {
  actions: Action[];
};

const actorColors = new Map([
  ["device", "green"],
  ["admin ui", "gray"],
  ["api", "gray"],
  ["error", "red"],
]);

const ActionsCard = ({ actions }: ActionsCardProps): JSX.Element => {
  return (
    <div className="space-y-10 divide-y divide-gray-900/10 mt-4 mb-4 col-span-4 sm:col-span-3">
      <div className="text-gray-600 bg-white shadow-sm ring-1 ring-gray-900/5 rounded-xl sm:rounded-xl grid grid-cols-4">
        <div className="col-span-1 text-left bg-gray-100 rounded-tl-xl pl-6 py-2">
          ACTOR
        </div>
        <div className="col-span-1 text-left bg-gray-100 pl-3 py-2">
          ACTION TYPE
        </div>
        <div className="col-span-1 text-left bg-gray-100 pl-3 py-2">
          TIMESTAMP
        </div>
        <div className="col-span-1 text-left bg-gray-100 rounded-tr-xl pl-3 py-2">
          METADATA
        </div>
        {actions.length > 0 ? (
          <>
            {actions
              .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
              .map((action: Action) => (
                <Fragment key={action.timestamp.toString()}>
                  <div className="col-span-1 bg-white border border-gray-50 py-3 pl-6 flex justify-start items-center rounded-bl-xl">
                    <button
                      type="button"
                      className={classNames(
                        `bg-${actorColors.get(action.actor)}-100
              text-${actorColors.get(action.actor)}-400`,
                        "rounded-full px-2.5 py-1 text-xs font-semibold shadow-sm capitalize"
                      )}
                    >
                      {action.actor}
                    </button>
                  </div>
                  <div className="col-span-1 bg-white border border-gray-50 flex justify-start items-center py-3">
                    <div className="pl-3 capitalize font-medium">
                      {action.type}
                    </div>
                  </div>
                  <div className="col-span-1 bg-white border border-gray-50 flex justify-start items-center py-3">
                    <div className="pl-3">
                      {action.timestamp.toLocaleString()}
                    </div>
                  </div>
                  <div className="col-span-1 bg-white border border-gray-50 flex justify-start items-center py-3 rounded-br-xl">
                    <div className="pl-3">{action.metadata}</div>
                  </div>
                </Fragment>
              ))}
          </>
        ) : (
          <p className="text-center col-span-4 mt-4 mb-4 font-semibold">
            No actions found for this iPad.
          </p>
        )}
      </div>
    </div>
  );
};

export default ActionsCard;
