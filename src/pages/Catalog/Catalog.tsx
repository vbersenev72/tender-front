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
import { createReport } from "../../functions/createReport";
import React from "react";
import AdvancedSearch from "../../components/AdvancedSearch/AdvancedSearch";
import { createReportAutoSearch } from "../../functions/createReportAutoSearch";
import { PaginationBlock } from "../../components/PaginationBlock/PaginationBlock";


export const Catalog: FC = () => {
    const [tendersList, setTendersList] = useState<any>([]);
    const [myTenders, setMyTenders] = useState<any[]>([])

    const [tendersCount, setTendersCount] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [countShowElements, setCountShowElements] = useState(10)
    // const [findedTenderId, setFindedTenderId] = useState('')

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



    // Advanced Search Data
    const [showAdvancedSearch, setShowAdvancedSearch] = React.useState(false)

    const [tags, setTags] = React.useState<any>('')
    const [stopTags, setStopTags] = React.useState<any>('')
    const [publicDateFrom, setPublicDateFrom] = React.useState<any>('')
    const [publicDateTo, setPublicDateTo] = React.useState<any>('')
    const [startDateFrom, setStartDateFrom] = React.useState<any>('')
    const [startDateTo, setStartDateTo] = React.useState<any>('')
    const [endDateFrom, setEndDateFrom] = React.useState<any>('')
    const [endDateTo, setEndDateTo] = React.useState<any>('')
    const [fz, setFz] = React.useState<any>('')
    const [region, setRegion] = React.useState<any>('')
    const [tenderNum, setTenderNum] = React.useState<any>('')
    const [customerName, setCustomerName] = React.useState<any>('')
    const [stopCustomerName, setStopCustomerName] = React.useState<any>('')
    const [inn, setInn] = React.useState<any>('')
    const [priceFrom, setPriceFrom] = React.useState<any>('')
    const [priceTo, setPriceTo] = React.useState<any>('')
    const [enablePrice, setEnablePrice] = React.useState<any>('')
    const [source, setSource] = React.useState<any>('')
    const [enableSource, setEnableSource] = React.useState<any>('')
    const [okpd2, setOkpd2] = React.useState<any>('')
    ///

    const formatDate = (dateString: any) => {
        const date: any = new Date(dateString)
        if (isNaN(date)) {
            return ''; // возвращаем пустую строку, если date не является датой
        }

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`;
    }

    const getAdvancedSearch = async () => {
        try {
            setLoading(true)
            const response: any = await axios.post(`${process.env.REACT_APP_API}/api/find/advancedfind`, {
                tags: tags,
                stopTags: stopTags,
                publicDateFrom: formatDate(publicDateFrom),
                publicDateTo: formatDate(publicDateTo),
                startDateFrom: formatDate(startDateFrom),
                startDateTo: formatDate(startDateTo),
                endDateFrom: formatDate(endDateFrom),
                endDateTo: formatDate(endDateTo),
                fz: fz,
                region: region ? region.name : '',
                tenderNum: tenderNum,
                customerName: customerName,
                stopCustomerName: stopCustomerName,
                inn: inn,
                priceFrom: priceFrom,
                priceTo: priceTo,
                enablePrice: enablePrice,
                purchaseStage: '',
                methodDeterminingSupplier: '',
                source: source,
                enableSource: enableSource,
                okpd2: okpd2 ? okpd2.code : '',
                page: currentPage

            }, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })



            const result = response.data.message

            setTendersList([...result])

            setLoading(false)

        } catch (error: any) {
            showErrorMessage('Ошибка поиска')
            console.log(error);

            setLoading(false)
        }
    }

    const clearAllFields = () => {
        setTags('')
        setStopTags('')
        setPublicDateFrom('')
        setPublicDateTo('')
        setStartDateFrom('')
        setStartDateTo('')
        setEndDateFrom('')
        setEndDateTo('')
        setFz('')
        setRegion('')
        setTenderNum('')
        setCustomerName('')
        setStopCustomerName('')
        setInn('')
        setPriceFrom('')
        setPriceTo('')
        setEnablePrice('')
        setSource('')
        setEnableSource('')
        setOkpd2('')

        showSuccesMessage('Все параметры сброшены!')
    }


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

        if (showAdvancedSearch) {
            getAdvancedSearch()
        } else {
            fetchData();
        }


    }, [currentPage]);


    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
        fetchData()
    };


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

    const sortByDateFinishedTenders = () => {
        const newTendersArray = beforeTenders.sort((a: any, b: any) => {
            console.log(a);

            if (a.fz == 'fz223') {
                const aDate = a?.submissionCloseDateTime
                const bDate = b.fz == 'fz223' ? b?.submissionCloseDateTime : b?.notificationInfo?.procedureInfo?.collectingInfo?.endDT

                return new Date(bDate).getTime() - new Date(aDate).getTime()
            } else {
                const aDate = a?.notificationInfo?.procedureInfo?.collectingInfo?.endDT
                const bDate = b.fz == 'fz223' ? b?.submissionCloseDateTime : b?.notificationInfo?.procedureInfo?.collectingInfo?.endDT

                return new Date(bDate).getTime() - new Date(aDate).getTime()
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
                    {
                        showAdvancedSearch
                        &&
                        <>
                            <FlexRow style={{ width: '100%', justifyContent: 'flex-end' }}>
                                <div style={{ width: "18%", display: 'flex', justifyContent: 'center' }} onClick={() => setShowAdvancedSearch(!showAdvancedSearch)}>
                                    <AdvancedFindP>Простой поиск</AdvancedFindP>
                                </div>
                            </FlexRow>
                            <AdvancedSearch

                                tags={tags} setTags={setTags}
                                stopTags={stopTags} setStopTags={setStopTags}
                                publicDateFrom={publicDateFrom} setPublicDateFrom={setPublicDateFrom}
                                publicDateTo={publicDateTo} setPublicDateTo={setPublicDateTo}
                                startDateFrom={startDateFrom} setStartDateFrom={setStartDateFrom}
                                startDateTo={startDateTo} setStartDateTo={setStartDateTo}
                                endDateFrom={endDateFrom} setEndDateFrom={setEndDateFrom}
                                endDateTo={endDateTo} setEndDateTo={setEndDateTo}
                                fz={fz} setFz={setFz}
                                region={region} setRegion={setRegion}
                                tenderNum={tenderNum} setTenderNum={setTenderNum}
                                customerName={customerName} setCustomerName={setCustomerName}
                                inn={inn} setInn={setInn}
                                priceFrom={priceFrom} setPriceFrom={setPriceFrom}
                                priceTo={priceTo} setPriceTo={setPriceTo}
                                enablePrice={enablePrice} setEnablePrice={setEnablePrice}
                                source={source} setSource={setSource}
                                enableSource={enableSource} setEnableSource={setEnableSource}
                                okpd2={okpd2} setOkpd2={setOkpd2}

                            />
                            <div style={{ justifyContent: 'center', alignItems: 'center', display: 'flex', width: '100%' }}>
                                <div style={{ width: '50%', display: 'flex', justifyContent: 'space-around' }}>
                                    <div className='AdvancedSearchButton' style={{ backgroundColor: 'dodgerblue', color: 'white', paddingLeft: '60px', paddingRight: '60px' }} onClick={() => getAdvancedSearch()}><p>Поиск</p></div>
                                    <div className='AdvancedSearchButton' style={{ paddingLeft: '60px', paddingRight: '60px' }} onClick={() => createReport(tendersList, auth)}><p>Excel</p></div>
                                    <div className='AdvancedSearchButton' style={{ paddingLeft: '60px', paddingRight: '60px' }} onClick={clearAllFields}><p>Сбросить</p></div>
                                </div>
                            </div>
                        </>
                    }
                    {
                        !showAdvancedSearch
                        &&
                        <FlexRow style={{ width: '100%', justifyContent: 'flex-end' }}>
                            <div style={{ width: "18%", display: 'flex', justifyContent: 'center' }} onClick={() => setShowAdvancedSearch(!showAdvancedSearch)}>
                                <AdvancedFindP>Расширенный поиск</AdvancedFindP>
                            </div>
                        </FlexRow>
                    }
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
                            {/*
              <div className="sort-property" onClick={() => {
                setSortByDateAdded(true)
                setSortByDateStart(false)
                setSortByPrice(false)
                setSortByDateFinished(false)
                setSortByDatePublic(false)
                sortByDateAddedTenders()

              }}>
                {
                  !sortByDateAdded
                    ?
                    <p>Дата добавления в мои тендеры</p>
                    :
                    <p style={{ fontWeight: 'bold' }}>Дата добавления в мои тендеры</p>
                }

              </div> */}

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
                                        <p>Размещено</p>
                                        :
                                        <p style={{ fontWeight: 'bold' }}>Размещено</p>
                                }
                            </div>

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
                                        <p>Обновлено</p>
                                        :
                                        <p style={{ fontWeight: 'bold' }}>Обновлено</p>
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

                                sortByDateFinishedTenders()

                            }}>
                                {
                                    !sortByDateFinished
                                        ?
                                        <p>Дата окончания</p>
                                        :
                                        <p style={{ fontWeight: 'bold' }}>Дата окончания</p>
                                }
                            </div>

                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '15px', float: 'right' }} onClick={() => createReport(tendersList, auth)}>
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
                    <PaginationBlock handlePageChange={handlePageChange} currentPage={currentPage} countShowElements={countShowElements} setCountShowElements={setCountShowElements}/>
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