import api from ".";
export async function createReport(data) {
  try {
    const response = await api.post("/report/createReport", data);
    if (response) return response;
    else throw new Error("Could not create clinic", data);
  } catch (err) {
    console.log(err);
    return err.response;
  }
}
