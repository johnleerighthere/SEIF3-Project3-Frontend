import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { EmailShareButton, TelegramShareButton, WhatsappShareButton } from 'react-share';
import { EmailIcon, TelegramIcon, WhatsappIcon } from "react-share";
import './Share.scss'

class Share extends React.Component {
    render() {
        return (
            <div>
                <div className="icon">
                    <EmailShareButton>
                        <FontAwesomeIcon
                            icon={faEnvelope}
                        />
                    </EmailShareButton>
                </div>


                <div className="icon">
                    <TelegramShareButton>
                        <TelegramIcon size={32} round={true} />
                    </TelegramShareButton>
                </div>

                <div className="icon">
                    <WhatsappShareButton title="test msg" url="https://github.com">
                        <WhatsappIcon size={32} round={true} />
                    </WhatsappShareButton>
                </div>

                <EmailShareButton subject="Dengue Heatmap App" body="Checkout if you're in a dengue zone with this app" url="https://github.com">
                    <FontAwesomeIcon
                        icon={faEnvelope}
                    />
                </EmailShareButton>
                <TelegramShareButton title="Dengue Heatmap App" url="https://github.com">
                    <TelegramIcon size={32} round={true} />
                </TelegramShareButton>
                <WhatsappShareButton title="Dengue Heatmap App" url="https://github.com">
                    <WhatsappIcon size={32} round={true} />
                </WhatsappShareButton>

            </div>
        )
    }
}

export default Share