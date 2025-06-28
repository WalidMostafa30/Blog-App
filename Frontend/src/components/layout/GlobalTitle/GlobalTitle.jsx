const GlobalTitle = ({ title }) => {
  return (
    <h2 className="text-2xl lg:text-4xl text-main-clr font-bold capitalize bg-white mx-auto w-fit mb-4 lg:mb-6 p-1 border-y-3 rounded-ee-xl rounded-ss-xl shadow-md shadow-main-clr/50">
      {title}
    </h2>
  );
};

export default GlobalTitle;
