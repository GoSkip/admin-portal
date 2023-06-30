import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { SessionContext, SessionContextType } from "@contexts/SessionContext";
import { LoadingContext, LoadingContextType } from "@contexts/LoadingContext";
import { useQuery } from "@tanstack/react-query";
import { SendTerminalSignupEmailParams, fetchTerminalSignup, sendTerminalSignupEmail } from "@api/terminal";
import { toastError, toastSuccess } from "@/toasts";
import { fetchStores } from "@api/store";
import { Store } from "@itypes/store";
import { Retailer } from "@itypes/retailer";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import { EnvelopeIcon } from "@heroicons/react/24/outline";
import Breadcrumbs from "@components/breadcrumbs";
import SecondaryButton from "@components/buttons/secondary";
import PrimaryButton from "@components/buttons/primary";

type TerminalSignup = {
  id: number;
  qr_svg: string;
};

const Signup = (): JSX.Element => {
  const { storeId, terminalSignupId } = useParams();
  const { session } = useContext<SessionContextType>(SessionContext);
  const [email, setEmail] = useState<string>("");
  const [store, setStore] = useState<Store | null>(null);
  const navigate = useNavigate();
  const [terminalSignup, setTerminalSignup] = useState<TerminalSignup | null>(null);
  const {
    active_retailer,
    token_info: { token },
  } = session;

  const { mutate } = useMutation({
    mutationFn: (props: SendTerminalSignupEmailParams) => sendTerminalSignupEmail(props),
    onError: (error: any) => {
      console.error(error);
      toastError("Failed to send email.");
    },
    onSuccess: () => {
      toastSuccess(`Code sent to ${email}`);
    },
  });

  const { isFetching: storeIsFetching } = useQuery(
    ["store", storeId],
    () =>
      fetchStores({
        jwt: token,
        storeIds: [Number(storeId)],
      }),
    {
      enabled: !!storeId && !!terminalSignupId && !!token,
      refetchOnWindowFocus: false,
      onError: error => {
        console.error(error);
        toastError(`Problem loading store: ${storeId}`);
      },
      onSuccess: data => {
        let store = data.data.retailers
          .find((retailer: Retailer) => retailer.id === active_retailer.id)
          .stores.find((store: Store) => store.id === Number(storeId));

        store.dayClose = store.day_close;
        delete store.day_close;

        setStore(store);
      },
    }
  );

  const { isFetching: terminalSignupIsFetching } = useQuery(
    ["terminalSignup", storeId, terminalSignupId],
    () =>
      fetchTerminalSignup({
        jwt: token,
        storeId,
        terminalSignupId,
      }),
    {
      enabled: !!storeId && !!terminalSignupId && !!token,
      refetchOnWindowFocus: false,
      onError: error => {
        console.error(error);
        toastError(`Problem loading terminal signup: ${terminalSignupId}`);
      },
      onSuccess: ({ data }) => {
        if (data) {
          const { id, qr_svg } = data;

          setTerminalSignup({ id, qr_svg });
        }
      },
    }
  );

  const copyQRToClipboard = () => {
    const text = terminalSignup?.qr_svg ?? "";
    const type = "text/plain";
    const blob = new Blob([text], { type });
    const data = [new ClipboardItem({ [type]: blob })];

    navigator.clipboard.write(data).then(
      () => {
        toastSuccess("QR Code copied to clipboard");
      },
      () => {
        toastError("Failed to copy QR code to clipboard");
      }
    );
  };

  const svg_code = `data:image/svg+xml; base64, ${terminalSignup?.qr_svg}`;
  return (
    <div className="w-full h-auto">
      <Breadcrumbs
        root={{ target: "/kiosks", label: "Kiosks" }}
        branches={[
          { target: "/terminals/signup", label: "New Terminal" },
          { target: "#", label: store?.name ?? "N/A" },
        ]}
      />
      <div>
        <hr />
      </div>
      <div className="space-y-10 divide-y divide-gray-900/10 mt-8 mb-8 grid grid-cols-2 drop-shadow-sm">
        <form className="bg-white shadow-sm ring-1 ring-gray-900/5 rounded-xl sm:rounded-xl col-span-2 md:col-span-1">
          <div className="px-6 pt-4 text-xl font-normal">Success</div>
          <div className="px-6 pt-1 text-sm font-normal text-gray-400">
            Terminal Link Code for new terminal signup at store {store?.name || "N/A"}
          </div>
          <div className="px-6 pt-6">
            {terminalSignup?.qr_svg && svg_code ? <img src={svg_code} /> : null}
            <hr className="mt-8 mb-4" />
          </div>
          <div className="pl-4 pr-4 mb-4">
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              Send terminal link code
            </label>
            <div className="mt-2 flex rounded-md shadow-sm bg-slate-50">
              <div className="relative flex flex-grow items-stretch focus-within:z-10">
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="block w-full rounded-none rounded-l-md border-0 py-1.5 pl-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset rocus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Email address"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </div>
              <button
                type="button"
                className="relative -ml-px inline-flex items-center gap-x-1.5 rounded-r-md px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-100"
                onClick={() =>
                  mutate({
                    jwt: token,
                    domain: window.location.hostname,
                    url: window.location.href,
                    email,
                    qr_svg: terminalSignup?.qr_svg ?? "",
                  })
                }
              >
                <EnvelopeIcon className="-ml-0.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                Send
              </button>
            </div>
          </div>
          <div className="px-6 pt-2">
            <hr className="mb-4" />
          </div>
          <div className="pt-2 pr-4 pb-4 flex justify-end">
            <SecondaryButton label="Copy to Clipboard" onClick={copyQRToClipboard} />
            <PrimaryButton additionalClasses="ml-4" label="Close" onClick={() => navigate("/kiosks")} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
