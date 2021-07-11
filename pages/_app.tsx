import React, { useEffect, useState } from "react";
import { AppProps } from "next/app";
import Head from 'next/head'
import "@styles/global.scss";
import { Provider } from "react-redux";
import store from "@redux/store";
import { appWithTranslation } from 'next-i18next'
import Router, { useRouter } from 'next/router';
import NProgress from 'nprogress';
import { MessFB } from "@components"

Router.events.on('routeChangeStart', (url) => {
  NProgress.start()
})
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

function MyApp({ Component, pageProps }: AppProps): JSX.Element {




  return (
    <Provider store={store}>
      <Head>
        {/*  Jquery */}
        <script src="/static/js/jquery.min.js"></script>
        <script src="/static/js/jquery-migrate-3.0.0.js"></script>
        <script src="/static/js/jquery-ui.min.js"></script>
        {/*  Popper JS */}
        {/* <script src="/static/js/popper.min.js"></script> */}
        {/*  Bootstrap JS */}
        {/* <script src="/static/js/bootstrap.min.js"></script> */}
        {/*  Color JS */}
        {/* <script src="/static/js/colors.js"></script> */}
        {/*  Slicknav JS */}
        <script src="/static/js/slicknav.min.js"></script>
        {/*  Owl Carousel JS */}
        <script src="/static/js/owl-carousel.js"></script>
        {/*  Magnific Popup JS */}
        <script src="/static/js/magnific-popup.js"></script>
        {/*  Waypoints JS */}
        <script src="/static/js/waypoints.min.js"></script>
        {/*  Countdown JS */}
        <script src="/static/js/finalcountdown.min.js"></script>
        {/*  Nice Select JS */}
        <script src="/static/js/nicesellect.js"></script>
        {/*  Flex Slider JS */}
        <script src="/static/js/flex-slider.js"></script>
        {/*  ScrollUp JS */}
        <script src="/static/js/scrollup.js"></script>
        {/*  Onepage Nav JS */}
        <script src="/static/js/onepage-nav.min.js"></script>
        {/*  Easing JS */}
        <script src="/static/js/easing.js"></script>
        {/*  Active JS */}
        <script src="/static/js/active.js"></script>
        {/** meta */}
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        
        {/* Title Tag  */}
        <title>Cửa Hàng Nội Thất:Nội Thất Khánh Huyền</title>
        <meta name="description" content="Chuyên cung cấp đồ nội thất giá sỉ lẽ" />

        {/* Favicon */}
        <link rel="icon" type="image/png" href="images/favicon.png" />
        {/* Web Font */}
        <link href="https://fonts.googleapis.com/css?family=Poppins:200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i&display=swap" rel="stylesheet" />
        <link rel="stylesheet" type="text/css" href="/static/css/nprogress.scss" />

        {/* StyleSheet */}
        {/* Preloader */}
        {/* {loading && <div className="preloader">
          <div className="preloader-inner">
            <div className="preloader-icon">
              <span />
              <span />
            </div>
          </div>
        </div>} */}

      </Head>
      <MessFB />
      <Component {...pageProps} />
    </Provider>
  );
}

export default appWithTranslation(MyApp)
