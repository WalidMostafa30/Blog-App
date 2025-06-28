import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import FormInput from "../../components/form/FormInput";
import { useDispatch, useSelector } from "react-redux";
import { actAuthRegister } from "../../store/auth/authActions";
import Swal from "sweetalert2";
import FormBtn from "../../components/form/FormBtn";
import FormContainer from "../../components/form/FormContainer";

const Register = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .trim()
        .min(3, "Username must be at least 3 characters")
        .required("Username is required"),
      email: Yup.string()
        .trim()
        .email("Invalid email")
        .required("Email is required"),
      password: Yup.string()
        .trim()
        .required("Password is required")
        .min(8, "Must be at least 8 characters"),
      // .min(8, "Must be at least 8 characters")
      // .matches(/[a-z]/, "Must include a lowercase letter")
      // .matches(/[A-Z]/, "Must include an uppercase letter")
      // .matches(/\d/, "Must include a number")
      // .matches(/[@$!%*?&#]/, "Must include a special character"),
      confirmPassword: Yup.string()
        .trim()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Confirm password is required"),
    }),
    onSubmit: async (values) => {
      // eslint-disable-next-line no-unused-vars
      const { confirmPassword, ...dataToLog } = values;

      try {
        await dispatch(actAuthRegister(dataToLog)).unwrap();

        await Swal.fire({
          title: "You Signed up Successfully",
          text: "You can now Log in",
          icon: "success",
        });

        navigate("/login");
      } catch (err) {
        Swal.fire({
          title: "Registration Failed",
          text: error || err || "Something went wrong. Please try again.",
          icon: "error",
        });
      }
    },
  });

  return (
    <FormContainer
      title="Register"
      submitHandler={formik.handleSubmit}
      loading={loading}
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
        label="Email"
        type="email"
        name="email"
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.errors.email}
        touched={formik.touched.email}
      />
      <FormInput
        label="Password"
        type="password"
        name="password"
        value={formik.values.password}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.errors.password}
        touched={formik.touched.password}
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

      <FormBtn title="Register" loading={loading} />

      <p className="text-lg text-center">
        Already have an account?{" "}
        <span
          onClick={() => navigate("/login")}
          className="text-blue-700 hover:underline cursor-pointer"
        >
          Login
        </span>
      </p>
    </FormContainer>
  );
};

export default Register;
