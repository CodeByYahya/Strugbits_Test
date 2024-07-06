import Banner from "./components/Banner/Banner"
import "./App.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import Meals from "./components/Meals/Meals";
import AOS from 'aos';
import 'aos/dist/aos.css';

function App() {
  AOS.init(); 

  return (
    <div>
    <Banner/>
    <Meals/>
    </div>
  )
}

export default App
