import { useFormik } from "formik";
import * as Yup from "yup";
import FormWrapper from "../form/FormWrapper";
import FormInput from "../form/FormInput";
import ModalContainer from "./ModalContainer";
import FormBtn from "../form/FormBtn";
import { useDispatch, useSelector } from "react-redux";
import { closeModals } from "../../store/modals/modalsSlice";
import Swal from "sweetalert2";
import { actUpdatePost } from "../../store/posts/postsActions";
import { toast } from "react-toastify";

const UpdatePostModal = () => {
  const { updateLoading, updateError } = useSelector((state) => state.posts);

  const { updatePostModal } = useSelector((state) => state.modals);
  const { id, initialTitle, initialDescription } = updatePostModal.data;

  const dispatch = useDispatch();

  const onClose = () => {
    dispatch(closeModals());
  };

  const formik = useFormik({
    initialValues: {
      title: initialTitle || "",
      description: initialDescription || "",
    },
    validationSchema: Yup.object({
      title: Yup.string().trim().min(3, "Title must be at least 3 characters"),
      description: Yup.string()
        .trim()
        .min(10, "Description must be at least 10 characters"),
    }),
    onSubmit: async (values) => {
      const filteredValues = Object.fromEntries(
        // eslint-disable-next-line no-unused-vars
        Object.entries(values).filter(([key, value]) => value.trim() !== "")
      );
      try {
        await dispatch(
          actUpdatePost({ postId: id, formData: filteredValues })
        ).unwrap();

        toast.success("Post updated successfully");

        onClose();
      } catch (err) {
        console.log(err);
        Swal.fire({
          title: "Update Failed",
          text: updateError || err || "Something went wrong. Please try again.",
          icon: "error",
        });
        onClose();
      }
    },
  });

  const isFormChanged = Object.keys(formik.initialValues).some(
    (key) => formik.values[key].trim() !== formik.initialValues[key]
  );

  return (
    <ModalContainer onClose={onClose}>
      <FormWrapper
        title="Update Post"
        submitHandler={formik.handleSubmit}
        loading={updateLoading}
      >
        <FormInput
          label="Title"
          name="title"
          value={formik.values.title}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.title}
          touched={formik.touched.title}
        />

        <FormInput
          type="textarea"
          label="Description"
          name="description"
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.description}
          touched={formik.touched.description}
        />

        <div className="flex justify-end gap-2">
          {isFormChanged && formik.isValid && (
            <FormBtn loading={updateLoading} title="Update" />
          )}
          <button type="button" onClick={onClose} className="myBtn danger">
            Cancel
          </button>
        </div>
      </FormWrapper>
    </ModalContainer>
  );
};

export default UpdatePostModal;
