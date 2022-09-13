import { useEffect, useState, useCallback } from 'react';
import { errorMessages, moodTextMapping, moodColors } from '../constants'
import { format } from 'date-fns'

// API functions
import { API } from 'aws-amplify';
import { listMoods } from '../graphql/queries';
import * as mutations from '../graphql/mutations';

import '../styles/dashboard.css';

// Components
import MoodEntryModule from '../components/MoodEntry'
import MoodLineChart from '../components/LineChart';
import Error from '../components/Error';

// MUI
import { Button, Box } from '@mui/material';

function Dashboard({user}) {
    const [error, setError] = useState(null);
    const [moods, setMoods] = useState([]);
    const [showMoods, setShowMoods] = useState(false)
    const [noteValue, setNoteValue] = useState('')

    const onNoteChange = e => {
        console.log(e.target.value)
        setNoteValue(e.target.value);
    }

    const fetchMoods = async () => {
        try {
        const apiData = await API.graphql({ query: listMoods });
        const sorted = apiData.data.listMoods.items.sort((a, b) => (Date.parse(b.createdAt) > Date.parse(a.createdAt)) ? 1 : -1)
        console.log(sorted)
        //const valueMemoized = useMemo(() => computeExpensiveValue(a, b), [a, b])
        setMoods(sorted)
    }   
    catch (error) {
        console.log('error', error);
        setError(error.errors[0].message)
    }   
    }
    
    const handleMoodClick = async e => {
        try { 
        const moodData = {value: e.currentTarget.value, note: noteValue, usersID: user.username }
        addMood(moodData)
        setMoods([...moods, moodData])
        setNoteValue('')
        fetchMoods()
        }
        catch (error) {
            console.log('error', error);
            setError(errorMessages[error.name])
        }
    }

    const handleDeleteMood = async e => {
        try {
            const dataArr = e.currentTarget.value.split(",")
            const moodData = {
                id: dataArr[0],
            }
            deleteMood(moodData)
            }
            catch (error) {
                console.log('error', error);
                setError(errorMessages[error.name])
            }
    }
   
    useEffect(() => {
        fetchMoods();
      }, [moods]);
  

    const renderMood = (moodsList) => {
        // MOOD KEYS: {id, value, note, usersID, createdAt, updatedAt}
        const moodsArray = Object.keys(moodsList).map((key, index) => {
            const { id, value, note, createdAt } = moodsList[key];
            const date = createdAt ? format(new Date(createdAt), 'yyyy-MM-dd h:m:s aaaa') : "Test";
            return <Box key={`${index}`} className="box-item-ams" sx={{display: `flex`, borderBottom: `1px solid gray`}} value={`moods-${key}`}><Box sx={{width: `33%`}}>{date}</Box> <Box sx={{color: `${moodColors[value]}`, width: `90px`}} className='box-item-ams'> {moodTextMapping[value]}</Box> <Box sx={{width: `45%`}} className='box-item-ams'>{note} </Box> <Box className='box-item-ams'> <Button onClick={handleDeleteMood} value={[id]}>Delete</Button> </Box></Box>
        });
        return moodsArray;
    }
    
    const addMood = async(moodData) => await API.graphql({ query: mutations.createMoods, variables: {input: moodData}});
    const deleteMood = async(moodData) => await API.graphql({ query: mutations.deleteMoods, variables: {input: moodData}});

  return (
    <main>
        <div className="content">
        <MoodEntryModule user={user} handleMoodClick={handleMoodClick} handleNote={onNoteChange} noteValue={noteValue}/>
        <Button onClick={() => setShowMoods(!showMoods)}>{showMoods ? "Hide mood list" : "Show mood list"}</Button>
        {showMoods &&(
        <div className="moods-list">
            {renderMood(moods)}
        </div>
        )}
        <br/>
        <h2>Below this line is experimental stuff</h2>
        <div className="chart-container">
            <MoodLineChart />
        </div>
        {error && (
            <div>{error}</div>
        )}
        </div>
        <div className="ad">Ad goes here for non-premium users</div>
    </main>
  );
}

export default Dashboard;
