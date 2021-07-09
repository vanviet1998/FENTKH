import React, { useEffect } from "react";
import { useTranslation } from 'next-i18next'
import { IProduct } from "src/constant/IProduct";
import { Host } from "@services/host";
import { caculatorPriceSale, CardStore, formatPrice } from "src/until";
import { useRouter } from 'next/router'
import { PATH } from "src/constant/path";
import { useDispatch } from "react-redux";
import { addItemsToCard } from "@redux/slices/card";
import { IAddItemCard, Type_Noti } from "src/constant";
import { useNotification } from "src/hook";


interface IPageItems {
    item: IProduct,
}

export const Item: React.FC<IPageItems> = ({ item }) => {
    const router = useRouter()
    const { openNotification } = useNotification()
    const dispatch = useDispatch()
    const { t } = useTranslation("products")
    const _handleRouterPage = (id) => {
        router.push(PATH.PRODUCT_DETAIL.replace(":id", id))
    }
    const _handleAddItemToCard = (e, item): void => {
        const newCard: IAddItemCard = {
            item, amount: 1
        }
        dispatch(addItemsToCard(newCard))
        openNotification({
            type:Type_Noti.success,
            message:"Thêm vào giỏ hàng thành công!",
        })
        e.stopPropagation();
    }
    useEffect(() => {
    }, [])

    return (
        <div onClick={() => _handleRouterPage(item.slug)} className="single-product wrap-hover-product col-xl-3 col-lg-4 col-md-4 col-12">
            <div className="product_bg">

                <div className="">

                    <div className="product-img">
                        <a style={{ minHeight: "268px" }}>

                            {item.disCount ? <span className="price-dec"> {`${t('disCount')}: ${item.disCount}%`} </span> : null}
                            {!item.status ? <span className="out-of-stock">Hết Hàng</span> : null}

                            {item.image.length ? <img className="default-img" src={`${Host.getImageUrl(item.image[0])}`} alt="#" /> : null}
                            {item.image.length ? <img className="hover-img" src={`${Host.getImageUrl(item.image[0])}`} alt="#" /> : null}
                        </a>
                        <div className="button-head">
                            <div className="product-action">
                                <a data-toggle="modal" data-target="#exampleModal" title="Quick View"><i className=" ti-eye" /><span>{t('detail_product')}</span></a>
                            </div>
                            <div className="product-action-2">
                                <a onClick={(e) => _handleAddItemToCard(e, item)} title="Add to cart" >{t("add_to_card")}</a>
                            </div>
                        </div>
                    </div>
                    <div className="product-content">
                        <h3><a onClick={() => _handleRouterPage(item.slug)}>{item.name}</a></h3>
                        {item.disCount && item.status ? <div className="product-price">
                            <span className="sale">{formatPrice(item.price)}</span>
                            <span>{caculatorPriceSale(item.price, item.disCount)}</span>

                        </div> : <div className="product-price">
                            <span>{formatPrice(item.price)}</span>

                        </div>
                        }
                    </div>
                </div>

            </div>
        </div>
    );
};


    //                            <span className="out-of-stock">Hot</span>
    //                             <span className="price-dec">30% Off</span>
    //                            <span className="new">New</span>