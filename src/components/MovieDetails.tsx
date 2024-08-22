import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies, deleteMovie } from '../redux/movieSlice';
import { Button, Typography, Card, CardContent, CardMedia, Box } from '@mui/material';
import { RootState } from '../redux/store';

const MovieDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const movie = useSelector((state: RootState) =>
        state.movies.movies.find((movie) => movie.id === parseInt(id!))
    );

    useEffect(() => {
        if (!movie) {
            // @ts-ignore
            dispatch(fetchMovies());
        }
    }, [dispatch, movie]);

    const handleDelete = () => {
        // @ts-ignore
        dispatch(deleteMovie(parseInt(id!)));
        navigate('/');
    };

    if (!movie) {
        return <Typography variant="h5">Loading...</Typography>;
    }

    return (
        <Box sx={{ padding: 3, backgroundColor: '#f0f0f0' }}>
            <Card
                sx={{
                    backgroundColor: '#ffffff',
                    boxShadow: 'none', // Removes the shadow
                    border: 'none', // Removes the border
                }}
            >
                <CardMedia
                    component="img"
                    height="400"
                    image={movie.imageUrl} // Make sure the movie object has an imageUrl property
                    alt={movie.title}
                    sx={{
                        borderTopLeftRadius: '10px',
                        borderTopRightRadius: '10px',
                        objectFit: 'cover',
                    }}
                />
                <CardContent>
                    <Typography variant="h4" gutterBottom>
                        {movie.title}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        {movie.description}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                        Genre: {movie.genre}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                        Release Date: {movie.releaseDate}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                        Rating: {movie.rating}
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => navigate(`/edit/${movie.id}`)}
                        sx={{ mt: 2 }}
                    >
                        Edit
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleDelete}
                        sx={{ mt: 2, ml: 2 }}
                    >
                        Delete
                    </Button>
                </CardContent>
            </Card>
        </Box>
    );
};

export default MovieDetail;
