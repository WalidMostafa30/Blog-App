import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import FormInput from "../../components/form/FormInput";
import FormBtn from "../../components/form/FormBtn";
import { useDispatch, useSelector } from "react-redux";
import { actAuthLogin } from "../../store/auth/authActions";
import Swal from "sweetalert2";
import FormContainer from "../../components/form/FormContainer";

const Login = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .trim()
        .email("Invalid email")
        .required("Email is required"),
      password: Yup.string()
        .trim()
        .required("Password is required")
        .min(8, "Must be at least 8 characters"),
    }),
    onSubmit: async (values) => {
      try {
        const loggedInUser = await dispatch(actAuthLogin(values)).unwrap();

        await Swal.fire({
          title: `Welcome ${loggedInUser.username}`,
          text: "You logged in successfully",
          icon: "success",
        });

        navigate("/");
      } catch (err) {
        Swal.fire({
          title: "Login Failed",
          text:
            error || err?.message || "Something went wrong. Please try again.",
          icon: "error",
        });
      }
    },
  });

  return (
    <FormContainer
      title="Login"
      submitHandler={formik.handleSubmit}
      loading={loading}
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

      <FormBtn title="Login" loading={loading} />

      <p className="text-lg text-center">
        Did you forget your password?{" "}
        <span
          onClick={() => navigate("/forgot-password")}
          className="text-blue-700 hover:underline cursor-pointer"
        >
          Forgot Password
        </span>
      </p>

      <p className="text-lg text-center">
        Don&apos;t have an account?{" "}
        <span
          onClick={() => navigate("/register")}
          className="text-blue-700 hover:underline cursor-pointer"
        >
          Register
        </span>
      </p>
    </FormContainer>
  );
};

export default Login;
