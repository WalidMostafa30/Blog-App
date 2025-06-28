import GlobalTitle from "../../components/layout/GlobalTitle/GlobalTitle";
import { MdDeleteOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  actDeleteCategory,
  actGetCategories,
} from "../../store/categories/categoriesActions";
import { cleanCategories } from "../../store/categories/categoriesSlice";
import CategoriesForm from "../../components/form/CategoriesForm";
import Loading from "../../components/layout/Loading/Loading";
import Error from "../../components/layout/Error/Error";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const DashboardCategories = () => {
  const { categories, loading, error } = useSelector(
    (state) => state.categories
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actGetCategories());
    return () => dispatch(cleanCategories());
  }, [dispatch]);

  const handleDeleteCategory = async (id) => {
    const result = await Swal.fire({
      title: "Delete Category",
      text: "Are you sure you want to delete this category? This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await dispatch(actDeleteCategory(id)).unwrap();
        toast.success(`Category deleted successfully`);
      } catch (error) {
        console.log(error);
        Swal.fire("Error", error || "Something went wrong", "error");
      }
    }
  };

  if (loading) return <Loading />;

  if (error) return <Error errorMsg={error} />;

  return (
    <>
      <GlobalTitle title="Categories" />

      <CategoriesForm />

      {categories.length > 0 ? (
        <div className="space-y-2 max-w-2xl mx-auto">
          {categories.map((category) => (
            <div key={category._id} className="dashboardCard">
              <h3 className="text-xl font-semibold capitalize">
                {category.title}
              </h3>
              <button
                className="w-9 h-9 rounded-full flex items-center justify-center 
                          text-2xl text-white bg-red-700 hover:brightness-75 duration-200 cursor-pointer"
                onClick={() => handleDeleteCategory(category?._id)}
              >
                <MdDeleteOutline />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <Error errorType={"empty"} errorMsg="No Categories found." />
      )}
    </>
  );
};

export default DashboardCategories;
