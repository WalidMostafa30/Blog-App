import React, { useCallback, useState } from "react";
import Cropper from "react-easy-crop";
import { getCroppedImg } from "../../utils/getCroppedImg.js";

const ImageCropperModal = ({ imageSrc, onClose, onCropDone }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropComplete = useCallback((_, croppedPixels) => {
    setCroppedAreaPixels(croppedPixels);
  }, []);

  const handleCrop = async () => {
    const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
    onCropDone(croppedImage);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-white p-4 rounded-md w-full max-w-lg">
        <div className="relative w-full h-64 bg-gray-200">
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={1}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
          />
        </div>
        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={onClose}
            className="bg-gray-400 px-4 py-2 rounded-md text-white cursor-pointer hover:brightness-80"
          >
            Cancel
          </button>
          <button
            onClick={handleCrop}
            className="bg-main-clr px-4 py-2 rounded-md text-white cursor-pointer hover:brightness-80"
          >
            Crop
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageCropperModal;
