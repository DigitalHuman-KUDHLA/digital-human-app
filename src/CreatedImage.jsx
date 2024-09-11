import { useState, useEffect } from "react";

export const CreatedImage = () => {
  const [images, setImages] = useState([]);
  const [creatorNames, setCreatorNames] = useState([]);
  const [descriptions, setDescriptions] = useState([]);

    useEffect(() => {
      // WebSocket接続を開始
      const socket = new WebSocket('ws://localhost:8080');

      socket.onopen = () => {
          console.log('WebSocket接続が確立されました');
      };

      socket.onmessage = (event) => {
        const receivedData = JSON.parse(event.data);
        console.log('WebSocketからデータを受信:', receivedData);
    
        // WebSocketで受信したデータを適用
        if (receivedData.ImageUrl && receivedData.Author && receivedData.OriginalText) {
            // 画像、作成者、説明のstateに追加
            setImages(prevImages => [receivedData.ImageUrl, ...prevImages]);
            setCreatorNames(prevCreatorNames => [receivedData.Author, ...prevCreatorNames]);
            setDescriptions(prevDescriptions => [receivedData.OriginalText, ...prevDescriptions]);
            console.log("データ取得成功");
        } else {
            console.log("必要なデータが揃っていません");
        }
    };

      socket.onerror = (error) => {
          console.error('WebSocketエラー:', error);
      };

      // コンポーネントがアンマウントされたらWebSocketを閉じる
      return () => {
          socket.close();
      };
  }, []);

  return (
    <>
      <div className='app'>
        {images.map((image, index) => (
          <div key={index} className='imageDetails'>
            <img src={image} alt='createdImage' />
            <p className='description'>画像生成文{descriptions[index]}</p>
            <p className='description'>画像生成者{creatorNames[index]}</p>
          </div>
        ))}
      </div>
    </>
  );
}