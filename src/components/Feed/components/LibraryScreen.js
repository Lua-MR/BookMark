import React, { useState, useEffect } from "react";
import BookGallery from "./BookGallery";
import BookList from "./booklist";
import UpdateBook from "./updatebook";
import dados from "../../../data/dados.json";

const LibraryScreen = ({
  books,
  searchQuery,
  setIsModalOpen,
  addNewBook,
  onUpdateBook,
  onDeleteBook,
}) => {
  const [goals, setGoals] = useState([]);
  const [activeTab, setActiveTab] = useState("galeria");
  const [customTabs, setCustomTabs] = useState([]);
  const [isConfigModalOpen, setIsConfigModalOpen] = useState(false);
  const [newTabName, setNewTabName] = useState("");
  const [newTabType, setNewTabType] = useState("card");
  const [selectedFields, setSelectedFields] = useState([]);
  const [sortCriteria, setSortCriteria] = useState("");
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [newBook, setNewBook] = useState({
    name: "",
    author: "",
    genre: "",
    totalPages: 0,
    currentPage: 0,
  });


  useEffect(() => {
    try {
      const savedGoals = JSON.parse(localStorage.getItem("goals")) || [];
      const savedTabs = JSON.parse(localStorage.getItem("customTabs")) || [];
      const savedActiveTab = localStorage.getItem("activeTab") || "galeria";
      setGoals(savedGoals);
      setCustomTabs(savedTabs);
      setActiveTab(savedActiveTab);
    } catch (error) {
      console.error("Erro ao carregar dados do localStorage:", error);
    }
  }, []);

  useEffect(() => {
    if (customTabs.length > 0) {
      localStorage.setItem("customTabs", JSON.stringify(customTabs));
    }
  }, [customTabs]);

  useEffect(() => {
    if (activeTab) {
      localStorage.setItem("activeTab", activeTab);
    }
  }, [activeTab]);

  
  const filteredBooksData = dados.books.filter((book) =>
    book?.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredBooks = books.filter((book) =>
    book?.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const combinedBooks = [...filteredBooks, ...filteredBooksData];

  const sortBooks = (books) => {
    if (!sortCriteria) return books;
    return [...books].sort((a, b) => {
      switch (sortCriteria) {
        case "title":
          return a.name.localeCompare(b.name);
        case "author":
          return a.author.localeCompare(b.author);
        case "progress":
          return a.currentPage / a.totalPages - b.currentPage / b.totalPages;
        case "status":
          return a.status.localeCompare(b.status);
        case "genre":
          return a.genre.localeCompare(b.genre);
        case "totalPages":
          return a.totalPages - b.totalPages;
        case "currentPage":
          return a.currentPage - b.currentPage;
        case "publisher":
          return a.publisher.localeCompare(b.publisher);
        case "isbn":
          return a.isbn.localeCompare(b.isbn);
        case "type":
          return a.type.localeCompare(b.type);
        case "property":
          return a.prop.localeCompare(b.prop);
        case "file":
          return a.file ? 1 : -1;
        case "rating":
          return a.rating - b.rating;
        default:
          return 0;
      }
    });
  };

  const sortedBooks = sortBooks(combinedBooks);

  const enrichedBooks = sortedBooks.map((book) => {
    const bookGoal = goals.find(
      (goal) => String(goal.id) === String(book.goal)
    );
    return {
      ...book,
      goalName: bookGoal ? bookGoal.name : "Sem meta definida",
    };
  });

  const handleUpdateBook = (updatedBook) => {
    onUpdateBook(updatedBook);
    closeUpdateModal();
  };

  const handleBookClick = (book) => {
    setSelectedBook(book);
    setIsUpdateModalOpen(true);
  };

  const handleDeleteBook = (bookId) => {
    onDeleteBook(bookId);
    dados.books = dados.books.filter((book) => book.id !== bookId);
    setAllBooks([...books, ...dados.books]);
  };

  const handleAddBook = () => {
    const bookToAdd = { id: Date.now(), ...newBook };
    addNewBook(bookToAdd);
    setIsModalOpen(false);
    setNewBook({
      name: "",
      author: "",
      genre: "",
      totalPages: 0,
      currentPage: 0,
    });
  };

  const openConfigModal = () => setIsConfigModalOpen(true);
  const closeConfigModal = () => setIsConfigModalOpen(false);

  const handleFieldSelection = (e) => {
    const field = e.target.value;
    setSelectedFields((prevFields) =>
      prevFields.includes(field)
        ? prevFields.filter((f) => f !== field)
        : [...prevFields, field]
    );
  };

  const closeUpdateModal = () => {
    setIsUpdateModalOpen(false);
    setSelectedBook(null);
  };

  const getNextTabId = () => {
    const currentId = parseInt(localStorage.getItem("lastTabId"), 10) || 1;
    const nextId = currentId + 1;
    localStorage.setItem("lastTabId", nextId);
    return currentId;
  };

  const addNewTab = () => {
    if (newTabName) {
      const newTab = {
        id: getNextTabId(),
        name: newTabName,
        type: newTabType,
        fields: selectedFields,
      };
      const updatedTabs = [...customTabs, newTab];
      setCustomTabs(updatedTabs);
      setActiveTab(newTab.id);
      setNewTabName("");
      setSelectedFields([]);
      setIsConfigModalOpen(false);
      localStorage.setItem("customTabs", JSON.stringify(updatedTabs));
    }
  };

  const removeTab = (tabId) => {
    const tabToRemove = customTabs.find((tab) => tab.id === tabId);
    if (
      tabToRemove &&
      (tabToRemove.name === "galeria" || tabToRemove.name === "lista")
    ) {
      alert(`A aba ${tabToRemove.name} não pode ser removida.`);
      return;
    }
    const updatedTabs = customTabs.filter((tab) => tab.id !== tabId);
    setCustomTabs(updatedTabs);
    if (activeTab === tabId) {
      setActiveTab(updatedTabs.length > 0 ? updatedTabs[0].id : "galeria");
    }
  };

  const changeActiveTab = (tabId) => {
    setActiveTab(tabId);
  };

  const defaultListFields = [
    "imagem",
    "nome",
    "autor",
    "genero",
    "totalPaginas",
    "paginaAtual",
    "editora",
    "isbn",
    "tipo",
    "propriedade",
    "arquivo",
    "avaliacao",
    "status",
    "meta",
    "resenha",
    "dataInicio",
    "dataTermino",
  ];

  return (
    <div className="library-screen">
      <div className="tabs">
        <button
          className={`tab-button ${
            activeTab === "galeria" ? "active-tab" : ""
          }`}
          onClick={() => changeActiveTab("galeria")}
        >
          Galeria
        </button>
        <button
          className={`tab-button ${activeTab === "lista" ? "active-tab" : ""}`}
          onClick={() => changeActiveTab("lista")}
        >
          Lista
        </button>
        {customTabs.map((tab) => (
          <button
            key={tab.id}
            className={`tab-button ${activeTab === tab.id ? "active-tab" : ""}`}
            onClick={() => changeActiveTab(tab.id)}
          >
            {tab.name}
            <span
              className="close-list"
              onClick={(e) => {
                e.stopPropagation();
                removeTab(tab.id);
              }}
            >
              X
            </span>
          </button>
        ))}
        <button className="add-tab-button" onClick={openConfigModal}>
          +
        </button>
      </div>

      <div className="sort-container">
        <label>
          Ordenar por:
          <select
            value={sortCriteria}
            onChange={(e) => setSortCriteria(e.target.value)}
          >
            <option value="">Selecione um critério</option>
            <option value="title">Título</option>
            <option value="author">Autor</option>
            <option value="progress">Progresso</option>
            <option value="status">Status</option>
            <option value="genre">Gênero</option>
            <option value="totalPages">Total de Páginas</option>
            <option value="currentPage">Página Atual</option>
            <option value="publisher">Editora</option>
            <option value="isbn">ISBN</option>
            <option value="type">Tipo</option>
            <option value="property">Propriedade</option>
            <option value="file">Arquivo</option>
            <option value="rating">Avaliação</option>
          </select>
        </label>
      </div>

      <div className="tab-content">
        {activeTab === "galeria" && (
          <BookGallery books={sortedBooks} onBookClick={handleBookClick} />
        )}
        {activeTab === "lista" && (
          <BookList
            books={sortedBooks}
            fields={defaultListFields}
            goals={goals}
            onBookClick={handleBookClick}
          />
        )}
        {customTabs.map((tab) => {
          if (tab.id === activeTab) {
            return (
              <div key={tab.id} className="custom-tab-content">
                {tab.type === "card" ? (
                  <BookGallery
                    books={sortedBooks}
                    fields={tab.fields}
                    onBookClick={handleBookClick}
                  />
                ) : (
                  <BookList
                    books={sortedBooks}
                    fields={tab.fields || []}
                    goals={goals}
                    onBookClick={handleBookClick}
                  />
                )}
              </div>
            );
          }
          return null;
        })}
        {isUpdateModalOpen && selectedBook && (
          <UpdateBook
            book={selectedBook}
            onUpdate={handleUpdateBook}
            onDelete={handleDeleteBook}
            onClose={closeUpdateModal}
          />
        )}
      </div>

      <button className="add-book-button" onClick={() => setIsModalOpen(true)}>
        +
      </button>

      {isConfigModalOpen && (
        <div className="modal">
          <div className="modal-content-list">
            <button className="modal-close-list" onClick={closeConfigModal}>
              X
            </button>
            <label>
              Nome da Aba:
              <input
                type="text"
                value={newTabName}
                onChange={(e) => setNewTabName(e.target.value)}
              />
            </label>
            <label>
              Tipo de Exibição:
              <select
                value={newTabType}
                onChange={(e) => setNewTabType(e.target.value)}
              >
                <option value="card">Card</option>
                <option value="table">Tabela</option>
              </select>
            </label>
            <label>Campos para Exibir:</label>
            <div className="fields-container">
              <div className="fields-column">
                {[
                  "imagem",
                  "nome",
                  "autor",
                  "genero",
                  "totalPaginas",
                  "paginaAtual",
                  "dataInicio",
                  "dataTermino",
                ].map((field) => (
                  <label key={field}>
                    <input
                      type="checkbox"
                      value={field}
                      onChange={handleFieldSelection}
                      checked={selectedFields.includes(field)}
                    />
                    {field === "dataInicio"
                      ? "Data de Início"
                      : field === "dataTermino"
                      ? "Data de Término"
                      : field.charAt(0).toUpperCase() + field.slice(1)}
                  </label>
                ))}
              </div>
              <div className="fields-column">
                {[
                  "editora",
                  "isbn",
                  "tipo",
                  "propriedade",
                  "arquivo",
                  "avaliacao",
                ].map((field) => (
                  <label key={field}>
                    <input
                      type="checkbox"
                      value={field}
                      onChange={handleFieldSelection}
                      checked={selectedFields.includes(field)}
                    />
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </label>
                ))}
              </div>
            </div>
            <button onClick={addNewTab}>Adicionar Aba</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LibraryScreen;
