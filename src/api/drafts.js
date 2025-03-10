import api from ".";
export async function getscope1draft(id) {
  try {
    const response = await api.get(
      `/scope1_report/all_draft_scope1_data/${id}`
    );
    if (response) return response;
    else throw new Error("Could not get scope1 draft data");
  } catch (err) {
    console.log(err);
    return err.response;
  }
}
export async function getscope2draft(id) {
  try {
    const response = await api.get(
      `/scope2_report/all_draft_report2_data/${id}`
    );
    if (response) return response;
    else throw new Error("Could not get scope2 draft data");
  } catch (err) {
    console.log(err);
    return err.response;
  }
}
export async function getscope3draft(id) {
  try {
    const response = await api.get(
      `/scope3_report/all_draft_report3_data/${id}`
    );
    if (response) return response;
    else throw new Error("Could not get scope3 draft data");
  } catch (err) {
    console.log(err);
    return err.response;
  }
}
