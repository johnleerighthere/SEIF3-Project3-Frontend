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


            </div>
        )
    }
}

export default Share