import React from 'react';
import alert from "../../../assets/graphimgs/alert.svg"
import { height } from '@mui/system';

export const GraphWrapper = ({
    title,
    data = [],
    children,
    dummyImage
}) => {
    const hasData = data && data.length > 0;

    const wrapperStyles = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "1px",
        background: "white",
        position: "relative",
        zIndex: 99,
        height:"100%"
    };

    const contentContainerStyles = {
        textAlign: "center",
        position: "relative",
        width: "100%",
        height: "100%"
    };

    const overlayStyles = {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(255, 255, 255, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backdropFilter: "blur(4px)"
    };

    const upgradeCardStyles = {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "8px",
        textAlign: "center"
    };


    return (
        <div style={wrapperStyles}>
            <div style={contentContainerStyles}>
                {hasData ? (
                    children
                ) : (
                    <>
                        <img
                            src={dummyImage}
                            alt="Dummy Graph"
                            style={{
                                width: "100%",
                                height: "100%", // Subtract title height
                                objectFit: "contain",
                                opacity: "0.6"
                            }}
                        />
                        <div style={overlayStyles}>
                            <div style={upgradeCardStyles}>
                                <img src={alert} width={60}/>
                                <p style={{
                                    fontSize: "14px",
                                    color: "#000",
                                    fontWeight:'500'
                                }}>
                                    No Data Available
                                </p>
                                <p style={{
                                    fontSize: "14px",
                                    color: "#666",
                                    marginBottom: "8px",
                                    width:'80%'
                                }}>
                                    There’s nothing to display right now.
                                </p>

                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};