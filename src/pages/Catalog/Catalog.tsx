import { FC, Fragment, useContext, useEffect, useState } from "react";
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
import { MenuContext } from "../../MenuContext";
import { createReportMyTender } from "../../functions/createReportMyTenders";
import { RiFileExcel2Line } from "react-icons/ri";


export const Catalog: FC = () => {
    const [tendersList, setTendersList] = useState([]);
    const [myTenders, setMyTenders] = useState<any[]>([])

    const [tendersCount, setTendersCount] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [countItems, setCountItems] = useState(10);
    // const [findedTenderId, setFindedTenderId] = useState('')
    const [fz, setFz] = useState('')
    const [loading, setLoading] = useState(false) // true
    const [textSearch, setTextSearch] = useState('')


    const [auth, setAuth] = useState<boolean>(false)
    const [openAccesNotif, setOpenAccesNotif] = useState(true)
    const [beforeTenders, setBeforeTenders] = useState<any>([])

    const [sortByDateAdded, setSortByDateAdded] = useState(true)
    const [sortByDateStart, setSortByDateStart] = useState(false)
    const [sortByPrice, setSortByPrice] = useState(false)
    const [sortByDateFinished, setSortByDateFinished] = useState(false)
    const [sortByDatePublic, setSortByDatePublic] = useState(false)

    const { openMenu, setOpenMenu }: any = useContext(MenuContext);


    const fetchData = async () => {
        try {

            let limit
            if (currentPage == 1) {
                limit = `${currentPage}-${currentPage + 20}`
            } else {
                limit = `${currentPage * 20}-${(currentPage * 20) + 20}`
            }

            setLoading(true)
            if (!checkDigitsOnly(textSearch) || textSearch == '') {

                const response = await axios.post(`${process.env.REACT_APP_API}/api/find/find`, {
                    limit: limit,
                    tags: textSearch.trim()
                });

                setTendersList(response.data.message);
                setBeforeTenders(response.data.message)

            } else {
                const response = await axios.get(`${process.env.REACT_APP_API}/api/find/innOrRegnumber/${textSearch}`);
                console.log(response.data.tender);

                setTendersList(response.data.tender); // Обновите состояние данными из ответа
                setBeforeTenders(response.data.message)
            }

            setLoading(false)
        } catch (error) {
            console.log(error);

            showErrorMessage('Что то пошло не так. Попробуйте позже!')
        }
    };

    const getMyTenders = async () => {
        try {
            setLoading(true)

            const token = localStorage.getItem('token')

            const response = await axios.get(`${process.env.REACT_APP_API}/api/lk/mytenders`, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            })
            const tenders: any = response.data.message
            console.log(tenders);

            for (let i = 0; i < tenders.length; i++) {
                const tenderInfo = tenders[i];

                const response = await axios.get(`${process.env.REACT_APP_API}/api/find/innOrRegnumber/${tenderInfo.reg_num}`, {
                    headers: {
                        authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                })

                const tender = response.data.tender[0]

                setMyTenders([...myTenders, tender])

            }



            setLoading(false)
        } catch (error) {
            showErrorMessage('Что то пошло не так, попробуйте позже!')
        }
    }

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
        //getMyTenders()
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

    const sortByDatePublicTenders = () => {
        const newTendersArray = beforeTenders.sort((a: any, b: any) => {
            console.log(a);

            if (a.fz == 'fz223') {
                const aDate = a?.publicationDateTime
                const bDate = b.fz == 'fz223' ? b?.publicationDateTime : b?.commonInfo?.publishDTInEIS

                return new Date(bDate).getTime() - new Date(aDate).getTime()
            } else {
                const aDate = a?.commonInfo?.publishDTInEIS
                const bDate = b.fz == 'fz223' ? b?.publicationDateTime : b?.commonInfo?.publishDTInEIS


                return new Date(bDate).getTime() - new Date(aDate).getTime()
            }
        })


        setTendersList(newTendersArray)
    }

    const sortByDateStartTenders = () => {

        const newTendersArray = beforeTenders.sort((a: any, b: any) => {
            console.log(a);

            if (a.fz == 'fz223') {
                const aDate = a?.publicationDateTime
                const bDate = b.fz == 'fz223' ? b?.publicationDateTime : b?.notificationInfo?.procedureInfo?.collectingInfo?.startDT

                return new Date(bDate).getTime() - new Date(aDate).getTime()
            } else {
                const aDate = a?.notificationInfo?.procedureInfo?.collectingInfo?.startDT
                const bDate = b.fz == 'fz223' ? b?.publicationDateTime : b?.notificationInfo?.procedureInfo?.collectingInfo?.startDT

                return new Date(bDate).getTime() - new Date(aDate).getTime()
            }
        })


        setTendersList(newTendersArray)

    }

    const sortByPriceTenders = () => {

        const newTendersArray = beforeTenders.sort((a: any, b: any) => {
            console.log(a);

            if (a.fz == 'fz223') {
                const aPrice = a.lots?.lot?.lotData?.initialSum
                const bPrice = b.fz == 'fz223' ? b.lots?.lot?.lotData?.initialSum : b.notificationInfo?.contractConditionsInfo?.maxPriceInfo?.maxPrice

                return parseFloat(aPrice) - parseFloat(bPrice)
            } else {
                const aPrice = a.notificationInfo?.contractConditionsInfo?.maxPriceInfo?.maxPrice
                const bPrice = b.fz == 'fz223' ? b.lots?.lot?.lotData?.initialSum : b.notificationInfo?.contractConditionsInfo?.maxPriceInfo?.maxPrice

                return parseFloat(aPrice) - parseFloat(bPrice)
            }
        })


        setTendersList(newTendersArray)

    }

    const showFinishedTenders = () => {
        const newTendersArray = beforeTenders.map((tender: any) => {

            if (tender.fz == 'fz223') {
                if (!tender.applSubmisionStartDate) {
                    return
                }
                if (new Date(tender.applSubmisionStartDate).getTime() < new Date().getTime()) {
                    return tender
                }
            }

            if (tender.fz == 'fz44') {
                if (!tender.notificationInfo?.procedureInfo?.collectingInfo?.endDT) {
                    return
                }
                if (new Date(tender.notificationInfo?.procedureInfo?.collectingInfo?.endDT).getTime() < new Date().getTime()) {

                    return tender
                }
            }

        })

        setTendersList(newTendersArray)
    }


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
                    <div className="Mytenders-sort">
            <div className='Mytenders-sort-list'>
              <div style={{ color: 'gray', paddingLeft: '0px', display: 'flex', justifyContent: 'center', alignItems: 'center', paddingRight: '15px' }}><p>Сортировать по</p></div>

              <div className="sort-property" onClick={() => {
                setSortByDateAdded(false)
                setSortByDateStart(true)
                setSortByPrice(false)
                setSortByDateFinished(false)
                setSortByDatePublic(false)
                sortByDateStartTenders()

              }}>
                {
                  !sortByDateStart
                    ?
                    <p>Дата начала подачи заявок</p>
                    :
                    <p style={{ fontWeight: 'bold' }}>Дата начала подачи заявок</p>
                }
              </div>

              <div className="sort-property" onClick={() => {
                setSortByDateAdded(false)
                setSortByDateStart(false)
                setSortByPrice(true)
                setSortByDateFinished(false)
                setSortByDatePublic(false)
                sortByPriceTenders()

              }}>
                {
                  !sortByPrice
                    ?
                    <p>Цена</p>
                    :
                    <p style={{ fontWeight: 'bold' }}>Цена</p>
                }
              </div>

              <div className="sort-property" onClick={() => {
                setSortByDateAdded(false)
                setSortByDateStart(false)
                setSortByPrice(false)
                setSortByDateFinished(true)
                setSortByDatePublic(false)

                


              }}>
                {
                  !sortByDateFinished
                    ?
                    <p>Дата окончания</p>
                    :
                    <p style={{ fontWeight: 'bold' }}>Дата окончания</p>
                }
              </div>

              <div className="sort-property" onClick={() => {
                setSortByDateAdded(false)
                setSortByDateStart(false)
                setSortByPrice(false)
                setSortByDateFinished(false)
                setSortByDatePublic(true)
                sortByDatePublicTenders()
              }}>
                {
                  !sortByDatePublic
                    ?
                    <p>Дата публикации</p>
                    :
                    <p style={{ fontWeight: 'bold' }}>Дата публикации</p>
                }

              </div>

            </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '15px', float: 'right' }} onClick={() => createReportMyTender()}>
              <RiFileExcel2Line size={30} color='#3294F4' />
            </div>
          </div>
                    {tendersList
                        .map((item: any, index) => (
                            // Проверка на null перед отображением TenderPreiewC
                            item ?
                                item?.fz === 'fz223' ? (<TenderPreiewCard223 key={index} jsonData={item} auth={auth} myTender={false} />)
                                    :

                                    (<TenderPreiewCard44 key={index} jsonData={item} myTender={false} auth={auth} />)
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