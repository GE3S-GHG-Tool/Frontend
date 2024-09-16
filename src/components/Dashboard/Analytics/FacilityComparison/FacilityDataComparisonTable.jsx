import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const FacilityDataComparisonTable = ({ title, data, selectedCompanies, svg }) => {
  const [viewMore, setViewMore] = useState(false);

  const keys = Object.keys(data[0]);
  const displayedData = viewMore ? keys : keys.slice(0, 3);

  return (
    <TableContainer sx={{ width: '100%', position: 'relative', borderRadius: '4px', border: '1px solid rgba(217, 217, 217, 0.40)', padding: '0.1rem 0.8rem' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', fontWeight: '600', fontFamily: 'Inter', border: 'none', color: 'black' }}>{svg}{title}</TableCell>
            {selectedCompanies.map((company, index) => (
              company && <TableCell key={index} align="center" sx={{ border: 'none' }}>{ }</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {displayedData.map((key) => {
            const formattedKey = key.replace(/([A-Z])/g, (match) => `_${match}`);
            const displayedKey = formattedKey.split('_').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
            return (<TableRow key={key} sx={{ border: 'none' }}>
              <TableCell sx={{ fontWeight: "500", width: '27%', border: 'none' }}>
                {displayedKey || formattedKey}
              </TableCell>
              {data.map((companyData, index) => (
                <TableCell key={index} sx={{ fontWeight: "500", border: 'none', fontSize: '0.8rem' }}>
                  {companyData[key] || 'N/A'}
                </TableCell>
              ))}
            </TableRow>)
          })}
        </TableBody>
      </Table>
      {keys.length > 3 && (
        <Button onClick={() => setViewMore(!viewMore)} sx={{
          background: 'transparent',
          border: 'none',
          color: 'black',
          fontSize: '0.8rem',
          fontStyle: 'Inter',
          fontWeight: '500',
          textTransform: 'unset',
          position: 'absolute',
          top: '4px',
          right: '0.8rem',
        }}>
          {viewMore ? <span style={{ textDecoration: 'underline' }}>View Less</span> : <span style={{ textDecoration: 'underline' }}>View More</span>} &nbsp;
          {viewMore && (<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
            <mask id="mask0_1214_53391" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
              <rect width="24" height="24" fill="#D9D9D9" />
            </mask>
            <g mask="url(#mask0_1214_53391)">
              <path d="M11.5996 8.40078L5.59961 14.4008L6.99961 15.8008L11.5996 11.2008L16.1996 15.8008L17.5996 14.4008L11.5996 8.40078Z" fill="black" />
            </g>
          </svg>
          )}
          {!viewMore && (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
              <mask id="mask0_1214_53791" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                <rect width="24" height="24" transform="matrix(1 0 0 -1 0 24)" fill="#D9D9D9" />
              </mask>
              <g mask="url(#mask0_1214_53791)">
                <path d="M11.6016 15.5992L5.60156 9.59922L7.00156 8.19922L11.6016 12.7992L16.2016 8.19922L17.6016 9.59922L11.6016 15.5992Z" fill="black" />
              </g>
            </svg>
          )}
        </Button>
      )}
    </TableContainer>
  );
};

export default FacilityDataComparisonTable;
