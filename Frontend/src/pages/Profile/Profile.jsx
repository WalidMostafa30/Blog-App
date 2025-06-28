import { useEffect, useState } from "react";
import profileImg from "../../assets/images/user-avatar.png";
import { TbEdit } from "react-icons/tb";
import { FaImage } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { HiDotsVertical } from "react-icons/hi";
import GlobalTitle from "../../components/layout/GlobalTitle/GlobalTitle";
import PostList from "../../components/post/PostList/PostList";
import DropDown from "../../components/common/DropDown/DropDown";
import { useDispatch, useSelector } from "react-redux";
import {
  actDeleteProfile,
  actGetProfile,
} from "../../store/profile/profileActions";
import { useNavigate, useParams } from "react-router-dom";
import { cleanProfile } from "../../store/profile/profileSlice";
import Loading from "../../components/layout/Loading/Loading";
import Error from "../../components/layout/Error/Error";
import {
  openShowImageModal,
  openUpdateImageModal,
  openUpdateProfileModal,
} from "../../store/modals/modalsSlice";
import Swal from "sweetalert2";
import { authLogout } from "../../store/auth/authSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userId } = useParams();
  const { user } = useSelector((state) => state.auth);
  const { profile, loading, error } = useSelector((state) => state.profile);

  const [profileMenu, setProfileMenu] = useState(false);

  const handleDeleteProfile = async () => {
    const result = await Swal.fire({
      title: "Delete Profile",
      text: "Are you sure you want to delete your profile? This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await dispatch(actDeleteProfile(user._id)).unwrap();
        dispatch(authLogout());
        navigate("/");
        Swal.fire("Deleted!", "Your profile has been deleted.", "success");
        setProfileMenu(false);
      } catch (error) {
        console.log(error);
        Swal.fire("Error", error || "Something went wrong", "error");
      }
    }
  };

  const handleUpdateImgModal = () => {
    dispatch(openUpdateImageModal({ action: "updateProfileImage" }));
    setProfileMenu(false);
  };

  const handleUpdateProfileModal = () => {
    dispatch(openUpdateProfileModal());
    setProfileMenu(false);
  };

  useEffect(() => {
    dispatch(actGetProfile(userId));
    return () => dispatch(cleanProfile());
  }, [userId, dispatch]);

  const handleOpenImageModal = () => {
    dispatch(openShowImageModal({ image: profile?.profilePhoto?.url }));
  };

  if (loading) return <Loading />;

  if (error) return <Error />;

  return (
    <section className="mySection">
      <div className="h-60 flex flex-col items-center gap-4 p-4 bg-gradient-to-bl from-main-clr to-black relative mb-10 lg:mb-20">
        <div className="absolute top-30 start-3 lg:top-20 lg:start-10 flex items-center gap-4">
          <span
            className="w-40 h-40 lg:w-60 lg:h-60 rounded-full overflow-hidden border-4 border-white bg-white cursor-pointer"
            onClick={handleOpenImageModal}
          >
            <img
              src={profile?.profilePhoto?.url || profileImg}
              alt={profile?.username + " profile photo"}
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </span>

          <h3 className="text-2xl lg:text-5xl font-bold text-white capitalize">
            {profile?.username}
          </h3>
        </div>

        {user?._id === profile?._id && (
          <div className="absolute top-2 end-2">
            <button
              onClick={() => setProfileMenu((prev) => !prev)}
              className="text-3xl bg-white text-main-clr w-10 h-10 flex items-center justify-center rounded-full cursor-pointer"
            >
              <HiDotsVertical />
            </button>

            {profileMenu && (
              <DropDown
                onClose={() => setProfileMenu(false)}
                className="absolute w-62 flex flex-col gap-1 p-2 top-[calc(100%+15px)] end-0 bg-bg-clr shadow-lg shadow-main-clr/50 rounded-lg overflow-hidden"
              >
                <button className="myBtn" onClick={handleUpdateProfileModal}>
                  <span className="text-3xl">
                    <TbEdit />
                  </span>
                  Update Profile
                </button>
                <button className="myBtn" onClick={handleUpdateImgModal}>
                  <span className="text-3xl">
                    <FaImage />
                  </span>
                  Update Photo
                </button>
                <button className="myBtn danger" onClick={handleDeleteProfile}>
                  <span className="text-3xl">
                    <MdDeleteOutline />
                  </span>
                  Delete Profile
                </button>
              </DropDown>
            )}
          </div>
        )}
      </div>

      <div className="p-4 m-4 shadow-lg shadow-main-clr/50 rounded-lg">
        <p className="text-xl text-main-clr font-bold">{profile?.bio}</p>

        <p className="text-lg font-bold mt-2">
          Date joined:{" "}
          <span className="text-main-clr">
            {new Date(profile?.createdAt).toDateString()}
          </span>
        </p>
      </div>

      <div className="p-4">
        <GlobalTitle title={`${profile?.username} Posts`} />

        {!profile?.posts || profile.posts.length === 0 ? (
          <Error errorType={"empty"} errorMsg={"No posts yet"} />
        ) : (
          <PostList posts={profile.posts} showCategories={false} />
        )}
      </div>
    </section>
  );
};

export default Profile;
