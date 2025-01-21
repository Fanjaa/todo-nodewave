// Reusable custom styles for form inputs
const inputStyle = {
  "& .MuiFormLabel-asterisk": { display: "none" },
  "& .MuiOutlinedInput-root": {
    borderRadius: "10px",
    "& fieldset": { borderColor: "#e0e0e0" },
    "&:hover fieldset": { borderColor: "#bdbdbd" },
    "&.Mui-focused fieldset": {
      borderWidth: "1px",
      borderColor: "#50B5FF",
    },
  },
  "& .MuiInputLabel-root.Mui-focused": { color: "#50B5FF" },
};

export default inputStyle;
