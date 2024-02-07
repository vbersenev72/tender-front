import * as React from 'react';
import './Okpd2Select.css'
import { okpd2Nomenclature } from '../../data/tendersData.js';
import { GoTriangleRight, GoTriangleUp } from "react-icons/go";
import { GoTriangleDown } from "react-icons/go";
import { Checkbox } from '@mui/material';

export function RegionSelect({ closeModal, setRegion, regionCustomer }: any) {

    const [findText, setFindText] = React.useState('')
    const [nomenclature, setNomenclature] = React.useState([...okpd2Nomenclature])
    const [selectCheckBox, setSelectCheckBox] = React.useState('')
    const [showAllElements, setShowAllElements] = React.useState('')



    const clearText = () => {
        setFindText('')
        setRegion([])
        setSelectCheckBox('')
        setNomenclature([...okpd2Nomenclature])
    }

    const clickCheckBox = (element: any) => {
        setSelectCheckBox(element.name)
        setRegion(element.name)
    }

    const clickOnTriangle = (code: any) => {
        setShowAllElements(code)
    }

    const findByText = () => {

        if (findText == '') {
            return setNomenclature([...okpd2Nomenclature])
        }
        const filteredData = okpd2Nomenclature.filter(item => item.name.toLowerCase().includes(findText.toLowerCase()));

        setNomenclature([...filteredData])

    }

    React.useEffect(() => {

        findByText()

    }, [findText])



    return (
        <div className='okpd2-select-container' onClick={closeModal}>
            <div className="okpd2-select-content" onClick={(e: any) => e.stopPropagation()}>
                <h3>Регион поставки</h3>
                <br />
                <div className='okpd2-select-inputContainer'>
                    <input type="text" className='okpd2-select-input' placeholder='Введите полностью или часть наименования региона' value={findText} onChange={(e: any) => setFindText(e.target.value)} />
                    <button className='okpd2-select-searchButton' >Найти</button>
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
                                                    <Checkbox checked={selectCheckBox == element.code || element.name == regionCustomer} onChange={() => clickCheckBox(element)} />
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

                                                                    <Checkbox checked={selectCheckBox == child.code || child.name == regionCustomer} onChange={() => clickCheckBox(child)} />
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
                                                <Checkbox checked={selectCheckBox == element.code || element.name == regionCustomer} onChange={() => clickCheckBox(element)} />
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
