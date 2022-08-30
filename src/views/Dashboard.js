import { useEffect, useState } from 'react';
import { API } from 'aws-amplify';
import { errorMessages, moodTextMapping, moodColors } from '../constants'
import { listMoods } from '../graphql/queries';
import * as mutations from '../graphql/mutations';
import MoodEntryModule from '../components/MoodEntry'
import '../styles/dashboard.css';

// MUI
import { Grid, Button, Box } from '@mui/material';

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
        // TODO: finish sorting data by timestamp; currently causing a re-render for each iteration.
        // Need to process without hitting UseEffect every time. Will this need a backend-as-middleware?
        /*
        console.log(apiData.data.listMoods.items.length)
        const filteredData = (apiData.data.listMoods.items.filter(item => !item._deleted))
        console.log(filteredData)
        const sortedData = filteredData.sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt))
        console.log(sortedData)
        */
        setMoods(renderMood(apiData.data.listMoods.items))
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
        setNoteValue('')
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
                _version: dataArr[1]
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
      }, [handleMoodClick, handleDeleteMood]);
  

    const renderMood = (moodsList) => {
        // MOOD KEYS: {id, value, note, usersID, createdAt, updatedAt, _version, _deleted, _lastChangedAt}
        const moodsArray = Object.keys(moodsList).map(key => {
            const { id, value, note, createdAt, _version, _deleted } = moodsList[key];
            if (_deleted) {
                return null
            }
            const date = new Date(createdAt).toDateString()
            return <Box className="box-item-ams" sx={{display: `flex`}} value={`moods-${key}`}><Box sx={{width: `33%`}}>{date}</Box> <Box sx={{color: `${moodColors[value]}`, width: `90px`}} className='box-item-ams'> {moodTextMapping[value]}</Box> <Box sx={{width: `45%`}} className='box-item-ams'>{note} </Box> <Box className='box-item-ams'> <Button onClick={handleDeleteMood} value={[id, _version]}>Delete</Button> </Box></Box>
        });
        console.log(moodsArray)
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
            {moods}
        </div>
        )}
        {error && (
            <div>{error}</div>
        )}
        </div>
        <div className="ad">Ad goes here for non-premium users</div>
    </main>
  );
}

export default Dashboard;
