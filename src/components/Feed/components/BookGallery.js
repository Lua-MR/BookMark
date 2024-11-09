import React from 'react';

const BookGallery = ({ books, goals = [], onBookClick, fields = [] }) => { 
  return (
    <div className="book-list">
       {books.length === 0 ? (
        <div className="no-books-message">Nenhum livro encontrado</div>
      ) : (
        books.map((book) => {
          const bookGoal = goals.find((goal) => String(goal.id) === String(book.goal));
          return (
            <div key={book.id} className="book-card" onClick={() => onBookClick(book)}>
              {fields.includes('imagem') && (
                <div className="book-image">
                  {book.image ? (
                    <img src={book.image} alt={`Capa de ${book.name || 'Sem Título'}`} />
                  ) : (
                    <span>Sem Imagem</span>
                  )}
                </div>
              )}
              {fields.includes('nome') && <h3>{book.name || "Nome não especificado"}</h3>}
              {fields.includes('autor') && <p>Autor: {book.author || "Autor não especificado"}</p>}
              {fields.includes('genero') && <p>Gênero: {book.genre || "Gênero não especificado"}</p>}
              {fields.includes('totalPaginas') && <p>Páginas Totais: {book.totalPages || "N/D"}</p>}
              {fields.includes('paginaAtual') && <p>Páginas Atuais: {book.currentPage || "N/D"}</p>}
              {fields.includes('editora') && <p>Editora: {book.publisher || "Editora não especificada"}</p>}
              {fields.includes('isbn') && <p>ISBN: {book.isbn || "N/D"}</p>}
              {fields.includes('tipo') && <p>Tipo: {book.type || "Tipo não especificado"}</p>}
              {fields.includes('propriedade') && <p>Propriedade: {book.prop || "Propriedade não especificada"}</p>}
              {fields.includes('arquivo') && (
                <p>
                  Arquivo: {book.file ? <a href={book.file} download>Baixar</a> : "Nenhum arquivo disponível"}
                </p>
              )}
              {fields.includes('avaliacao') && <p>Avaliação: {book.rating || "Sem avaliação"}</p>}
              {fields.includes('status') && <p>Status: {book.status || "Sem status"}</p>}
              {fields.includes('meta') && <p>Meta: {bookGoal ? bookGoal.name : "Sem meta definida"}</p>}
              {fields.includes('resenha') && <p>Resenha: {book.review || "Sem resenha"}</p>}
              {fields.includes('dataInicio') && <p>Data de Início: {book.startDate || "Não informada"}</p>}
              {fields.includes('dataTermino') && <p>Data de Término: {book.endDate || "Não informada"}</p>}
            </div>
          );
        })
      )}
    </div>
  );
};

export default BookGallery;
