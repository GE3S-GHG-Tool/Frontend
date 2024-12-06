import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import reportImageOne from '../../../assets/graphimgs/reportpageone.png'
import reportImageTwo from '../../../assets/graphimgs/reportpagetwo.png'
import reportImageThree from '../../../assets/graphimgs/reportpagethree.png'
import reportImageFour from '../../../assets/graphimgs/reportpagefour.png'
import reportImageFive from '../../../assets/graphimgs/reportpagefive.png'
import lineChart from '../../../assets/graphimgs/emissionslinechart.png'
import reportLastPage from '../../../assets/graphimgs/reportlastpage.png'
import rightBg from '../../../assets/graphimgs/rightBg.png'
import leftBg from '../../../assets/graphimgs/leftBg.png'
import axios from 'axios';

async function fetchScope1Data(reportId) {
    try {
        const response = await axios.post('https://backend.ghg.ge3s.org/api/report/scope1_categorized_emissions', {
            reportId: reportId
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching scope 1 data:', error);
        throw error;
    }
}

async function fetchScope2Data(reportId) {
    try {
        const response = await axios.post('https://backend.ghg.ge3s.org/api/report/scope2_totals_emissions', {
            reportId: reportId
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching scope 2 data:', error);
        throw error;
    }
}

async function fetchScope3Data(reportId) {
    try {
        const response = await axios.post('https://backend.ghg.ge3s.org/api/report/scope3_categorized_emissions', {
            reportId: reportId
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching scope 3 data:', error);
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
            bottom: options.margins?.bottom || 40
        };

        this.pdf = new jsPDF({
            unit: 'pt',
            format: 'a4',
            compress: true,
            optimization: true
        });

        this.pageNumber = 1;
    }

    initializeDocument() {
        this.pdf.setProperties({
            title: 'Comprehensive Greenhouse Gas (GHG) Emissions Report',
            author: 'Sustainability Team',
            creator: 'Advanced PDF Generator'
        });
    }

    addHeader(pageTitle = '') {
        this.pdf.setFontSize(12);
        this.pdf.setTextColor(113, 113, 113);
        this.pdf.text('Greenhouse Gas (GHG) Report',
            this.margins.left,
            this.margins.top + 20
        );
        // Horizontal line
        this.pdf.setLineWidth(0.2);
        this.pdf.setDrawColor(217, 217, 217);
        this.pdf.line(
            this.margins.left,
            this.margins.top + 30,
            this.pageWidth - this.margins.right,
            this.margins.top + 30
        );

        // Subtitle
        if (pageTitle) {
            this.pdf.setFontSize(14);
            this.pdf.setTextColor('#029366'); // Red
            this.pdf.setFont('helvetica', 'bold');
            this.pdf.text(pageTitle,
                this.margins.left,
                this.margins.top + 70
            );
            this.pdf.setFont('helvetica', 'normal');
        }


    }

    // Create a professional footer
    addFooter() {
        this.pdf.setFontSize(10);
        this.pdf.setTextColor(100);

        // Page number
        this.pdf.text(
            `Page ${this.pageNumber}`,
            this.pageWidth - this.margins.right - 50,
            this.pageHeight - this.margins.bottom + 20
        );

    }

    addImagePage(imageSrc) {
        const pageWidth = this.pdf.internal.pageSize.getWidth();
        const pageHeight = this.pdf.internal.pageSize.getHeight();

        this.pdf.addImage(
            imageSrc,
            'PNG',
            0,
            0,
            pageWidth,
            pageHeight
        );
        this.pdf.addPage();
    }

    addBg(imageSrc) {
        const pageWidth = this.pdf.internal.pageSize.getWidth();
        const pageHeight = this.pdf.internal.pageSize.getHeight();

        this.pdf.addImage(
            imageSrc,
            'PNG',
            0,
            0,
            pageWidth,
            pageHeight
        );
    }


    // Generate report pages dynamically
    async generateReport(reportId) {
        this.initializeDocument();

        const scope1Data = await fetchScope1Data(reportId);
        const scope2Data = await fetchScope2Data(reportId);
        const scope3Data = await fetchScope3Data(reportId);
        const scope1Response = await axios.post('https://backend.ghg.ge3s.org/api/report/scope1_totals_emissions', { reportId });
        const scope2Response = await axios.post('https://backend.ghg.ge3s.org/api/report/scope2_totals_emissions', { reportId });
        const scope3Response = await axios.post('https://backend.ghg.ge3s.org/api/report/scope3_totals_emissions', { reportId });


        this.addExecutiveSummaryPage({
            scope1Data: scope1Response.data,
            scope2Data: scope2Response.data,
            scope3Data: scope3Response.data
        });

        this.addScope1AnalysisOne(scope1Data);

        this.addScope1AnalysisTwo(scope1Data);

        this.addScope1AnalysisThree(scope1Data);

        this.addScope2AnalysisOne(scope2Data);

        this.addScope2AnalysisTwo(scope2Data);

        this.addScope3AnalysisOne(scope3Data);

        this.addScope3AnalysisTwo(scope3Data);

        this.addScope3AnalysisThree(scope3Data);

        this.addScope3AnalysisFour(scope3Data);

        this.addScope3AnalysisFive(scope3Data);

        this.addScope3AnalysisSix(scope3Data);

        this.addConclusionPage();

        return this.pdf;
    }

    // Helper function to handle missing data
    getEmissionsData(data, key) {
        if (!data[key] || data[key].length === 0) {
            return [{
                country: "Global",
                quantity: 0,
                unit: "",
                emissions: 0
            }];
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

    addExecutiveSummaryPage({ scope1Data, scope2Data, scope3Data }) {

        this.addImagePage(reportImageOne);
        this.addImagePage(reportImageTwo);
        this.addImagePage(reportImageThree);
        this.addImagePage(reportImageFour);
        this.addImagePage(reportImageFive);

        this.pageNumber = 6;
        this.addBg(leftBg)
        this.addHeader('Greenhouse Gas Emissions Breakdown');

        this.pdf.setFontSize(10);
        this.pdf.setTextColor("#000");
        const maxWidth = this.pageWidth - this.margins.left - this.margins.right;

        const totalEmissions = scope1Data.grandTotalEmissions + scope2Data.grandTotalEmissions + scope3Data.grandTotalEmissions;

        const wrappedText = this.pdf.splitTextToSize(
            `This section provides a comprehensive breakdown of [Company Name]'s greenhouse gas emissions for the reporting period [Reporting Period]. Emissions are categorized into three scopes:`,
            maxWidth
        );

        this.pdf.text(wrappedText, this.margins.left, this.margins.top + 100);

        this.pdf.setFontSize(15);
        this.pdf.text('Total GHG Emissions Distribution',
            this.margins.left,
            this.margins.top + 150
        );
        this.pdf.addImage(
            lineChart,
            'PNG',
            this.margins.left,
            this.margins.top + 160,
            this.pageWidth - 120,
            16
        );

        this.pdf.setFontSize(14);
        this.pdf.setTextColor("#000");
        this.pdf.text(`2.1 Scope 1 Emissions: ${scope1Data.grandTotalEmissions.toFixed(6)} tCO2`,
            this.margins.left,
            this.margins.top + 250
        );

        this.pdf.setFontSize(10);
        this.pdf.setTextColor("#000");
        this.pdf.text('Direct emissions from owned or controlled sources, such as on-site combustion of fossil fuels. ',
            this.margins.left,
            this.margins.top + 280
        );

        autoTable(this.pdf, {
            startY: this.margins.top + 310,
            theme: 'grid',  // 'striped', 'grid', or 'plain'
            styles: {
                font: 'helvetica',
                fontSize: 10,
                cellPadding: 8,
                valign: 'middle',
                halign: 'center',
                fillColor: '#E6F8F2',  // Light green background for header row
            },
            headStyles: {
                textColor: '#000',
                fillColor: '#E6F8F2',  // Slightly darker green for headers
                fontSize: 10,
                fontStyle: 'normal',
            },
            columnStyles: {
                0: { fillColor: '#fff' }, // Left column coloring
                1: { fillColor: '#fff' },    // White KPIs column
                2: { fillColor: '#fff' }     // White Emissions column
            },
            head: [['Scope', 'KPIs', 'Emissions (tCO2)']],  // Table header row
            body: [
                ['Scope 1', 'Fuel Consumption', scope1Data.totalFuelEmissions.toFixed(6)],
                ['', 'Refrigerant Data', scope1Data.totalRefrigerantEmissions.toFixed(6)],
                ['', 'Process Emission', scope1Data.totalProcessEmissions.toFixed(6)]
            ],
            margin: {
                left: (this.pageWidth - (this.pageWidth - this.margins.left - this.margins.right)) / 2 // Centers the table
            },
            tableWidth: this.pageWidth - this.margins.left - this.margins.right,
        })

        this.addFooter();
        this.pdf.addPage();

        // Second Page
        this.pageNumber = 7;
        this.addHeader('');

        this.pdf.setFontSize(14);
        this.pdf.setTextColor("#000");
        this.pdf.text(`2.2 Scope 2 Emissions: ${scope2Data.grandTotalEmissions.toFixed(6)} tCO2`,
            this.margins.left,
            this.margins.top + 90
        );

        this.pdf.setFontSize(10);
        this.pdf.setTextColor("#000");
        this.pdf.text('Indirect emissions from the purchase of electricity,chilled water, desalinated water, heat, or steam. ',
            this.margins.left,
            this.margins.top + 120
        );

        // Calculate total emissions for each scope 2 category
        const electricityEmissions = scope2Data.electricityConsumption?.reduce((sum, item) => sum + item.emissions, 0) || 0;
        const chilledWaterEmissions = scope2Data.chilledWaterConsumption?.reduce((sum, item) => sum + item.emissions, 0) || 0;
        const waterEmissions = scope2Data.purchasedDesalinatedWaterConsumption?.reduce((sum, item) => sum + item.emissions, 0) || 0;
        const heatEmissions = scope2Data.heatConsumption?.reduce((sum, item) => sum + item.emissions, 0) || 0;

        autoTable(this.pdf, {
            startY: this.margins.top + 150,
            theme: 'grid',  // 'striped', 'grid', or 'plain'
            styles: {
                font: 'helvetica',
                fontSize: 10,
                cellPadding: 8,
                valign: 'middle',
                halign: 'center',
                fillColor: '#E6F8F2',  // Light green background for header row
            },
            headStyles: {
                textColor: '#000',
                fillColor: '#E6F8F2',  // Slightly darker green for headers
                fontSize: 10,
                fontStyle: 'normal',
            },
            columnStyles: {
                0: { fillColor: '#fff' }, // Left column coloring
                1: { fillColor: '#fff' },    // White KPIs column
                2: { fillColor: '#fff' }     // White Emissions column
            },
            head: [['Scope', 'KPIs', 'Emissions (tCO2)']],  // Table header row
            body: [
                ['Scope 2', 'Electricity Consumption', electricityEmissions.toFixed(6)],
                ['', 'Chilled Water Consumption', chilledWaterEmissions.toFixed(6)],
                ['', 'Purchased Desalinated Water', waterEmissions.toFixed(6)],
                ['', 'Heat Consumption', heatEmissions.toFixed(6)]
            ],
            margin: {
                left: (this.pageWidth - (this.pageWidth - this.margins.left - this.margins.right)) / 2 // Centers the table
            },
            tableWidth: this.pageWidth - this.margins.left - this.margins.right,
        })

        const finalY = this.pdf.lastAutoTable.finalY + 10
        this.pdf.setFontSize(14);
        this.pdf.setTextColor("#000");
        this.pdf.text(`2.3 Scope 3 Emissions: ${scope3Data.grandTotalEmissions.toFixed(6)} tCO2`,
            this.margins.left,
            finalY + 30
        );

        const wrappedText2 = this.pdf.splitTextToSize(
            `Indirect emissions from activities not owned or controlled by the company, but which the company can influence. `,
            maxWidth
        );
        this.pdf.setFontSize(10);
        this.pdf.setTextColor("#000");
        this.pdf.text(wrappedText2,
            this.margins.left,
            finalY + 60
        );

        autoTable(this.pdf, {
            startY: finalY + 100,
            theme: 'grid',  // 'striped', 'grid', or 'plain'
            styles: {
                font: 'helvetica',
                fontSize: 10,
                cellPadding: 8,
                valign: 'middle',
                halign: 'center',
                fillColor: '#E6F8F2',  // Light green background for header row
            },
            headStyles: {
                textColor: '#000',
                fillColor: '#E6F8F2',  // Slightly darker green for headers
                fontSize: 10,
                fontStyle: 'normal',
            },
            columnStyles: {
                0: { fillColor: '#fff' }, // Left column coloring
                1: { fillColor: '#fff' },    // White KPIs column
                2: { fillColor: '#fff' }     // White Emissions column
            },
            head: [['Scope', 'KPIs', 'Emissions (tCO2)']],  // Table header row
            body: [
                ['Scope 3', 'Waste Generated', scope3Data.totalWasteEmissions.toFixed(6)],
                ['', 'Business Travel', scope3Data.totalBusinessTravelEmissions.toFixed(6)],
                ['', 'Purchased Goods', scope3Data.totalPurchasedGoodsEmissions.toFixed(6)],
                ['', 'Capital Goods', scope3Data.totalCapitalGoodsEmissions.toFixed(6)],
                ['', 'Investments', scope3Data.totalInvestmentsEmissions.toFixed(6)],
                ['', 'Employee Commuting', scope3Data.totalEmployeeCommutingEmissions.toFixed(6)],
                ['', 'Fuel Related Activities', scope3Data.totalFuelRelatedEmissions.toFixed(6)],
                ['', 'Upstream Leased Assets', scope3Data.totalUpstreamLeasedAssetsEmissions.toFixed(6)],
                ['', 'Downstream Leased Assets', scope3Data.totalDownstreamLeasedAssetsEmissions.toFixed(6)]
            ],
            margin: {
                left: (this.pageWidth - (this.pageWidth - this.margins.left - this.margins.right)) / 2 // Centers the table
            },
            tableWidth: this.pageWidth - this.margins.left - this.margins.right,
        })



        this.addFooter();
        this.pdf.addPage();
    }

    addScope1AnalysisOne(scope1Data) {
        this.pageNumber = 8;
        this.addBg(rightBg)
        const totalFuelEmissions = scope1Data.fuelEmissions.reduce((total, item) => total + item.emissions, 0);
        this.addHeader('Fuel Consumption');
        this.pdf.setFontSize(10);
        this.pdf.setTextColor("#000");
        this.pdf.text(
            `Emission from Fuel Consumption for [Reporting Period]: ${totalFuelEmissions.toFixed(2)} tCO2`,
            this.margins.left,
            this.margins.top + 100
        );

        this.pdf.setFontSize(12);
        this.pdf.setTextColor("#000");
        this.pdf.text(
            "Breakdown by fuel type: ",
            this.margins.left,
            this.margins.top + 135
        );

        const tableData = scope1Data.fuelEmissions.map(item => [
            item.fuelType,
            `${item.quantity} ${item.unit}`,
            `${item.emissions.toFixed(2)}`
        ]);

        tableData.push([
            "Total",
            "",
            `${totalFuelEmissions.toFixed(2)}`
        ]);

        autoTable(this.pdf, {
            startY: this.margins.top + 150,
            theme: 'grid',  // 'striped', 'grid', or 'plain'
            styles: {
                font: 'helvetica',
                fontSize: 10,
                cellPadding: 8,
                valign: 'middle',
                halign: 'center',
                fillColor: '#E6F8F2',  // Light green background for header row
            },
            headStyles: {
                textColor: '#000',
                fillColor: '#E6F8F2',  // Slightly darker green for headers
                fontSize: 10,
                fontStyle: 'normal',
            },
            columnStyles: {
                0: { fillColor: '#fff' }, // Left column coloring
                1: { fillColor: '#fff' },    // White KPIs column
                2: { fillColor: '#fff' }     // White Emissions column
            },
            head: [["Fuel Type", "Consumption", "Emissions (tCO2)"]],  // Table header row
            body: tableData,
            margin: {
                left: (this.pageWidth - (this.pageWidth - this.margins.left - this.margins.right)) / 2 // Centers the table
            },
            tableWidth: this.pageWidth - this.margins.left - this.margins.right,
        })

        const finalY = this.pdf.lastAutoTable.finalY + 10
        this.pdf.setFontSize(12);
        this.pdf.setTextColor("#000");
        this.pdf.text(
            "Calculation methodology:  ",
            this.margins.left,
            finalY + 20
        );
        this.pdf.setFontSize(10);
        this.pdf.setTextColor("#000");
        // Define the max width for the text to wrap
        const maxWidth = this.pageWidth - this.margins.left - this.margins.right;

        // Use splitTextToSize to break the text into multiple lines
        const wrappedText = this.pdf.splitTextToSize(
            "The tool utilizes emission factors from the US EPA's Emission Factors for GHG Inventories (modified on June 5, 2024) to calculate greenhouse gas emissions associated with fuel consumption. These factors are based on the type of fuel.",
            maxWidth
        );

        // Render the wrapped text at the desired Y position
        this.pdf.text(wrappedText, this.margins.left, finalY + 40);

        this.addFooter();
        this.pdf.addPage();
    }

    addScope1AnalysisTwo(scope1Data) {
        this.pageNumber = 9;
        this.addBg(leftBg)
        const totalRefrigerantEmissions = scope1Data.refrigerantEmissions.reduce((total, item) => total + item.emissions, 0);
        this.addHeader('Refrigerant Consumption');
        this.pdf.setFontSize(10);
        this.pdf.setTextColor("#000");
        this.pdf.text(
            `Emission from Refrigerant Consumption for [Reporting Period]: ${totalRefrigerantEmissions.toFixed(2)} tCO2`,
            this.margins.left,
            this.margins.top + 100
        );

        this.pdf.setFontSize(12);
        this.pdf.setTextColor("#000");
        this.pdf.text(
            "Breakdown by Refrigerant type:  ",
            this.margins.left,
            this.margins.top + 135
        );

        // Transform data for table
        const tableData = scope1Data.refrigerantEmissions.map(item => [
            item.refrigerantType,
            `${item.quantity} ${item.unit}`,
            `${item.emissions.toFixed(2)}`
        ]);

        // Add total row
        tableData.push([
            "Total",
            "",
            `${totalRefrigerantEmissions.toFixed(2)}`
        ]);

        autoTable(this.pdf, {
            startY: this.margins.top + 150,
            theme: 'grid',  // 'striped', 'grid', or 'plain'
            styles: {
                font: 'helvetica',
                fontSize: 10,
                cellPadding: 8,
                valign: 'middle',
                halign: 'center',
                fillColor: '#E6F8F2',  // Light green background for header row
            },
            headStyles: {
                textColor: '#000',
                fillColor: '#E6F8F2',  // Slightly darker green for headers
                fontSize: 10,
                fontStyle: 'normal',
            },
            columnStyles: {
                0: { fillColor: '#fff' }, // Left column coloring
                1: { fillColor: '#fff' },    // White KPIs column
                2: { fillColor: '#fff' }     // White Emissions column
            },
            head: [["Refrigerant Type", "Consumption", "Emissions (tCO2)"]],  // Table header row
            body: tableData,
            margin: {
                left: (this.pageWidth - (this.pageWidth - this.margins.left - this.margins.right)) / 2 // Centers the table
            },
            tableWidth: this.pageWidth - this.margins.left - this.margins.right,
        })
        const finalY = this.pdf.lastAutoTable.finalY + 10
        this.pdf.setFontSize(12);
        this.pdf.setTextColor("#000");
        this.pdf.text(
            "Calculation methodology:  ",
            this.margins.left,
            finalY + 20
        );
        this.pdf.setFontSize(10);
        this.pdf.setTextColor("#000");
        // Define the max width for the text to wrap
        const maxWidth = this.pageWidth - this.margins.left - this.margins.right;

        // Use splitTextToSize to break the text into multiple lines
        const wrappedText = this.pdf.splitTextToSize(
            "The tool employs emission factors from the US EPA's Emission Factors for GHG Inventories (modified on June 5, 2024) to estimate greenhouse gas emissions related to refrigerant consumption. These factors are specific to different types of refrigerants.",
            maxWidth
        );

        // Render the wrapped text at the desired Y position
        this.pdf.text(wrappedText, this.margins.left, finalY + 40);

        this.addFooter();
        this.pdf.addPage();
    }

    addScope1AnalysisThree(scope1Data) {
        this.pageNumber = 10;
        this.addBg(rightBg);
        this.addHeader('Process Emissions');
        const totalProcessEmissions = scope1Data.processEmissions.reduce((total, item) => total + item.emissions, 0);
        this.pdf.setFontSize(10);
        this.pdf.setTextColor("#000");
        this.pdf.text(
            `Total Process Emissions for the [Reporting Period]: ${totalProcessEmissions.toFixed(2)} tCO2`,
            this.margins.left,
            this.margins.top + 100
        );

        this.pdf.setFontSize(12);
        this.pdf.setTextColor("#000");
        this.pdf.text(
            "Breakdown by type: ",
            this.margins.left,
            this.margins.top + 135
        );

        // Transform data for table
        const tableData = scope1Data.processEmissions.map(item => [
            item.processType,
            `${item.quantity}`,
            `${item.emissions.toFixed(6)}`
        ]);

        // Add total row
        tableData.push([
            "Total",
            "",
            `${totalProcessEmissions.toFixed(6)}`
        ]);

        autoTable(this.pdf, {
            startY: this.margins.top + 150,
            theme: 'grid',  // 'striped', 'grid', or 'plain'
            styles: {
                font: 'helvetica',
                fontSize: 10,
                cellPadding: 8,
                valign: 'middle',
                halign: 'center',
                fillColor: '#E6F8F2',  // Light green background for header row
            },
            headStyles: {
                textColor: '#000',
                fillColor: '#E6F8F2',  // Slightly darker green for headers
                fontSize: 10,
                fontStyle: 'normal',
            },
            columnStyles: {
                0: { fillColor: '#fff' }, // Left column coloring
                1: { fillColor: '#fff' },    // White KPIs column
                2: { fillColor: '#fff' }     // White Emissions column
            },
            head: [["Type", "Consumption", "Emissions (tCO2)"]],  // Table header row
            body: tableData,
            margin: {
                left: (this.pageWidth - (this.pageWidth - this.margins.left - this.margins.right)) / 2 // Centers the table
            },
            tableWidth: this.pageWidth - this.margins.left - this.margins.right,
        })
        const finalY = this.pdf.lastAutoTable.finalY + 10
        this.pdf.setFontSize(12);
        this.pdf.setTextColor("#000");
        this.pdf.text(
            "Calculation methodology:  ",
            this.margins.left,
            finalY + 20
        );
        this.pdf.setFontSize(10);
        this.pdf.setTextColor("#000");
        // Define the max width for the text to wrap
        const maxWidth = this.pageWidth - this.margins.left - this.margins.right;

        // Use splitTextToSize to break the text into multiple lines
        const wrappedText = this.pdf.splitTextToSize(
            "The tool follows the methodology outlined in the US EPA's resource for the oil and gas sector to calculate emissions from industrial processes. This involves identifying emission sources, quantifying emissions rates, and applying appropriate emission factors.",
            maxWidth
        );

        // Render the wrapped text at the desired Y position
        this.pdf.text(wrappedText, this.margins.left, finalY + 40);

        this.addFooter();
        this.pdf.addPage();
    }

    addScope2AnalysisOne(scope2Data) {
        this.pageNumber = 11;
        this.addBg(leftBg)
        // Handle electricity consumption data
        const electricityData = this.getEmissionsData(scope2Data, 'electricityConsumption');
        const totalElectricityEmissions = this.calculateTotalEmissions(electricityData);

        this.addHeader('Electricity Consumption');
        this.pdf.setFontSize(10);
        this.pdf.setTextColor("#000");
        this.pdf.text(
            `Emission from Electricity Consumption for [Reporting Period]: ${totalElectricityEmissions.toFixed(6)} tCO2`,
            this.margins.left,
            this.margins.top + 100
        );

        // Create table data for electricity
        const electricityTableData = electricityData.map(item => [
            `${item.quantity} ${item.unit}`,
            `${item.emissions.toFixed(6)}`
        ]);

        autoTable(this.pdf, {
            startY: this.margins.top + 135,
            theme: 'grid',  // 'striped', 'grid', or 'plain'
            styles: {
                font: 'helvetica',
                fontSize: 10,
                cellPadding: 8,
                valign: 'middle',
                halign: 'center',
                fillColor: '#E6F8F2',  // Light green background for header row
            },
            headStyles: {
                textColor: '#000',
                fillColor: '#E6F8F2',  // Slightly darker green for headers
                fontSize: 10,
                fontStyle: 'normal',
            },
            columnStyles: {
                0: { fillColor: '#fff' }, // Left column coloring
                1: { fillColor: '#fff' },    // White KPIs column
                2: { fillColor: '#fff' }     // White Emissions column
            },
            head: [["Consumption", "Emissions (tCO2)"]],  // Table header row
            body: electricityTableData,
            margin: {
                left: (this.pageWidth - (this.pageWidth - this.margins.left - this.margins.right)) / 2 // Centers the table
            },
            tableWidth: this.pageWidth - this.margins.left - this.margins.right,
        })
        const finalY = this.pdf.lastAutoTable.finalY + 10
        this.pdf.setFontSize(12);
        this.pdf.setTextColor("#000");
        this.pdf.text(
            "Calculation methodology:  ",
            this.margins.left,
            finalY + 20
        );
        this.pdf.setFontSize(10);
        this.pdf.setTextColor("#000");
        // Define the max width for the text to wrap
        const maxWidth = this.pageWidth - this.margins.left - this.margins.right;

        // Use splitTextToSize to break the text into multiple lines
        const wrappedText = this.pdf.splitTextToSize(
            "The tool uses country-specific emission factors published by the IEA in 2022 to estimate greenhouse gas emissions associated with electricity consumption. These factors reflect the mix of energy sources used for electricity generation in each country.",
            maxWidth
        );

        // Render the wrapped text at the desired Y position
        this.pdf.text(wrappedText, this.margins.left, finalY + 40);


        // Handle chilled water consumption data
        const chilledWaterData = this.getEmissionsData(scope2Data, 'chilledWaterConsumption');
        const totalChilledWaterEmissions = this.calculateTotalEmissions(chilledWaterData);
        this.pdf.setFontSize(14);
        this.pdf.setTextColor('#029366'); // Red
        this.pdf.setFont('helvetica', 'bold');
        this.pdf.text('Chilled Water Consumption',
            this.margins.left,
            finalY + 100
        );
        this.pdf.setFont('helvetica', 'normal');
        this.pdf.setFontSize(10);
        this.pdf.setTextColor("#000");
        this.pdf.text(
            `Emission from Chilled Water Consumption for [Reporting Period]: ${totalChilledWaterEmissions.toFixed(6)} tCO2`,
            this.margins.left,
            finalY + 120
        );

        // Create table data for chilled water
        const chilledWaterTableData = chilledWaterData.map(item => [
            `${item.quantity} ${item.unit}`,
            `${item.emissions.toFixed(6)}`
        ]);

        autoTable(this.pdf, {
            startY: finalY + 135,
            theme: 'grid',  // 'striped', 'grid', or 'plain'
            styles: {
                font: 'helvetica',
                fontSize: 10,
                cellPadding: 8,
                valign: 'middle',
                halign: 'center',
                fillColor: '#E6F8F2',  // Light green background for header row
            },
            headStyles: {
                textColor: '#000',
                fillColor: '#E6F8F2',  // Slightly darker green for headers
                fontSize: 10,
                fontStyle: 'normal',
            },
            columnStyles: {
                0: { fillColor: '#fff' }, // Left column coloring
                1: { fillColor: '#fff' },    // White KPIs column
                2: { fillColor: '#fff' }     // White Emissions column
            },
            head: [["Consumption", "Emissions (tCO2)"]],  // Table header row
            body: chilledWaterTableData,
            margin: {
                left: (this.pageWidth - (this.pageWidth - this.margins.left - this.margins.right)) / 2 // Centers the table
            },
            tableWidth: this.pageWidth - this.margins.left - this.margins.right,

        })

        this.pdf.setFontSize(12);
        this.pdf.setTextColor("#000");
        this.pdf.text(
            "Calculation methodology:  ",
            this.margins.left,
            this.pdf.lastAutoTable.finalY + 30
        );
        this.pdf.setFontSize(10);
        this.pdf.setTextColor("#000");

        // Use splitTextToSize to break the text into multiple lines
        const wrappedText2 = this.pdf.splitTextToSize(
            "The tool estimates the electricity used to produce chilled water using country-specific emission factors from the IEA 2022 data. These factors are then applied to the chilled water consumption to calculate associated greenhouse gas emissions.",
            maxWidth
        );

        // Render the wrapped text at the desired Y position
        this.pdf.text(wrappedText2, this.margins.left, this.pdf.lastAutoTable.finalY + 50);

        this.addFooter();
        this.pdf.addPage();
    }

    addScope2AnalysisTwo(scope2Data) {
        this.pageNumber = 12;
        this.addBg(rightBg)

        // Handle desalinated water consumption data
        const desalinatedWaterData = this.getEmissionsData(scope2Data, 'purchasedDesalinatedWaterConsumption');
        const totalDesalinatedWaterEmissions = this.calculateTotalEmissions(desalinatedWaterData);

        this.addHeader('Purchased Desalinated Water');
        this.pdf.setFontSize(10);
        this.pdf.setTextColor("#000");
        this.pdf.text(
            `Emission from Purchased Desalinated Water for [Reporting Period]: ${totalDesalinatedWaterEmissions.toFixed(6)} tCO2`,
            this.margins.left,
            this.margins.top + 100
        );


        // Create table data for desalinated water
        const desalinatedWaterTableData = desalinatedWaterData.map(item => [
            `${item.quantity} ${item.unit}`,
            `${item.emissions.toFixed(6)}`
        ]);

        autoTable(this.pdf, {
            startY: this.margins.top + 135,
            theme: 'grid',  // 'striped', 'grid', or 'plain'
            styles: {
                font: 'helvetica',
                fontSize: 10,
                cellPadding: 8,
                valign: 'middle',
                halign: 'center',
                fillColor: '#E6F8F2',  // Light green background for header row
            },
            headStyles: {
                textColor: '#000',
                fillColor: '#E6F8F2',  // Slightly darker green for headers
                fontSize: 10,
                fontStyle: 'normal',
            },
            columnStyles: {
                0: { fillColor: '#fff' }, // Left column coloring
                1: { fillColor: '#fff' },    // White KPIs column
                2: { fillColor: '#fff' }     // White Emissions column
            },
            head: [["Consumption", "Emissions (tCO2)"]],  // Table header row
            body: desalinatedWaterTableData,
            margin: {
                left: (this.pageWidth - (this.pageWidth - this.margins.left - this.margins.right)) / 2 // Centers the table
            },
            tableWidth: this.pageWidth - this.margins.left - this.margins.right,
        })
        const finalY = this.pdf.lastAutoTable.finalY + 10
        this.pdf.setFontSize(12);
        this.pdf.setTextColor("#000");
        this.pdf.text(
            "Calculation methodology:  ",
            this.margins.left,
            finalY + 20
        );
        this.pdf.setFontSize(10);
        this.pdf.setTextColor("#000");
        // Define the max width for the text to wrap
        const maxWidth = this.pageWidth - this.margins.left - this.margins.right;

        // Use splitTextToSize to break the text into multiple lines
        const wrappedText = this.pdf.splitTextToSize(
            "The tool assumes that multi-stage flash (MSF) technology is used for desalination and applies emission factors based on this technology. These factors account for the energy consumption and associated greenhouse gas emissions involved in the desalination process.",
            maxWidth
        );

        // Render the wrapped text at the desired Y position
        this.pdf.text(wrappedText, this.margins.left, finalY + 40);

        this.pdf.setFontSize(14);
        this.pdf.setTextColor('#029366'); // Red
        this.pdf.setFont('helvetica', 'bold');
        // Handle heat consumption data
        const heatData = this.getEmissionsData(scope2Data, 'heatConsumption');
        const totalHeatEmissions = this.calculateTotalEmissions(heatData);

        this.pdf.text('Heat Consumption',
            this.margins.left,
            finalY + 100
        );
        this.pdf.setFont('helvetica', 'normal');
        this.pdf.setFontSize(10);
        this.pdf.setTextColor("#000");
        this.pdf.text(
            `Emission from Heat Consumption for [Reporting Period]: ${totalHeatEmissions.toFixed(6)} tCO2`,
            this.margins.left,
            finalY + 120
        );

        // Create table data for heat consumption
        const heatTableData = heatData.map(item => [
            `${item.quantity} ${item.unit}`,
            `${item.emissions.toFixed(6)}`
        ]);

        autoTable(this.pdf, {
            startY: finalY + 135,
            theme: 'grid',  // 'striped', 'grid', or 'plain'
            styles: {
                font: 'helvetica',
                fontSize: 10,
                cellPadding: 8,
                valign: 'middle',
                halign: 'center',
                fillColor: '#E6F8F2',  // Light green background for header row
            },
            headStyles: {
                textColor: '#000',
                fillColor: '#E6F8F2',  // Slightly darker green for headers
                fontSize: 10,
                fontStyle: 'normal',
            },
            columnStyles: {
                0: { fillColor: '#fff' }, // Left column coloring
                1: { fillColor: '#fff' },    // White KPIs column
                2: { fillColor: '#fff' }     // White Emissions column
            },
            head: [["Consumption", "Emissions (tCO2)"]],  // Table header row
            body: heatTableData,
            margin: {
                left: (this.pageWidth - (this.pageWidth - this.margins.left - this.margins.right)) / 2 // Centers the table
            },
            tableWidth: this.pageWidth - this.margins.left - this.margins.right,
        })

        this.pdf.setFontSize(12);
        this.pdf.setTextColor("#000");
        this.pdf.text(
            "Calculation methodology:  ",
            this.margins.left,
            this.pdf.lastAutoTable.finalY + 30
        );
        this.pdf.setFontSize(10);
        this.pdf.setTextColor("#000");

        // Use splitTextToSize to break the text into multiple lines
        const wrappedText2 = this.pdf.splitTextToSize(
            "The tool utilizes emission factors from the US EPA's Emission Factors for Greenhouse Gas Inventories (updated on June 5, 2024) to estimate greenhouse gas emissions associated with heat consumption.",
            maxWidth
        );

        // Render the wrapped text at the desired Y position
        this.pdf.text(wrappedText2, this.margins.left, this.pdf.lastAutoTable.finalY + 50);

        this.addFooter();
        this.pdf.addPage();
    }

    addScope3AnalysisOne(scope3Data) {
        this.pageNumber = 13;
        this.addBg(leftBg)
        this.addHeader('Waste Generated');

        // Handle waste data with defaults
        const wasteData = this.getDataWithDefault(scope3Data.wasteData, {
            category: 'No Data',
            subCategory: '-',
            disposalMethod: '-',
            quantity: 0,
            emissions: 0
        });

        const totalWasteEmissions = this.calculateEmissionsTotal(wasteData);

        this.pdf.setFontSize(10);
        this.pdf.setTextColor("#000");
        this.pdf.text(
            `Emission from Waste Generated for [Reporting Period]: ${totalWasteEmissions.toFixed(6)} tCO2`,
            this.margins.left,
            this.margins.top + 100
        );

        this.pdf.setFontSize(12);
        this.pdf.setTextColor("#000");
        this.pdf.text(
            "Breakdown by Waste Categories: ",
            this.margins.left,
            this.margins.top + 135
        );

        // Transform data for table
        const tableData = wasteData.map(item => [
            item.category,
            `${item.quantity}`,
            `${item.emissions.toFixed(6)}`
        ]);

        // Add total row
        tableData.push(['Total', '', `${totalWasteEmissions.toFixed(6)}`]);

        autoTable(this.pdf, {
            startY: this.margins.top + 150,
            theme: 'grid',  // 'striped', 'grid', or 'plain'
            styles: {
                font: 'helvetica',
                fontSize: 10,
                cellPadding: 8,
                valign: 'middle',
                halign: 'center',
                fillColor: '#E6F8F2',  // Light green background for header row
            },
            headStyles: {
                textColor: '#000',
                fillColor: '#E6F8F2',  // Slightly darker green for headers
                fontSize: 10,
                fontStyle: 'normal',
            },
            columnStyles: {
                0: { fillColor: '#fff' }, // Left column coloring
                1: { fillColor: '#fff' },    // White KPIs column
                2: { fillColor: '#fff' }     // White Emissions column
            },
            head: [["Fuel Type", "Consumption", "Emissions (tCO2)"]],  // Table header row
            body: tableData,
            margin: {
                left: (this.pageWidth - (this.pageWidth - this.margins.left - this.margins.right)) / 2 // Centers the table
            },
            tableWidth: this.pageWidth - this.margins.left - this.margins.right,
        })
        const finalY = this.pdf.lastAutoTable.finalY + 10
        this.pdf.setFontSize(12);
        this.pdf.setTextColor("#000");
        this.pdf.text(
            "Calculation methodology:  ",
            this.margins.left,
            finalY + 20
        );
        this.pdf.setFontSize(10);
        this.pdf.setTextColor("#000");
        // Define the max width for the text to wrap
        const maxWidth = this.pageWidth - this.margins.left - this.margins.right;

        // Use splitTextToSize to break the text into multiple lines
        const wrappedText = this.pdf.splitTextToSize(
            "The tool uses the US EPA's methodology for calculating greenhouse gas emissions from waste disposal, considering factors such as the type of waste, disposal method, and regional landfill characteristics.",
            maxWidth
        );

        // Render the wrapped text at the desired Y position
        this.pdf.text(wrappedText, this.margins.left, finalY + 40);

        this.addFooter();
        this.pdf.addPage();
    }

    addScope3AnalysisTwo(scope3Data) {
        this.pageNumber = 14;
        this.addBg(rightBg)
        this.addHeader('Business Travel');

        // Handle business travel data with defaults
        const travelData = this.getDataWithDefault(scope3Data.businessTravelData, {
            travelClass: 'No Data',
            numTrips: 0,
            distanceKm: 0,
            emissions: 0
        });

        const totalTravelEmissions = this.calculateEmissionsTotal(travelData);

        this.pdf.setFontSize(10);
        this.pdf.setTextColor("#000");
        this.pdf.text(
            `Emission from Business Travel for [Reporting Period]: ${totalTravelEmissions.toFixed(6)} tCO2`,
            this.margins.left,
            this.margins.top + 100
        );
        this.pdf.setFontSize(12);
        this.pdf.setTextColor("#000");
        this.pdf.text(
            "Breakdown by Travel Class: ",
            this.margins.left,
            this.margins.top + 135
        );

        // Transform data for table
        const tableData = travelData.map(item => [
            item.travelClass,
            item.numTrips.toString(),
            `${item.emissions.toFixed(6)}`
        ]);

        // Add total row
        tableData.push(['Total', '', `${totalTravelEmissions.toFixed(6)}`]);

        autoTable(this.pdf, {
            startY: this.margins.top + 150,
            theme: 'grid',  // 'striped', 'grid', or 'plain'
            styles: {
                font: 'helvetica',
                fontSize: 10,
                cellPadding: 8,
                valign: 'middle',
                halign: 'center',
                fillColor: '#E6F8F2',  // Light green background for header row
            },
            headStyles: {
                textColor: '#000',
                fillColor: '#E6F8F2',  // Slightly darker green for headers
                fontSize: 10,
                fontStyle: 'normal',
            },
            columnStyles: {
                0: { fillColor: '#fff' }, // Left column coloring
                1: { fillColor: '#fff' },    // White KPIs column
                2: { fillColor: '#fff' }     // White Emissions column
            },
            head: [["Travel Class", "Number of trips", "Emissions (tCO2)"]],  // Table header row
            body: tableData,
            margin: {
                left: (this.pageWidth - (this.pageWidth - this.margins.left - this.margins.right)) / 2 // Centers the table
            },
            tableWidth: this.pageWidth - this.margins.left - this.margins.right,
        })
        const finalY = this.pdf.lastAutoTable.finalY + 10
        this.pdf.setFontSize(12);
        this.pdf.setTextColor("#000");
        this.pdf.text(
            "Calculation methodology:  ",
            this.margins.left,
            finalY + 20
        );
        this.pdf.setFontSize(10);
        this.pdf.setTextColor("#000");
        // Define the max width for the text to wrap
        const maxWidth = this.pageWidth - this.margins.left - this.margins.right;

        // Use splitTextToSize to break the text into multiple lines
        const wrappedText = this.pdf.splitTextToSize(
            "The tool employs emission factors from the US EPA and the GHG Protocol to calculate emissions associated with business travel. These factors are based on Travel Class and the distance traveled.",
            maxWidth
        );

        // Render the wrapped text at the desired Y position
        this.pdf.text(wrappedText, this.margins.left, finalY + 40);

        this.pdf.setFontSize(14);
        this.pdf.setTextColor('#029366'); // Red
        this.pdf.setFont('helvetica', 'bold');

        // Handle purchased goods section
        const purchasedGoodsData = this.getDataWithDefault(scope3Data.purchasedGoodsData, {
            typeOfExpense: 'No Data',
            expenseValue: 0,
            emissions: 0
        });

        const totalPurchasedGoodsEmissions = this.calculateEmissionsTotal(purchasedGoodsData);

        this.pdf.text('Purchased Goods',
            this.margins.left,
            finalY + 100
        );
        this.pdf.setFont('helvetica', 'normal');
        this.pdf.setFontSize(10);
        this.pdf.setTextColor("#000");
        this.pdf.text(
            `Emission from Purchased Goods for [Reporting Period]: ${totalPurchasedGoodsEmissions.toFixed(6)} tCO2`,
            this.margins.left,
            finalY + 120
        );

        const purchasedGoodsTableData = [[
            totalPurchasedGoodsEmissions.toFixed(6),
            `${totalPurchasedGoodsEmissions.toFixed(6)}`
        ]];

        autoTable(this.pdf, {
            startY: finalY + 135,
            theme: 'grid',  // 'striped', 'grid', or 'plain'
            styles: {
                font: 'helvetica',
                fontSize: 10,
                cellPadding: 8,
                valign: 'middle',
                halign: 'center',
                fillColor: '#E6F8F2',  // Light green background for header row
            },
            headStyles: {
                textColor: '#000',
                fillColor: '#E6F8F2',  // Slightly darker green for headers
                fontSize: 10,
                fontStyle: 'normal',
            },
            columnStyles: {
                0: { fillColor: '#fff' }, // Left column coloring
                1: { fillColor: '#fff' },    // White KPIs column
                2: { fillColor: '#fff' }     // White Emissions column
            },
            head: [["Expense Value", "Emissions (tCO2)"]],  // Table header row
            body: purchasedGoodsTableData,
            margin: {
                left: (this.pageWidth - (this.pageWidth - this.margins.left - this.margins.right)) / 2 // Centers the table
            },
            tableWidth: this.pageWidth - this.margins.left - this.margins.right,
        })

        this.pdf.setFontSize(12);
        this.pdf.setTextColor("#000");
        this.pdf.text(
            "Calculation methodology:  ",
            this.margins.left,
            this.pdf.lastAutoTable.finalY + 30
        );
        this.pdf.setFontSize(10);
        this.pdf.setTextColor("#000");

        // Use splitTextToSize to break the text into multiple lines
        const wrappedText2 = this.pdf.splitTextToSize(
            "The tool follows the UNFCCC CDM Supplier Inventory to calculate emissions associated with purchased goods. This involves considering the emissions embedded in the production and transportation of these items.",
            maxWidth
        );

        // Render the wrapped text at the desired Y position
        this.pdf.text(wrappedText2, this.margins.left, this.pdf.lastAutoTable.finalY + 50);

        this.addFooter();
        this.pdf.addPage();
    }

    addScope3AnalysisThree(scope3Data) {
        this.pageNumber = 15;
        this.addBg(leftBg)

        // Handle capital goods data with defaults
        const capitalGoodsData = this.getDataWithDefault(scope3Data.capitalGoodsData, {
            assetType: 'No Data',
            assetCategory: '-',
            expenseValue: 0,
            emissions: 0
        });

        const totalCapitalGoodsEmissions = this.calculateEmissionsTotal(capitalGoodsData);
        this.addHeader('Capital Goods');
        this.pdf.setFontSize(10);
        this.pdf.setTextColor("#000");
        this.pdf.text(
            `Emission from Capital Goods for [Reporting Period]: ${totalCapitalGoodsEmissions.toFixed(6)} tCO2`,
            this.margins.left,
            this.margins.top + 100
        );

        const capitalGoodsTableData = [[
            totalCapitalGoodsEmissions.toFixed(6),
            `${totalCapitalGoodsEmissions.toFixed(6)}`
        ]];

        autoTable(this.pdf, {
            startY: this.margins.top + 135,
            theme: 'grid',  // 'striped', 'grid', or 'plain'
            styles: {
                font: 'helvetica',
                fontSize: 10,
                cellPadding: 8,
                valign: 'middle',
                halign: 'center',
                fillColor: '#E6F8F2',  // Light green background for header row
            },
            headStyles: {
                textColor: '#000',
                fillColor: '#E6F8F2',  // Slightly darker green for headers
                fontSize: 10,
                fontStyle: 'normal',
            },
            columnStyles: {
                0: { fillColor: '#fff' }, // Left column coloring
                1: { fillColor: '#fff' },    // White KPIs column
                2: { fillColor: '#fff' }     // White Emissions column
            },
            head: [["Expense Value", "Emissions (tCO2)"]],  // Table header row
            body: capitalGoodsTableData,
            margin: {
                left: (this.pageWidth - (this.pageWidth - this.margins.left - this.margins.right)) / 2 // Centers the table
            },
            tableWidth: this.pageWidth - this.margins.left - this.margins.right,
        })
        const finalY = this.pdf.lastAutoTable.finalY + 10
        this.pdf.setFontSize(12);
        this.pdf.setTextColor("#000");
        this.pdf.text(
            "Calculation methodology:  ",
            this.margins.left,
            finalY + 20
        );
        this.pdf.setFontSize(10);
        this.pdf.setTextColor("#000");
        // Define the max width for the text to wrap
        const maxWidth = this.pageWidth - this.margins.left - this.margins.right;

        // Use splitTextToSize to break the text into multiple lines
        const wrappedText = this.pdf.splitTextToSize(
            "The tool follows the UNFCCC CDM Supplier Inventory to calculate emissions associated with Capital goods. This involves considering the emissions embedded in the production and transportation of these items.",
            maxWidth
        );

        // Render the wrapped text at the desired Y position
        this.pdf.text(wrappedText, this.margins.left, finalY + 40);

        this.pdf.setFontSize(14);
        this.pdf.setTextColor('#029366'); // Red
        this.pdf.setFont('helvetica', 'bold');
        // Handle investments section
        const investmentsData = this.getDataWithDefault(scope3Data.investmentsData, {
            ownershipPercentage: 0,
            investeeCompanyEmissions: 0,
            emissions: 0
        });

        const totalInvestmentsEmissions = this.calculateEmissionsTotal(investmentsData);
        this.pdf.text('Investments',
            this.margins.left,
            finalY + 100
        );
        this.pdf.setFont('helvetica', 'normal');
        this.pdf.setFontSize(10);
        this.pdf.setTextColor("#000");
        this.pdf.text(
            `Emission from Investments for [Reporting Period]: ${totalInvestmentsEmissions.toFixed(6)} tCO2`,
            this.margins.left,
            finalY + 120
        );

        const investmentsTableData = investmentsData.map(item => [
            `${item.ownershipPercentage}%`,
            `${item.emissions.toFixed(6)}`
        ]);

        autoTable(this.pdf, {
            startY: finalY + 135,
            theme: 'grid',  // 'striped', 'grid', or 'plain'
            styles: {
                font: 'helvetica',
                fontSize: 10,
                cellPadding: 8,
                valign: 'middle',
                halign: 'center',
                fillColor: '#E6F8F2',  // Light green background for header row
            },
            headStyles: {
                textColor: '#000',
                fillColor: '#E6F8F2',  // Slightly darker green for headers
                fontSize: 10,
                fontStyle: 'normal',
            },
            columnStyles: {
                0: { fillColor: '#fff' }, // Left column coloring
                1: { fillColor: '#fff' },    // White KPIs column
                2: { fillColor: '#fff' }     // White Emissions column
            },
            head: [["Ownership Percentage", "Emissions (tCO2)"]],  // Table header row
            body: investmentsTableData,
            margin: {
                left: (this.pageWidth - (this.pageWidth - this.margins.left - this.margins.right)) / 2 // Centers the table
            },
            tableWidth: this.pageWidth - this.margins.left - this.margins.right,
        })

        this.pdf.setFontSize(12);
        this.pdf.setTextColor("#000");
        this.pdf.text(
            "Calculation methodology:  ",
            this.margins.left,
            this.pdf.lastAutoTable.finalY + 30
        );
        this.pdf.setFontSize(10);
        this.pdf.setTextColor("#000");

        // Use splitTextToSize to break the text into multiple lines
        const wrappedText2 = this.pdf.splitTextToSize(
            "The tool uses the GHG Protocol Accounting methodology to calculate emissions associated with investments.",
            maxWidth
        );

        // Render the wrapped text at the desired Y position
        this.pdf.text(wrappedText2, this.margins.left, this.pdf.lastAutoTable.finalY + 50);

        this.addFooter();
        this.pdf.addPage();
    }

    addScope3AnalysisFour(scope3Data) {
        this.pageNumber = 16;
        this.addBg(rightBg);

        // Handle employee commuting data with defaults
        const commutingData = this.getDataWithDefault(scope3Data.employeeCommutingData, {
            vehicleType: 'No Data',
            distanceKm: 0,
            numTrips: 0,
            emissions: 0
        });

        const totalCommutingEmissions = this.calculateEmissionsTotal(commutingData);

        this.addHeader('Employee Commuting');
        this.pdf.setFontSize(10);
        this.pdf.setTextColor("#000");
        this.pdf.text(
            `Emission from Employee Commuting for [Reporting Period]: ${totalCommutingEmissions.toFixed(6)} tCO2`,
            this.margins.left,
            this.margins.top + 100
        );

        this.pdf.setFontSize(12);
        this.pdf.setTextColor("#000");
        this.pdf.text(
            "Breakdown by Vehicle type: ",
            this.margins.left,
            this.margins.top + 135
        );

        // Transform data for table
        const tableData = commutingData.map(item => [
            item.vehicleType,
            item.numTrips.toString(),
            `${item.emissions.toFixed(6)}`
        ]);

        // Add total row
        tableData.push(['Total', '', `${totalCommutingEmissions.toFixed(6)}`]);

        autoTable(this.pdf, {
            startY: this.margins.top + 150,
            theme: 'grid',  // 'striped', 'grid', or 'plain'
            styles: {
                font: 'helvetica',
                fontSize: 10,
                cellPadding: 8,
                valign: 'middle',
                halign: 'center',
                fillColor: '#E6F8F2',  // Light green background for header row
            },
            headStyles: {
                textColor: '#000',
                fillColor: '#E6F8F2',  // Slightly darker green for headers
                fontSize: 10,
                fontStyle: 'normal',
            },
            columnStyles: {
                0: { fillColor: '#fff' }, // Left column coloring
                1: { fillColor: '#fff' },    // White KPIs column
                2: { fillColor: '#fff' }     // White Emissions column
            },
            head: [["Vehicle Type", "No. of Trips", "Emissions (tCO2)"]],  // Table header row
            body: tableData,
            margin: {
                left: (this.pageWidth - (this.pageWidth - this.margins.left - this.margins.right)) / 2 // Centers the table
            },
            tableWidth: this.pageWidth - this.margins.left - this.margins.right,
        })
        const finalY = this.pdf.lastAutoTable.finalY + 10
        this.pdf.setFontSize(12);
        this.pdf.setTextColor("#000");
        this.pdf.text(
            "Calculation methodology:  ",
            this.margins.left,
            finalY + 20
        );
        this.pdf.setFontSize(10);
        this.pdf.setTextColor("#000");
        // Define the max width for the text to wrap
        const maxWidth = this.pageWidth - this.margins.left - this.margins.right;

        // Use splitTextToSize to break the text into multiple lines
        const wrappedText = this.pdf.splitTextToSize(
            "The tool utilizes emission factors from the US EPA for vehicle types and the GHG Protocol methodology to calculate emissions associated with employee commuting. This involves considering the distance traveled, vehicle type, and fuel efficiency.",
            maxWidth
        );

        // Render the wrapped text at the desired Y position
        this.pdf.text(wrappedText, this.margins.left, finalY + 40);

        this.addFooter();
        this.pdf.addPage();
    }

    addScope3AnalysisFive(scope3Data) {
        this.pageNumber = 17;
        this.addBg(leftBg);
        // Handle fuel related data with defaults
        const fuelRelatedData = this.getDataWithDefault(scope3Data.fuelRelatedData, {
            category: 'No Data',
            emissions: 0
        });

        const totalFuelRelatedEmissions = this.calculateEmissionsTotal(fuelRelatedData);
        this.addHeader('Fuel Related Activities');
        this.pdf.setFontSize(10);
        this.pdf.setTextColor("#000");
        this.pdf.text(
            `Emission from Fuel Related Activities for [Reporting Period]: ${totalFuelRelatedEmissions.toFixed(6)} tCO2`,
            this.margins.left,
            this.margins.top + 100
        );

        this.pdf.setFontSize(12);
        this.pdf.setTextColor("#000");
        this.pdf.text(
            "Breakdown by Categories: ",
            this.margins.left,
            this.margins.top + 135
        );

        // Transform data for table
        const tableData = fuelRelatedData.map(item => [
            item.category,
            `${item.emissions.toFixed(6)}`
        ]);

        // Add total row
        tableData.push(['Total', `${totalFuelRelatedEmissions.toFixed(6)}`]);

        autoTable(this.pdf, {
            startY: this.margins.top + 150,
            theme: 'grid',  // 'striped', 'grid', or 'plain'
            styles: {
                font: 'helvetica',
                fontSize: 10,
                cellPadding: 8,
                valign: 'middle',
                halign: 'center',
                fillColor: '#E6F8F2',  // Light green background for header row
            },
            headStyles: {
                textColor: '#000',
                fillColor: '#E6F8F2',  // Slightly darker green for headers
                fontSize: 10,
                fontStyle: 'normal',
            },
            columnStyles: {
                0: { fillColor: '#fff' }, // Left column coloring
                1: { fillColor: '#fff' },    // White KPIs column
                2: { fillColor: '#fff' }     // White Emissions column
            },
            head: [["Category", "Emissions (tCO2)"]],  // Table header row
            body: tableData,
            margin: {
                left: (this.pageWidth - (this.pageWidth - this.margins.left - this.margins.right)) / 2 // Centers the table
            },
            tableWidth: this.pageWidth - this.margins.left - this.margins.right,
        })
        const finalY = this.pdf.lastAutoTable.finalY + 10
        this.pdf.setFontSize(12);
        this.pdf.setTextColor("#000");
        this.pdf.text(
            "Calculation methodology:  ",
            this.margins.left,
            finalY + 20
        );
        this.pdf.setFontSize(10);
        this.pdf.setTextColor("#000");
        // Define the max width for the text to wrap
        const maxWidth = this.pageWidth - this.margins.left - this.margins.right;

        // Use splitTextToSize to break the text into multiple lines
        const wrappedText = this.pdf.splitTextToSize(
            "The tool uses the same emission factors from the US EPA's oil and gas source as used for process emissions to calculate emissions associated with fuel-related activities, such as fuel storage and distribution.",
            maxWidth
        );

        // Render the wrapped text at the desired Y position
        this.pdf.text(wrappedText, this.margins.left, finalY + 40);

        this.addFooter();
        this.pdf.addPage();
    }

    addScope3AnalysisSix(scope3Data) {
        this.pageNumber = 18;
        this.addBg(rightBg);

        // Handle upstream leased assets data with defaults
        const upstreamLeasedData = this.getDataWithDefault(scope3Data.upstreamLeasedAssetsData, {
            assetType: 'No Data',
            emissions: 0
        });

        const totalUpstreamEmissions = this.calculateEmissionsTotal(upstreamLeasedData);

        this.addHeader('Upstream Leased Assets');
        this.pdf.setFontSize(10);
        this.pdf.setTextColor("#000");
        this.pdf.text(
            `Emission from Upstream Leased Assets for [Reporting Period]: ${totalUpstreamEmissions.toFixed(6)} tCO2`,
            this.margins.left,
            this.margins.top + 100
        );
        this.pdf.setFontSize(12);
        this.pdf.setTextColor("#000");
        this.pdf.text(
            "Breakdown by Asset type:",
            this.margins.left,
            this.margins.top + 135
        );

        // Transform data for table
        const tableData = upstreamLeasedData.map(item => [
            item.assetType,
            `${item.emissions.toFixed(6)}`
        ]);

        // Add total row
        tableData.push(['Total', `${totalUpstreamEmissions.toFixed(6)}`]);

        autoTable(this.pdf, {
            startY: this.margins.top + 150,
            theme: 'grid',  // 'striped', 'grid', or 'plain'
            styles: {
                font: 'helvetica',
                fontSize: 10,
                cellPadding: 8,
                valign: 'middle',
                halign: 'center',
                fillColor: '#E6F8F2',  // Light green background for header row
            },
            headStyles: {
                textColor: '#000',
                fillColor: '#E6F8F2',  // Slightly darker green for headers
                fontSize: 10,
                fontStyle: 'normal',
            },
            columnStyles: {
                0: { fillColor: '#fff' }, // Left column coloring
                1: { fillColor: '#fff' },    // White KPIs column
                2: { fillColor: '#fff' }     // White Emissions column
            },
            head: [["Asset Type", "Emissions (tCO2)"]],  // Table header row
            body: tableData,
            margin: {
                left: (this.pageWidth - (this.pageWidth - this.margins.left - this.margins.right)) / 2 // Centers the table
            },
            tableWidth: this.pageWidth - this.margins.left - this.margins.right,
        })
        const finalY = this.pdf.lastAutoTable.finalY + 10
        this.pdf.setFontSize(12);
        this.pdf.setTextColor("#000");
        this.pdf.text(
            "Calculation methodology:  ",
            this.margins.left,
            finalY + 20
        );
        this.pdf.setFontSize(10);
        this.pdf.setTextColor("#000");
        // Define the max width for the text to wrap
        const maxWidth = this.pageWidth - this.margins.left - this.margins.right;

        // Use splitTextToSize to break the text into multiple lines
        const wrappedText = this.pdf.splitTextToSize(
            "The tool follows the GHG Protocol methodology to calculate emissions associated with upstream leased assets, such as oil and gas exploration and production activities. This involves identifying emission sources and applying appropriate emission factors from the US EPA.",
            maxWidth
        );

        // Render the wrapped text at the desired Y position
        this.pdf.text(wrappedText, this.margins.left, finalY + 40);

        this.pdf.setFontSize(14);
        this.pdf.setTextColor('#029366'); // Red
        this.pdf.setFont('helvetica', 'bold');

        // Handle downstream leased assets section
        const downstreamLeasedData = this.getDataWithDefault(scope3Data.downstreamLeasedAssetsData, {
            emissions: 0
        });

        const totalDownstreamEmissions = this.calculateEmissionsTotal(downstreamLeasedData);

        this.pdf.text('Downstream Leased Assets',
            this.margins.left,
            finalY + 100
        );
        this.pdf.setFont('helvetica', 'normal');
        this.pdf.setFontSize(10);
        this.pdf.setTextColor("#000");
        this.pdf.text(
            `Emission from Downstream Leased Assets for [Reporting Period]: ${totalDownstreamEmissions.toFixed(6)} tCO2`,
            this.margins.left,
            finalY + 120
        );

        const downstreamTableData = [[
            totalDownstreamEmissions.toFixed(6),
            `${totalDownstreamEmissions.toFixed(6)}`
        ]];

        autoTable(this.pdf, {
            startY: finalY + 135,
            theme: 'grid',  // 'striped', 'grid', or 'plain'
            styles: {
                font: 'helvetica',
                fontSize: 10,
                cellPadding: 8,
                valign: 'middle',
                halign: 'center',
                fillColor: '#E6F8F2',  // Light green background for header row
            },
            headStyles: {
                textColor: '#000',
                fillColor: '#E6F8F2',  // Slightly darker green for headers
                fontSize: 10,
                fontStyle: 'normal',
            },
            columnStyles: {
                0: { fillColor: '#fff' }, // Left column coloring
                1: { fillColor: '#fff' },    // White KPIs column
                2: { fillColor: '#fff' }     // White Emissions column
            },
            head: [["Physical Area", "Emissions (tCO2)"]],  // Table header row
            body: downstreamTableData,
            margin: {
                left: (this.pageWidth - (this.pageWidth - this.margins.left - this.margins.right)) / 2 // Centers the table
            },
            tableWidth: this.pageWidth - this.margins.left - this.margins.right,
        })

        this.pdf.setFontSize(12);
        this.pdf.setTextColor("#000");
        this.pdf.text(
            "Calculation methodology:  ",
            this.margins.left,
            this.pdf.lastAutoTable.finalY + 30
        );
        this.pdf.setFontSize(10);
        this.pdf.setTextColor("#000");

        // Use splitTextToSize to break the text into multiple lines
        const wrappedText2 = this.pdf.splitTextToSize(
            "The tool uses the GHG Protocol Accounting methodology to calculate emissions associated with Downstream Leased Assets.",
            maxWidth
        );

        // Render the wrapped text at the desired Y position
        this.pdf.text(wrappedText2, this.margins.left, this.pdf.lastAutoTable.finalY + 50);

        this.addFooter();
        this.pdf.addPage();
    }

    addConclusionPage() {
        this.pageNumber = 19;
        const pageWidth = this.pdf.internal.pageSize.getWidth();
        const pageHeight = this.pdf.internal.pageSize.getHeight();

        this.pdf.addImage(
            reportLastPage,
            'PNG',
            0,
            0,
            pageWidth,
            pageHeight
        );
    }

    async fetchAllData() {
        // Simulated data - replace with actual API calls
        return {
            emissionsData: {
                fuelConsumption: '24,546 tCO2',
                refrigerantData: '12,345 tCO2',
                processEmission: '8,765 tCO2'
            },
            scope2EmissionsData: {
                electricityConsumption: '35,678 tCO2',
                chilledWaterConsumption: '11,234 tCO2',
                purchasedDesalinatedWater: '5,678 tCO2'
            },
            scope3EmissionsData: {
                wasteGenerated: '15,432 tCO2',
                businessTravel: '9,876 tCO2',
                purchasedGoods: '42,345 tCO2',
                employeeCommuting: '6,543 tCO2'
            }
        };
    }
}

export { MultiPageGHGReportGenerator };