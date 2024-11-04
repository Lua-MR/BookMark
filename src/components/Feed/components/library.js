import React, { useState } from 'react';
import Book from './book';
import UpdateBook from './updatebook';
import Calendar from './Calendar';

const Library = ({ books, addNewBook, onUpdateBook, onDeleteBook }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [bookToUpdate, setBookToUpdate] = useState(null);
    const [newBook, setNewBook] = useState({
        name: '',
        author: '',
        genre: '',
        totalPages: 0,
        currentPage: 0,
    });
    const [highlightedDays, setHighlightedDays] = useState([]);

    const handleUpdateBook = (updatedBook, newHighlightedDays = []) => {
        if (!Array.isArray(newHighlightedDays)) {
            console.error("newHighlightedDays is not an array:", newHighlightedDays);
            newHighlightedDays = [];
        }
    
        onUpdateBook(updatedBook, newHighlightedDays); 
        setHighlightedDays((prev) => [...new Set([...prev, ...newHighlightedDays])]);
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
                />
            )}
        </div>
    );
};

export default Library;
