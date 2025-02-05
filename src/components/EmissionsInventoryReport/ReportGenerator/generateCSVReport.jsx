// import Papa from 'papaparse';

// import axios from 'axios';
// import api from "../../../api"

// async function fetchOnboardingData() {
//     try {
//         const response = await api.get('https://backend.ghg.ge3s.org/api/user/onboard-data');
//         return response.data;
//     } catch (error) {
//         console.error('Error fetching percent data:', error);
//         throw error;
//     }
// }

// async function fetchPercentData(reportId) {
//     try {
//         const response = await axios.post('https://backend.ghg.ge3s.org/api/report/fetch_total_emissions', {
//             reportId: reportId
//         });
//         return response.data;
//     } catch (error) {
//         console.error('Error fetching percent data:', error);
//         throw error;
//     }
// }

// async function fetchScope1Data(reportId) {
//     try {
//         const response = await axios.post('https://backend.ghg.ge3s.org/api/report/scope1_categorized_emissions', {
//             reportId: reportId
//         });
//         return response.data;
//     } catch (error) {
//         console.error('Error fetching scope 1 data:', error);
//         throw error;
//     }
// }

// async function fetchScope2Data(reportId) {
//     try {
//         const response = await axios.post('https://backend.ghg.ge3s.org/api/report/scope2_totals_emissions', {
//             reportId: reportId
//         });
//         return response.data;
//     } catch (error) {
//         console.error('Error fetching scope 2 data:', error);
//         throw error;
//     }
// }

// async function fetchScope3Data(reportId) {
//     try {
//         const response = await axios.post('https://backend.ghg.ge3s.org/api/report/scope3_categorized_emissions', {
//             reportId: reportId
//         });
//         return response.data;
//     } catch (error) {
//         console.error('Error fetching scope 3 data:', error);
//         throw error;
//     }
// }

// class GHGCSVReportGenerator {
//     async generateReport(reportId) {
//         try {

//             const companyInfo = await fetchOnboardingData();
//         //const percentData = await fetchPercentData(reportId);
//         const scope1Data = await fetchScope1Data(reportId);
//         const scope2Data = await fetchScope2Data(reportId);
//         const scope3Data = await fetchScope3Data(reportId);
//         const scope1Response = await axios.post('https://backend.ghg.ge3s.org/api/report/scope1_totals_emissions', { reportId });
//         const scope2Response = await axios.post('https://backend.ghg.ge3s.org/api/report/scope2_totals_emissions', { reportId });
//         const scope3Response = await axios.post('https://backend.ghg.ge3s.org/api/report/scope3_totals_emissions', { reportId });

//             // Fetch data from backend APIs
//             //const companyInfo = await this.fetchCompanyInfo(reportId);
//             // const scope1Data = await this.fetchScope1Data(reportId);
//             // const scope2Data = await this.fetchScope2Data(reportId);
//             // const scope3Data = await this.fetchScope3Data(reportId);

//             // Prepare CSV data for each sheet
//             const companyInfoCSV = this.prepareCompanyInfoCSV(companyInfo);
//             const scope1CSV = this.prepareScope1CSV(scope1Data);
//             const scope2CSV = this.prepareScope2CSV(scope2Data);
//             const scope3CSV = this.prepareScope3CSV(scope3Data);

//             // Combine all sheets into a single CSV string with section headers
//             const finalCSV = [
//                 'Company Info Sheet',
//                 companyInfoCSV,
//                 '',
//                 'Scope 1 Sheet',
//                 scope1CSV,
//                 '',
//                 'Scope 2 Sheet',
//                 scope2CSV,
//                 '',
//                 'Scope 3 Sheet',
//                 scope3CSV,
//             ].join('\n');

//             // Create a Blob and save as a CSV file
//             const blob = new Blob([finalCSV], { type: 'text/csv;charset=utf-8;' });
//             saveAs(blob, 'GHG_Report.csv');
//         } catch (error) {
//             console.error('Error generating CSV report:', error);
//             throw error;
//         }
//     }

