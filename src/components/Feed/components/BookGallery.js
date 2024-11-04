import React from 'react';

const BookGallery = ({ books, onBookClick, fields = [] }) => { 
  return (
    <div className="book-list">
      {books.map(book => (
        <div key={book.id} className="book-card" onClick={() => onBookClick(book)}>
          <img src={book.image} alt={`Capa de ${book.name}`} className="book-image" />
          {fields.includes('nome') && <h3>{book.name}</h3>}
          {fields.includes('autor') && <p>Autor: {book.author}</p>}
          {fields.includes('genero') && <p>Gênero: {book.genre}</p>}
          {fields.includes('totalPaginas') && <p>Páginas Totais: {book.totalPages}</p>}
          {fields.includes('paginaAtual') && <p>Páginas Atuais: {book.currentPage}</p>}
          {fields.includes('editora') && <p>Editora: {book.publisher}</p>}
          {fields.includes('isbn') && <p>ISBN: {book.isbn}</p>}
          {fields.includes('tipo') && <p>Tipo: {book.type}</p>}
          {fields.includes('propriedade') && <p>Propriedade: {book.prop}</p>}
          {fields.includes('arquivo') && (
            <p>
              Arquivo: {book.file ? <a href={book.file} download>Baixar</a> : 'Nenhum arquivo disponível'}
            </p>
          )}
          {fields.includes('avaliacao') && <p>Avaliação: {book.rating}</p>}
          {fields.includes('status') && <p>Status: {book.status}</p>}
          {fields.includes('meta') && <p>Meta: {book.goal}</p>}
          {fields.includes('resenha') && <p>Resenha: {book.review}</p>}
          {fields.includes('dataInicio') && <p>Data de Início: {book.startDate}</p>}
          {fields.includes('dataTermino') && <p>Data de Término: {book.endDate}</p>}
        </div>
      ))}
    </div>
  );
};

export default BookGallery;
