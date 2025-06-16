import './App.css'
import Header from './components/Header'
import Footer from "./components/Footer.tsx";

function App() {

    return (
        <>
            <Header/>
            {/* The generic page body would go here... the "outlet" in react */}
            <Footer/>
        </>
    );
}

export default App
