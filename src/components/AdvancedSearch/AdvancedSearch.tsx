import * as React from 'react';
import './AdvancedSearch.css'
import Select from 'react-select'

export interface IAdvancedSearchProps {
}

export default function AdvancedSearch(props: IAdvancedSearchProps) {

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
            <div className='AdvancedSearch-content'>
                <form className='AdvancedSearch-form'>

                    <div className='AdvancedSearch-inputForm'>
                        <p className='AdvancedSearch-inputname'>Ключевые слова</p>
                        <input type="text" className='AdvancedSearch-input' placeholder='Введите слова по которым вы хотите найти тендеры' />
                    </div>

                    <div className='AdvancedSearch-inputForm'>
                        <p className='AdvancedSearch-inputname'>Исключить слова</p>
                        <input type="text" className='AdvancedSearch-input' placeholder='Слова, которые будут исключены из поиска' />
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
                    <div className='AdvancedSearch-inputForm'>
                        <p className='AdvancedSearch-inputname'>Регион заказчика</p>
                        <div style={{ width: '100%' }}>
                            <Select options={regionOptions} placeholder='Не выбрано' />
                        </div>
                    </div>

                    <div className='AdvancedSearch-inputForm'>
                        <p className='AdvancedSearch-inputname'>Регион доставки</p>
                        <div style={{ width: '100%' }}>
                            <Select options={regionOptions} placeholder='Не выбрано' />
                        </div>
                    </div>

                    <div className='AdvancedSearch-inputForm'>
                        <p className='AdvancedSearch-inputname'>ОКПД2</p>
                        <div style={{ width: '100%' }}>
                            <Select options={okpd2Options} placeholder='Не выбрано' />
                        </div>
                    </div>
                </form>
                <form className='AdvancedSearch-form'>
                    <div className='AdvancedSearch-inputForm'>
                        <p className='AdvancedSearch-inputname'>Номер тендера</p>
                        <input type="text" className='AdvancedSearch-input' placeholder='Номер тендера (через пробел)' />
                    </div>
                </form>
            </div>
            <div className='AdvancedSearch-content'>
                <form className='AdvancedSearch-form'>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </form>
                <form className='AdvancedSearch-form'>
                    <div></div>
                </form>
            </div>
        </div>
    );
}