//     async fetchCompanyInfo(reportId) {
//         // Simulate API call for company info
//         return {
//             companyName: 'XYZ',
//             country: 'XYZ',
//             sector: 'XYZ',
//             industry: 'XYZ',
//             firstReportingYear: 'XYZ',
//             baselineYear: 'XYZ',
//             employeeCount: 'XYZ',
//         };
//     }

//     async fetchScope1Data(reportId) {
//         // Simulate API call for Scope 1 data
//         return {
//             fuelConsumption: [
//                 { fuelType: 'Diesel', consumption: '', emissions: '' },
//                 { fuelType: 'Gasoline/Petrol', consumption: '', emissions: '' },
//                 { fuelType: 'HFO', consumption: '', emissions: '' },
//                 { fuelType: 'LPG', consumption: '', emissions: '' },
//                 { fuelType: 'CNG', consumption: '', emissions: '' },
//             ],
//             refrigerantConsumption: [
//                 { refrigerantType: 'R410a', consumption: '', emissions: '' },
//                 { refrigerantType: 'R22', consumption: '', emissions: '' },
//                 { refrigerantType: 'R134a', consumption: '', emissions: '' },
//                 { refrigerantType: 'HFC-23', consumption: '', emissions: '' },
//                 { refrigerantType: 'HFC-245fa', consumption: '', emissions: '' },
//             ],
//             processEmissions: [
//                 { type: 'Emission From Waste Gas Disposal', emissions: '' },
//                 { type: 'Emission from Process and Vented Emission', emissions: '' },
//                 { type: 'Fugitive Emissions', emissions: '' },
//             ],
//         };
//     }

//     async fetchScope2Data(reportId) {
//         // Simulate API call for Scope 2 data
//         return {
//             electricity: { consumption: '', emissions: '' },
//             chilledWater: { consumption: '', emissions: '' },
//             heat: { consumption: '', emissions: '' },
//             purchasedDesalinatedWater: { consumption: '', emissions: '' },
//         };
//     }

//     async fetchScope3Data(reportId) {
//         // Simulate API call for Scope 3 data
//         return {
//             wasteGenerated: [
//                 { category: 'Metals', consumption: '', emissions: '' },
//                 { category: 'Glass', consumption: '', emissions: '' },
//                 // Add more categories as needed
//             ],
//             businessTravel: [
//                 { travelClass: 'First Class', trips: '', emissions: '' },
//                 { travelClass: 'Business Class', trips: '', emissions: '' },
//             ],
//             purchasedGoods: { expense: '', emissions: '' },
//             capitalGoods: { expense: '', emissions: '' },
//             investments: { emissions: '' },
//             employeeCommuting: [
//                 { vehicleType: 'Car', trips: '', emissions: '' },
//                 { vehicleType: 'Motor Cycle', trips: '', emissions: '' },
//             ],
//             fuelRelatedActivities: [
//                 { category: 'Upstream emissions of fuels purchased for own use', emissions: '' },
//                 // Add more categories as needed
//             ],
//             upstreamLeasedAssets: [
//                 { assetType: 'Building', emissions: '' },
//                 { assetType: 'Vehicle', emissions: '' },
//             ],
//             downstreamLeasedAssets: { totalArea: '', emissions: '' },
//         };
//     }

//     prepareCompanyInfoCSV(data) {
//         return Papa.unparse([
//             ['Company Name', data.companyName],
//             ['Country', data.country],
//             ['Sector', data.sector],
//             ['Industry', data.industry],
//             ['First Reporting Year', data.firstReportingYear],
//             ['Baseline Year', data.baselineYear],
//             ['Employee Count', data.employeeCount],
//         ]);
//     }

