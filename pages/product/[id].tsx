import 'reflect-metadata';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import React from "react";
import { Header, Footer, ProductDetail } from "@components";
import { service } from '@services';
import router from 'next/router';
import { IProduct } from 'src/constant/IProduct';
import { Host } from '@services/host';

interface IProdductDetail{
  product:IProduct,
  dataImage:string[]
}

const ProductDetailPage: React.FC<IProdductDetail> = (props) => {
  return (
    <div>
      <Header />
      <ProductDetail {...props}/>
      <Footer />

    </div>
  );
};
export const getStaticProps = async ({ locale,...context }) => {
  const id = context.params.id

  const product: IProduct = await service.getDetailProduct(id)
  const dataImage = product.image.map(v => ({
    image: Host.getImageUrl(v)
  }))

  return {
    props: {
      ...await serverSideTranslations(locale, ['header', 'products']),
      product,
      dataImage,
    }
  }
}
  export async function getStaticPaths() {

    return {
      paths: [

      ],
      fallback: "blocking",
    }
  }
  export default ProductDetailPage;
