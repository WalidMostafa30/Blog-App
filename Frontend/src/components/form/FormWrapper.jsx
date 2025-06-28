const FormWrapper = ({ title, submitHandler, children, loading }) => (
  <div
    onClick={(e) => e.stopPropagation()}
    className="bg-main-clr rounded-xl shadow-lg shadow-main-clr/50 w-full max-w-lg"
  >
    {title && (
      <h2 className="text-3xl font-bold p-4 text-center text-white">{title}</h2>
    )}
    <form
      onSubmit={submitHandler}
      className={`flex flex-col gap-2 p-4 bg-white rounded-xl relative ${
        loading ? "opacity-90 pointer-events-none" : ""
      }`}
    >
      {children}
    </form>
  </div>
);

export default FormWrapper;
