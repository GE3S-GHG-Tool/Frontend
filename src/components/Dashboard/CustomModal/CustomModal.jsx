import React, { useState } from 'react';
import { Dialog, IconButton, Typography, Button } from '@mui/material';
import { Close } from '@mui/icons-material';
import { styled } from '@mui/system';

const ModalBox = styled('div')({
    padding: '4rem',
    display: 'inline-flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'relative',
    gap: '3rem',
    color: 'white',
    borderRadius: '1rem',
    background: 'radial-gradient(132.61% 50% at 50% 50.13%, #2E7B54 0%, #00191D 100%)',
    boxShadow: '0px 1.107px 0px -4.429px #005C31, 0px 2.214px 6.643px 0px rgba(255, 255, 255, 0.25) inset, 0px 4.429px 8.857px -4.429px #005C31, 0px -13.286px 17.714px 0px rgba(255, 255, 255, 0.22) inset, 0px 19.929px 17.714px -8.857px rgba(0, 92, 49, 0.21), 0px 4.429px 13.286px -8.857px rgba(255, 255, 255, 0.24) inset',

});


const StyledButton = styled(Button)({
    backgroundColor: '#00A57C',
    color: '#FFFFFF',
    padding: '0.5rem 1.4rem',
    display: 'flex',
    height: '2.8rem',
    borderRadius: '1.3rem',
    border: '0.554px solid #fff',
    background: 'radial-gradient(132.61% 50% at 50% 50.13%, #2E7B54 0%, #00191D 100%)',
    boxShadow: '0px 1.107px 0px -4.429px #005C31, 0px 2.214px 6.643px 0px rgba(255, 255, 255, 0.25) inset, 0px 4.429px 8.857px -4.429px #005C31, 0px -13.286px 17.714px 0px rgba(255, 255, 255, 0.22) inset, 0px 19.929px 17.714px -8.857px rgba(0, 92, 49, 0.21), 0px 4.429px 13.286px -8.857px rgba(255, 255, 255, 0.24) inset',
    width: '100%',
    '&:hover': {
        backgroundColor: '#008B68',
    },
});

const CloseButton = styled(IconButton)({
    position: 'absolute',
    right: '10px',
    top: '10px',
    color: '#FFFFFF',
});

const CustomModal = ({ open, onClose, title, description, onAction, planContains, price, type }) => {

    const [planCount, setPlanCount] = useState(1);
    const [getStarted, setGetStarted] = useState(false);

    const totalAmount = price * planCount;

    const handleGetStarted = () => setGetStarted(prev => !prev);
    const handleIncrement = () => setPlanCount(prevCount => prevCount + 1);
    const handleDecrement = () => setPlanCount(prevCount => (prevCount > 1 ? prevCount - 1 : 1));

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="lg"
            PaperProps={{
                style: {
                    backgroundColor: 'transparent',
                    boxShadow: 'none',
                    overflow: 'hidden',
                },
            }}
            BackdropProps={{
                style: { background: 'rgba(194, 194, 194, 0.50)', backdropFilter: 'blur(14px)' },
            }}
        >
            <ModalBox>
                <CloseButton onClick={onClose}>
                    <Close />
                </CloseButton>
                <p style={{
                    color: '#FFF',
                    textAlign: 'center',
                    fontSize: '1.4rem',
                    fontWeight: 400,
                    padding: '0',
                    margin: '0'
                }}>
                    {title}
                </p>
                <div style={{
                    display: "flex", padding: '1rem 1.5rem', flexDirection: "column", alignItems: "flex-start", gap: '2rem', borderRadius: '1rem',
                    border: '1px solid rgba(255, 255, 255, 0.40)', background: 'rgba(27, 26, 29, 0.40)'
                }}>
                    <div>
                        <p style={{ margin: '0px 0px 16px 0px', padding:'0px' }}>
                            {description}
                        </p>
                        <div style={{ display: 'flex', alignItems: 'end' }}>
                            <p style={{ fontSize: '3rem', fontWeight: '600', padding: '0', margin: '0' }}>${price}</p>
                            <p style={{ fontSize: '0.9rem', fontWeight: '400' }}> / per {type}</p>
                        </div>
                    </div>

                    {getStarted && (
                        <div style={{
                            display: 'flex', width: '18.88rem', padding: '20px 0', flexDirection: 'column', alignItems: "center", gap: '12px', borderRadius: '16px', border: '1px solid #fff',
                        }}>
                            <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: "0px 20px", fontSize:'14px'  }}>
                                <div>
                                    Total {type}
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', border: '1px solid rgba(217, 217, 217, 0.40)', borderRadius: '4px', }}>
                                    <button onClick={handleDecrement} style={{ background: 'transparent', outline: 'none', border: 'none', color: '#fff', fontSize: '16px', padding: 'none', verticalAlign: 'center' }}>-</button>
                                    <Typography>{planCount}</Typography>
                                    <button onClick={handleIncrement} style={{ background: 'transparent', outline: 'none', border: 'none', color: '#fff', fontSize: '16px', padding: 'none', verticalAlign: 'center' }}>+</button>
                                </div>
                            </div>
                            <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: "0px 20px", fontSize:'14px' }}>
                                <div>
                                    Total Amount
                                </div>
                                <div style={{fontSize:'1.2rem' }}>
                                    ${totalAmount}
                                </div>
                            </div>
                        </div>
                    )}

                    {!getStarted ? <>
                        <StyledButton onClick={handleGetStarted}>
                            Get Started
                        </StyledButton>
                        <div style={{
                            height: '2px',
                            alignSelf: 'stretch',
                            strokeWidth: '1px',
                            stroke: 'rgba(217, 217, 217, 0.40)',
                        }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="303" height="2" viewBox="0 0 303 2" fill="none">
                                <path d="M302.5 1H0.499993" stroke="#D9D9D9" stroke-opacity="0.4" />
                            </svg>
                        </div>
                    </> :
                        <StyledButton
                            // onClick={onAction}
                            onClick={handleGetStarted}
                        >
                            Pay Now
                        </StyledButton>
                    }

                    {
                        !getStarted &&
                        <div>
                            <Typography variant="body1" style={{ marginBottom: '12px' }}>
                                Unlock
                            </Typography>
                            <p style={{ padding: 0, margin: "0", textAlign: "center", alignItems: "center", display: "flex", gap: "8px" }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 23 23" fill="none">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M11.5781 19.3866C16.1668 19.3866 19.8866 15.6668 19.8866 11.0781C19.8866 6.4894 16.1668 2.76953 11.5781 2.76953C6.9894 2.76953 3.26953 6.4894 3.26953 11.0781C3.26953 15.6668 6.9894 19.3866 11.5781 19.3866ZM11.3641 14.4386L15.98 8.89955L14.5616 7.71755L10.5929 12.48L8.53816 10.4253L7.2326 11.7309L10.0021 14.5004L10.7169 15.2152L11.3641 14.4386Z" fill="url(#paint0_linear_1728_20142)" />
                                    <defs>
                                        <linearGradient id="paint0_linear_1728_20142" x1="3.26953" y1="2.76953" x2="22.5085" y2="6.76642" gradientUnits="userSpaceOnUse">
                                            <stop stop-color="#369D9C" />
                                            <stop offset="1" stop-color="#28814D" />
                                        </linearGradient>
                                    </defs>
                                </svg> {planContains}</p>
                        </div>}
                </div>
            </ModalBox>
        </Dialog>
    );
};

export default CustomModal;