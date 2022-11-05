import { Link } from 'react-router-dom';
import MoodryLogo from './logo.svg'
import '../App.css'

// Material components
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';

const Header = ({user, setUser}) => {

    const handleLogout = () => setUser(null);

    return (
        <header>
           <nav>
                <img className='logo-icon' src={MoodryLogo} alt="Moodry Logo" />
                {user && <Button onClick={handleLogout}>Sign Out</Button>}
            </nav>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
        </header>
    )
}

export default Header;
