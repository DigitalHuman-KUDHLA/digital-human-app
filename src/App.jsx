import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [image, setImage] = useState();
  const [apiStatus, setApiStatus] = useState();

  /**
   * 画像を取得する関数
   * @returns {void}
   * @description 画像を取得してimageに代入する
   */
  const imageFetch = () => {
    fetch('https://dog.ceo/api/breeds/image/random', {method: 'GET'}) 
    .then((response) => response.json())
    .then((data) => {
      setImage(data.message)
      setApiStatus(data.status)
    })
  }

  /**
   * 初回レンダリング時に画像を取得するためのuseEffect
   * @returns {void}
   * @description 初回レンダリング時に画像を取得する
   */
  useEffect(() => {
    imageFetch();

    /**
     * 一定時間ごとに画像を取得するためのsetInterval
     * @returns {void}
     * @description 一定時間ごとに画像を取得する
     */
    const interval = setInterval(() => {
      imageFetch();
    }, 5000); // 今は一旦5秒間隔に設定

  }, [])

  return (
    <>
      <div className='imageDetails'>
        <img src={image} alt='dog' />
        <p className='description'>画像の生成文をここに表示する予定 {apiStatus}</p>
        <p className='description'>画像の生成を行った人の名前をここに表示する予定 {apiStatus}様寄贈</p>
      </div>
      {/* <h1>Vite + React</h1> */}
    </>
  )
}

export default App
