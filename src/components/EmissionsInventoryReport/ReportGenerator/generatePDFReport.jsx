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
            format: 'a4'
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
    async generateReport(apiData) {
        this.initializeDocument();

        this.addExecutiveSummaryPage(apiData);

        this.addScope1AnalysisOne(apiData);

        this.addScope1AnalysisTwo(apiData);

        this.addScope1AnalysisThree(apiData);

        this.addScope2AnalysisOne(apiData);

        this.addScope2AnalysisTwo(apiData);

        this.addScope3AnalysisOne(apiData);

        this.addScope3AnalysisTwo(apiData);

        this.addScope3AnalysisThree(apiData);

        this.addScope3AnalysisFour(apiData);

        this.addScope3AnalysisFive(apiData);

        this.addScope3AnalysisSix(apiData);

        this.addConclusionPage();

        return this.pdf;
    }

    // Executive Summary Page
    addExecutiveSummaryPage(apiData) {

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

        const wrappedText = this.pdf.splitTextToSize(
             `This section provides a comprehensive breakdown of [Company Name]'s greenhouse gas emissions for the reporting period [Reporting Period]. Emissions are categorized into three scopes:`,
            maxWidth
        );
        
        this.pdf.text(wrappedText, this.margins.left, finalY + 40);

        this.pdf.text('Total GHG Emissions Distribution',
            this.margins.left,
            this.margins.top + 190
        );
        this.pdf.addImage(
            lineChart,
            'PNG',
            this.margins.left,
            this.margins.top + 200,
            this.pageWidth - 80,
            16
        );

        autoTable(this.pdf, {
            startY: this.margins.top + 120,
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
            head: [['Scope', 'KPIs', 'Emissions']],  // Table header row
            body: [
                ['Scope 2', 'Electricity Consumption', '24546 tCO2'],
                ['', 'Chilled Water Consumption', '24546 tCO2'],
                ['', 'Purchased Desalinated Water', '24546 tCO2'],
                ['', 'Heat Consumption', '24546 tCO2']
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

        this.pdf.setFontSize(12);
        this.pdf.setTextColor(0);

        const summarySectionText = [
            'This comprehensive Greenhouse Gas (GHG) Emissions Report provides a detailed analysis of our organization\'s carbon footprint across various operational scopes. The report meticulously tracks and evaluates emissions from different aspects of our business operations.',
            'By presenting a transparent and thorough examination of our environmental impact, we aim to demonstrate our commitment to sustainability and continuous improvement in reducing our carbon footprint.'
        ];

        // Render second page text with wrapping
        let currentY = startY;
        summarySectionText.forEach((paragraph, paragraphIndex) => {
            const splitText = this.pdf.splitTextToSize(paragraph, maxWidth);
            splitText.forEach((line, lineIndex) => {
                this.pdf.text(
                    line,
                    this.margins.left,
                    currentY + (paragraphIndex * lineHeight) + (lineIndex * lineHeight)
                );
            });
            // Update Y position after each paragraph
            currentY += splitText.length * lineHeight + lineHeight;
        });


        this.addFooter();
        this.pdf.addPage();
    }
    // Emissions Breakdown Pages
    addScope1AnalysisOne(apiData) {
        this.pageNumber = 8;
        this.addBg(rightBg)
        this.addHeader('Fuel Consumption');
        this.pdf.setFontSize(10);
        this.pdf.setTextColor("#000");
        this.pdf.text(
            "Emission from Fuel Consumption for [Reporting Period]: [Emission]",
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
            head: [["Fuel Type", "Consumption", "Emissions"]],  // Table header row
            body: [
                ["Diesel", "12323 tonnes", "24546 tCO2"],
                ["Gasoline/Petrol", "12323 tonnes", "24546 tCO2"],
                ["HFO", "12323 tonnes", "24546 tCO2"],
                ["LPG", "12323 tonnes", "24546 tCO2"],
                ["CNG", "12323 tonnes", "24546 tCO2"],
                ["Total", "12323 tonnes", "24546 tCO2"],
            ],
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

    addScope1AnalysisTwo(apiData) {
        this.pageNumber = 9;
        this.addBg(leftBg)
        this.addHeader('Refrigerant Consumption');
        this.pdf.setFontSize(10);
        this.pdf.setTextColor("#000");
        this.pdf.text(
            "Emission from Refrigerant Consumption for [Reporting Period]: [Emission] ",
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
            head: [["Refrigerant Type", "Consumption", "Emissions"]],  // Table header row
            body: [
                ["R410a", "12323 tonnes", "24546 tCO2"],
                ["R22", "12323 tonnes", "24546 tCO2"],
                ["R134a", "12323 tonnes", "24546 tCO2"],
                ["HFC-23", "12323 tonnes", "24546 tCO2"],
                ["HFC-245fa", "12323 tonnes", "24546 tCO2"],
                ["Total", "12323 tonnes", "24546 tCO2"],
            ],
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

    addScope1AnalysisThree(apiData) {
        this.pageNumber = 10;
        this.addBg(rightBg)
        this.addHeader('Process Emissions');
        this.pdf.setFontSize(10);
        this.pdf.setTextColor("#000");
        this.pdf.text(
            "Total Process Emissions for the [Reporting Period]: [total Process Emissions] ",
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
            head: [["Type", "Consumption", "Emissions"]],  // Table header row
            body: [
                ["Waste Gas Disposal", "12323 tonnes", "24546 tCO2"],
                ["Process and Vented", "12323 tonnes", "24546 tCO2"],
                ["Fugitive ", "12323 tonnes", "24546 tCO2"],
                ["Total", "12323 tonnes", "24546 tCO2"],
            ],
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

    // Scope Analysis Pages
    addScope2AnalysisOne(apiData) {
        this.pageNumber = 11;
        this.addBg(leftBg)
        this.addHeader('Electricity Consumption');
        this.pdf.setFontSize(10);
        this.pdf.setTextColor("#000");
        this.pdf.text(
            "Emission from Electricity Consumption for [Reporting Period]: [Emission] ",
            this.margins.left,
            this.margins.top + 100
        );
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
            head: [["Consumption", "Emissions"]],  // Table header row
            body: [
                ["12323 tonnes", "24546 tCO2"],
            ],
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
            "Emission from Chilled Consumption for [Reporting Period]: [Emission] ",
            this.margins.left,
            finalY + 120
        );
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
            head: [["Consumption", "Emissions"]],  // Table header row
            body: [
                ["12323 tonnes", "24546 tCO2"],
            ],
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

    addScope2AnalysisTwo(apiData) {
        this.pageNumber = 12;
        this.addBg(rightBg)
        this.addHeader('Purchased Desalinated Water');
        this.pdf.setFontSize(10);
        this.pdf.setTextColor("#000");
        this.pdf.text(
            "Emission from Purchased Desalinated Water for [Reporting Period]: [Emission]  ",
            this.margins.left,
            this.margins.top + 100
        );
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
            head: [["Consumption", "Emissions"]],  // Table header row
            body: [
                ["12323 tonnes", "24546 tCO2"],
            ],
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
        this.pdf.text('Heat Consumption',
            this.margins.left,
            finalY + 100
        );
        this.pdf.setFont('helvetica', 'normal');
        this.pdf.setFontSize(10);
        this.pdf.setTextColor("#000");
        this.pdf.text(
            "Emission from Heat Consumption for [Reporting Period]: [Emission]  ",
            this.margins.left,
            finalY + 120
        );
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
            head: [["Consumption", "Emissions"]],  // Table header row
            body: [
                ["12323 tonnes", "24546 tCO2"],
            ],
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

    addScope3AnalysisOne(apiData) {
        this.pageNumber = 13;
        this.addBg(leftBg)
        this.addHeader('Waste Generated');
        this.pdf.setFontSize(10);
        this.pdf.setTextColor("#000");
        this.pdf.text(
            "Emission from Waste Generated for [Reporting Period]: [Emission] ",
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
            head: [["Fuel Type", "Consumption", "Emissions"]],  // Table header row
            body: [
                ["Glass", "12323 tonnes", "24546 tCO2"],
                ["Plastics", "12323 tonnes", "24546 tCO2"],
                ["Paper & cardboards", "12323 tonnes", "24546 tCO2"],
                ["Organic Waste", "12323 tonnes", "24546 tCO2"],
                ["Mixed Waste", "12323 tonnes", "24546 tCO2"],
                ["Textile Waste", "12323 tonnes", "24546 tCO2"],
                ["Electronics", "12323 tonnes", "24546 tCO2"],
                ["Construction & Demolition", "12323 tonnes", "24546 tCO2"],
                ["Total", "12323 tonnes", "24546 tCO2"],
            ],
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

    addScope3AnalysisTwo(apiData) {
        this.pageNumber = 14;
        this.addBg(rightBg)
        this.addHeader('Business Travel');
        this.pdf.setFontSize(10);
        this.pdf.setTextColor("#000");
        this.pdf.text(
            "Emission from Business Travel for [Reporting Period]: [Emission] ",
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
            head: [["Travel Class", "Number of trips", "Emissions"]],  // Table header row
            body: [
                ["First Class", "12323 tonnes", "24546 tCO2"],
                ["Business Class", "12323 tonnes", "24546 tCO2"],
                ["Economy Class", "12323 tonnes", "24546 tCO2"],
                ["Total", "12323 tonnes", "24546 tCO2"],
            ],
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
        this.pdf.text('Purchased Goods',
            this.margins.left,
            finalY + 100
        );
        this.pdf.setFont('helvetica', 'normal');
        this.pdf.setFontSize(10);
        this.pdf.setTextColor("#000");
        this.pdf.text(
            "Emission from Purchase Goods for [Reporting Period]: [Emission] ",
            this.margins.left,
            finalY + 120
        );
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
            head: [["Expense Value", "Emissions"]],  // Table header row
            body: [
                ["12323 tonnes", "24546 tCO2"],
            ],
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

    addScope3AnalysisThree(apiData) {
        this.pageNumber = 15;
        this.addBg(leftBg)
        this.addHeader('Capital Goods');
        this.pdf.setFontSize(10);
        this.pdf.setTextColor("#000");
        this.pdf.text(
            "Emission from Capital Goods for [Reporting Period]: [Emission] ",
            this.margins.left,
            this.margins.top + 100
        );
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
            head: [["Expense Value", , "Emissions"]],  // Table header row
            body: [
                ["12323 tonnes", "24546 tCO2"],
            ],
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
        this.pdf.text('Investments',
            this.margins.left,
            finalY + 100
        );
        this.pdf.setFont('helvetica', 'normal');
        this.pdf.setFontSize(10);
        this.pdf.setTextColor("#000");
        this.pdf.text(
            "Emission from Investments for [Reporting Period]: [Emission]  ",
            this.margins.left,
            finalY + 120
        );
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
            head: [["Ownership Percentage", "Emissions"]],  // Table header row
            body: [
                ["12", "24546 tCO2"],
            ],
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

    addScope3AnalysisFour(apiData) {
        this.pageNumber = 16;
        this.addBg(rightBg)
        this.addHeader('Employee Commuting');
        this.pdf.setFontSize(10);
        this.pdf.setTextColor("#000");
        this.pdf.text(
            "Emission from Employee Commuting for [Reporting Period]: [Emission] ",
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
            head: [["Vehicle Type", "No. of Trips", "Emissions"]],  // Table header row
            body: [
                ["Car", "12323 tonnes", "24546 tCO2"],
                ["Motor Cycle", "12323 tonnes", "24546 tCO2"],
                ["Bus", "12323 tonnes", "24546 tCO2"],
                ["Train", "12323 tonnes", "24546 tCO2"],
                ["Total ", "12323 tonnes", "24546 tCO2"],
            ],
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

    addScope3AnalysisFive(apiData) {
        this.pageNumber = 17;
        this.addBg(leftBg)
        this.addHeader('Fuel Related Activities');
        this.pdf.setFontSize(10);
        this.pdf.setTextColor("#000");
        this.pdf.text(
            "Emission from Fuel Related Activities for [Reporting Period]: [Emission] ",
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
            head: [["Category", "Emissions"]],  // Table header row
            body: [
                ["Upstream emissions of fuels purchased for own use", "24546 tCO2"],
                ["Upstream emissions of purchased electricity for own use", "24546 tCO2"],
                ["Transmission & distribution (T&D) losses of purchased electricity for own use.", "24546 tCO2"],
                ["Generation emissions of purchased electricity that is sold to end users.", "24546 tCO2"],
                ["Total ", "12323 tonnes", "24546 tCO2"],
            ],
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

    addScope3AnalysisSix(apiData) {
        this.pageNumber = 18;
        this.addBg(rightBg)

        this.addHeader('Upstream Leased Assets');
        this.pdf.setFontSize(10);
        this.pdf.setTextColor("#000");
        this.pdf.text(
            "Emission from Upstream Leases Assets for [Reporting Period]: [Emission] ",
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
            head: [["Asset Type", , "Emissions"]],  // Table header row
            body: [
                ["Building", "24546 tCO2"],
                ["Vehicle", "24546 tCO2"],
                ["Equipment", "24546 tCO2"],
                ["Total", "24546 tCO2"],
            ],
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
        this.pdf.text('Downstream Leased Assets',
            this.margins.left,
            finalY + 100
        );
        this.pdf.setFont('helvetica', 'normal');
        this.pdf.setFontSize(10);
        this.pdf.setTextColor("#000");
        this.pdf.text(
            "Emission from Downstream Leased Assets for [Reporting Period]: [Emission]",
            this.margins.left,
            finalY + 120
        );
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
            head: [["Physical Area", "Emissions"]],  // Table header row
            body: [
                ["12", "24546 tCO2"],
            ],
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