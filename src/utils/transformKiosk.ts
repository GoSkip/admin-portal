import { Kiosk } from "@itypes/kiosk";

const transformKiosk = (kiosk: any): Kiosk => {
  let result: Kiosk = {
    id: Number(kiosk.id),
    inserted_at: new Date(kiosk.inserted_at),
    kiosk_number: Number(kiosk.kiosk_number),
    kiosk_descriptor: kiosk.kiosk_descriptor,
    terminal_id: kiosk.terminal_id,
    mount: kiosk.mount,
    network: kiosk.network,
    pinpad: kiosk.pinpad,
    printer: kiosk.printer,
    ipad_serial: kiosk.ipad_serial,
    pinpad_serial: kiosk.pinpad_serial,
    printer_serial: kiosk.printer_serial,
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
