import { Fragment } from "react";
import classNames from "classnames";
import { Action } from "../../../types/kiosk";

const actorColors = new Map([
  ["device", "green"],
  ["admin", "gray"],
  ["admin portal", "gray"],
  ["kiosk app", "gray"],
  ["error", "red"],
]);

const sampleActions: Action[] = [
  {
    actor: "device",
    type: "restarted",
    timestamp: new Date(),
    metadata: "N/A",
  },
  {
    actor: "admin portal",
    type: "request restart",
    timestamp: new Date(),
    metadata: "N/A",
  },
  {
    actor: "device",
    type: "restarted",
    timestamp: new Date(),
    metadata: "N/A",
  },
  {
    actor: "kiosk app",
    type: "request restart",
    timestamp: new Date(),
    metadata: "N/A",
  },
  {
    actor: "device",
    type: "updated app",
    timestamp: new Date(),
    metadata: '{"name": "self-checkout"}',
  },
  {
    actor: "device",
    type: "installed profile",
    timestamp: new Date(),
    metadata: '{"profile_name":"Home screen..."}',
  },
  {
    actor: "device",
    type: "installed profile",
    timestamp: new Date(),
    metadata: '{"profile_name":"Home screen..."}',
  },
  {
    actor: "device",
    type: "removed profile",
    timestamp: new Date(),
    metadata: '{"profile_name":"App Lock: SCO..."}',
  },
  {
    actor: "error",
    type: "removed profile",
    timestamp: new Date(),
    metadata: '{"errors":["Device responded..."]}',
  },
];

const ActionsCard = (): JSX.Element => {
  return (
    <div className="space-y-10 divide-y divide-gray-900/10 mt-4 col-span-4">
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
        {sampleActions.map((action: Action) => (
          <Fragment key={action.timestamp.toString()}>
            <div className="col-span-1 bg-white border border-gray-50 py-3 pl-6 flex justify-start items-center">
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
              <div className="pl-3 capitalize font-medium">{action.type}</div>
            </div>
            <div className="col-span-1 bg-white border border-gray-50 flex justify-start items-center py-3">
              <div className="pl-3">{action.timestamp.toLocaleString()}</div>
            </div>
            <div className="col-span-1 bg-white border border-gray-50 flex justify-start items-center py-3">
              <div className="pl-3">{action.metadata}</div>
            </div>
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default ActionsCard;
