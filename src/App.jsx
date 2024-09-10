import { useEffect, useState } from 'react'
import './App.css'
import Footer from './Footer';

function App() {
  // 画像のURLを保持するstate
  const [images, setImages] = useState([]);

  /**
   * 画像を取得する関数
   * @returns {void}
   * @description 画像を取得してimagesに保存する
   */
  const fetchImage = async () => {
    try {
      const fetchResult = await fetch('https://dog.ceo/api/breeds/image/random', {method: 'GET'});
      const jsonData = await fetchResult.json();
      await setImages(prevImages => [jsonData.message, ...prevImages]);
      await console.log(images);
      console.log(jsonData);
      console.log("成功");

    } catch (error) {
      console.log("失敗");
      console.log(error);
      console.error(error);
    }
  }

  /**
   * 初回レンダリング時に画像を取得するためのuseEffect
   * @returns {void}
   * @description 初回レンダリング時に画像を取得する
   */
  useEffect(() => {
    fetchImage();

    /**
     * 一定時間ごとに画像を取得するためのsetInterval
     * @returns {void}
     * @description 一定時間ごとに画像を取得する
     */
    const interval = setInterval(() => {
      fetchImage();
    }, 5000); // 今は一旦5秒間隔に設定

    return () => clearInterval(interval);

  }, [])

  return (
    <>
      <div className='app'>
        {images.map((output, index) => (
          <div key={index} className='imageDetails'>
            <img src={output} alt='createdImage' />
            <p className='description'>画像の生成文をここに表示する予定</p>
            <p className='description'>画像の生成を行った人の名前をここに表示する予定</p>
          </div>
        ))}
        {console.log(images)}
        {/* <h1>Vite + React</h1> */}
        <Footer />
      </div>
    </>
  )
}

export default App
