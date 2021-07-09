import React, { useEffect, useState } from "react";
import { Row, Col } from "antd";

import { Card } from "@components";
import data from "@public/meta.json";
import { ICards } from "src/constant";
import { useTranslation } from "next-i18next";
import { CardStore, formatPrice } from "src/until";
import { Host } from "@services/host";
import { useRouter } from "next/router";
import { PATH } from "src/constant/path";

interface IProps {
  cards: ICards
  handleRemoveItemToCard(id:string):void
}

export const Cards: React.FC<IProps> = (props) => {
  const { t } = useTranslation("header")
  const router = useRouter()
  const { cards,handleRemoveItemToCard } = props
  return (
    <div className="shopping-item">
      <div className="dropdown-cart-header">
        <span>{t('item')}</span>
        <a onClick={()=> router.push(PATH.ALL_CARDS)}>{t('view_card')}</a>
      </div>
      <ul className="shopping-list">
        {
          (cards?.cards || []).map((item, index) => (
            <li key = {index}>
              <a onClick={()=>handleRemoveItemToCard(item._id)} className="remove" title="Remove this item"><i className="fa fa-remove" /></a>
              <a className="cart-img" href="#"><img src={Host.getImageUrl(item.image)} alt="#" /></a>
              <h4 onClick={()=> router.push(PATH.PRODUCT_DETAIL.replace(":id",item.slug))}><a href="#">{item.name}</a></h4>
              <p className="quantity">{item.amount}x - <span className="amount">{formatPrice(item.total)}</span></p>
            </li>

          ))
        }

      </ul>
      <div className="bottom">
        <div className="total">
          <span>{t('total')}</span>
          <span className="total-amount">{formatPrice(cards?.total || 0)}</span>
        </div>
        <a href="checkout.html" className="btn animate">{t('checkout')}</a>
      </div>
    </div>
  );
};
