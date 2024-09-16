import React, { useState } from "react";
import { Typography, Box, Button } from "@mui/material";
import OverallSummary from "./SummaryCard/OverallSummary";
import ScopeIntensity from "./ScopeIntensity/ScopeIntensity";
import FacilityComparison from "./FacilityComparison/FacilityComparison";

const mockData = {
  overallAverage: {
    floorAreaIntensity: 3434, // Sq m
    revenueIntensity: 3434, // $
    employeeIntensity: 3434, // Employee count
    productionIntensity: 3434, // Tonnes
  },
  scope1Intensity: {
    floorArea: 3434, // tCO2e/m2
    revenue: 3434, // tCO2e/$
    employee: 3434, // tCO2e/employee
    production: 3434, // tCO2e/tonne
  },
  scope2Intensity: {
    floorArea: 3434, // tCO2e/m2
    revenue: 3434, // tCO2e/$
    employee: 3434, // tCO2e/employee
    production: 3434, // tCO2e/tonne
  }
};


const Analytics = () => {
  const [scopeView, setScopeView] = useState(false);

  const handleView = () => {
    setScopeView((prev) => !prev);
  }
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
      }}
    >
      <Typography
        sx={{
          color: '#000000',
          fontSize: '1.20rem',
          fontWeight: '600',
          fontFamily: 'Inter',
          lineHeight: '150%',
          marginTop: '0.38rem'
        }}
      >
        Overall Average Intensity
      </Typography>

      <Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: 'column',
          }}
        >
          <OverallSummary data={mockData.overallAverage} />
          {scopeView ? (
            <>
              <ScopeIntensity scopeData={mockData.scope1Intensity} scopeName="Scope 1" bgColor="#E6F8F2" />
              <ScopeIntensity scopeData={mockData.scope2Intensity} scopeName="Scope 2" bgColor="#E9EFFF" />
              <div style={{ display: 'block', margin: '10px auto' }}>
                <Button sx={{
                  background: 'transparent',
                  border: 'none',
                  color: '#717171',
                  fontSize: '0.875rem',
                  fontStyle: 'Inter',
                  fontWeight: '500',
                  textTransform: 'unset'
                }} onClick={handleView}>View Less</Button>
              </div>
            </>
          ) : (
            <div style={{ display: 'block', margin: '10px auto' }}>
              <Button sx={{
                background: 'transparent',
                border: 'none',
                color: '#717171',
                fontSize: '0.875rem',
                fontStyle: 'Inter',
                fontWeight: '500',
                textTransform: 'unset',
              }} onClick={handleView}>View Less</Button>
            </div>
          )}
          <div style={{ marginTop: '2rem' }}>
            <FacilityComparison />
          </div>
        </Box>
      </Box>
    </Box>
  )
};

export default Analytics;
