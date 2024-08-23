import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Card, CardContent, Typography, Grid, CardMedia, Box, Button} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { fetchMovies } from '../redux/movieSlice';
import { AppDispatch, RootState } from '../redux/store';
//import './App.css';  // Ensure this import is present

const MovieList: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const movies = useSelector((state: RootState) => state.movies.movies);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchMovies());
    }, [dispatch]);

    const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const MAX_DESCRIPTION_LENGTH = 32;

    const handleCardClick = (id?: number) => {
        navigate(`/movies/${id}`);
    };

    // @ts-ignore
    // @ts-ignore
    // @ts-ignore
    return (
        <Box sx={{ flexGrow: 1, padding: 3 }} className="movie-list-container">
            <Grid container spacing={4} className="movie-grid">
                {movies.map((movie) => (
                    <Grid item key={movie.id} xs={12} sm={6} md={4}>
                        <Card
                            sx={{
                                backgroundColor: '#ffffff',
                                boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
                                borderRadius: '10px',
                                transition: 'transform 0.2s',
                                '&:hover': {
                                    transform: 'translateY(-10px)',
                                    boxShadow: '0 12px 24px rgba(0, 0, 0, 0.2)',
                                },
                                display: 'flex',
                                flexDirection: 'column',
                                height: '100%',
                                cursor: 'pointer',  // Make card clickable
                            }}
                            onClick={() => handleCardClick(movie.id)}  // Navigate on card click
                        >
                            <CardMedia
                                component="img"
                                sx={{
                                    height: 180,  // Reduced height for the image
                                    width: '100%',
                                    objectFit: 'cover',
                                    borderTopLeftRadius: '10px',
                                    borderTopRightRadius: '10px',
                                }}
                                image={movie.imageUrl}
                                alt={movie.title}
                            />
                            <CardContent sx={{ flexGrow: 1, padding: '16px' }} className="movie-card-content">
                                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: '#333' }}>
                                    {movie.title}
                                </Typography>
                                <DescriptionWithToggle description={movie.description} maxLength={MAX_DESCRIPTION_LENGTH} />
                                <Typography variant="body2" color="primary" sx={{ fontWeight: 'bold', marginBottom: 1 }}>
                                    Genre: {movie.genre}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 'bold', marginBottom: 1 }}>
                                    Release Date: {formatDate(movie.releaseDate)}
                                </Typography>
                                <Typography variant="body2" color="error" sx={{ fontWeight: 'bold', marginBottom: 1 }}>
                                    Rating: {movie.rating}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

const DescriptionWithToggle: React.FC<{ description: string; maxLength: number }> = ({ description, maxLength }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleReadMore = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <>
            <Typography variant="body2" color="text.secondary" sx={{ marginBottom: 1 }}>
                {isExpanded ? description : `${description.substring(0, maxLength)}...`}
            </Typography>
            {description.length > maxLength && (
                <Button size="small" color="primary" onClick={toggleReadMore} sx={{ textTransform: 'none', padding: '0 8px', fontSize: '0.8rem' }}>
                    {isExpanded ? 'Read Less' : 'Read More'}
                </Button>
            )}
        </>
    );
};

export default MovieList;
