
export const getEvents = (tender) => {
    if (tender) {
        const placement = tender?.tender[0]?.commonInfo?.ETP?.name
        const events = [
            {
                date: (new Date(tender?.tender[0]?.commonInfo?.publishDTInEIS)).toLocaleString(),
                message: `Размещено извещение №${tender?.tender[0]?.commonInfo?.purchaseNumber} от ${(new Date(tender?.tender[0]?.commonInfo?.publishDTInEIS)).toLocaleDateString()}`,
                ndate: new Date(tender?.tender[0]?.commonInfo?.publishDTInEIS)
            }]
        tender.protocols = Array.from([tender?.protocol, tender?.protocolCancel, tender?.protocolDeviation, tender?.protocolEvasion, tender?.protocolEvDevCancel]).flat();
        console.log('protocols', tender?.protocols)
        tender?.protocols?.length && tender?.protocols?.forEach(proto => {

            const protocol = {...proto}

            protocol.pubDate = new Date(protocol?.commonInfo?.publishDTInEIS)
            if (protocol?.commonInfo?.docNumber) {
                switch (protocol.commonInfo.docNumber) {
                    case "ИЭА1": {
                        events.push({
                            date: protocol?.pubDate?.toLocaleString(),
                            message: `От электронной площадки ${placement} получен протокол подачи ценовых предложений. `,
                            ndate: protocol?.pubDate
                        });
                        events.push(
                            {
                                date: protocol?.pubDate?.toLocaleString(),
                                message: `Размещен «Протокол подачи ценовых предложений
                                     от ${protocol?.pubDate?.toLocaleDateString()} №${protocol?.commonInfo?.docNumber}» для закупки
                                     №${tender?.tender[0]?.commonInfo?.purchaseNumber}`,
                                ndate: protocol?.pubDate
                            })
                        break;
                    }
                    case "ЦПА1": {
                        events.push({
                            date: protocol?.pubDate?.toLocaleString(),
                            message: `От электронной площадки ${placement} получен  протокол подведения итогов определения поставщика (подрядчика, исполнителя). `,
                            ndate: protocol?.pubDate
                        });
                        events.push(
                            {
                                date: protocol?.pubDate?.toLocaleString(),
                                message: `Размещен «Протокол подведения итогов определения поставщика (подрядчика, исполнителя)
                                     от ${protocol?.pubDate?.toLocaleDateString()} №${protocol?.commonInfo?.docNumber}» для закупки
                                     №${tender?.tender[0]?.commonInfo?.purchaseNumber}`,
                                ndate: protocol?.pubDate
                            })
                        break;
                    }
                    case "ИЭОК1": {
                        events.push(
                            {
                                date: protocol?.pubDate?.toLocaleString(),
                                message: `Размещен «Протокол подведения итогов определения поставщика (подрядчика, исполнителя)
                                     от ${protocol?.pubDate?.toLocaleDateString()} №${protocol?.commonInfo?.docNumber}» для закупки
                                     №${tender?.tender[0]?.commonInfo?.purchaseNumber}`,
                                ndate: protocol?.pubDate
                            })
                        break;
                    }
                    case "ПРОI1": {
                        events.push(
                            {
                                date: protocol?.pubDate?.toLocaleString(),
                                message: `Размещен «Протокол рассмотрения и оценки первых частей заявок на участие в открытом конкурсе в электронной форме от
                                     от ${protocol?.pubDate?.toLocaleDateString()} №${protocol?.commonInfo?.docNumber}» для закупки
                                     №${tender?.tender[0]?.commonInfo?.purchaseNumber}`,
                                ndate: protocol?.pubDate
                            })
                        break;
                    }
                    case "ПРОII1": {
                        events.push(
                            {
                                date: protocol?.pubDate?.toLocaleString(),
                                message: `Размещен «Протокол рассмотрения и оценки вторых частей заявок на участие в открытом конкурсе в электронной форме от
                                     от ${protocol?.pubDate?.toLocaleDateString()} №${protocol?.commonInfo?.docNumber}» для закупки
                                     №${tender?.tender[0]?.commonInfo?.purchaseNumber}`,
                                ndate: protocol?.pubDate
                            })
                        break;
                    }
                }
            } else {
                events.push(
                    {
                        date: protocol?.pubDate?.toLocaleString(),
                        message: `Размещен протокол ${protocol?.externalId} от ${protocol?.pubDate?.toLocaleDateString()}`,
                        ndate: protocol?.pubDate
                    })
            }

        });
        if (tender?.tender[0]?.notificationInfo?.procedureInfo?.collectingInfo?.startDT && tender?.tender[0]?.notificationInfo?.procedureInfo?.collectingInfo?.endDT) {
            const collectingStartDate = new Date(tender?.tender[0].notificationInfo.procedureInfo.collectingInfo?.startDT)
            const collectingEndDate = new Date(tender?.tender[0].notificationInfo.procedureInfo.collectingInfo?.endDT)
            if (collectingStartDate <= new Date())
                events.push
                ({
                    date: collectingStartDate.toLocaleString(),
                    message: `Закупка №${tender?.tender[0]?.commonInfo.purchaseNumber} переведена на этап «Подача заявок»`,
                    ndate: collectingStartDate
                })
            if (collectingEndDate && collectingEndDate <= new Date())
                events.push({
                    date: collectingEndDate.toLocaleString(),
                    message: `Закупка №${tender?.tender[0]?.commonInfo?.purchaseNumber} автоматически переведена на этап «Работа комиссии» `,
                    ndate: collectingEndDate
                })
        }
        if (tender?.result?.length) {
            events.push({
                date: new Date(tender?.result[0]?.createDate).toLocaleString(),
                message: `Закупка №${tender?.tender[0]?.commonInfo?.purchaseNumber} автоматически переведена 
            на этап «Определение поставщика завершено» в связи с размещением протокола, завершающего работу комиссии`,
                ndate: new Date(tender?.result[0]?.createDate)
            })
        }

        return events.sort((a, b) => {
                return  a.ndate < b.ndate ? 1 :
                    a.ndate > b.ndate ? -1 :
                        a.message[0] !== b.message[0] ? 1 : -1
            }
        )
    }
}