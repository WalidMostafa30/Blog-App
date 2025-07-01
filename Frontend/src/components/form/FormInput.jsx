const FormInput = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  onBlur,
  error,
  touched,
  options,
}) => {
  if (type === "select") {
    return (
      <div>
        <label className="block mb-1 text-lg">{label}</label>
        <select
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className={`w-full text-lg font-sans p-2 border border-main-clr rounded-md outline-main-clr cursor-pointer ${
            touched && error ? "border-red-600" : ""
          }`}
        >
          {options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {touched && error && (
          <p className="text-red-600 text-sm mt-1">{error}</p>
        )}
      </div>
    );
  }

  if (type === "textarea") {
    return (
      <div>
        <label className="block mb-1 text-lg">{label}</label>
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className={`w-full min-h-36 max-h-36 text-lg font-sans p-2 border border-main-clr rounded-md outline-main-clr ${
            touched && error ? "border-red-600" : ""
          }`}
          rows={4}
        />
        {touched && error && (
          <p className="text-red-600 text-sm mt-1">{error}</p>
        )}
      </div>
    );
  }

  return (
    <div>
      <label className="block mb-1 text-lg">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className={`w-full text-lg font-sans p-2 border border-main-clr rounded-md outline-main-clr ${
          touched && error ? "border-red-600" : ""
        }`}
      />
      {touched && error && <p className="text-red-600 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default FormInput;
