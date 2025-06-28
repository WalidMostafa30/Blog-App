import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import FormBtn from "./FormBtn";
import FormInput from "./FormInput";
import FormWrapper from "./FormWrapper";
import { actCreateNewCategory } from "../../store/categories/categoriesActions";
import { toast } from "react-toastify";

const CategoriesForm = () => {
  const dispatch = useDispatch();
  const { updateLoading, updateError } = useSelector(
    (state) => state.categories
  );

  const formik = useFormik({
    initialValues: {
      category: "",
    },
    validationSchema: Yup.object({
      category: Yup.string().trim().min(2, "Too short"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const newCategory = await dispatch(
          actCreateNewCategory({ title: values.category })
        ).unwrap();

        toast.success(`"${newCategory.title}" added successfully!`);

        resetForm();
      } catch (err) {
        Swal.fire({
          title: "Error",
          text: updateError || err.message || "Failed to add category.",
          icon: "error",
        });
      }
    },
  });

  return (
    <div className="max-w-lg mx-auto mb-4">
      <FormWrapper
        // title="Add New Category"
        submitHandler={formik.handleSubmit}
        loading={updateLoading}
      >
        <FormInput
          type="text"
          name="category"
          placeholder="Category"
          value={formik.values.category}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.category}
          touched={formik.touched.category}
        />

        <FormBtn title="Add Category" loading={updateLoading} />
      </FormWrapper>
    </div>
  );
};

export default CategoriesForm;
