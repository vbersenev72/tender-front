import * as React from 'react';
import './TagsModal.css'
import { showErrorMessage, showSuccesMessage } from '../../functions/Message';
import axios from 'axios';
import { FaMinus } from 'react-icons/fa';


export function TagsModal({ addTagToTender, closeModal, popupTagsPosition, jsonData, addTag, setAddTag }: any) {

    const regNum = jsonData?.commonInfo?.purchaseNumber ? jsonData?.commonInfo?.purchaseNumber : jsonData?.registrationNumber

    const [tags, setTags] = React.useState<any>([])

    React.useEffect(() => {
        const getTags = async () => {
            try {
                const getAllTags: any = await axios.get(`${process.env.REACT_APP_API}/api/tags/getall`, {
                    headers: {
                        authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });

                const tags = getAllTags.data.message
                setTags([...tags, { id: -1, tag_color: 'white', tag_name: 'Удалить метку' }])

            } catch (error) {
                console.log(error);
            }
        }

        getTags().then(() => console.log('Метки загружены!'))

    }, [])

    console.log(tags);
    console.log(regNum);



    const deleteTag = async (id: any) => {
        try {

            const response = await axios.delete(`${process.env.REACT_APP_API}/api/tags/deletefromtender/${id}`, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })

            return showSuccesMessage(response.data.message)

        } catch (error) {
            showErrorMessage('Произошла ошибка, попробуйте позже')
        }
    }

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
                    tags.length != 0
                    &&
                    tags.map((tag: any) => {

                        return (
                            <>
                                {
                                    (tag.id == -1)
                                        ?
                                        <div key={tag.id} style={{ display: 'flex', width: 'fit-content', justifyContent: 'start', alignItems: 'center', cursor: 'pointer', }}
                                            onClick={async () => {
                                                await deleteTag(regNum)
                                                setAddTag({ id: -1, tag_color: 'white', tag_name: 'Удалить метку' })
                                            }}
                                        >
                                            <FaMinus />
                                            <p style={{ padding: '10px' }}>{tag.tag_name}</p>
                                        </div>

                                        :


                                        <div key={tag.id} style={{ display: 'flex', width: 'fit-content', justifyContent: 'start', alignItems: 'center', cursor: 'pointer' }}
                                            onClick={async () => {
                                                await addTagToTender(regNum, tag.id)
                                                setAddTag(tag)
                                            }}
                                        >
                                            <div style={{ backgroundColor: tag.tag_color, width: '18px', height: '18px', marginLeft: '10px', }} />
                                            <p style={{ padding: '10px' }}>{tag.tag_name}</p>
                                        </div>
                                }
                            </>
                        )
                    })
                }
            </div>
        </div>
    );
}