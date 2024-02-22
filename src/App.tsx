import { Route, Routes } from 'react-router-dom'

import MainPage from './views/MainPage'
import Matches from './views/Matches/Matches'

import Nav from './components/Nav/Nav'

export default function App() {
  return (
    <main>
      <Nav />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/matches" element={<Matches />} />
      </Routes>
      <footer className='footer'>
        <a href="https://google.com/" target='_blank'>
          <i className='fa fa-code'></i>
          View On Github
        </a>
      </footer>
    </main>
  )
}
