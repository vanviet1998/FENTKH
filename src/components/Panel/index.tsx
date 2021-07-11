import React, { useEffect, useState } from "react";
import { useTranslation } from 'next-i18next'
import { service } from "@services"
import { Host } from "@services/host"

export const Panel: React.FC<any> = ({panelRight,panel}) => {
  const { t } = useTranslation("panel")

  return (
    // <img style={{width:"100%",height:"100%"}} src={`${Host.URL}/${panelRight.image[0]}`} alt="#" />

    <div>
      <section className="hero-slider">
        {/* Single Slider */}
        <div className="single-slider" style={{backgroundImage:`url(${panelRight.image.length ? Host.getImageUrl(panelRight.image[0]) : ""})`}}>
          <div className="container">
            <div className="row no-gutters">

              <div className="col-lg-9 offset-lg-3 col-12">
                <div className="text-inner">
                  <div className="row">
                    <div className="col-lg-7 col-12">
                      <div className="hero-text">
                        <h1><span>{panelRight.title}</span>{panelRight.name}</h1>
                        <p>{panelRight.descripsion}</p>
                        <div className="button">
                          <a className="btn">Shop Now!</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
        {/*/ End Single Slider */}
      </section>
      <section className="small-banner section">
        <div className="container-fluid">
          <div className="row">
            {
              panel.map((v,index) => (
                <div key={index} className="col-lg-4 col-12">
                  <div style={{ height: 300 }} className="single-banner tab-height">
                    <img src={`${Host.getImageUrl(v.image[0])}`} alt="#" />
                    <div className="content">
                      <p>{v.title}</p>
                      <h3>{v.name}</h3>
                      <a>{v.descripsion}</a>
                    </div>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </section>
    </div>
  );
};


