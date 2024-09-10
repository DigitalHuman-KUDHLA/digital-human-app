import { useEffect, useState } from 'react'
import './App.css'
import Footer from './Footer';

function App() {
  // 画像のURLを保持するstate
  const [images, setImages] = useState([]);

  /**
   * 画像生成者の名前を保持するstate
   * @param {string} creatorName - 画像生成者の名前
   * @description 画像生成者の名前を保持する
   */
  const [creatorNames, setCreatorNames] = useState([]);

  /**
   * 画像の生成文を保持するstate
   * @param {string} description - 画像の生成文
   * @description 画像の生成文を保持する
   */
  const [descriptions, setDescriptions] = useState([]);

  /**
   * 画像を取得する関数
   * @returns {void}
   * @description 画像を取得してimagesに保存する
   */
  const fetchImage = async () => {
    try {
      const fetchResult = await fetch('https://dog.ceo/api/breeds/image/random', {method: 'GET'});
      const jsonData = await fetchResult.json();
      await setImages(prevImages => [jsonData.ImageUrl, ...prevImages]);
      await setCreatorNames(prevCreatorName => [jsonData.Author, ...prevCreatorName]);
      await setDescriptions(prevDescription => [jsonData.OriginalText, ...prevDescription]);
      await console.log(images);
      await console.log(creatorNames);
      await console.log(descriptions);
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
        {/* <div className='imageDetails'>
          {images.map((output, index) => (
            <img key={index} src={output} alt='createdImage' />
          ))}
          {descriptions.map((description, index) => (
            <p key={index} className='description'>画像生成文{description}</p>
          ))}
          {creatorNames.map((creatorName, index) => (
            <p key={index} className='description'>画像生成者{creatorName}</p>
          ))}
        </div> */}
        {/* <div className='imageDetails'>
          {images.map((image, indexImage) => (
            <div key={indexImage} className='imageDetails'>
              <img src={image} alt='createdImage' />
            {descriptions.map((description, indexDesc) => (
              <p key={indexDesc} className='description'>画像生成文{description}</p>
            ))}
              {creatorNames.map((creatorName, indexCreator) => (
                <p key={indexCreator} className='description'>画像生成者{creatorName}</p>
              ))}
            
            </div>
          ))}
        </div> */}
        
        {/* 以下、同じ画像が複数出てしまう */}
        {/* {images.map((image, indexImage) => (
          <div key={indexImage} className='imageDetails'>
            {descriptions.map((description, indexDesc) => (
              <div key={indexDesc} className='description'>
                {creatorNames.map((creatorName, indexCreator) => (
                  <div key={indexCreator} className='description'>
                    <img src={image} alt='createdImage' />
                    <p className='description'>画像生成文{description}</p>
                    <p className='description'>画像生成者{creatorName}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))} */}

        {/* とりあえずこれで各画像1枚だけ出すようにできたからいいかな */}
        {[images, descriptions, creatorNames].map((array, indexArray) => (
          // array.map((element, indexElement) => (
          //   <div key={indexElement} className='imageDetails'>
          //     <p>array: {array}, indexArray: {indexArray}</p>
          //     <p>element: {element}, indexElement: {indexElement}</p>
          //     <img src={images[indexElement]} alt='createdImage' />
          //     <p className='description'>画像生成文{descriptions[indexElement]}</p>
          //     <p className='description'>画像生成者{creatorNames[indexElement]}</p>
          //   </div>
          // ))
          array.filter((element, indexElement) => element !== "success").map((element, indexElement) => (
            <div key={indexElement} className='imageDetails'>
              <img src={images[indexElement]} alt='createdImage' />
              <p className='description'>画像生成文{descriptions[indexElement]}</p>
              <p className='description'>画像生成者{creatorNames[indexElement]}</p>
            </div>
          ))
        ))}
        <Footer />
        {console.log(images)}
        {console.log(creatorNames)}
        {console.log(descriptions)}
        {/* <h1>Vite + React</h1> */}
        
      </div>
    </>
  )
}

export default App
