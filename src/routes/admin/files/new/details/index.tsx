import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SecondaryButton from "@components/buttons/secondary";
import PrimaryButton from "@components/buttons/primary";
import {
  ApplicableStoreType,
  FileActionType,
  FileType,
  FileTypes,
  applicableStoreTypes,
  fileActionTypes,
} from "@assets/consts/files";
import { useTranslation } from "react-i18next";
import { Breadcrumb, BreadcrumbItemType } from "@components/breadcrumb";
import { DragDropFileArea } from "@components/inputs/drag-drop-file-area";
import { StepperDots } from "@components/data/stepper-dots";
import { Icon } from "@mdi/react";
import { IconButton } from "@components/buttons/icon";
import { mdiCloseCircle, mdiDownload, mdiFileCheckOutline } from "@mdi/js";
import { Card } from "@components/common/card";
import { ArrowDownTrayIcon } from "@heroicons/react/24/solid";
import SelectList from "@/components/inputs/selectList";
import { Combobox } from "@/components/inputs/combobox";
import { Store } from "@/types/store";
import { SessionContext, SessionContextType } from "@/contexts/SessionContext";
import { useQuery } from "@tanstack/react-query";
import { TwoLineInfo } from "@/components/data/two-line-info";
import { MultipleChipDropdown } from "@/components/data/multiple-chip-dropdown";

