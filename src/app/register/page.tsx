"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextareaAutosize,
  TextField,
} from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export default function RegisterPage() {
  const { isAuthenticated, loading } = useAuth();
  const [selectedValue, setSelectedValue] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const router = useRouter();

  const handleChange = (event: SelectChangeEvent<string>) => {
    setSelectedValue(event.target.value);
  };

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword((prev) => !prev);
  };
  
  // Redirect to /todo if the user is already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/"); // Redirect to /todo or another page if the user is already logged in
    }
  }, [isAuthenticated, router]);

  if (loading || isAuthenticated) return null; // Jangan render dulu

  return (
    <div className="flex-1 min-h-screen items-center p-4 bg-two-color">
      <div>
        <h1 className="text-[56px] font-poppins font-bold text-center mb-4 text-fontRegister">
          Register
        </h1>
        <p className="text-center font-roboto text-gray-500 mb-8">
          Let's Sign up first for enter into Square Website. Uh She Up!
        </p>
      </div>
      <div className="w-full max-w-lg mx-auto bg-white rounded-xl shadow-loginForm overflow-hidden md:max-w-2xl">
        <div className="p-8">
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
                  sx={{
                    "& .MuiFormLabel-asterisk": {
                      display: "none", // Menyembunyikan bintang
                    },
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "10px", // Set border radius
                      "& fieldset": {
                        borderColor: "#e0e0e0", // Warna border default
                      },
                      "&:hover fieldset": {
                        borderColor: "#bdbdbd", // Warna border saat hover
                      },
                      "&.Mui-focused fieldset": {
                        borderWidth: "1px", // Border saat focus juga tipis
                        borderColor: "#50B5FF", // Ubah ke warna yang diinginkan saat focus (contoh: merah)
                      },
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: "#50B5FF",
                    },
                  }}
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
                  sx={{
                    "& .MuiFormLabel-asterisk": {
                      display: "none", // Menyembunyikan bintang
                    },
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "10px", // Set border radius
                      "& fieldset": {
                        borderColor: "#e0e0e0", // Warna border default
                      },
                      "&:hover fieldset": {
                        borderColor: "#bdbdbd", // Warna border saat hover
                      },
                      "&.Mui-focused fieldset": {
                        borderWidth: "1px", // Border saat focus juga tipis
                        borderColor: "#50B5FF", // Ubah ke warna yang diinginkan saat focus (contoh: merah)
                      },
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: "#50B5FF",
                    },
                  }}
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
                      "& .MuiFormLabel-asterisk": {
                          display: "none", // Menyembunyikan bintang
                        },
                        "& .MuiOutlinedInput-root": {
                        color: '#50B5FF',
                      borderRadius: "10px", // Set border radius
                      "& fieldset": {
                        borderColor: "#50B5FF", // Warna border default
                      },
                      "&:hover fieldset": {
                        borderColor: "#bdbdbd", // Warna border saat hover
                      },
                      "&.Mui-focused fieldset": {
                        borderWidth: "1px", // Border saat focus juga tipis
                        borderColor: "#50B5FF", // Ubah ke warna yang diinginkan saat focus (contoh: merah)
                      },
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: "#50B5FF",
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
                  sx={{
                    "& .MuiFormLabel-asterisk": {
                      display: "none", // Menyembunyikan bintang
                    },
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "10px", // Set border radius
                      "& fieldset": {
                        borderColor: "#e0e0e0", // Warna border default
                      },
                      "&:hover fieldset": {
                        borderColor: "#bdbdbd", // Warna border saat hover
                      },
                      "&.Mui-focused fieldset": {
                        borderWidth: "1px", // Border saat focus juga tipis
                        borderColor: "#50B5FF", // Ubah ke warna yang diinginkan saat focus (contoh: merah)
                      },
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: "#50B5FF",
                    },
                  }}
                />
              </div>
              </div>
              <div className="w-7/12 max-sm:w-full">
                <FormControl fullWidth variant="outlined"
                                    sx={{
                                        "& .MuiFormLabel-asterisk": {
                                          display: "none", // Menyembunyikan bintang
                                        },
                                        "& .MuiOutlinedInput-root": {
                                          borderRadius: "10px", // Set border radius
                                          "& fieldset": {
                                            borderColor: "#e0e0e0", // Warna border default
                                          },
                                          "&:hover fieldset": {
                                            borderColor: "#bdbdbd", // Warna border saat hover
                                          },
                                          "&.Mui-focused fieldset": {
                                            borderWidth: "1px", // Border saat focus juga tipis
                                            borderColor: "#50B5FF", // Ubah ke warna yang diinginkan saat focus (contoh: merah)
                                          },
                                        },
                                        "& .MuiInputLabel-root.Mui-focused": {
                                          color: "#50B5FF",
                                        },
                                      }}
                                    >
                  
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
                        <InputAdornment position="end">
                          @squareteam.com
                        </InputAdornment>
                      ),
                    },
                  }}
                sx={{
                  "& .MuiFormLabel-asterisk": {
                    display: "none", // Menyembunyikan bintang
                  },
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "10px", // Set border radius
                    "& fieldset": {
                      borderColor: "#e0e0e0", // Warna border default
                    },
                    "&:hover fieldset": {
                      borderColor: "#bdbdbd", // Warna border saat hover
                    },
                    "&.Mui-focused fieldset": {
                      borderWidth: "1px", // Border saat focus juga tipis
                      borderColor: "#50B5FF", // Ubah ke warna yang diinginkan saat focus (contoh: merah)
                    },
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "#50B5FF",
                  },
                }}
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
                  sx={{
                    "& .MuiFormLabel-asterisk": {
                      display: "none", // Menyembunyikan bintang
                    },
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "10px", // Set border radius
                      "& fieldset": {
                        borderColor: "#e0e0e0", // Warna border default
                      },
                      "&:hover fieldset": {
                        borderColor: "#bdbdbd", // Warna border saat hover
                      },
                      "&.Mui-focused fieldset": {
                        borderWidth: "1px", // Border saat focus juga tipis
                        borderColor: "#50B5FF", // Ubah ke warna yang diinginkan saat focus (contoh: merah)
                      },
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: "#50B5FF",
                    },
                  }}
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
                  sx={{
                    "& .MuiFormLabel-asterisk": {
                      display: "none", // Menyembunyikan bintang
                    },
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "10px", // Set border radius
                      "& fieldset": {
                        borderColor: "#e0e0e0", // Warna border default
                      },
                      "&:hover fieldset": {
                        borderColor: "#bdbdbd", // Warna border saat hover
                      },
                      "&.Mui-focused fieldset": {
                        borderWidth: "1px", // Border saat focus juga tipis
                        borderColor: "#50B5FF", // Ubah ke warna yang diinginkan saat focus (contoh: merah)
                      },
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: "#50B5FF",
                    },
                  }}
                />
              </div>
            </div>
            <div className="w-full">
                <p className="font-roboto text-sm py-2 text-fontRegister">Tell us about yourself</p>
              <TextField
                minRows={3}
                placeholder="Hello my name..."
                multiline
                variant="outlined"
                sx={{
                  width: "100%",
                  "& .MuiFormLabel-asterisk": {
                    display: "none", // Menyembunyikan bintang
                  },
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "10px", // Set border radius
                    "& fieldset": {
                      borderColor: "#e0e0e0", // Warna border default
                    },
                    "&:hover fieldset": {
                      borderColor: "#bdbdbd", // Warna border saat hover
                    },
                    "&.Mui-focused fieldset": {
                      borderWidth: "1px", // Border saat focus juga tipis
                      borderColor: "#50B5FF", // Ubah ke warna yang diinginkan saat focus (contoh: biru)
                    },
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "#50B5FF", // Warna label saat fokus
                  },
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
        </div>
      </div>
    </div>
  );
}
