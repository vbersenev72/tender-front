import * as React from 'react';
import './Okpd2Select.css'
import { okpd2Nomenclature } from '../../data/tendersData.js';
import { GoTriangleRight, GoTriangleUp } from "react-icons/go";
import { GoTriangleDown } from "react-icons/go";
import { Checkbox } from '@mui/material';

export function Okpd2Select({ closeModal, setOkpd2Code, okpd2Code }: any) {

    const [findText, setFindText] = React.useState('')
    const [nomenclature, setNomenclature] = React.useState([...okpd2Nomenclature])
    const [showAllElements, setShowAllElements] = React.useState('')



    const clearText = () => {
        setFindText('')
        setNomenclature([...okpd2Nomenclature])
    }


    const handleCheckboxChange = (event: any, item: any) => {
        const { checked } = event.target;

        if (checked) {
            setOkpd2Code((prevSelectedItems: any) => [...prevSelectedItems, item]);
        } else {
            setOkpd2Code((prevSelectedItems: any) => prevSelectedItems.filter((selectedItem: any) => selectedItem.code != item.code));
        }
    };


    const clickOnTriangle = (code: any) => {
        setShowAllElements(code)
    }

    const findByText = () => {
        if (findText === '') {
            return setNomenclature([...okpd2Nomenclature]);
        }

        const filteredData:any = okpd2Nomenclature.map((item) => {
            // Сортируем child элементы, если они есть и фильтруем их
            const filteredChildren = item.child ? item.child.filter((childItem) => childItem.name.toLowerCase().includes(findText.toLowerCase())) : [];

            // Фильтруем родительский элемент и обновляем его child массив
            const filteredItem = {
                ...item,
                child: filteredChildren,
            };

            if (filteredItem.name.toLowerCase().includes(findText.toLowerCase()) || filteredChildren.length > 0) {
                return filteredItem;
            }

            return null;
        }).filter(Boolean); // Фильтруем null значения, которые могли возникнуть

        setNomenclature([...filteredData]);
        setShowAllElements(filteredData[0]?.code)
    };

    React.useEffect(() => {

        console.log(okpd2Code);
        findByText()

    }, [findText])



    return (
        <div className='okpd2-select-container' onClick={closeModal}>
            <div className="okpd2-select-content" onClick={(e: any) => e.stopPropagation()}>
                <h3>Номенклатура (ОКПД2)</h3>
                <br />
                <div className='okpd2-select-inputContainer'>
                    <input type="text" className='okpd2-select-input' placeholder='Введите полностью или часть наименования товара, работы или услуги' value={findText} onChange={(e: any) => setFindText(e.target.value)} />
                    <button className='okpd2-select-searchButton' onClick={closeModal} >Применить</button>
                    <button className='okpd2-select-searchClear' onClick={clearText} >Очистить</button>
                </div>
                <br />

                <div className='okpd2-select-nomenclature'>
                    {
                        nomenclature.map((element: any) => {
                            return (
                                <>
                                    {
                                        showAllElements == element.code
                                            ?
                                            <div>
                                                <div style={{
                                                    display: 'flex',
                                                    justifyContent: 'flex-start',
                                                    alignItems: 'center'
                                                }}>
                                                    <div style={{ display: 'grid', grid: 'center' }} onClick={() => clickOnTriangle('')}>
                                                        <GoTriangleDown size={24} />
                                                    </div>
                                                    <Checkbox checked={okpd2Code.some((selectedItem: any) => selectedItem.code === element.code)} onChange={event => handleCheckboxChange(event, element)} />
                                                    <h4 style={{ marginRight: '10px' }}>{element.symbol}</h4>
                                                    <p>{element.name}</p>
                                                </div>

                                                <div style={{ marginLeft: '40px' }}>
                                                    {
                                                        element.child.map((child: any) => {
                                                            return (
                                                                <div style={{
                                                                    display: 'flex',
                                                                    justifyContent: 'flex-start',
                                                                    alignItems: 'center'
                                                                }}>

                                                                    <Checkbox checked={okpd2Code.some((selectedItem: any) => selectedItem.code === child.code)} onChange={event => handleCheckboxChange(event, child)} />
                                                                    <h4 style={{ marginRight: '12px' }}>{child.symbol}</h4>
                                                                    <p style={{ fontSize: '14px' }}>{child.name}</p>
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                </div>
                                            </div>
                                            :
                                            <div style={{
                                                display: 'flex',
                                                justifyContent: 'flex-start',
                                                alignItems: 'center'
                                            }}>
                                                <div style={{ display: 'grid', grid: 'center' }} onClick={() => clickOnTriangle(element.code)}>
                                                    <GoTriangleRight size={24} />
                                                </div>
                                                <Checkbox checked={okpd2Code.some((selectedItem: any) => selectedItem.code === element.code)} onChange={event => handleCheckboxChange(event, element)} />
                                                <h4 style={{ marginRight: '10px' }}>{element.symbol}</h4>
                                                <p>{element.name}</p>
                                            </div>

                                    }
                                </>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    );
}
