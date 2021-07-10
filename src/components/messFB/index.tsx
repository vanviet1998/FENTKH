import React from "react";
import { CONFIG } from "src/constant";
import MessengerCustomerChat from 'react-messenger-customer-chat';

export const MessFB: React.FC = () => {
  return (
    <div>
      <MessengerCustomerChat
        pageId={CONFIG.PAGE_ID_FB}
        appId={CONFIG.APP_ID_FB}
      // htmlRef="<REF_STRING>"
      />
      <div className="hotline-phone-ring-wrap">
        <div className="hotline-phone-ring">
          <div className="hotline-phone-ring-circle"></div>
          <div className="hotline-phone-ring-circle-fill"></div>
          <div className="hotline-phone-ring-img-circle">
            <a href="tel:0394655656" className="pps-btn-img">
              <img src="https://nguyenhung.net/wp-content/uploads/2019/05/icon-call-nh.png" alt="Gọi điện thoại" width="50" />
            </a>
          </div>
        </div>
        <div className="hotline-bar">
          <a href="tel:0394655656">
            <span className="text-hotline">0394655656</span>
          </a>
        </div>
      </div>
    </div>
  );
};