const FileNewDetails = (): JSX.Element => {
  const { t } = useTranslation();
  const [step, setStep] = useState<number>(0);
  const [file, setFile] = useState<File | null>(null);
  const { fileType: fileTypeParam } = useParams();
  const fileType = fileTypeParam?.toLowerCase();
  const [fileActionType, setFileActionType] = useState<FileActionType>(FileActionType.AddOrUpdate);
  const [applicableStoreType, setApplicableStoreType] = useState<ApplicableStoreType>(ApplicableStoreType.Single);
  const stepsLength = fileType === FileType.PLU ? 4 : 3;
  const {
    session: { active_retailer },
  } = useContext<SessionContextType>(SessionContext);
  const stores = active_retailer.stores.map(store => {
    return {
      label: `#${store.id} ${store.name}`,
      value: store.id,
      address: store.address || store.address2 || "280 New Lancaster Rd Leominster, MA 01453",
    };
  });
  const [singleStore, setSingleStore] = useState<number | null>(null);
  const [selectedStoreAddress, setSelectedStoreAddress] = useState<string>("");
  const [multipleStore, setMultipleStore] = useState<number[]>([]);
  const navigate = useNavigate();
  const fileTypes = FileTypes;
  const getTypeTitle = () => {
    const file = fileTypes.find(file => file.value.toLowerCase() === fileType);
    const title = file?.title;
    return t("upload-x-file", { x: title });
  };
  const getTypeSelectionTitle = () => {
    const file = fileTypes.find(file => file.value.toLowerCase() === fileType);
    const title = file?.title;
    return t("select-x-file", { x: title });
  };
  const getTypeSelectionDesc = () => {
    const file = fileTypes.find(file => file.value.toLowerCase() === fileType);
    return file?.desc;
  };
  const getFileTypes = () => {
    const file = fileTypes.find(file => file.value.toLowerCase() === fileType);
    return file?.fileType;
  };
  const breadcrumbItems: BreadcrumbItemType[] = [
    {
      label: t("files"),
      to: "/admin/files",
    },
    {
      label: t("upload-file"),
      to: "/admin/files/new",
    },
    {
      label: getTypeTitle(),
    },
  ];

  const handleFileChange = (file: File | null) => {
    setFile(file);
  };

  const handleFileActionType = (v: string) => {
    setFileActionType(v as FileActionType);
  };

  const handleApplicableStoreType = (v: string) => {
    setApplicableStoreType(v as ApplicableStoreType);
  };

  const handleSingleStore = (v: string | number | null) => {
    if (!!v && typeof v === "number") {
      setSingleStore(v);
    }
  };

  const handleMultipleStore = (v: (string | number)[]) => {
    if (!!v && Array.isArray(v)) {
      const storeIds = v.map(v => parseInt(v.toString()));
      setMultipleStore(storeIds);
    }
  };

  const handleNextStep = () => {
    // TODO: Create file and navigate to file details page with file id if it's last step --> waiting for API endpoint for file creation
    setStep(step + 1);
  };

  const handlePrevStep = () => {
    if (step === 0) {
      return navigate("/admin/files/new");
    }
    setStep(step - 1);
    if (step === 1) {
      setFile(null);
    }
  };

  const handlePrevStepWithFile = () => {
    setFile(null);
    setStep(0);
  };

  const isNextStepDisabled = () => {
    if (step === 0) {
      return !file;
    }
  };

  useEffect(() => {
    if (!active_retailer.id) {
      return;
    }
    setSingleStore(active_retailer.stores[0].id);
  }, [active_retailer.id]);

  // Watch change for singleStore
  useEffect(() => {
    // Update address
    if (!!singleStore) {
      const store = stores.find(store => store.value === singleStore);
      if (!!store && !!store.address) {
        setSelectedStoreAddress(store.address);
      }
    }
  }, [singleStore]);

  return (
    <div className="w-full h-auto">
      <Breadcrumb items={breadcrumbItems}></Breadcrumb>
      <div>
        <hr />
      </div>
      <div className="grid grid-cols-4">
        <div className="col-span-4 md:col-span-3">
          {step > 0 && !!file && (
            <Card className="p-6 mt-5 rounded-xl flex flex-col gap-3">
              <div className="text-lg font-medium text-coolGray-900 leading-6">{t("selected-file")}</div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 text-lightBlue-600 text-lg font-medium">
                  <Icon size={1} path={mdiFileCheckOutline}></Icon>
                  <span>{file.name}</span>
                </div>
                <IconButton
                  color="gray-400"
                  icon={mdiCloseCircle}
                  size={1}
                  onClick={handlePrevStepWithFile}
                ></IconButton>
              </div>
            </Card>
          )}
          <div className="py-5">
            <StepperDots length={stepsLength} value={step}></StepperDots>
          </div>
          <form className="bg-white shadow ring-1 ring-gray-900/5 rounded-xl">
            {step === 0 && (
              <>
                <div className="px-6 pt-6 text-lg font-medium text-coolGray-900">{getTypeSelectionTitle()}</div>
                <div className="px-6 pt-2 text-sm text-gray-500">{getTypeSelectionDesc()}</div>
                <div className="px-6 pt-4">
                  <DragDropFileArea
                    types={[getFileTypes()] as string[]}
                    maxSize={20}
                    initFile={file}
                    onChange={handleFileChange}
                  ></DragDropFileArea>
                </div>
              </>
            )}
            {step === 1 && fileType === FileType.PLU && (
              <>
                <div className="px-6 pt-6 text-lg font-medium text-coolGray-900">{t("file-action-type")}</div>
                <div className="px-6 pt-2 text-sm text-gray-500">{t("select-action-type-associated-with-file")}</div>
                <div className="px-6 pt-4">
                  <SelectList
                    label={t("file-action-type")}
                    items={fileActionTypes}
                    value={fileActionType}
                    onChange={handleFileActionType}
                  ></SelectList>
                </div>
              </>
            )}
            {((step === 1 && fileType !== FileType.PLU) || (step === 2 && fileType === FileType.PLU)) && (
              <>
                <div className="px-6 pt-6 text-lg font-medium text-coolGray-900">{t("applicable-store(s)")}</div>
                <div className="px-6 pt-2 text-sm text-gray-500">{t("select-where-you-wish-to-apply-change")}</div>
                <div className="px-6 pt-4">
                  <SelectList
                    label={t("applicable-store(s)")}
                    items={applicableStoreTypes}
                    value={applicableStoreType}
                    onChange={handleApplicableStoreType}
                  ></SelectList>
                </div>
              </>
            )}
            {((step === 2 && fileType !== FileType.PLU) || (step === 3 && fileType === FileType.PLU)) && (
              <>
                {applicableStoreType === ApplicableStoreType.Single && (
                  <>
                    <div className="px-6 pt-6 text-lg font-medium text-coolGray-900">{t("single-store")}</div>
                    <div className="px-6 pt-2 text-sm text-gray-500">{t("select-store-file-will-affect")}</div>
                    <div className="px-6 pt-4 grid grid-cols-12">
                      <div className="col-span-4">
                        <Combobox
                          label={t("store")}
                          value={singleStore}
                          items={stores}
                          onChange={handleSingleStore}
                        ></Combobox>
                      </div>
                      <div className="col-span-1"></div>
                      {!!selectedStoreAddress && (
                        <div className="col-span-3">
                          <TwoLineInfo
                            labelColor="gray-700 leading-6"
                            label={t("address")}
                            valueColor="gray-400"
                            value={selectedStoreAddress}
                          ></TwoLineInfo>
                        </div>
                      )}
                    </div>
                  </>
                )}
                {applicableStoreType === ApplicableStoreType.Multiple && (
                  <>
                    <div className="px-6 pt-6 text-lg font-medium text-coolGray-900">{t("multiple-stores")}</div>
                    <div className="px-6 pt-2 text-sm text-gray-500">{t("select-stores-file-will-affect")}</div>
                    <div className="px-6 pt-4">
                      <MultipleChipDropdown
                        items={stores}
                        value={multipleStore}
                        onChange={handleMultipleStore}
                        label={t("add-store")}
                      ></MultipleChipDropdown>
                    </div>
                  </>
                )}
                {applicableStoreType === ApplicableStoreType.All && (
                  <>
                    <div className="px-6 pt-6 text-lg font-medium text-coolGray-900">{t("all-stores")}</div>
                    <div className="px-6 pt-2 text-sm text-gray-500">
                      {t("file-will-affect-all-stores-account-access")}
                    </div>
                  </>
                )}
              </>
            )}
            <div className="px-6 py-4">
              <hr />
              <div className="flex justify-end mt-4">
                <SecondaryButton label="Back" additionalClasses="mr-2" onClick={handlePrevStep} />
                <PrimaryButton label="Proceed" disabled={isNextStepDisabled()} onClick={handleNextStep} />
              </div>
            </div>
          </form>
          {step === 0 && fileType === FileType.PLU && (
            <a
              href="/sco-template.csv"
              target="_blank"
              download={"sco-template.csv"}
              className="mt-3 px-6 py-3 rounded-xl cursor-pointer flex flex-col gap-2 hover:bg-gray-50"
            >
              <div className="text-lg font-medium text-coolGray-900">Download example template</div>
              <div className="flex gap-2 text-sm text-coolGray-500 items-center">
                <Icon size={1} path={mdiDownload} className="text-primary"></Icon>
                Download file with examples in the first few rows, to be replaced by your data.
              </div>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileNewDetails;
