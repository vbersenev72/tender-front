import { formatDate } from "./FormateDate";

export const getEvents223 = (tender) => {
    if (tender) {
        let stage = ''
        const regOne = / единст/i;
        const isOneSupplier = regOne.test(tender.tender[0].purchaseCodeName)
        const events = [
            {
                date: (new Date(tender?.tender[0]?.publicationDateTime)).toLocaleString(),
                message: `Размещено извещение о закупке (приглашение) №${tender?.tender[0]?.registrationNumber}`,
                ndate: new Date(tender?.tender[0]?.publicationDateTime)
            }]
        const collectingStartDate = new Date(tender?.tender[0].applSubmisionStartDate || tender?.tender[0].publicationDateTime)
        const collectingEndDate = tender?.tender[0].submissionCloseDateTime ? new Date(tender?.tender[0].submissionCloseDateTime) : collectingStartDate

        if (isOneSupplier) {
            if (collectingEndDate && collectingEndDate.getTime() < new Date().getTime()) {
                events.push({
                    date: collectingEndDate.toLocaleString(),
                    message: `Закупка переведена на этап «Работа комиссии» с этапа «Формирование извещения (приглашения)»`,
                    ndate: collectingEndDate
                })
                stage = 'Работа комиссии'
            }

        } else {
            if (collectingStartDate.getTime() <= new Date().getTime()) {
                events.push
                    ({
                        date: collectingStartDate.toLocaleString(),
                        message: `Закупка переведена на этап «Подача заявок» с этапа «Формирование извещения (приглашения)»`,
                        ndate: collectingStartDate
                    })
                stage = 'Подача заявок'
            }
            if (collectingEndDate && collectingEndDate.getTime() < new Date().getTime()) {
                events.push({
                    date: collectingEndDate.toLocaleString(),
                    message: `Закупка переведена на этап «Работа комиссии» с этапа «Подача заявок»`,
                    ndate: collectingEndDate
                })
                stage = 'Работа комиссии'
            }
        }
        tender.protocols = tender.purchaseProtocol;
        console.log('protocols', tender?.protocols)
        tender?.protocols?.length && tender?.protocols?.forEach(proto => {

            const protocol = { ...proto }

            protocol.pubDate = new Date(protocol?.publicationDateTime || protocol?.procedureDate)
            events.push(
                {
                    date: protocol?.pubDate?.toLocaleString(),
                    message: `Размещен протокол № ${protocol.registrationNumber} «${protocol.typeName?.split(' ').filter(word => !word.startsWith('/')).join(' ') ||
                        protocol.purchaseInfo?.name}» от ${formatDate(new Date(protocol?.pubDate).toISOString())}`,
                    ndate: protocol?.pubDate
                })
        })

        if (tender.contract.length) {
            const [contract] = tender.contract.sort((a, b) => +a.v - +b.v)
            events.push({
                date: new Date(contract?.createDateTime).toLocaleString(),
                message: `Закупка переведена на этап «Размещение завершено» с этапа «Работа комиссии»`,
                ndate: new Date(contract?.createDateTime)
            })
            stage = 'Определение поставщика завершено'
        }

        const sortedEvents = events.sort((a, b) => {
            return a.ndate < b.ndate ? 1 :
                a.ndate > b.ndate ? -1 :
                    a.message[0] !== b.message[0] ? 1 : -1
        }
        )

        return sortedEvents.map((event)=> ({...event, stage}))
    }
}
