import "./App.css";
import Routing from "./Components/Routing/Routing";
import { BrowserRouter } from "react-router-dom";

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
