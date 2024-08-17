import ScrollToTop from "./routes/ScrollToTop";
import useRouteElement from './routes/useRouteElement';
import './App.css'

function App() {
  const routeElement = useRouteElement();

  return (
    <>
      <ScrollToTop />
      {routeElement}
    </>
  )
}

export default App
