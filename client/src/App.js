import { useSelector } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedPage from "./components/ProtectedPage";
import Spinner from "./components/Spinner";
import Admin from "./pages/Admin";
import Home from "./pages/Home";
//import {App} from "antd";
import Login from "./pages/Login";
import ProductInfo from "./pages/ProductInfo";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import { ConfigProvider } from "antd";

function App() {
  const { loading } = useSelector((state) => state.loaders);
  return (
     <div>
      {loading && <Spinner />}
      <ConfigProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProtectedPage><Home /></ProtectedPage>}/>
          <Route path="/product/:id" element={<ProtectedPage><ProductInfo /></ProtectedPage>}/>
          <Route path="/profile" element={<ProtectedPage><Profile /></ProtectedPage>}/>
          <Route path="/admin" element={<ProtectedPage><Admin /></ProtectedPage>}/>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
      </ConfigProvider>
     </div>
  );
}

export default App;