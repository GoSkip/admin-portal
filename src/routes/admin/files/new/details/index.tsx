import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SecondaryButton from "../../../../../components/buttons/secondary";
import PrimaryButton from "../../../../../components/buttons/primary";
import { FileType, FileTypes } from "../../../../../assets/consts/files";
import { useTranslation } from "react-i18next";
import {
  Breadcrumb,
  BreadcrumbItemType,
} from "../../../../../components/breadcrumb";
import { DragDropFileArea } from "../../../../../components/inputs/drag-drop-file-area";
import { StepperDots } from "../../../../../components/data/stepper-dots";
import Icon from "@mdi/react";
import { IconButton } from "../../../../../components/buttons/icon";
import { mdiCloseCircle, mdiDownload, mdiFileCheckOutline } from "@mdi/js";
import { Card } from "../../../../../components/common/Card";
import { ArrowDownTrayIcon } from "@heroicons/react/24/solid";

const FileNewDetails = (): JSX.Element => {
  const [step, setStep] = useState<number>(0);
  const [file, setFile] = useState<File | null>(null);
  const { fileType: fileTypeParam } = useParams();
  const fileType = fileTypeParam?.toLowerCase();
  const stepsLength = fileType === FileType.PLU ? 4 : 3;
  const navigate = useNavigate();
  const { t } = useTranslation();
  const fileTypes = FileTypes;
  const getTypeTitle = () => {
    const file = fileTypes.find(
      (file) => file.value.toLowerCase() === fileType
    );
    const title = file?.title;
    return t("upload-x-file", { x: title });
  };
  const getTypeSelectionTitle = () => {
    const file = fileTypes.find(
      (file) => file.value.toLowerCase() === fileType
    );
    const title = file?.title;
    return t("select-x-file", { x: title });
  };
  const getTypeSelectionDesc = () => {
    const file = fileTypes.find(
      (file) => file.value.toLowerCase() === fileType
    );
    return file?.desc;
  };
  const getFileTypes = () => {
    const file = fileTypes.find(
      (file) => file.value.toLowerCase() === fileType
    );
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

  const handleNextStep = () => {
    // TODO: Navigate to next step
    setStep(1);
  };

  const handlePrevStep = () => {
    if (step === 0) {
      return navigate("/admin/files/new");
    }
    setStep(step - 1);
    setFile(null);
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

  return (
    <div className="w-full h-auto">
      <Breadcrumb items={breadcrumbItems}></Breadcrumb>
      <div>
        <hr />
      </div>
      <div className="grid grid-cols-4">
        <div className="col-span-4 md:col-span-3">
          {step === 1 && !!file && (
            <Card className="p-6 mt-5 rounded-xl flex flex-col gap-3">
              <div className="text-lg font-medium text-coolGray-900 leading-6">
                {t("selected-file")}
              </div>
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
                <div className="px-6 pt-6 text-lg font-medium text-coolGray-900">
                  {getTypeSelectionTitle()}
                </div>
                <div className="px-6 pt-2 pb-2 text-sm text-gray-500">
                  {getTypeSelectionDesc()}
                </div>
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
            <div className="px-6 py-4">
              <hr />
              <div className="flex justify-end mt-4">
                <SecondaryButton
                  label="Back"
                  additionalClasses="mr-2"
                  onClick={handlePrevStep}
                />
                <PrimaryButton
                  label="Proceed"
                  disabled={isNextStepDisabled()}
                  onClick={handleNextStep}
                />
              </div>
            </div>
          </form>
          {step === 0 && fileType === FileType.PLU && (
            <a
              target="_blank"
              className="mt-3 px-6 py-3 rounded-xl cursor-pointer flex flex-col gap-2 hover:bg-gray-50"
            >
              {/*
               TODO: Add `href` when we have the file
              */}
              <div className="text-lg font-medium text-coolGray-900">
                Download example template
              </div>
              <div className="flex gap-2 text-sm text-coolGray-500 items-center">
                <Icon
                  size={1}
                  path={mdiDownload}
                  className="text-primary"
                ></Icon>
                Download file with examples in the first few rows, to be
                replaced by your data.
              </div>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileNewDetails;
