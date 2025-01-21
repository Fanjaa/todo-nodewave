"use client";

import Link from "next/link";
import { useState } from "react";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import inputStyle from "@/styles/inputStyles";

export default function RegisterForm() {
  const [selectedValue, setSelectedValue] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Handle select changes
  const handleChange = (event: SelectChangeEvent<string>) => {
    setSelectedValue(event.target.value);
  };

  // Handle password visibility toggles
  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  // Handle password visibility toggles
  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  return (
    <form className="space-y-4">
      <div className="flex space-x-4 max-sm:flex-wrap max-sm:gap-4 max-sm:space-x-0">
        <div className="w-1/2 max-sm:w-full">
          <TextField
            id="firstName"
            label="First Name"
            type="text"
            variant="outlined"
            fullWidth
            required
            sx={inputStyle}
          />
        </div>
        <div className="w-1/2 max-sm:w-full">
          <TextField
            id="lastName"
            label="Last Name"
            type="text"
            variant="outlined"
            fullWidth
            required
            sx={inputStyle}
          />
        </div>
      </div>
      <div className="flex space-x-4 max-sm:flex-wrap max-sm:space-x-0 max-sm:gap-4">
        <div className="flex gap-4 w-5/12 max-sm:w-full">
          <div className="w-[80px]">
            <TextField
              id="countryNumber"
              type="text"
              variant="outlined"
              defaultValue={"+62"}
              fullWidth
              required
              sx={{
                ...inputStyle, // Menggunakan gaya reusable dari inputStyle
                "& .MuiOutlinedInput-root": {
                  ...inputStyle["& .MuiOutlinedInput-root"], // Menyalin gaya dari inputStyle untuk MuiOutlinedInput-root
                  color: "#50B5FF", // Menambahkan warna teks
                },
              }}
            />
          </div>
          <div className="w-full">
            <TextField
              id="phoneNumber"
              label="Phone Number"
              type="text"
              variant="outlined"
              fullWidth
              required
              sx={inputStyle}
            />
          </div>
        </div>
        <div className="w-7/12 max-sm:w-full">
          <FormControl fullWidth variant="outlined" sx={inputStyle}>
            <InputLabel id="select-label">Select Option</InputLabel>
            <Select
              labelId="select-label"
              value={selectedValue}
              onChange={handleChange}
              label="Your Country"
            >
              <MenuItem value="option1">Indonesia</MenuItem>
              <MenuItem value="option2">Singapore</MenuItem>
              <MenuItem value="option3">United States</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
      <div>
        <TextField
          id="mailAddress"
          label="Mail Address"
          type="email"
          variant="outlined"
          fullWidth
          required
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">@squareteam.com</InputAdornment>
              ),
            },
          }}
          sx={inputStyle}
        />
      </div>
      <div className="flex space-x-4 max-sm:flex-wrap max-sm:gap-4 max-sm:space-x-0">
        <div className="w-1/2 relative max-sm:w-full">
          <TextField
            id="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            variant="outlined"
            fullWidth
            required
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPassword}
                      edge="end"
                      aria-label="toggle password visibility"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
            sx={inputStyle}
          />
        </div>
        <div className="w-1/2 relative max-sm:w-full">
          <TextField
            id="confirmPassword"
            label="Confirm Password"
            type={showConfirmPassword ? "text" : "password"}
            variant="outlined"
            fullWidth
            required
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowConfirmPassword}
                      edge="end"
                      aria-label="toggle password visibility"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
            sx={inputStyle}
          />
        </div>
      </div>
      <div className="w-full">
        <p className="font-roboto text-sm py-2 text-fontRegister">
          Tell us about yourself
        </p>
        <TextField
          minRows={3}
          placeholder="Hello my name..."
          multiline
          variant="outlined"
          sx={{
            ...inputStyle,
            width: "100%",
          }}
        />
      </div>
      <div className="flex space-x-4 pt-8 ">
        <Link
          href="/login"
          className="w-1/3 py-4 px-4 rounded-xl text-sm text-center font-medium font-poppins text-[#696974] bg-[#F1F1F5] hover:bg-gray-200 "
        >
          Login
        </Link>

        <button
          type="submit"
          className="w-2/3 text-center py-4 px-4 rounded-xl shadow-sm text-sm font-medium font-poppins text-white bg-blueButton hover:bg-blueCustom "
        >
          Register
        </button>
      </div>
    </form>
  );
}
