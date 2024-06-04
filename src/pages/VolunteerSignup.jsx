import React, { useRef, useState } from "react";
import formimg from "../Images/formimage.png";
import { Link, useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import {
  scrollToTop,
  acadameicYears,
  streams,
  departmentNames,
} from "../utils";
import { FileInput, Input, RadioButton, Select, Button } from "../components";
import { useForm } from "react-hook-form";

import user from "../api/User";
function VolunteerSignup() {
  const [loading, setLoading] = useState(false);
  scrollToTop();
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate()

  const submitForm = async (data) => {
    if (watchPassword !== watchConfirmPassword) {
      alert("Password and Confirm Password does not match");
      return;
    }
    setLoading(true);
    const formData = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: Number(data.phone),
      year: data.year,
      course: data.course,
      rollNo: data.rollNo,
      preference1: data.firstPref,
      preference2: data.secondPref,
      preference3: data.thirdPref,
      partOfO2: data.partofo2,
      collegeID: data.collegeID,
      password: data.password,
    };
    try {
      await user
        .registerVolunteer(formData)
        .then((res) => {
          if (res.data?.statusCode === 200) {
            sessionStorage.setItem("registered" ,true)
            navigate("/registrations/volunteers/success")
          };
          setLoading(false);
        })
        .catch((error) => {
          if (error?.response?.status === 409) alert("User already exist");
          setLoading(false);
        });
    } catch (error) {
      alert("Some error occured")
      setLoading(false);
    }
  };
  const backgroundImageStyle = {
    backgroundImage: `url(${formimg})`,
  };

  //watch
  const watchYear = watch("year", "");
  const watchFirstPref = watch("firstPref", "");
  const watchSecondPref = watch("secondPref", "");
  const watchThirdPref = watch("thirdPref", "");
  const watchPassword = watch("password", "");
  const watchConfirmPassword = watch("confirmPassword", "");

  return (
    <div className="flex min-h-screen ">
      <div
        className={`hidden  lg:block min-h-screen w-1/2 bg-cover bg-center ${
          loading ? "opacity-70" : ""
        }`}
        style={backgroundImageStyle}
      ></div>
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <ClipLoader
          color="#EF4444"
          height={600}
          width={600}
          loading={loading ? true : false}
          className="absolute"
        />
      </div>
      <div
        className={`${
          loading ? "opacity-70" : ""
        } bg-black text-white w-full flex flex-col items-center px-10 py-24 justify-center lg:w-1/2`}
      >
        <div className="flex flex-col gap-2 mb-4">
          <div className="font-black text-3xl lg:text-4xl">Welcome!👋</div>
          <div className="text-md md:text-lg">Fill this form to register</div>
        </div>
        <form
          className="flex flex-col gap-8"
          onSubmit={handleSubmit(submitForm)}
        >
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-6 flex-wrap lg:flex-row">
              <div className="flex flex-col gap-2">
                <Input
                  type="text"
                  label="First Name"
                  placeholder="Enter First Name"
                  control={control}
                  name="firstName"
                  rules={{
                    required: true,
                    pattern: {
                      value: /^[^\d]*$/,
                      message: "Only string values are allowed",
                    },
                  }}
                />
                {errors.firstName?.type === "required" && (
                  <p role="alert" className="text-red-500">
                    First name is required
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <Input
                  type="text"
                  label="Last Name"
                  placeholder="Enter Last Name"
                  control={control}
                  name="lastName"
                  rules={{
                    required: true,
                    pattern: {
                      value: /^[^\d]*$/,
                      message: "Only string values are allowed",
                    },
                  }}
                />
                {errors.lastName?.type === "required" && (
                  <p role="alert" className="text-red-500">
                    First name is required
                  </p>
                )}
                {errors.lastName?.type === "pattern" && (
                  <p role="alert" className="text-red-500">
                    Invalid Last Name
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-6 flex-wrap lg:flex-row">
              <div className="flex flex-col gap-2">
                <Input
                  type="text"
                  label="Phone Number"
                  placeholder="Enter Phone Number"
                  control={control}
                  name="phone"
                  rules={{
                    required: true,
                    minLength: 10,
                    maxLength: 10,
                    pattern: { value: /^[0-9]*$/, message: "Invalid Number" },
                  }}
                />
                {errors.phone?.type === "required" && (
                  <p role="alert" className="text-red-500">
                    Phone number is required
                  </p>
                )}
                {errors.phone?.type === "pattern" && (
                  <p role="alert" className="text-red-500">
                    Invalid Phone Number
                  </p>
                )}
                {(errors.phone?.type === "minLength" ||
                  errors.phone?.type === "maxLength") && (
                  <p role="alert" className="text-red-500">
                    Phone number should be of 10 digits
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <div>
                  Previously Part of O<sub>2</sub>?
                </div>
                <div className="flex">
                  <RadioButton
                    label="Yes"
                    value="true"
                    control={control}
                    name="partofo2"
                    labelClassName="mt-2 mr-4 ml-2"
                    rules={{ required: true }}
                  />
                  <RadioButton
                    label="No"
                    value="false"
                    control={control}
                    name="partofo2"
                    labelClassName="mt-2 mr-4 ml-2"
                    rules={{ required: true }}
                  />
                </div>
                {errors.partofo2?.type === "required" && (
                  <p role="alert" className="text-red-500 mt-2">
                    This field is required
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-6 flex-wrap">
              <div className="flex flex-col gap-2">
                <Input
                  type="email"
                  label="Email"
                  placeholder="Enter email"
                  name="email"
                  control={control}
                  rules={{
                    required: true,
                    pattern: {
                      value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                      message: "Invalid Email",
                    },
                  }}
                />
                {errors.email?.type === "required" && (
                  <p role="alert" className="text-red-500">
                    Email is required
                  </p>
                )}
                {errors.email?.type === "pattern" && (
                  <p role="alert" className="text-red-500">
                    Email is invalid
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-6 flex-wrap lg:flex-row">
              <div className="flex flex-col gap-2">
                <Select
                  label="Year"
                  placeholder="Select Year"
                  options={[
                    "FYJC",
                    "SYJC",
                    "FY Degree",
                    "SY Degree",
                    "TY Degree",
                  ]}
                  control={control}
                  name="year"
                  rules={{ required: true }}
                />
                {errors.year?.type === "required" && (
                  <p role="alert" className="text-red-500">
                    Year is required
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <Select
                  label="Select Course"
                  placeholder="Select Course"
                  options={
                    watchYear === "FYJC" || watchYear === "SYJC"
                      ? ["Arts", "Commerce", "Science"]
                      : ["BSC-CS", "BSC-IT", "BMS", "BMM", "Bio-tech"]
                  }
                  control={control}
                  name="course"
                  rules={{ required: true }}
                />
                {errors.course?.type === "required" && (
                  <p role="alert" className="text-red-500">
                    Course is required
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <Input
                  type="text"
                  label="Roll Number"
                  placeholder="Enter Roll Number"
                  name="rollNo"
                  control={control}
                  rules={{ required: true }}
                />
                {errors.rollNo?.type === "required" && (
                  <p role="alert" className="text-red-500">
                    Roll No. is required
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-6 flex-wrap lg:flex-row">
              <div className="flex flex-col gap-2">
                <div>Select Preferred Department</div>
                <div className="flex flex-col lg:flex-row gap-4">
                  <Select
                    placeholder="1st Preference"
                    options={departmentNames.filter(
                      (dept) =>
                        dept !== watchSecondPref && dept !== watchThirdPref
                    )}
                    control={control}
                    name="firstPref"
                    rules={{ required: true }}
                  />
                  <Select
                    placeholder="2nd Preference"
                    options={departmentNames.filter(
                      (dept) =>
                        dept !== watchFirstPref && dept !== watchThirdPref
                    )}
                    control={control}
                    name="secondPref"
                    rules={{ required: true }}
                  />
                  <Select
                    placeholder="3rd Preference"
                    options={departmentNames.filter(
                      (dept) =>
                        dept !== watchFirstPref && dept !== watchSecondPref
                    )}
                    control={control}
                    name="thirdPref"
                    rules={{ required: true }}
                  />
                </div>
                {(errors.firstPref?.type === "required" ||
                  errors.secondPref?.type === "required" ||
                  errors.thirdPref?.type === "required") && (
                  <p role="alert" className="text-red-500">
                    All preference are required
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-1 flex-wrap">
              <div className="flex flex-col gap-2">
                <FileInput
                  label="College ID"
                  control={control}
                  name="collegeID"
                  accept="image/png, image/jpeg, image/jpg"
                  rules={{ required: true }}
                />
              </div>
              {errors.collegeID?.type === "required" && (
                <p role="alert" className="text-red-500">
                  College ID is required
                </p>
              )}
            </div>
            <div className="flex flex-col gap-6 flex-wrap">
              <div className="flex flex-col gap-2">
                <Input
                  label="Password"
                  type="password"
                  name="password"
                  placeholder="Enter Password"
                  autoComplete="on"
                  control={control}
                  rules={{ required: true }}
                />
              </div>
              {errors.password?.type === "required" && (
                <p role="alert" className="text-red-500">
                  Password is required
                </p>
              )}
            </div>
            <div className="flex flex-col gap-6 flex-wrap">
              <div className="flex flex-col gap-2">
                <Input
                  label="Confirm Password"
                  type="password"
                  name="confirmPassword"
                  placeholder="Enter Password Again"
                  control={control}
                  autoComplete="on"
                  rules={{ required: true }}
                />
              </div>
              {errors.confirmPassword?.type === "required" && (
                <p role="alert" className="text-red-500">
                  Password is required
                </p>
              )}
            </div>
          </div>

          <div className="flex">
            <Button
              label={loading ? "Creating...." : "Register"}
              className="bg-red-500 py-2 px-4 rounded-xl"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default VolunteerSignup;
