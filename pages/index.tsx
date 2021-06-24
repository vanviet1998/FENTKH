import 'reflect-metadata';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import React from "react";
import { Header, Main, Cards, Footer,Panel,Products } from "@components";

const Home: React.FC = () => {
  return (
    <div>
    <Header/>
    <Panel />
    {/* End Small Banner */}
    {/* Start Product Area */}
 
    {/* End Product Area */}
  
    
    <Products/>
    <Footer/>
   
  </div>
  );
};
export const getStaticProps = async ({ locale }) => ({
  props: {
    ...await serverSideTranslations(locale, ['header','products']),
  },
})
export default Home;
