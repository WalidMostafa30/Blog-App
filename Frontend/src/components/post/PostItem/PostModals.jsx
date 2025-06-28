import UpdateImgModal from "../../modals/UpdateImgModal";
import UpdatePostModal from "../../modals/UpdatePostModal";
import ImageModal from "../../modals/ImageModal";

const PostModals = ({
  post,
  showImageModal,
  setShowImageModal,
}) => (
  <>
    {showImageModal && (
      <ImageModal
        image={post.image.url}
        onClose={() => setShowImageModal(false)}
      />
    )}
  </>
);

export default PostModals;
