import React, { Component } from 'react';
import {getMovies} from '../services/fakeMovieService';
import Like from './common/like';
import Pagination from './common/pagination';
import {paginate} from '../utils/paginate';

class Movies extends Component {
    state = {
        movies: getMovies(),
        pageSize: 4,
        currentPage: 1,
    }

    handleDelete = movie => {
        console.log(movie)
        const movies = this.state.movies.filter(m => m._id !== movie._id)
        this.setState({movies});
    }

    handleLike = (movie) => {
        const movies =  [...this.state.movies];
        const index = movies.indexOf(movie);
        movies[index] = {...movies[index]};
        movies[index].liked = !movies[index].liked;
        this.setState({movies});
    };

    handlePageChange = page =>{
        this.setState({currentPage: page})
    }

    render() { 
        const {length: count } = this.state.movies 
        //const { pageSize, currentPage } =  this.state
        if (count === 0) {
            return <p>There are no Movies in Db</p>;
        }
        const movies = paginate(this.state.movies, this.state.currentPage, this.state.pageSize )
        return (
            <React.Fragment>
            <p>Showing {count} movies in DB</p>
            <table className="table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Genre</th>
                        <th>Stock</th>
                        <th>Rate</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {movies.map(movie => <tr key={movie._id}>
                        <td>{movie.title}</td>
                        <td>{movie.genre.name}</td>
                        <td>{movie.numberInStock}</td>
                        <td>{movie.dailyRentalRate}</td>
                        <td><Like liked={movie.liked} onClick={() => this.handleLike(movie)} /></td>
                        <td><button onClick={() =>this.handleDelete(movie)}  className="btn btn-danger btn-sm">Delete</button></td>
                    </tr>)}
                    
                </tbody>
            </table>
            <Pagination itemsCount={this.state.movies.length} currentPage={this.state.currentPage} pageSize={this.state.pageSize} onPageChange={this.handlePageChange} />
            </React.Fragment>
        );
    }
}
 
export default Movies;