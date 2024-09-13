import { useState, useEffect } from "react";

export const CreatedImage = () => {
  const [images, setImages] = useState([]);
  const [creatorNames, setCreatorNames] = useState([]);
  const [descriptions, setDescriptions] = useState([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    let socket;
    let reconnectInterval;

    const connectWebSocket = () => {
      const socketUrl = 'wss://digital-human-app.onrender.com';
      socket = new WebSocket(socketUrl);

      socket.onopen = () => {
        console.log('WebSocket接続が確立されました');
        setIsConnected(true);
        clearInterval(reconnectInterval);
      };

      socket.onmessage = (event) => {
        console.log('メッセージを受信しました');
        try {
          const receivedData = JSON.parse(event.data);
          console.log('WebSocketからデータを受信:', receivedData);

          if (receivedData.ImageUrl && receivedData.Author && receivedData.OriginalText) {
            setImages(prevImages => [receivedData.ImageUrl, ...prevImages]);
            setCreatorNames(prevCreatorNames => [receivedData.Author, ...prevCreatorNames]);
            setDescriptions(prevDescriptions => [receivedData.OriginalText, ...prevDescriptions]);
            console.log("データ取得成功");
          } else {
            console.log("必要なデータが揃っていません");
            console.log(receivedData);
          }
        } catch (error) {
          console.error('データの解析に失敗しました:', error);
        }
      };

      socket.onerror = (error) => {
        console.error('WebSocketエラー:', error);
      };

      socket.onclose = (event) => {
        console.log('WebSocket接続が閉じられました', event);
        setIsConnected(false);
        reconnectInterval = setInterval(() => {
          console.log('WebSocket再接続を試みます...');
          connectWebSocket();
        }, 5000); // 5秒ごとに再接続を試みる
      };
    };

    connectWebSocket();

    // クリーンアップ関数
    return () => {
      if (socket) {
        socket.close();
      }
      clearInterval(reconnectInterval);
    };
  }, []);

  // 接続状態を表示
  useEffect(() => {
    console.log('WebSocket接続状態:', isConnected ? '接続中' : '切断');
  }, [isConnected]);

  return (
    <div className='app'>
      <p>接続状態: {isConnected ? '接続中' : '切断'}</p>
      {images.map((image, index) => (
        <div key={index} className='imageDetails'>
          <img src={image} alt='createdImage' />
          <p className='description'>画像生成文: {descriptions[index]}</p>
          <p className='description'>画像生成者: {creatorNames[index]}</p>
        </div>
      ))}
    </div>
  );
};