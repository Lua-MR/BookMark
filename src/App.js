import React, { useState, useRef, useEffect } from "react";
import Calendar from "./components/Feed/components/Calendar";
import goal from "./components/Feed/components/GoalCard";
import AddBook from "./components/Feed/components/addbook";
import LibraryScreen from "./components/Feed/components/LibraryScreen";
import GoalPage from "./components/Feed/components/GoalPage";
import Genre from "./components/Feed/components/genre";
import UpdateBook from "./components/Feed/components/updatebook";
import "./estilo.css";
import mockData from './data/dados.json';

function App() {
  const [profileImage, setProfileImage] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [userQuote, setUserQuote] = useState("");

  const [books, setBooks] = useState(() => {
    const savedBooks = JSON.parse(localStorage.getItem("books"));
    return savedBooks || mockData.books;
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isColorModalOpen, setIsColorModalOpen] = useState(false);
  const [currentScreen, setCurrentScreen] = useState("home");

  const [highlightedDays, setHighlightedDays] = useState([]);
  const fileInputRef = useRef(null);
  const [goals, setGoals] = useState([]);

  const [corFundoPrincipal, setCorFundoPrincipal] = useState("#FDEFE5");
  const [corTextoPrincipal, setCorTextoPrincipal] = useState("#986B45");
  const [corFundoSecundaria, setCorFundoSecundaria] = useState("#E2C7AA");
  const [corContraste, setCorContraste] = useState("#A0522D");
  const [corTerciaria, setCorTerciaria] = useState("#B19A81");
  const [corFonteClara, setCorFonteClara] = useState("#FFFFFF");
  const [corFonteEscura, setCorFonteEscura] = useState("#333333");
  
  const [fonteTamanhoPequeno, setFonteTamanhoPequeno] = useState("12px");
  const [fonteTamanhoNormal, setFonteTamanhoNormal] = useState("16px");
  const [fonteTamanhoMedio, setFonteTamanhoMedio] = useState("20px");
  const [fonteTamanhoGrande, setFonteTamanhoGrande] = useState("24px");

  // Função para aplicar e salvar cores e tamanhos
  const applyColors = () => {
    try {
      localStorage.setItem("corFundoPrincipal", corFundoPrincipal);
      localStorage.setItem("corTextoPrincipal", corTextoPrincipal);
      localStorage.setItem("corFundoSecundaria", corFundoSecundaria);
      localStorage.setItem("corContraste", corContraste);
      localStorage.setItem("corTerciaria", corTerciaria);
      localStorage.setItem("corFonteClara", corFonteClara);
      localStorage.setItem("corFonteEscura", corFonteEscura);

      document.documentElement.style.setProperty("--cor-fundo-principal", corFundoPrincipal);
      document.documentElement.style.setProperty("--cor-texto-principal", corTextoPrincipal);
      document.documentElement.style.setProperty("--cor-fundo-secundaria", corFundoSecundaria);
      document.documentElement.style.setProperty("--cor-contraste", corContraste);
      document.documentElement.style.setProperty("--cor-terciaria", corTerciaria);
      document.documentElement.style.setProperty("--cor-fonte-clara", corFonteClara);
      document.documentElement.style.setProperty("--cor-fonte-escura", corFonteEscura);

      closeColorModal();
    } catch (error) {
      console.error("Erro ao aplicar cores e tamanhos:", error);
    }
  };

  useEffect(() => {
    const savedGoals = JSON.parse(localStorage.getItem("goals")) || [];
    setGoals(savedGoals);

    const savedCorFundoPrincipal = localStorage.getItem("corFundoPrincipal") || "#FDEFE5";
    const savedCorTextoPrincipal = localStorage.getItem("corTextoPrincipal") || "#986B45";
    const savedCorFundoSecundaria = localStorage.getItem("corFundoSecundaria") || "#E2C7AA";
    const savedCorContraste = localStorage.getItem("corContraste") || "#A0522D";
    const savedCorTerciaria = localStorage.getItem("corTerciaria") || "#B19A81";
    const savedCorFonteClara = localStorage.getItem("corFonteClara") || "#FFFFFF";
    const savedCorFonteEscura = localStorage.getItem("corFonteEscura") || "#333333";

    setCorFundoPrincipal(savedCorFundoPrincipal);
    setCorTextoPrincipal(savedCorTextoPrincipal);
    setCorFundoSecundaria(savedCorFundoSecundaria);
    setCorContraste(savedCorContraste);
    setCorTerciaria(savedCorTerciaria);
    setCorFonteClara(savedCorFonteClara);
    setCorFonteEscura(savedCorFonteEscura);

    document.documentElement.style.setProperty("--cor-fundo-principal", savedCorFundoPrincipal);
    document.documentElement.style.setProperty("--cor-texto-principal", savedCorTextoPrincipal);
    document.documentElement.style.setProperty("--cor-fundo-secundaria", savedCorFundoSecundaria);
    document.documentElement.style.setProperty("--cor-contraste", savedCorContraste);
    document.documentElement.style.setProperty("--cor-terciaria", savedCorTerciaria);
    document.documentElement.style.setProperty("--cor-fonte-clara", savedCorFonteClara);
    document.documentElement.style.setProperty("--cor-fonte-escura", savedCorFonteEscura);
  }, []);
}

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setProfileImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleFileInputClick = () => {
    fileInputRef.current.click();
  };

  const saveBooksToLocalStorage = (books) => {
    localStorage.setItem("books", JSON.stringify(books));
  };

  const addBook = (newBook) => {
    setBooks((prevBooks) => {
      const updatedBooks = [...prevBooks, newBook];
      saveBooksToLocalStorage(updatedBooks);
      return updatedBooks;
    });

    if (newBook.startDate && newBook.endDate) {
      updateHighlightedDays(newBook.startDate, newBook.endDate);
    }

    if (newBook.goal) {
      updateGoalProgress(newBook.goal);
    }
  };

  const updateHighlightedDays = (startDate, endDate) => {
    const newHighlightedDays = [];
    const start = new Date(startDate + "T00:00:00");
    const end = new Date(endDate + "T23:59:59");

    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      newHighlightedDays.push(d.toISOString().split("T")[0]);
    }

    setHighlightedDays((prevDays) => [...new Set([...prevDays, ...newHighlightedDays])]);
  };


  // useEffect(() => {
  //   const savedBooks = JSON.parse(localStorage.getItem("books")) || [];
  //   setBooks(savedBooks);
  // }, []);

  const updateBook = (updatedBook) => {
    setBooks((prevBooks) => {
      const updatedBooks = prevBooks.map((book) =>
        book.id === updatedBook.id ? updatedBook : book
      );
      localStorage.setItem("books", JSON.stringify(updatedBooks));
      return updatedBooks;
    });
  };

  const deleteBook = (bookId) => {
    console.log(`Deleting book with ID: ${bookId}`); // Add this line
    setBooks((prevBooks) => {
      const updatedBooks = prevBooks.filter((book) => book.id !== bookId);
      localStorage.setItem("books", JSON.stringify(updatedBooks));
      return updatedBooks;
    });
  };

  const updateGoalProgress = (goalId) => {
    const updatedGoals = goals.map((goal) => {
      if (String(goal.id) === String(goalId)) {
        const booksInGoal = books.filter((book) => book.goal === goalId);
        const progress = booksInGoal.length;
        const progressPercentage = (progress / goal.totalBooks) * 100;
        return {
          ...goal,
          progress,
          progressPercentage,
          status: progress >= goal.totalBooks ? "Concluído" : "Em andamento",
        };
      }
      return goal;
    });

    setGoals(updatedGoals);
    localStorage.setItem("goals", JSON.stringify(updatedGoals));
  };

  useEffect(() => {
    goals.forEach((goal) => updateGoalProgress(goal.id));
  }, [books]);

  const closeModal = () => setIsModalOpen(false);

  const addGoal = (newGoal) => {
    const updatedGoals = [...goals, { id: Date.now(), ...newGoal }];
    setGoals(updatedGoals);
    localStorage.setItem("goals", JSON.stringify(updatedGoals));
  };

  const updateGoalBookCount = (goalId, isBookComplete, bookName) => {
    setGoals((prevGoals) =>
      prevGoals.map((goal) => {
        if (String(goal.id) === String(goalId)) {
          const progress = goal.progress + (isBookComplete ? 1 : 0);
          const progressPercentage = Math.min(
            100,
            (progress / goal.totalBooks) * 100
          );

          const updatedBookList = goal.books ? [...goal.books] : [];
          if (bookName && !updatedBookList.includes(bookName)) {
            updatedBookList.push(bookName);
          }

          return {
            ...goal,
            progress,
            progressPercentage,
            status: progress >= goal.totalBooks ? "Concluído" : "Em andamento",
            books: updatedBookList,
          };
        }
        return goal;
      })
    );
  };

  const openColorModal = () => {
    setIsColorModalOpen(true);
  };

  const closeColorModal = () => {
    setIsColorModalOpen(false);
  };


  const renderContent = () => {
    switch (currentScreen) {
      case "biblioteca":
        return (
          <LibraryScreen
            books={books}
            searchQuery={searchQuery}
            setIsModalOpen={setIsModalOpen}
            addNewBook={addBook}
            onUpdateBook={updateBook}
            onDeleteBook={deleteBook}
            goals={goals}
          />
        );
      case "metas":
        return <GoalPage books={books} goals={goals} addGoal={addGoal} />;
      case "genres":
        return <Genre books={books} />;
      default:
        return (
          <div>
            <Library
              books={books}
              searchQuery={searchQuery}
              setIsModalOpen={setIsModalOpen}
              addNewBook={addBook}
              onUpdateBook={updateBook}
              onDeleteBook={deleteBook}
              goals={goals}
            />
            <button
              className="add-book-button"
              onClick={() => setIsModalOpen(true)}
            >
              +
            </button>
          </div>
        );
    }
  };


  return (
    <div className="app-container">
      <div className="header">
        <h1>BOOKMARK</h1>
        <input
          type="text"
          placeholder="🔎 Pesquisar..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-bar"
        />
      </div>

      {currentScreen !== "home" && (
        <div className="top-menu">
         <a onClick={() => window.location.reload()}>Inicio</a>
          <a onClick={() => setCurrentScreen("genres")}>Gêneros</a>
          <a onClick={() => setCurrentScreen("metas")}>Metas</a>
        </div>
      )}

      <div className="divider"></div>

      <div className="app-body">
        {currentScreen === "home" && (
          <div className="sidebar">
            <button className="add-image-button" onClick={handleFileInputClick}>
              🖼️ Foto Perfil
            </button>
            <div className="profile-container">
              {profileImage ? (
                <img
                  src={profileImage}
                  alt="Perfil"
                  className="profile-image"
                />
              ) : (
                <div className="default-profile"></div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: "none" }}
                ref={fileInputRef}
              />
            </div>
            <div className="sidebar-p">
              <button onClick={() => setIsModalOpen(true)}>
                Adicionar Livro
              </button>
              <button onClick={openColorModal}>Configuração</button>
            </div>
            <button onClick={() => setCurrentScreen("biblioteca")}>
              Biblioteca
            </button>
            <button onClick={() => setCurrentScreen("genres")}>Gêneros</button>
            <button onClick={() => setCurrentScreen("metas")}>Metas</button>
          </div>
        )}

        <div className="content">{renderContent()}</div>

        {currentScreen === "home" && (
          <div className="right-panel">
            <br />
            <div className="quote-section">
              <input
                type="text"
                placeholder="Digite sua frase favorita..."
                value={userQuote}
                onChange={(e) => setUserQuote(e.target.value)}
                className="quote-input"
              />
            </div>
            <div className="calendar-section">
              <Calendar highlightedDays={highlightedDays} />
            </div>
          </div>
        )}
      </div>
      {currentScreen === "home" && (
        <div className="side">
          <LibraryScreen
            books={books}
            searchQuery={searchQuery}
            setIsModalOpen={setIsModalOpen}
            addNewBook={addBook}
            onUpdateBook={updateBook}
            onDeleteBook={deleteBook}
            goals={goals}
          />
        </div>
      )}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <button
              className="modal-close"
              onClick={closeModal}
              aria-label="Close modal"
            >
              X
            </button>
            <div className="modal-right">
              <AddBook
                addBook={(newBook) => {
                  addBook(newBook);
                  closeModal();
                }}
                goals={goals}
                updateGoalBookCount={updateGoalBookCount}
              />
            </div>
          </div>
        </div>
      )}

      {isColorModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <button
              className="modal-close"
              onClick={closeColorModal}
              aria-label="Close modal"
            >
              X
            </button>
            <div className="modal-left">
              <h2>Alterar Fontes</h2>
              <div>
                <label>Tamanho da Fonte Pequena</label>
                <input
                  type="number"
                  value={fonteTamanhoPequeno.replace("px", "")}
                  onChange={(e) =>
                    setFonteTamanhoPequeno(`${e.target.value}px`)
                  }
                />
              </div>
              <div>
                <label>Tamanho da Fonte Normal</label>
                <input
                  type="number"
                  value={fonteTamanhoNormal.replace("px", "")}
                  onChange={(e) => setFonteTamanhoNormal(`${e.target.value}px`)}
                />
              </div>
              <div>
                <label>Tamanho da Fonte Média</label>
                <input
                  type="number"
                  value={fonteTamanhoMedio.replace("px", "")}
                  onChange={(e) => setFonteTamanhoMedio(`${e.target.value}px`)}
                />
              </div>
              <div>
                <label>Tamanho da Fonte Grande</label>
                <input
                  type="number"
                  value={fonteTamanhoGrande.replace("px", "")}
                  onChange={(e) => setFonteTamanhoGrande(`${e.target.value}px`)}
                />
              </div>
              <div>
          <label htmlFor="cor-fonte-clara">Cor da Fonte Clara</label>
          <input
            className="color-preview"
            style={{ backgroundColor: corFonteClara }}
            type="color"
            id="cor-fonte-clara"
            value={corFonteClara}
            onChange={(e) => setCorFonteClara(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="cor-fonte-escura">Cor da Fonte Escura</label>
          <input
            className="color-preview"
            style={{ backgroundColor: corFonteEscura }}
            type="color"
            id="cor-fonte-escura"
            value={corFonteEscura}
            onChange={(e) => setCorFonteEscura(e.target.value)}
          />
        </div>
            </div>

            <div className="modal-right">
              <h2>Alterar Cores do Tema</h2>
              <div>
                <label htmlFor="cor-fundo-principal">
                  Cor de Fundo Principal
                </label>
                <input
                  className="color-preview"
                  style={{ backgroundColor: corFundoPrincipal }}
                  type="color"
                  id="cor-fundo-principal"
                  value={corFundoPrincipal}
                  onChange={(e) => setCorFundoPrincipal(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="cor-texto-principal">
                  Cor do Texto Principal
                </label>
                <input
                  className="color-preview"
                  style={{ backgroundColor: corTextoPrincipal }}
                  type="color"
                  id="cor-texto-principal"
                  value={corTextoPrincipal}
                  onChange={(e) => setCorTextoPrincipal(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="cor-fundo-secundaria">
                  Cor de Fundo Secundária
                </label>
                <input
                  className="color-preview"
                  style={{ backgroundColor: corFundoSecundaria }}
                  type="color"
                  id="cor-fundo-secundaria"
                  value={corFundoSecundaria}
                  onChange={(e) => setCorFundoSecundaria(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="cor-contraste">
                  Cor de Contraste Principal
                </label>
                <input
                  className="color-preview"
                  style={{ backgroundColor: corContraste }}
                  type="color"
                  id="cor-contraste"
                  value={corContraste}
                  onChange={(e) => setCorContraste(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="cor-terciaria">Cor Terciária</label>
                <input
                  className="color-preview"
                  style={{ backgroundColor: corTerciaria }}
                  type="color"
                  id="cor-terciaria"
                  value={corTerciaria}
                  onChange={(e) => setCorTerciaria(e.target.value)}
                />
              </div>
              <button onClick={applyColors}>Aplicar</button>
            </div>
          </div>
        </div>
      )}

      <div className="footer"></div>
    </div>
  );
}

export default App;
