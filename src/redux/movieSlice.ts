import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

//export const API_URL = 'http://localhost:8080';

export const API_URL = 'http://3.132.214.48:8080';


export interface Movie {
    id?: number;
    title: string;
    description: string;
    genre: string;
    releaseDate: string;
    rating: number;
    imageUrl: string;
}

interface MovieState {
    movies: Movie[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: MovieState = {
    movies: [],
    status: 'idle',
};

export const fetchMovies = createAsyncThunk('movies/fetchMovies', async () => {
    const response = await axios.get(`${API_URL}/getMovies`);
    return response.data;
});

export const createMovie = createAsyncThunk('movies/createMovie', async (newMovie: Movie) => {
    const response = await axios.post(`${API_URL}/saveMovie`, newMovie);
    return response.data;
});

export const updateMovie = createAsyncThunk('movies/updateMovie', async ({ id, updatedMovie }: { id: number, updatedMovie: Movie }) => {
    const response = await axios.put(`${API_URL}/movie/${id}`, updatedMovie);
    return response.data;
});

export const deleteMovie = createAsyncThunk('movies/deleteMovie', async (id: number) => {
    await axios.delete(`${API_URL}/movie/${id}`);
    return id;
});

const movieSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMovies.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.movies = action.payload;
            })
            .addCase(createMovie.fulfilled, (state, action) => {
                state.movies.push(action.payload);
            })
            .addCase(updateMovie.fulfilled, (state, action) => {
                const index = state.movies.findIndex(movie => movie.id === action.payload.id);
                state.movies[index] = action.payload;
            })
            .addCase(deleteMovie.fulfilled, (state, action) => {
                state.movies = state.movies.filter(movie => movie.id !== action.payload);
            });
    },
});

export default movieSlice.reducer;
