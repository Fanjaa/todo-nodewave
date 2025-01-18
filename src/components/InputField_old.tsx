// components/InputField.tsx
type InputFieldProps = {
    label: string;
    type: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  };
  
  const InputField = ({ label, type, value, onChange }: InputFieldProps) => {
    return (
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">{label}</label>
        <input
          type={type}
          value={value}
          onChange={onChange}
          className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
          required
        />
      </div>
    );
  };
  
  export default InputField;
  