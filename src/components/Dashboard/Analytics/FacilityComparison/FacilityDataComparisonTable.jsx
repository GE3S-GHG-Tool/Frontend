import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const FacilityDataComparisonTable = ({ title, data, selectedCompanies, svg }) => {
  const [viewMore, setViewMore] = useState(false);

  const keys = Object.keys(data[0]);
  const displayedData = viewMore ? keys : keys.slice(0, 3);

  return (
    <TableContainer sx={{ width: '100%', position: 'relative', borderRadius: '4px', border: '1px solid rgba(217, 217, 217, 0.40)' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', fontWeight: '600', fontFamily: 'Inter', border: 'none' }}>{svg}{title}</TableCell>
            {selectedCompanies.map((company, index) => (
              company && <TableCell key={index} align="center" sx={{ border: 'none' }}>{ }</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {displayedData.map((key) => (
            <TableRow key={key} sx={{ border: 'none' }}>
              <TableCell sx={{ fontWeight: "500", width: '30%', border: 'none' }}>
                {key}
              </TableCell>
              {data.map((companyData, index) => (
                <TableCell key={index} sx={{ fontWeight: "500", border: 'none' }}>
                  {companyData[key] || 'N/A'}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {keys.length > 3 && (
        <Button onClick={() => setViewMore(!viewMore)} sx={{
          background: 'transparent',
          border: 'none',
          color: 'black',
          fontSize: '0.875rem',
          fontStyle: 'Inter',
          fontWeight: '500',
          textTransform: 'unset',
          position: 'absolute',
          textDecoration: 'underline',
          top: '4px',
          right: '4px',
        }}>
          {viewMore ? 'View Less' : 'View More'}
        </Button>
      )}
    </TableContainer>
  );
};

export default FacilityDataComparisonTable;
