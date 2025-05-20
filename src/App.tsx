import "./App.css";
import Canvas from "./components/canvas";
import { ServerProvider } from "./components/server-provider";
import { preloadModels } from "./hooks/use-module-model";

function App() {
  preloadModels();
  return (
    <ServerProvider>
      <Canvas />
    </ServerProvider>
  );
}

export default App;
