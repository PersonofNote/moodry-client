import {useState} from 'react';
import { Grid, IconButton, TextField, Button } from '@mui/material';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import SentimentNeutralIcon from '@mui/icons-material/SentimentNeutral';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';

const MoodEntryModule = ({ handleSubmit, handleChange, noteValue, moodValue }) => {
    const [error, setError] = useState(null);
    return(
    <>
        <Grid item sx={{ mb: 1.25 }}>
        <Grid container>
        <Grid className="text-center" item xs={12}>
            <h2> How are you feeling? </h2>
        </Grid>
        <Grid container justifyContent="center">
            <IconButton 
                className={`icon-button-ams ${parseInt(moodValue.value) === 1 ? 'button-active' : ''}`}
                color="inherit"
                size="large"
                value={1}
                onClick={e => handleChange(e)}>
                <SentimentDissatisfiedIcon
                    strokeWidth={2}
                    style={{ fill: '#FF7171', height: '100%', width: '100%'}}
                />
            </IconButton>
            <IconButton
                className={`icon-button-ams ${parseInt(moodValue.value) === 2 ? 'button-active' : ''}`}
                color="inherit"
                size="large"
                value={2}
                onClick={e => handleChange(e)}>
                <SentimentNeutralIcon
                    strokeWidth={2}
                    style={{ fill: '#FFA666', height: '100%', width: '100%' }}
                />
            </IconButton>
            <IconButton
                className={`icon-button-ams ${parseInt(moodValue.value) === 3 ? 'button-active' : ''}`}
                color="inherit" 
                size="large"
                value={3}
                onClick={e => handleChange(e)}>
                <SentimentSatisfiedAltIcon
                    strokeWidth={2}
                    style={{ fill: '#ACD8AA', height: '100%', width: '100%' }}
                />
            </IconButton>
        </Grid>
        <Grid container justifyContent="center">
        <TextField
            onChange={e => handleChange(e)}
            value={moodValue.note?.length > 0 ? moodValue.note : ''}
            label={"Enter Note (Optional)"}
            name="note"
        /></Grid>
            <Grid sx={{marginTop: '12px'}} container justifyContent="center">
                <Button variant="contained" color="custom" disabled={moodValue === null} onClick={handleSubmit}>Add Mood</Button>
            </Grid>
        </Grid>
        </Grid>
        </>
)
};


export default MoodEntryModule;