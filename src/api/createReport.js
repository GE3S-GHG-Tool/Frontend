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
export async function getEmissionTypes() {
  try {
    const response = await api.get(`/process-emission/process-emissions/types`);
    if (response) return response;
    else throw new Error("Could not get getEmissionTypes");
  } catch (err) {
    console.log(err);
    return err.response;
  }
}
export async function getCategories(id) {
  try {
    const response = await api.get(`/process-emission/process-emissions/${id}`);
    if (response) return response;
    else throw new Error("Could not get categories");
  } catch (err) {
    console.log(err);
    return err.response;
  }
}
