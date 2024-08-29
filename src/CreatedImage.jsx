export const CreatedImage = ({image, apiStatus}) => {

    return (
        <div className='imageDetails'>
            <img src={image} alt='createdImage' />
            <p className='description'>画像の生成文をここに表示する予定 {apiStatus}</p>
            <p className='description'>画像の生成を行った人の名前をここに表示する予定 {apiStatus}様寄贈</p>
        </div>
    )
}

export default CreatedImage