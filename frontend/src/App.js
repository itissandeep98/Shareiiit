import { BrowserRouter } from 'react-router-dom';
import './App.scss';
import Routing from './Components/Routing/Routing';
import { getTok, onMessageListener } from './Config/fire';

function App() {
	getTok();

	onMessageListener();

	return (
		<BrowserRouter basename={process.env.PUBLIC_URL}>
			<div className="App d-flex justify-content-between flex-column">
				<Routing />
			</div>
		</BrowserRouter>
	);
}

export default App;
