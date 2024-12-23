import React, { ChangeEvent, Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import style from './QrError.module.scss';
import BugIcon from '@/assets/svg/newIcons/bug';
import { useLoadHeavyModule } from '@/hooks/useLoadHeavyModule';
import { toast } from 'react-toastify';

type Props = {
  setId: Dispatch<SetStateAction<string | null>>;
};

const QrError = ({ setId }: Props) => {
  const [qrImage, setQrImage] = useState<File>();
  const [jsQR, loadingQrScanner] = useLoadHeavyModule(() => import('jsqr'));

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
    if (data.includes('api/user/book/qrcode/files/')) {
      return setId(data.split('/').pop()!);
    } else {
      toast('qrcode نامعتبر است', { type: 'error' });
    }
  };

  const scanQRCodeFromImage = () => {
    const canvasElement = canvasRef.current;
    const canvas = canvasElement?.getContext('2d');

    if (!imageSrc || !canvasElement || !canvas) return;

    const image = new Image();
    image.src = imageSrc;
    image.onload = () => {
      canvasElement.width = image.width;
      canvasElement.height = image.height;
      canvas.drawImage(image, 0, 0, canvasElement.width, canvasElement.height);

      const imageData = canvas.getImageData(0, 0, canvasElement.width, canvasElement.height);
      const code: any = jsQR!(imageData.data, imageData.width, imageData.height, {
        inversionAttempts: 'dontInvert',
      });

      if (code) {
        setQrData(code.data);
      } else {
        setQrData(null);
        toast('qrcode نامعتبر است یا کیفیت عکس مناسب نیست ', { type: 'error' });
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
    <div className={style.QrError}>
      {imageSrc ? <img src={imageSrc} width={100} /> : <BugIcon />}
      <p>
        متاسفانه نتونستیم QrCode شما را اسکن کنیم. <br />
        اگر از صحت QrCode خود اطمینان دارید،
        <br />
        این ارور میتواند به دلیل محدودیت هایی که مرورگر بر‌روی دوربین اعمال میکند رخداده باشد.
        <br />
        لطفا به صورت مجزا و با کیفیت بالا از QrCode خود عکس گرفته و عکس گرفته شده را در کادر زیر وارد کنید.
      </p>
      <input type="file" accept="image/*" id="UserQrImage" onChange={handleImageUpload} />
      <label htmlFor="UserQrImage">QrCode خود را اینجا وارد کنید</label>
      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </div>
  );
};

export default QrError;
