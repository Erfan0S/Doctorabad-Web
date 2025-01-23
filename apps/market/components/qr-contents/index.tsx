import { fadeInAnimation } from "@repo/core/constants";
import { motion } from "framer-motion";
import styles from "./QrContents.module.scss";
import Loading from "../common/loading";
import { useEffect, useState } from "react";
import SidePanelHeader from "../sidePanel/header";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/api/Api";
import { Scanner } from "./scanner";
import { VerifyCode } from "./verifyCode";
import { ResponseType } from "@repo/core/types";
import { toast } from "react-toastify";
import { Contents } from "./contents";
import { ModalProps } from "@/types/modals";
import QrError from "./error/indext";

export enum MultiMediaQrPage {
  SCANNING = "SCANNING",
  VERIFY_CODE = "VERIFY_CODE",
  CONTENTS = "CONTENTS",
  ERROR = "ERROR",
}

const pageComponents = {
  [MultiMediaQrPage.SCANNING]: Scanner,
  [MultiMediaQrPage.VERIFY_CODE]: VerifyCode,
  [MultiMediaQrPage.CONTENTS]: Contents,
  [MultiMediaQrPage.ERROR]: QrError,
};

export const QRContents = ({ closeModal }: ModalProps) => {
  const [page, setPage] = useState(MultiMediaQrPage.SCANNING);
  const [multiMediaContentsId, setMultiMediaContentsId] = useState<
    string | null
  >(null);

  const { data, isLoading, isError, error, isSuccess, refetch } = useQuery({
    queryFn: () => api.getMultiMediaContentsFromId(multiMediaContentsId!),
    queryKey: ["multimedia", multiMediaContentsId],
    enabled: false,
    retry: false,
    retryOnMount: false,
  });

  useEffect(() => {
    if (multiMediaContentsId) refetch();
  }, [multiMediaContentsId, refetch]);

  useEffect(() => {
    if (isError) {
      if ((error as unknown as ResponseType<any>)?.status === 422) {
        setPage(MultiMediaQrPage.VERIFY_CODE);
      } else {
        toast("مشکلی در ارتباط با سرور پیش آمده مجددا امتحان کنید", {
          type: "error",
        });
      }
    } else if (isSuccess) setPage(MultiMediaQrPage.CONTENTS);
  }, [isError, error, isSuccess]);

  const onBack = () => {
    if (page === MultiMediaQrPage.SCANNING) {
      closeModal();
    } else {
      setMultiMediaContentsId(null);
      setPage(MultiMediaQrPage.SCANNING);
    }
  };

  const Component = pageComponents[page];
  const bookTitle = data?.data?.data.book_title;
  return (
    <motion.div {...fadeInAnimation} className={styles.QrContents}>
      <SidePanelHeader
        onBack={onBack}
        title={
          page === MultiMediaQrPage.CONTENTS && bookTitle
            ? bookTitle
            : "مولتی مدیا"
        }
      />
      <div className={styles.QrContentsWrapper}>
        {isLoading ? (
          <Loading size={30} />
        ) : (
          <Component
            multiMediaId={multiMediaContentsId!}
            refetchContents={refetch}
            setId={setMultiMediaContentsId}
            items={data?.data.data.files!}
            title={data?.data.data.title!}
            setPage={setPage}
          />
        )}
      </div>
    </motion.div>
  );
};
