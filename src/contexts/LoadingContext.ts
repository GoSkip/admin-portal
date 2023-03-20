import { createContext } from "react";

export type LoadingContextType = {
  isLoading: boolean;
  setIsLoading: (state: boolean) => void;
};

export const LoadingContext = createContext<LoadingContextType>({
  isLoading: false,
  setIsLoading: () => {},
});
