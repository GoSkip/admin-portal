import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import {
  SessionContext,
  SessionContextType,
} from "../../../../contexts/SessionContext";
import { Store, emptyStore } from "../../../../types/store";
import Select, { Option } from "../../../../components/inputs/select";
import SecondaryButton from "../../../../components/buttons/secondary";
import PrimaryButton from "../../../../components/buttons/primary";
import { BeatLoader } from "react-spinners";
import { Session } from "../../../../types/session";
import { useMutation } from "@tanstack/react-query";
import {
  LoadingContext,
  LoadingContextType,
} from "../../../../contexts/LoadingContext";
import {
  CreateKioskPayloadParams,
  CreateKioskQueryParams,
  createKiosk,
} from "../../../../api/kiosk";
import { toastError } from "../../../../toasts";
import SelectList, {
  SelectListItemType,
} from "../../../../components/inputs/selectList";
import Breadcrumbs from "../../../../components/breadcrumbs";
import { FileTypes } from "../../../../assets/consts/files";

type NewKioskForm = {
  store: Option | null;
};

type CreateKioskMutationProps = {
  queryParams: CreateKioskQueryParams;
  payloadParams: CreateKioskPayloadParams;
};

const FileNew = (): JSX.Element => {
  const { session } = useContext<SessionContextType>(SessionContext);
  const { setIsLoading } = useContext<LoadingContextType>(LoadingContext);
  const [formState, setFormState] = useState<NewKioskForm>({
    store: null,
  });
  const { selectable_stores } = session;
  const navigate = useNavigate();

  const fileTypes = FileTypes;

  const { isLoading, mutate } = useMutation({
    mutationFn: (props: CreateKioskMutationProps) =>
      createKiosk(props.queryParams, props.payloadParams),
    onError: (error: any) => {
      console.error(error);
      toastError("Failed to create kiosk.");
    },
    onSuccess: (data: any) => {
      const {
        data: { id },
      } = data;

      if (formState.store?.key) {
        navigate(`/kiosks/${formState.store.key}/${id}`);
      }
    },
  });

  const onCreateFile = () => {
    const props: CreateKioskMutationProps = {
      queryParams: {
        jwt: session.token_info.token,
        storeId: Number(formState.store?.key),
      },
      payloadParams: {
        kiosk_number: 1,
      },
    };

    mutate(props);
  };

  useEffect(() => {
    if (selectable_stores.length > 0) {
      const store: Option = {
        key: String(selectable_stores[0].id),
        value: selectable_stores[0].name,
      };

      setFormState({ store });
    }
  }, [selectable_stores]);

  const stores: Option[] = selectable_stores.map((store: Store) => ({
    key: String(store.id),
    value: store.name,
  }));

  const handleStoreChange = (option: Option | null) => {
    if (option) {
      setFormState({ store: option });
    }
  };

  const ogStore = formState.store
    ? selectable_stores.find(
        (store: Store) => String(store.id) === formState.store?.key
      )
    : null;

  useEffect(() => {
    setIsLoading(isLoading);
  }, [isLoading]);

  return (
    <div className="w-full h-auto">
      <Breadcrumbs
        root={{ target: "/admin/files", label: "Files" }}
        branches={[{ target: "#", label: "Upload File" }]}
      />
      <div>
        <hr />
      </div>
      <div className="space-y-10 divide-y divide-gray-900/10 mt-8 grid grid-cols-2">
        <form className="bg-white shadow-sm ring-1 ring-gray-900/5 rounded-xl sm:rounded-xl col-span-2 md:col-span-1">
          <div className="px-6 pt-6 text-xl font-medium">Upload a file</div>
          <div className="px-6 pt-2 pb-2 text-sm text-gray-500">
            Please select a file type to proceed
          </div>
          <div className="px-6 py-6">
            <SelectList label="File Types" items={fileTypes}></SelectList>
            <hr className="mt-4" />
            <div className="flex justify-end mt-4">
              <SecondaryButton
                label="Cancel"
                additionalClasses="mr-2"
                onClick={() => navigate("/admin/files")}
              />
              <PrimaryButton
                label="Proceed"
                disabled={!formState.store}
                onClick={onCreateFile}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FileNew;
