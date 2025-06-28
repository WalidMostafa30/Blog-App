import FormWrapper from "./FormWrapper";

const FormContainer = ({ msg, title, submitHandler, children, loading }) => (
  <section className="myContainer mySection flex flex-col items-center justify-center p-4">
    {msg && (
      <p className="text-center text-lg text-main-clr font-semibold p-4 mb-4 w-full max-w-lg bg-white rounded-xl border-2">
        {msg}
      </p>
    )}

    <FormWrapper
      title={title}
      submitHandler={submitHandler}
      loading={loading}
      children={children}
    />
  </section>
);

export default FormContainer;
