import React, { useState, useRef, useEffect } from "react";
import Webcam from "react-webcam";
import { Button } from "@/components/ui/button";
import jsQR from "jsqr";

interface QRScannerModalProps {
  onClose: () => void;
  onScan: (addr: `0x${string}`) => void;
}

export default function QRScannerModal({ onClose, onScan }: QRScannerModalProps) {
  const webcamRef = useRef<Webcam>(null);
  const [error, setError] = useState<string | null>(null);
  const [fileInputKey, setFileInputKey] = useState(0);

  const handleScan = (raw: string) => {
    let scanned = raw.trim();
    if (scanned.includes(":")) scanned = scanned.split(":")[1];
    if (/^0x[a-fA-F0-9]{40}$/.test(scanned)) {
      onScan(scanned as `0x${string}`);
      setError(null);
      onClose();
    } else {
      setError("Invalid address scanned");
    }
  };

  // Webcam scanning
  useEffect(() => {
    const interval = setInterval(() => {
      const imgSrc = webcamRef.current?.getScreenshot();
      if (!imgSrc) return;

      const img = new Image();
      img.src = imgSrc;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height);
        if (code?.data) handleScan(code.data);
      };
    }, 500);

    return () => clearInterval(interval);
  }, []);

  // Upload file
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    const file = e.target.files[0];
    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const code = jsQR(imageData.data, imageData.width, imageData.height);
      if (code?.data) handleScan(code.data);
      else setError("Cannot decode QR from image");
    };
    setFileInputKey((k) => k + 1);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-[#162638] p-6 rounded-2xl w-[90%] max-w-md">
        <h3 className="text-white text-lg font-bold mb-4 text-center">Scan QR Code</h3>

        {/* Camera Preview */}
        <div className="w-full rounded-xl overflow-hidden mb-4">
          <Webcam
            ref={webcamRef}
            screenshotFormat="image/png"
            videoConstraints={{ facingMode: "environment" }}
            className="w-full"
          />
        </div>

        {/* Upload QR image */}
        <div className="mb-4">
          <input
            key={fileInputKey}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="text-sm text-white"
          />
        </div>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <Button
          className="w-full bg-emerald-600 hover:bg-emerald-500 text-white"
          onClick={onClose}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}