//     prepareScope1CSV(data) {
//         const fuelConsumption = Papa.unparse([
//             ['Fuel Type', 'Consumption (Unit)', 'Emissions (tCO2e)'],
//             ...data.fuelConsumption.map((item) => [item.fuelType, item.consumption, item.emissions]),
//             ['Total', '', ''],
//         ]);
//         const refrigerantConsumption = Papa.unparse([
//             ['Refrigerant Type', 'Consumption (Kg)', 'Emissions (tCO2e)'],
//             ...data.refrigerantConsumption.map((item) => [item.refrigerantType, item.consumption, item.emissions]),
//             ['Total', '', ''],
//         ]);
//         const processEmissions = Papa.unparse([
//             ['Type', '', 'Emissions (tCO2e)'],
//             ...data.processEmissions.map((item) => [item.type, '', item.emissions]),
//             ['Total', '', ''],
//         ]);
//         return [fuelConsumption, refrigerantConsumption, processEmissions].join('\n\n');
//     }

//     prepareScope2CSV(data) {
//         return Papa.unparse([
//             ['Scope 2 KPIs', 'Consumption', 'Emissions (tCO2e)'],
//             ['Electricity', data.electricity.consumption, data.electricity.emissions],
//             ['Chilled Water', data.chilledWater.consumption, data.chilledWater.emissions],
//             ['Heat', data.heat.consumption, data.heat.emissions],
//             ['Purchased Desalinated Water', data.purchasedDesalinatedWater.consumption, data.purchasedDesalinatedWater.emissions],
//             ['Total', '', ''],
//         ]);
//     }

//     prepareScope3CSV(data) {
//         const wasteGenerated = Papa.unparse([
//             ['Waste Categories', 'Consumption (Ton)', 'Emissions (tCO2e)'],
//             ...data.wasteGenerated.map((item) => [item.category, item.consumption, item.emissions]),
//             ['Total', '', ''],
//         ]);
//         const businessTravel = Papa.unparse([
//             ['Travel Class', 'Number of Trips', 'Emissions (tCO2e)'],
//             ...data.businessTravel.map((item) => [item.travelClass, item.trips, item.emissions]),
//             ['Total', '', ''],
//         ]);
//         return [wasteGenerated, '', businessTravel].join('\n\n');
//     }
// }


// export { GHGCSVReportGenerator };



import Papa from 'papaparse';
import axios from 'axios';
import { saveAs } from 'file-saver';
import api from "../../../api";

import * as XLSX from 'xlsx';
import ExcelJS from 'exceljs';


async function fetchOnboardingData() {
    try {
        const response = await api.get('https://backend.ghg.ge3s.org/api/user/onboard-data');
        return response.data;
    } catch (error) {
        console.error('Error fetching company info:', error);
        throw error;
    }
}

async function fetchScope1Data(reportId) {
    try {
        const response = await axios.post('https://backend.ghg.ge3s.org/api/report/scope1_categorized_emissions', { reportId });
        return response.data;
    } catch (error) {
        console.error('Error fetching Scope 1 data:', error);
        throw error;
    }
}

async function fetchScope2Data(reportId) {
    try {
        const response = await axios.post('https://backend.ghg.ge3s.org/api/report/scope2_totals_emissions', { reportId });
        return response.data;
    } catch (error) {
        console.error('Error fetching Scope 2 data:', error);
        throw error;
    }
}

async function fetchScope3Data(reportId) {
    try {
        const response = await axios.post('https://backend.ghg.ge3s.org/api/report/scope3_categorized_emissions', { reportId });
        return response.data;
    } catch (error) {
        console.error('Error fetching Scope 3 data:', error);
        throw error;
    }
}

