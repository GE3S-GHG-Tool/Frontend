import React from 'react'
import './OrganizationStepper.css'
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Typography from '@mui/material/Typography';
import Wrapper from '../Wrapper/Wrapper';
import Organization from './Organization';
import Details from './Details';
import Goals from './Goals';
import { styled } from '@mui/material/styles';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';

const steps = [
    {
        label: 'Organization',
    },
    {
        label: 'Basic Details',
    },
    {
        label: 'Goals',
    },
];


export default function OrganizationStepper() {

    const [activeStep, setActiveStep] = React.useState(0);

    const stepConnector = styled

    return (
        <div className='topDiv'>
            <Wrapper>
                <div className='stepper'>
                    {activeStep === 0 && <Organization activeStep={activeStep} setActiveStep={setActiveStep} />}
                    {activeStep === 1 && < Details activeStep={activeStep} setActiveStep={setActiveStep} />}
                    {activeStep === 2 && <Goals activeStep={activeStep} setActiveStep={setActiveStep} />}
                    <div className='seperate'></div>
                    <div className='stepper_comp'>
                        <span className={activeStep === 0 ? 'current_step' : 'circle'}>1</span>
                        <p>Organisation</p>
                        <div className='lines'></div>
                        <span className={activeStep === 1 ? 'current_step' : 'circle'}>2</span>
                        <p>Basic Details</p>
                        <div className='lines'></div>
                        <span className={activeStep === 2 ? 'current_step' : 'circle'}>3</span>
                        <p>Goals</p>

                    </div>
                </div>
            </Wrapper>
        </div>
    )
}
