import 'reflect-metadata';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import React from "react";
import { Header, Main, Cards, Footer, Panel, Products } from "@components";
import { service } from '@services';
import { convertToTreeData } from 'src/until';

const Home: React.FC<any> = ({ categorys }) => {
 
  return (
    <div>
      <Header categorys={categorys} />
      <Panel />
      <Products />
      <Footer />

    </div>
  );
};
export const getStaticProps = async ({ locale }) => {
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
  return {
    props: {

      ...await serverSideTranslations(locale, ['header', 'products']),
      categorys: cates
    },
  }
}
export default Home;
