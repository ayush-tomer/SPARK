/* eslint-disable react/prop-types */
const InputField = ({ label, name, type = "text", register, placeholder }) => {
  return (
    <div className="mb-4">
      <label className="block text-xl py-1 font-semibold text-gray-700">
        {label}
      </label>
      <input
        type={type}
        {...register(name, { required: true })}
        className=" p-2 border w-full rounded-md focus:outline-none focus:rin bg-white focus:border-blue-300"
        placeholder={placeholder}
      />
    </div>
  );
};

export default InputField;
