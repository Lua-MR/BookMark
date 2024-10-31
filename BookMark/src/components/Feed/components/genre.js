import React, { useState, useEffect } from 'react';

const Genre = ({ books }) => {
    const [genres, setGenres] = useState([]);

    useEffect(() => {
        const savedGenres = JSON.parse(localStorage.getItem('genreOptions')) || ['Ficção', 'Não-ficção'];
        setGenres(savedGenres);
    }, []);

    return (
        <div className="book-list">
            {genres.map((genre) => {
         
                const booksInGenre = books.filter(book => book.genre === genre);
                const completedBooksCount = booksInGenre.filter(book => book.currentPage === book.totalPages).length;

                return (
                    <div key={genre} className="book-card">
                        <button className="card-close" onClick={() => {}} aria-label="Close card">X</button>
                        <h2>{genre}</h2>
                        <p>Total de Livros: {booksInGenre.length}</p>
                        <p>Concluídos: {completedBooksCount}</p>
                        <ul>
                            {booksInGenre.map((filteredBook) => (
                                <li key={filteredBook.id}>
                                    <strong>{filteredBook.name}</strong> por {filteredBook.author}
                                </li>
                            ))}
                        </ul>
                    </div>
                );
            })}
        </div>
    );
};

export default Genre;
