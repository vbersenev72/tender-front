import * as React from 'react';

import { regionsList } from '../../data/tendersData.js';
import { GoTriangleRight, GoTriangleUp } from "react-icons/go";
import { GoTriangleDown } from "react-icons/go";
import { Checkbox } from '@mui/material';

export function RegionSelect({ closeModal, setRegionCustomer, regionCustomer, value }: any) {

    const [findText, setFindText] = React.useState('')
    const [regions, setRegions]= React.useState([...regionsList])
    const [showAllElements, setShowAllElements] = React.useState('')



    const clearText = () => {
        setFindText('')
        setRegions([...regions])
    }

    const handleCheckboxChange = (event: any, item: any) => {
        const { checked } = event.target;

        if (checked) {
            setRegionCustomer((prevSelectedItems: any) => [...prevSelectedItems, item]);
        } else {
            setRegionCustomer((prevSelectedItems: any) => prevSelectedItems.filter((selectedItem: any) => selectedItem.value != item.value));
        }
    };


    const clickOnTriangle = (name: any) => {
        setShowAllElements(name)
    }

    const findByText = () => {
        if (findText === '') {
            return setRegions([...regions]);
        }

        const filteredData:any = regionsList.map((item) => {
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

        setRegions([...filteredData]);
        setShowAllElements(filteredData[0]?.name)
    };


    React.useEffect(() => {

        findByText()

    }, [findText])



    return (
        <div className='okpd2-select-container' onClick={closeModal}>
            <div className="okpd2-select-content" onClick={(e: any) => e.stopPropagation()}>
                <h3>{value}</h3>
                <br />
                <div className='okpd2-select-inputContainer'>
                    <input type="text" className='okpd2-select-input' placeholder='Введите полностью или часть наименования региона' value={findText} onChange={(e: any) => setFindText(e.target.value)} />
                    <button className='okpd2-select-searchButton' onClick={closeModal}>Применить</button>
                    <button className='okpd2-select-searchClear' onClick={clearText} >Очистить</button>
                </div>
                <br />

                <div className='okpd2-select-nomenclature'>
                    {
                        regions.map((element: any) => {
                            return (
                                <>
                                    {
                                        showAllElements == element.name
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
                                                    <Checkbox checked={regionCustomer.some((selectedItem: any) => selectedItem.value === element.value)} onChange={event => handleCheckboxChange(event, element)} />
                                                    {/* <h4 style={{ marginRight: '10px' }}>{element.id}</h4> */}
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

                                                                    <Checkbox checked={regionCustomer.some((selectedItem: any) => selectedItem.value === child.value)} onChange={event => handleCheckboxChange(event, child)} />
                                                                    {/* <h4 style={{ marginRight: '12px' }}>{child.name[0]}</h4> */}
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
                                                <div style={{ display: 'grid', grid: 'center' }} onClick={() => clickOnTriangle(element.name)}>
                                                    <GoTriangleRight size={24} />
                                                </div>
                                                <Checkbox checked={regionCustomer.some((selectedItem: any) => selectedItem.value === element.value)} onChange={event => handleCheckboxChange(event, element)} />
                                                {/* <h4 style={{ marginRight: '10px' }}>{element.id}</h4> */}
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
