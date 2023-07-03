import {
  mdiClose,
  mdiCloseCircle,
  mdiFileCheckOutline,
  mdiFileUploadOutline,
} from "@mdi/js";
import Icon from "@mdi/react";
import React, { FC, useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { useTranslation } from "react-i18next";
import PrimaryButton from "../buttons/primary";
import { PlusIcon } from "@heroicons/react/24/solid";
import { IconButton } from "../buttons/icon";
import { Card } from "../common/Card";
import { toastError } from "../../toasts";

type DragDropFileAreaType = {
  types: string[];
  maxSize: number;
  initFile?: File | null;
  onChange?: (file: File | null) => void;
};

const FileUploaderInner: FC<DragDropFileAreaType> = ({ types, maxSize }) => {
  const { t } = useTranslation();
  return (
    <div className="cursor-pointer flex justify-center rounded-lg border-2 border-dashed border-gray-300 px-6 py-12">
      <div className="text-center">
        <Icon
          path={mdiFileUploadOutline}
          className="mx-auto text-gray-400"
          size={2.5}
        />
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-1 mt-4">
            <div className="text-sm leading-5 font-medium text-gray-900">
              <p>{t("drag-drop-file-area-label")}</p>
            </div>
            <div>
              {types.length > 0 && (
                <p className="text-sm leading-5 text-gray-500">
                  {t("files-supported-x", {
                    x: types
                      .map((type) => type)
                      .join(", ")
                      .toUpperCase(),
                  })}
                </p>
              )}
              {maxSize > 0 && (
                <p className="text-sm leading-5 text-gray-500">
                  {t("max-size-x-mb", {
                    x: maxSize,
                  })}
                </p>
              )}
            </div>
          </div>
          <div>
            <PrimaryButton
              label={
                <>
                  <PlusIcon className="h-5 w-5"></PlusIcon>
                  {t("select-file")}
                </>
              }
            ></PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export const DragDropFileArea: FC<DragDropFileAreaType> = ({
  types = [],
  maxSize = 0,
  initFile = null,
  onChange,
}) => {
  const { t } = useTranslation();
  const [file, setFile] = useState<File | null>(null);
  const handleChange = (file: File | null) => {
    setFile(file);
    if (onChange) {
      onChange(file);
    }
  };
  const handleTypeError = () => {
    toastError("File type is not supported.");
  };
  const handleSizeError = () => {
    toastError("File size is too big.");
  };
  if (file) {
    return (
      <div className="p-6 border-2 border-gray-300 border-dashed rounded-xl flex flex-col gap-3">
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
            onClick={() => handleChange(null)}
          ></IconButton>
        </div>
      </div>
    );
  }
  return (
    <FileUploader
      handleChange={handleChange}
      name="file"
      required
      types={types}
      maxSize={maxSize}
      hoverTitle=" "
      fileOrFiles={initFile}
      onTypeError={handleTypeError}
      onSizeError={handleSizeError}
      dropMessageStyle={{ backgroundColor: "rgb(14, 165, 233)" }}
      children={
        <FileUploaderInner types={types} maxSize={maxSize}></FileUploaderInner>
      }
    />
  );
};
