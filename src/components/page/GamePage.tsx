import { useParams } from 'react-router-dom';

export function GamePage() {

    const { gameId } = useParams();

    return (
        <div className={'page-body-main'}>This is the GamePage component with gameId: {gameId}</div>
    )
}

export default GamePage;