import "./SkeletonLoading.css";

const SkeletonLoading = () => {
  return (
    <div className="skeleton-container mySection">
      <div
        className="skeleton"
        style={{ width: "80%", height: "30px", marginBottom: "10px" }}
      ></div>
      <div
        className="skeleton"
        style={{ width: "60%", height: "20px", marginBottom: "10px" }}
      ></div>
      <div
        className="skeleton"
        style={{ width: "90%", height: "20px", marginBottom: "10px" }}
      ></div>
    </div>
  );
};

export default SkeletonLoading;
