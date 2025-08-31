"use client";
import React, { useState } from "react";
import { QrReader } from "react-qr-reader";
import { Button } from "@/components/ui/button";
import jsQR from "jsqr";

interface QRScannerModalProps {
  onClose: () => void;
  onScan: (addr: `0x${string}`) => void;
}

export default function QRScannerModal({ onClose, onScan }: QRScannerModalProps) {
  const [error, setError] = useState<string | null>(null);
  const [fileInputKey, setFileInputKey] = useState(0); // reset input after scan

  const handleScan = (raw: string) => {
    let scanned = raw.trim();

    // รองรับ format เช่น ethereum:0x1234... หรือ bkc:0x1234...
    if (scanned.includes(":")) {
      scanned = scanned.split(":")[1];
    }

    // ตรวจสอบ valid address
    if (/^0x[a-fA-F0-9]{40}$/.test(scanned)) {
      onScan(scanned as `0x${string}`);
      setError(null);
      onClose();
    } else {
      setError("Invalid address scanned");
    }
  };

const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
  if (!e.target.files?.length) return;
  const file = e.target.files[0];

  try {
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

      if (code?.data) {
        handleScan(code.data);
      } else {
        setError("Cannot decode QR from image");
      }
    };
  } catch (err) {
    console.error(err);
    setError("Failed to read QR from image");
  } finally {
    setFileInputKey((k) => k + 1);
  }
};

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-[#162638] p-6 rounded-2xl w-[90%] max-w-md">
        <h3 className="text-white text-lg font-bold mb-4 text-center">Scan QR Code</h3>

        {/* Camera QR */}
        <div className="w-full rounded-xl overflow-hidden mb-4">
          <QrReader
  constraints={{ facingMode: "environment" }}
  onResult={(result, error) => {
    try {
      if (!!result) handleScan(result.getText());
    } catch (e) {
      console.warn("QR decode failed:", e);
    }
    if (error) console.log(error);
  }}
  containerStyle={{ width: "100%" }}
  videoStyle={{ width: "100%" }}
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
