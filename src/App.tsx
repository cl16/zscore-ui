import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";
import './App.css'
import Header from './components/Header'
import Footer from "./components/Footer.tsx";
import HomePage from "./components/page/HomePage.tsx";
import PublicationListPage from "./components/page/PublicationListPage.tsx";
import GameListPage from "./components/page/GameListPage.tsx";

function App() {

    return (
        <>
            <Header/>
            {/* The generic page body would go here... the "outlet" in react */}

            <Router>
                <Routes>
                    <Route path="/" element={ <HomePage /> }/>
                    <Route path="/publication" element={ <PublicationListPage /> }/>
                    <Route path="/game" element={ <GameListPage /> }/>
                </Routes>
            </Router>

            <Footer/>
        </>
    );
}

export default App
