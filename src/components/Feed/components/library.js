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
        goal: null, // Meta associada ao livro
    });

    const [highlightedDays, setHighlightedDays] = useState([]);

    const updateGoalBookCount = (goalId, isBookComplete, bookName) => {
        // Atualizar contagem de livros na meta associada
        const goal = goals.find((g) => String(g.id) === String(goalId));
        if (goal) {
            if (isBookComplete) {
                goal.completedBooks = (goal.completedBooks || 0) + 1;
            } else {
                goal.incompleteBooks = (goal.incompleteBooks || 0) + 1;
            }

            console.log(`Meta "${goal.name}" atualizada: Livro "${bookName}" associado.`);
        } else {
            console.warn(`Meta com ID "${goalId}" não encontrada.`);
        }
    };

    const handleAddBook = () => {
        const bookToAdd = {
            id: Date.now(),
            ...newBook,
        };

        // Verifica se o livro está associado a uma meta e se está completo
        const isBookComplete =
            parseInt(bookToAdd.currentPage, 10) === parseInt(bookToAdd.totalPages, 10);

        if (bookToAdd.goal) {
            updateGoalBookCount(bookToAdd.goal, isBookComplete, bookToAdd.name);
        }

        addNewBook(bookToAdd);
        closeModal();
    };

    const handleUpdateBook = (updatedBook, newHighlightedDays = []) => {
        if (!Array.isArray(newHighlightedDays)) {
            console.error("newHighlightedDays is not an array:", newHighlightedDays);
            newHighlightedDays = [];
        }

        const isBookComplete =
            parseInt(updatedBook.currentPage, 10) === parseInt(updatedBook.totalPages, 10);

        if (updatedBook.goal) {
            updateGoalBookCount(updatedBook.goal, isBookComplete, updatedBook.name);
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

    const closeModal = () => {
        setIsModalOpen(false);
        setBookToUpdate(null);
        setNewBook({ name: '', author: '', genre: '', totalPages: 0, currentPage: 0, goal: null });
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
