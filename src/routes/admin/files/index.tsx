import { useContext, useEffect, useLayoutEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { File, createFile, getFileStatus } from "@components/data/files.config";
import PrimaryButton from "@components/buttons/primary";
import HeadingMd from "@components/typography/headingMd";
import Dropdown, { DropdownItemType } from "@components/dropdown";
import { ArrowDownTrayIcon, ArrowPathIcon, FunnelIcon } from "@heroicons/react/20/solid";
import { useQuery } from "@tanstack/react-query";
import { fetchRetailerFiles } from "@api/file";
import { SessionContext, SessionContextType } from "@contexts/SessionContext";
import { toastError } from "@/toasts";
import { LoadingContext, LoadingContextType } from "@contexts/LoadingContext";
import { GlobalStateContext, GlobalStateContextType } from "@contexts/GlobalStateContext";
// @ts-ignore
import { set } from "lodash";
import { REFETCH_INTERVAL, calcTotalPages } from "@routes/kiosks";
import { HeaderTypes, SkipTable, TableHeaderType } from "@components/data/skip-table";
import { useTranslation } from "react-i18next";

const Files = (): JSX.Element => {
  const [activeFilter, setActiveFilter] = useState<boolean>(true);
  const { t } = useTranslation();

  // const handleUploadFile = (file: File) => {
  //   console.log(file);
  //   navigate(`/admin/files`);
  // };

  const dateFormatter = new Intl.DateTimeFormat("en-US", {
    month: "numeric",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
    timeZone: "America/Chicago",
  });

  const handleAction = (str: string) => {
    return true;
  };

  const actionsDropdownItems: DropdownItemType[] = [
    {
      name: "Download file",
      value: "download-file",
      icon: ArrowDownTrayIcon,
      onClick: handleAction,
    },
    {
      name: "Reparse file",
      value: "reparse-file",
      icon: ArrowPathIcon,
      onClick: handleAction,
    },
  ];

  // requirePermissions(["file.view"]);

  const { session } = useContext<SessionContextType>(SessionContext);
  const { setIsLoading } = useContext<LoadingContextType>(LoadingContext);
  const { filter } = useContext<GlobalStateContextType>(GlobalStateContext);
  const checkbox = useRef<HTMLInputElement | null>();
  const [checked, setChecked] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [indeterminate, setIndeterminate] = useState<boolean>(false);
  const [totalResults, setTotalResults] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [files, setFiles] = useState<File[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<number[]>([]);
  const navigate = useNavigate();

  const limit = 10;
  const {
    active_retailer: { id: activeRetailerId },
    selectable_stores: stores,
    token_info: { token },
  } = session;

  const { isLoading } = useQuery(
    ["files", page, activeRetailerId],
    () =>
      fetchRetailerFiles({
        retailerId: activeRetailerId,
        page,
        limit,
        jwt: token,
      }),
    {
      notifyOnChangeProps: "all",
      refetchInterval: REFETCH_INTERVAL,
      enabled: !!activeRetailerId,
      onError: error => {
        toastError("Problem loading files.");
      },
      onSuccess: ({ data: { store_files: files, total_results } }) => {
        const mappedFiles = files.map(createFile);
        setFiles(mappedFiles);
        setTotalResults(total_results);
        setTotalPages(calcTotalPages({ limit, totalResults: total_results }));
      },
    }
  );

  const filteredFiles = files.filter(
    (file: File) => filter === "" || file.siteName.toLowerCase().includes(filter.toLowerCase())
  );

  useEffect(() => {
    setIsLoading(isLoading);
  }, [isLoading]);

  const onRowClick = (item: File) => {
    navigate(`/admin/files/${activeRetailerId}/${item.fileId}`);
  };

  useLayoutEffect(() => {
    const isIndeterminate = selectedFiles.length > 0 && selectedFiles.length < filteredFiles.length;
    setChecked(selectedFiles.length === filteredFiles.length && filteredFiles.length > 0);
    setIndeterminate(isIndeterminate);
    set(checkbox, "current.indeterminate", isIndeterminate);
  }, [selectedFiles, filteredFiles]);

  const headers: TableHeaderType[] = [
    {
      label: t("file-type"),
      value: "fileType",
      itemCustomClass: "font-medium text-gray-900",
    },
    {
      label: t("store"),
      value: "siteName",
    },
    {
      label: t("site-id"),
      value: "siteId",
      itemCustomClass: "text-gray-800",
      type: HeaderTypes.NUMBER,
    },
    {
      label: t("status"),
      value: "status",
      itemCustomFormatter: ({ item }) => {
        const v = getFileStatus(item?.status);
        let color = "red";
        switch (v) {
          case "Success":
            color = "green";
            break;
          case "In Queue":
            color = "amber";
            break;
          case "In Process":
            color = "blue";
            break;
        }
        return (
          <span
            className={`px-2 inline-flex text-xs leading-5 font-medium rounded-full bg-${color}-100 text-${color}-800`}
          >
            {v}
          </span>
        );
      },
    },
    {
      label: t("time"),
      value: "uploaded",
      type: HeaderTypes.DATE,
    },
    {
      label: t("size"),
      value: "fileSize",
      type: HeaderTypes.NUMBER,
    },
    {
      label: t("id"),
      value: "fileId",
      type: HeaderTypes.NUMBER,
    },
  ];

  return (
    <div>
      <SkipTable
        title="Files"
        items={files}
        itemKey="id"
        headers={headers}
        isLoading={isLoading}
        selectable
        headAppend={<PrimaryButton label="Upload file" to={"/admin/files/new"}></PrimaryButton>}
        onItemClick={onRowClick}
        actions={actionsDropdownItems}
      ></SkipTable>
    </div>
  );
};

export default Files;
