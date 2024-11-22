import api from ".";

export const initiateSignup = async (email) => {
  try {
    const response = await api.post("/user/initiate", {
      user_email: email,
    });
    console.log("response:", response);
    if (response) return response;
  } catch (error) {
    console.error("API error:", error);
    return error;
  }
};

export const verifyOtp = async (email, otp, setAuthToken) => {
  try {
    const payload = {
      user_email: email,
      user_otp: otp,
    };
    const response = await api.post("/user/otp_validation", payload);
    if (response.status === 200) {
      setAuthToken(response?.data?.data?.token);
      return { success: true, token: response?.data?.data?.token };
    } else {
      return { success: false, error: "Incorrect OTP. Please try again." };
    }
  } catch (error) {
    console.error("OTP validation error:", error);
    return { success: false, error: "Invaid OTP. Please try again." };
  }
};

export const submitPersonalInfo = async (fullname, selectedFile) => {
  try {
    const formData = new FormData();
    formData.append("user_name", fullname);
    if (selectedFile) {
      formData.append("user_profileImage", selectedFile);
    }
    console.log("Helo")
    const response = await api.post("/user/2", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("Submission successful:", response.data);
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error submitting form:", error);
    return { success: false, error };
  }
};

export const createAccount = async (email, password) => {
  try {
    const formData = new FormData();
    formData.append("user_email", email);
    formData.append("user_password", password);
    const response = await api.post("/user/1", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log("Account created successfully:", response.data);
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error creating account:", error);
    return { success: false, error };
  }
};

export async function getCountries() {
  try {
    const response = await api.get(`/user/getCountries`);
    if (response) return response;
    else throw new Error("Could not get country");
  } catch (err) {
    console.log(err);
    return err.response;
  }
}
export async function getSectors() {
  try {
    const response = await api.get(`/sector`);
    if (response) return response;
    else throw new Error("Could not get country");
  } catch (err) {
    console.log(err);
    return err.response;
  }
}
export async function getIndustries(id) {
  try {
    const response = await api.get(`/industry/${id}`);
    if (response) return response;
    else throw new Error("Could not get country");
  } catch (err) {
    console.log(err);
    return err.response;
  }
}
export async function getEmissionCountries() {
  try {
    const response = await api.get(
      `/scope2_consumption/get_countries_for_report`
    );
    if (response) return response;
    else throw new Error("Could not get country");
  } catch (err) {
    console.log(err);
    return err.response;
  }
}
// export const fetchInitialOrganizationData = async () => {
//   try {
//     const [countriesResponse, industriesResponse, sectorsResponse] =
//       await Promise.all([
//         api.get("/user/getCountries"),
//         api.get("/industry"),
//         api.get("/sector"),
//       ]);

//     return {
//       countries: countriesResponse.data,
//       industries: industriesResponse.data,
//       sectors: sectorsResponse.data,
//     };
//   } catch (error) {
//     console.error("Error fetching initial data:", error);
//     throw new Error("Failed to load initial data. Please try again.");
//   }
// };

export const fetchStates = async (countryId) => {
  try {
    const response = await api.get(`/user/getstates/${countryId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching states:", error);
    throw new Error("Failed to load states. Please try again.");
  }
};

export const fetchCities = async (stateId) => {
  try {
    const response = await api.get(`/user/getcities/${stateId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching cities:", error);
    throw new Error("Failed to load cities. Please try again.");
  }
};

export const fetchSustainabilityGoals = async () => {
  try {
    const response = await api.get("/sustainabilitygoal/");
    return response.data;
  } catch (error) {
    console.error("Error fetching sustainability goals:", error);
    throw error;
  }
};

export const submitGoalsData = async (
  organizationData,
  selectedGoal,
  selectedValue
) => {
  const carbonFootprintMap = {
    e: "No",
    f: "Yes",
    g: "Frequently",
  };

  try {
    const payload = {
      organization_name: organizationData.organizationName,
      organization_country: organizationData.organizationCountry.countryName,
      organization_state: organizationData.organizationState.name,
      organization_city: organizationData.organizationCity.name,
      organization_sector: organizationData.organizationSector,
      organization_industry: organizationData.organizationIndustry,
      organization_fiscalyear: organizationData.organizationFiscalYear,
      organization_startingyear: organizationData.organizationStartingYear,
      organization_baselineyear: organizationData.organizationBaselineYear,
      organization_baselinemonth: organizationData.organizationBaselineMonth,
      organization_sustainabilitygoals: selectedGoal,
      organization_employeecount: organizationData.organizationEmployeeCount,
      organization_carbonfootprint: carbonFootprintMap[selectedValue],
      // organization_logo: organizationData.organizationLogo,
    };
    const formData = new FormData();

    // Append each field to the FormData object
    Object.keys(payload).forEach((key) => {
      formData.append(key, payload[key]);
    });

    // Append the logo file separately
    formData.append("organization_logo", organizationData.organizationLogo);
    // console.log("formData", formData);
    const response = await api.post("/user/3", formData);
    // console.log("API response:", response.data);
    return response;
  } catch (error) {
    console.error("Error posting user data:", error);
    return error.response;
  }
};
