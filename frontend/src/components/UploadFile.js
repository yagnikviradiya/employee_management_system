import { Button, IconButton } from '@mui/material';
import React from 'react'
import ImageUploading from 'react-images-uploading';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

const UploadFile = ({ images, setImages }) => {
    const maxNumber = 2;
    const onChange = (imageList, addUpdateIndex) => {
        setImages(imageList);
    };
    return (
        <>
            <ImageUploading
                value={images}
                onChange={onChange}
                maxNumber={maxNumber}
                dataURLKey="data_url"
                acceptType={['jpg', 'gif', 'png']}
            >
                {({
                    imageList,
                    onImageUpload,
                    onImageRemove,
                    isDragging,
                    dragProps,
                    onImageRemoveAll
                }) => (
                    // write your building UI
                    <div className="upload__image-wrapper">
                        <Button
                            sx={{ width: '100%', height: '4em' }}
                            variant='outlined'
                            style={isDragging ? { color: 'red' } : undefined}
                            onClick={onImageUpload}
                            {...dragProps}
                        >
                            Click to add profile
                        </Button>


                        {Array.isArray(imageList) ?
                            imageList?.map((image, index) => (
                                <div key={index} className="image-item">
                                    <img src={image['data_url']} alt="" className='upload-priview-img' width="200" />
                                    <div className="image-item__btn-wrapper">
                                        <IconButton
                                            onClick={() => onImageRemoveAll()}
                                            sx={{
                                                left: '269px',
                                                bottom: '155px'
                                            }}><HighlightOffIcon sx={{ color: 'red' }} /></IconButton>
                                    </div>
                                </div>
                            ))
                            : !(Array.isArray(imageList)) ? <>
                                <img src={imageList} alt="" className='upload-priview-img' width="200" />
                                <div className="image-item__btn-wrapper">
                                    <IconButton
                                        onClick={() => onImageRemoveAll()}
                                        sx={{
                                            left: '269px',
                                            bottom: '155px'
                                        }}><HighlightOffIcon sx={{ color: 'red' }} /></IconButton>
                                </div>
                            </>
                                : null}
                    </div>
                )}
            </ImageUploading>
        </>
    )
}

export default UploadFile