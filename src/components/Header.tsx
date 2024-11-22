import { Link } from "react-router-dom";

const Header: React.FC = () => {
    return (
        <header style={{ background: '#333', color: '#fff', padding: '10px' }}>
            <nav>
                <Link to="/" style={{ color: 'white', marginRight: '10px' }}>Home</Link>
                <Link to="/about" style={{ color: 'white' }}>About</Link>
            </nav>
        </header>
    );
}

export default Header;