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
import GamePage from "./components/page/GamePage.tsx";
import PublicationPage from "./components/page/PublicationPage.tsx";
import ScoreListPage from "./components/page/ScoreListPage.tsx";

function App() {

    return (
        <>
            <Router>
                <Header/>
                <Routes>
                    <Route path="/" element={ <HomePage /> }/>
                    <Route path="/publication" element={ <PublicationListPage /> }/>
                    <Route path="/game" element={ <GameListPage /> }/>
                    <Route path="/score" element={ <ScoreListPage /> }/>
                    <Route path="/publication/:pubId" element={ <PublicationPage /> }/>
                    <Route path="/game/:gameId" element={ <GamePage /> }/>
                </Routes>
            </Router>
            <Footer/>
        </>
    );
}

export default App;
