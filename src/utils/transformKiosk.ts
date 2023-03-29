import { Kiosk } from "../types/kiosk";

const transformKiosk = (kiosk: any): Kiosk => {
  let result: Kiosk = {
    id: Number(kiosk.id),
    inserted_at: new Date(kiosk.inserted_at),
    kiosk_number: Number(kiosk.kiosk_number),
    kiosk_descriptor: kiosk.kiosk_descriptor,
  };
  
  if (kiosk.store) {
    result.store = kiosk.store;
  }

  if (kiosk.last_txn) {
    result.last_txn = new Date(kiosk.last_txn);
  }

  return result;
};

export default transformKiosk;
