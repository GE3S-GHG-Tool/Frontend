// import React, { useState } from 'react';
// import { MultiPageGHGReportGenerator } from './generatePDFReport';

// const DownloadReportButton = ({ reportId }) => {
//     const [isGenerating, setIsGenerating] = useState(false);

//     const handleDownload = async () => {
//         setIsGenerating(true);
//         try {
//             const generator = new MultiPageGHGReportGenerator();
//             const pdf = await generator.generateReport(reportId);
//             pdf.save('ghg-report.pdf');
//         } catch (error) {
//             console.error('Error generating report:', error);
//             alert('Failed to generate report. Please try again.');
//         } finally {
//             setIsGenerating(false);
//         }
//     };

//     return (
//         <span
//             style={{
//                 textTransform: "none",
//                 fontSize: "0.875rem",
//                 padding: "5px 10px",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "start",
//                 gap: "0.5rem",
//                 cursor: "pointer",
//             }}
//             onClick={handleDownload}
//             disabled={isGenerating}
//         >
//             <span>
//                 <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     width="18"
//                     height="14"
//                     viewBox="0 0 24 25"
//                     fill="none"
//                 >
//                     <g clipPath="url(#clip0_1214_42964)">
//                         <path
//                             d="M12 14V3.5"
//                             stroke="black"
//                             strokeWidth="1.5"
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                         />
//                         <path
//                             d="M20.25 14V20H3.75V14"
//                             stroke="black"
//                             strokeWidth="1.5"
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                         />
//                         <path
//                             d="M15.75 10.25L12 14L8.25 10.25"
//                             stroke="black"
//                             strokeWidth="1.5"
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                         />
//                     </g>
//                     <defs>
//                         <clipPath id="clip0_1214_42964">
//                             <rect
//                                 width="24"
//                                 height="24"
//                                 fill="white"
//                                 transform="translate(0 0.5)"
//                             />
//                         </clipPath>
//                     </defs>
//                 </svg>
//             </span>
//             <span>{isGenerating ? 'Downloading...' : 'Download'}</span>
//         </span>
//     );
// };

// export default DownloadReportButton;

import React, { useState } from 'react';
import { MultiPageGHGReportGenerator } from './generatePDFReport';
import { GHGCSVReportGenerator } from './generateCSVReport';

const DownloadReportButton = ({ reportId }) => {
    const [isGenerating, setIsGenerating] = useState(false);
    const [showOptions, setShowOptions] = useState(false);

    const handleDownload = async (format) => {
        setIsGenerating(true);
        try {
            if (format === 'pdf') {
                const pdfGenerator = new MultiPageGHGReportGenerator();
                const {pdf, report_name} = await pdfGenerator.generateReport(reportId);
                pdf.save(`${report_name}.pdf`);
            } else if (format === 'csv') {
                const csvGenerator = new GHGCSVReportGenerator();
                await csvGenerator.generateReport(reportId);
            }
        } catch (error) {
            console.error('Error generating report:', error);
            alert('Failed to generate report. Please try again.');
        } finally {
            setIsGenerating(false);
            setShowOptions(false);
        }
    };

    return (
        <div style={{ position: 'relative', display: 'inline-block' }}>
            {/* Download options on the left */}
            {showOptions && (
                <div
                    style={{
                        position: 'absolute',
                        top: '50%',
                        right: '100%', // Position on the left side
                        transform: 'translateY(-50%)',
                        background: 'white',
                        boxShadow: '0px 4px 6px rgba(0,0,0,0.1)',
                        borderRadius: '4px',
                        padding: '5px 0',
                        fontSize: '0.875rem',
                        cursor: 'pointer',
                        whiteSpace: 'nowrap' // Ensure text stays in one line
                    }}
                    onMouseEnter={() => setShowOptions(true)}
                    onMouseLeave={() => setShowOptions(false)}
                >
                    <div 
                        style={{ 
                            padding: '5px 10px', 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: '0.5rem' 
                        }} 
                        onClick={() => handleDownload('pdf')}
                    >
                        Download PDF
                    </div>
                    <div 
                        style={{ 
                            padding: '5px 10px', 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: '0.5rem' 
                        }} 
                        onClick={() => handleDownload('csv')}
                    >
                        Download CSV
                    </div>
                </div>
            )}

            {/* Download Button */}
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    cursor: 'pointer',
                    fontSize: '0.875rem',
                    padding: '5px 10px',
                }}
                onMouseEnter={() => setShowOptions(true)}
                onMouseLeave={() => setShowOptions(false)}
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
                            <path d="M12 14V3.5" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M20.25 14V20H3.75V14" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M15.75 10.25L12 14L8.25 10.25" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </g>
                        <defs>
                            <clipPath id="clip0_1214_42964">
                                <rect width="24" height="24" fill="white" transform="translate(0 0.5)" />
                            </clipPath>
                        </defs>
                    </svg>
                </span>
                <span>{isGenerating ? 'Downloading...' : 'Download'}</span>
            </div>
        </div>
    );
};

export default DownloadReportButton;