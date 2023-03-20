import { useState } from "react";
import { LoadingContext } from "../contexts/LoadingContext";
import { Transition } from "@headlessui/react";
import { ClipLoader } from "react-spinners";
import classNames from "classnames";

type LoadingContextProps = {
  children: any;
};

const LoadingProvider = ({ children }: LoadingContextProps): JSX.Element => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      <Transition
        show={isLoading}
        enter="transition-opacity duration-75"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-500"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="fixed h-full w-full flex items-center justify-center bg-opacity-50 bg-gray-50">
          <div className="z-10">
            <ClipLoader size={100} color={"#36d7b7"} />
          </div>
        </div>
      </Transition>
      <div
        className={classNames(
          isLoading ? "blur-sm" : "",
          "transition ease-in-out delay-150 duration-500 h-full"
        )}
      >
        {children}
      </div>
    </LoadingContext.Provider>
  );
};

export default LoadingProvider;
