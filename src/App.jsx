// import { useEffect, useState } from 'react'
import './App.css'
import Footer from './Footer';
import Hearder from './Hearder';
import CreatedImage from './CreatedImage';

function App() {

  return (
    <>
      <Hearder />
      {/* <div className='app'> */}
        <CreatedImage />
        {/* {console.log(images)} */}
        {/* <h1>Vite + React</h1> */}
        <Footer />
      {/* </div> */}
    </>
  )
}

export default App
