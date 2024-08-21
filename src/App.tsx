import { PageIndex } from "./pages/index";
import "./App.css"

function App() {
  const width = window.innerWidth;
  return width > 700 ? (
    <div className="App">
      <PageIndex />
    </div>
  ) : (
    <div className="mobile">
      ПРОСТИТЕ! НО ДЛЯ МОБИЛЬНЫХ ТЕЛЕФОНОВ У НАС ЕСТЬ МОБИЛЬНОЕ ПРИЛОЖЕНИЕ
    </div>
  );
}

export default App;
