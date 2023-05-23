import {roles} from "./roles.config";
import type {Role} from "./roles.config";
export interface PortalUser {
  id: number;
  first: string;
  last: string;
  email: string;
  role: string;
  stores: string[];
  features: string[];
  phonenumber: string;
  active: boolean;
  created: Date;
  updated: Date;
}

export const portalUsers: PortalUser[] = [
  {
    id: 1,
    first: "Justin",
    last: "Turner",
    email: "jturner@retailer.com",
    role: roles[9].name,
    stores: ["#328 Carmi Lanes",],
    features: ["Clerks", "Kiosks", "PLUs", "Stores"],
    phonenumber: "123-456-7890",
    active: true,
    created: new Date("2021-01-15"),
    updated: new Date("2023-02-16"),
  },
  {
    id: 2,
    first: "Clayton",
    last: "Kershaw",
    email: "kersh@retailer.com",
    role: roles[9].name,
    stores: [
      "#306 Leominister",
      "#323 Gardner Parkway",
      "#3723 Manresa",
      "#399 Arvin",
      "#365 Stockdale",
      "#328 Carmi Lanes",
    ],
    features: ["Loyalty", "Stores"],
    phonenumber: "123-456-7890",
    active: true,
    created: new Date("2022-08-02"),
    updated: new Date("2023-02-26"),
  },
  {
    id: 3,
    first: "Walker",
    last: "Buelher",
    email: "thewalker@retailer.com",
    role: roles[7].name,
    stores: ["#3723 Manresa"],
    features: ["Clerks", "Kiosks", "Payments", "PLUs", "Stores"],
    phonenumber: "123-456-7890",
    active: false,
    created: new Date("2022-12-15"),
    updated: new Date("2023-02-02"),
  },
  {
    id: 4,
    first: "File",
    last: "Admin",
    email: "skipadmin@retailer.com",
    role: roles[11].name,
    stores: ["#399 Arvin", "#365 Stockdale", "#328 Carmi Lanes"],
    features: ["Clerks", "Kiosks", "PLUs", "Stores"],
    phonenumber: "123-456-7890",
    active: true,
    created: new Date("2022-11-15"),
    updated: new Date("2023-04-01"),
  },
  {
    id: 5,
    first: "Mookie",
    last: "Betts",
    email: "mookie@retailer.com",
    role: roles[9].name,
    stores: [
      "#306 Leominister",
      "#3723 Manresa",
      "#399 Arvin",
      "#365 Stockdale",
    ],
    features: ["Promotions", "Portal Users", "Stores"],
    phonenumber: "123-456-7890",
    active: false,
    created: new Date("2023-03-15"),
    updated: new Date("2023-03-15"),
  },
  {
    id: 6,
    first: "Chris",
    last: "Taylor",
    email: "ct3@retailer.com",
    role: roles[9].name,
    stores: ["#306 Leominster"],
    features: ["Clerks", "Kiosks", "PLUs", "Stores"],
    phonenumber: "123-456-7890",
    active: false,
    created: new Date("2022-05-06"),
    updated: new Date("2023-01-04"),
  },
  {
    id: 7,
    first: "Dave",
    last: "Roberts",
    email: "dave.roberts@retailer.com",
    role: roles[7].name,
    stores: [
      "#306 Leominister",
      "#323 Gardner Parkway",
      "#3723 Manresa",
      "#399 Arvin",
      "#365 Stockdale",
      "#328 Carmi Lanes",
    ],
    features: ["Kiosks", "Loyalty", "Payments", "Promotions", "Stores"],
    phonenumber: "123-456-7890",
    active: true,
    created: new Date("2020-04-16"),
    updated: new Date("2023-03-16"),
  },
  {
    id: 8,
    first: "Corbin",
    last: "Burns",
    email: "burns@retailer.com",
    role: roles[9].name,
    stores: ["#306 Leominister"],
    features: ["Clerks", "Kiosks", "PLUs", "Stores"],
    phonenumber: "801-478-0646",
    active: true,
    created: new Date("2022-07-26"),
    updated: new Date("2023-02-22"),
  },
];
