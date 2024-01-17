import { FC, Fragment, useEffect, useState } from "react";
import { TenderPreiewCard44, TenderPreiewCard223 } from "../../components/TenderPreviewCard";
import { AdvancedFindP, CatalogPage, FindByIDButton, FinderByID, LoaderTest } from "./styles";
import axios from "axios";
import { TextBlack14pxRegular, TextBlack22pxRegular, TextGray14pxRegular } from "../../constants/fonts";
import { FlexRow, FlexTextRow } from "../../containers/containers";
import { TailSpin } from 'react-loader-spinner';
import { AccesNotif } from "../../components/AccessNotif/AccesNotif";
import { showErrorMessage, showSuccesMessage } from "../../functions/Message";
import { checkAuth } from "../../functions/CheckAuth.js";
import { checkDigitsOnly } from "../../functions/CheckDigitsOnly";

interface Tender {
    fz?: string
}

export const Catalog: FC = () => {
    const [tenders, setTenders] = useState([]);
    const [tendersCount, setTendersCount] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [countItems, setCountItems] = useState(10);
    // const [findedTenderId, setFindedTenderId] = useState('')
    const [fz, setFz] = useState('')
    const [loading, setLoading] = useState(false) // true
    const [textSearch, setTextSearch] = useState('')


    const [auth, setAuth] = useState<boolean>(false)
    const [openAccesNotif, setOpenAccesNotif] = useState(true)


    const fetchData = async () => {
        try {

            let limit
            if (currentPage == 1) {
                limit = `${currentPage}-${currentPage + 20}`
            } else {
                limit = `${currentPage * 20}-${(currentPage * 20) + 20}`
            }

            setLoading(true)
            if(!checkDigitsOnly(textSearch) || textSearch == '') {

                const response = await axios.post(`${process.env.REACT_APP_API}/api/find/find`, {
                    limit: limit,
                    tags: textSearch.trim()
                });

                setTenders(response.data.message);

            } else {
                const response = await axios.get(`${process.env.REACT_APP_API}/api/find/innOrRegnumber/${textSearch}`);
                console.log(response.data.tender);

                setTenders(response.data.tender); // Обновите состояние данными из ответа
            }

            setLoading(false)
        } catch (error) {
            console.log(error);

            showErrorMessage('Что то пошло не так. Попробуйте позже!')
        }
    };

    const fetchTendersCount = async () => {
        // try {
        //     const response = await axios.get(`${process.env.REACT_APP_API_URL}client/tendersCount${fz !== '' ? '?fz=' + fz : ''}`);
        //     setTendersCount(response.data); // Обновите состояние данными из ответа
        // } catch (error) {
        //     console.error('Ошибка при выполнении запроса:', error);
        // }
    };


    useEffect(() => {

        checkAuth().then((auth) => setAuth(auth))
        console.log('fz', fz)

        fetchData();
    }, [currentPage, fz]);


    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
        fetchData()
    };

    let check44 = false
    let check223 = false

    const checkFz = () => {
        console.log('check44', check44);
        console.log('check223', check223);
        const reasonAll = (check44 && check223) || (!check44 && !check223)
        const reason44 = check44 && !check223
        const reason223 = check223 && !check44
        switch (true) {
            case reasonAll: { setFz(''); break }
            case reason44: { setFz('44'); break }
            case reason223: { setFz('223'); break }
        }
    }

    // const handleCheckbox223Change = () => {
    //     check223 = !check223
    // };

    // const handleCheckbox44Change = () => {
    //     check44 = !check44
    // };




    // @ts-ignore
    return (
        <Fragment>
            {
                !auth && <AccesNotif openAccesNotif={openAccesNotif} setOpenAccesNotif={setOpenAccesNotif} />
            }
            {loading ? (
                <LoaderTest>
                    <TailSpin color="#3294F4" height={150} width={150} />
                </LoaderTest>
            ) : (
                <CatalogPage>
                    <FlexRow style={{ width: '100%', justifyContent: 'flex-start' }}>
                        <FinderByID placeholder="Введите полностью или часть номера, наименование закупки, идентификационного номера кода закупки" onChange={(event) => setTextSearch(event.target.value)} value={textSearch} />
                        <FindByIDButton onClick={
                            () => {
                                if (!auth) return showErrorMessage('Для доступа к поиску необходимо авторизоваться')
                                fetchData()

                            }
                        }>Поиск</FindByIDButton>
                    </FlexRow>
                    <FlexRow style={{ width: '100%', justifyContent: 'flex-end' }}>
                        <div style={{ width: "18%", display: 'flex', justifyContent: 'center' }}>
                            <AdvancedFindP>Расширенный поиск</AdvancedFindP>
                        </div>
                    </FlexRow>
                    <FlexTextRow style={{ alignItems: 'center', gap: '20px' }}>
                        <TextBlack22pxRegular>Результаты поиска</TextBlack22pxRegular>
                        {/* <TextGray14pxRegular>найдено 26000 тендеров</TextGray14pxRegular> */}
                    </FlexTextRow>
                    {/* <FlexRow style={{ width: '100%', justifyContent: 'flex-start' }}>
                        <label>
                            <input
                                type="checkbox"
                                onChange={handleCheckbox223Change}
                            />
                            ФЗ 223
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                onChange={handleCheckbox44Change}
                            />
                            ФЗ 44
                        </label>
                    </FlexRow> */}
                    {tenders
                        .map((item: Tender, index) => (
                            // Проверка на null перед отображением TenderPreiewC
                            item ?
                                item?.fz === 'fz223' ? (<TenderPreiewCard223 key={index} jsonData={item} auth={auth} setAuth={setAuth} />) :
                                    (<TenderPreiewCard44 key={index} jsonData={item} />)
                                : null

                        ))}
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                            Назад
                        </button>
                        <span style={{ margin: '0 10px' }}>Страница {currentPage}</span>
                        <button onClick={() => {
                            if (!auth) return showErrorMessage('Для просмотра всех тендеров необходимо авторизоваться')
                            handlePageChange(currentPage + 1)
                        }}>
                            Вперед
                        </button>
                    </div>
                    {/*<FlexRow>*/}
                    {/*    <ShowCount>*/}
                    {/*        <TextGray14pxRegular>Показать по</TextGray14pxRegular>*/}
                    {/*        <TextBlack14pxRegular onClick={() => setCountItems(10)}>10</TextBlack14pxRegular>*/}
                    {/*        <TextBlack14pxRegular onClick={() => setCountItems(20)}>20</TextBlack14pxRegular>*/}
                    {/*        <TextBlack14pxRegular onClick={() => setCountItems(30)}>30</TextBlack14pxRegular>*/}
                    {/*        <TextBlack14pxRegular></TextBlack14pxRegular>*/}
                    {/*        <TextBlack14pxRegular onClick={() => setCountItems(50)}>50</TextBlack14pxRegular>*/}
                    {/*    </ShowCount>*/}
                    {/*</FlexRow>*/}
                </CatalogPage>
            )}
        </Fragment>
    );
};