import * as React from 'react';
import './AdvancedSearch.css'
import Select from 'react-select'
import { TailSpin } from 'react-loader-spinner';
import { LoaderTest } from '../../styles';
import { Checkbox, FormControlLabel } from '@mui/material';
import DatePicker from "react-datepicker";
import { Okpd2Select } from '../OKPD2Select/Okpd2Select';
import { RegionSelect } from '../RegionSelect/RegionSelect';

import "react-datepicker/dist/react-datepicker.css";



export interface IAdvancedSearchProps {
}

export default function AdvancedSearch(
    {
        tags, setTags,
        stopTags, setStopTags,
        publicDateFrom, setPublicDateFrom,
        publicDateTo, setPublicDateTo,
        startDateFrom, setStartDateFrom,
        startDateTo, setStartDateTo,
        endDateFrom, setEndDateFrom,
        endDateTo, setEndDateTo,
        fz, setFz,
        region, setRegion,
        tenderNum, setTenderNum,
        customerName, setCustomerName,
        stopCustomerName, setStopCustomerName,
        inn, setInn,
        priceFrom, setPriceFrom,
        priceTo, setPriceTo,
        enablePrice, setEnablePrice,
        source, setSource,
        enableSource, setEnableSource,
        okpd2, setOkpd2
    }: any
) {



    const [showOkpd2Select, setShowOkpd2Select] = React.useState(false)

    const [showRegionSelect, setShowRegionSelect] = React.useState(false)

    const changeRegion = (e: any) => {
        setRegion(e)
    }


    const changeFz = (addfz: any) => {

        console.log(fz.split(' ').includes('fz223'));

        let res = fz.split(' ')

        if (res.includes(addfz)) {
            res = res.filter((fz: any) => fz != addfz)
        } else {
            res.push(addfz)
        }

        res = res.join(' ')

        setFz(res)

    }

    const checkSelectFz = (selectFz: any) => {
        const isSelect = fz.split(' ').includes(selectFz)

        return isSelect

    }

    const regionOptions =
        [
            { value: '', label: 'Не выбрано' },

            { value: 'Регион1', label: 'Регион 1' },
            { value: 'Регион2', label: 'Регион 2' },
            { value: 'Регион3', label: 'Регион 3' },
            { value: 'Регион4', label: 'Регион 4' },
        ]

    const okpd2Options = [

        { value: '', label: 'Не выбрано' },

        { value: 'Выбор1', label: 'Выбор 1' },
        { value: 'Выбор1', label: 'Выбор 2' },
        { value: 'Выбор1', label: 'Выбор 3' },
        { value: 'Выбор1', label: 'Выбор 4' },

    ]



    return (
        <div className='AdvancedSearch-container'>
            {
                showOkpd2Select && <Okpd2Select closeModal={() => setShowOkpd2Select(false)} setOkpd2Code={setOkpd2} okpd2Code={okpd2} />
            }
            {
                showRegionSelect && <RegionSelect closeModal={() => setShowRegionSelect(false)} setRegionCustomer={changeRegion} regionCustomer={region} value={'Регион заказчика'} />
            }
            <div className='AdvancedSearch-content'>
                <form className='AdvancedSearch-form'>

                    <div className='AdvancedSearch-inputForm'>
                        <p className='AdvancedSearch-inputname'>Ключевые слова</p>
                        <input type="text" className='AdvancedSearch-input' value={tags} placeholder='Введите слова по которым вы хотите найти тендеры' onChange={(e: any) => setTags(e.target.value)} />
                    </div>

                    <div className='AdvancedSearch-inputForm'>
                        <p className='AdvancedSearch-inputname'>Исключить слова</p>
                        <input type="text" className='AdvancedSearch-input' value={stopTags} placeholder='Слова, которые будут исключены из поиска' onChange={(e: any) => setStopTags(e.target.value)} />
                    </div>

                    <div className='AdvancedSearch-inputForm'>
                        <p className='AdvancedSearch-inputname'>Поиск слов в документации</p>
                        <input type="text" className='AdvancedSearch-input' placeholder='Слова, которые хотите найти только в документации тендера' />
                    </div>

                    <div className='AdvancedSearch-inputForm'>
                        <p className='AdvancedSearch-inputname'>Исключить слова из документации</p>
                        <input type="text" className='AdvancedSearch-input' placeholder='Слова, которые будут исключены из поиска документации' />
                    </div>

                </form>
                <form className='AdvancedSearch-form'>
                    <div className='AdvancedSearch-inputForm' onClick={() => setShowRegionSelect(true)}>
                        <p className='AdvancedSearch-inputname'>Регион заказчика</p>
                        <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
                            <input type="text" className='AdvancedSearch-input' placeholder='' value={region.name} />
                        </div>
                    </div>

                    <div className='AdvancedSearch-inputForm' onClick={() => setShowOkpd2Select(true)}>
                        <p className='AdvancedSearch-inputname'>ОКПД2</p>
                        <input type="text" className='AdvancedSearch-input' placeholder='' value={okpd2.name} />
                    </div>
                </form>
                <form className='AdvancedSearch-form'>
                    <div className='AdvancedSearch-inputForm'>
                        <p className='AdvancedSearch-inputname'>Номер тендера</p>
                        <input type="text" className='AdvancedSearch-input' placeholder='Номер тендера (через пробел)' value={tenderNum} onChange={(e: any) => setTenderNum(e.target.value)} />
                    </div>
                </form>
            </div>
            <div className='AdvancedSearch-content'>
                <form className='AdvancedSearch-form'>
                    <div className='AdvancedSearch-inputForm'>
                        <p className='AdvancedSearch-inputname'>Заказчик или организатор</p>
                        <input type="text" className='AdvancedSearch-input' placeholder='Наименование заказчика или организатора' value={customerName} onChange={(e: any) => setCustomerName(e.target.value)} />
                    </div>

                    <div className='AdvancedSearch-inputForm'>
                        <p className='AdvancedSearch-inputname'>ИНН</p>
                        <input type="text" className='AdvancedSearch-input' placeholder='Разделённые пробелами ИНН заказчика или организатора' value={inn} onChange={(e: any) => setInn(e.target.value)} />
                    </div>

                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div className='AdvancedSearch-inputForm'>
                                <p className='AdvancedSearch-inputname'>Цена котракта от</p>
                                <input type="text" className='AdvancedSearch-input' placeholder='Минимальная цена' value={priceFrom} onChange={(e: any) => setPriceFrom(e.target.value)} />
                            </div>
                            <div className='AdvancedSearch-inputForm'>
                                <p className='AdvancedSearch-inputname'>до</p>
                                <input type="text" className='AdvancedSearch-input' placeholder='Максимальная цена' value={priceTo} onChange={(e: any) => setPriceTo(e.target.value)} />
                            </div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <FormControlLabel control={<Checkbox defaultChecked={Boolean(enablePrice)} onChange={() => setEnablePrice(!Boolean(enablePrice))} />} label="Включая тендеры без цены" />
                        </div>
                    </div>

                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div className='AdvancedSearch-inputForm'>
                                <p className='AdvancedSearch-inputname'>Дата начала от</p>
                                <DatePicker className='AdvancedSearch-input' selected={startDateFrom != '' ? new Date(startDateFrom) : startDateFrom} onChange={(e: any) => setStartDateFrom(e)} />
                            </div>
                            <div className='AdvancedSearch-inputForm'>
                                <p className='AdvancedSearch-inputname'>до</p>
                                <DatePicker className='AdvancedSearch-input' selected={startDateTo != '' ? new Date(startDateTo) : startDateTo} onChange={(e: any) => setStartDateTo(e)} />
                            </div>
                        </div>
                    </div>

                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div className='AdvancedSearch-inputForm'>
                                <p className='AdvancedSearch-inputname'>Дата окончания от</p>
                                <DatePicker className='AdvancedSearch-input' selected={endDateFrom != '' ? new Date(endDateFrom) : endDateFrom} onChange={(e: any) => setEndDateFrom(e)} />
                            </div>
                            <div className='AdvancedSearch-inputForm'>
                                <p className='AdvancedSearch-inputname'>до</p>
                                <DatePicker className='AdvancedSearch-input' selected={endDateTo != '' ? new Date(endDateTo) : endDateTo} onChange={(e: any) => setEndDateTo(e)} />
                            </div>
                        </div>
                    </div>

                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div className='AdvancedSearch-inputForm'>
                                <p className='AdvancedSearch-inputname'>Дата публикации от</p>
                                <DatePicker className='AdvancedSearch-input' selected={publicDateFrom != '' ? new Date(publicDateFrom) : publicDateFrom} onChange={(e: any) => setPublicDateFrom(e)} />
                            </div>
                            <div className='AdvancedSearch-inputForm'>
                                <p className='AdvancedSearch-inputname'>до</p>
                                <DatePicker className='AdvancedSearch-input' selected={publicDateTo != '' ? new Date(publicDateTo) : publicDateTo} onChange={(e: any) => setPublicDateTo(e)} />
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className='AdvancedSearch-inputForm'>
                            <p className='AdvancedSearch-inputname'>Этап закупки</p>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr' }}>
                                <FormControlLabel control={<Checkbox defaultChecked={false} />} label="Подача заявок" />
                                <FormControlLabel control={<Checkbox defaultChecked={false} />} label="Закупка отменена" />
                                <FormControlLabel control={<Checkbox defaultChecked={false} />} label="Работа комиссии" />
                                <FormControlLabel control={<Checkbox defaultChecked={false} />} label="Закупка приостановлена" />
                                <FormControlLabel control={<Checkbox defaultChecked={false} />} label="Закупка завершена" />
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className='AdvancedSearch-inputForm'>
                            <p className='AdvancedSearch-inputname'>Способ определения поставщика</p>
                            <div style={{ width: '100%' }}>
                                <Select options={okpd2Options} placeholder='Не выбрано' />
                            </div>
                        </div>

                    </div>

                    <div>
                        <div className='AdvancedSearch-inputForm'>
                            <p className='AdvancedSearch-inputname'>Законы</p>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr' }}>
                                <FormControlLabel control={<Checkbox checked={fz.split(' ').includes('fz44')} onChange={(e) => changeFz('fz44')} />} label="44-ФЗ" />
                                <FormControlLabel control={<Checkbox checked={fz.split(' ').includes('fz223')} onChange={(e) => changeFz('fz223')} />} label="223-ФЗ" />
                                <FormControlLabel control={<Checkbox defaultChecked={false} />} label="Коммерческие" />
                            </div>
                        </div>
                    </div>

                </form>
                <form className='AdvancedSearch-form'>
                    <div>
                        <div>

                            <div className='AdvancedSearch-inputForm'>
                                <p className='AdvancedSearch-inputname'>Источник</p>
                                <input type="text" className='AdvancedSearch-input' placeholder='Например: zakupki' value={source} onChange={(e: any) => setSource(e.target.value)} />
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <FormControlLabel control={<Checkbox defaultChecked={Boolean(enableSource)} onChange={() => setEnableSource(!Boolean(enableSource))} />} label="Исключить источник" />
                            </div>

                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
