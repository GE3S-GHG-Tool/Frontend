import React from 'react';
import { Menu, Box, Typography, IconButton } from '@mui/material';
// import { X as CloseIcon } from 'lucide-react';

const NotificationMenu = ({ anchorEl, open, onClose }) => {
    const notifications = [
        {
            id: 1,
            title: "New Report Available for Delhi facility",
            description: "A new GHG emission report for Delhi is now available. Please complete and review by this month.",
            time: "03:00 PM",
            action: "Create Report",
            type: "AU"
        },
        {
            id: 2,
            title: "Submit Your GHG Report for Delhi facility",
            description: "Your GHG emission report for Delhi is due in 20 days. Please ensure that all data is completed and submit the report by 23/03/2024.",
            time: "03:00 PM",
            action: "View Report",
            type: "AU"
        },
        {
            id: 3,
            title: "New Facility Added: Jaipur",
            description: "The new facility Jaipur, has been successfully added to your account. You can now begin tracking and reporting emissions for this location.",
            time: "03:00 PM",
            action: "View Facility",
            type: "AU"
        },
        {
            id: 4,
            title: "New Facility Added: Jaipur",
            description: "The new facility Jaipur, has been successfully added to your account. You can now begin tracking and reporting emissions for this location.",
            time: "03:00 PM",
            action: "View Facility",
            type: "AU"
        },
        {
            id: 5,
            title: "New Facility Added: Jaipur",
            description: "The new facility Jaipur, has been successfully added to your account. You can now begin tracking and reporting emissions for this location.",
            time: "03:00 PM",
            action: "View Facility",
            type: "AU"
        },
        {
            id: 6,
            title: "New Facility Added: Jaipur",
            description: "The new facility Jaipur, has been successfully added to your account. You can now begin tracking and reporting emissions for this location.",
            time: "03:00 PM",
            action: "View Facility",
            type: "AU"
        },
        {
            id: 7,
            title: "New Facility Added: Jaipur",
            description: "The new facility Jaipur, has been successfully added to your account. You can now begin tracking and reporting emissions for this location.",
            time: "03:00 PM",
            action: "View Facility",
            type: "AU"
        },
        {
            id: 8,
            title: "New Facility Added: Jaipur",
            description: "The new facility Jaipur, has been successfully added to your account. You can now begin tracking and reporting emissions for this location.",
            time: "03:00 PM",
            action: "View Facility",
            type: "AU"
        }
    ];

    return (
        <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={onClose}
            PaperProps={{
                sx: {
                    // mt: 1,
                    width: 500,
                    maxHeight: 450,
                    borderRadius: '8px',
                    boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.08)',
                    overflow:'hidden'
                }
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
            <Box sx={{ py: 1,px:2, borderBottom: '1px solid rgba(0, 0, 0, 0.12)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6" sx={{ fontSize: '1rem', fontWeight: 500 }}>
                    Your Notifications
                </Typography>
                <IconButton onClick={onClose} size="small">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19.281 18.2198C19.3507 18.2895 19.406 18.3722 19.4437 18.4632C19.4814 18.5543 19.5008 18.6519 19.5008 18.7504C19.5008 18.849 19.4814 18.9465 19.4437 19.0376C19.406 19.1286 19.3507 19.2114 19.281 19.281C19.2114 19.3507 19.1286 19.406 19.0376 19.4437C18.9465 19.4814 18.849 19.5008 18.7504 19.5008C18.6519 19.5008 18.5543 19.4814 18.4632 19.4437C18.3722 19.406 18.2895 19.3507 18.2198 19.281L12.0004 13.0607L5.78104 19.281C5.64031 19.4218 5.44944 19.5008 5.25042 19.5008C5.05139 19.5008 4.86052 19.4218 4.71979 19.281C4.57906 19.1403 4.5 18.9494 4.5 18.7504C4.5 18.5514 4.57906 18.3605 4.71979 18.2198L10.9401 12.0004L4.71979 5.78104C4.57906 5.64031 4.5 5.44944 4.5 5.25042C4.5 5.05139 4.57906 4.86052 4.71979 4.71979C4.86052 4.57906 5.05139 4.5 5.25042 4.5C5.44944 4.5 5.64031 4.57906 5.78104 4.71979L12.0004 10.9401L18.2198 4.71979C18.3605 4.57906 18.5514 4.5 18.7504 4.5C18.9494 4.5 19.1403 4.57906 19.281 4.71979C19.4218 4.86052 19.5008 5.05139 19.5008 5.25042C19.5008 5.44944 19.4218 5.64031 19.281 5.78104L13.0607 12.0004L19.281 18.2198Z" fill="black" />
                  </svg>
                </IconButton>
            </Box>

            <Box sx={{ maxHeight: 400, overflow: 'auto' }}>
                {notifications.map((notification) => (
                    <Box key={notification.id} sx={{ p: 2, borderBottom: '1px solid rgba(0, 0, 0, 0.06)' }}>
                        <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                            <Box sx={{
                                width: 26,
                                height: 26,
                                borderRadius: '50%',
                                bgcolor: '#E6F8F2',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#28814D',
                                fontWeight: 500,
                                fontSize: '0.8rem'
                            }}>
                                {notification.type}
                            </Box>
                            <Box sx={{ flex: 1 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                                    <Typography sx={{ fontSize: '0.8rem', fontWeight: 500, color: '#000' }}>
                                        {notification.title}
                                    </Typography>
                                    <Typography sx={{ fontSize: '0.7rem', color: '#717171' }}>
                                        {notification.time}
                                    </Typography>
                                </Box>
                                <Typography sx={{ fontSize: '0.8rem', color: '#717171', mb: 1 }}>
                                    {notification.description}
                                </Typography>
                                <Typography sx={{ fontSize: '0.8rem', color: '#369D9C', cursor: 'pointer', '&:hover': { color: '#28814D' } }}>
                                    {notification.action}
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                ))}
            </Box>
        </Menu>
    );
};

export default NotificationMenu;