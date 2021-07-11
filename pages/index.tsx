import 'reflect-metadata';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import React from "react";
import { Header, Main, Cards, Footer, Panel, Products } from "@components";
import { service } from '@services';
import { convertToTreeData } from 'src/until';
import { intitalParamsPage } from 'src/constant/IParams';
import { getAllProducts } from '@redux/actions';
import { useDispatch } from 'react-redux';

const Home: React.FC<any> = ({ categorys, product,panelRight,panel }) => {
  const dispatch = useDispatch()
  dispatch(getAllProducts(product))
  return (
    <div>
      <Header categorys={categorys} />
      <Panel panelRight={panelRight} panel={panel}/>
      <Products />
      <Footer />

    </div>
  );
};
export const getServerSideProps = async (context) => {
  const data = await service.getAllPanel()
  const panelRight = (data?.result || []).find(v => v.type) || []
  const newPanel = (data?.result || []).filter(v => !v.type)

  const payload = {
    ...intitalParamsPage,
    q: "",
    category: "",
    ...context.query
  }
  const category = await service.getAllCategory()

  const cates = convertToTreeData(category.map(cate => {
    return {
      id: cate._id,
      key: cate._id,
      title: cate.title,
      value: cate._id,
      parent_id: cate.parent_id
    };
  }))
  const product = await service.getProduct(payload)
  return {
    props: {
      ...await serverSideTranslations(context.locale, ['header', 'products']),
      product: product,
      categorys: cates, panelRight,panel: newPanel

    }
  };
};
export default Home;
