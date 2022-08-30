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
    const [noteValue, setNoteValue] = useState(null)

    const onNoteChange = e => {
        console.log(e.target.value)
        setNoteValue(e.target.value);
    }

    const fetchMoods = async () => {
        try {
        const apiData = await API.graphql({ query: listMoods });
        // TODO: finish sorting data by timestamp; currently causing a re-render for each iteration.
        // Need to process without hitting UseEffect every time
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
            return <Box sx={{display: `flex`}} value={`moods-${key}`}><Box sx={{width: `33%`}}>{createdAt}:</Box> <Box sx={{color: `${moodColors[value]}`}} className='box-item-ams'> {moodTextMapping[value]}</Box> <Box sx={{width: `40%`}} className='box-item-ams' item>{note} </Box> <Box className='box-item-ams'> <Button onClick={handleDeleteMood} value={[id, _version]}>Delete</Button> </Box></Box>
        });
        return moodsArray;
    }
    
    const addMood = async(moodData) => await API.graphql({ query: mutations.createMoods, variables: {input: moodData}});
    const deleteMood = async(moodData) => await API.graphql({ query: mutations.deleteMoods, variables: {input: moodData}});

  return (
    <main>
        <div className="content">
        <MoodEntryModule user={user} handleMoodClick={handleMoodClick} handleNote={onNoteChange} noteValue={noteValue}/>
        <ul className="moods-list">
            {moods}
        </ul>
        {error && (
            <div>{error}</div>
        )}
        </div>
        <div className="ad">Ad goes here for non-premium users</div>
    </main>
  );
}

export default Dashboard;
