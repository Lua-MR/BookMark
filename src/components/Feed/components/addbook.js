import React, { useState, useRef, useEffect } from 'react';

const AddBook = ({ addBook, goals = [], updateGoalBookCount }) => {
    const [bookData, setBookData] = useState({
        id: '',
        image: '',
        name: '',
        author: '',
        genre: '',
        totalPages: '',
        currentPage: '',
        publisher: '',
        isbn: '',
        type: '',
        prop: '',
        file: '',
        rating: '',
        status: '',
        goal: '',
        review: '',
        startDate: '',
        endDate: ''
    });

    const [selectedGoalId, setSelectedGoalId] = useState('');
    const fileInputRef = useRef(null);
    const imageInputRef = useRef(null);

    const [ratings, setRatings] = useState(['1', '2', '3', '4', '5']);
    const [statusOptions, setStatusOptions] = useState(['Lendo', 'Lido', 'Ler', 'Abandonado']);
    const [genreOptions, setGenreOptions] = useState([]);
    const [typeOptions, setTypeOptions] = useState(['Físico', 'Kindle']);
    const [propOptions, setPropOptions] = useState(['Pessoal', 'Emprestado']);
    const [editoraOptions, setEditoraOptions] = useState(['Intrínseca', 'Seguinte', 'Rocco']);

    useEffect(() => {
        const savedProps = JSON.parse(localStorage.getItem('propOptions')) || ['Pessoal', 'Emprestado'];
        setPropOptions(savedProps);
    }, []);

    useEffect(() => {
        const savedGenres = JSON.parse(localStorage.getItem('genreOptions')) || ['Ficção', 'Não-ficção'];
        setGenreOptions(savedGenres);
    }, []);

    useEffect(() => {
        const savedRatings = JSON.parse(localStorage.getItem('ratingsOptions')) || ['1', '2', '3', '4', '5'];
        setRatings(savedRatings);
    }, []);

    useEffect(() => {
        const savedStatuses = JSON.parse(localStorage.getItem('statusOptions')) || ['Lendo', 'Lido', 'Ler', 'Abandonado'];
        setStatusOptions(savedStatuses);
    }, []);

    useEffect(() => {
        const savedEditoras = JSON.parse(localStorage.getItem('editoraOptions')) || ['Intrínseca', 'Seguinte', 'Rocco'];
        setEditoraOptions(savedEditoras);
    }, []);

    useEffect(() => {
        const savedTypes = JSON.parse(localStorage.getItem('typeOptions')) || ['Físico', 'Kindle'];
        setTypeOptions(savedTypes);
    }, []);

    const handleOptionSave = (e, input, options, setOptions, key, storageKey) => {
        if (e.key === 'Enter') {
            const newValue = input.trim();
            if (newValue && !options.includes(newValue)) {
                const updatedOptions = [...options, newValue];
                setOptions(updatedOptions);
                setBookData((prevData) => ({ ...prevData, [key]: newValue }));
                localStorage.setItem(storageKey, JSON.stringify(updatedOptions));
            }
            e.preventDefault();
        }
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'image' && files && files.length > 0) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setBookData((prevData) => ({ ...prevData, image: reader.result }));
            };
            reader.readAsDataURL(files[0]);
        } else if (name === 'file' && files && files.length > 0) {
            setBookData((prevData) => ({
                ...prevData,
                file: URL.createObjectURL(files[0]),
            }));
        } else {
            setBookData((prevData) => ({ ...prevData, [name]: value }));
        }
    };

    const generateId = () => `book-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    const handleFileInputClick = () => fileInputRef.current.click();


    const [highlightedDays, setHighlightedDays] = useState([]);

    const [ratingInput, setRatingInput] = useState('');
    const [isRatingInputVisible, setIsRatingInputVisible] = useState(false);

    const [statusInput, setStatusInput] = useState('');
    const [isStatusInputVisible, setIsStatusInputVisible] = useState(false);

    const [genreInput, setGenreInput] = useState('');
    const [isGenreInputVisible, setIsGenreInputVisible] = useState(false);

     const [typeInput, setTypeInput] = useState('');
    const [isTypeInputVisible, setIsTypeInputVisible] = useState(false);

    const [propInput, setPropInput] = useState('');
    const [isPropInputVisible, setIsPropInputVisible] = useState(false);

    const [editoraInput, setEditoraInput] = useState('');
    const [isEditoraInputVisible, setIsEditoraInputVisible] = useState(false);

    const handleRatingInputChange = (e) => {
        setRatingInput(e.target.value);
        setIsRatingInputVisible(true);
    };

    const handleRatingInputFocus = () => {
        setIsRatingInputVisible(true);
    };

    const handleRatingInputBlur = () => {
        setTimeout(() => setIsRatingInputVisible(false), 100);
    };

   
    const handleStatusInputChange = (e) => {
        setStatusInput(e.target.value);
        setIsStatusInputVisible(true);
    };

    const handleStatusInputFocus = () => {
        setIsStatusInputVisible(true);
    };

    const handleStatusInputBlur = () => {
        setTimeout(() => setIsStatusInputVisible(false), 100);
    };


    const handleGenreInputChange = (e) => setGenreInput(e.target.value);


    const handleGenreInputFocus = () => {
        setIsGenreInputVisible(true);
    };

    const handleGenreInputBlur = () => {
        setTimeout(() => setIsGenreInputVisible(false), 100);
    };

    const handleTypeInputChange = (e) => {
        setTypeInput(e.target.value);
        setIsTypeInputVisible(true);
    };

    const handleTypeInputFocus = () => {
        setIsTypeInputVisible(true);
    };

    const handleTypeInputBlur = () => {
        setTimeout(() => setIsTypeInputVisible(false), 100);
    };

  
    const handleEditoraInputChange = (e) => setEditoraInput(e.target.value);
    const handleEditoraInputFocus = () => {
        setIsEditoraInputVisible(true);
    };

    const handleEditoraInputBlur = () => {
        setTimeout(() => setIsEditoraInputVisible(false), 100);
    }; 

    const handlePropInputChange = (e) => {
        setPropInput(e.target.value);
        setIsPropInputVisible(true);
    };

    const handlePropInputFocus = () => {
        setIsPropInputVisible(true);
    };

    const handlePropInputBlur = () => {
        setTimeout(() => setIsPropInputVisible(false), 100);
    };
    
    const handleSave = () => {
        const newId = generateId();
        const goalObject = goals.find((goal) => String(goal.id) === String(selectedGoalId));
    
        const newBook = {
            ...bookData,
            id: newId,
            goal: selectedGoalId,
            goalName: goalObject ? goalObject.name : "Sem meta definida", 
        };
    
        const { startDate, endDate } = bookData;
        const newHighlightedDays = [];
    
        const parsedStartDate = new Date(startDate + "T00:00:00");
        const parsedEndDate = new Date(endDate + "T23:59:59");
    
        if (parsedStartDate > parsedEndDate) {
            alert("Erro: A data de início não pode ser posterior à data de término.");
            return;
        }
    
        for (let d = new Date(parsedStartDate); d <= parsedEndDate; d.setDate(d.getDate() + 1)) {
            newHighlightedDays.push(new Date(d).toLocaleDateString('en-CA'));
        }
    
        addBook(newBook);
    
        const isBookComplete = parseInt(bookData.currentPage) === parseInt(bookData.totalPages);
        if (selectedGoalId) {
            updateGoalBookCount(selectedGoalId, isBookComplete, bookData.name); 
        }
    
        setHighlightedDays((prevDays) => [...prevDays, ...newHighlightedDays]);
    
        resetForm();
    };
    
    const resetForm = () => {
        setBookData({
            id: '',
            image: '',
            name: '',
            author: '',
            genre: '',
            totalPages: '',
            currentPage: '',
            publisher: '',
            isbn: '',
            type: '',
            prop: '',
            file: '',
            rating: '',
            status: '',
            goal: '',
            review: '',
            startDate: '',
            endDate: ''
        });
        setSelectedGoalId('');
    };

    return (
        <div style={{ padding: '20px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', gap: '20px' }}>
                <div className="modal-left">
                    <input
                        type="file"
                        accept="image/*"
                        name="image"
                        onChange={handleChange}
                        required
                        ref={imageInputRef}
                        style={{ display: 'none' }}
                    />
                    <button className="add-image-button" onClick={() => imageInputRef.current.click()}>
                        🖼️ Capa
                    </button>
                    {bookData.image && (
                        <img src={bookData.image} alt="Capa do Livro" style={{ width: '90%', height: 'auto', marginBottom: '10px' }} />
                    )}
                
<input
    className="rating-input"
    type="text"
    placeholder="Nota"
    value={bookData.rating}
    onChange={(e) => setBookData((prevData) => ({ ...prevData, rating: e.target.value }))}
    onFocus={handleRatingInputFocus}
    onKeyDown={(e) => handleOptionSave(e, bookData.rating, ratings, setRatings, 'rating', 'ratingsOptions')}
    onBlur={handleRatingInputBlur}
    style={{ marginBottom: '10px' }}
/>
{isRatingInputVisible && (
    <ul className="rating-list">
        {ratings.map((option, index) => (
            <li
                key={index}
                onClick={() => {
                    setBookData((prevData) => ({ ...prevData, rating: option }));
                    setIsRatingInputVisible(false);
                }}
            >
                {option}
            </li>
        ))}
    </ul>
)}

                
<input
    className="status-input"
    type="text"
    placeholder="Status"
    value={bookData.status}
    onChange={(e) => setBookData((prevData) => ({ ...prevData, status: e.target.value }))}
    onFocus={handleStatusInputFocus}
    onKeyDown={(e) => handleOptionSave(e, bookData.status, statusOptions, setStatusOptions, 'status', 'statusOptions')}
    onBlur={handleStatusInputBlur}
    style={{ marginBottom: '10px' }}
/>
{isStatusInputVisible && (
    <ul className="status-list">
        {statusOptions.map((option, index) => (
            <li
                key={index}
                onClick={() => {
                    setBookData((prevData) => ({ ...prevData, status: option }));
                    setIsStatusInputVisible(false);
                }}
            >
                {option}
            </li>
        ))}
    </ul>
)}

<select value={selectedGoalId} onChange={(e) => setSelectedGoalId(e.target.value)}>
    <option value="">Meta</option>
    {goals.map((goal) => {
        return (
            <option key={goal.id} value={goal.id}>
                {goal.name}
            </option>
        );
    })}
</select>

                </div>

                <div className="modal-right">
                    <input
                        type="text"
                        placeholder="Nome do Livro"
                        name="name"
                        value={bookData.name}
                        onChange={handleChange}
                        style={{ marginBottom: '10px' }}
                    />
                    <input
                        type="text"
                        placeholder="Autor"
                        name="author"
                        value={bookData.author}
                        onChange={handleChange}
                        required
                        style={{ marginBottom: '10px' }}
                    />
                    <div className="input-group">
                        <input
                            type="number"
                            placeholder="Total Páginas"
                            name="totalPages"
                            value={bookData.totalPages}
                            onChange={handleChange}
                            required
                            style={{ marginBottom: '10px', width: '39%' }}
                        />
                        <input
                            type="number"
                            placeholder="Pág. Atual"
                            name="currentPage"
                            value={bookData.currentPage}
                            onChange={handleChange}
                            required
                            style={{ marginBottom: '10px', width: '39%' }}
                        />
                    </div>
                
                  
                    <div className="input-group">
                    <input
    placeholder="Data de Início"
    className="textbox-n"
    type="date" 
    name="startDate"
    value={bookData.startDate}
    onChange={handleChange}
    required
    style={{ marginBottom: '10px', width: '39%' }}
/>
<input
    placeholder="Data de Término"
    className="textbox-n"
    type="date" 
    name="endDate"
    value={bookData.endDate}
    onChange={handleChange}
    required
    style={{ marginBottom: '10px', width: '39%' }}
/>
</div>
<div className="input-group">
<input
    className="editora-input"
    type="text"
    placeholder="Editora"
    value={bookData.publisher}
    onChange={(e) => setBookData((prevData) => ({ ...prevData, publisher: e.target.value }))}
    onFocus={handleEditoraInputFocus}
    onKeyDown={(e) => handleOptionSave(e, bookData.publisher, editoraOptions, setEditoraOptions, 'publisher', 'editoraOptions')}
    onBlur={handleEditoraInputBlur}
    style={{ marginBottom: '10px' }}
/>
{isEditoraInputVisible && (
    <ul className="editora-list">
        {editoraOptions.map((option, index) => (
            <li
                key={index}
                onClick={() => {
                    setBookData((prevData) => ({ ...prevData, publisher: option }));
                    setIsEditoraInputVisible(false);
                }}
            >
                {option}
            </li>
        ))}
    </ul>
)}

                    <input
                        type="text"
                        placeholder="ISBN"
                        name="isbn"
                        value={bookData.isbn}
                        onChange={handleChange}
                        required
                        style={{ marginBottom: '10px',  width: '39%'}}
                    />
                </div>
                
    <input
        className="genre-input"
        type="text"
        placeholder="Gênero"
        value={bookData.genre}
        onChange={(e) => setBookData((prevData) => ({ ...prevData, genre: e.target.value }))}
        onFocus={handleGenreInputFocus}
        onKeyDown={(e) => handleOptionSave(e, bookData.genre, genreOptions, setGenreOptions, 'genre', 'genreOptions')}
        onBlur={handleGenreInputBlur}
        style={{ marginBottom: '10px' }}
    />
    {isGenreInputVisible && (
        <ul className="genre-list">
            {genreOptions.map((option, index) => (
                <li
                    key={index}
                    onClick={() => {
                        setBookData((prevData) => ({ ...prevData, genre: option }));
                        setIsGenreInputVisible(false);
                    }}
                >
                    {option}
                </li>
            ))}
        </ul>
    )}

<input
    className="type-input"
    type="text"
    placeholder="Tipo"
    value={bookData.type}
    onChange={(e) => setBookData((prevData) => ({ ...prevData, type: e.target.value }))}
    onFocus={handleTypeInputFocus}
    onKeyDown={(e) => handleOptionSave(e, bookData.type, typeOptions, setTypeOptions, 'type', 'typeOptions')}
    onBlur={handleTypeInputBlur}
    style={{ marginBottom: '10px' }}
/>
{isTypeInputVisible && (
    <ul className="type-list">
        {typeOptions.map((option, index) => (
            <li
                key={index}
                onClick={() => {
                    setBookData((prevData) => ({ ...prevData, type: option }));
                    setIsTypeInputVisible(false);
                }}
            >
                {option}
            </li>
        ))}
    </ul>
)}
                        
                        <input
    className="prop-input"
    type="text"
    placeholder="Propriedade"
    value={bookData.prop}
    onChange={(e) => setBookData((prevData) => ({ ...prevData, prop: e.target.value }))}
    onFocus={handlePropInputFocus}
    onKeyDown={(e) => handleOptionSave(e, bookData.prop, propOptions, setPropOptions, 'prop', 'propOptions')}
    onBlur={handlePropInputBlur}
    style={{ marginBottom: '10px' }}
/>
{isPropInputVisible && (
    <ul className="prop-list">
        {propOptions.map((option, index) => (
            <li
                key={index}
                onClick={() => {
                    setBookData((prevData) => ({ ...prevData, prop: option }));
                    setIsPropInputVisible(false);
                }}
            >
                {option}
            </li>
        ))}
    </ul>
)}
                      
                   <button
                        className="add-arquivo-button"
                        onClick={handleFileInputClick}
                    >
                        📁 Arquivo
                    </button>
                    <input
                        type="file"
                        accept=".pdf, .epub"
                        name="file"
                        onChange={handleChange}
                        required
                        ref={fileInputRef} 
                        style={{ display: 'none' }} 
                    />
                </div>
            </div>
          
            <textarea
                placeholder="Resenha"
                name="review"
                value={bookData.review}
                onChange={handleChange}
                style={{ marginBottom: '10px', width: '100%' }}
            />
            <button type="button" onClick={handleSave} style={{ marginBottom: '10px', marginLeft: 'auto', display: 'block' }}>Salvar</button>
        </div>
    );
};


export default AddBook;
