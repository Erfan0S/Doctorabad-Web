import { Loading } from "@repo/shared_modules/components";
import { useLoadHeavyModule } from "@repo/core/hooks/useLoadHeavyModule";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import styles from "./QrScanner.module.scss";
import { toast } from "react-toastify";
import { ScanArea } from "../../../../assets/svg/scanArea/scanArea";
import { MultiMediaQrPage } from "..";

type Props = {
  setId: Dispatch<SetStateAction<string | null>>;
  setPage: Dispatch<SetStateAction<MultiMediaQrPage>>;
};

export const Scanner = ({ setId, setPage }: Props) => {
  const [jsQR, loadingQrScanner] = useLoadHeavyModule(() => import("jsqr"));

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const stream = useRef<MediaStream | null>(null);
  const [isCameraEnabled, setIsCameraEnabled] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    const canvasElement = canvasRef.current;
    const canvas = canvasElement?.getContext("2d");

    if (
      !video ||
      !canvasElement ||
      !canvas ||
      loadingQrScanner ||
      !isCameraEnabled
    )
      return;
    let timeoutID: null | NodeJS.Timeout = null;
    const onResult = (data: string) => {
      if (data.includes("api/user/book/qrcode/files/")) {
        return setId(data.split("/").pop()!);
      } else {
        if (!timeoutID) {
          toast("qrcode نامعتبر است", { type: "error" });
          timeoutID = setTimeout(() => {
            timeoutID = null;
          }, 5000);
        }
      }
    };
    const tick = () => {
      if (video.readyState === video.HAVE_ENOUGH_DATA) {
        canvasElement.hidden = false;

        canvasElement.height = video.videoHeight;
        canvasElement.width = video.videoWidth;
        canvas.drawImage(
          video,
          0,
          0,
          canvasElement.width,
          canvasElement.height
        );

        const imageData = canvas.getImageData(
          0,
          0,
          canvasElement.width,
          canvasElement.height
        );
        const code = jsQR!(imageData.data, imageData.width, imageData.height, {
          inversionAttempts: "dontInvert",
        });

        if (code) {
          onResult(code.data);
        }
      }
      requestAnimationFrame(tick);
    };

    const initVideoStream = async () => {
      try {
        stream.current = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" },
        });
        video.srcObject = stream.current;
        video.setAttribute("playsinline", "true");
        video.play();
        requestAnimationFrame(tick);
      } catch (err) {
        console.error("Error accessing video stream", err);
      }
    };

    initVideoStream();

    return () => {
      stopCamera();
      if (timeoutID) clearTimeout(timeoutID);
    };
  }, [loadingQrScanner]);

  const stopCamera = () => {
    if (stream.current) {
      stream.current.getTracks().forEach((track) => track.stop()); // Stop all media tracks
      stream.current = null;
      setIsCameraEnabled(false);
    }
  };

  return (
    <div className={styles.QrScanner}>
      {loadingQrScanner ? (
        <Loading size={30} />
      ) : (
        <div>
          <video ref={videoRef} />
          <canvas
            id="QrCanvas"
            ref={canvasRef}
            hidden
            style={{ width: "100%" }}
          ></canvas>
          <ScanArea />
          <button onClick={() => setPage(MultiMediaQrPage.ERROR)}>
            QrCode کار نمیکند؟
            <br />
            اینجا کلیک کنید
          </button>
        </div>
      )}
    </div>
  );
};
