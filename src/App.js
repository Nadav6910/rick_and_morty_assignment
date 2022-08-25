import "./svg/SvgLogo"
import SvgLogo from "./svg/SvgLogo"
import UnPopularCharsTable from "./components/UnPopularCharsTable"
import BarChart from "./components/BarChart"

function App() {
  
  return (
    <div className="App">
      <SvgLogo />
      <UnPopularCharsTable />
      <BarChart />
    </div>
  )
}

export default App
