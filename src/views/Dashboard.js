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
import MoodLineChart from '../components/MoodLineChart';
import SampleChart from '../components/LineChart';
import Error from '../components/Error';

// MUI
import { Button, Box, TextField } from '@mui/material';

function Dashboard({user}) {
    const [error, setError] = useState(null);
    const [moods, setMoods] = useState([]);
    const [showMoods, setShowMoods] = useState(false)
    const [moodValue, setMoodValue] = useState(null)
    const [noteValue, setNoteValue] = useState('')
    const [loading, setLoading] = useState(true);

    const updateMoodData = e => {
        if (e.target.name === 'note'){
            setNoteValue(e.target.value)
            console.log("NOTE" + noteValue)
        }else{
            setMoodValue(e.currentTarget.value)
            console.log("MOOD" + moodValue)
        }
    }

    const fetchMoods = useCallback(async () => {
        try {
        const apiData = await API.graphql({ query: listMoods });
        const sorted = apiData.data.listMoods.items.sort((a, b) => (Date.parse(b.createdAt) > Date.parse(a.createdAt)) ? 1 : -1)
        //const valueMemoized = useMemo(() => computeExpensiveValue(a, b), [a, b])
        setMoods(sorted)
        setLoading(false)
    }   
    catch (error) {
        console.log('error', error);
        setError(error.errors[0].message)
    }   
    }, [])
    
    const handleMoodClick = async e => {
        setLoading(true)
        try { 
            const moodData = {value: moodValue, note: noteValue, usersID: user.username }
            const newMood = await addMood(moodData)
            // Todo: if possible, reduce a fetch here by faking it. The spread operator should be enough
            // to visually add, but it's not working for some reason.
            fetchMoods()
            setLoading(false)
        }
        catch (error) {
            console.log('error', error);
            setError(errorMessages[error.name])
        }
    }

        
    const handleAddNote = async e => {
        // TODO: add blur/focus to keep the note input to just its own textbox
        if (noteValue.length > 0) {
            try { 
                const moodData = {
                    id: e.currentTarget.value,
                    note: noteValue
                }
                const newMood = await addNote(moodData)
                setNoteValue("")
                fetchMoods()
            }catch (error) {
                console.log('error', error);
                setError(errorMessages[error.name])
            }
        }else{
            setError("Note cannot be empty")
        }
    }


    const handleDeleteMood = async e => {
        try {
            const dataArr = e.currentTarget.value.split(",")
            const moodData = {
                id: dataArr[0],
            }
            deleteMood(moodData)
            // Visually remove from list to reduce fetching
            const newMoodList = moods.filter(m => m.id != moodData.id);
            setMoods(newMoodList);
            }
            catch (error) {
                console.log('error', error);
                setError(errorMessages[error.name])
            }
    }

    useEffect(() => {
        fetchMoods();
      },[]);
  
    // Break out into new component or nah?
    const renderMood = (moodsList) => {
        // MOOD KEYS: {id, value, note, usersID, createdAt, updatedAt}
        const moodsArray = Object.keys(moodsList).map((key, index) => {
            const { id, value, note, createdAt } = moodsList[key];
            const date = createdAt ? format(new Date(createdAt), 'yyyy-MM-dd h:m:s aaaa') : "Test";
            return <Box key={`${index}`} className="box-item-ams" sx={{display: `flex`, borderBottom: `1px solid gray`}} value={`moods-${key}`}>
                <Box sx={{width: `33%`}}>{date}</Box> <Box sx={{color: `${moodColors[value]}`, width: `60px`}} className='box-item-ams'> {moodTextMapping[value]}</Box> 
                <Box sx={{width: `45%`}} className='box-item-ams'>
                {note ? note : <>
                <TextField
                label={"Enter Note (Optional)"}
                size="small"
                name="note"
                onChange={updateMoodData}
                /> 
            <Button value={id} variant="contained" onClick={handleAddNote}>Add&nbsp;Note</Button>
            </>} 
            </Box> <Box className='box-item-ams'> <Button onClick={handleDeleteMood} value={[id]}>Delete</Button> </Box></Box>
        });
        return moodsArray;
    }

    const moodsList = renderMood(moods);
    
    const addMood = async(moodData) => await API.graphql({ query: mutations.createMoods, variables: {input: moodData}});
    const deleteMood = async(moodData) => await API.graphql({ query: mutations.deleteMoods, variables: {input: moodData}});
    const addNote = async(moodData) => await API.graphql({query: mutations.updateMoods, variables: {input: moodData}})
  
    return (
    <main>
        <div className="content">
            {!loading &&
                <MoodEntryModule user={user} handleMoodClick={handleMoodClick} handleChange={updateMoodData} noteValue={noteValue}/>
            }
        <Button onClick={() => setShowMoods(!showMoods)}>{showMoods ? "Hide mood list" : "Show mood list"}</Button>
        {showMoods &&(
        <div className="moods-list">
            {moodsList}
        </div>
        )}
        <br/>
        <h2>Below this line is experimental stuff</h2>
        <div className="chart-container">
            <MoodLineChart moodData={moods} />
        </div>
        <div className="chart-container">
            <SampleChart />
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
