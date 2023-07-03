import { useState } from "react";
import SecondaryButton from "../../../../components/buttons/secondary";
import PrimaryButton from "../../../../components/buttons/primary";
import SelectList from "../../../../components/inputs/selectList";
import { FileType, FileTypes } from "../../../../assets/consts/files";
import { useTranslation } from "react-i18next";
import {
  Breadcrumb,
  BreadcrumbItemType,
} from "../../../../components/breadcrumb";
import { StepperDots } from "../../../../components/data/stepper-dots";

const FileNew = (): JSX.Element => {
  const [selectedFileType, setSelectedFileType] = useState<FileType>();
  const { t } = useTranslation();
  const breadcrumbItems: BreadcrumbItemType[] = [
    {
      label: t("files"),
      to: "/admin/files",
    },
    {
      label: t("upload-file"),
    },
  ];

  const fileTypes = FileTypes;

  const handleSelectedFileType = (fileType: string) => {
    setSelectedFileType(fileType as FileType);
  };

  return (
    <div className="w-full h-auto">
      <Breadcrumb items={breadcrumbItems}></Breadcrumb>
      <div>
        <hr />
      </div>
      <div className="space-y-10 divide-y divide-gray-900/10 mt-5 grid grid-cols-4">
        <form className="bg-white shadow ring-1 ring-gray-900/5 rounded-xl sm:rounded-xl col-span-4 md:col-span-3">
          <div className="px-6 pt-6 text-lg font-medium text-coolGray-900">
            {t("file-type")}
          </div>
          <div className="px-6 pt-2 pb-2 text-sm text-gray-500">
            {t("pls-select-file-type-to-proceed")}
          </div>
          <div className="px-6 py-4">
            <SelectList
              label="File Types"
              items={fileTypes}
              onChange={handleSelectedFileType}
            ></SelectList>
            <hr className="mt-4" />
            <div className="flex justify-end gap-2 mt-4">
              <SecondaryButton to="/admin/files" label="Cancel" />
              <PrimaryButton
                to={`/admin/files/new/${selectedFileType}`}
                label="Proceed"
                disabled={!selectedFileType}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FileNew;
