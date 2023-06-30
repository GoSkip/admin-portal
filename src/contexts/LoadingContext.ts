import { createContext } from "react";

export type LoadingContextType = {
  isLoading: boolean;
};

export const LoadingContext = createContext<LoadingContextType>({
  isLoading: false,
});
