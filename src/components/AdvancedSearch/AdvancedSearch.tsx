import * as React from 'react';
import './AdvancedSearch.css'
import Select from 'react-select'
import { TailSpin } from 'react-loader-spinner';
import { LoaderTest } from '../../styles';
import { Checkbox, FormControlLabel } from '@mui/material';
// import DatePicker from "react-datepicker";
import { Okpd2Select } from '../OKPD2Select/Okpd2Select';
import { RegionSelect } from '../RegionSelect/RegionSelect';
import { IonContent, IonDatetime, IonDatetimeButton, IonItem, IonLabel, IonModal, IonPage, setupIonicReact } from '@ionic/react';
import "react-datepicker/dist/react-datepicker.css";
import { methodDeterminingSupplierList, okpd2Nomenclature, sourcesTenders } from '../../data/tendersData.js';
import { DatePickerCustom } from '../DatePicker/DatePicker';


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
        okpd2, setOkpd2,
        methodDeterminingSupplier, setMethodDeterminingSupplier,
        purchaseStage, setPurchaseStage,
    }: any
) {





    const handleCheckboxChangeMethodSupplier = (options: any) => {
        setMethodDeterminingSupplier(options)
    }

    const handleCheckboxChangePurchaseStage = (stage: any) => {
        console.log(stage);
        console.log(purchaseStage);


        if (purchaseStage.includes(stage)) {
            setPurchaseStage([...purchaseStage.filter((element: any) => element != stage)])
        } else {
            setPurchaseStage([...purchaseStage, stage])
        }
    }

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


    const getSource = (value: any) => {
        for (let i = 0; i < sourcesTenders.length; i++) {
            const source = sourcesTenders[i];
            if (source.value == value) return source
        }
    }



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
                            <input type="text" className='AdvancedSearch-input' placeholder='' value={region.map((item: any) => item.name).join(', ')} />
                        </div>
                    </div>

                    <div className='AdvancedSearch-inputForm' onClick={() => setShowOkpd2Select(true)}>
                        <p className='AdvancedSearch-inputname'>ОКПД2</p>
                        <input type="text" className='AdvancedSearch-input' placeholder='' value={okpd2.map((item: any) => item.name).join(', ')} />
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
                    <div className='AdvancedSearch-inputForm' style={{ paddingBottom: '0' }}>
                        <p className='AdvancedSearch-inputname'>Заказчик или организатор</p>
                        <input type="text" className='AdvancedSearch-input' placeholder='Наименование заказчика или организатора' value={customerName} onChange={(e: any) => setCustomerName(e.target.value)} />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <FormControlLabel control={<Checkbox defaultChecked={Boolean(stopCustomerName)} onChange={() => setStopCustomerName(!Boolean(stopCustomerName))} />} label="Исключить заказчика" />
                    </div>

                    <div className='AdvancedSearch-inputForm'>
                        <p className='AdvancedSearch-inputname'>ИНН</p>
                        <input type="text" className='AdvancedSearch-input' placeholder='Разделённые пробелами ИНН заказчика или организатора' value={inn} onChange={(e: any) => setInn(e.target.value)} />
                    </div>

                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div className='AdvancedSearch-inputForm' style={{ paddingBottom: '0' }}>
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
                                <p className='AdvancedSearch-inputname'>Размещено</p>
                                <div style={{ marginLeft: '116px', paddingBottom: '5px' }}>
                                    <DatePickerCustom date={startDateFrom != '' ? new Date(startDateFrom) : startDateFrom} setDate={(newdate: any) => setStartDateFrom(newdate)} />
                                </div>
                            </div>
                            <div className='AdvancedSearch-inputForm'>
                                <p className='AdvancedSearch-inputname'>до</p>
                                <div style={{ paddingBottom: '5px' }}>
                                    <DatePickerCustom date={startDateTo != '' ? new Date(startDateTo) : startDateTo} setDate={(newdate: any) => setStartDateTo(newdate)} />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div className='AdvancedSearch-inputForm'>
                                <p className='AdvancedSearch-inputname'>Окончание подачи заявки</p>
                                {/* <DatePicker className='AdvancedSearch-input' selected={endDateFrom != '' ? new Date(endDateFrom) : endDateFrom} onChange={(e: any) => setEndDateFrom(e)} /> */}
                                <div style={{ marginLeft: '', paddingBottom: '5px' }}>
                                    <DatePickerCustom date={endDateFrom != '' ? new Date(endDateFrom) : endDateFrom} setDate={(newdate: any) => setEndDateFrom(newdate)} />
                                </div>

                            </div>
                            <div className='AdvancedSearch-inputForm'>
                                <p className='AdvancedSearch-inputname'>до</p>
                                <div style={{ paddingBottom: '5px' }}>
                                    <DatePickerCustom date={endDateTo != '' ? new Date(endDateTo) : endDateTo} setDate={(newdate: any) => setEndDateTo(newdate)} />
                                </div>

                            </div>
                        </div>
                    </div>

                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div className='AdvancedSearch-inputForm'>
                                <p className='AdvancedSearch-inputname'>Обновлено</p>
                                <div style={{ marginLeft: '116px', paddingBottom: '5px' }}>
                                    <DatePickerCustom date={publicDateFrom != '' ? new Date(publicDateFrom) : publicDateFrom} setDate={(newdate: any) => setPublicDateFrom(newdate)} />
                                </div>
                            </div>
                            <div className='AdvancedSearch-inputForm'>
                                <p className='AdvancedSearch-inputname'>до</p>
                                <div style={{ paddingBottom: '5px' }}>
                                    <DatePickerCustom date={publicDateTo != '' ? new Date(publicDateTo) : publicDateTo} setDate={(newdate: any) => setPublicDateTo(newdate)} />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className='AdvancedSearch-inputForm'>
                            <p className='AdvancedSearch-inputname'>Этап закупки</p>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr' }}>
                                <FormControlLabel control={<Checkbox defaultChecked={purchaseStage.includes("Подача заявок")} onClick={() => handleCheckboxChangePurchaseStage("Подача заявок")} />} label="Подача заявок" />
                                <FormControlLabel control={<Checkbox defaultChecked={purchaseStage.includes("Закупка отменена")} onClick={() => handleCheckboxChangePurchaseStage("Закупка отменена")} />} label="Закупка отменена" />
                                <FormControlLabel control={<Checkbox defaultChecked={purchaseStage.includes("Работа комиссии")} onClick={() => handleCheckboxChangePurchaseStage("Работа комиссии")} />} label="Работа комиссии" />
                                <FormControlLabel control={<Checkbox defaultChecked={purchaseStage.includes("Закупка приостановлена")} onClick={() => handleCheckboxChangePurchaseStage("Закупка приостановлена")} />} label="Закупка приостановлена" />
                                <FormControlLabel control={<Checkbox defaultChecked={purchaseStage.includes("Закупка завершена")} onClick={() => handleCheckboxChangePurchaseStage("Закупка завершена")} />} label="Закупка завершена" />
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className='AdvancedSearch-inputForm'>
                            <p className='AdvancedSearch-inputname'>Способ определения поставщика</p>
                            <div style={{ width: '100%' }}>
                                <Select options={methodDeterminingSupplierList} placeholder='Не выбрано' isMulti onChange={handleCheckboxChangeMethodSupplier} value={methodDeterminingSupplier} />
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
                                <div style={{ width: '100%' }}>
                                    <Select options={sourcesTenders} placeholder='Не выбрано' isMulti onChange={(v: any) => setSource(v[0]?.value)} value={getSource(source)} />
                                </div>
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
