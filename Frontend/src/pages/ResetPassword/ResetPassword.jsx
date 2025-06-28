import { useFormik } from "formik";
import * as Yup from "yup";
import FormInput from "../../components/form/FormInput";
import FormContainer from "../../components/form/FormContainer";

const ResetPassword = () => {
  const formik = useFormik({
    initialValues: {
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      newPassword: Yup.string()
        .trim()
        .required("Password is required")
        .min(6, "Must be at least 6 characters"),
      confirmPassword: Yup.string()
        .trim()
        .oneOf([Yup.ref("newPassword")], "Passwords must match")
        .required("Confirm password is required"),
    }),
    onSubmit: (values) => {
      // eslint-disable-next-line no-unused-vars
      const { confirmPassword, ...resetData } = values;
      console.log("Resetting password to:", {
        newPassword: resetData.newPassword,
      });
      // Trigger actual reset password API call here
    },
  });

  return (
    <FormContainer
      title="Reset Password"
      msg="Please enter your new password below."
      submitHandler={formik.handleSubmit}
    >
      <FormInput
        label="New Password"
        type="password"
        name="newPassword"
        value={formik.values.newPassword}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.errors.newPassword}
        touched={formik.touched.newPassword}
      />

      <FormInput
        label="Confirm Password"
        type="password"
        name="confirmPassword"
        value={formik.values.confirmPassword}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.errors.confirmPassword}
        touched={formik.touched.confirmPassword}
      />

      <button type="submit" className="myBtn w-full justify-center">
        Reset Password
      </button>
    </FormContainer>
  );
};

export default ResetPassword;
