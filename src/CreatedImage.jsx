import { useState, useEffect } from "react";

export const CreatedImage = () => {
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

        // テスト用
        // await setImages(prevImages => [jsonData.message, ...prevImages]);
        // 本番用
        await setImages(prevImages => [jsonData.ImageUrl, ...prevImages]);

        // テスト用
        // await setCreatorNames(prevCreatorName => [jsonData.status, ...prevCreatorName]);
        // 本番用
        await setCreatorNames(prevCreatorName => [jsonData.Author, ...prevCreatorName]);

        // テスト用
        // await setDescriptions(prevDescription => [jsonData.status, ...prevDescription]);
        // 本番用
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

    }, []);

    return (
        <div className="app">
        {[images, descriptions, creatorNames].map((array, indexArray) => (
            array.filter((element, indexElement) => element !== "success").map((element, indexElement) => (
              <div key={indexElement} className='imageDetails'>
                <img src={images[indexElement]} alt='createdImage' />
                <p className='description'>画像生成文{descriptions[indexElement]}</p>
                <p className='description'>画像生成者{creatorNames[indexElement]}</p>
              </div>
            ))
          ))}
        </div>
    )
}