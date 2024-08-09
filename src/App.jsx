import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [image, setImage] = useState();

  /**
   * 画像を取得する関数
   * @returns {void}
   * @description 画像を取得してimageに代入する
   */
  const imageFetch = () => {
    fetch('https://dog.ceo/api/breeds/image/random', {method: 'GET'}) 
    .then((response) => response.json())
    .then((data) => setImage(data.message))
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
      <h1>Vite + React</h1>
      <div>
        <img src={image} alt='dog' />
      </div>
    </>
  )
}

export default App
