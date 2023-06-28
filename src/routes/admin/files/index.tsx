import { useContext, useEffect, useLayoutEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { File, createFile, getFileStatus } from "@components/data/files.config";
import { BarsArrowUpIcon, ChevronDownIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import PrimaryButton from "@components/buttons/primary";
import HeadingMd from "@components/typography/headingMd";
import Dropdown, { DropdownItemType } from "@components/dropdown";
import { ArrowDownTrayIcon, ArrowPathIcon, FunnelIcon } from "@heroicons/react/20/solid";
import { useQuery } from "@tanstack/react-query";
import { fetchRetailerFiles } from "@api/file";
import { SessionContext, SessionContextType } from "@contexts/SessionContext";
import { toastError } from "@/toasts";
import requirePermissions from "@hooks/requirePermissions";
import { LoadingContext, LoadingContextType } from "@contexts/LoadingContext";
import { GlobalStateContext, GlobalStateContextType } from "@contexts/GlobalStateContext";
// @ts-ignore
import { set } from "lodash";
import { REFETCH_INTERVAL, calcTotalPages } from "@routes/kiosks";
import { IconButton } from "@components/buttons/icon";
import { mdiFilterVariant, mdiMenuDown } from "@mdi/js";
import { TableFilterDropdown } from "@components/inputs/tableFilterDropdown";
import { HeaderTypes, SkipTable, TableHeaderType } from "@components/data/skip-table";
import { ObjectOfStrings } from "@utils/data-types";
import { useTranslation } from "react-i18next";

const Files = (): JSX.Element => {
  const [activeFilter, setActiveFilter] = useState<boolean>(true);
  // @ts-ignore
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

  const onClickNewFile = () => {
    navigate("/admin/files/new");
  };

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

  // Filters

  const fileTypes = filteredFiles.map((file, i) => {
    return {
      label: file.fileType,
      value: `${i}-${file.fileType}`,
    };
  });

  // ../Filters

  useEffect(() => {
    setIsLoading(isLoading);
  }, [isLoading]);

  const onPrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const onNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const onGotoPage = (page: number) => () => {
    setPage(page);
  };

  const onRowClick = (item: File) => {
    navigate(`/admin/files/${activeRetailerId}/${item.fileId}`);
  };

  useLayoutEffect(() => {
    const isIndeterminate = selectedFiles.length > 0 && selectedFiles.length < filteredFiles.length;
    setChecked(selectedFiles.length === filteredFiles.length && filteredFiles.length > 0);
    setIndeterminate(isIndeterminate);
    set(checkbox, "current.indeterminate", isIndeterminate);
  }, [selectedFiles, filteredFiles]);

  function toggleAll() {
    setSelectedFiles(checked || indeterminate ? [] : filteredFiles.map(f => f.id));
    setChecked(!checked && !indeterminate);
    setIndeterminate(false);
  }

  const headers: TableHeaderType[] = [
    {
      label: t("file-type"),
      value: "fileType",
      itemCustomClass: "font-medium text-gray-900",
    },
    {
      label: t("site-name"),
      value: "siteName",
    },
    {
      label: t("site-id"),
      value: "siteId",
      itemCustomClass: "text-gray-800",
      type: HeaderTypes.NUMBER,
    },
    {
      label: t("uploaded"),
      value: "uploaded",
      type: HeaderTypes.DATE,
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
      label: t("file-size"),
      value: "fileSize",
      type: HeaderTypes.NUMBER,
    },
    {
      label: t("file-id"),
      value: "fileId",
      type: HeaderTypes.NUMBER,
    },
  ];

  return (
    <div>
      <div>
        <div className="flex h-20 -mt-4 items-center justify-between">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <HeadingMd label="Files"></HeadingMd>
            </div>
          </div>
          <div>
            <div className="sm:ml-6 sm:block">
              <div className="flex space-x-4">
                <Dropdown items={actionsDropdownItems} label="Actions"></Dropdown>
                <PrimaryButton label="Upload file" onClick={onClickNewFile}></PrimaryButton>
              </div>
            </div>
          </div>
        </div>
        <hr />
      </div>
      <SkipTable
        items={files}
        itemKey="id"
        headers={headers}
        isLoading={isLoading}
        selectable
        onItemClick={onRowClick}
      ></SkipTable>
    </div>
  );
};

export default Files;
