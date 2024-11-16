import React, { useState } from 'react';
import Book from './book';
import UpdateBook from './updatebook';

const Library = ({ books, addNewBook, onUpdateBook, onDeleteBook, goals = [] }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [bookToUpdate, setBookToUpdate] = useState(null);
    const [newBook, setNewBook] = useState({
        name: '',
        author: '',
        genre: '',
        totalPages: 0,
        currentPage: 0,
    });

    const handleUpdateBook = (updatedBook, newHighlightedDays = []) => {
        // Atualiza o livro
        onUpdateBook(updatedBook, newHighlightedDays);

        // Atualiza a meta associada ao livro, se aplicável
        if (updatedBook.goal) {
            const updatedGoals = goals.map((goal) => {
                if (goal.id === updatedBook.goal) {
                    return {
                        ...goal,
                        books: goal.books.map((book) =>
                            book.id === updatedBook.id ? updatedBook : book
                        ),
                    };
                }
                return goal;
            });

            // Atualiza as metas no estado global (se necessário)
            if (typeof onUpdateBook === 'function') {
                onUpdateBook({ goals: updatedGoals });
            }
        }

        closeModal();
    };

    const handleBookClick = (book) => {
        setBookToUpdate(book);
        setIsModalOpen(true);
    };

    const handleDeleteBook = (bookId) => {
        onDeleteBook(bookId);
    };

    const handleAddBook = () => {
        const bookToAdd = { id: Date.now(), ...newBook };
        addNewBook(bookToAdd);
        closeModal();
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setBookToUpdate(null);
        setNewBook({ name: '', author: '', genre: '', totalPages: 0, currentPage: 0 });
    };

    return (
        <div className="library">
            <div className="book-list">
                {books?.length > 0 ? (
                    books.map((book) => (
                        <div key={book.id} onClick={() => handleBookClick(book)} className="book-item">
                            <Book book={book} />
                        </div>
                    ))
                ) : (
                    <p>Nenhum livro cadastrado.</p>
                )}
            </div>

            {isModalOpen && bookToUpdate && (
                <UpdateBook
                    book={bookToUpdate}
                    onUpdate={handleUpdateBook}
                    onDelete={handleDeleteBook}
                    onClose={closeModal}
                    goals={goals}
                />
            )}
        </div>
    );
};

export default Library;
