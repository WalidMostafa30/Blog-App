import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showImageModal: { status: false, data: {} },
  updateImgModal: { status: false, data: {} },
  updateProfileModal: { status: false, data: {} },
  updatePostModal: { status: false, data: {} },
  updateCommentModal: { status: false, data: {} },
};

const modalsSlice = createSlice({
  name: "modals",
  initialState,
  reducers: {
    openShowImageModal: (state, action) => {
      state.showImageModal.status = true;
      state.showImageModal.data = action.payload;
    },
    openUpdateImageModal: (state, action) => {
      state.updateImgModal.status = true;
      state.updateImgModal.data = action.payload;
    },
    openUpdateProfileModal: (state, action) => {
      state.updateProfileModal.status = true;
      state.updateProfileModal.data = action.payload;
    },
    openUpdatePostModal: (state, action) => {
      state.updatePostModal.status = true;
      state.updatePostModal.data = action.payload;
    },
    openUpdateCommentModal: (state, action) => {
      state.updateCommentModal.status = true;
      state.updateCommentModal.data = action.payload;
    },

    closeModals: (state) => {
      state.showImageModal.status = false;
      state.showImageModal.data = {};
      state.updateImgModal.status = false;
      state.updateImgModal.data = {};
      state.updateProfileModal.status = false;
      state.updateProfileModal.data = {};
      state.updatePostModal.status = false;
      state.updatePostModal.data = {};
      state.updateCommentModal.status = false;
      state.updateCommentModal.data = {};
    },
  },
});

export const {
  closeModals,
  openShowImageModal,
  openUpdateImageModal,
  openUpdateProfileModal,
  openUpdatePostModal,
  openUpdateCommentModal,
} = modalsSlice.actions;
export default modalsSlice.reducer;
