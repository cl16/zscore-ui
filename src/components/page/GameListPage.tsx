import {useEffect} from "react";
import Api from "../../api/api.tsx";

function GameListPage() {

    useEffect(() => {
        Api.getAllGames(1, 4).then(async (result) => {
            console.log(await result.json())
        });
    }, []);

    return (
        <div className={'page-body-main'}>This is the GameList component...</div>
    )
}

export default GameListPage;