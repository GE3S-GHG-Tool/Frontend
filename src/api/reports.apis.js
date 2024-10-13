import api from ".";

export async function getDraftReports() {
  try {
    const response = await api.get(`/report/get_reports/draft`);
    if (response) return response;
    else throw new Error("Something went wrong!");
  } catch (err) {
    console.log(err);
    return err.response;
  }
}

export async function getGeneratedReports() {
  try {
    const response = await api.get(`/report/get_reports/final`);
    if (response) return response;
    else throw new Error("Something went wrong!");
  } catch (err) {
    console.log(err);
    return err.response;
  }
}
export async function getAnalyticsData(id) {
  try {
    const response = await api.get(
      `/report/analytics/66fe865e02cfb7225bc60f61`
    );
    if (response) return response;
    else throw new Error("Something went wrong!");
  } catch (err) {
    console.log(err);
    return err.response;
  }
}
