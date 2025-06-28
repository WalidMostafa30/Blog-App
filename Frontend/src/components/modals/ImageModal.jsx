import { useDispatch, useSelector } from "react-redux";
import ModalContainer from "./ModalContainer";
import { closeModals } from "../../store/modals/modalsSlice";

const ImageModal = () => {
  const { showImageModal } = useSelector((state) => state.modals);
  const { image } = showImageModal.data;

  const dispatch = useDispatch();

  const onClose = () => {
    dispatch(closeModals());
  };
  return (
    <ModalContainer onClose={onClose}>
      <div
        className="max-w-full max-h-full relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-4 right-4 text-3xl bg-red-700 text-white 
          flex items-center justify-center w-8 h-8 rounded-full cursor-pointer"
          onClick={onClose}
        >
          &times;
        </button>
        <img src={image} alt="Post" className="w-full h-full object-contain" />
      </div>
    </ModalContainer>
  );
};

export default ImageModal;
