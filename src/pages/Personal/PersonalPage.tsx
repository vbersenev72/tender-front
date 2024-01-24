import { useState, useEffect } from "react"
import { Profile } from "./PersonalContainers.tsx/Profile"
import { ReadyReports } from "./PersonalContainers.tsx/ReadyReports"
import FeedBacks from "./PersonalContainers.tsx/FeedBacks"
import Tarrifs from "./PersonalContainers.tsx/Tarrifs"
import './PersonalPage.css'

export const PersonalPage = () => {

    const [viewСhapter, setViewСhapter] = useState('profile') // profile, readyReports, feedbacks, tarrifs

    return (
        <div className="personal-container">
            <div className="personal-menu-container">
                <div className="personal-menu-body">
                    <div className="personal-menu-property">

                        <div
                            onClick={() => setViewСhapter('profile')}
                            className={viewСhapter == 'profile'
                                ?
                                'personal-menu-prop'
                                :
                                'personal-menu-prop-active'}>
                            <p>Профиль</p>
                        </div>

                        <div
                            onClick={() => setViewСhapter('readyReports')}
                            className={viewСhapter == 'readyReports'
                                ?
                                'personal-menu-prop'
                                :
                                'personal-menu-prop-active'}>
                            <p>Готовые отчеты</p>
                        </div>

                        <div
                            onClick={() => setViewСhapter('feedbacks')}
                            className={viewСhapter == 'feedbacks'
                                ?
                                'personal-menu-prop'
                                :
                                'personal-menu-prop-active'}>
                            <p>Обратная связь</p>
                        </div>

                        <div
                            onClick={() => setViewСhapter('tarrifs')}
                            className={viewСhapter == 'tarrifs'
                                ?
                                'personal-menu-prop'
                                :
                                'personal-menu-prop-active'}>
                            <p>Тарифы</p>
                        </div>


                    </div>
                </div>
            </div>

            <div className="personal-menu-content">
                {
                    viewСhapter == 'profile' && <Profile/>
                }
                {
                    viewСhapter == 'readyReports' && <ReadyReports/>
                }
                {
                    viewСhapter == 'feedbacks' && <FeedBacks/>
                }
                {
                    viewСhapter == 'tarrifs' && <Tarrifs/>
                }
            </div>
        </div>
    )
}
