import * as React from 'react';
import './TagsModal.css'


export function TagsModal({ tags, addTagToTender, closeModal, popupTagsPosition, jsonData }: any) {

    console.log(
        JSON.stringify({ tags, addTagToTender, closeModal, popupTagsPosition, jsonData })
    );

    return (
        <div className='TagsModal-overlay' onClick={closeModal}
            style={{
                position: 'absolute',
                top: '0',
                left: '0',
                width: '100%',
                height: '100vh',
            }}
        >
            <div className="TagsModal-content"
                style={{
                    position: 'absolute',
                    top: popupTagsPosition.y,
                    left: popupTagsPosition.x,
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr 1fr',
                    width: 'fit-content',
                    height: 'fit-content',
                    backgroundColor: 'white',
                    boxShadow: '1'
                }}
            >
                {
                    tags.map((tag: any) => {
                        return (
                            <div key={tag.id} style={{ display: 'flex', padding: '10px', width: 'fit-content' }}
                                onClick={async () => await addTagToTender(jsonData?.commonInfo?.purchaseNumber, tag.id)}
                            >
                                <div style={{ backgroundColor: tag.tag_color, width: '18px', height: '18px' }} />
                                <p>{tag.tag_name}</p>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
}
