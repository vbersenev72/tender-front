import * as React from 'react';
import './TagsModal.css'


export function TagsModal({ tags, addTagToTender, closeModal, popupTagsPosition, jsonData }: any) {

    const regNum = jsonData?.commonInfo?.purchaseNumber ? jsonData?.commonInfo?.purchaseNumber : jsonData?.registrationNumber
    
    console.log(tags);
    console.log(regNum);
    
    

    return (
        <div className='TagsModal-overlay' onClick={closeModal}
            style={{
                position: 'absolute',
                top: '0',
                left: '0',
                width: '100%',
                height: 'calc(11 * 100vh)',
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
                    boxShadow: '0 0 2px rgba(0,0,0,0.5)',
                    padding: '7px'
                }}
            >
                {
                    tags.map((tag: any) => {
                        return (
                            <div key={tag.id} style={{ display: 'flex', width: 'fit-content', justifyContent: 'start', alignItems: 'center', cursor: 'pointer' }}
                                onClick={async () => await addTagToTender(regNum, tag.id)}
                            >
                                <div style={{ backgroundColor: tag.tag_color, width: '18px', height: '18px', marginLeft: '10px' }} />
                                <p style={{padding: '10px'}}>{tag.tag_name}</p>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
}
