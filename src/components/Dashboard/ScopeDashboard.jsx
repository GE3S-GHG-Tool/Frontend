import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Container,
  CircularProgress,
  Alert,
  styled
} from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import api from '../../api';


const ScopeSection = styled(Paper)(({ theme, isLocked }) => ({
  padding: theme.spacing(3),
  height: '100%',
  backgroundColor: '#232323',
  color: 'white',
  position: 'relative',
  filter: isLocked ? 'blur(4px)' : 'none',
  pointerEvents: isLocked ? 'none' : 'auto',
}));

const LockOverlay = styled(Box)({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  zIndex: 10,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '8px',
  color: 'white',
  textAlign: 'center',
  pointerEvents: 'auto',
});

const ScopeDashboard = () => {
  const [currentPlan, setCurrentPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const AUTH_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzEwYmQ4ZTZhZTRmMTgzZmM4NWU2NzYiLCJ0b2tlbklkIjoiMjIwNzFjMjAtODdmMS00MTg1LWEzNjEtZTg3ZTU0NmUyMDc1IiwiaWF0IjoxNzI5Njg2NjgxLCJleHAiOjE3Mjk3NzMwODF9.IrftXdxzS5SqRKn818RN_XTjlYe-0Swk3IdHJadAn0w';

  useEffect(() => {
    const fetchUserPlan = async () => {
      try {
        const response = await api.get('https://backend.ghg.ge3s.org/api/user/onboard-data');
        setCurrentPlan(response.data.organization?.premiumPlan?.name || 'FootPrint');
      } catch (err) {
        setError('Failed to fetch user plan');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserPlan();
  }, []);

  const isScope2Locked = currentPlan === 'FootPrint';
  const isScope3Locked = currentPlan === 'FootPrint' || currentPlan === 'OffSet';

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ m: 2 }}>
        {error}
      </Alert>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ mb: 4, color: 'white' }}>
        Emissions Dashboard
      </Typography>

      <Grid container spacing={4}>
        {/* Scope 1 Section */}
        <Grid item xs={12}>
          <ScopeSection elevation={3}>
            <Typography variant="h5" gutterBottom sx={{ color: '#4CAF50' }}>
              Scope 1: Direct Emissions
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <Typography variant="subtitle1" gutterBottom>
                  Fuel Consumption
                </Typography>
                <Typography variant="body2" color="grey.400">
                  Total fuel consumption across all facilities: 25,000 liters
                  Primary sources: Vehicle fleet and on-site generators
                </Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography variant="subtitle1" gutterBottom>
                  Process Emissions
                </Typography>
                <Typography variant="body2" color="grey.400">
                  Manufacturing process emissions: 15 tCO2e
                  Chemical processing and industrial waste
                </Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography variant="subtitle1" gutterBottom>
                  Refrigerant Leakage
                </Typography>
                <Typography variant="body2" color="grey.400">
                  HVAC system leakage: 5 tCO2e
                  Maintenance and replacement schedule tracked
                </Typography>
              </Grid>
            </Grid>
          </ScopeSection>
        </Grid>

        {/* Scope 2 Section */}
        <Grid item xs={12}>
          <Box position="relative">
            <ScopeSection elevation={3} isLocked={isScope2Locked}>
              <Typography variant="h5" gutterBottom sx={{ color: '#2196F3' }}>
                Scope 2: Indirect Emissions from Purchased Energy
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1" gutterBottom>
                    Electricity Consumption
                  </Typography>
                  <Typography variant="body2" color="grey.400">
                    Total electricity usage: 500,000 kWh
                    Grid emission factor: 0.5 kgCO2e/kWh
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1" gutterBottom>
                    Purchased Steam
                  </Typography>
                  <Typography variant="body2" color="grey.400">
                    Annual steam consumption: 1,000 MMBtu
                    Source: Local district heating network
                  </Typography>
                </Grid>
              </Grid>
              <Typography variant="h5" gutterBottom sx={{ color: '#2196F3' }}>
                Scope 2: Indirect Emissions from Purchased Energy
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1" gutterBottom>
                    Electricity Consumption
                  </Typography>
                  <Typography variant="body2" color="grey.400">
                    Total electricity usage: 500,000 kWh
                    Grid emission factor: 0.5 kgCO2e/kWh
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1" gutterBottom>
                    Purchased Steam
                  </Typography>
                  <Typography variant="body2" color="grey.400">
                    Annual steam consumption: 1,000 MMBtu
                    Source: Local district heating network
                  </Typography>
                </Grid>
              </Grid>
              <Typography variant="h5" gutterBottom sx={{ color: '#2196F3' }}>
                Scope 2: Indirect Emissions from Purchased Energy
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1" gutterBottom>
                    Electricity Consumption
                  </Typography>
                  <Typography variant="body2" color="grey.400">
                    Total electricity usage: 500,000 kWh
                    Grid emission factor: 0.5 kgCO2e/kWh
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1" gutterBottom>
                    Purchased Steam
                  </Typography>
                  <Typography variant="body2" color="grey.400">
                    Annual steam consumption: 1,000 MMBtu
                    Source: Local district heating network
                  </Typography>
                </Grid>
              </Grid>
              <Typography variant="h5" gutterBottom sx={{ color: '#2196F3' }}>
                Scope 2: Indirect Emissions from Purchased Energy
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1" gutterBottom>
                    Electricity Consumption
                  </Typography>
                  <Typography variant="body2" color="grey.400">
                    Total electricity usage: 500,000 kWh
                    Grid emission factor: 0.5 kgCO2e/kWh
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1" gutterBottom>
                    Purchased Steam
                  </Typography>
                  <Typography variant="body2" color="grey.400">
                    Annual steam consumption: 1,000 MMBtu
                    Source: Local district heating network
                  </Typography>
                </Grid>
              </Grid>
              <Typography variant="h5" gutterBottom sx={{ color: '#2196F3' }}>
                Scope 2: Indirect Emissions from Purchased Energy
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1" gutterBottom>
                    Electricity Consumption
                  </Typography>
                  <Typography variant="body2" color="grey.400">
                    Total electricity usage: 500,000 kWh
                    Grid emission factor: 0.5 kgCO2e/kWh
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1" gutterBottom>
                    Purchased Steam
                  </Typography>
                  <Typography variant="body2" color="grey.400">
                    Annual steam consumption: 1,000 MMBtu
                    Source: Local district heating network
                  </Typography>
                </Grid>
              </Grid>
              <Typography variant="h5" gutterBottom sx={{ color: '#2196F3' }}>
                Scope 2: Indirect Emissions from Purchased Energy
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1" gutterBottom>
                    Electricity Consumption
                  </Typography>
                  <Typography variant="body2" color="grey.400">
                    Total electricity usage: 500,000 kWh
                    Grid emission factor: 0.5 kgCO2e/kWh
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1" gutterBottom>
                    Purchased Steam
                  </Typography>
                  <Typography variant="body2" color="grey.400">
                    Annual steam consumption: 1,000 MMBtu
                    Source: Local district heating network
                  </Typography>
                </Grid>
              </Grid>
              <Typography variant="h5" gutterBottom sx={{ color: '#2196F3' }}>
                Scope 2: Indirect Emissions from Purchased Energy
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1" gutterBottom>
                    Electricity Consumption
                  </Typography>
                  <Typography variant="body2" color="grey.400">
                    Total electricity usage: 500,000 kWh
                    Grid emission factor: 0.5 kgCO2e/kWh
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1" gutterBottom>
                    Purchased Steam
                  </Typography>
                  <Typography variant="body2" color="grey.400">
                    Annual steam consumption: 1,000 MMBtu
                    Source: Local district heating network
                  </Typography>
                </Grid>
              </Grid>
              <Typography variant="h5" gutterBottom sx={{ color: '#2196F3' }}>
                Scope 2: Indirect Emissions from Purchased Energy
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1" gutterBottom>
                    Electricity Consumption
                  </Typography>
                  <Typography variant="body2" color="grey.400">
                    Total electricity usage: 500,000 kWh
                    Grid emission factor: 0.5 kgCO2e/kWh
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1" gutterBottom>
                    Purchased Steam
                  </Typography>
                  <Typography variant="body2" color="grey.400">
                    Annual steam consumption: 1,000 MMBtu
                    Source: Local district heating network
                  </Typography>
                </Grid>
              </Grid>
              <Typography variant="h5" gutterBottom sx={{ color: '#2196F3' }}>
                Scope 2: Indirect Emissions from Purchased Energy
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1" gutterBottom>
                    Electricity Consumption
                  </Typography>
                  <Typography variant="body2" color="grey.400">
                    Total electricity usage: 500,000 kWh
                    Grid emission factor: 0.5 kgCO2e/kWh
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1" gutterBottom>
                    Purchased Steam
                  </Typography>
                  <Typography variant="body2" color="grey.400">
                    Annual steam consumption: 1,000 MMBtu
                    Source: Local district heating network
                  </Typography>
                </Grid>
              </Grid>
            </ScopeSection>
            {isScope2Locked && (
              <LockOverlay>
                <LockIcon sx={{ fontSize: 40 }} />
                <Typography variant="h6">
                  Upgrade to OffSet Plan to unlock Scope 2 insights
                </Typography>
              </LockOverlay>
            )}
          </Box>
        </Grid>

        {/* Scope 3 Section */}
        <Grid item xs={12}>
          <Box position="relative">
            <ScopeSection elevation={3} isLocked={isScope3Locked}>
              <Typography variant="h5" gutterBottom sx={{ color: '#FF9800' }}>
                Scope 3: Other Indirect Emissions
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <Typography variant="subtitle1" gutterBottom>
                    Business Travel
                  </Typography>
                  <Typography variant="body2" color="grey.400">
                    Air travel emissions: 50 tCO2e
                    Ground transportation: 10 tCO2e
                  </Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Typography variant="subtitle1" gutterBottom>
                    Employee Commuting
                  </Typography>
                  <Typography variant="body2" color="grey.400">
                    Average daily commute: 15 km
                    Total annual emissions: 30 tCO2e
                  </Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Typography variant="subtitle1" gutterBottom>
                    Waste Management
                  </Typography>
                  <Typography variant="body2" color="grey.400">
                    Landfill waste: 20 tCO2e
                    Recycling program impact: -5 tCO2e
                  </Typography>
                </Grid>
              </Grid>
            </ScopeSection>
            {isScope3Locked && (
              <LockOverlay>
                <LockIcon sx={{ fontSize: 40 }} />
                <Typography variant="h6">
                  Upgrade to CarbonZero Plan to unlock Scope 3 insights
                </Typography>
              </LockOverlay>
            )}
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ScopeDashboard;