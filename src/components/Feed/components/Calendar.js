import React, { useState } from 'react';

const Calendar = ({ highlightedDays }) => {
    const [currentDate, setCurrentDate] = useState(new Date());

    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();

    const getDaysInMonth = (month, year) => {
        const days = [];
        const lastDate = new Date(year, month + 1, 0).getDate();
        for (let i = 1; i <= lastDate; i++) {
            days.push(new Date(year, month, i));
        }
        return days;
    };

    const getDaysOfWeek = () => ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];

    const renderDay = (day) => {
        const dateString = day.toISOString().split('T')[0]; // Formato YYYY-MM-DD
        const isHighlighted = highlightedDays.includes(dateString);
        
        const dayClass = isHighlighted ? 'highlighted-day' : 'regular-day';
        const weekendClass = (day.getDay() === 0 || day.getDay() === 6) ? 'weekend-day' : '';

        return (
            <div key={dateString} className={`${dayClass} ${weekendClass}`}>
                {day.getDate()}
            </div>
        );
    };

    const handlePrevMonth = () => {
        setCurrentDate(new Date(year, month - 1));
    };

    const handleNextMonth = () => {
        setCurrentDate(new Date(year, month + 1));
    };

    const fillEmptyDays = (days) => {
        const firstDayOfMonth = new Date(year, month, 1).getDay();
        const emptyDays = Array.from({ length: firstDayOfMonth }).fill(null);
        return [...emptyDays, ...days];
    };

    const daysInMonth = fillEmptyDays(getDaysInMonth(month, year));
    const daysOfWeek = getDaysOfWeek();

    return (
        <div className="calendar-container">
            <div className="calendar-header">
                <button onClick={handlePrevMonth} className="nav-button">{"<"}</button>
                <h2>{`${currentDate.toLocaleString('default', { month: 'long' })} ${year}`}</h2>
                <button onClick={handleNextMonth} className="nav-button">{">"}</button>
            </div>
            <div className="days-of-week">
                {daysOfWeek.map((day) => (
                    <div key={day} className="day-of-week">{day}</div>
                ))}
            </div>
            <div className="days-container">
                {daysInMonth.map((day, index) => (
                    day ? renderDay(day) : <div key={index} className="regular-day"> </div>
                ))}
            </div>
        </div>
    );
};

export default Calendar;
