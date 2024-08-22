import React from 'react';
import { Container, CssBaseline } from '@mui/material';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MovieList from './components/MovieList';
import MovieForm from './components/MovieForm';
import MovieDetail from './components/MovieDetails.tsx';
import Navbar from './components/Navbar';

const App: React.FC = () => {
    return (
        <Router>
            <CssBaseline />
            <Navbar />
            <Container>
                <Routes>
                    <Route path="/" element={<MovieList />} />
                    <Route path="/add" element={<MovieForm />} />
                    <Route path="/edit/:id" element={<MovieForm />} />
                    <Route path="/movies/:id" element={<MovieDetail />} />
                </Routes>
            </Container>
        </Router>
    );
};

export default App;
