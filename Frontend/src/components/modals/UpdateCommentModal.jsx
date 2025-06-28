import { useFormik } from "formik";
import * as Yup from "yup";
import FormInput from "../form/FormInput";
import ModalContainer from "./ModalContainer";
import FormWrapper from "../form/FormWrapper";
import FormBtn from "../form/FormBtn";
import { useDispatch, useSelector } from "react-redux";
import { actUpdateComment } from "../../store/comments/commentsActions";
import { closeModals } from "../../store/modals/modalsSlice";
import Swal from "sweetalert2";

const UpdateCommentModal = () => {
  const { updateLoading, updateError } = useSelector((state) => state.comments);

  const { updateCommentModal } = useSelector((state) => state.modals);
  const { commentId, initialComment } = updateCommentModal.data;

  const dispatch = useDispatch();

  const onClose = () => {
    dispatch(closeModals());
  };

  const formik = useFormik({
    initialValues: {
      comment: initialComment || "",
    },
    validationSchema: Yup.object({
      comment: Yup.string()
        .trim()
        .min(3, "Comment must be at least 3 characters"),
    }),
    onSubmit: async (values) => {
      try {
        await dispatch(
          actUpdateComment({
            text: values.comment,
            commentId,
          })
        ).unwrap();

        await Swal.fire({
          title: "Update Success",
          text: "Comment updated successfully",
          icon: "success",
        });

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

  return (
    <ModalContainer onClose={onClose}>
      <FormWrapper
        title="Update Comment"
        submitHandler={formik.handleSubmit}
        loading={updateLoading}
      >
        <FormInput
          type="textarea"
          label="Comment"
          name="comment"
          value={formik.values.comment}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.comment}
          touched={formik.touched.comment}
        />

        <div className="flex justify-end gap-2">
          {formik.values.comment.trim() && formik.isValid && (
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

export default UpdateCommentModal;
