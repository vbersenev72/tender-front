import * as React from 'react';

import { regionsList } from '../../data/tendersData.js';
import { GoTriangleRight, GoTriangleUp } from "react-icons/go";
import { GoTriangleDown } from "react-icons/go";
import { Checkbox } from '@mui/material';

export function RegionSelect({ closeModal, setRegionCustomer, regionCustomer, value }: any) {

    const [findText, setFindText] = React.useState('')
    const [regions, setRegions]= React.useState([...regionsList])
    const [selectCheckBox, setSelectCheckBox] = React.useState('')
    const [showAllElements, setShowAllElements] = React.useState('')



    const clearText = () => {
        setFindText('')
        setRegionCustomer('')
        setSelectCheckBox('')
        setRegions([...regions])
    }

    const clickCheckBox = (element: any) => {
        setSelectCheckBox(element.name)
        setRegionCustomer(element)
    }

    const clickOnTriangle = (name: any) => {
        setShowAllElements(name)
    }

    const findByText = () => {

        if (findText == '') {
            return setRegions([...regions])
        }
        const filteredData = regionsList.filter(item => item.name.toLowerCase().includes(findText.toLowerCase()));

        setRegions([...filteredData])

    }

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
                    <button className='okpd2-select-searchButton' >Найти</button>
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
                                                    <Checkbox checked={selectCheckBox == element.name || element.name == regionCustomer} onChange={() => clickCheckBox(element)} />
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

                                                                    <Checkbox checked={selectCheckBox == child.name || child.name == regionCustomer} onChange={() => clickCheckBox(child)} />
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
                                                <Checkbox checked={selectCheckBox == element.name || element.name == regionCustomer} onChange={() => clickCheckBox(element)} />
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
