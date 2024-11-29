import React, { useState } from 'react';
import { GHGReportGenerator } from './generatePDFReport';

const DownloadReportButton = () => {
    const [isGenerating, setIsGenerating] = useState(false);

    const handleDownload = async () => {
        setIsGenerating(true);
        try {
            const generator = new GHGReportGenerator();
            const apiData = await generator.fetchAllData();
            const pdf = await generator.generateReport(apiData);
            pdf.save('ghg-report.pdf');
        } catch (error) {
            console.error('Error generating report:', error);
            alert('Failed to generate report. Please try again.');
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <span
            style={{
                textTransform: "none",
                fontSize: "0.875rem",
                padding: "5px 10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "start",
                gap: "0.5rem",
                cursor: "pointer",
            }}
            onClick={handleDownload}
            disabled={isGenerating}
        >
            <span>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="14"
                    viewBox="0 0 24 25"
                    fill="none"
                >
                    <g clipPath="url(#clip0_1214_42964)">
                        <path
                            d="M12 14V3.5"
                            stroke="black"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M20.25 14V20H3.75V14"
                            stroke="black"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M15.75 10.25L12 14L8.25 10.25"
                            stroke="black"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </g>
                    <defs>
                        <clipPath id="clip0_1214_42964">
                            <rect
                                width="24"
                                height="24"
                                fill="white"
                                transform="translate(0 0.5)"
                            />
                        </clipPath>
                    </defs>
                </svg>
            </span>
            <span>{isGenerating ? 'Generating...' : 'Download'}</span>
        </span>
    );
};

export default DownloadReportButton;