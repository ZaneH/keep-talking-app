import "./App.css";
import Canvas from "./components/canvas";
import { preloadModels } from "./hooks/use-module-model";

function App() {
  preloadModels();
  return <Canvas />;
}

export default App;
