import React, { useEffect, useState } from "react";
import { useTranslation } from 'next-i18next'
import SliderImage from 'react-zoom-slider';
import { caculatorPriceSale, formatPrice } from "src/until";
export const ProductDetail = ({ product, dataImage }) => {
    console.log("productproductproduct", product)
    const { t } = useTranslation("products")
    
    return (
        <div style={{marginBottom:24}} className="single-product product-area section product-detail">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="section-title">
                            <h2>{t('detail_product')}</h2>
                        </div>
                    </div>
                </div>
                <div className="row" style={{ backgroundColor: "white", padding: "10px 0px", height: "100vh" }}>
                    <div className="col-5">
                        <div>
                            <SliderImage
                                data={dataImage || []}
                                width="100%"
                                showDescription={true}
                                direction="right"
                            />
                        </div>
                    </div>
                    <div className="col-7">
                        <div className="">
                            <span>{product.name}</span>
                            <div className="product-content">
                                {product.disCount && !product.status ? <div className="product-price">
                                    <span className="sale">{formatPrice(product.price)}</span>
                                    <span>{caculatorPriceSale(product.price, product.disCount)}</span>

                                </div> : <div className="product-price">
                                    <span>{formatPrice(product.price)}</span>

                                </div>
                                }
                            </div>
                        </div>

                    </div>
                    <div>
                        <span>Chi Tiet San Pham</span>
                        <div dangerouslySetInnerHTML={{ __html: product.descripsion}} />

                    </div>
                </div>


            </div>
        </div>
    );
};


