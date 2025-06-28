import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { MdCameraAlt } from "react-icons/md";
import FormWrapper from "../form/FormWrapper";
import ModalContainer from "./ModalContainer";
import { useDispatch, useSelector } from "react-redux";
import FormBtn from "../form/FormBtn";
import Swal from "sweetalert2";
import { actUpdatePostPhoto } from "../../store/posts/postsActions";
import { actUpdateProfilePhoto } from "../../store/profile/profileActions";
import { closeModals } from "../../store/modals/modalsSlice";

const UpdateImgModal = () => {
  const posts = useSelector((state) => state.posts);
  const profile = useSelector((state) => state.profile);

  const { updateImgModal } = useSelector((state) => state.modals);
  const { action, id } = updateImgModal.data;

  const { updateLoading, updateError } =
    action === "updatePostImage" ? posts : profile;

  const [image, setImage] = useState(null);
  const [err, setErr] = useState(updateError ? updateError : "");
  const dispatch = useDispatch();

  const onClose = () => {
    dispatch(closeModals());
  };

  const MAX_SIZE = 1 * 1024 * 1024; // 1MB

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > MAX_SIZE) {
        setErr("Image must be less than 1MB");
        setImage(null);
      } else {
        setImage(file);
        setErr("");
      }
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!image) return;

    const formData = new FormData();
    formData.append("image", image);

    try {
      if (action === "updatePostImage") {
        await dispatch(actUpdatePostPhoto({ postId: id, formData })).unwrap();
      } else {
        await dispatch(actUpdateProfilePhoto(formData)).unwrap();
      }
      onClose();
      Swal.fire({
        title: "Update Success",
        text: "Image updated successfully",
        icon: "success",
      });
    } catch (err) {
      console.log(err);
      Swal.fire({
        title: "Update Failed",
        text: updateError || err || "Something went wrong. Please try again.",
        icon: "error",
      });
    }
  };

  return (
    <ModalContainer onClose={onClose}>
      <FormWrapper
        title="Update Image"
        submitHandler={submitHandler}
        loading={updateLoading}
      >
        {image ? (
          <div className="w-full aspect-square relative">
            <img
              src={URL.createObjectURL(image)}
              alt="preview"
              className="w-full h-full object-cover rounded-md"
            />
            <span
              onClick={() => {
                setImage(null);
                setErr("");
              }}
              className="absolute top-[-8px] end-[-8px] cursor-pointer w-8 h-8 flex items-center justify-center rounded-full bg-red-600 text-white text-3xl"
            >
              <IoClose />
            </span>
          </div>
        ) : (
          <div>
            <input
              onChange={handleImageChange}
              id="profile-img"
              type="file"
              className="hidden"
              accept="image/*"
            />
            <label htmlFor="profile-img" className="myBtn light w-fit mx-auto">
              <span className="text-2xl">
                <MdCameraAlt />
              </span>
              Upload Image
            </label>
            {err && <p className="text-red-600 text-center mt-2">{err}</p>}
          </div>
        )}

        <div className="flex justify-end gap-2">
          {image && <FormBtn loading={updateLoading} title="Update" />}
          <button type="button" onClick={onClose} className="myBtn danger">
            Cancel
          </button>
        </div>
      </FormWrapper>
    </ModalContainer>
  );
};

export default UpdateImgModal;
