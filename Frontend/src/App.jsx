import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "./components/layout/Header/Header";
import Footer from "./components/layout/Footer/Footer";
import { useSelector } from "react-redux";
import UpdateImgModal from "./components/modals/UpdateImgModal";
import UpdatePostModal from "./components/modals/UpdatePostModal";
import ImageModal from "./components/modals/ImageModal";
import UpdateProfileModal from "./components/modals/UpdateProfileModal";
import UpdateCommentModal from "./components/modals/UpdateCommentModal";
import { ToastContainer } from "react-toastify";

function App() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const {
    updateImgModal,
    updateProfileModal,
    updatePostModal,
    updateCommentModal,
    showImageModal,
  } = useSelector((state) => state.modals);

  return (
    <main>
      <Header />
      <Outlet />
      <Footer />
      <ToastContainer />
      {/* modals */}
      {updateImgModal.status && <UpdateImgModal />}
      {updateProfileModal.status && <UpdateProfileModal />}
      {updatePostModal.status && <UpdatePostModal />}
      {updateCommentModal.status && <UpdateCommentModal />}
      {showImageModal.status && <ImageModal />}
    </main>
  );
}

export default App;
