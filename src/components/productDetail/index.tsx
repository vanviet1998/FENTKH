import React, { useEffect, useState } from "react";
import { useTranslation } from 'next-i18next'
import SliderImage from 'react-zoom-slider';
import { caculatorPriceSale, formatPrice } from "src/until";
import { Button } from "@components/button";
import { UIInput } from "@components/ui";
import { ShoppingCartOutlined } from "@ant-design/icons"
import { IProduct } from "src/constant/IProduct";
import { useDispatch } from "react-redux";
import { addItemsToCard } from "@redux/slices/card";
import { IAddItemCard } from "src/constant";


export const ProductDetail = ({ product, dataImage = [{ image: "" }] }) => {
    const [item, setItem] = useState<IProduct>(product)
    const [total, setTotal] = useState(1)
    const [activeSize, setActiveSize] = useState("")

    const dispatch = useDispatch()

    const _handleOnChangeTotal = (total) => {
        const { value } = total.target
        if (value < 1) {
            setTotal(1)
            return
        }
        setTotal(value)

    }

    const _handleAddCards = () => {

        const payload: IAddItemCard = {
            item,
            amount: +total
        }
        dispatch(addItemsToCard(payload))
    }

    const _handleChangeSize = (size) => {
        setItem({
            ...item,
            disCount: size?.optionsSale || 0,
            price: size?.optionsPrice || 0
        })
        setActiveSize(size?.options || "")
    }
    const { t } = useTranslation("products")
    const {
        descripsion = "",
        status = 0,
        disCount = 0,
        price = 0,
        size = [],
        name = "",
        guarantee = 0,
        category = [],
        material = { title: "" }
    } = item || {}
    return (
        <div style={{ marginBottom: 24, marginTop: 24, padding: 0 }} className="single-product product-area section product-detail">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div style={{ marginBottom: 24 }} className="section-title">
                            <h2>{t('detail_product')}</h2>
                        </div>
                    </div>
                </div>
                <div className="row" style={{ backgroundColor: "white", padding: "24px 12px", }}>
                    <div className="col-5">
                        <div>
                            <SliderImage
                                data={dataImage || [{ image: "" }]}
                                width="100%"
                                showDescription={true}
                                direction="right"
                            />
                        </div>
                    </div>
                    <div className="col-7">
                        <div className="">
                            <h1 className="title"> {name}</h1>
                            <div className="product-content" >
                                {disCount && status ? <div className="product-price">
                                    <span className="sale">{formatPrice(price)}</span>
                                    <span style={{ fontSize: 24 }}>{caculatorPriceSale(price, disCount)}</span>

                                </div> : <div className="product-price">
                                    <span style={{ fontSize: 24 }} >{formatPrice(price)}</span>

                                </div>
                                }
                            </div>
                            <div className="description">
                                <label className="blur">Loại Sản Phẩm</label>
                                <span>{category[0]?.title || ""}</span>
                            </div>
                            <div className="description">
                                <label className="blur">Vật Liệu</label>
                                <span>{material?.title || ""}</span>
                            </div>
                            <div className="description">
                                <label className="blur">Bảo Hành</label>
                                <span>{guarantee} Tháng</span>
                            </div>
                            <div className="description">
                                <label className="blur">{"Kích Thước"}</label>
                                {
                                    (size?.length || []) && size.map((item, index) => (
                                        <Button key={index} className={activeSize === item.options && "activeBtn"} onClick={() => _handleChangeSize(item)} style={{ marginRight: 6 }}>{item.options}</Button>

                                    ))
                                }
                            </div>
                            <div className="description">
                                <label className="blur">Số  Lượng</label>
                                <UIInput value={total} onChange={_handleOnChangeTotal} type="number" min={1} width="30px" />
                            </div>
                        </div>
                        <Button onClick={() => _handleAddCards()} icon={<ShoppingCartOutlined style={{ fontSize: 20 }} />} style={{ marginRight: 6 }} size="large">Thêm Vào Giỏ Hàng</Button>
                        <Button size="large">Mua Ngay</Button>

                    </div>
                    <div >
                        <div style={{ margin: "24px 0px" }} className="title">Mô Tả Sản Phẩm </div>
                        <div dangerouslySetInnerHTML={{ __html: descripsion }} />

                    </div>
                </div>


            </div>
        </div>
    );
};


