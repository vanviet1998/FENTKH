import 'reflect-metadata';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'

import React from "react";
import { Header, Footer, ProductDetail } from "@components";
import { service } from '@services';
import router from 'next/router';
import { IProduct } from 'src/constant/IProduct';
import { Host } from '@services/host';
import { convertToTreeData } from 'src/until';

interface images {
  image: string
}
interface category{

}
interface IProdductDetail {
  product: IProduct,
  dataImage: images[],
  categorys: category[]
}

const ProductDetailPage: React.FC<IProdductDetail> = (props) => {
  return (
    <div>
      <Head>
        <title>{props.product.name}</title>
      </Head>
      <Header categorys={props.categorys}/>
      <ProductDetail {...props} />
      <Footer />

    </div>
  );
};
export const getStaticProps = async ({ locale, ...context }) => {
  const id = encodeURI(context.params.id)

  const product: IProduct = await service.getDetailProduct(id)
  const dataImage = (product?.image || []).map(v => ({
    image: Host.getImageUrl(v)
  }))
  if (!product) return {
    props: { ...await serverSideTranslations(locale, ['header', 'products']), }

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
  return {
    props: {
      ...await serverSideTranslations(locale, ['header', 'products']),
      product,
      dataImage,
      categorys: cates

    }
  }
}
export async function getStaticPaths() {

  return {
    paths: [],
    fallback: "blocking",
  }
}
export default ProductDetailPage;
