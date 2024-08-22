import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear authentication tokens or handle logout logic
        navigate('/login'); // Assuming you have a login route
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography
                    color="inherit"
                    variant="h6"
                    sx={{ flexGrow: 1, textDecoration: 'none' }}
                    component={Link}
                    to="/"
                >
                    MovieHub
                </Typography>
                <Button
                    color="inherit"
                    component={Link}
                    to="/"
                    sx={{ textDecoration: 'none' }}
                >
                    Home
                </Button>
                <Button
                    color="inherit"
                    component={Link}
                    to="/add"
                    sx={{ textDecoration: 'none' }}
                >
                    Add Movie
                </Button>
                <Button
                    color="inherit"
                    onClick={handleLogout}
                    sx={{ textDecoration: 'none' }}
                >
                    Logout
                </Button>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
