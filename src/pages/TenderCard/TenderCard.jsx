import { Fragment, useState, useEffect } from 'react'
import { LoaderTest } from "../../styles";
import axios from "axios";
import { useParams } from "react-router-dom";
import { TailSpin } from 'react-loader-spinner';
import { TenderCard44 } from "./TenderCard44";
import { TenderCard223 } from "./TenderCard223";
import { getEvents } from "../../functions/Events";

export const TenderCard = () => {

    const [tender, setTender] = useState()
    const { id } = useParams();
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log(id);
                const response = await axios.get(`${process.env.REACT_APP_API}/api/find/${id}`);
                console.log(response.data);
                setTender(response.data);
                setLoading(false)
            } catch (error) {
                console.error('Ошибка при выполнении запроса:', error);
            }
        };

        fetchData();
    },[id])

    // Обработчик клика по кнопке

    const events = getEvents(tender)

    return (


        <Fragment>
                 {
                     loading ?
                     <LoaderTest>
                         <TailSpin color="#3294F4" height={150} width={150} />
                     </LoaderTest>
                          :
                                tender?.tender[0]?.fz === 'fz44' ?
                                                    <TenderCard44 tender={tender} events={events}/>
                                     :
                                                    <TenderCard223 tender={tender}/>
                     }
        </Fragment>
    )}
