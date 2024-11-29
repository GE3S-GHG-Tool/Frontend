import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

class GHGReportGenerator {
    constructor() {
        this.pdf = new jsPDF();
        this.pageNumber = 1;
        this.totalPages = 18;
    }

    // Initialize PDF settings
    initializeDocument() {
        this.pdf.setProperties({
            title: 'Greenhouse Gas (GHG) Report',
            author: 'System Generated',
            creator: 'PDF Generator'
        });
    }

    // Add header to each page
    addHeader(pageTitle = '') {
        this.pdf.setFontSize(22);
        this.pdf.text('Greenhouse Gas (GHG) Report', 20, 20);
        if (pageTitle) {
            this.pdf.setFontSize(18);
            this.pdf.text(pageTitle, 20, 40);
        }
    }

    // Add footer with page numbers
    addFooter() {
        this.pdf.setFontSize(10);
        this.pdf.text(`Page ${this.pageNumber}`, 20, 280);
    }

    // Create emissions distribution bar
    createEmissionsBar(scope1, scope2, scope3) {
        // Position and dimensions for the bar
        const startX = 20;
        const startY = 100;
        const totalWidth = 170;
        
        // Calculate widths based on percentages
        const scope1Width = (totalWidth * scope1) / 100;
        const scope2Width = (totalWidth * scope2) / 100;
        const scope3Width = (totalWidth * scope3) / 100;

        // Draw bars
        this.pdf.setFillColor(0, 100, 50); // Dark green for Scope 1
        this.pdf.rect(startX, startY, scope1Width, 15, 'F');
        
        this.pdf.setFillColor(0, 128, 128); // Teal for Scope 2
        this.pdf.rect(startX + scope1Width, startY, scope2Width, 15, 'F');
        
        this.pdf.setFillColor(255, 127, 80); // Coral for Scope 3
        this.pdf.rect(startX + scope1Width + scope2Width, startY, scope3Width, 15, 'F');
    }

    // Create emissions breakdown table
    async createEmissionsTable(emissionsData) {
        const tableData = [
            ['Scope', 'KPIs', 'Emissions'],
            ['Scope 1', 'Fuel Consumption', emissionsData.fuelConsumption],
            ['', 'Refrigerant Data', emissionsData.refrigerantData],
            ['', 'Process Emission', emissionsData.processEmission]
        ];

        autoTable(this.pdf, {
            startY: 150,
            head: [tableData[0]],
            body: tableData.slice(1),
            theme: 'grid',
            styles: {
                fontSize: 10,
                cellPadding: 5
            },
            headStyles: {
                fillColor: [230, 247, 240],
                textColor: [0, 0, 0]
            },
            columnStyles: {
                0: { cellWidth: 60 },
                1: { cellWidth: 80 },
                2: { cellWidth: 60 }
            }
        });
    }

    // Main method to generate the report
    async generateReport(apiData) {
        this.initializeDocument();
        
        // Page 6 - Emissions Breakdown
        this.addHeader('Greenhouse Gas Emissions Breakdown');
        
        // Add description
        this.pdf.setFontSize(12);
        this.pdf.text('This section provides a breakdown of greenhouse gas emissions for the reporting', 20, 60);
        this.pdf.text('period. Emissions are categorized into three scopes:', 20, 70);

        // Add emissions distribution bar
        this.createEmissionsBar(30, 30, 40);
        
        // Add scope labels
        this.pdf.setFontSize(10);
        this.pdf.text('Scope 1 (30%)\n2324 tCO2e', 20, 130);
        this.pdf.text('Scope 2 (30%)\n232124 tCO2e', 90, 130);
        this.pdf.text('Scope 3 (40%)\n233424 tCO2e', 160, 130);

        // Create emissions table with API data
        await this.createEmissionsTable(apiData.emissionsData);
        
        this.addFooter();
        
        return this.pdf;
    }

    // Method to handle multiple API calls
    async fetchAllData() {
        try {
            const responses = await Promise.all([
                fetch('api1_endpoint'),
                fetch('api2_endpoint'),
                // Add more API calls as needed
            ]);
            
            const data = await Promise.all(responses.map(res => res.json()));
            return this.processAPIData(data);
        } catch (error) {
            console.error('Error fetching API data:', error);
            throw error;
        }
    }

    // Process and format API data
    processAPIData(apiResponses) {
        return {
            emissionsData: {
                fuelConsumption: apiResponses[0].fuelConsumption || '24546 tCO2',
                refrigerantData: apiResponses[0].refrigerantData || '24546 tCO2',
                processEmission: apiResponses[0].processEmission || '24546 tCO2'
            },
            // Add more data processing as needed
        };
    }
}

// Export the class instead of a function
export { GHGReportGenerator };
