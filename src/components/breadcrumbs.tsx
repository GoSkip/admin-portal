import { Link } from "react-router-dom";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
type BreadcrumbLink = {
  label: string;
  target: string;
};

type BreadcrumbsProps = {
  root: BreadcrumbLink;
  branches: BreadcrumbLink[];
  righthandComponent: JSX.Element;
};

const Breadcrumbs = ({
  root,
  branches,
  righthandComponent,
}: BreadcrumbsProps): JSX.Element => {
  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol role="list" className="flex items-center space-x-4 pb-6">
        <li>
          <div>
            <Link
              to={root.target}
              className="text-gray-400 hover:text-gray-500 text-xl"
            >
              {root.label}
            </Link>
          </div>
        </li>
        {branches.map((branch: BreadcrumbLink) => (
          <li>
            <div className="flex items-center">
              <ChevronRightIcon
                className="h-5 w-5 flex-shrink-0 text-gray-400"
                aria-hidden="true"
              />
              <Link to={branch.target} className="ml-4 text-xl">
                {branch.label}
              </Link>
            </div>
          </li>
        ))}
      </ol>
      {righthandComponent ? righthandComponent : null}
    </nav>
  );
};

export default Breadcrumbs;
