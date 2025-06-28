import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { actGetCategories } from "../../../store/categories/categoriesActions";
import { cleanCategories } from "../../../store/categories/categoriesSlice";
import { NavLink } from "react-router-dom";
import { HiMenuAlt2 } from "react-icons/hi";
import { VscChromeClose } from "react-icons/vsc";

const Category = () => {
  const { categories } = useSelector((state) => state.categories);
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    dispatch(actGetCategories());
    return () => dispatch(cleanCategories());
  }, [dispatch]);

  const categoriesWord = ["C", "a", "t", "e", "g", "o", "r", "i", "e", "s"];

  return (
    <aside className="sticky top-22">
      <button
        onClick={() => setIsOpen(true)}
        className="lg:hidden bg-main-clr text-white text-xl p-2 rounded-md shadow-md shadow-main-clr/50 cursor-pointer"
      >
        <HiMenuAlt2 />
        <p className="flex flex-col font-bold leading-5">
          {categoriesWord.map((word, index) => (
            <span key={index}>{word}</span>
          ))}
        </p>
      </button>

      {/* الخلفية السوداء عند الفتح */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      <div
        className={`
          fixed top-[var(--header-height)] h-[calc(100dvh-var(--header-height))] left-0 w-72 bg-white shadow-lg shadow-main-clr/50 p-4 z-50
          transform transition-transform duration-300 ease-in-out overflow-y-auto
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:static lg:rounded-xl lg:top-22 lg:h-auto lg:text-center
        `}
      >
        <button
          onClick={() => setIsOpen(false)}
          className="lg:hidden bg-main-clr text-white p-2 rounded-md shadow-md cursor-pointer absolute top-2 right-2"
        >
          <VscChromeClose />
        </button>

        <h3 className="text-2xl font-bold mb-2 pb-2 border-b-2 text-center">
          Categories
        </h3>
        <ul className="flex flex-col gap-1 mt-4 text-center">
          <NavLink
            to={`/posts`}
            end
            className="categoryLink"
            onClick={() => setIsOpen(false)}
          >
            All Posts
          </NavLink>
          {categories.map((category) => (
            <NavLink
              to={`/posts/categories/${category.title}`}
              key={category._id}
              className="categoryLink"
              onClick={() => setIsOpen(false)}
            >
              {category.title}
            </NavLink>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Category;
