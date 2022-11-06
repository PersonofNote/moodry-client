import { Link } from 'react-router-dom';
import MoodryLogo from './logo.svg'
import '../App.css'
import '../styles/utilities.css'

// Material components
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';

const Header = ({user, setUser}) => {

    const handleLogout = () => {
        localStorage.removeItem('moodryUser')
        setUser(null);
    }

    return (
        <header>
           <nav>
            <div className="flex align-center">
                <img className='logo-icon' src={MoodryLogo} alt="Moodry Logo" /> 
                <Link to="/dashboard">Dashboard</Link>
            </div>
                {user && <Button onClick={handleLogout}>Sign Out</Button>}
            </nav>
        </header>
    )
}

export default Header;
