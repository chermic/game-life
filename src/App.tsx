import styles from "./app.module.css";
import { Game } from './components/game/game';

function App() {
  return <Game columnsCount={10} rowsCount={10} />;
}

export default App;
