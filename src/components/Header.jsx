import { useEffect } from 'react';

function Header({ handlenewGame, wins }) {
    useEffect(() => {document.title = `${wins} wins`}, [wins])

    return (
        <header className="header">
            <h4>{wins} wins</h4>
            <h3>Memory Game</h3>
            <button onClick={handlenewGame}>New Game</button>
        </header>

    )
}

export default Header;