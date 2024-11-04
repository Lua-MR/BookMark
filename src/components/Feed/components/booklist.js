import React from 'react';

const BookList = ({ books, goals = [], onBookClick, fields = [] }) => {
  const fieldLabels = {
    imagem: "Imagem",
    nome: "Nome",
    autor: "Autor",
    genero: "Gênero",
    totalPaginas: "Páginas Totais",
    paginaAtual: "Páginas Atuais",
    editora: "Editora",
    isbn: "ISBN",
    tipo: "Tipo",
    propriedade: "Propriedade",
    arquivo: "Arquivo",
    avaliacao: "Avaliação",
    status: "Status",
    meta: "Meta",
    resenha: "Resenha",
    dataInicio: "Data de Início",
    dataTermino: "Data de Término"
  };

  return (
    <div className="book-list-container">
      <table className="book-list-table">
        <thead>
          <tr>
            {fields.map((field) => (
              <th key={field}>{fieldLabels[field]}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {books.length === 0 ? (
            <tr>
              <td colSpan={fields.length} style={{ textAlign: 'center' }}>Nenhum livro encontrado</td>
            </tr>
          ) : (
            books.map((book) => {
              const bookGoal = goals.find((goal) => String(goal.id) === String(book.goal));
              return (
                <tr key={book.id} onClick={() => onBookClick(book)}>
                  {fields.includes('imagem') && (
                    <td>
                      {book.image ? (
                        <img src={book.image} alt={`Capa do Livro: ${book.name || 'Sem Título'}`} className="book-image" />
                      ) : (
                        <span>Sem Imagem</span>
                      )}
                    </td>
                  )}
                  {fields.includes('nome') && <td>{book.name}</td>}
                  {fields.includes('autor') && <td>{book.author}</td>}
                  {fields.includes('genero') && <td>{book.genre || "Gênero não especificado"}</td>}
                  {fields.includes('totalPaginas') && <td>{book.totalPages}</td>}
                  {fields.includes('paginaAtual') && <td>{book.currentPage}</td>}
                  {fields.includes('editora') && <td>{book.publisher || "Editora não especificada"}</td>}
                  {fields.includes('isbn') && <td>{book.isbn}</td>}
                  {fields.includes('tipo') && <td>{book.type || "Tipo não especificado"}</td>}
                  {fields.includes('propriedade') && <td>{book.prop || "Propriedade não especificada"}</td>}
                  {fields.includes('arquivo') && (
                    <td>
                      {book.file ? (
                        <a href={book.file} download>Baixar</a>
                      ) : (
                        <span>Nenhum arquivo disponível</span>
                      )}
                    </td>
                  )}
                  {fields.includes('avaliacao') && <td>{book.rating}</td>}
                  {fields.includes('status') && <td>{book.status}</td>}
                  {fields.includes('meta') && <td>{bookGoal ? bookGoal.name : "Sem meta definida"}</td>}
                  {fields.includes('resenha') && <td>{book.review}</td>}
                  {fields.includes('dataInicio') && <td>{book.startDate}</td>}
                  {fields.includes('dataTermino') && <td>{book.endDate}</td>}
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BookList;
