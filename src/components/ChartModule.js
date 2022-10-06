import { useEffect, useState, useCallback } from 'react';
import { format, subDays, isAfter, isBefore, parseISO  } from 'date-fns'


import '../styles/dashboard.css';

// Components
import MoodLineChart from '../components/MoodLineChart';
// MUI
import { Button } from '@mui/material';

const timeFrames = [{name : "day", val: 1}, {name: "week", val: 7}, {name: "month", val: 30}, {name: "year", val: 365} ]

function LineChartModule({data, loading}) {
    const [error, setError] = useState(null);
    const [filteredData, setFilteredData] = useState(data)

    const handleClick = e => {
        const now = new Date();
        const then = subDays(now, e.target.value)
        setFilteredData(data.filter(d => { 
            const date = parseISO(d.createdAt)
            return isAfter(date, then) && isBefore(date, now)
        }))
    }


    const buttonGroup = timeFrames.map((t, index) => (
        <Button onClick={handleClick} key={index} value={t.val}>{t.name}</Button>
    ))
    return(
        <div>
            <div> Show by:</div>
            <div className="button-container">{buttonGroup}</div>
            <div className="chart-container">
            {!loading && (
                <MoodLineChart moodData={filteredData}/>
            )}
            </div>
        </div>
    )
}

export default LineChartModule;
