import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import FormInput from "../../components/form/FormInput";
import FormContainer from "../../components/form/FormContainer";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .trim()
        .email("Invalid email")
        .required("Email is required"),
    }),
    onSubmit: (values) => {
      console.log("Sending reset link to:", { email: values.email });
      navigate("/reset-password");
    },
  });

  return (
    <FormContainer
      title="Forgot Password"
      msg="Enter your email address and we'll send you a link to reset your password."
      submitHandler={formik.handleSubmit}
    >
      <FormInput
        label="Email"
        type="email"
        name="email"
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.errors.email}
        touched={formik.touched.email}
      />

      <button type="submit" className="myBtn w-full justify-center">
        Send Reset Link
      </button>
    </FormContainer>
  );
};

export default ForgotPassword;
