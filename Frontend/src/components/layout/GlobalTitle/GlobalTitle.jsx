const GlobalTitle = ({ title }) => {
  return (
    <h2 className="text-2xl lg:text-4xl text-main-clr font-bold capitalize mx-auto w-fit mb-4 lg:mb-6 py-2 px-4 rounded-full bg-gradient-to-l from-main-clr/30 to-white">
      {title}
    </h2>
  );
};

export default GlobalTitle;
