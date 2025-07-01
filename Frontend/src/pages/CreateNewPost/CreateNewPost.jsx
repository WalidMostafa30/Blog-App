import { useFormik } from "formik";
import * as Yup from "yup";
import { IoCamera, IoClose } from "react-icons/io5";
import FormInput from "../../components/form/FormInput";
import FormContainer from "../../components/form/FormContainer";
import { useDispatch, useSelector } from "react-redux";
import { actCreateNewPost } from "../../store/posts/postsActions";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import FormBtn from "../../components/form/FormBtn";
import { useEffect } from "react";
import { actGetCategories } from "../../store/categories/categoriesActions";
import { cleanCategories } from "../../store/categories/categoriesSlice";
import { toast } from "react-toastify";

const CreateNewPost = () => {
  const { categories } = useSelector((state) => state.categories);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actGetCategories());
    return () => dispatch(cleanCategories());
  }, [dispatch]);

  const navigate = useNavigate();
  const { updateLoading, updateError } = useSelector((state) => state.posts);

  const formik = useFormik({
    initialValues: {
      title: "",
      category: "",
      description: "",
      image: null,
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .trim()
        .min(3, "Title must be at least 3 characters")
        .required("Title is required"),
      category: Yup.string()
        .trim()
        .required("Category is required")
        .notOneOf([""], "Please select a category"),
      description: Yup.string()
        .trim()
        .min(5, "Description must be at least 5 characters")
        .required("Description is required"),
      image: Yup.mixed()
        .required("Image is required")
        .test("fileSize", "Image size must be less than 1MB", (value) => {
          return value ? value.size <= 1024 * 1024 : true;
        }),
    }),
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("category", values.category);
      formData.append("description", values.description);
      formData.append("image", values.image);

      try {
        await dispatch(actCreateNewPost(values)).unwrap();

        toast.success("Post created successfully");

        navigate("/");
      } catch (err) {
        console.log(err);
        Swal.fire({
          title: "Create Failed",
          text: updateError || err || "Something went wrong. Please try again.",
          icon: "error",
        });
      }
    },
  });

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      formik.setFieldValue("image", file);
    }
  };

  return (
    <FormContainer
      title="Create Post"
      submitHandler={formik.handleSubmit}
      loading={updateLoading}
    >
      <FormInput
        label="Title"
        type="text"
        name="title"
        value={formik.values.title}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.errors.title}
        touched={formik.touched.title}
      />

      <FormInput
        label="Category"
        type="select"
        name="category"
        value={formik.values.category}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.errors.category}
        touched={formik.touched.category}
        options={[
          { value: "", label: "Select category" },
          ...categories.map((category) => ({
            value: category.title,
            label: category.title,
          })),
        ]}
      />

      <FormInput
        label="Description"
        type="textarea"
        name="description"
        value={formik.values.description}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.errors.description}
        touched={formik.touched.description}
      />

      {/* Image Upload */}
      <div>
        <div className="w-full flex items-center justify-evenly gap-2">
          <input
            type="file"
            accept="image/*"
            name="image"
            id="image"
            onChange={handleImageChange}
            className="hidden"
          />

          <label htmlFor="image" className="myBtn active w-fit">
            Image
            <span className="text-2xl">
              <IoCamera />
            </span>
          </label>

          {formik.values.image ? (
            <span className="w-28 h-28 relative">
              <img
                src={URL.createObjectURL(formik.values.image)}
                alt="Preview"
                className="w-full h-full object-cover rounded-xl"
              />

              <span
                onClick={() => formik.setFieldValue("image", null)}
                className="absolute top-[-10px] right-[-10px] w-6 h-6 rounded-full flex items-center justify-center bg-red-600 text-white text-3xl cursor-pointer"
              >
                <IoClose />
              </span>
            </span>
          ) : (
            <p className="text-lg font-semibold">No image selected</p>
          )}
        </div>

        {formik.touched.image && formik.errors.image && (
          <p className="text-red-600 text-sm mt-1">{formik.errors.image}</p>
        )}
      </div>

      <FormBtn loading={updateLoading} title="Create Post" />
    </FormContainer>
  );
};

export default CreateNewPost;
