import Routes from "./routes";
import { CookiesProvider } from "react-cookie";

function App() {
  return (
    <CookiesProvider>
      <Routes />
    </CookiesProvider>
  );
}

export default App;
