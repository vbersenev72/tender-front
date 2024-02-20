export const getEvents = (tender) => {
    if (tender) {
        let stage = ''
        const placement = tender?.tender[0]?.commonInfo?.ETP?.name
        const events = []
        tender.protocols = Array.from([
            tender?.protocol,
            tender?.protocolCancel,
            tender?.protocolDeviation,
            tender?.protocolEvasion,
            tender?.protocolEvDevCancel,
            tender.notificationCancel,
            tender.clarification
        ]).flat();

        tender.tender.forEach((tend, index) => {
            if (index === 0) {
                events.push({
                    date: (new Date(tend.commonInfo?.publishDTInEIS.slice(0,19))).toLocaleString(),
                    message: `Размещено извещение №${tend.commonInfo?.purchaseNumber} от ${(new Date(tend.commonInfo?.publishDTInEIS.slice(0,19))).toLocaleDateString()}`,
                    ndate: new Date(tend.commonInfo?.publishDTInEIS.slice(0,19))
                })

                if (tend.notificationInfo?.procedureInfo?.collectingInfo?.startDT && tend.notificationInfo?.procedureInfo?.collectingInfo?.endDT) {
                    const collectingStartDate = new Date(tend.notificationInfo.procedureInfo.collectingInfo?.startDT.slice(0,19))
                    const collectingEndDate = new Date(tender.notificationCancel[0]?.commonInfo.docPublishDTInEIS.slice(0,19) || tend.notificationInfo?.procedureInfo?.collectingInfo?.endDT.slice(0,19))
                    if (collectingStartDate.getTime() <= new Date().getTime()) {
                        events.push
                        ({
                            date: collectingStartDate.toLocaleString(),
                            message: `Закупка №${tend.commonInfo.purchaseNumber} переведена на этап «Подача заявок»`,
                            ndate: collectingStartDate,
                            stage: 'Подача заявок'
                        })
                    }
                    if (collectingEndDate && collectingEndDate.getTime() < new Date().getTime()) {
                        events.push({
                            date: collectingEndDate.toLocaleString(),
                            message: `Закупка №${tend.commonInfo?.purchaseNumber} автоматически переведена на этап «Работа комиссии» `,
                            ndate: collectingEndDate,
                            stage: 'Работа комиссии'
                        })

                    }
                }
            } else {
                events.push({
                    date: (new Date(tend.commonInfo?.publishDTInEIS.slice(0,19))).toLocaleString(),
                    message: `Размещен документ «Изменение извещения о проведении открытого конкурса в электронной форме ${tend.commonInfo?.docNumber} от ${(new Date(tend.commonInfo?.publishDTInEIS.slice(0,19))).toLocaleDateString()}»`,
                    ndate: new Date(tend.commonInfo?.publishDTInEIS.slice(0,19)),
                    stage: 'Подача заявок'
                })
                events.push({
                    date: (new Date(tend.commonInfo?.publishDTInEIS.slice(0,19))).toLocaleString(),
                    message: `На электронную площадку ${tend.commonInfo.ETP.name} успешно передано разъяснение ${tend.commonInfo?.docNumber} от ${(new Date(tend.commonInfo?.publishDTInEIS.slice(0,19))).toLocaleDateString()}»`,
                    ndate: new Date(tend.commonInfo?.publishDTInEIS.slice(0,19)),
                    stage: 'Подача заявок'
                })
            }
        })
        // if (tender?.result?.length) {
        //     events.push({
        //         date: new Date(tender?.result[0]?.createDate).toLocaleString(),
        //         message: `Закупка №${tender?.tender[0]?.commonInfo?.purchaseNumber} автоматически переведена
        //     на этап «Определение поставщика завершено» в связи с размещением протокола, завершающего работу комиссии`,
        //         ndate: new Date(tender?.result[0]?.createDate)
        //     })
        //     stage = 'Определение поставщика завершено'
        // }
        // if (tender.notificationCancel.length){
        //     stage = 'Определение поставщика отменено'
        // }


        tender?.protocols?.length && tender?.protocols?.map(proto => {

                const protocol = {...proto}

                protocol.pubDate = new Date((protocol?.commonInfo?.publishDTInEIS || protocol?.commonInfo?.docPublishDTInEIS).slice(0,19))
                return protocol
            }).sort((a,b) => +b.pubDate.getTime() - +a.pubDate.getTime()).forEach(protocol => {
            if (protocol?.commonInfo?.docNumber) {
                switch (true) {
                    case protocol.commonInfo.docNumber.startsWith("ЦПА"): {
                        events.push({
                            date: protocol?.pubDate?.toLocaleString(),
                            message: `От электронной площадки ${placement} получен протокол подачи ценовых предложений. `,
                            ndate: protocol?.pubDate,
                            stage: 'Работа комиссии'
                        });
                        events.push(
                            {
                                date: protocol?.pubDate?.toLocaleString(),
                                message: `Размещен «Протокол подачи ценовых предложений
                                     от ${protocol?.pubDate?.toLocaleDateString()} №${protocol?.commonInfo?.docNumber}» для закупки
                                     №${tender?.tender[0]?.commonInfo?.purchaseNumber}`,
                                ndate: protocol?.pubDate,
                                stage: 'Работа комиссии'
                            })
                        break;
                    }
                    case protocol.commonInfo.docNumber.startsWith("ИЭА"): {
                        events.push({
                            date: protocol?.pubDate?.toLocaleString(),
                            message: `От электронной площадки ${placement} получен  протокол подведения итогов определения поставщика (подрядчика, исполнителя). `,
                            ndate: protocol?.pubDate,
                            stage: 'Определение поставщика завершено'
                        });
                        events.push(
                            {
                                date: protocol?.pubDate?.toLocaleString(),
                                message: `Размещен «Протокол подведения итогов определения поставщика (подрядчика, исполнителя)
                                     от ${protocol?.pubDate?.toLocaleDateString()} №${protocol?.commonInfo?.docNumber}» для закупки
                                     №${tender?.tender[0]?.commonInfo?.purchaseNumber}`,
                                ndate: protocol?.pubDate,
                                stage: 'Определение поставщика завершено'
                            })
                        events.push({
                            date: new Date(tender?.result[0]?.createDate).toLocaleString(),
                            message: `Закупка №${tender?.tender[0]?.commonInfo?.purchaseNumber} автоматически переведена
                            на этап «Определение поставщика завершено» в связи с размещением протокола, завершающего работу комиссии`,
                            ndate: new Date(tender?.result[0]?.createDate),
                            stage: 'Определение поставщика завершено'
                        })
                        break;
                    }
                    case protocol.commonInfo.docNumber.startsWith("ИЭОК"): {
                        events.push(
                            {
                                date: protocol?.pubDate?.toLocaleString(),
                                message: `Размещен «Протокол подведения итогов определения поставщика (подрядчика, исполнителя)
                                     от ${protocol?.pubDate?.toLocaleDateString()} №${protocol?.commonInfo?.docNumber}» для закупки
                                     №${tender?.tender[0]?.commonInfo?.purchaseNumber}`,
                                ndate: protocol?.pubDate,
                                stage: 'Определение поставщика завершено'
                            })
                        events.push({
                            date: protocol?.pubDate?.toLocaleString(),
                            message: `Закупка №${tender?.tender[0]?.commonInfo?.purchaseNumber} автоматически переведена
                            на этап «Определение поставщика завершено» в связи с размещением протокола, завершающего работу комиссии`,
                            ndate: protocol?.pubDate,
                            stage: 'Определение поставщика завершено'
                        })
                        break;
                    }
                    case protocol.commonInfo.docNumber.startsWith("ПРОI1"): {
                        events.push(
                            {
                                date: protocol?.pubDate?.toLocaleString(),
                                message: `Размещен «Протокол рассмотрения и оценки первых частей заявок на участие в открытом конкурсе в электронной форме от
                                     от ${protocol?.pubDate?.toLocaleDateString()} №${protocol?.commonInfo?.docNumber}» для закупки
                                     №${tender?.tender[0]?.commonInfo?.purchaseNumber}`,
                                ndate: protocol?.pubDate,
                                stage: 'Работа комиссии'
                            })
                        break;
                    }
                    case protocol.commonInfo.docNumber.startsWith("ПРОII1"): {
                        events.push(
                            {
                                date: protocol?.pubDate?.toLocaleString(),
                                message: `Размещен «Протокол рассмотрения и оценки вторых частей заявок на участие в открытом конкурсе в электронной форме
                                     от ${protocol?.pubDate?.toLocaleDateString()} №${protocol?.commonInfo?.docNumber}» для закупки
                                     №${tender?.tender[0]?.commonInfo?.purchaseNumber}`,
                                ndate: protocol?.pubDate,
                                stage: 'Работа комиссии'
                            })
                        break;
                    }
                    case protocol.commonInfo.docNumber.startsWith("ПОК"): {
                        events.push(
                            {
                                date: protocol?.pubDate?.toLocaleString(),
                                message: `Размещен «Протокол об отказе от заключения контракта от ${protocol?.pubDate?.toLocaleDateString()} №${protocol?.commonInfo?.docNumber}» для закупки
                                     №${tender?.tender[0]?.commonInfo?.purchaseNumber}`,
                                ndate: protocol?.pubDate,
                                stage: 'Определение поставщика отменено'
                            })
                        break;
                    }
                    case protocol.commonInfo.docNumber.startsWith("№ИО"): {
                        events.push(
                            {
                                date: protocol?.pubDate?.toLocaleString(),
                                message: `Размещено «Извещение об отмене определения поставщика (подрядчика, исполнителя) от ${protocol?.pubDate?.toLocaleDateString()} ${protocol?.commonInfo?.docNumber}» для закупки
                                     №${tender?.tender[0]?.commonInfo?.purchaseNumber}`,
                                ndate: protocol?.pubDate,
                                stage: 'Определение поставщика отменено'
                            })
                        events.push(
                            {
                                date: protocol?.pubDate?.toLocaleString(),
                                message: `Закупка №${tender?.tender[0]?.commonInfo?.purchaseNumber} в соответствии с документом Извещение
                                об отмене определения поставщика (подрядчика, исполнителя) от ${protocol?.pubDate?.toLocaleDateString()} №ИО1
                                автоматически переведена на этап «Определение поставщика (подрядчика, исполнителя) отменено»`,
                                ndate: protocol?.pubDate,
                                stage: 'Определение поставщика отменено'
                            }
                        )
                        break;
                    }
                    case protocol.commonInfo.docNumber.startsWith("№РИ"): {
                        events.push(
                            {
                                date: protocol?.pubDate?.toLocaleString(),
                                message: `Размещен документ «Разъяснения положений извещения об осуществлении закупки от ${protocol?.pubDate?.toLocaleDateString()} ${protocol?.commonInfo?.docNumber}» для закупки
                                     №${tender?.tender[0]?.commonInfo?.purchaseNumber}`,
                                ndate: protocol?.pubDate
                            })
                        break;
                    }
                    case protocol.commonInfo.docNumber.startsWith("ИЗТ"): {
                        events.push(
                            {
                                date: protocol?.pubDate?.toLocaleString(),
                                message: `Размещен «Протокол подведения итогов определения поставщика от ${protocol?.pubDate?.toLocaleDateString()}
                                 №${protocol.commonInfo.docNumber} для закупки №${tender?.tender[0]?.commonInfo?.purchaseNumber}»`,
                                ndate: protocol?.pubDate,
                                stage: 'Определение поставщика завершено'
                            })
                        events.push({
                            date: protocol?.pubDate?.toLocaleString(),
                            message: `Размещен документ, завершающий определение поставщика.`,
                            ndate: protocol?.pubDate,
                            stage: 'Определение поставщика завершено'
                        })
                        break;
                    }
                    case protocol.commonInfo.docNumber.startsWith("№ОП"): {
                        events.push(
                            {
                                date: protocol?.pubDate?.toLocaleString(),
                                message: `Размещено «${protocol?.printFormFieldsInfo?.docType?.name}» `, //отмена протокола
                                ndate: protocol?.pubDate
                            })
                        break;
                    }
                    case protocol.commonInfo.docNumber.startsWith("ППУ"): {
                        events.push(
                            {
                                date: protocol?.pubDate?.toLocaleString(),
                                message: `Размещен «Протокол признания участника уклонившимся от заключения контракта
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

        events.sort((a, b) =>
        {
            return  a.ndate < b.ndate ? 1 :
                a.ndate > b.ndate ? -1 :
                    a.message[0] !== b.message[0] ? -1 : 1
        })

        stage = events.filter(event => event.stage)[0]?.stage || null;
        const modifiedDate = events[0].ndate

        return { events,
                stage,
                modifiedDate
                }
    }
}
