import { BrowserRouter } from 'react-router-dom';
import './App.scss';
import Routing from './Components/Routing/Routing';

function App() {
	return (
		<BrowserRouter basename={process.env.PUBLIC_URL}>
			<div className="App d-flex justify-content-between flex-column">
				<Routing />
			</div>
		</BrowserRouter>
	);
}

export default App;
