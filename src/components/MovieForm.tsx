import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, TextField, Typography, Box } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { createMovie, updateMovie, fetchMovies } from '../redux/movieSlice';
import { AppDispatch, RootState } from '../redux/store';

const MovieForm: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const movies = useSelector((state: RootState) => state.movies.movies);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [genre, setGenre] = useState('');
    const [releaseDate, setReleaseDate] = useState('');
    const [rating, setRating] = useState<number | string>('');
    const [imageUrl, setImageUrl] = useState('');

    const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };
    useEffect(() => {
        if (id && movies.length > 0) {
            const movie = movies.find((movie) => movie.id === parseInt(id));
            if (movie) {
                setTitle(movie.title);
                setDescription(movie.description);
                setGenre(movie.genre);
                setReleaseDate(movie.releaseDate);
                setRating(movie.rating);
                setImageUrl(movie.imageUrl);
            }
        } else if (id) {
            dispatch(fetchMovies());
        }
    }, [dispatch, id, movies]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const movieData = { title, description, genre, releaseDate, rating: Number(rating), imageUrl };

        if (id) {
            await dispatch(updateMovie({ id: parseInt(id), updatedMovie: movieData }));
        } else {
            await dispatch(createMovie(movieData));
        }
        navigate('/');
    };

    return (
        <Box sx={{ padding: 3 }}>
            <Typography variant="h4" gutterBottom>
                {id ? 'Edit Movie' : 'Add New Movie'}
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    fullWidth
                    required
                    sx={{ marginBottom: 2 }}
                />
                <TextField
                    label="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    multiline
                    rows={4}
                    fullWidth
                    required
                    sx={{ marginBottom: 2 }}
                />
                <TextField
                    label="Genre"
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
                    fullWidth
                    required
                    sx={{ marginBottom: 2 }}
                />
                <TextField
                    label="Release Date"
                    type="date"
                    value={formatDate(releaseDate)}
                    onChange={(e) => setReleaseDate(e.target.value)}
                    fullWidth

                    sx={{ marginBottom: 2 }}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <TextField
                    label="Rating"
                    type="number"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    fullWidth
                    required
                    inputProps={{ min: 0, max: 10, step: 0.1 }}
                    sx={{ marginBottom: 2 }}
                />
                <TextField
                    label="Image URL"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    fullWidth
                    required
                    sx={{ marginBottom: 2 }}
                />
                <Button type="submit" variant="contained" color="primary">
                    {id ? 'Update Movie' : 'Add Movie'}
                </Button>
            </form>
        </Box>
    );
};

export default MovieForm;
