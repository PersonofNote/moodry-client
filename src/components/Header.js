import { Link, NavLink } from 'react-router-dom';
import MoodryLogo from './logo.svg'
import '../App.css'
import '../styles/utilities.css'
import '../styles/header.css'

// Material components
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
                <NavLink className="header-link" to="/dashboard">Dashboard</NavLink>
                <NavLink className="header-link" to="/profile">Profile</NavLink>
            </div>
                {user && <Button onClick={handleLogout}>Sign Out</Button>}
            </nav>
        </header>
    )
}

export default Header;
