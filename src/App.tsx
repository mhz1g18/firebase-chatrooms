import "./App.css";

import Header from "./components/Header";
import Chat from "./components/Chat";
import { ChatProvider } from "./context/context";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <ChatProvider>
        <div className="App">
          <Header />
          <Chat />
        </div>
      </ChatProvider>
    </BrowserRouter>
  );
}

export default App;
