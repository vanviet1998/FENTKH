import 'reflect-metadata';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import queryString from "query-string"
import React from "react";
import { Header, Main, Cards, Footer, Panel, Products } from "@components";
import { service } from '@services';
import { convertToTreeData } from 'src/until';
import { intitalParamsPage } from 'src/constant/IParams';
import { getAllProducts } from '@redux/actions';
import { useDispatch } from 'react-redux';

const ProductPage: React.FC<any> = ({ categorys, product }) => {
  const dispatch = useDispatch()
    dispatch(getAllProducts(product))
  return (
    <div>
      <Header categorys={categorys} />
      <Products product={product} />
      <Footer />

    </div>
  );
};

export const getServerSideProps = async (context) => {
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
  return { props: { 
    ...await serverSideTranslations(context.locale, ['header', 'products']),
    product:product,
    categorys: cates } };
};
export default ProductPage;
