import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes";
import Providers from "./providers";

const App = () => {
  return (
    <BrowserRouter>
      <Providers>
        <div className="min-h-screen bg-[#f8f9fb] text-gray-800">
          <AppRoutes />
        </div>
      </Providers>
    </BrowserRouter>
  );
};

export default App;
