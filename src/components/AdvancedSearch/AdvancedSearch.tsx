import * as React from 'react';
import './AdvancedSearch.css'

export interface IAdvancedSearchProps {
}

export default function AdvancedSearch(props: IAdvancedSearchProps) {
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
                    <div className='AdvancedSearch-inputForm'></div>
                    <div className='AdvancedSearch-inputForm'></div>
                    <div className='AdvancedSearch-inputForm'></div>
                </form>
                <form className='AdvancedSearch-form'>
                    <div className='AdvancedSearch-inputForm'></div>
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
