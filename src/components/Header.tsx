import {Link} from "react-router-dom";

function Header() {

    return (
        <div className='header-main'>
            <nav className='navbar'>
                <div className='navbar-section'>
                    {/* link below is a placeholder until logo img finalized */}
                    <img id='logo' src='src/assets/z-score-logo.png' alt='logo'/>
                </div>
                <Link to={'/'} className='navbar-section navbar-section-actionable'>Z-Score App</Link>
                <Link to={'/game'} className='navbar-section navbar-section-actionable'>Games</Link>
                <Link to={'/publication'} className='navbar-section navbar-section-actionable'>Publications</Link>
                <Link to={'/score'} className='navbar-section navbar-section-actionable'>Scores</Link>
            </nav>
        </div>
    )
}

export default Header;