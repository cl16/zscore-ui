import {Link} from "react-router-dom";

function Header({ activePage } : { activePage: string }) {
    const linkStandard = 'navbar-section navbar-section-actionable';
    const linkActive = 'navbar-section navbar-section-active';
    const linkClasses = {
        'home': activePage === '/' ? linkActive : linkStandard,
        'game': activePage === '/game' ? linkActive : linkStandard,
        'publication': activePage === '/publication' ? linkActive : linkStandard,
        'score': activePage === '/score' ? linkActive : linkStandard
    }

    return (
        <div className='header-main'>
            <nav className='navbar'>
                <div className='navbar-section'>
                    {/* link below is a placeholder until logo img finalized */}
                    <img id='logo' src='src/assets/z-score-logo.png' alt='logo'/>
                </div>
                <Link to={'/'} className={linkClasses.home}>Z-Score App</Link>
                <Link to={'/game'} className={linkClasses.game}>Games</Link>
                <Link to={'/publication'} className={linkClasses.publication}>Publications</Link>
                <Link to={'/score'} className={linkClasses.score}>Scores</Link>
            </nav>
        </div>
    )
}

export default Header;