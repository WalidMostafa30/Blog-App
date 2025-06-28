import { useFormik } from "formik";
import * as Yup from "yup";
import FormInput from "../form/FormInput";
import FormWrapper from "../form/FormWrapper";
import ModalContainer from "./ModalContainer";
import FormBtn from "../form/FormBtn";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { actUpdateProfile } from "../../store/profile/profileActions";
import { closeModals } from "../../store/modals/modalsSlice";

const UpdateProfileModal = () => {
  const { updateLoading, updateError } = useSelector((state) => state.profile);

  const dispatch = useDispatch();

  const onClose = () => {
    dispatch(closeModals());
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      bio: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .trim()
        .min(3, "Username must be at least 3 characters"),
      password: Yup.string().trim().min(6, "Must be at least 6 characters"),
      bio: Yup.string().trim(),
    }),
    onSubmit: async (values) => {
      try {
        const filteredValues = Object.fromEntries(
          // eslint-disable-next-line no-unused-vars
          Object.entries(values).filter(([key, value]) => value.trim() !== "")
        );

        await dispatch(actUpdateProfile(filteredValues)).unwrap();
        await Swal.fire({
          title: "Update Success",
          text: "Profile updated successfully",
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
      }
    },
  });

  const isFormChanged = Object.keys(formik.initialValues).some(
    (key) => formik.values[key].trim() !== formik.initialValues[key]
  );

  return (
    <ModalContainer onClose={onClose}>
      <FormWrapper
        title="Update Profile"
        submitHandler={formik.handleSubmit}
        loading={updateLoading}
      >
        <FormInput
          label="Username"
          name="username"
          value={formik.values.username}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.username}
          touched={formik.touched.username}
        />

        <FormInput
          type="password"
          label="Password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.password}
          touched={formik.touched.password}
        />

        <FormInput
          type="textarea"
          label="Bio"
          name="bio"
          value={formik.values.bio}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.bio}
          touched={formik.touched.bio}
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

export default UpdateProfileModal;
