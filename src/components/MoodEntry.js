import {useState} from 'react';
import { Grid, IconButton } from '@mui/material';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import SentimentNeutralIcon from '@mui/icons-material/SentimentNeutral';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';

const MoodEntryModule = ({ user, handleMoodClick }) => {
    const [error, setError] = useState(null);

    return(
    <>

<Grid item sx={{ mb: 1.25 }}>
<Grid container xs={12}>
<Grid item xs={12}>
    <h2> How are you feeling? </h2>
</Grid>
<Grid container xs={12} md={6} justifyContent="flex-start">
    <IconButton 
        color="inherit" 
        size="large"
        value={1}
        onClick={handleMoodClick}>
        <SentimentDissatisfiedIcon
            size={48}
            strokeWidth={2}
            color={'red'}
        />
    </IconButton>
            <IconButton 
                color="inherit" 
                size="large"
                value={2}
                onClick={handleMoodClick}>
                <SentimentNeutralIcon
                    size={48}
                    strokeWidth={2}
                    color={'orange'}
                />
            </IconButton>
            <IconButton 
                color="inherit" 
                size="large"
                value={3}
                onClick={handleMoodClick}>
                <SentimentSatisfiedAltIcon
                    size={48}
                    strokeWidth={2}
                    color={'green'}
                />
            </IconButton>
</Grid>
</Grid>
</Grid>
</>
)
};


export default MoodEntryModule;