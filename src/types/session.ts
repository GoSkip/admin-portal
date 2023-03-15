import { Retailer } from "./retailer";

export type Env = {
  apiDomain: string;
  assimilatorDomain: string;
  loginDomain: string;
  onboardingDomain: string;
};

export type Session = {
  env: Env;
  userName: string;
  email: string;
  jwt: string;
  loggedIn: boolean;
  retailers: Retailer[];
};
