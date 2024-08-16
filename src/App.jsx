import { useEffect, useState } from 'react'
import './App.css'

function App() {
  /**
   * 画像のURLを保持するstate
   * @type {string}
   * @description 画像のURLを保持するuseState
   */
  const [image, setImage] = useState();

  /**
   * APIの取得ステータスを保持するstate
   * @type {string}
   * @description APIの取得ステータスを保持するuseState
   */
  const [apiStatus, setApiStatus] = useState();

  /**
   * 画像URLを保管する8*3の2次元配列
   * @type {Array}
   * @description 画像URLを保管する8*3の2次元配列
   */
  let urlArray = [];
  for (let i = 0; i < 8; i++) {
    urlArray[i] = [];
    for (let j = 0; j < 3; j++) {
      urlArray[i][j] = null;
    }
  }

  /**
   * urlArrayの添字を管理するcount変数
   * @type {number}
   * @description urlArrayの添字を管理する
   */
  let count = 0;

  /**
   * count変数の値を管理する関数
   * @returns {void}
   * @description count変数が8を超えないように管理する
   */
  const countAdmin = () => {
    if (count > 7) {
      count = 0;
    } else {
      count++;
    }
  }

  /**
   * 画像を取得する関数
   * @returns {void}
   * @description 画像を取得してimageに代入する
   */
  const imageFetch = () => {
    fetch('https://dog.ceo/api/breeds/image/random', {method: 'GET'}) 
    // fetch('https://oaidalleapiprodscus.blob.core.windows.net/private/org-JXg8cxNwWXYaOmWgrCXZa7gv/user-qkHRKuvi2dYZRyS3dcD5WgkL/img-t0JAUAah3vMshfqnTXxLJAz8.png?st=2024-08-05T10%3A01%3A27Z&se=2024-08-05T12%3A01%3A27Z&sp=r&sv=2023-11-03&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2024-08-05T04%3A31%3A10Z&ske=2024-08-06T04%3A31%3A10Z&sks=b&skv=2023-11-03&sig=6ZyQGGLzNlMLhBc4p/q0/erhqc7MmcunjCLNmVwvZ5I%3D', {method: 'GET'})
    .then((response) => response.json())
    .then((data) => {
      // data.statusはそれぞれ作品名と寄贈者名に変更予定
      // 取得したデータをurlArrayに代入
      urlArray[count] = [data.message, data.status, data.status];
      console.log(urlArray);
      // console.log(urlArray[0][0]);
      console.log(image);
      console.log(count);
    })
    .then(() => {
      // imgタグにurlArrayの値を直接代入すると表示されないのでuseStateを使って代入している
      setImage(urlArray[count][0]);
      setApiStatus(urlArray[count][1]);
      // AddImage();
      countAdmin();
      console.log(count);
      // AddImage();
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
    }, 10000); // 今は一旦10秒間隔に設定

    return () => clearInterval(interval);

  }, [])

  /**
   * 画像を追加する関数
   * 
   */
  const AddImage = ({index}) => {
    // count変数はここでは更新しない
    console.log("index:" + index);
    return (
      // {urlArray.map((url, index) => {
      //   return (
      //     <div className='imageDetails'>
      //       <img src={urlArray[index][0]} alt='createdImage' />
      //       <p className='description'>画像の生成文をここに表示する予定 {apiStatus}</p>
      //       <p className='description'>画像の生成を行った人の名前をここに表示する予定 {apiStatus}</p>
      //     </div>
      //   )
      // })} 
      <div className='imageDetails'>
        <img src={urlArray[index][0]} alt='createdImage' />
        <p className='description'>画像の生成文をここに表示する予定 {apiStatus}</p>
        <p className='description'>画像の生成を行った人の名前をここに表示する予定 {apiStatus}</p>
      </div>
    )
  }

  return (
    <>
      {/* <AddImage index={count}/> */}
      {/* // {urlArray.map((url, index) => { */}
      {/* //   return (
      //     <div className='imageDetails'>
      //       <img src={urlArray[index][0]} alt='createdImage' />
      //       <p className='description'>画像の生成文をここに表示する予定 {apiStatus}</p>
      //       <p className='description'>画像の生成を行った人の名前をここに表示する予定 {apiStatus}</p>
      //     </div>
      //   )
      // })}  */}
      <div className='imageDetails'>
        <img src={image} alt='createdImage' />
        <p className='description'>画像の生成文をここに表示する予定 {apiStatus}</p>
        <p className='description'>画像の生成を行った人の名前をここに表示する予定 {apiStatus}様寄贈</p>
      </div>
    </>
  )
}

export default App