async function fetchPercentData(reportId) {
    try {
        const response = await axios.post('https://backend.ghg.ge3s.org/api/report/fetch_total_emissions', {
            reportId: reportId
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching percent data:', error);
        throw error;
    }
}



class GHGCSVReportGenerator {
    async generateReport(reportId) {
        try {
            const companyInfo = await fetchOnboardingData();
            const scope1Data = await fetchScope1Data(reportId);
            const scope2Data = await fetchScope2Data(reportId);
            const scope3Data = await fetchScope3Data(reportId);
            const percentData = await fetchPercentData(reportId);

            const report_name = percentData.name;

            const workbook = new ExcelJS.Workbook();

            this.createCompanyInfoSheet(workbook, companyInfo, percentData);
            this.createScope1Sheet(workbook, scope1Data);
           // this.createScope2Sheet(workbook, scope2Data);
           // this.createScope3Sheet(workbook, scope3Data);

           // Include Scope 2 data if the plan is 'CarbonZero' or 'OffSet'
         if (companyInfo?.organization?.premiumPlan?.name === 'CarbonZero' || companyInfo?.organization?.premiumPlan?.name === 'OffSet') {
            this.createScope2Sheet(workbook, scope2Data);
        }

        // Include Scope 3 data only if the plan is 'CarbonZero'
        if (companyInfo?.organization?.premiumPlan?.name === 'CarbonZero') {
            this.createScope3Sheet(workbook, scope3Data);
        }

            const buffer = await workbook.xlsx.writeBuffer();
            const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

            saveAs(blob, `${report_name}.xlsx`);
        } catch (error) {
            console.error('Error generating Excel report:', error);
            throw error;
        }
    }


    createCompanyInfoSheet(workbook, companyInfo, percentData) {
        const sheet = workbook.addWorksheet('Company Info');

        const periodText = percentData.time_period === "Yearly" 
        ? `${percentData.time_period}, ${percentData.year}` 
        : `${percentData.time_period} ${percentData.periodicity}, ${percentData.year}`;

        const rows = [
            [''],
            ['Company Name', companyInfo.organization.name],
            ['Country', companyInfo.organization.country],
            ['Sector', companyInfo.organization.sector.name],
            ['Industry', companyInfo.organization.industry.name],
            ['First Reporting Year', companyInfo.organization.startingyear],
            ['Baseline Year', companyInfo.organization.baselineyear],
            ['Employee Count', companyInfo.organization.employeecount],
            ['Reporting Timeline', periodText]
        ];

        rows.forEach((row, index) => {
            const rowObj = sheet.addRow(row);
            if (index > 0) {
                const cell = rowObj.getCell(1); // Get the first cell of the row
                cell.font = { bold: true };
                cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFF00' } }; // Yellow background
                rowObj.eachCell({ includeEmpty: true }, (cell) => {
                    // Apply border to each cell in the row
                    cell.border = {
                        top: { style: 'thin' },
                        left: { style: 'thin' },
                        bottom: { style: 'thin' },
                        right: { style: 'thin' },
                    };
                });
            }
        });

        // Adjust column widths for better visibility
        sheet.columns.forEach((column) => {
            column.width = 25;
        });
    }


    createScope1Sheet(workbook, scope1Data) {
        const sheet = workbook.addWorksheet('Scope 1');

        // Prepare data for different sections
        const fuelData = [
            ['Fuel Consumption', 'Fuel Type', 'Consumption', 'Emissions (tCO2e)'],
            ...scope1Data.fuelEmissions.map(fe => [null, fe.fuelType, `${fe.quantity} ${fe.unit}`, fe.emissions]),
            [null, '', 'Total', scope1Data.fuelEmissions.reduce((total, fe) => total + fe.emissions, 0)],
        ];

        const refrigerantData = [
            ['Refrigerant Consumption', 'Refrigerant Type', 'Consumption (Kg)', 'Emissions (tCO2e)'],
            ...scope1Data.refrigerantEmissions.map(re => [null, re.refrigerantType, re.quantity, re.emissions]),
            [null, '', 'Total', scope1Data.refrigerantEmissions.reduce((total, re) => total + re.emissions, 0)],
        ];

        const processData = [
            ['Process Emissions', 'Type', '', 'Emissions (tCO2e)'],
            ...scope1Data.processEmissions.map(pe => [null, pe.processType, pe.quantity, pe.emissions]),
            [null, '', 'Total', scope1Data.processEmissions.reduce((total, pe) => total + pe.emissions, 0)],
        ];

        const grandTotal = [
            ['', '', 'Total Scope 1 Emission', (
                scope1Data.fuelEmissions.reduce((total, fe) => total + fe.emissions, 0) +
                scope1Data.refrigerantEmissions.reduce((total, re) => total + re.emissions, 0) +
                scope1Data.processEmissions.reduce((total, pe) => total + pe.emissions, 0)
            )],
        ];

        // Combine all sections into one array
        const data = [
            ...fuelData,
            [],
            ...refrigerantData,
            [],
            ...processData,
            [],
            ...grandTotal,
        ];

        // Add data to the sheet
        data.forEach((row, rowIndex) => {
            const rowObj = sheet.addRow(row);

            // Styling the section headers
            if (
                rowIndex === 0 ||
                rowIndex === fuelData.length + 1 ||
                rowIndex === fuelData.length + refrigerantData.length + 2
            ) {
                rowObj.eachCell((cell, colNumber) => {
                    if (colNumber > 1) {
                        cell.font = { bold: true };
                        cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFF00' } };
                    }
                });

                rowObj.getCell(1).value = row[0]; // Section title
                rowObj.getCell(1).font = { bold: true };
                rowObj.getCell(1).alignment = { vertical: 'middle', horizontal: 'center' };
                rowObj.getCell(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFF00' } };
            }

            // Styling totals and grand totals
            if (row.includes('Total')) {
                rowObj.eachCell((cell) => {
                    cell.font = { bold: true };
                });
            }

            if (row.includes('Total Scope 1 Emission')) {
                rowObj.eachCell((cell) => {
                    if (cell.value === 'Total Scope 1 Emission') {
                        cell.font = { bold: true };
                        cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFF00' } };
                    }
                });
            }


            // Adding borders to all cells
            rowObj.eachCell((cell) => {
                cell.border = {
                    top: { style: 'thin' },
                    left: { style: 'thin' },
                    bottom: { style: 'thin' },
                    right: { style: 'thin' },
                };
            });
        });


        // Adjust column widths for better readability
        sheet.columns.forEach((column) => {
            column.width = 20;
        });
    }


    // 
    createScope2Sheet(workbook, scope2Data) {
        const sheet = workbook.addWorksheet('Scope 2');

        // Calculate totals for each category
        const electricityTotal = scope2Data.electricityConsumption.reduce((total, item) => total + item.emissions, 0);
        const chilledWaterTotal = scope2Data.chilledWaterConsumption.reduce((total, item) => total + item.emissions, 0);
        const heatTotal = scope2Data.heatConsumption.reduce((total, item) => total + item.emissions, 0);
        const desalinatedWaterTotal = scope2Data.purchasedDesalinatedWaterConsumption.reduce((total, item) => total + item.emissions, 0);

        const grandTotal = electricityTotal + chilledWaterTotal + heatTotal + desalinatedWaterTotal;

        // Prepare the data structure
        const data = [
            ['Electricity', 'Consumption (KWh)', 'Emissions (tCO2e)'],
            ...scope2Data.electricityConsumption.map(item => [null, item.quantity, item.emissions]),
            [],
            ['Chilled Water', 'Consumption (ton-hour)', 'Emissions (tCO2e)'],
            ...scope2Data.chilledWaterConsumption.map(item => [null, item.quantity, item.emissions]),
            [],
            ['Heat', 'Consumption (MMBtu)', 'Emissions (tCO2e)'],
            ...scope2Data.heatConsumption.map(item => [null, item.quantity, item.emissions]),
            [],
            ['Purchased Desalinated Water', 'Consumption (m3)', 'Emissions (tCO2e)'],
            ...scope2Data.purchasedDesalinatedWaterConsumption.map(item => [null, item.quantity, item.emissions]),
            [],
            ['', 'Total Scope 2 Emission', grandTotal],
        ];

        let sectionRowIndex = 0;
        data.forEach((row, rowIndex) => {
            const rowObj = sheet.addRow(row);

            // Position and style section headers
            if (
                rowIndex === sectionRowIndex ||
                rowIndex === sectionRowIndex + scope2Data.electricityConsumption.length + 2 ||
                rowIndex === sectionRowIndex + scope2Data.electricityConsumption.length + scope2Data.chilledWaterConsumption.length + 4 ||
                rowIndex === sectionRowIndex + scope2Data.electricityConsumption.length + scope2Data.chilledWaterConsumption.length + scope2Data.heatConsumption.length + 6
            ) {
                rowObj.eachCell((cell, colNumber) => {
                    if (colNumber > 1) {
                        cell.font = { bold: true };
                        cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFF00' } };
                    }
                });

                rowObj.getCell(1).value = row[0]; // Section title
                rowObj.getCell(1).font = { bold: true };
                rowObj.getCell(1).alignment = { vertical: 'middle', horizontal: 'center' };
                rowObj.getCell(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFF00' } };
            }

            // Styling totals and grand totals
            if (row.includes('Total Scope 2 Emission')) {
                rowObj.eachCell((cell) => {
                    cell.font = { bold: true };
                });
            }


            // Adding borders to all cells
            rowObj.eachCell((cell) => {
                cell.border = {
                    top: { style: 'thin' },
                    left: { style: 'thin' },
                    bottom: { style: 'thin' },
                    right: { style: 'thin' },
                };
            });
        });

        // Adjust column widths for better readability
        sheet.columns.forEach((column) => {
            column.width = 20;
        });
    }



    createScope3Sheet(workbook, scope3Data) {
        const sheet = workbook.addWorksheet('Scope 3');

        const calculateTotal = (data, field) => data.reduce((sum, item) => sum + item[field], 0);


        const data = [
            ['Waste Generated', 'Waste Categories', 'Consumption (Ton)', 'Emissions (tCO2e)'],
            ...scope3Data.wasteData.map(item => ['', item.category, item.quantity, item.emissions]),
            ['', '', 'Total', calculateTotal(scope3Data.wasteData, 'emissions')],
            [],
            ['Business Travel', 'Travel Class', 'Number of Trips', 'Emissions (tCO2e)'],
            ...scope3Data.businessTravelData.map(item => ['', item.travelClass, item.num_trips, item.emissions]),
            ['', '', 'Total', calculateTotal(scope3Data.businessTravelData, 'emissions')],
            [],
            ['Purchased Goods', '', 'Total Expense (USD)', 'Emissions (tCO2e)'],
            ['', '', scope3Data.purchasedGoodsData[0]?.expenseValue || 0, scope3Data.purchasedGoodsData[0]?.emissions || 0],
            [],
            ['Capital Goods', '', 'Total Expense (USD)', 'Emissions (tCO2e)'],
            ['', '', scope3Data.capitalGoodsData[0]?.expenseValue || 0, scope3Data.capitalGoodsData[0]?.emissions || 0],
            [],
            ['Investments', '', '', 'Emissions (tCO2e)'],
            ['', '', '', scope3Data.investmentsData?.[0]?.emissions || 0],
            [],
            ['Employee Commuting', 'Vehicle Type', 'Number of Trips', 'Emissions (tCO2e)'],
            ...scope3Data.employeeCommutingData.map(item => ['', item.vehicleType, item.num_trips, item.emissions]),
            ['', '', 'Total', calculateTotal(scope3Data.employeeCommutingData, 'emissions')],
            [],
            ['Fuel Related Activities', 'Category', '', 'Emissions (tCO2e)'],
            ...scope3Data.fuelRelatedData.map(item => ['', item.category, '', item.emissions]),
            ['', '', 'Total', calculateTotal(scope3Data.fuelRelatedData, 'emissions')],
            [],
            ['Upstream Leased Assets', 'Asset Type', '', 'Emissions (tCO2e)'],
            ...scope3Data.upstreamLeasedAssetsData.map(item => ['', item.assetType, '', item.emissions]),
            ['', '', 'Total', calculateTotal(scope3Data.upstreamLeasedAssetsData, 'emissions')],
            [],
            ['Downstream Leased Assets', 'Physical area of the leased asset', 'Total area', 'Emissions (tCO2e)'],
            ['', Number(scope3Data.downstreamLeasedAssetsData[0]?.physicalArea || 0), scope3Data.downstreamLeasedAssetsData[0]?.total_physical_area || 0, scope3Data.downstreamLeasedAssetsData[0]?.emissions || 0],
            [],
            ['', '', 'Total Scope 3 Emission', calculateTotal(scope3Data.wasteData, 'emissions') +
                calculateTotal(scope3Data.businessTravelData, 'emissions') +
                (scope3Data.purchasedGoodsData[0]?.emissions || 0) +
                (scope3Data.capitalGoodsData[0]?.emissions || 0) +
                (scope3Data.investmentsData[0]?.emissions || 0) +
                calculateTotal(scope3Data.employeeCommutingData, 'emissions') +
                calculateTotal(scope3Data.fuelRelatedData, 'emissions') +
                calculateTotal(scope3Data.upstreamLeasedAssetsData, 'emissions') +
                (scope3Data.downstreamLeasedAssetsData[0]?.emissions || 0)]
        ];

        // Add data to the sheet
        data.forEach((row, rowIndex) => {
            const rowObj = sheet.addRow(row);

            scope3Data.purchasedGoodsData.length = 1
            scope3Data.capitalGoodsData.length = 1
            scope3Data.investmentsData.length = 1


            // Styling the section headers
            if (
                rowIndex === 0 ||
                rowIndex === (scope3Data.wasteData.length + 3) ||
                rowIndex === (scope3Data.wasteData.length + scope3Data.businessTravelData.length + 6) ||
                rowIndex === (scope3Data.wasteData.length + scope3Data.businessTravelData.length + scope3Data.purchasedGoodsData.length + 8) ||
                rowIndex === (scope3Data.wasteData.length + scope3Data.businessTravelData.length + scope3Data.purchasedGoodsData.length + scope3Data.capitalGoodsData.length + 10) ||
                rowIndex === (scope3Data.wasteData.length + scope3Data.businessTravelData.length + scope3Data.purchasedGoodsData.length + scope3Data.capitalGoodsData.length + scope3Data.investmentsData.length + 12) ||
                rowIndex === (scope3Data.wasteData.length + scope3Data.businessTravelData.length + scope3Data.purchasedGoodsData.length + scope3Data.capitalGoodsData.length + scope3Data.investmentsData.length + scope3Data.employeeCommutingData.length + 15) ||
                rowIndex === (scope3Data.wasteData.length + scope3Data.businessTravelData.length + scope3Data.purchasedGoodsData.length + scope3Data.capitalGoodsData.length + scope3Data.investmentsData.length + scope3Data.employeeCommutingData.length + scope3Data.fuelRelatedData.length + 18) ||
                rowIndex === (scope3Data.wasteData.length + scope3Data.businessTravelData.length + scope3Data.purchasedGoodsData.length + scope3Data.capitalGoodsData.length + scope3Data.investmentsData.length + scope3Data.employeeCommutingData.length + scope3Data.fuelRelatedData.length + scope3Data.upstreamLeasedAssetsData.length + 21)
            ) {
                rowObj.eachCell((cell, colNumber) => {
                    if (colNumber > 1) {
                        cell.font = { bold: true };
                        cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFF00' } };
                    }
                });
                rowObj.getCell(1).value = row[0]; // Section title
                rowObj.getCell(1).font = { bold: true };
                rowObj.getCell(1).alignment = { vertical: 'middle', horizontal: 'center' };
                rowObj.getCell(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFF00' } };
            }

            // Styling totals and grand totals
            if (row.includes('Total' || 'Total Scope 3 Emission')) {
                rowObj.eachCell((cell) => {
                    cell.font = { bold: true };
                });
            }

            if (row.includes('Total Scope 3 Emission')) {
                rowObj.eachCell((cell) => {
                    if (cell.value === 'Total Scope 3 Emission') {
                        cell.font = { bold: true };
                        cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFF00' } };
                    }
                });
            }

            // Adding borders to all cells
            rowObj.eachCell((cell) => {
                cell.border = {
                    top: { style: 'thin' },
                    left: { style: 'thin' },
                    bottom: { style: 'thin' },
                    right: { style: 'thin' },
                };
            });
        });

        // Adjust column widths for better readability
        sheet.columns.forEach((column) => {
            column.width = 20;
        });
    }

}



export { GHGCSVReportGenerator };
