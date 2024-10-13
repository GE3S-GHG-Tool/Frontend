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

export async function getCategoriesforDraft(id) {
  if (!id) return {}; // Return empty object if id is not present
  try {
    const response = await api.get(`/process-emission/process-emissions/${id}`);
    return response.data; // Return the data part of the response
  } catch (err) {
    console.log("Error fetching categories:", err);
    return {}; // Return an empty object in case of an error
  }
}

export async function getAssetType() {
  try {
    const response = await api.get(`/scope3_entry/get_scope3/Capital Goods`);
    if (response) return response;
    else throw new Error("Could not get Capital Goods");
  } catch (err) {
    console.log(err);
    return err.response;
  }
}
export async function getVehicleType() {
  try {
    const response = await api.get(
      `/scope3_entry/get_scope3/Employee Commuting`
    );
    if (response) return response;
    else throw new Error("Could not get Employee Commuting");
  } catch (err) {
    console.log(err);
    return err.response;
  }
}
export async function getFuelCategoryList() {
  try {
    const response = await api.get(
      `/scope3_entry/get_scope3/Fuel Related Activities`
    );
    if (response) return response;
    else throw new Error("Could not get Fuel Related Activities");
  } catch (err) {
    console.log(err);
    return err.response;
  }
}
export async function getWasteList() {
  try {
    const response = await api.get(`/scope3_entry/get_scope3/Waste Generated`);
    if (response) return response;
    else throw new Error("Could not get Waste Generated");
  } catch (err) {
    console.log(err);
    return err.response;
  }
}
export async function getUpstreams() {
  try {
    const response = await api.get(
      `/scope3_entry/get_scope3/Upstream Leased Assets`
    );
    if (response) return response;
    else throw new Error("Could not get Upstream Leased Assets");
  } catch (err) {
    console.log(err);
    return err.response;
  }
}
export async function getGoods() {
  try {
    const response = await api.get(`/scope3_entry/get_scope3/Purchased Goods`);
    if (response) return response;
    else throw new Error("Could not get Purchased Goods");
  } catch (err) {
    console.log(err);
    return err.response;
  }
}
export async function getTraveltype() {
  try {
    const response = await api.get(`/scope3_entry/get_scope3/Business Travel`);
    if (response) return response;
    else throw new Error("Could not get Business Travel");
  } catch (err) {
    console.log(err);
    return err.response;
  }
}
export async function getAllAirport() {
  try {
    const response = await api.get(`/scope3_entry/get_all_airports`);
    if (response) return response;
    else throw new Error("Could not get airport list");
  } catch (err) {
    console.log(err);
    return err.response;
  }
}
export async function getRefrigenrentType() {
  try {
    const response = await api.get(
      `/scope1_kpi/get_scope_kpi_data/Refrigerant Consumption`
    );
    if (response) return response;
    else throw new Error("Could not get airport list");
  } catch (err) {
    console.log(err);
    return err.response;
  }
}
export async function getConsumtionType() {
  try {
    const response = await api.get(
      `/scope1_kpi/get_scope_kpi_data/Fuel Consumption`
    );
    if (response) return response;
    else throw new Error("Could not get airport list");
  } catch (err) {
    console.log(err);
    return err.response;
  }
}
export async function getScope1Data(id) {
  try {
    const response = await api.get(`/scope1_report/calculate_totals/${id}`);
    if (response) return response;
    else throw new Error("Could not get scope data 1");
  } catch (err) {
    console.log(err);
    return err.response;
  }
}
export async function getScope2Data(id) {
  try {
    const response = await api.get(`/scope2_report/calculate_totals/${id}`);
    if (response) return response;
    else throw new Error("Could not get scope data 1");
  } catch (err) {
    console.log(err);
    return err.response;
  }
}
export async function getScope3Data(id) {
  try {
    const response = await api.get(
      `/scope3_report/calculate_scope3_totals/${id}`
    );
    if (response) return response;
    else throw new Error("Could not get scope data 1");
  } catch (err) {
    console.log(err);
    return err.response;
  }
}

export async function saveScope1Report(data) {
  try {
    const response = await api.post("/scope1_report/scope1_report", data);
    if (response) return response;
    else throw new Error("Could not save report", data);
  } catch (err) {
    console.log(err);
    return err.response;
  }
}
export async function updateScope1Report(data, id) {
  try {
    const response = await api.put(
      `/scope1_report/update_scope1_report/${id}`,
      data
    );
    if (response) return response;
    else throw new Error("Could not save report", data);
  } catch (err) {
    console.log(err);
    return err.response;
  }
}
export async function saveScope2Report(data) {
  try {
    const response = await api.post("/scope2_report/save_scope2_report", data);
    if (response) return response;
    else throw new Error("Could not save report", data);
  } catch (err) {
    console.log(err);
    return err.response;
  }
}
export async function saveScope3Report(data) {
  try {
    const response = await api.post("/scope3_report/save_scope3_report", data);
    if (response) return response;
    else throw new Error("Could not save report", data);
  } catch (err) {
    console.log(err);
    return err.response;
  }
}
