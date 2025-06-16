import { useParams } from 'react-router-dom';

export function GamePage() {

    const { gameId } = useParams();

    return (
        <div>This is the GamePage component with gameId: {gameId}</div>
    )
}

export default GamePage;