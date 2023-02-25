import { useEffect, useState, useCallback } from 'react';
import { errorMessages, moodTextMapping, moodColors, moodIconMapping } from '../constants'
import { format } from 'date-fns'
import { Logger } from 'aws-amplify';
import { Routes, Route, Link, Navigate } from 'react-router-dom';


import '../styles/dashboard.css';

// Components
import MoodEntryModule from '../components/MoodEntry';
import Loader from '../components/Loader';
import D3LineChart from '../components/D3LineChart';
import DateFilters from '../components/DateFilters';

// MUI
import { Button, Box, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

const logger = new Logger('foo');

const api_url = process.env.NODE_ENV === 'development' ? 'https://xk5wizjyfh.execute-api.us-east-1.amazonaws.com/prod/' : 'https://xk5wizjyfh.execute-api.us-east-1.amazonaws.com/prod/'

// TODO: Extract moods list to its own page so it's not tied to the moods data
function Dashboard({user}) {
    const initialMoodState = {
        value: null,
        note: null,
        user_id: user?.id
    }
    
    const [moods, setMoods] = useState([]);
    const [lineChartData, setLineChartData] = useState([]);
    const [dateRange, setDateRange] = useState({
        startDate: null,
        endDate: null
    })
    const [showMoods, setShowMoods] = useState(false)
    const [moodValue, setMoodValue] = useState(initialMoodState)
    const [loading, setLoading] = useState(true);
    const [ error, setError] = useState(null);

    const updateMoodData = e => {
        if (e.target.name === 'note'){
            setMoodValue({...moodValue, note: e.target.value})
        }else{
            setMoodValue({...moodValue, value: e.currentTarget.value})
        }
    }
    const fetchMoods = useCallback(async () => {
        setLoading(true);
        try {
            fetch(`${api_url}api/moods?${new URLSearchParams({
                user_id: user?.id
            })}`)
            .then(response => response.json())
            .then(res => {
                setMoods(res.message, setLoading(false))
            })
        }
        catch (error) {
            console.log('error', error);
        }
    }, [])
    
    const handleSubmit = async e => {
        setLoading(true)
        try {   
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(moodValue)
            };
            fetch(`${api_url}api/moods`, requestOptions)
            .then(response => response.json())
            .then(res => {
                res.message?.errors && setError(res.message.errors.value.message)
                setMoodValue(initialMoodState, fetchMoods())
            })
            setLoading(false)
        }
        catch (error) {
            setError(error)
            console.log('error', error);
        }
    }

        
    const handleAddNote = async e => {
        setLoading(true)
        const noteValue = {
            id: e.currentTarget.value,
            note: moodValue?.note
        }
        try {   
            const requestOptions = {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(noteValue)
            };
            logger.debug(`User ${user.username} posted data`)
            fetch(`${api_url}api/moods`, requestOptions)
            .then(response => response.json())
            .then(res => {
                setMoodValue(initialMoodState, fetchMoods())
            })
            setLoading(false)
        }
        catch (error) {
            console.log('error', error);
        }
    }


    const handleDeleteMood = async e => {
        try {
            const moodData = {
                "id": e.currentTarget.value,
            }
            const requestOptions = {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(moodData)
            };
            
            fetch(`${api_url}api/moods`, requestOptions)
            .then(response => response.json())
            .then(res => {
                fetchMoods();
            })            
            }
            catch (error) {
                console.log('error', error);     
            }
        }

    useEffect(() => {
        fetchMoods();
      },[]);

  
    // Break out into new component or nah?
    const renderMood = (moodsList) => {
        const moodsArray = Object.keys(moodsList).map((key, index) => {
            const { _id, value, note, createdAt } = moodsList[key];
            const Icon = moodIconMapping[value]
            const date = createdAt ? format(new Date(createdAt), 'MM/dd h:m aaaa') : "Test";
            return <Box key={`${index}`} className="box-container-ams" sx={{display: `flex`, borderBottom: `1px solid gray`}} value={`moods-${key}`}>
                <Box sx={{width: `20%`}}>{date}</Box> <Box sx={{color: `${moodColors[value]}`}} className='box-item-ams'>
                    <svg width='32px' viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="50" cy="50" r="50" fill={moodColors[value]}/>
                    </svg> 
                </Box> 
                <Box sx={{width: `55%`}} className='box-item-ams'>
                    {note ? <div style={{paddingLeft: `1rem`}}>{note}</div> : 
                    <div style={{display: 'flex', paddingLeft: `8px`}}>
                    <TextField
                        label={"Enter Note (Optional)"}
                        size="small"
                        name="note"
                        onChange={updateMoodData}
                    /> 
                    <Button value={_id} variant="outlined" onClick={handleAddNote}><AddIcon /></Button>
                    </div>
                    } 
                    </Box> 
                    <Box className='box-item-ams'> 
                        <Button color="primary" variant="contained" onClick={handleDeleteMood} value={_id}>
                            <DeleteIcon />
                        </Button> 
                    </Box>
                </Box>
        });
        return moodsArray;
    }

    const moodsList = renderMood(moods);


    if (!user) {
        return <Navigate to="/signin" replace />;
      }
    
    return (
    <main>
        <div className="content">
            <MoodEntryModule user={user} handleSubmit={handleSubmit} handleChange={updateMoodData} moodValue={moodValue} loading={loading}/>
        <div className='error-message'>{error}</div>
        {moodsList.length > 0 && !loading ? (
        <Button onClick={() => setShowMoods(!showMoods)}>{showMoods ? "Hide mood list" : "Show mood list"}</Button>
        ) :
           loading ? <Loader /> : <p>There's nothing here - add some data to see charts</p> 
        }
        {showMoods &&(
        <>
        <div className="moods-list">
            {moodsList}
        </div>
        </>
        )}
        <br/>
        {moods && moods != undefined && moods.length > 0 &&(
            <>
            <h1> GRAPHS</h1>
            <div className="line-chart-container">
                <DateFilters data={moods} setFilteredData={setLineChartData} setDateRange={setDateRange} />
                <D3LineChart data={lineChartData.length ? lineChartData : moods} dateRange={dateRange ? dateRange : null} />
            </div>
            {/*
                <LineChart1 moodData={moods.slice(12,moods.length)} />
            */}
            </>
        )
        }
        </div>
        {user?.role !== 'premium' && (
            <div className="ad">Ad goes here for non-premium users</div>
        )}
    </main>
  );
  

}

export default Dashboard;
