import api from ".";
export async function getUser() {
  try {
    const response = await api.get(`/user/onboard-data`);
    if (response) return response;
    else throw new Error("Could not get user");
  } catch (err) {
    console.log(err);
    return err.response;
  }
}



