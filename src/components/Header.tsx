function Header() {

    return (
        <div className='header-main'>
            <nav className='navbar'>
                <div className='navbar-section'>
                    {/* link below is a placeholder until logo img finalized */}
                    <img id='logo' src='src/assets/z-score-logo.png' alt='logo'/>
                </div>
                <a className='navbar-section'>Z-Score App</a>
                <a className='navbar-section'>Games</a>
                <a className='navbar-section'>Publications</a>
                <a className='navbar-section'>Scores</a>
            </nav>
        </div>
    )
}

export default Header;