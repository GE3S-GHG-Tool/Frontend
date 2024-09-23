import api from ".";
export async function sendEmailOTP(data) {
  try {
    const response = await api.post("/auth/login", data);
    console.log("sendEmailOTP", response);
    if (response) {
      return response;
    } else throw new Error("Could not send email OTP");
  } catch (err) {
    console.log("Error from sendEmailOTP ", err?.response?.data?.error);
  }
}
