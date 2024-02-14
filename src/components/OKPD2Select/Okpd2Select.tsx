import * as React from 'react';
import './Okpd2Select.css'
import { okpd2Nomenclature } from '../../data/tendersData.js';
import { GoTriangleRight, GoTriangleUp } from "react-icons/go";
import { GoTriangleDown } from "react-icons/go";
import { Checkbox } from '@mui/material';

export function Okpd2Select({ closeModal, setOkpd2Code, okpd2Code }: any) {

    const [findText, setFindText] = React.useState('')
    const [nomenclature, setNomenclature] = React.useState([...okpd2Nomenclature])
    const [selectCheckBox, setSelectCheckBox] = React.useState<any>([])
    const [showAllElements, setShowAllElements] = React.useState('')



    const clearText = () => {
        setFindText('')
        setNomenclature([...okpd2Nomenclature])
    }


    const clickCheckBox = (element: any) => {
        for (let i = 0; i < okpd2Code.length; i++) {
            const okpd2 = okpd2Code[i];

            if (okpd2.code != element.code) {
                setSelectCheckBox([...selectCheckBox, element])
                setOkpd2Code([...selectCheckBox, element])
            } else {
                setSelectCheckBox([...selectCheckBox.filter((checkBox: any) => checkBox.code != element.code)])
                setOkpd2Code([...selectCheckBox.filter((checkBox: any) => checkBox.code != element.code)])
            }
        }
    }

    const clickOnTriangle = (code: any) => {
        setShowAllElements(code)
    }

    const findByText = () => {

        if (findText == '') {
            return setNomenclature([...okpd2Nomenclature])
        }

        //const filteredData = okpd2Nomenclature.filter(item => item.name.toLowerCase().includes(findText.toLowerCase()));

        const filteredData = okpd2Nomenclature.filter((item) => {
            const isMatch = item.name.toLowerCase().includes(findText.toLowerCase());

            if (isMatch) {
                return true;
            }

            if (item.child && item.child.length > 0) {
                // Проверяем наличие совпадений в дочернем массиве
                const isChildMatch = item.child.some((childItem) =>
                    childItem.name.toLowerCase().includes(findText.toLowerCase())
                );

                if (isChildMatch) {
                    return true;
                }
            }

            return false;
        });

        setNomenclature([...filteredData])

    }

    React.useEffect(() => {

        console.log(okpd2Nomenclature);
        findByText()

    }, [findText])



    return (
        <div className='okpd2-select-container' onClick={closeModal}>
            <div className="okpd2-select-content" onClick={(e: any) => e.stopPropagation()}>
                <h3>Номенклатура (ОКПД2)</h3>
                <br />
                <div className='okpd2-select-inputContainer'>
                    <input type="text" className='okpd2-select-input' placeholder='Введите полностью или часть наименования товара, работы или услуги' value={findText} onChange={(e: any) => setFindText(e.target.value)} />
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
                                                    <Checkbox checked={
                                                        selectCheckBox.forEach((select: any) => {
                                                            if (element.code == select.code) return true
                                                        })
                                                    } onChange={() => clickCheckBox(element)} />
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

                                                                    <Checkbox checked={
                                                                        selectCheckBox.forEach((select: any) => {
                                                                            if (child.code == child.code) return true
                                                                        })
                                                                    } onChange={() => clickCheckBox(child)} />
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
                                                <Checkbox checked={
                                                    selectCheckBox.forEach((select: any) => {
                                                        if (element.code == select.code) return true
                                                    })
                                                } onChange={() => clickCheckBox(element)} />
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
