import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import reportImageOne from "../../../assets/graphimgs/reportpageone.png";
import lineChart from "../../../assets/graphimgs/emissionslinechart.png";
import reportLastPage from "../../../assets/graphimgs/reportlastpage.png";
import rightBg from "../../../assets/graphimgs/rightBg.png";
import leftBg from "../../../assets/graphimgs/leftBg.png";
import Montserrat from "/fonts/Montserrat-Regular.ttf";
import MontserratBold from "/fonts/Montserrat-Bold.ttf";
import Inter from "/fonts/Inter_18pt-Light.ttf";
import axios from "axios";
import api from "../../../api";

async function fetchOnboardingData() {
  try {
    const response = await api.get(
      "https://backend.ghg.ge3s.org/api/user/onboard-data"
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching percent data:", error);
    throw error;
  }
}

async function fetchPercentData(reportId) {
  try {
    const response = await axios.post(
      "https://backend.ghg.ge3s.org/api/report/fetch_total_emissions",
      {
        reportId: reportId,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching percent data:", error);
    throw error;
  }
}

async function fetchScope1Data(reportId) {
  try {
    const response = await axios.post(
      "https://backend.ghg.ge3s.org/api/report/scope1_categorized_emissions",
      {
        reportId: reportId,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching scope 1 data:", error);
    throw error;
  }
}

async function fetchScope2Data(reportId) {
  try {
    const response = await axios.post(
      "https://backend.ghg.ge3s.org/api/report/scope2_totals_emissions",
      {
        reportId: reportId,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching scope 2 data:", error);
    throw error;
  }
}

async function fetchScope3Data(reportId) {
  try {
    const response = await axios.post(
      "https://backend.ghg.ge3s.org/api/report/scope3_categorized_emissions",
      {
        reportId: reportId,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching scope 3 data:", error);
    throw error;
  }
}

class MultiPageGHGReportGenerator {
  constructor(options = {}) {
    // Default A4 page dimensions in points
    this.pageWidth = 595.28;
    this.pageHeight = 841.89;

    // Set default or custom margins
    this.margins = {
      left: options.margins?.left || 64,
      right: options.margins?.right || 64,
      top: options.margins?.top || 20,
      bottom: options.margins?.bottom || 40,
    };

    this.pdf = new jsPDF({
      unit: "pt",
      format: "a4",
      compress: true,
      optimization: true,
    });

    this.pageNumber = 1;
  }

  async loadMontserratFont() {
    try {
      const regularResponse = await fetch(Montserrat);
      const regularBlob = await regularResponse.blob();
      const regularBase64 = await this.blobToBase64(regularBlob);

      this.pdf.addFileToVFS("Montserrat-Regular.ttf", regularBase64);
      this.pdf.addFont("Montserrat-Regular.ttf", "Montserrat", "normal");

      // Set as default font after loading
      this.pdf.setFont("Montserrat", "normal");
      console.log("Montserrat font loaded successfully");
    } catch (error) {
      console.error("Error loading Montserrat font:", error);
      this.pdf.setFont("helvetica", "normal");
    }
  }

  async loadMontserratBoldFont() {
    try {
      const regularResponse = await fetch(MontserratBold);
      const regularBlob = await regularResponse.blob();
      const regularBase64 = await this.blobToBase64(regularBlob);

      this.pdf.addFileToVFS("Montserrat-Bold.ttf", regularBase64);
      this.pdf.addFont("Montserrat-Bold.ttf", "MontserratBold", "normal");
      console.log("Montserrat Bold font loaded successfully");
    } catch (error) {
      console.error("Error loading Montserrat Bold font:", error);
      this.pdf.setFont("helvetica", "normal");
    }
  }

  async loadInterFont() {
    try {
      const regularResponse = await fetch(Inter);
      const regularBlob = await regularResponse.blob();
      const regularBase64 = await this.blobToBase64(regularBlob);

      this.pdf.addFileToVFS("Inter_18pt-Light", regularBase64);
      this.pdf.addFont("Inter_18pt-Light", "Inter", "normal");
      console.log("Inter font loaded successfully");
      this.pdf.setFont("Inter", "normal");
    } catch (error) {
      console.error("Error loading Inter font:", error);
      this.pdf.setFont("helvetica", "normal");
    }
  }

  blobToBase64(blob) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result.split(",")[1]);
      reader.readAsDataURL(blob);
    });
  }

  initializeDocument = async () => {
    this.pdf.setProperties({
      title: "Comprehensive Greenhouse Gas (GHG) Emissions Report",
      author: "Sustainability Team",
      creator: "Harshit Dubey",
    });
    await this.loadMontserratFont();
    await this.loadMontserratBoldFont();
    await this.loadInterFont();
  };

  addHeader(pageTitle = "") {
    this.pdf.setFontSize(12);
    this.pdf.setTextColor(113, 113, 113);
    this.pdf.setFont("Montserrat");
    this.pdf.text(
      "Greenhouse Gas (GHG) Report",
      this.margins.left,
      this.margins.top + 20
    );
    // Horizontal line
    this.pdf.setLineWidth(0.2);
    this.pdf.setDrawColor(217, 217, 217);
    this.pdf.line(
      this.margins.left,
      this.margins.top + 35,
      this.pageWidth - this.margins.right,
      this.margins.top + 35
    );

    // Subtitle
    if (pageTitle) {
      this.pdf.setFontSize(18);
      this.pdf.setTextColor("#029366");
      this.pdf.setFont("MontserratBold");
      this.pdf.text(pageTitle, this.margins.left, this.margins.top + 70);
    }
  }

  // Create a professional footer
  addFooter() {
    this.pdf.setFontSize(10);
    this.pdf.setTextColor("#000");
    this.pdf.setFont("Montserrat", "normal");

    // Page number
    this.pdf.text(
      `Page ${this.pageNumber}`,
      this.pageWidth - this.margins.right - 28,
      this.pageHeight - this.margins.bottom + 10
    );
  }

  addImagePage(imageSrc) {
    const pageWidth = this.pdf.internal.pageSize.getWidth();
    const pageHeight = this.pdf.internal.pageSize.getHeight();

    this.pdf.addImage(imageSrc, "PNG", 0, 0, pageWidth, pageHeight);
    this.pdf.addPage();
  }

  addBg(imageSrc) {
    const pageWidth = this.pdf.internal.pageSize.getWidth();
    const pageHeight = this.pdf.internal.pageSize.getHeight();

    this.pdf.addImage(imageSrc, "PNG", 0, 0, pageWidth, pageHeight);
  }

  // Generate report pages dynamically
  async generateReport(reportId) {
    await this.initializeDocument();

    const user = await fetchOnboardingData();
    const percentData = await fetchPercentData(reportId);
    const scope1Data = await fetchScope1Data(reportId);
    const scope2Data = await fetchScope2Data(reportId);
    const scope3Data = await fetchScope3Data(reportId);
    const scope1Response = await axios.post(
      "https://backend.ghg.ge3s.org/api/report/scope1_totals_emissions",
      { reportId }
    );
    const scope2Response = await axios.post(
      "https://backend.ghg.ge3s.org/api/report/scope2_totals_emissions",
      { reportId }
    );
    const scope3Response = await axios.post(
      "https://backend.ghg.ge3s.org/api/report/scope3_totals_emissions",
      { reportId }
    );

    this.addExecutiveSummaryPage({
      scope1Data: scope1Response.data,
      scope2Data: scope2Response.data,
      scope3Data: scope3Response.data,
      percentData: percentData,
      user: user,
    });

    this.addScope1AnalysisOne(scope1Data, percentData);

    this.addScope1AnalysisTwo(scope1Data, percentData);

    this.addScope1AnalysisThree(scope1Data, percentData);

    if (
      user?.organization?.premiumPlan?.name === "CarbonZero" ||
      user?.organization?.premiumPlan?.name === "OffSet"
    ) {
      this.addScope2AnalysisOne(scope2Data, percentData);

      this.addScope2AnalysisTwo(scope2Data, percentData);
    }

    if (user?.organization?.premiumPlan?.name === "CarbonZero") {
      this.addScope3AnalysisOne(scope3Data, percentData);

      this.addScope3AnalysisTwo(scope3Data, percentData);

      this.addScope3AnalysisThree(scope3Data, percentData);

      this.addScope3AnalysisFour(scope3Data, percentData);

      this.addScope3AnalysisFive(scope3Data, percentData);

      this.addScope3AnalysisSix(scope3Data, percentData);
    }

    this.addConclusionPage();

    // Get report name
    const report_name = percentData.name;

    //return this.pdf;
    return { pdf: this.pdf, report_name };
  }

  // Helper function to handle missing data
  getEmissionsData(data, key) {
    if (!data[key] || data[key].length === 0) {
      return [
        {
          country: "Global",
          quantity: 0,
          unit: "",
          emissions: 0,
        },
      ];
    }
    return data[key];
  }

  // Helper function to calculate total emissions
  calculateTotalEmissions(emissionsArray) {
    return emissionsArray.reduce((total, item) => total + item.emissions, 0);
  }

  calculateEmissionsTotal(data) {
    return data ? data.reduce((total, item) => total + item.emissions, 0) : 0;
  }

  // Helper function to handle missing data arrays
  getDataWithDefault(data, defaultItem) {
    if (!data || data.length === 0) {
      return [defaultItem];
    }
    return data;
  }

  sectionPageone(user, percentData) {
    this.addBg(reportImageOne);
    this.pdf.setFontSize(18);
    this.pdf.setFont("Inter");
    this.pdf.setTextColor("#fff");
    const periodText =
      percentData.time_period === "Yearly"
        ? `${percentData.time_period}, ${percentData.year}`
        : `${percentData.time_period} ${percentData.periodicity}, ${percentData.year}`;

    this.pdf.text(periodText, this.margins.left + 110, this.margins.top + 410);

    this.pdf.setFontSize(18);
    this.pdf.set;
    this.pdf.setTextColor("#00191D");
    this.pdf.setFont("MontserratBold");
    this.pdf.text(
      user?.organization?.name,
      this.margins.left,
      this.pageHeight - this.margins.bottom - 48
    );

    this.pdf.setFontSize(12);
    this.pdf.setFont("Inter", "normal", 400);
    this.pdf.setTextColor("#000");
    this.pdf.text(
      `${user?.organization?.city}, ${user?.organization?.state}`,
      this.margins.left,
      this.pageHeight - this.margins.bottom - 20
    );
    this.pdf.text(
      `${user?.organization?.country}`,
      this.margins.left,
      this.pageHeight - this.margins.bottom
    );

    this.pdf.addPage();
    this.pdf.setFont("Inter");
  }
  sectionPagetwo(user) {
    this.addBg(leftBg);
    this.addHeader("Details");
    this.pageNumber = 2;

    this.pdf.setFontSize(12);
    this.pdf.setTextColor("#029366");
    this.pdf.setFont("MontserratBold");
    this.pdf.text("Prepared for:", this.margins.left, this.margins.top + 110);

    this.pdf.setFontSize(11);
    this.pdf.setFont("helvetica", "bold");
    this.pdf.setTextColor("#000");
    this.pdf.text(
      `${user?.organization?.name}`,
      this.margins.left,
      this.margins.top + 130
    );
    this.pdf.setFont("helvetica", "normal");
    this.pdf.setTextColor("#000");
    this.pdf.text(
      `${user?.organization?.city}, ${user?.organization?.state}`,
      this.margins.left,
      this.margins.top + 145
    );
    this.pdf.setFont("helvetica", "normal");
    this.pdf.setTextColor("#000");
    this.pdf.text(
      `${user?.organization?.country}`,
      this.margins.left,
      this.margins.top + 160
    );

    this.pdf.setFontSize(12);
    this.pdf.setTextColor("#029366");
    this.pdf.setFont("MontserratBold");
    this.pdf.text(
      "Generated by:",
      this.margins.left + 245,
      this.margins.top + 110
    );

    this.pdf.setFontSize(11);
    this.pdf.setFont("helvetica", "normal");
    this.pdf.setTextColor("#000");
    this.pdf.text(
      `${user?.name}`,
      this.margins.left + 245,
      this.margins.top + 130
    );
    this.pdf.setFont("helvetica", "normal");
    this.pdf.setTextColor("#000");
    this.pdf.text(
      `${user?.email}`,
      this.margins.left + 245,
      this.margins.top + 145
    );

    this.pdf.setLineWidth(0.2);
    this.pdf.setDrawColor(217, 217, 217);
    this.pdf.line(
      this.margins.left,
      this.margins.top + 175,
      this.pageWidth - this.margins.right,
      this.margins.top + 175
    );

    this.pdf.setFontSize(12);
    this.pdf.setTextColor("#029366");
    this.pdf.setFont("MontserratBold");
    this.pdf.text("Prepared by:", this.margins.left, this.margins.top + 210);

    this.pdf.setFontSize(11);
    this.pdf.setFont("helvetica", "bold");
    this.pdf.setTextColor("#000");
    this.pdf.text("GE3S", this.margins.left, this.margins.top + 230);
    this.pdf.setFont("helvetica", "normal");
    this.pdf.setTextColor("#000");
    this.pdf.text(
      "UAE, KSA, USA, India, Canada",
      this.margins.left,
      this.margins.top + 245
    );
    this.pdf.setFont("helvetica", "normal");
    this.pdf.setTextColor("#000");
    this.pdf.text("ge3s.org", this.margins.left, this.margins.top + 260);

    this.pdf.setFontSize(12);
    this.pdf.setTextColor("#029366");
    this.pdf.setFont("MontserratBold");
    this.pdf.text(
      "Project Manager",
      this.margins.left + 245,
      this.margins.top + 210
    );

    this.pdf.setFontSize(11);
    this.pdf.setFont("helvetica", "normal");
    this.pdf.setTextColor("#000");
    this.pdf.text(
      "Praveen Kumar Diwakar",
      this.margins.left + 245,
      this.margins.top + 230
    );
    this.pdf.setFont("helvetica", "normal");
    this.pdf.setTextColor("#000");
    this.pdf.text(
      "Analyst, GE3S",
      this.margins.left + 245,
      this.margins.top + 245
    );

    this.pdf.setLineWidth(0.2);
    this.pdf.setDrawColor(217, 217, 217);
    this.pdf.line(
      this.margins.left,
      this.margins.top + 275,
      this.pageWidth - this.margins.right,
      this.margins.top + 275
    );

    this.pdf.setFontSize(12);
    this.pdf.setTextColor("#029366");
    this.pdf.setFont("MontserratBold");
    this.pdf.text(
      "Carbon and sustainability expert",
      this.margins.left,
      this.margins.top + 310
    );

    this.pdf.setFontSize(11);
    this.pdf.setFont("helvetica", "normal");
    this.pdf.setTextColor("#000");
    this.pdf.text("Satyapal Singh", this.margins.left, this.margins.top + 330);
    this.pdf.setFont("helvetica", "normal");
    this.pdf.setTextColor("#000");
    this.pdf.text("CEO, GE3S", this.margins.left, this.margins.top + 345);

    this.pdf.setFont("helvetica", "normal");
    this.pdf.setTextColor("#000");
    this.pdf.text(
      "Chilamburaj Anbarasu",
      this.margins.left + 245,
      this.margins.top + 330
    );
    this.pdf.setFont("helvetica", "normal");
    this.pdf.setTextColor("#000");
    this.pdf.text(
      "Director, GE3S",
      this.margins.left + 245,
      this.margins.top + 345
    );

    this.pdf.setLineWidth(0.2);
    this.pdf.setDrawColor(217, 217, 217);
    this.pdf.line(
      this.margins.left,
      this.margins.top + 365,
      this.pageWidth - this.margins.right,
      this.margins.top + 365
    );

    this.pdf.setFontSize(12);
    this.pdf.setTextColor("#029366");
    this.pdf.setFont("MontserratBold");
    this.pdf.text("Contact", this.margins.left, this.margins.top + 405);

    this.pdf.setFontSize(11);
    this.pdf.setFont("helvetica", "normal");
    this.pdf.setTextColor("#000");
    this.pdf.text(
      "sustainabilty@ge3s.me",
      this.margins.left,
      this.margins.top + 425
    );
    this.pdf.setLineWidth(0.2);
    this.pdf.setDrawColor(217, 217, 217);
    this.pdf.line(
      this.margins.left,
      this.margins.top + 443,
      this.pageWidth - this.margins.right,
      this.margins.top + 443
    );
    this.addFooter();
    this.pdf.addPage();
    this.pdf.setFont("Inter");
  }
  tableOfContentScope1() {
    this.addBg(rightBg);
    this.addHeader("Table of contents");
    this.pageNumber = 3;

    this.pdf.setFontSize(12);
    this.pdf.setFont("MontserratBold");
    this.pdf.setTextColor("#029366");

    this.margins.top = 85;

    this.pdf.text(
      "Executive summary",
      this.margins.left,
      (this.margins.top += 46)
    );

    this.pdf.setLineWidth(0.2);
    this.pdf.setDrawColor(217, 217, 217);
    this.pdf.line(
      this.margins.left,
      (this.margins.top += 9),
      this.pageWidth - this.margins.right,
      this.margins.top
    );

    this.pdf.setFontSize(12);
    this.pdf.setFont("Montserrat");
    this.pdf.setTextColor("#029366");
    this.pdf.text(
      "1 Disclaimer and Methodology",
      this.margins.left,
      (this.margins.top += 20)
    );

    this.pdf.setFontSize(10);
    this.pdf.setFont("Inter");
    this.pdf.setTextColor("#000");
    this.pdf.text(
      "1.1  Disclaimer",
      this.margins.left,
      (this.margins.top += 21)
    );
    this.pdf.text(
      "4",
      this.pageWidth - this.margins.right - 7,
      this.margins.top
    );

    this.pdf.text(
      "1.2  Methodology",
      this.margins.left,
      (this.margins.top += 21)
    );
    this.pdf.text(
      "5",
      this.pageWidth - this.margins.right - 7,
      this.margins.top
    );

    this.pdf.setLineWidth(0.2);
    this.pdf.setDrawColor(217, 217, 217);
    this.pdf.line(
      this.margins.left,
      (this.margins.top += 8),
      this.pageWidth - this.margins.right,
      this.margins.top
    );

    this.pdf.setFontSize(12);
    this.pdf.setFont("Montserrat");
    this.pdf.setTextColor("#029366");
    this.pdf.text(
      "2 Greenhouse Gas Emissions Breakdown",
      this.margins.left,
      (this.margins.top += 22)
    );

    this.pdf.setFontSize(10);
    this.pdf.setFont("Inter");
    this.pdf.setTextColor("#000");
    this.pdf.text("2.1  Scope 1", this.margins.left, (this.margins.top += 22));
    this.pdf.text(
      "6",
      this.pageWidth - this.margins.right - 7,
      this.margins.top
    );

    this.pdf.setLineWidth(0.2);
    this.pdf.setDrawColor(217, 217, 217);
    this.pdf.line(
      this.margins.left,
      (this.margins.top += 8),
      this.pageWidth - this.margins.right,
      this.margins.top
    );

    this.pdf.text(
      "3  Fuel Consumption",
      this.margins.left,
      (this.margins.top += 22)
    );
    this.pdf.text(
      "7",
      this.pageWidth - this.margins.right - 7,
      this.margins.top
    );

    this.pdf.text(
      "4  Refrigerant Consumption",
      this.margins.left,
      (this.margins.top += 22)
    );
    this.pdf.text(
      "8",
      this.pageWidth - this.margins.right - 7,
      this.margins.top
    );

    this.pdf.text(
      "5  Process Emissions",
      this.margins.left,
      (this.margins.top += 22)
    );
    this.pdf.text(
      "9",
      this.pageWidth - this.margins.right - 7,
      this.margins.top
    );
    this.margins.top = 20;
    this.addFooter();
    this.pdf.addPage();
  }
  tableOfContentScope2() {
    this.addBg(rightBg);
    this.addHeader("Table of contents");
    this.pageNumber = 3;

    this.pdf.setFontSize(12);
    this.pdf.setFont("MontserratBold");
    this.pdf.setTextColor("#029366");

    this.margins.top = 85;

    this.pdf.text(
      "Executive summary",
      this.margins.left,
      (this.margins.top += 46)
    );

    this.pdf.setLineWidth(0.2);
    this.pdf.setDrawColor(217, 217, 217);
    this.pdf.line(
      this.margins.left,
      (this.margins.top += 9),
      this.pageWidth - this.margins.right,
      this.margins.top
    );

    this.pdf.setFontSize(12);
    this.pdf.setFont("Montserrat");
    this.pdf.setTextColor("#029366");
    this.pdf.text(
      "1 Disclaimer and Methodology",
      this.margins.left,
      (this.margins.top += 20)
    );

    this.pdf.setFontSize(10);
    this.pdf.setFont("Inter");
    this.pdf.setTextColor("#000");
    this.pdf.text(
      "1.1  Disclaimer",
      this.margins.left,
      (this.margins.top += 21)
    );
    this.pdf.text(
      "4",
      this.pageWidth - this.margins.right - 7,
      this.margins.top
    );

    this.pdf.text(
      "1.2  Methodology",
      this.margins.left,
      (this.margins.top += 21)
    );
    this.pdf.text(
      "5",
      this.pageWidth - this.margins.right - 7,
      this.margins.top
    );

    this.pdf.setLineWidth(0.2);
    this.pdf.setDrawColor(217, 217, 217);
    this.pdf.line(
      this.margins.left,
      (this.margins.top += 8),
      this.pageWidth - this.margins.right,
      this.margins.top
    );

    this.pdf.setFontSize(12);
    this.pdf.setFont("Montserrat");
    this.pdf.setTextColor("#029366");
    this.pdf.text(
      "2 Greenhouse Gas Emissions Breakdown",
      this.margins.left,
      (this.margins.top += 22)
    );

    this.pdf.setFontSize(10);
    this.pdf.setFont("Inter");
    this.pdf.setTextColor("#000");
    this.pdf.text("2.1  Scope 1", this.margins.left, (this.margins.top += 22));
    this.pdf.text(
      "6",
      this.pageWidth - this.margins.right - 7,
      this.margins.top
    );

    this.pdf.text("2.2  Scope 2", this.margins.left, (this.margins.top += 22));
    this.pdf.text(
      "7",
      this.pageWidth - this.margins.right - 7,
      this.margins.top
    );

    this.pdf.setLineWidth(0.2);
    this.pdf.setDrawColor(217, 217, 217);
    this.pdf.line(
      this.margins.left,
      (this.margins.top += 8),
      this.pageWidth - this.margins.right,
      this.margins.top
    );

    this.pdf.text(
      "3  Fuel Consumption",
      this.margins.left,
      (this.margins.top += 22)
    );
    this.pdf.text(
      "8",
      this.pageWidth - this.margins.right - 7,
      this.margins.top
    );

    this.pdf.text(
      "4  Refrigerant Consumption",
      this.margins.left,
      (this.margins.top += 22)
    );
    this.pdf.text(
      "9",
      this.pageWidth - this.margins.right - 7,
      this.margins.top
    );

    this.pdf.text(
      "5  Process Emissions",
      this.margins.left,
      (this.margins.top += 22)
    );
    this.pdf.text(
      "10",
      this.pageWidth - this.margins.right - 10,
      this.margins.top
    );

    this.pdf.text(
      "6  Electricity Consumption",
      this.margins.left,
      (this.margins.top += 22)
    );
    this.pdf.text(
      "11",
      this.pageWidth - this.margins.right - 8,
      this.margins.top
    );

    this.pdf.text(
      "7  Chilled Water Consumption",
      this.margins.left,
      (this.margins.top += 22)
    );
    this.pdf.text(
      "11",
      this.pageWidth - this.margins.right - 8,
      this.margins.top
    );

    this.pdf.text(
      "8  Purchased Desalinated Water",
      this.margins.left,
      (this.margins.top += 22)
    );
    this.pdf.text(
      "12",
      this.pageWidth - this.margins.right - 10,
      this.margins.top
    );

    this.pdf.text(
      "9  Heat Consumption",
      this.margins.left,
      (this.margins.top += 22)
    );
    this.pdf.text(
      "12",
      this.pageWidth - this.margins.right - 10,
      this.margins.top
    );
    this.margins.top = 20;
    this.addFooter();
    this.pdf.addPage();
  }
  tableOfContentScope3() {
    this.addBg(rightBg);
    this.addHeader("Table of contents");
    this.pageNumber = 3;
    //Yash

    this.pdf.setFontSize(12);
    this.pdf.setFont("MontserratBold");
    this.pdf.setTextColor("#029366");

    this.margins.top = 85;

    this.pdf.text(
      "Executive summary",
      this.margins.left,
      (this.margins.top += 46)
    );

    this.pdf.setLineWidth(0.2);
    this.pdf.setDrawColor(217, 217, 217);
    this.pdf.line(
      this.margins.left,
      (this.margins.top += 9),
      this.pageWidth - this.margins.right,
      this.margins.top
    );

    this.pdf.setFontSize(12);
    this.pdf.setFont("Montserrat");
    this.pdf.setTextColor("#029366");
    this.pdf.text(
      "1 Disclaimer and Methodology",
      this.margins.left,
      (this.margins.top += 20)
    );

    this.pdf.setFontSize(10);
    this.pdf.setFont("Inter");
    this.pdf.setTextColor("#000");
    this.pdf.text(
      "1.1  Disclaimer",
      this.margins.left,
      (this.margins.top += 21)
    );
    this.pdf.text(
      "4",
      this.pageWidth - this.margins.right - 7,
      this.margins.top
    );

    this.pdf.text(
      "1.2  Methodology",
      this.margins.left,
      (this.margins.top += 21)
    );
    this.pdf.text(
      "5",
      this.pageWidth - this.margins.right - 7,
      this.margins.top
    );

    this.pdf.setLineWidth(0.2);
    this.pdf.setDrawColor(217, 217, 217);
    this.pdf.line(
      this.margins.left,
      (this.margins.top += 8),
      this.pageWidth - this.margins.right,
      this.margins.top
    );

    this.pdf.setFontSize(12);
    this.pdf.setFont("Montserrat");
    this.pdf.setTextColor("#029366");
    this.pdf.text(
      "2 Greenhouse Gas Emissions Breakdown",
      this.margins.left,
      (this.margins.top += 22)
    );

    this.pdf.setFontSize(10);
    this.pdf.setFont("Inter");
    this.pdf.setTextColor("#000");
    this.pdf.text("2.1  Scope 1", this.margins.left, (this.margins.top += 22));
    this.pdf.text(
      "6",
      this.pageWidth - this.margins.right - 7,
      this.margins.top
    );

    this.pdf.text("2.2  Scope 2", this.margins.left, (this.margins.top += 22));
    this.pdf.text(
      "7",
      this.pageWidth - this.margins.right - 7,
      this.margins.top
    );

    this.pdf.text("2.3  Scope 3", this.margins.left, (this.margins.top += 22));
    this.pdf.text(
      "7",
      this.pageWidth - this.margins.right - 7,
      this.margins.top
    );

    this.pdf.setLineWidth(0.2);
    this.pdf.setDrawColor(217, 217, 217);
    this.pdf.line(
      this.margins.left,
      (this.margins.top += 8),
      this.pageWidth - this.margins.right,
      this.margins.top
    );

    this.pdf.text(
      "3  Fuel Consumption",
      this.margins.left,
      (this.margins.top += 22)
    );
    this.pdf.text(
      "8",
      this.pageWidth - this.margins.right - 7,
      this.margins.top
    );

    this.pdf.text(
      "4  Refrigerant Consumption",
      this.margins.left,
      (this.margins.top += 22)
    );
    this.pdf.text(
      "9",
      this.pageWidth - this.margins.right - 7,
      this.margins.top
    );

    this.pdf.text(
      "5  Process Emissions",
      this.margins.left,
      (this.margins.top += 22)
    );
    this.pdf.text(
      "10",
      this.pageWidth - this.margins.right - 10,
      this.margins.top
    );

    this.pdf.text(
      "6  Electricity Consumption",
      this.margins.left,
      (this.margins.top += 22)
    );
    this.pdf.text(
      "11",
      this.pageWidth - this.margins.right - 8,
      this.margins.top
    );

    this.pdf.text(
      "7  Chilled Water Consumption",
      this.margins.left,
      (this.margins.top += 22)
    );
    this.pdf.text(
      "11",
      this.pageWidth - this.margins.right - 8,
      this.margins.top
    );

    this.pdf.text(
      "8  Purchased Desalinated Water",
      this.margins.left,
      (this.margins.top += 22)
    );
    this.pdf.text(
      "12",
      this.pageWidth - this.margins.right - 10,
      this.margins.top
    );

    this.pdf.text(
      "9  Heat Consumption",
      this.margins.left,
      (this.margins.top += 22)
    );
    this.pdf.text(
      "12",
      this.pageWidth - this.margins.right - 10,
      this.margins.top
    );

    this.pdf.text(
      "10  Waste Generated",
      this.margins.left,
      (this.margins.top += 22)
    );
    this.pdf.text(
      "13",
      this.pageWidth - this.margins.right - 10,
      this.margins.top
    );

    this.pdf.text(
      "11  Business Travel",
      this.margins.left,
      (this.margins.top += 22)
    );
    this.pdf.text(
      "14",
      this.pageWidth - this.margins.right - 10,
      this.margins.top
    );

    this.pdf.text(
      "12  Purchased Goods",
      this.margins.left,
      (this.margins.top += 22)
    );
    this.pdf.text(
      "14",
      this.pageWidth - this.margins.right - 10,
      this.margins.top
    );

    this.pdf.text(
      "13  Capital Goods",
      this.margins.left,
      (this.margins.top += 22)
    );
    this.pdf.text(
      "15",
      this.pageWidth - this.margins.right - 10,
      this.margins.top
    );

    this.pdf.text(
      "14  Investments",
      this.margins.left,
      (this.margins.top += 22)
    );
    this.pdf.text(
      "15",
      this.pageWidth - this.margins.right - 10,
      this.margins.top
    );

    this.pdf.text(
      "15  Employee Commuting",
      this.margins.left,
      (this.margins.top += 22)
    );
    this.pdf.text(
      "16",
      this.pageWidth - this.margins.right - 10,
      this.margins.top
    );

    this.pdf.text(
      "16  Fuel Related Activities",
      this.margins.left,
      (this.margins.top += 22)
    );
    this.pdf.text(
      "17",
      this.pageWidth - this.margins.right - 10,
      this.margins.top
    );

    this.pdf.text(
      "17  Upstream Leased Assets",
      this.margins.left,
      (this.margins.top += 22)
    );
    this.pdf.text(
      "18",
      this.pageWidth - this.margins.right - 10,
      this.margins.top
    );

    this.pdf.text(
      "18  Downstream Leased Assets",
      this.margins.left,
      (this.margins.top += 22)
    );
    this.pdf.text(
      "18",
      this.pageWidth - this.margins.right - 10,
      this.margins.top
    );
    this.margins.top = 20;
    this.addFooter();
    this.pdf.addPage();
  }
  disclaimerAndMethodology1() {
    this.addBg(leftBg);
    this.addHeader("Disclaimer and Methodology");
    this.pageNumber = 4;
    this.margins.top = 100;

    this.pdf.setFontSize(14);
    this.pdf.setFont("Montserrat");
    this.pdf.setTextColor("#00191D");

    this.pdf.text(
      "1.1 Disclaimer",
      this.margins.left,
      (this.margins.top += 24)
    );

    this.pdf.setLineWidth(0.2);
    this.pdf.setDrawColor(217, 217, 217);
    this.pdf.line(
      this.margins.left,
      (this.margins.top += 9),
      this.pageWidth - this.margins.right,
      this.margins.top
    );

    this.pdf.setFontSize(10);
    this.pdf.setFont("Inter");
    this.pdf.setTextColor("#000");

    const maxWidth = this.pageWidth - this.margins.left - this.margins.right;

    const wrappedText = this.pdf.splitTextToSize(
      "This report contains commitment statements and reflects management’s reasonable and current expectations. No assurance can be given that such expectations will prove correct. Such statements are subject to risks and uncertainties and should not be relied upon due to ever-changing future events that could materially change the outcome. This document has been subject reviewed by an independent third-party assurance provider for GHG accounting only.",
      maxWidth
    );

    wrappedText.forEach((line) => {
      this.pdf.text(line, this.margins.left, (this.margins.top += 16));
    });

    this.pdf.setFontSize(14);
    this.pdf.setFont("Montserrat");
    this.pdf.setTextColor("#00191D");

    this.pdf.text("GHG Protocol", this.margins.left, (this.margins.top += 40));

    this.pdf.setLineWidth(0.2);
    this.pdf.setDrawColor(217, 217, 217);
    this.pdf.line(
      this.margins.left,
      (this.margins.top += 9),
      this.pageWidth - this.margins.right,
      this.margins.top
    );

    this.pdf.setFontSize(10);
    this.pdf.setFont("Inter");
    this.pdf.setTextColor("#000");

    this.pdf
      .splitTextToSize(
        "The emissions reported in this document adhere to the GHG Protocol Corporate Accounting and Reporting Standard. This standard provides a globally recognized framework for quantifying and reporting GHG emissions.",
        maxWidth
      )
      .forEach((line) => {
        this.pdf.text(line, this.margins.left, (this.margins.top += 16));
      });

    this.pdf.setFontSize(14);
    this.pdf.setFont("Montserrat");
    this.pdf.setTextColor("#00191D");

    this.pdf.text(
      "GHG Gases Included and Excluded",
      this.margins.left,
      (this.margins.top += 40)
    );

    this.pdf.setLineWidth(0.2);
    this.pdf.setDrawColor(217, 217, 217);
    this.pdf.line(
      this.margins.left,
      (this.margins.top += 9),
      this.pageWidth - this.margins.right,
      this.margins.top
    );

    autoTable(this.pdf, {
      startY: (this.margins.top += 25),
      theme: "plain",
      styles: {
        font: "Inter",
        fontSize: 10,
        textColor: "#000",
        cellPadding: {
          top: 16,
          bottom: 16,
          left: 16,
          right: 16,
        },
        valign: "middle",
        halign: "left",
        fillColor: "#fff",
        lineColor: [220, 220, 220],
        lineWidth: 0.1,
      },

      headStyles: {
        fillColor: "#F7FFFC",
        textColor: "#000",
        fontSize: 12,
        fontStyle: "normal",
        halign: "center",
        textColor: "#029366",
        font: "MontserratBold",
        cellPadding: {
          top: 6,
          bottom: 6,
        },
      },

      columnStyles: {
        0: {
          halign: "center",
          cellWidth: "auto",
        },
        1: {
          halign: "center",
          cellWidth: "auto",
        },
        2: {
          halign: "center",
          cellWidth: "auto",
        },
        3: {
          halign: "center",
          cellWidth: "auto",
        },
      },
      // Configure borders
      tableLineColor: [217, 217, 217],
      tableLineWidth: 0.1,
      showHorizontalLines: true, // Show horizontal lines
      horizontalPageBreak: true, // Maintain horizontal lines across pages
      horizontalPageBreakRepeat: true,
      head: [["GHG Gases", "Scope 1", "Scope 2", "Scope 3"]], // Table header row
      body: [
        [
          "Carbon dioxide equivalent (CO2e)",
          "Included",
          "Included",
          "Included",
        ],
        ["Methane(CH4)", "Excluded", "Excluded", "Excluded"],
        ["Nitrous oxide (N2O)", "Excluded", "Excluded", "Excluded"],
        ["Hydrofluorocarbons (HFCs)", "Excluded", "Excluded", "Excluded"],
        ["Sulphur hexafluoride (SF6)", "Excluded", "Excluded", "Excluded"],
        ["Perfluorocarbons (PFC)", "Excluded", "Excluded", "Excluded"],
        ["Nitrogen trifluoride (NF3)", "Excluded", "Excluded", "Excluded"],
      ],
      margin: {
        left:
          (this.pageWidth -
            (this.pageWidth - this.margins.left - this.margins.right)) /
          2, // Centers the table
      },
      tableWidth: this.pageWidth - this.margins.left - this.margins.right,
    });
    this.margins.top = 20;
    this.addFooter();
    this.pdf.addPage();
  }
  disclaimerAndMethodology2() {
    this.addBg(leftBg);
    this.addHeader("Disclaimer and Methodology");
    this.pageNumber = 5;
    this.margins.top = 100;

    this.pdf.setFontSize(14);
    this.pdf.setFont("Montserrat");
    this.pdf.setTextColor("#00191D");

    this.pdf.text(
      "1.2 Methodology",
      this.margins.left,
      (this.margins.top += 24)
    );

    this.pdf.setLineWidth(0.2);
    this.pdf.setDrawColor(217, 217, 217);
    this.pdf.line(
      this.margins.left,
      (this.margins.top += 9),
      this.pageWidth - this.margins.right,
      this.margins.top
    );

    this.pdf.text(
      "Emissions were calculated using the following methods:",
      this.margins.left,
      (this.margins.top += 33)
    );

    this.pdf.setLineWidth(0.2);
    this.pdf.setDrawColor(217, 217, 217);
    this.pdf.line(
      this.margins.left,
      (this.margins.top += 9),
      this.pageWidth - this.margins.right,
      this.margins.top
    );

    this.pdf.setFontSize(10);
    this.pdf.setFont("Inter");
    this.pdf.setTextColor("#000");

    this.pdf.text("•", this.margins.left, (this.margins.top += 30));
    this.pdf.text(
      "Scope 1 emissions: Direct emissions from owned or controlled sources, such as on-site combustion ",
      this.margins.left + 10,
      this.margins.top
    );
    this.pdf.text(
      "of fossil fuels.",
      this.margins.left + 10,
      (this.margins.top += 16)
    );
    this.pdf.text("•", this.margins.left, (this.margins.top += 16));
    this.pdf.text(
      "Scope 2 emissions: Indirect emissions from the purchase of electricity, heat, or steam.",
      this.margins.left + 10,
      this.margins.top
    );
    this.pdf.text("•", this.margins.left, (this.margins.top += 16));
    this.pdf.text(
      "Scope 3 emissions: Indirect emissions from activities not owned or controlled by the company, but",
      this.margins.left + 10,
      this.margins.top
    );
    this.pdf.text(
      "which the company can influence.",
      this.margins.left + 10,
      (this.margins.top += 16)
    );

    this.pdf.setFontSize(14);
    this.pdf.setFont("Montserrat");
    this.pdf.setTextColor("#00191D");

    this.pdf.text("Assumptions", this.margins.left, (this.margins.top += 33));

    this.pdf.setLineWidth(0.2);
    this.pdf.setDrawColor(217, 217, 217);
    this.pdf.line(
      this.margins.left,
      (this.margins.top += 9),
      this.pageWidth - this.margins.right,
      this.margins.top
    );

    this.pdf.setFontSize(10);
    this.pdf.setFont("Inter");
    this.pdf.setTextColor("#000");

    this.pdf.text(
      "The following assumptions and adjustments were made in the emissions calculations:",
      this.margins.left,
      (this.margins.top += 30)
    );
    this.pdf.text("•", this.margins.left, (this.margins.top += 16));
    this.pdf.text(
      "The Coefficient of Performance (COP) for chilled water consumption is assumed to be 4.5. This",
      this.margins.left + 10,
      this.margins.top
    );
    this.pdf.text(
      "value indicates that for every unit of electricity consumed, the chiller produces 4.5 units of cooling",
      this.margins.left + 10,
      (this.margins.top += 18)
    );
    this.pdf.text(
      "effect. This assumption is based on typical industry standards for modern, efficient chillers.",
      this.margins.left + 10,
      (this.margins.top += 18)
    );

    this.pdf.text("•", this.margins.left, (this.margins.top += 16));
    this.pdf.text(
      "Emission factors for heat consumption are calculated based on the assumption that natural gas is",
      this.margins.left + 10,
      this.margins.top
    );
    this.pdf.text(
      "used to generate steam or heat at an efficiency of 80%. This means that for every unit of natural",
      this.margins.left + 10,
      (this.margins.top += 18)
    );
    this.pdf.text(
      "gas consumed, 80% of the energy is converted into useful heat.",
      this.margins.left + 10,
      (this.margins.top += 18)
    );

    this.pdf.text("•", this.margins.left, (this.margins.top += 16));
    this.pdf.text(
      "The purchased desalinated water is produced using Multi-Stage Flash (MSF) technology. This is",
      this.margins.left + 10,
      this.margins.top
    );
    this.pdf.text(
      "based on the fact that MSF is the most widely used thermal desalination method, accounting for",
      this.margins.left + 10,
      (this.margins.top += 18)
    );
    this.pdf.text(
      "over 90% of such operations.",
      this.margins.left + 10,
      (this.margins.top += 18)
    );

    this.margins.top = 20;
    this.addFooter();
    this.pdf.addPage();
  }
  addExecutiveSummaryPage({
    scope1Data,
    scope2Data,
    scope3Data,
    percentData,
    user,
  }) {
    this.sectionPageone(user, percentData);
    this.sectionPagetwo(user);
    if (user?.organization?.premiumPlan?.name === "OffSet") {
      this.tableOfContentScope2();
    } else if (user?.organization?.premiumPlan?.name === "CarbonZero") {
      this.tableOfContentScope3();
    } else {
      this.tableOfContentScope1();
    }
    this.disclaimerAndMethodology1();
    this.disclaimerAndMethodology2();

    this.pageNumber = 6;
    this.addBg(leftBg);
    this.addHeader("Greenhouse Gas Emissions Breakdown");

    this.pdf.setFontSize(11);
    this.pdf.setTextColor("#000");
    this.pdf.setFont("Inter");
    const maxWidth = this.pageWidth - this.margins.left - this.margins.right;

    const totalEmissions =
      scope1Data.grandTotalEmissions +
      scope2Data.grandTotalEmissions +
      scope3Data.grandTotalEmissions;

    const wrappedText = this.pdf.splitTextToSize(
      `This section provides a comprehensive breakdown of ${user?.organization?.name}'s greenhouse gas emissions for the reporting period ${percentData.time_period} ${percentData.periodicity} ${percentData.year}. Emissions are categorized into three scopes:`,
      maxWidth
    );

    this.pdf.text(wrappedText, this.margins.left, this.margins.top + 100);

    this.pdf.setFontSize(15);
    this.pdf.text(
      "Total GHG Emissions Distribution",
      this.margins.left,
      this.margins.top + 160
    );
    this.pdf.addImage(
      lineChart,
      "PNG",
      this.margins.left,
      this.margins.top + 180,
      this.pageWidth - 120,
      16
    );

    this.pdf.setFontSize(10);
    this.pdf.setFont("Inter");
    this.pdf.setTextColor("#000");
    this.pdf.text(
      `Scope 1 (${percentData?.emissions?.scope1?.percentage ?? 0})`,
      this.margins.left,
      this.margins.top + 220
    );
    this.pdf.setFontSize(10);
    this.pdf.setFont("Inter");
    this.pdf.setTextColor("#000");
    this.pdf.text(
      `${percentData?.emissions?.scope1?.value?.toFixed(6) ?? 0} tCO2e`,
      this.margins.left,
      this.margins.top + 235
    );

    this.pdf.setFontSize(10);
    this.pdf.setFont("Inter");
    this.pdf.setTextColor("#000");
    this.pdf.text(
      `Scope 2 (${percentData?.emissions?.scope2?.percentage ?? 0})`,
      this.margins.left + 200,
      this.margins.top + 220
    );
    this.pdf.setFontSize(10);
    this.pdf.setFont("Inter");
    this.pdf.setTextColor("#000");
    this.pdf.text(
      `${percentData?.emissions?.scope2?.value?.toFixed(6) ?? 0} tCO2e`,
      this.margins.left + 200,
      this.margins.top + 235
    );

    this.pdf.setFontSize(10);
    this.pdf.setFont("Inter");
    this.pdf.setTextColor("#000");
    this.pdf.text(
      `Scope 3 (${percentData?.emissions?.scope3?.percentage ?? 0})`,
      this.margins.left + 350,
      this.margins.top + 220
    );
    this.pdf.setFontSize(10);
    this.pdf.setFont("Inter");
    this.pdf.setTextColor("#000");
    this.pdf.text(
      `${percentData?.emissions?.scope3?.value?.toFixed(6) ?? 0} tCO2e`,
      this.margins.left + 350,
      this.margins.top + 235
    );

    this.pdf.setFont("Montserrat"); // Make sure Montserrat is loaded in your PDF
    this.pdf.setFontSize(14);
    this.pdf.setTextColor("#000");
    this.pdf.text(
      `2.1 Scope 1 Emissions: ${scope1Data.grandTotalEmissions.toFixed(6)} tCO2e`,
      this.margins.left,
      this.margins.top + 275
    );

    this.pdf.setFontSize(11);
    this.pdf.setTextColor("#000");
    this.pdf.setFont("Inter");
    this.pdf.text(
      "Direct emissions from owned or controlled sources, such as on-site combustion of fossil fuels. ",
      this.margins.left,
      this.margins.top + 305
    );

    autoTable(this.pdf, {
      startY: this.margins.top + 335,
      theme: "plain",
      styles: {
        font: "helvetica",
        fontSize: 10,
        cellPadding: {
          top: 12,
          bottom: 12,
          left: 16,
          right: 16,
        },
        valign: "middle",
        halign: "left",
        fillColor: "#fff",
        lineColor: [220, 220, 220],
        lineWidth: 0.1,
      },

      headStyles: {
        fillColor: "#e6f8f2",
        textColor: "#000",
        fontSize: 10,
        fontStyle: "normal",
      },

      columnStyles: {
        0: {
          halign: "left",
          cellWidth: "auto",
        },
        1: {
          halign: "left",
          cellWidth: "auto",
        },
        2: {
          halign: "left",
          cellWidth: "auto",
        },
      },

      // Configure borders
      tableLineColor: [220, 220, 220],
      tableLineWidth: 0.1,
      showHorizontalLines: true, // Show horizontal lines
      horizontalPageBreak: true, // Maintain horizontal lines across pages
      horizontalPageBreakRepeat: true,

      didParseCell: (data) => {
        // Remove vertical borders for middle columns
        if (data.column.index === 0) {
          data.cell.styles.lineWidth = 0;
          data.cell.styles.fontWeight = 500;
        }

        if (data.cell.raw === "Scope 1") {
          data.cell.styles.textColor = "#029366";
          data.cell.styles.fontStyle = "bold";
        }
      },
      head: [["Scope", "KPIs", "Emissions (tCO2e)"]], // Table header row
      body: [
        [
          "Scope 1",
          "Fuel Consumption",
          scope1Data.totalFuelEmissions.toFixed(6),
        ],
        [
          "",
          "Refrigerant Data",
          scope1Data.totalRefrigerantEmissions.toFixed(6),
        ],
        ["", "Process Emission", scope1Data.totalProcessEmissions.toFixed(6)],
      ],
      margin: {
        left:
          (this.pageWidth -
            (this.pageWidth - this.margins.left - this.margins.right)) /
          2, // Centers the table
      },
      tableWidth: this.pageWidth - this.margins.left - this.margins.right,
    });

    this.addFooter();
    this.pdf.addPage();

    // Second Page
    this.pageNumber = 7;
    this.addHeader("");

    this.pdf.setFont("Montserrat"); // Make sure Montserrat is loaded in your PDF
    this.pdf.setFontSize(14);
    this.pdf.setTextColor("#000");
    this.pdf.text(
      `2.2 Scope 2 Emissions: ${scope2Data.grandTotalEmissions.toFixed(6)} tCO2e`,
      this.margins.left,
      this.margins.top + 60
    );

    this.pdf.setFontSize(11);
    this.pdf.setTextColor("#000");
    this.pdf.setFont("Inter");
    this.pdf.text(
      "Indirect emissions from the purchase of electricity,chilled water, desalinated water, heat, or steam. ",
      this.margins.left,
      this.margins.top + 90
    );

    // Calculate total emissions for each scope 2 category
    const electricityEmissions =
      scope2Data.electricityConsumption?.reduce(
        (sum, item) => sum + item.emissions,
        0
      ) || 0;
    const chilledWaterEmissions =
      scope2Data.chilledWaterConsumption?.reduce(
        (sum, item) => sum + item.emissions,
        0
      ) || 0;
    const waterEmissions =
      scope2Data.purchasedDesalinatedWaterConsumption?.reduce(
        (sum, item) => sum + item.emissions,
        0
      ) || 0;
    const heatEmissions =
      scope2Data.heatConsumption?.reduce(
        (sum, item) => sum + item.emissions,
        0
      ) || 0;

    autoTable(this.pdf, {
      startY: this.margins.top + 120,
      theme: "plain",
      styles: {
        font: "helvetica",
        fontSize: 10,
        cellPadding: {
          top: 12,
          bottom: 12,
          left: 16,
          right: 16,
        },
        valign: "middle",
        halign: "left",
        fillColor: "#fff",
        lineColor: [220, 220, 220],
        lineWidth: 0.1,
      },

      headStyles: {
        fillColor: "#e6f8f2",
        textColor: "#000",
        fontSize: 10,
        fontStyle: "normal",
      },

      columnStyles: {
        0: {
          halign: "left",
          cellWidth: "auto",
        },
        1: {
          halign: "left",
          cellWidth: "auto",
        },
        2: {
          halign: "left",
          cellWidth: "auto",
        },
      },

      // Configure borders
      tableLineColor: [220, 220, 220],
      tableLineWidth: 0.1,
      showHorizontalLines: true, // Show horizontal lines
      horizontalPageBreak: true, // Maintain horizontal lines across pages
      horizontalPageBreakRepeat: true,

      didParseCell: (data) => {
        // Remove vertical borders for middle columns
        if (data.column.index === 0) {
          data.cell.styles.lineWidth = 0;
          data.cell.styles.fontWeight = 500;
        }

        if (data.cell.raw === "Scope 2") {
          data.cell.styles.textColor = "#029366";
          data.cell.styles.fontStyle = "bold";
        }
      },
      head: [["Scope", "KPIs", "Emissions (tCO2e)"]], // Table header row
      body: [
        ["Scope 2", "Electricity Consumption", electricityEmissions.toFixed(6)],
        ["", "Chilled Water Consumption", chilledWaterEmissions.toFixed(6)],
        ["", "Purchased Desalinated Water", waterEmissions.toFixed(6)],
        ["", "Heat Consumption", heatEmissions.toFixed(6)],
      ],
      margin: {
        left:
          (this.pageWidth -
            (this.pageWidth - this.margins.left - this.margins.right)) /
          2, // Centers the table
      },
      tableWidth: this.pageWidth - this.margins.left - this.margins.right,
    });

    const finalY = this.pdf.lastAutoTable.finalY + 10;

    this.pdf.setFontSize(14);
    this.pdf.setTextColor("#000");
    this.pdf.setFont("Montserrat");
    this.pdf.text(
      `2.3 Scope 3 Emissions: ${scope3Data.grandTotalEmissions.toFixed(6)} tCO2e`,
      this.margins.left,
      finalY + 40
    );

    const maxWidth3 = this.pageWidth + 50;
    const wrappedText2 = this.pdf.splitTextToSize(
      `Indirect emissions from activities not owned or controlled by the company, but which the company can influence. `,
      maxWidth3
    );
    this.pdf.setFontSize(11);
    this.pdf.setTextColor("#000");
    this.pdf.setFont("Inter");
    this.pdf.text(wrappedText2, this.margins.left, finalY + 70);

    autoTable(this.pdf, {
      startY: finalY + 100,
      theme: "plain",
      styles: {
        font: "helvetica",
        fontSize: 10,
        cellPadding: {
          top: 12,
          bottom: 12,
          left: 16,
          right: 16,
        },
        valign: "middle",
        halign: "left",
        fillColor: "#fff",
        lineColor: [220, 220, 220],
        lineWidth: 0.1,
      },

      headStyles: {
        fillColor: "#e6f8f2",
        textColor: "#000",
        fontSize: 10,
        fontStyle: "normal",
      },

      columnStyles: {
        0: {
          halign: "left",
          cellWidth: "auto",
        },
        1: {
          halign: "left",
          cellWidth: "auto",
        },
        2: {
          halign: "left",
          cellWidth: "auto",
        },
      },

      // Configure borders
      tableLineColor: [220, 220, 220],
      tableLineWidth: 0.1,
      showHorizontalLines: true, // Show horizontal lines
      horizontalPageBreak: true, // Maintain horizontal lines across pages
      horizontalPageBreakRepeat: true,

      didParseCell: (data) => {
        if (data.column.index === 0) {
          data.cell.styles.lineWidth = 0;
          data.cell.styles.fontWeight = 500;
        }

        if (data.cell.raw === "Scope 3") {
          data.cell.styles.textColor = "#029366";
          data.cell.styles.fontStyle = "bold";
        }
      },
      head: [["Scope", "KPIs", "Emissions (tCO2e)"]], // Table header row
      body: [
        [
          "Scope 3",
          "Waste Generated",
          scope3Data.totalWasteEmissions.toFixed(6),
        ],
        [
          "",
          "Business Travel",
          scope3Data.totalBusinessTravelEmissions.toFixed(6),
        ],
        [
          "",
          "Purchased Goods",
          scope3Data.totalPurchasedGoodsEmissions.toFixed(6),
        ],
        ["", "Capital Goods", scope3Data.totalCapitalGoodsEmissions.toFixed(6)],
        ["", "Investments", scope3Data.totalInvestmentsEmissions.toFixed(6)],
        [
          "",
          "Employee Commuting",
          scope3Data.totalEmployeeCommutingEmissions.toFixed(6),
        ],
        [
          "",
          "Fuel Related Activities",
          scope3Data.totalFuelRelatedEmissions.toFixed(6),
        ],
        [
          "",
          "Upstream Leased Assets",
          scope3Data.totalUpstreamLeasedAssetsEmissions.toFixed(6),
        ],
        [
          "",
          "Downstream Leased Assets",
          scope3Data.totalDownstreamLeasedAssetsEmissions.toFixed(6),
        ],
      ],
      margin: {
        left:
          (this.pageWidth -
            (this.pageWidth - this.margins.left - this.margins.right)) /
          2, // Centers the table
      },
      tableWidth: this.pageWidth - this.margins.left - this.margins.right,
    });

    this.addFooter();
    this.pdf.addPage();
  }

  addScope1AnalysisOne(scope1Data, percentData) {
    this.pageNumber = 8;
    this.addBg(rightBg);
    const totalFuelEmissions = scope1Data.fuelEmissions.reduce(
      (total, item) => total + item.emissions,
      0
    );
    this.addHeader("Fuel Consumption");
    this.pdf.setFont("Inter");
    this.pdf.setFontSize(11);
    this.pdf.setTextColor("#000");
    this.pdf.text(
      `Emission from Fuel Consumption for ${percentData.time_period} ${percentData.periodicity} ${percentData.year}: ${totalFuelEmissions.toFixed(2)} tCO2e`,
      this.margins.left,
      this.margins.top + 100
    );

    this.pdf.setFont("Montserrat", "normal"); // Make sure Montserrat is loaded in your PDF
    this.pdf.setFontSize(14);
    this.pdf.text(
      "Breakdown by fuel type: ",
      this.margins.left,
      this.margins.top + 140
    );

    const tableData = scope1Data.fuelEmissions.map((item) => [
      item.fuelType,
      `${item.quantity} ${item.unit}`,
      `${item.emissions.toFixed(2)}`,
    ]);

    tableData.push(["Total", "", `${totalFuelEmissions.toFixed(2)}`]);

    autoTable(this.pdf, {
      startY: this.margins.top + 160,
      theme: "plain",
      styles: {
        font: "helvetica",
        fontSize: 10,
        cellPadding: {
          top: 12,
          bottom: 12,
          left: 16,
          right: 16,
        },
        valign: "middle",
        halign: "left",
        fillColor: "#fff",
        lineColor: [220, 220, 220],
        lineWidth: 0.1,
      },

      headStyles: {
        fillColor: "#e6f8f2",
        textColor: "#000",
        fontSize: 10,
        fontStyle: "normal",
      },

      columnStyles: {
        0: {
          halign: "left",
          cellWidth: "auto",
        },
        1: {
          halign: "left",
          cellWidth: "auto",
        },
        2: {
          halign: "left",
          cellWidth: "auto",
        },
      },

      // Configure borders
      tableLineColor: [220, 220, 220],
      tableLineWidth: 0.1,
      showHorizontalLines: true, // Show horizontal lines
      horizontalPageBreak: true, // Maintain horizontal lines across pages
      horizontalPageBreakRepeat: true,

      didParseCell: (data) => {
        // Remove vertical borders for middle columns
        if (
          data.column.index > 0 &&
          data.column.index < data.table.columns.length - 1
        ) {
          // data.cell.styles.lineWidth = 0;
        }

        // Style for total row
        if (data.row.index === tableData.length - 1) {
          data.cell.styles.fillColor = "#e6f8f2";
          data.cell.styles.fontStyle = "normal";
        }
      },
      head: [["Fuel Type", "Consumption", "Emissions (tCO2e)"]], // Table header row
      body: tableData,
      margin: {
        left:
          (this.pageWidth -
            (this.pageWidth - this.margins.left - this.margins.right)) /
          2, // Centers the table
      },
      tableWidth: this.pageWidth - this.margins.left - this.margins.right,
    });

    const finalY = this.pdf.lastAutoTable.finalY + 10;

    this.pdf.setFont("Montserrat"); // Make sure Montserrat is loaded in your PDF
    this.pdf.setFontSize(14);
    this.pdf.setTextColor("#000");
    this.pdf.text("Calculation methodology:", this.margins.left, finalY + 30);

    // Reset font for the description text
    this.pdf.setFont("Inter"); // Or keep Montserrat if you want the whole text in it
    this.pdf.setFontSize(11);
    this.pdf.setTextColor("#000");

    // Define the max width for the text to wrap
    const maxWidth = this.pageWidth - this.margins.left - this.margins.right;

    // Use splitTextToSize to break the text into multiple lines
    const wrappedText = this.pdf.splitTextToSize(
      "The tool utilizes emission factors from the US EPA's Emission Factors for GHG Inventories (modified on June 5, 2024) to calculate greenhouse gas emissions associated with fuel consumption. These factors are based on the type of fuel.",
      maxWidth
    );

    // Calculate line height (1.5 times the font size for good readability)
    const lineHeight = this.pdf.getFontSize() * 1.5;

    // Render the wrapped text with line spacing
    // wrappedText.forEach((line, index) => {
    //     this.pdf.text(
    //         line,
    //         this.margins.left,
    //         finalY + 60 + (index * lineHeight)
    //     );
    // });

    wrappedText.forEach((line, index) => {
      const yPos = finalY + 60 + index * lineHeight; // Maintain proper line spacing

      if (line.includes("US EPA's Emission Factors for GHG Inventories")) {
        const splitLine = line.split(
          "US EPA's Emission Factors for GHG Inventories"
        );

        // Render normal text before the bold part
        this.pdf.setFont("Inter", "normal");
        this.pdf.text(splitLine[0], this.margins.left, yPos);

        // Calculate width of normal text
        const normalTextWidth = this.pdf.getTextWidth(splitLine[0]);

        // Render the bold text
        this.pdf.setFont("Inter", "bold");
        this.pdf.text(
          "US EPA's Emission Factors for GHG Inventories",
          this.margins.left + normalTextWidth,
          yPos
        );

        // Reset to normal font
        this.pdf.setFont("Inter", "normal");

        // Render remaining text after bold part, if any
        if (splitLine[1]) {
          const boldTextWidth = this.pdf.getTextWidth(
            "US EPA's Emission Factors for GHG Inventories"
          );
          this.pdf.text(
            splitLine[1],
            this.margins.left + normalTextWidth + boldTextWidth,
            yPos
          );
        }
      } else {
        // Render normal wrapped text
        this.pdf.setFont("Inter", "normal");
        this.pdf.text(line, this.margins.left, yPos);
      }
    });

    this.addFooter();
    this.pdf.addPage();
  }

  addScope1AnalysisTwo(scope1Data, percentData) {
    this.pageNumber = 9;
    this.addBg(leftBg);
    const totalRefrigerantEmissions = scope1Data.refrigerantEmissions.reduce(
      (total, item) => total + item.emissions,
      0
    );
    this.addHeader("Refrigerant Consumption");
    this.pdf.setFont("Inter");
    this.pdf.setFontSize(11);
    this.pdf.setTextColor("#000");
    this.pdf.text(
      `Emission from Refrigerant Consumption for ${percentData.time_period} ${percentData.periodicity} ${percentData.year}: ${totalRefrigerantEmissions.toFixed(2)} tCO2e`,
      this.margins.left,
      this.margins.top + 100
    );

    this.pdf.setFont("Montserrat");
    this.pdf.setFontSize(14);
    this.pdf.setTextColor("#000");
    this.pdf.text(
      "Breakdown by Refrigerant type:  ",
      this.margins.left,
      this.margins.top + 140
    );

    // Transform data for table
    const tableData = scope1Data.refrigerantEmissions.map((item) => [
      item.refrigerantType,
      `${item.quantity} ${item.unit}`,
      `${item.emissions.toFixed(2)}`,
    ]);

    // Add total row
    tableData.push(["Total", "", `${totalRefrigerantEmissions.toFixed(2)}`]);

    autoTable(this.pdf, {
      startY: this.margins.top + 160,
      theme: "plain",
      styles: {
        font: "helvetica",
        fontSize: 10,
        cellPadding: {
          top: 12,
          bottom: 12,
          left: 16,
          right: 16,
        },
        valign: "middle",
        halign: "left",
        fillColor: "#fff",
        lineColor: [220, 220, 220],
        lineWidth: 0.1,
      },

      headStyles: {
        fillColor: "#e6f8f2",
        textColor: "#000",
        fontSize: 10,
        fontStyle: "normal",
      },

      columnStyles: {
        0: {
          halign: "left",
          cellWidth: "auto",
        },
        1: {
          halign: "left",
          cellWidth: "auto",
        },
        2: {
          halign: "left",
          cellWidth: "auto",
        },
      },

      // Configure borders
      tableLineColor: [220, 220, 220],
      tableLineWidth: 0.1,
      showHorizontalLines: true, // Show horizontal lines
      horizontalPageBreak: true, // Maintain horizontal lines across pages
      horizontalPageBreakRepeat: true,

      didParseCell: (data) => {
        // Remove vertical borders for middle columns
        if (
          data.column.index > 0 &&
          data.column.index < data.table.columns.length - 1
        ) {
          // data.cell.styles.lineWidth = 0;
        }

        // Style for total row
        if (data.row.index === tableData.length - 1) {
          data.cell.styles.fillColor = "#e6f8f2";
          data.cell.styles.fontStyle = "normal";
        }
      },

      head: [["Refrigerant Type", "Consumption", "Emissions (tCO2e)"]],
      body: tableData,
      margin: {
        left:
          (this.pageWidth -
            (this.pageWidth - this.margins.left - this.margins.right)) /
          2,
        top: 15,
        bottom: 15,
      },
      tableWidth: this.pageWidth - this.margins.left - this.margins.right,
    });

    const finalY = this.pdf.lastAutoTable.finalY + 10;

    this.pdf.setFont("Montserrat");
    this.pdf.setFontSize(14);
    this.pdf.setTextColor("#000");
    this.pdf.text("Calculation methodology:", this.margins.left, finalY + 30);

    // Reset font for the description text
    this.pdf.setFont("Inter");
    this.pdf.setFontSize(11);
    this.pdf.setTextColor("#000");

    // Define the max width for the text to wrap
    const maxWidth = this.pageWidth - this.margins.left - this.margins.right;

    // Use splitTextToSize to break the text into multiple lines
    const wrappedText = this.pdf.splitTextToSize(
      "The tool employs emission factors from the US EPA's Emission Factors for GHG Inventories (modified on June 5, 2024) to estimate greenhouse gas emissions related to refrigerant consumption. These factors are specific to different types of refrigerants.",
      maxWidth
    );

    // Calculate line height (1.5 times the font size for good readability)
    const lineHeight = this.pdf.getFontSize() * 1.5;

    // Render the wrapped text with line spacing
    // wrappedText.forEach((line, index) => {
    //     this.pdf.text(
    //         line,
    //         this.margins.left,
    //         finalY + 60 + (index * lineHeight)
    //     );
    // });

    wrappedText.forEach((line, index) => {
      const yPos = finalY + 60 + index * lineHeight;

      if (line.includes("US EPA's Emission Factors for GHG Inventories")) {
        const splitLine = line.split(
          "US EPA's Emission Factors for GHG Inventories"
        );

        // Render normal text before the bold part
        this.pdf.setFont("Inter", "normal");
        this.pdf.text(splitLine[0], this.margins.left, yPos);

        // Calculate width of normal text
        const normalTextWidth = this.pdf.getTextWidth(splitLine[0]);

        // Render the bold text
        this.pdf.setFont("Inter", "bold");
        this.pdf.text(
          "US EPA's Emission Factors for GHG Inventories",
          this.margins.left + normalTextWidth,
          yPos
        );

        // Reset to normal font
        this.pdf.setFont("Inter", "normal");

        // Render remaining text after bold part, if any
        if (splitLine[1]) {
          const boldTextWidth = this.pdf.getTextWidth(
            "US EPA's Emission Factors for GHG Inventories"
          );
          this.pdf.text(
            splitLine[1],
            this.margins.left + normalTextWidth + boldTextWidth,
            yPos
          );
        }
      } else {
        // Render normal wrapped text
        this.pdf.setFont("Inter", "normal");
        this.pdf.text(line, this.margins.left, yPos);
      }
    });

    this.addFooter();
    this.pdf.addPage();
  }

  addScope1AnalysisThree(scope1Data, percentData) {
    this.pageNumber = 10;
    this.addBg(rightBg);
    this.addHeader("Process Emissions");
    const totalProcessEmissions = scope1Data.processEmissions.reduce(
      (total, item) => total + item.emissions,
      0
    );
    this.pdf.setFont("Inter");
    this.pdf.setFontSize(11);
    this.pdf.setTextColor("#000");
    this.pdf.text(
      `Total Process Emissions for the ${percentData.time_period} ${percentData.periodicity} ${percentData.year}: ${totalProcessEmissions.toFixed(2)} tCO2e`,
      this.margins.left,
      this.margins.top + 100
    );

    this.pdf.setFont("Inter");
    this.pdf.setFontSize(14);
    this.pdf.setTextColor("#000");
    this.pdf.text(
      "Breakdown by type: ",
      this.margins.left,
      this.margins.top + 140
    );

    // Transform data for table
    const tableData = scope1Data.processEmissions.map((item) => [
      item.processType,
      `${item.quantity}`,
      `${item.emissions.toFixed(6)}`,
    ]);

    // Add total row
    tableData.push(["Total", "", `${totalProcessEmissions.toFixed(6)}`]);

    autoTable(this.pdf, {
      startY: this.margins.top + 160,
      theme: "plain",
      styles: {
        font: "helvetica",
        fontSize: 10,
        cellPadding: {
          top: 12,
          bottom: 12,
          left: 16,
          right: 16,
        },
        valign: "middle",
        halign: "left",
        fillColor: "#fff",
        lineColor: [220, 220, 220],
        lineWidth: 0.1,
      },

      headStyles: {
        fillColor: "#e6f8f2",
        textColor: "#000",
        fontSize: 10,
        fontStyle: "normal",
      },

      columnStyles: {
        0: {
          halign: "left",
          cellWidth: "auto",
        },
        1: {
          halign: "left",
          cellWidth: "auto",
        },
        2: {
          halign: "left",
          cellWidth: "auto",
        },
      },

      // Configure borders
      tableLineColor: [220, 220, 220],
      tableLineWidth: 0.1,
      showHorizontalLines: true, // Show horizontal lines
      horizontalPageBreak: true, // Maintain horizontal lines across pages
      horizontalPageBreakRepeat: true,

      didParseCell: (data) => {
        // Remove vertical borders for middle columns
        if (
          data.column.index > 0 &&
          data.column.index < data.table.columns.length - 1
        ) {
          // data.cell.styles.lineWidth = 0;
        }

        // Style for total row
        if (data.row.index === tableData.length - 1) {
          data.cell.styles.fillColor = "#e6f8f2";
          data.cell.styles.fontStyle = "normal";
        }
      },
      head: [["Type", "Consumption", "Emissions (tCO2e)"]], // Table header row
      body: tableData,
      margin: {
        left:
          (this.pageWidth -
            (this.pageWidth - this.margins.left - this.margins.right)) /
          2, // Centers the table
      },
      tableWidth: this.pageWidth - this.margins.left - this.margins.right,
    });

    const finalY = this.pdf.lastAutoTable.finalY + 10;

    this.pdf.setFont("Montserrat"); // Make sure Montserrat is loaded in your PDF
    this.pdf.setFontSize(14);
    this.pdf.setTextColor("#000");
    this.pdf.text("Calculation methodology:", this.margins.left, finalY + 30);

    // Reset font for the description text
    this.pdf.setFont("Inter"); // Or keep Montserrat if you want the whole text in it
    this.pdf.setFontSize(11);
    this.pdf.setTextColor("#000");

    // Define the max width for the text to wrap
    const maxWidth = this.pageWidth - this.margins.left - this.margins.right;

    // Use splitTextToSize to break the text into multiple lines
    const wrappedText = this.pdf.splitTextToSize(
      "The tool follows the methodology outlined in the US EPA's resource for the oil and gas sector to calculate emissions from industrial processes. This involves identifying emission sources, quantifying emissions rates, and applying appropriate emission factors.",
      maxWidth
    );

    // Calculate line height (1.5 times the font size for good readability)
    const lineHeight = this.pdf.getFontSize() * 1.5;

    // Render the wrapped text with line spacing
    // wrappedText.forEach((line, index) => {
    //     this.pdf.text(
    //         line,
    //         this.margins.left,
    //         finalY + 60 + (index * lineHeight)
    //     );
    // });

    wrappedText.forEach((line, index) => {
      const yPos = finalY + 60 + index * lineHeight;

      if (line.includes("US EPA's resource for the oil and gas sector")) {
        const splitLine = line.split(
          "US EPA's resource for the oil and gas sector"
        );

        // Draw normal text
        this.pdf.setFont("Inter", "normal");
        this.pdf.text(splitLine[0], this.margins.left, yPos);

        // Calculate X position after normal text
        const textWidth = this.pdf.getTextWidth(splitLine[0]);

        // Draw bold text at correct position
        this.pdf.setFont("Inter", "bold");
        this.pdf.text(
          "US EPA's resource for the oil and gas sector",
          this.margins.left + textWidth,
          yPos
        );

        // Reset font and add remaining text
        this.pdf.setFont("Inter", "normal");
        if (splitLine[1]) {
          const boldTextWidth = this.pdf.getTextWidth(
            "US EPA's resource for the oil and gas sector"
          );
          this.pdf.text(
            splitLine[1],
            this.margins.left + textWidth + boldTextWidth,
            yPos
          );
        }
      } else {
        // Print normally wrapped lines
        this.pdf.setFont("Inter", "normal");
        this.pdf.text(line, this.margins.left, yPos);
      }
    });

    this.addFooter();
    this.pdf.addPage();
  }

  addScope2AnalysisOne(scope2Data, percentData) {
    this.pageNumber = 11;
    this.addBg(leftBg);
    // Handle electricity consumption data
    const electricityData = this.getEmissionsData(
      scope2Data,
      "electricityConsumption"
    );
    const totalElectricityEmissions =
      this.calculateTotalEmissions(electricityData);
    this.addHeader("Electricity Consumption");

    this.pdf.setFont("Inter");
    this.pdf.setFontSize(11);
    this.pdf.setTextColor("#000");
    this.pdf.text(
      `Emission from Electricity Consumption for ${percentData.time_period} ${percentData.periodicity} ${percentData.year}: ${totalElectricityEmissions.toFixed(6)} tCO2e`,
      this.margins.left,
      this.margins.top + 100
    );

    // Create table data for electricity
    const electricityTableData = electricityData.map((item) => [
      `${item.quantity} ${item.unit}`,
      `${item.emissions.toFixed(6)}`,
    ]);

    autoTable(this.pdf, {
      startY: this.margins.top + 130,
      theme: "plain",
      styles: {
        font: "helvetica",
        fontSize: 10,
        cellPadding: {
          top: 12,
          bottom: 12,
          left: 16,
          right: 16,
        },
        valign: "middle",
        halign: "left",
        fillColor: "#fff",
        lineColor: [220, 220, 220],
        lineWidth: 0.1,
      },

      headStyles: {
        fillColor: "#e6f8f2",
        textColor: "#000",
        fontSize: 10,
        fontStyle: "normal",
      },

      columnStyles: {
        0: {
          halign: "left",
          cellWidth: "auto",
        },
        1: {
          halign: "left",
          cellWidth: "auto",
        },
        2: {
          halign: "left",
          cellWidth: "auto",
        },
      },

      // Configure borders
      tableLineColor: [220, 220, 220],
      tableLineWidth: 0.1,
      showHorizontalLines: true, // Show horizontal lines
      horizontalPageBreak: true, // Maintain horizontal lines across pages
      horizontalPageBreakRepeat: true,

      didParseCell: (data) => {
        // Remove vertical borders for middle columns
        if (
          data.column.index > 0 &&
          data.column.index < data.table.columns.length - 1
        ) {
          // data.cell.styles.lineWidth = 0;
        }

        // // Style for total row
        // if (data.row.index === tableData.length - 1) {
        //     data.cell.styles.fillColor = '#e6f8f2';
        //     data.cell.styles.fontStyle = 'normal';
        // }
      },
      head: [["Consumption", "Emissions (tCO2e)"]], // Table header row
      body: electricityTableData,
      margin: {
        left:
          (this.pageWidth -
            (this.pageWidth - this.margins.left - this.margins.right)) /
          2, // Centers the table
      },
      tableWidth: this.pageWidth - this.margins.left - this.margins.right,
    });

    const finalY = this.pdf.lastAutoTable.finalY + 10;

    this.pdf.setFont("Montserrat"); // Make sure Montserrat is loaded in your PDF
    this.pdf.setFontSize(14);
    this.pdf.setTextColor("#000");
    this.pdf.text("Calculation methodology:", this.margins.left, finalY + 30);

    // Reset font for the description text
    this.pdf.setFont("Inter"); // Or keep Montserrat if you want the whole text in it
    this.pdf.setFontSize(11);
    this.pdf.setTextColor("#000");

    // Define the max width for the text to wrap
    const maxWidth = this.pageWidth - this.margins.left - this.margins.right;

    // Use splitTextToSize to break the text into multiple lines
    const wrappedText = this.pdf.splitTextToSize(
      "The tool uses country-specific emission factors published by the IEA in 2022 to estimate greenhouse gas emissions associated with electricity consumption. These factors reflect the mix of energy sources used for electricity generation in each country.",
      maxWidth
    );

    // Calculate line height (1.5 times the font size for good readability)
    const lineHeight = this.pdf.getFontSize() * 1.5;

    // Render the wrapped text with line spacing
    wrappedText.forEach((line, index) => {
      this.pdf.text(line, this.margins.left, finalY + 60 + index * lineHeight);
    });

    // Handle chilled water consumption data
    const chilledWaterData = this.getEmissionsData(
      scope2Data,
      "chilledWaterConsumption"
    );
    const totalChilledWaterEmissions =
      this.calculateTotalEmissions(chilledWaterData);
    this.pdf.setFontSize(18);
    this.pdf.setTextColor("#029366");
    this.pdf.setFont("MontserratBold");
    this.pdf.text("Chilled Water Consumption", this.margins.left, finalY + 160);
    this.pdf.setFont("Inter");
    this.pdf.setFontSize(11);
    this.pdf.setTextColor("#000");
    this.pdf.text(
      `Emission from Chilled Water Consumption for ${percentData.time_period} ${percentData.periodicity} ${percentData.year}: ${totalChilledWaterEmissions.toFixed(6)} tCO2e`,
      this.margins.left,
      finalY + 190
    );

    // Create table data for chilled water
    const chilledWaterTableData = chilledWaterData.map((item) => [
      `${item.quantity} ${item.unit}`,
      `${item.emissions.toFixed(6)}`,
    ]);

    autoTable(this.pdf, {
      startY: finalY + 220,
      theme: "plain",
      styles: {
        font: "helvetica",
        fontSize: 10,
        cellPadding: {
          top: 12,
          bottom: 12,
          left: 16,
          right: 16,
        },
        valign: "middle",
        halign: "left",
        fillColor: "#fff",
        lineColor: [220, 220, 220],
        lineWidth: 0.1,
      },

      headStyles: {
        fillColor: "#e6f8f2",
        textColor: "#000",
        fontSize: 10,
        fontStyle: "normal",
      },

      columnStyles: {
        0: {
          halign: "left",
          cellWidth: "auto",
        },
        1: {
          halign: "left",
          cellWidth: "auto",
        },
        2: {
          halign: "left",
          cellWidth: "auto",
        },
      },

      // Configure borders
      tableLineColor: [220, 220, 220],
      tableLineWidth: 0.1,
      showHorizontalLines: true, // Show horizontal lines
      horizontalPageBreak: true, // Maintain horizontal lines across pages
      horizontalPageBreakRepeat: true,

      didParseCell: (data) => {
        // Remove vertical borders for middle columns
        if (
          data.column.index > 0 &&
          data.column.index < data.table.columns.length - 1
        ) {
          // data.cell.styles.lineWidth = 0;
        }

        // // Style for total row
        // if (data.row.index === tableData.length - 1) {
        //     data.cell.styles.fillColor = '#e6f8f2';
        //     data.cell.styles.fontStyle = 'normal';
        // }
      },
      head: [["Consumption", "Emissions (tCO2e)"]], // Table header row
      body: chilledWaterTableData,
      margin: {
        left:
          (this.pageWidth -
            (this.pageWidth - this.margins.left - this.margins.right)) /
          2, // Centers the table
      },
      tableWidth: this.pageWidth - this.margins.left - this.margins.right,
    });

    this.pdf.setFont("Montserrat"); // Make sure Montserrat is loaded in your PDF
    this.pdf.setFontSize(14);
    this.pdf.setTextColor("#000");
    this.pdf.text(
      "Calculation methodology:",
      this.margins.left,
      this.pdf.lastAutoTable.finalY + 10 + 30
    );

    // Reset font for the description text
    this.pdf.setFont("Inter"); // Or keep Montserrat if you want the whole text in it
    this.pdf.setFontSize(11);
    this.pdf.setTextColor("#000");

    // Use splitTextToSize to break the text into multiple lines
    const wrappedText2 = this.pdf.splitTextToSize(
      "The tool estimates the electricity used to produce chilled water using country-specific emission factors from the IEA 2022 data. These factors are then applied to the chilled water consumption to calculate associated greenhouse gas emissions.",
      maxWidth
    );

    // Render the wrapped text with line spacing
    wrappedText2.forEach((line, index) => {
      this.pdf.text(
        line,
        this.margins.left,
        this.pdf.lastAutoTable.finalY + 10 + 60 + index * lineHeight
      );
    });

    this.addFooter();
    this.pdf.addPage();
  }

  addScope2AnalysisTwo(scope2Data, percentData) {
    this.pageNumber = 12;
    this.addBg(rightBg);

    // Handle desalinated water consumption data
    const desalinatedWaterData = this.getEmissionsData(
      scope2Data,
      "purchasedDesalinatedWaterConsumption"
    );
    const totalDesalinatedWaterEmissions =
      this.calculateTotalEmissions(desalinatedWaterData);

    this.addHeader("Purchased Desalinated Water");
    this.pdf.setFont("Inter");
    this.pdf.setFontSize(11);
    this.pdf.setTextColor("#000");
    this.pdf.text(
      `Emission from Purchased Desalinated Water for ${percentData.time_period} ${percentData.periodicity} ${percentData.year}: ${totalDesalinatedWaterEmissions.toFixed(6)} tCO2e`,
      this.margins.left,
      this.margins.top + 100
    );

    // Create table data for desalinated water
    const desalinatedWaterTableData = desalinatedWaterData.map((item) => [
      `${item.quantity} ${item.unit}`,
      `${item.emissions.toFixed(6)}`,
    ]);

    autoTable(this.pdf, {
      startY: this.margins.top + 130,
      theme: "plain",
      styles: {
        font: "helvetica",
        fontSize: 10,
        cellPadding: {
          top: 12,
          bottom: 12,
          left: 16,
          right: 16,
        },
        valign: "middle",
        halign: "left",
        fillColor: "#fff",
        lineColor: [220, 220, 220],
        lineWidth: 0.1,
      },

      headStyles: {
        fillColor: "#e6f8f2",
        textColor: "#000",
        fontSize: 10,
        fontStyle: "normal",
      },

      columnStyles: {
        0: {
          halign: "left",
          cellWidth: "auto",
        },
        1: {
          halign: "left",
          cellWidth: "auto",
        },
        2: {
          halign: "left",
          cellWidth: "auto",
        },
      },

      // Configure borders
      tableLineColor: [220, 220, 220],
      tableLineWidth: 0.1,
      showHorizontalLines: true, // Show horizontal lines
      horizontalPageBreak: true, // Maintain horizontal lines across pages
      horizontalPageBreakRepeat: true,

      didParseCell: (data) => {
        // Remove vertical borders for middle columns
        if (
          data.column.index > 0 &&
          data.column.index < data.table.columns.length - 1
        ) {
          // data.cell.styles.lineWidth = 0;
        }

        // Style for total row
        // if (data.row.index === tableData.length - 1) {
        //     data.cell.styles.fillColor = '#e6f8f2';
        //     data.cell.styles.fontStyle = 'normal';
        // }
      },
      head: [["Consumption", "Emissions (tCO2e)"]], // Table header row
      body: desalinatedWaterTableData,
      margin: {
        left:
          (this.pageWidth -
            (this.pageWidth - this.margins.left - this.margins.right)) /
          2, // Centers the table
      },
      tableWidth: this.pageWidth - this.margins.left - this.margins.right,
    });

    const finalY = this.pdf.lastAutoTable.finalY + 10;
    this.pdf.setFont("Montserrat");
    this.pdf.setFontSize(14);
    this.pdf.setTextColor("#000");
    this.pdf.text("Calculation methodology:", this.margins.left, finalY + 30);
    this.pdf.setFont("Inter");
    this.pdf.setFontSize(11);
    this.pdf.setTextColor("#000");
    const maxWidth = this.pageWidth - this.margins.left - this.margins.right;
    const wrappedText = this.pdf.splitTextToSize(
      "The tool assumes that multi-stage flash (MSF) technology is used for desalination and applies emission factors based on this technology. These factors account for the energy consumption and associated greenhouse gas emissions involved in the desalination process.",
      maxWidth
    );
    const lineHeight = this.pdf.getFontSize() * 1.5;
    wrappedText.forEach((line, index) => {
      this.pdf.text(line, this.margins.left, finalY + 60 + index * lineHeight);
    });

    this.pdf.setFontSize(18);
    this.pdf.setTextColor("#029366");
    this.pdf.setFont("MontserratBold");
    // Handle heat consumption data
    const heatData = this.getEmissionsData(scope2Data, "heatConsumption");
    const totalHeatEmissions = this.calculateTotalEmissions(heatData);

    this.pdf.text("Heat Consumption", this.margins.left, finalY + 160);
    this.pdf.setFont("Inter");
    this.pdf.setFontSize(11);
    this.pdf.setTextColor("#000");
    this.pdf.text(
      `Emission from Heat Consumption for ${percentData.time_period} ${percentData.periodicity} ${percentData.year}: ${totalHeatEmissions.toFixed(6)} tCO2e`,
      this.margins.left,
      finalY + 190
    );

    // Create table data for heat consumption
    const heatTableData = heatData.map((item) => [
      `${item.quantity} ${item.unit}`,
      `${item.emissions.toFixed(6)}`,
    ]);

    autoTable(this.pdf, {
      startY: finalY + 220,
      theme: "plain",
      styles: {
        font: "helvetica",
        fontSize: 10,
        cellPadding: {
          top: 12,
          bottom: 12,
          left: 16,
          right: 16,
        },
        valign: "middle",
        halign: "left",
        fillColor: "#fff",
        lineColor: [220, 220, 220],
        lineWidth: 0.1,
      },

      headStyles: {
        fillColor: "#e6f8f2",
        textColor: "#000",
        fontSize: 10,
        fontStyle: "normal",
      },

      columnStyles: {
        0: {
          halign: "left",
          cellWidth: "auto",
        },
        1: {
          halign: "left",
          cellWidth: "auto",
        },
        2: {
          halign: "left",
          cellWidth: "auto",
        },
      },

      // Configure borders
      tableLineColor: [220, 220, 220],
      tableLineWidth: 0.1,
      showHorizontalLines: true, // Show horizontal lines
      horizontalPageBreak: true, // Maintain horizontal lines across pages
      horizontalPageBreakRepeat: true,

      didParseCell: (data) => {
        // Remove vertical borders for middle columns
        if (
          data.column.index > 0 &&
          data.column.index < data.table.columns.length - 1
        ) {
          // data.cell.styles.lineWidth = 0;
        }

        // Style for total row
        // if (data.row.index === tableData.length - 1) {
        //     data.cell.styles.fillColor = '#e6f8f2';
        //     data.cell.styles.fontStyle = 'normal';
        // }
      },
      head: [["Consumption", "Emissions (tCO2e)"]], // Table header row
      body: heatTableData,
      margin: {
        left:
          (this.pageWidth -
            (this.pageWidth - this.margins.left - this.margins.right)) /
          2, // Centers the table
      },
      tableWidth: this.pageWidth - this.margins.left - this.margins.right,
    });

    this.pdf.setFont("Montserrat"); // Make sure Montserrat is loaded in your PDF
    this.pdf.setFontSize(14);
    this.pdf.setTextColor("#000");
    this.pdf.text(
      "Calculation methodology:",
      this.margins.left,
      this.pdf.lastAutoTable.finalY + 10 + 30
    );

    // Reset font for the description text
    this.pdf.setFont("Inter"); // Or keep Montserrat if you want the whole text in it
    this.pdf.setFontSize(11);
    this.pdf.setTextColor("#000");

    // Use splitTextToSize to break the text into multiple lines
    const wrappedText2 = this.pdf.splitTextToSize(
      "The tool utilizes emission factors from the US EPA's Emission Factors for Greenhouse Gas Inventories (updated on June 5, 2024) to estimate greenhouse gas emissions associated with heat consumption.",
      maxWidth
    );

    // Render the wrapped text with line spacing
    wrappedText2.forEach((line, index) => {
      this.pdf.text(
        line,
        this.margins.left,
        this.pdf.lastAutoTable.finalY + 10 + 60 + index * lineHeight
      );
    });

    this.addFooter();
    this.pdf.addPage();
  }

  addScope3AnalysisOne(scope3Data, percentData) {
    this.pageNumber = 13;
    this.addBg(leftBg);
    this.addHeader("Waste Generated");

    // Handle waste data with defaults
    const wasteData = this.getDataWithDefault(scope3Data.wasteData, {
      category: "No Data",
      subCategory: "-",
      disposalMethod: "-",
      quantity: 0,
      emissions: 0,
    });

    const totalWasteEmissions = this.calculateEmissionsTotal(wasteData);

    this.pdf.setFont("Inter");
    this.pdf.setFontSize(11);
    this.pdf.setTextColor("#000");
    this.pdf.text(
      `Emission from Waste Generated for ${percentData.time_period} ${percentData.periodicity} ${percentData.year}: ${totalWasteEmissions.toFixed(6)} tCO2e`,
      this.margins.left,
      this.margins.top + 100
    );

    this.pdf.setFont("Inter");
    this.pdf.setFontSize(14);
    this.pdf.setTextColor("#000");
    this.pdf.text(
      "Breakdown by Waste Categories: ",
      this.margins.left,
      this.margins.top + 140
    );

    // Transform data for table
    const tableData = wasteData.map((item) => [
      item.category,
      `${item.quantity}`,
      `${item.emissions.toFixed(6)}`,
    ]);

    // Add total row
    tableData.push(["Total", "", `${totalWasteEmissions.toFixed(6)}`]);

    autoTable(this.pdf, {
      startY: this.margins.top + 160,
      theme: "plain",
      styles: {
        font: "helvetica",
        fontSize: 10,
        cellPadding: {
          top: 12,
          bottom: 12,
          left: 16,
          right: 16,
        },
        valign: "middle",
        halign: "left",
        fillColor: "#fff",
        lineColor: [220, 220, 220],
        lineWidth: 0.1,
      },

      headStyles: {
        fillColor: "#e6f8f2",
        textColor: "#000",
        fontSize: 10,
        fontStyle: "normal",
      },

      columnStyles: {
        0: {
          halign: "left",
          cellWidth: "auto",
        },
        1: {
          halign: "left",
          cellWidth: "auto",
        },
        2: {
          halign: "left",
          cellWidth: "auto",
        },
      },

      // Configure borders
      tableLineColor: [220, 220, 220],
      tableLineWidth: 0.1,
      showHorizontalLines: true, // Show horizontal lines
      horizontalPageBreak: true, // Maintain horizontal lines across pages
      horizontalPageBreakRepeat: true,

      didParseCell: (data) => {
        // Remove vertical borders for middle columns
        if (
          data.column.index > 0 &&
          data.column.index < data.table.columns.length - 1
        ) {
          // data.cell.styles.lineWidth = 0;
        }

        // Style for total row
        if (data.row.index === tableData.length - 1) {
          data.cell.styles.fillColor = "#e6f8f2";
          data.cell.styles.fontStyle = "normal";
        }
      },
      head: [["Waste Categories", "Waste Quantity", "Emissions (tCO2e)"]], // Table header row
      body: tableData,
      margin: {
        left:
          (this.pageWidth -
            (this.pageWidth - this.margins.left - this.margins.right)) /
          2, // Centers the table
      },
      tableWidth: this.pageWidth - this.margins.left - this.margins.right,
    });
    const finalY = this.pdf.lastAutoTable.finalY + 10;

    this.pdf.setFont("Montserrat"); // Make sure Montserrat is loaded in your PDF
    this.pdf.setFontSize(14);
    this.pdf.setTextColor("#000");
    this.pdf.text("Calculation methodology:", this.margins.left, finalY + 30);

    // Reset font for the description text
    this.pdf.setFont("Inter"); // Or keep Montserrat if you want the whole text in it
    this.pdf.setFontSize(11);
    this.pdf.setTextColor("#000");

    // Define the max width for the text to wrap
    const maxWidth = this.pageWidth - this.margins.left - this.margins.right;

    // Use splitTextToSize to break the text into multiple lines
    const wrappedText = this.pdf.splitTextToSize(
      "The tool uses the US EPA's methodology for calculating greenhouse gas emissions from waste disposal, considering factors such as the type of waste, disposal method, and regional landfill characteristics.",
      maxWidth
    );

    // Calculate line height (1.5 times the font size for good readability)
    const lineHeight = this.pdf.getFontSize() * 1.5;

    // Render the wrapped text with line spacing
    wrappedText.forEach((line, index) => {
      this.pdf.text(line, this.margins.left, finalY + 60 + index * lineHeight);
    });
    this.addFooter();
    this.pdf.addPage();
  }

  addScope3AnalysisTwo(scope3Data, percentData) {
    this.pageNumber = 14;
    this.addBg(rightBg);
    this.addHeader("Business Travel");

    // Handle business travel data with defaults
    const travelData = this.getDataWithDefault(scope3Data.businessTravelData, {
      travelClass: "No Data",
      numTrips: 0,
      distanceKm: 0,
      emissions: 0,
    });

    const totalTravelEmissions = this.calculateEmissionsTotal(travelData);

    this.pdf.setFont("Inter");
    this.pdf.setFontSize(11);
    this.pdf.setTextColor("#000");
    this.pdf.text(
      `Emission from Business Travel for ${percentData.time_period} ${percentData.periodicity} ${percentData.year}: ${totalTravelEmissions.toFixed(6)} tCO2e`,
      this.margins.left,
      this.margins.top + 100
    );

    this.pdf.setFont("Inter");
    this.pdf.setFontSize(14);
    this.pdf.setTextColor("#000");
    this.pdf.text(
      "Breakdown by Travel Class: ",
      this.margins.left,
      this.margins.top + 140
    );

    // Transform data for table
    const tableData = travelData.map((item) => [
      item.travelClass,
      item.num_trips,
      `${item.emissions.toFixed(6)}`,
    ]);

    // Add total row
    tableData.push(["Total", "", `${totalTravelEmissions.toFixed(6)}`]);

    autoTable(this.pdf, {
      startY: this.margins.top + 160,
      theme: "plain",
      styles: {
        font: "helvetica",
        fontSize: 10,
        cellPadding: {
          top: 12,
          bottom: 12,
          left: 16,
          right: 16,
        },
        valign: "middle",
        halign: "left",
        fillColor: "#fff",
        lineColor: [220, 220, 220],
        lineWidth: 0.1,
      },

      headStyles: {
        fillColor: "#e6f8f2",
        textColor: "#000",
        fontSize: 10,
        fontStyle: "normal",
      },

      columnStyles: {
        0: {
          halign: "left",
          cellWidth: "auto",
        },
        1: {
          halign: "left",
          cellWidth: "auto",
        },
        2: {
          halign: "left",
          cellWidth: "auto",
        },
      },

      // Configure borders
      tableLineColor: [220, 220, 220],
      tableLineWidth: 0.1,
      showHorizontalLines: true, // Show horizontal lines
      horizontalPageBreak: true, // Maintain horizontal lines across pages
      horizontalPageBreakRepeat: true,

      didParseCell: (data) => {
        // Remove vertical borders for middle columns
        if (
          data.column.index > 0 &&
          data.column.index < data.table.columns.length - 1
        ) {
          // data.cell.styles.lineWidth = 0;
        }

        // Style for total row
        if (data.row.index === tableData.length - 1) {
          data.cell.styles.fillColor = "#e6f8f2";
          data.cell.styles.fontStyle = "normal";
        }
      },
      head: [["Travel Class", "Number of trips", "Emissions (tCO2e)"]], // Table header row
      body: tableData,
      margin: {
        left:
          (this.pageWidth -
            (this.pageWidth - this.margins.left - this.margins.right)) /
          2, // Centers the table
      },
      tableWidth: this.pageWidth - this.margins.left - this.margins.right,
    });
    const finalY = this.pdf.lastAutoTable.finalY + 10;

    this.pdf.setFont("Montserrat"); // Make sure Montserrat is loaded in your PDF
    this.pdf.setFontSize(14);
    this.pdf.setTextColor("#000");
    this.pdf.text("Calculation methodology:", this.margins.left, finalY + 30);

    // Reset font for the description text
    this.pdf.setFont("Inter"); // Or keep Montserrat if you want the whole text in it
    this.pdf.setFontSize(11);
    this.pdf.setTextColor("#000");

    // Define the max width for the text to wrap
    const maxWidth = this.pageWidth - this.margins.left - this.margins.right;

    // Use splitTextToSize to break the text into multiple lines
    const wrappedText = this.pdf.splitTextToSize(
      "The tool employs emission factors from the US EPA and the GHG Protocol to calculate emissions associated with business travel. These factors are based on Travel Class and the distance traveled.",
      maxWidth
    );

    // Calculate line height (1.5 times the font size for good readability)
    const lineHeight = this.pdf.getFontSize() * 1.5;

    // Render the wrapped text with line spacing
    wrappedText.forEach((line, index) => {
      this.pdf.text(line, this.margins.left, finalY + 60 + index * lineHeight);
    });

    this.pdf.setFontSize(18);
    this.pdf.setTextColor("#029366");
    this.pdf.setFont("MontserratBold");

    // Handle purchased goods section
    const purchasedGoodsData = this.getDataWithDefault(
      scope3Data.purchasedGoodsData,
      {
        typeOfExpense: "No Data",
        expenseValue: 0,
        emissions: 0,
      }
    );

    const totalPurchasedGoodsEmissions =
      this.calculateEmissionsTotal(purchasedGoodsData);

    this.pdf.text("Purchased Goods", this.margins.left, finalY + 160);

    this.pdf.setFont("Inter");
    this.pdf.setFontSize(11);
    this.pdf.setTextColor("#000");
    this.pdf.text(
      `Emission from Purchased Goods for ${percentData.time_period} ${percentData.periodicity} ${percentData.year}: ${totalPurchasedGoodsEmissions.toFixed(6)} tCO2e`,
      this.margins.left,
      finalY + 190
    );

    const purchasedGoodsTableData = [
      [
        purchasedGoodsData[0].expenseValue?.toFixed(6),
        `${totalPurchasedGoodsEmissions.toFixed(6)}`,
      ],
    ];

    autoTable(this.pdf, {
      startY: finalY + 220,
      theme: "plain",
      styles: {
        font: "helvetica",
        fontSize: 10,
        cellPadding: {
          top: 12,
          bottom: 12,
          left: 16,
          right: 16,
        },
        valign: "middle",
        halign: "left",
        fillColor: "#fff",
        lineColor: [220, 220, 220],
        lineWidth: 0.1,
      },

      headStyles: {
        fillColor: "#e6f8f2",
        textColor: "#000",
        fontSize: 10,
        fontStyle: "normal",
      },

      columnStyles: {
        0: {
          halign: "left",
          cellWidth: "auto",
        },
        1: {
          halign: "left",
          cellWidth: "auto",
        },
        2: {
          halign: "left",
          cellWidth: "auto",
        },
      },

      // Configure borders
      tableLineColor: [220, 220, 220],
      tableLineWidth: 0.1,
      showHorizontalLines: true, // Show horizontal lines
      horizontalPageBreak: true, // Maintain horizontal lines across pages
      horizontalPageBreakRepeat: true,

      didParseCell: (data) => {
        // Remove vertical borders for middle columns
        if (
          data.column.index > 0 &&
          data.column.index < data.table.columns.length - 1
        ) {
          // data.cell.styles.lineWidth = 0;
        }

        // Style for total row
        // if (data.row.index === tableData.length - 1) {
        //     data.cell.styles.fillColor = '#e6f8f2';
        //     data.cell.styles.fontStyle = 'normal';
        // }
      },
      head: [["Expense Value", "Emissions (tCO2e)"]], // Table header row
      body: purchasedGoodsTableData,
      margin: {
        left:
          (this.pageWidth -
            (this.pageWidth - this.margins.left - this.margins.right)) /
          2, // Centers the table
      },
      tableWidth: this.pageWidth - this.margins.left - this.margins.right,
    });
    this.pdf.setFont("Montserrat"); // Make sure Montserrat is loaded in your PDF
    this.pdf.setFontSize(14);
    this.pdf.setTextColor("#000");
    this.pdf.text(
      "Calculation methodology:",
      this.margins.left,
      this.pdf.lastAutoTable.finalY + 10 + 30
    );

    // Reset font for the description text
    this.pdf.setFont("Inter"); // Or keep Montserrat if you want the whole text in it
    this.pdf.setFontSize(11);
    this.pdf.setTextColor("#000");

    // Use splitTextToSize to break the text into multiple lines
    const wrappedText2 = this.pdf.splitTextToSize(
      "The tool follows the UNFCCC CDM Supplier Inventory to calculate emissions associated with purchased goods. This involves considering the emissions embedded in the production and transportation of these items.",
      maxWidth
    );

    // Render the wrapped text with line spacing
    wrappedText2.forEach((line, index) => {
      this.pdf.text(
        line,
        this.margins.left,
        this.pdf.lastAutoTable.finalY + 10 + 60 + index * lineHeight
      );
    });

    this.addFooter();
    this.pdf.addPage();
  }

  addScope3AnalysisThree(scope3Data, percentData) {
    this.pageNumber = 15;
    this.addBg(leftBg);

    // Handle capital goods data with defaults
    const capitalGoodsData = this.getDataWithDefault(
      scope3Data.capitalGoodsData,
      {
        assetType: "No Data",
        assetCategory: "-",
        expenseValue: 0,
        emissions: 0,
      }
    );

    const totalCapitalGoodsEmissions =
      this.calculateEmissionsTotal(capitalGoodsData);
    this.addHeader("Capital Goods");
    this.pdf.setFont("Inter");
    this.pdf.setFontSize(11);
    this.pdf.setTextColor("#000");
    this.pdf.text(
      `Emission from Capital Goods for ${percentData.time_period} ${percentData.periodicity} ${percentData.year}: ${totalCapitalGoodsEmissions.toFixed(6)} tCO2e`,
      this.margins.left,
      this.margins.top + 100
    );

    const capitalGoodsTableData = [
      [
        capitalGoodsData[0].expenseValue.toFixed(6),
        `${totalCapitalGoodsEmissions.toFixed(6)}`,
      ],
    ];

    autoTable(this.pdf, {
      startY: this.margins.top + 130,
      theme: "plain",
      styles: {
        font: "helvetica",
        fontSize: 10,
        cellPadding: {
          top: 12,
          bottom: 12,
          left: 16,
          right: 16,
        },
        valign: "middle",
        halign: "left",
        fillColor: "#fff",
        lineColor: [220, 220, 220],
        lineWidth: 0.1,
      },

      headStyles: {
        fillColor: "#e6f8f2",
        textColor: "#000",
        fontSize: 10,
        fontStyle: "normal",
      },

      columnStyles: {
        0: {
          halign: "left",
          cellWidth: "auto",
        },
        1: {
          halign: "left",
          cellWidth: "auto",
        },
        2: {
          halign: "left",
          cellWidth: "auto",
        },
      },

      // Configure borders
      tableLineColor: [220, 220, 220],
      tableLineWidth: 0.1,
      showHorizontalLines: true, // Show horizontal lines
      horizontalPageBreak: true, // Maintain horizontal lines across pages
      horizontalPageBreakRepeat: true,

      didParseCell: (data) => {
        // Remove vertical borders for middle columns
        if (
          data.column.index > 0 &&
          data.column.index < data.table.columns.length - 1
        ) {
          // data.cell.styles.lineWidth = 0;
        }

        // Style for total row
        // if (data.row.index === tableData.length - 1) {
        //     data.cell.styles.fillColor = '#e6f8f2';
        //     data.cell.styles.fontStyle = 'normal';
        // }
      },
      head: [["Expense Value", "Emissions (tCO2e)"]], // Table header row
      body: capitalGoodsTableData,
      margin: {
        left:
          (this.pageWidth -
            (this.pageWidth - this.margins.left - this.margins.right)) /
          2, // Centers the table
      },
      tableWidth: this.pageWidth - this.margins.left - this.margins.right,
    });

    const finalY = this.pdf.lastAutoTable.finalY + 10;
    this.pdf.setFont("Montserrat");
    this.pdf.setFontSize(14);
    this.pdf.setTextColor("#000");
    this.pdf.text("Calculation methodology:", this.margins.left, finalY + 30);
    this.pdf.setFont("Inter");
    this.pdf.setFontSize(11);
    this.pdf.setTextColor("#000");
    const maxWidth = this.pageWidth - this.margins.left - this.margins.right;
    const wrappedText = this.pdf.splitTextToSize(
      "The tool follows the UNFCCC CDM Supplier Inventory to calculate emissions associated with Capital goods. This involves considering the emissions embedded in the production and transportation of these items.",
      maxWidth
    );
    const lineHeight = this.pdf.getFontSize() * 1.5;
    wrappedText.forEach((line, index) => {
      this.pdf.text(line, this.margins.left, finalY + 60 + index * lineHeight);
    });

    this.pdf.setFontSize(18);
    this.pdf.setTextColor("#029366");
    this.pdf.setFont("MontserratBold");
    // Handle investments section
    const investmentsData = this.getDataWithDefault(
      scope3Data.investmentsData,
      {
        ownershipPercentage: 0,
        investeeCompanyEmissions: 0,
        emissions: 0,
      }
    );

    const totalInvestmentsEmissions =
      this.calculateEmissionsTotal(investmentsData);
    this.pdf.text("Investments", this.margins.left, finalY + 160);
    this.pdf.setFont("Inter");
    this.pdf.setFontSize(11);
    this.pdf.setTextColor("#000");
    this.pdf.text(
      `Emission from Investments for ${percentData.time_period} ${percentData.periodicity} ${percentData.year}: ${totalInvestmentsEmissions.toFixed(6)} tCO2e`,
      this.margins.left,
      finalY + 190
    );

    const investmentsTableData = investmentsData.map((item) => [
      `${item.ownershipPercentage}%`,
      `${item.emissions.toFixed(6)}`,
    ]);

    autoTable(this.pdf, {
      startY: finalY + 220,
      theme: "plain",
      styles: {
        font: "helvetica",
        fontSize: 10,
        cellPadding: {
          top: 12,
          bottom: 12,
          left: 16,
          right: 16,
        },
        valign: "middle",
        halign: "left",
        fillColor: "#fff",
        lineColor: [220, 220, 220],
        lineWidth: 0.1,
      },

      headStyles: {
        fillColor: "#e6f8f2",
        textColor: "#000",
        fontSize: 10,
        fontStyle: "normal",
      },

      columnStyles: {
        0: {
          halign: "left",
          cellWidth: "auto",
        },
        1: {
          halign: "left",
          cellWidth: "auto",
        },
        2: {
          halign: "left",
          cellWidth: "auto",
        },
      },

      // Configure borders
      tableLineColor: [220, 220, 220],
      tableLineWidth: 0.1,
      showHorizontalLines: true, // Show horizontal lines
      horizontalPageBreak: true, // Maintain horizontal lines across pages
      horizontalPageBreakRepeat: true,

      didParseCell: (data) => {
        // Remove vertical borders for middle columns
        if (
          data.column.index > 0 &&
          data.column.index < data.table.columns.length - 1
        ) {
          // data.cell.styles.lineWidth = 0;
        }

        // Style for total row
        // if (data.row.index === tableData.length - 1) {
        //     data.cell.styles.fillColor = '#e6f8f2';
        //     data.cell.styles.fontStyle = 'normal';
        // }
      },
      head: [["Ownership Percentage", "Emissions (tCO2e)"]], // Table header row
      body: investmentsTableData,
      margin: {
        left:
          (this.pageWidth -
            (this.pageWidth - this.margins.left - this.margins.right)) /
          2, // Centers the table
      },
      tableWidth: this.pageWidth - this.margins.left - this.margins.right,
    });

    this.pdf.setFont("Montserrat"); // Make sure Montserrat is loaded in your PDF
    this.pdf.setFontSize(14);
    this.pdf.setTextColor("#000");
    this.pdf.text(
      "Calculation methodology:",
      this.margins.left,
      this.pdf.lastAutoTable.finalY + 10 + 30
    );

    // Reset font for the description text
    this.pdf.setFont("Inter"); // Or keep Montserrat if you want the whole text in it
    this.pdf.setFontSize(11);
    this.pdf.setTextColor("#000");

    // Use splitTextToSize to break the text into multiple lines
    const wrappedText2 = this.pdf.splitTextToSize(
      "The tool uses the GHG Protocol Accounting methodology to calculate emissions associated with investments.",
      maxWidth
    );

    // Render the wrapped text with line spacing
    wrappedText2.forEach((line, index) => {
      this.pdf.text(
        line,
        this.margins.left,
        this.pdf.lastAutoTable.finalY + 10 + 60 + index * lineHeight
      );
    });

    this.addFooter();
    this.pdf.addPage();
  }

  addScope3AnalysisFour(scope3Data, percentData) {
    this.pageNumber = 16;
    this.addBg(rightBg);

    // Handle employee commuting data with defaults
    const commutingData = this.getDataWithDefault(
      scope3Data.employeeCommutingData,
      {
        vehicleType: "No Data",
        distanceKm: 0,
        numTrips: 0,
        emissions: 0,
      }
    );

    const totalCommutingEmissions = this.calculateEmissionsTotal(commutingData);

    this.addHeader("Employee Commuting");
    this.pdf.setFont("Inter");
    this.pdf.setFontSize(11);
    this.pdf.setTextColor("#000");
    this.pdf.text(
      `Emission from Employee Commuting for ${percentData.time_period} ${percentData.periodicity} ${percentData.year}: ${totalCommutingEmissions.toFixed(6)} tCO2e`,
      this.margins.left,
      this.margins.top + 100
    );

    this.pdf.setFont("Inter");
    this.pdf.setFontSize(14);
    this.pdf.setTextColor("#000");
    this.pdf.text(
      "Breakdown by Vehicle type: ",
      this.margins.left,
      this.margins.top + 140
    );

    // Transform data for table
    const tableData = commutingData.map((item) => [
      item.vehicleType,
      item.num_trips,
      `${item.emissions.toFixed(6)}`,
    ]);

    // Add total row
    tableData.push(["Total", "", `${totalCommutingEmissions.toFixed(6)}`]);

    autoTable(this.pdf, {
      startY: this.margins.top + 160,
      theme: "plain",
      styles: {
        font: "helvetica",
        fontSize: 10,
        cellPadding: {
          top: 12,
          bottom: 12,
          left: 16,
          right: 16,
        },
        valign: "middle",
        halign: "left",
        fillColor: "#fff",
        lineColor: [220, 220, 220],
        lineWidth: 0.1,
      },

      headStyles: {
        fillColor: "#e6f8f2",
        textColor: "#000",
        fontSize: 10,
        fontStyle: "normal",
      },

      columnStyles: {
        0: {
          halign: "left",
          cellWidth: "auto",
        },
        1: {
          halign: "left",
          cellWidth: "auto",
        },
        2: {
          halign: "left",
          cellWidth: "auto",
        },
      },

      // Configure borders
      tableLineColor: [220, 220, 220],
      tableLineWidth: 0.1,
      showHorizontalLines: true, // Show horizontal lines
      horizontalPageBreak: true, // Maintain horizontal lines across pages
      horizontalPageBreakRepeat: true,

      didParseCell: (data) => {
        // Remove vertical borders for middle columns
        if (
          data.column.index > 0 &&
          data.column.index < data.table.columns.length - 1
        ) {
          // data.cell.styles.lineWidth = 0;
        }

        // Style for total row
        if (data.row.index === tableData.length - 1) {
          data.cell.styles.fillColor = "#e6f8f2";
          data.cell.styles.fontStyle = "normal";
        }
      },
      head: [["Vehicle Type", "No. of Trips", "Emissions (tCO2e)"]], // Table header row
      body: tableData,
      margin: {
        left:
          (this.pageWidth -
            (this.pageWidth - this.margins.left - this.margins.right)) /
          2, // Centers the table
      },
      tableWidth: this.pageWidth - this.margins.left - this.margins.right,
    });

    const finalY = this.pdf.lastAutoTable.finalY + 10;

    this.pdf.setFont("Montserrat");
    this.pdf.setFontSize(14);
    this.pdf.setTextColor("#000");
    this.pdf.text("Calculation methodology:", this.margins.left, finalY + 30);

    this.pdf.setFont("Inter"); // Or keep Montserrat if you want the whole text in it
    this.pdf.setFontSize(11);
    this.pdf.setTextColor("#000");

    // Define the max width for the text to wrap
    const maxWidth = this.pageWidth - this.margins.left - this.margins.right;

    // Use splitTextToSize to break the text into multiple lines
    const wrappedText = this.pdf.splitTextToSize(
      "The tool utilizes emission factors from the US EPA for vehicle types and the GHG Protocol methodology to calculate emissions associated with employee commuting. This involves considering the distance traveled, vehicle type, and fuel efficiency.",
      maxWidth
    );

    // Calculate line height (1.5 times the font size for good readability)
    const lineHeight = this.pdf.getFontSize() * 1.5;

    // Render the wrapped text with line spacing
    wrappedText.forEach((line, index) => {
      this.pdf.text(line, this.margins.left, finalY + 60 + index * lineHeight);
    });

    this.addFooter();
    this.pdf.addPage();
  }

  addScope3AnalysisFive(scope3Data, percentData) {
    this.pageNumber = 17;
    this.addBg(leftBg);
    // Handle fuel related data with defaults
    const fuelRelatedData = this.getDataWithDefault(
      scope3Data.fuelRelatedData,
      {
        category: "No Data",
        emissions: 0,
      }
    );

    const totalFuelRelatedEmissions =
      this.calculateEmissionsTotal(fuelRelatedData);
    this.addHeader("Fuel Related Activities");
    this.pdf.setFont("Inter");
    this.pdf.setFontSize(11);
    this.pdf.setTextColor("#000");
    this.pdf.text(
      `Emission from Fuel Related Activities for ${percentData.time_period} ${percentData.periodicity} ${percentData.year}: ${totalFuelRelatedEmissions.toFixed(6)} tCO2e`,
      this.margins.left,
      this.margins.top + 100
    );

    this.pdf.setFont("Inter");
    this.pdf.setFontSize(14);
    this.pdf.setTextColor("#000");
    this.pdf.text(
      "Breakdown by Categories: ",
      this.margins.left,
      this.margins.top + 140
    );

    // Transform data for table
    const tableData = fuelRelatedData.map((item) => [
      item.category,
      `${item.emissions.toFixed(6)}`,
    ]);

    // Add total row
    tableData.push(["Total", `${totalFuelRelatedEmissions.toFixed(6)}`]);

    autoTable(this.pdf, {
      startY: this.margins.top + 160,
      theme: "plain",
      styles: {
        font: "helvetica",
        fontSize: 10,
        cellPadding: {
          top: 12,
          bottom: 12,
          left: 16,
          right: 16,
        },
        valign: "middle",
        halign: "left",
        fillColor: "#fff",
        lineColor: [220, 220, 220],
        lineWidth: 0.1,
      },

      headStyles: {
        fillColor: "#e6f8f2",
        textColor: "#000",
        fontSize: 10,
        fontStyle: "normal",
      },

      columnStyles: {
        0: {
          halign: "left",
          cellWidth: "auto",
        },
        1: {
          halign: "left",
          cellWidth: "auto",
        },
        2: {
          halign: "left",
          cellWidth: "auto",
        },
      },

      // Configure borders
      tableLineColor: [220, 220, 220],
      tableLineWidth: 0.1,
      showHorizontalLines: true, // Show horizontal lines
      horizontalPageBreak: true, // Maintain horizontal lines across pages
      horizontalPageBreakRepeat: true,

      didParseCell: (data) => {
        // Remove vertical borders for middle columns
        if (
          data.column.index > 0 &&
          data.column.index < data.table.columns.length - 1
        ) {
          // data.cell.styles.lineWidth = 0;
        }

        // Style for total row
        if (data.row.index === tableData.length - 1) {
          data.cell.styles.fillColor = "#e6f8f2";
          data.cell.styles.fontStyle = "normal";
        }
      },
      head: [["Category", "Emissions (tCO2e)"]], // Table header row
      body: tableData,
      margin: {
        left:
          (this.pageWidth -
            (this.pageWidth - this.margins.left - this.margins.right)) /
          2, // Centers the table
      },
      tableWidth: this.pageWidth - this.margins.left - this.margins.right,
    });

    const finalY = this.pdf.lastAutoTable.finalY + 10;

    this.pdf.setFont("Montserrat");
    this.pdf.setFontSize(14);
    this.pdf.setTextColor("#000");
    this.pdf.text("Calculation methodology:", this.margins.left, finalY + 30);

    this.pdf.setFont("Inter"); // Or keep Montserrat if you want the whole text in it
    this.pdf.setFontSize(11);
    this.pdf.setTextColor("#000");

    // Define the max width for the text to wrap
    const maxWidth = this.pageWidth - this.margins.left - this.margins.right;

    // Use splitTextToSize to break the text into multiple lines
    const wrappedText = this.pdf.splitTextToSize(
      "The tool uses the same emission factors from the US EPA's oil and gas source as used for process emissions to calculate emissions associated with fuel-related activities, such as fuel storage and distribution.",
      maxWidth
    );

    // Calculate line height (1.5 times the font size for good readability)
    const lineHeight = this.pdf.getFontSize() * 1.5;

    // Render the wrapped text with line spacing
    wrappedText.forEach((line, index) => {
      this.pdf.text(line, this.margins.left, finalY + 60 + index * lineHeight);
    });

    this.addFooter();
    this.pdf.addPage();
  }

  addScope3AnalysisSix(scope3Data, percentData) {
    this.pageNumber = 18;
    this.addBg(rightBg);

    // Handle upstream leased assets data with defaults
    const upstreamLeasedData = this.getDataWithDefault(
      scope3Data.upstreamLeasedAssetsData,
      {
        assetType: "No Data",
        emissions: 0,
      }
    );

    const totalUpstreamEmissions =
      this.calculateEmissionsTotal(upstreamLeasedData);

    this.addHeader("Upstream Leased Assets");
    this.pdf.setFont("Inter");
    this.pdf.setFontSize(11);
    this.pdf.setTextColor("#000");
    this.pdf.text(
      `Emission from Upstream Leased Assets for ${percentData.time_period} ${percentData.periodicity} ${percentData.year}: ${totalUpstreamEmissions.toFixed(6)} tCO2e`,
      this.margins.left,
      this.margins.top + 100
    );
    this.pdf.setFont("Inter");
    this.pdf.setFontSize(14);
    this.pdf.setTextColor("#000");
    this.pdf.text(
      "Breakdown by Asset type:",
      this.margins.left,
      this.margins.top + 140
    );

    // Transform data for table
    const tableData = upstreamLeasedData.map((item) => [
      item.assetType,
      `${item.emissions.toFixed(6)}`,
    ]);

    // Add total row
    tableData.push(["Total", `${totalUpstreamEmissions.toFixed(6)}`]);

    autoTable(this.pdf, {
      startY: this.margins.top + 160,
      theme: "plain",
      styles: {
        font: "helvetica",
        fontSize: 10,
        cellPadding: {
          top: 12,
          bottom: 12,
          left: 16,
          right: 16,
        },
        valign: "middle",
        halign: "left",
        fillColor: "#fff",
        lineColor: [220, 220, 220],
        lineWidth: 0.1,
      },

      headStyles: {
        fillColor: "#e6f8f2",
        textColor: "#000",
        fontSize: 10,
        fontStyle: "normal",
      },

      columnStyles: {
        0: {
          halign: "left",
          cellWidth: "auto",
        },
        1: {
          halign: "left",
          cellWidth: "auto",
        },
        2: {
          halign: "left",
          cellWidth: "auto",
        },
      },

      // Configure borders
      tableLineColor: [220, 220, 220],
      tableLineWidth: 0.1,
      showHorizontalLines: true, // Show horizontal lines
      horizontalPageBreak: true, // Maintain horizontal lines across pages
      horizontalPageBreakRepeat: true,

      didParseCell: (data) => {
        // Remove vertical borders for middle columns
        if (
          data.column.index > 0 &&
          data.column.index < data.table.columns.length - 1
        ) {
          // data.cell.styles.lineWidth = 0;
        }

        // Style for total row
        if (data.row.index === tableData.length - 1) {
          data.cell.styles.fillColor = "#e6f8f2";
          data.cell.styles.fontStyle = "normal";
        }
      },
      head: [["Asset Type", "Emissions (tCO2e)"]], // Table header row
      body: tableData,
      margin: {
        left:
          (this.pageWidth -
            (this.pageWidth - this.margins.left - this.margins.right)) /
          2, // Centers the table
      },
      tableWidth: this.pageWidth - this.margins.left - this.margins.right,
    });

    const finalY = this.pdf.lastAutoTable.finalY + 10;
    // Reset font for the description text
    this.pdf.setFont("Inter"); // Or keep Montserrat if you want the whole text in it
    this.pdf.setFontSize(11);
    this.pdf.setTextColor("#000");

    // Define the max width for the text to wrap
    const maxWidth = this.pageWidth - this.margins.left - this.margins.right;

    // Use splitTextToSize to break the text into multiple lines
    const wrappedText = this.pdf.splitTextToSize(
      "The tool follows the GHG Protocol methodology to calculate emissions associated with upstream leased assets, such as oil and gas exploration and production activities. This involves identifying emission sources and applying appropriate emission factors from the US EPA.",
      maxWidth
    );

    // Calculate line height (1.5 times the font size for good readability)
    const lineHeight = this.pdf.getFontSize() * 1.5;

    // Render the wrapped text with line spacing
    wrappedText.forEach((line, index) => {
      this.pdf.text(line, this.margins.left, finalY + 60 + index * lineHeight);
    });

    this.pdf.setFontSize(18);
    this.pdf.setTextColor("#029366");
    this.pdf.setFont("MontserratBold");

    // Handle downstream leased assets section
    const downstreamLeasedData = this.getDataWithDefault(
      scope3Data.downstreamLeasedAssetsData,
      {
        emissions: 0,
      }
    );

    const totalDownstreamEmissions =
      this.calculateEmissionsTotal(downstreamLeasedData);

    this.pdf.text("Downstream Leased Assets", this.margins.left, finalY + 160);
    this.pdf.setFont("Inter");
    this.pdf.setFontSize(11);
    this.pdf.setTextColor("#000");
    this.pdf.text(
      `Emission from Downstream Leased Assets for ${percentData.time_period} ${percentData.periodicity} ${percentData.year}: ${totalDownstreamEmissions.toFixed(6)} tCO2e`,
      this.margins.left,
      finalY + 190
    );

    const downstreamTableData = [
      [
        downstreamLeasedData[0].physicalArea,
        `${totalDownstreamEmissions.toFixed(6)}`,
      ],
    ];

    autoTable(this.pdf, {
      startY: finalY + 220,
      theme: "plain",
      styles: {
        font: "helvetica",
        fontSize: 10,
        cellPadding: {
          top: 12,
          bottom: 12,
          left: 16,
          right: 16,
        },
        valign: "middle",
        halign: "left",
        fillColor: "#fff",
        lineColor: [220, 220, 220],
        lineWidth: 0.1,
      },

      headStyles: {
        fillColor: "#e6f8f2",
        textColor: "#000",
        fontSize: 10,
        fontStyle: "normal",
      },

      columnStyles: {
        0: {
          halign: "left",
          cellWidth: "auto",
        },
        1: {
          halign: "left",
          cellWidth: "auto",
        },
        2: {
          halign: "left",
          cellWidth: "auto",
        },
      },

      // Configure borders
      tableLineColor: [220, 220, 220],
      tableLineWidth: 0.1,
      showHorizontalLines: true, // Show horizontal lines
      horizontalPageBreak: true, // Maintain horizontal lines across pages
      horizontalPageBreakRepeat: true,

      head: [["Physical Area", "Emissions (tCO2e)"]], // Table header row
      body: downstreamTableData,
      margin: {
        left:
          (this.pageWidth -
            (this.pageWidth - this.margins.left - this.margins.right)) /
          2, // Centers the table
      },
      tableWidth: this.pageWidth - this.margins.left - this.margins.right,
    });

    this.pdf.setFont("Montserrat"); // Make sure Montserrat is loaded in your PDF
    this.pdf.setFontSize(14);
    this.pdf.setTextColor("#000");
    this.pdf.text(
      "Calculation methodology:",
      this.margins.left,
      this.pdf.lastAutoTable.finalY + 10 + 30
    );

    // Reset font for the description text
    this.pdf.setFont("Inter"); // Or keep Montserrat if you want the whole text in it
    this.pdf.setFontSize(11);
    this.pdf.setTextColor("#000");

    // Use splitTextToSize to break the text into multiple lines
    const wrappedText2 = this.pdf.splitTextToSize(
      "The tool uses the GHG Protocol Accounting methodology to calculate emissions associated with Downstream Leased Assets.",
      maxWidth
    );

    // Render the wrapped text with line spacing
    wrappedText2.forEach((line, index) => {
      this.pdf.text(
        line,
        this.margins.left,
        this.pdf.lastAutoTable.finalY + 10 + 60 + index * lineHeight
      );
    });

    this.addFooter();
    this.pdf.addPage();
  }

  addConclusionPage() {
    this.pageNumber = 19;
    const pageWidth = this.pdf.internal.pageSize.getWidth();
    const pageHeight = this.pdf.internal.pageSize.getHeight();

    this.pdf.addImage(reportLastPage, "PNG", 0, 0, pageWidth, pageHeight);
  }

  async fetchAllData() {
    // Simulated data - replace with actual API calls
    return {
      emissionsData: {
        fuelConsumption: "24,546 tCO2e",
        refrigerantData: "12,345 tCO2e",
        processEmission: "8,765 tCO2e",
      },
      scope2EmissionsData: {
        electricityConsumption: "35,678 tCO2e",
        chilledWaterConsumption: "11,234 tCO2e",
        purchasedDesalinatedWater: "5,678 tCO2e",
      },
      scope3EmissionsData: {
        wasteGenerated: "15,432 tCO2e",
        businessTravel: "9,876 tCO2e",
        purchasedGoods: "42,345 tCO2e",
        employeeCommuting: "6,543 tCO2ee",
      },
    };
  }
}

export { MultiPageGHGReportGenerator };
