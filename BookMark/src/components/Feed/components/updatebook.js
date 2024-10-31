import React, { useState, useRef, useEffect } from 'react';

const UpdateBook = ({ book, onUpdate, onDelete, onClose, goals = [] }) => {
    const [updatedBook, setUpdatedBook] = useState({ ...book });
    const [selectedGoalId, setSelectedGoalId] = useState(updatedBook.goal || '');
    const fileInputRef = useRef(null);
    const imageInputRef = useRef(null);

    const [isRatingInputVisible, setIsRatingInputVisible] = useState(false);
    const [isStatusInputVisible, setIsStatusInputVisible] = useState(false);
    const [isGenreInputVisible, setIsGenreInputVisible] = useState(false);
    const [isTypeInputVisible, setIsTypeInputVisible] = useState(false);
    const [isPropInputVisible, setIsPropInputVisible] = useState(false);
    const [isEditoraInputVisible, setIsEditoraInputVisible] = useState(false);

    const [ratingInput, setRatingInput] = useState('');
    const [statusInput, setStatusInput] = useState('');
    const [genreInput, setGenreInput] = useState('');
    const [typeInput, setTypeInput] = useState('');
    const [propInput, setPropInput] = useState('');
    const [editoraInput, setEditoraInput] = useState('');

 
    const [ratings, setRatings] = useState([]);
    const [statusOptions, setStatusOptions] = useState([]);
    const [genreOptions, setGenreOptions] = useState([]);
    const [typeOptions, setTypeOptions] = useState([]);
    const [propOptions, setPropOptions] = useState([]);
    const [editoraOptions, setEditoraOptions] = useState([]);

    useEffect(() => {
        const savedRatings = JSON.parse(localStorage.getItem('ratingsOptions')) || ['1', '2', '3', '4', '5'];
        setRatings(savedRatings);

        const savedStatusOptions = JSON.parse(localStorage.getItem('statusOptions')) || ['Lendo', 'Lido', 'Ler', 'Abandonado'];
        setStatusOptions(savedStatusOptions);

        const savedGenres = JSON.parse(localStorage.getItem('genreOptions')) || ['Ficção', 'Não-ficção'];
        setGenreOptions(savedGenres);

        const savedTypes = JSON.parse(localStorage.getItem('typeOptions')) || ['Físico', 'Kindle'];
        setTypeOptions(savedTypes);

        const savedProps = JSON.parse(localStorage.getItem('propOptions')) || ['Pessoal', 'Emprestado'];
        setPropOptions(savedProps);

        const savedEditoras = JSON.parse(localStorage.getItem('editoraOptions')) || ['Intrínseca', 'Seguinte', 'Rocco'];
        setEditoraOptions(savedEditoras);
    }, []);

    useEffect(() => {
        if (book.goal) {
            setSelectedGoalId(book.goal);
        } else {
            setSelectedGoalId(''); 
        }
    }, [book]);

    const handleSave = () => {
        const { startDate, endDate } = updatedBook;
        const newHighlightedDays = [];
    
        const parsedStartDate = new Date(startDate + 'T00:00:00');
        const parsedEndDate = new Date(endDate + 'T23:59:59');
    
        if (parsedStartDate > parsedEndDate) {
            console.error('Start date is after end date');
            return;
        }
    
        for (let d = new Date(parsedStartDate); d <= parsedEndDate; d.setDate(d.getDate() + 1)) {
            newHighlightedDays.push(new Date(d).toLocaleDateString('en-CA'));
        }
    
        onUpdate({...updatedBook, goal: selectedGoalId }, newHighlightedDays);
        onClose();
    };

    const handleFileInputClick = () => {
        fileInputRef.current.click();
    };

    const handleDelete = () => {
        onDelete(book.id);
        onClose();
    };
 
    
    const handleGoalChange = (e) => {
        const selectedId = e.target.value;
        setSelectedGoalId(selectedId);
        setUpdatedBook((prev) => ({ ...prev, goal: selectedId }));
    };


    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setUpdatedBook((prevData) => ({ ...prevData, image: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedBook((prev) => ({ ...prev, [name]: value }));
    };
    const handleOptionSave = (e, input, options, setOptions, key, storageKey) => {
        if (e.key === 'Enter') {
            const newValue = input.trim();
            if (newValue && !options.includes(newValue)) {
                const updatedOptions = [...options, newValue];
                setOptions(updatedOptions);
                setUpdatedBook((prevData) => ({ ...prevData, [key]: newValue })); 
                localStorage.setItem(storageKey, JSON.stringify(updatedOptions));
            }
            e.preventDefault();
        }
    };
    
    return (
        <div className="modal">
            <div className="modal-content">
                <button className="modal-close" onClick={onClose}>X</button>
                <div className="modal-left">
                    <input
                        type="file"
                        accept="image/*"
                        name="image"
                        onChange={handleImageChange}
                        required
                        ref={imageInputRef}
                        style={{ display: 'none' }}
                    />
                    <button className="add-image-button" onClick={() => imageInputRef.current.click()}>
                        🖼️ Capa
                    </button>
                    {updatedBook.image && (
                        <img src={updatedBook.image} alt="Capa do Livro" style={{ width: '90%', height: 'auto', marginBottom: '10px' }} />
                    )}
                   {/* Rating input */}
<input
    className="rating-input"
    type="text"
    placeholder="Nota"
    value={updatedBook.rating}
    onChange={(e) => setUpdatedBook((prevData) => ({ ...prevData, rating: e.target.value }))}
    onFocus={() => setIsRatingInputVisible(true)}
    onBlur={() => setTimeout(() => setIsRatingInputVisible(false), 100)}
    onKeyDown={(e) => handleOptionSave(e, updatedBook.rating, ratings, setRatings, 'rating', 'ratingsOptions')}
    style={{ marginBottom: '10px' }}
/>
{isRatingInputVisible && (
    <ul className="rating-list">
        {ratings.map((option, index) => (
            <li
                key={index}
                onClick={() => {
                    setUpdatedBook((prevData) => ({ ...prevData, rating: option }));
                    setIsRatingInputVisible(false);
                }}
            >
                {option}
            </li>
        ))}
    </ul>
)}

                    {/* Example: Status Input */}
                    <input
                        className="status-input"
                        type="text"
                        placeholder="Status"
                        value={updatedBook.status}
                        onChange={(e) => setUpdatedBook((prevData) => ({ ...prevData, status: e.target.value }))}
                        onFocus={() => setIsStatusInputVisible(true)}
                        onBlur={() => setTimeout(() => setIsStatusInputVisible(false), 100)}
                        onKeyDown={(e) => handleOptionSave(e, updatedBook.status, statusOptions, setStatusOptions, 'status', 'statusOptions')}
                        style={{ marginBottom: '10px' }}
                    />
                    {isStatusInputVisible && (
                        <ul className="status-list">
                            {statusOptions.map((option, index) => (
                                <li
                                    key={index}
                                    onClick={() => {
                                        setUpdatedBook((prevData) => ({ ...prevData, status: option }));
                                        setStatusInput(option);
                                        setIsStatusInputVisible(false);
                                    }}
                                >
                                    {option}
                                </li>
                            ))}
                        </ul>
                    )}
                       <label>Meta:
    <select value={selectedGoalId} onChange={handleGoalChange} style={{ marginBottom: '10px', width: '100%' }}>
        <option value="">Selecione uma Meta</option>
        {goals.map((goal) => (
            <option key={goal.id} value={goal.id}>
                {goal.name}
            </option>
        ))}
    </select>
</label>

        </div>
        <div className="modal-right">
                    {/* Text Inputs */}
                    <label>Nome:
                        <input
                            type="text"
                            name="name"
                            placeholder="Nome do Livro"
                            value={updatedBook.name}
                            onChange={(e) => setUpdatedBook({ ...updatedBook, name: e.target.value })}
                            style={{ marginBottom: '10px' }}
                        />
                    </label>

                    <label>Autor:
                        <input
                            type="text"
                            name="author"
                            placeholder="Autor"
                            value={updatedBook.author}
                            onChange={(e) => setUpdatedBook({ ...updatedBook, author: e.target.value })}
                            style={{ marginBottom: '10px' }}
                        />
                    </label>

                    {/* Number Inputs */}
                    <div className="input-group">
                        <label>Páginas atuais:
                            <input
                                type="number"
                                name="currentPage"
                                value={updatedBook.currentPage}
                                onChange={(e) => setUpdatedBook({ ...updatedBook, currentPage: e.target.value })}
                                style={{ marginBottom: '10px', width: '75%' }}
                            />
                        </label>
                        <label>Páginas totais:
                            <input
                                type="number"
                                name="totalPages"
                                value={updatedBook.totalPages}
                                onChange={(e) => setUpdatedBook({ ...updatedBook, totalPages: e.target.value })}
                                style={{ marginBottom: '10px', width: '75%' }}
                            />
                        </label>
                    </div>

                    {/* Date Inputs */}
                    <div className="input-group">
                        <label>Data de início:
                            <input
                                type="date"
                                name="startDate"
                                value={updatedBook.startDate}
                                onChange={(e) => setUpdatedBook({ ...updatedBook, startDate: e.target.value })}
                                style={{ marginBottom: '10px', width: '75%' }}
                            />
                        </label>
                        <label>Data de término:
                            <input
                                type="date"
                                name="endDate"
                                value={updatedBook.endDate}
                                onChange={(e) => setUpdatedBook({ ...updatedBook, endDate: e.target.value })}
                                style={{ marginBottom: '10px', width: '75%' }}
                            />
                        </label>
                    </div>

                    <div className="input-group">
         {/* Dropdown-like Inputs */}
         <input
                        className="editora-input"
                        type="text"
                        placeholder="Editora"
                        value={updatedBook.publisher}
                        onChange={(e) => setUpdatedBook({ ...updatedBook, publisher: e.target.value })}
                        onFocus={() => setIsEditoraInputVisible(true)}
                        onBlur={() => setTimeout(() => setIsEditoraInputVisible(false), 100)}
                        onKeyDown={(e) => handleOptionSave(e, updatedBook.publisher, editoraOptions, setEditoraOptions, 'publisher', 'editoraOptions')}
                        style={{ marginBottom: '10px' }}
                    />
                    {isEditoraInputVisible && (
                        <ul className="editora-list">
                            {editoraOptions.map((option, index) => (
                                <li
                                    key={index}
                                    onClick={() => {
                                        setUpdatedBook((prevData) => ({ ...prevData, publisher: option }));
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
                        value={updatedBook.isbn}
                        onChange={handleChange}
                        required
                        style={{ marginBottom: '10px',  width: '50%'}}
                    />
                </div>
                <div className="input-group">
                <input
    className="genre-input"
    type="text"
    placeholder="Gênero"
    value={updatedBook.genre} 
    onChange={(e) => setUpdatedBook((prevData) => ({ ...prevData, genre: e.target.value }))} 
    onFocus={() => setIsGenreInputVisible(true)}
    onBlur={() => setTimeout(() => setIsGenreInputVisible(false), 100)}
    onKeyDown={(e) => handleOptionSave(e, updatedBook.genre, genreOptions, setGenreOptions, 'genre', 'genreOptions')}
    style={{ marginBottom: '10px' }}
/>
{isGenreInputVisible && (
    <ul className="genre-list">
        {genreOptions.map((option, index) => (
            <li
                key={index}
                onClick={() => {
                    setUpdatedBook((prevData) => ({ ...prevData, genre: option })); 
                    setIsGenreInputVisible(false);
                }}
            >
                {option}
            </li>
        ))}
    </ul>
)}</div>
   <div className="input-group">
<input
    className="type-input"
    type="text"
    placeholder="Tipo"
    value={updatedBook.type}
    onChange={(e) => setUpdatedBook((prevData) => ({ ...prevData, type: e.target.value }))}
    onFocus={() => setIsTypeInputVisible(true)}
    onBlur={() => setTimeout(() => setIsTypeInputVisible(false), 100)}
    onKeyDown={(e) => handleOptionSave(e, updatedBook.type, typeOptions, setTypeOptions, 'type', 'typeOptions')}
    style={{ marginBottom: '10px' }}
/>
{isTypeInputVisible && (
    <ul className="type-list">
        {typeOptions.map((option, index) => (
            <li
                key={index}
                onClick={() => {
                    setUpdatedBook((prevData) => ({ ...prevData, type: option }));
                    setIsTypeInputVisible(false);
                }}
            >
                {option}
            </li>
        ))}
    </ul>
)}
</div>
<div className="input-group">
<input
    className="prop-input"
    type="text"
    placeholder="Propriedade"
    value={updatedBook.prop}
    onChange={(e) => setUpdatedBook((prevData) => ({ ...prevData, prop: e.target.value }))}
    onFocus={() => setIsPropInputVisible(true)}
    onBlur={() => setTimeout(() => setIsPropInputVisible(false), 100)}
    onKeyDown={(e) => handleOptionSave(e, updatedBook.prop, propOptions, setPropOptions, 'prop', 'propOptions')}
    style={{ marginBottom: '10px' }}
/>
{isPropInputVisible && (
    <ul className="prop-list">
        {propOptions.map((option, index) => (
            <li
                key={index}
                onClick={() => {
                    setUpdatedBook((prevData) => ({ ...prevData, prop: option }));
                    setIsPropInputVisible(false);
                }}
            >
                {option}
            </li>
        ))}
    </ul>
)}
</div>
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
    ref={fileInputRef}
    style={{ display: 'none' }}
/>

<textarea
    placeholder="Resenha"
    name="review"
    value={updatedBook.review}
    onChange={handleChange}
    style={{ marginBottom: '10px', width: '100%' }}
/>

<div className="input-group">
    <button onClick={handleDelete} style={{ marginBottom: '10px', marginLeft: 'auto', display: 'block' }}>Deletar</button>
    <button onClick={handleSave} style={{ marginBottom: '10px', marginLeft: 'auto', display: 'block' }}>Salvar</button>
</div>
         </div> 
         </div>
    
   </div>
  );
};

export default UpdateBook;