import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import BugIcon from "../../../../assets/svg/bug";
import { useLoadHeavyModule } from "@repo/core/hooks/useLoadHeavyModule";
import { toast } from "react-toastify";

type Props = {
  setId: Dispatch<SetStateAction<string | null>>;
};

const QrError = ({ setId }: Props) => {
  const [qrImage, setQrImage] = useState<File>();
  const [jsQR, loadingQrScanner] = useLoadHeavyModule(() => import("jsqr"));

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [qrData, setQrData] = useState<string | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setQrImage(file);
      setImageSrc(URL.createObjectURL(file));
    }
  };

  const onResult = (data: string) => {
    if (data.includes("api/user/book/qrcode/files/")) {
      return setId(data.split("/").pop()!);
    } else {
      toast("qrcode نامعتبر است", { type: "error" });
    }
  };

  const scanQRCodeFromImage = () => {
    const canvasElement = canvasRef.current;
    const canvas = canvasElement?.getContext("2d");

    if (!imageSrc || !canvasElement || !canvas) return;

    const image = new Image();
    image.src = imageSrc;
    image.onload = () => {
      canvasElement.width = image.width;
      canvasElement.height = image.height;
      canvas.drawImage(image, 0, 0, canvasElement.width, canvasElement.height);

      const imageData = canvas.getImageData(
        0,
        0,
        canvasElement.width,
        canvasElement.height,
      );
      const code: any = jsQR!(
        imageData.data,
        imageData.width,
        imageData.height,
        {
          inversionAttempts: "dontInvert",
        },
      );

      if (code) {
        setQrData(code.data);
      } else {
        setQrData(null);
        toast("qrcode نامعتبر است یا کیفیت عکس مناسب نیست ", { type: "error" });
      }
    };
  };

  useEffect(() => {
    scanQRCodeFromImage();
  }, [qrImage, loadingQrScanner, imageSrc]);

  useEffect(() => {
    if (qrData) {
      onResult(qrData);
    }
  }, [qrData, setId]);

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center px-10 [&_svg]:mb-[30px] [&_svg]:h-auto [&_svg]:w-[100px]">
      {imageSrc ? (
        <img
          src={imageSrc}
          width={100}
          className="mb-[30px] h-auto max-h-[200px] w-auto"
        />
      ) : (
        <BugIcon />
      )}
      <p className="mb-[30px] text-center text-base">
        متاسفانه نتونستیم QrCode شما را اسکن کنیم. <br />
        اگر از صحت QrCode خود اطمینان دارید،
        <br />
        این ارور میتواند به دلیل محدودیت هایی که مرورگر بر‌روی دوربین اعمال
        میکند رخداده باشد.
        <br />
        لطفا به صورت مجزا و با کیفیت بالا از QrCode خود عکس گرفته و عکس گرفته
        شده را در کادر زیر وارد کنید.
      </p>
      <input
        type="file"
        accept="image/*"
        id="UserQrImage"
        onChange={handleImageUpload}
        className="invisible absolute"
      />
      <label
        htmlFor="UserQrImage"
        className="cursor-pointer rounded-xl border-none bg-green px-3 text-center text-[15px] leading-10 text-white shadow-[0_3px_10px_rgba(0,0,0,0.1)] outline-none"
      >
        QrCode خود را اینجا وارد کنید
      </label>
      <canvas ref={canvasRef} style={{ display: "none" }} />
    </div>
  );
};

export default QrError;
