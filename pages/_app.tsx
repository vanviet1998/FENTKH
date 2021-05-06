import React from "react";
import { AppProps } from "next/app";
import Head from 'next/head'
import "@styles/global.scss";
import { Provider } from "react-redux";
import store from "@redux/store";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <Provider store={store}>
      <Head>
        {/*  Jquery */}
        <script src="/static/js/jquery.min.js"></script>
        <script src="/static/js/jquery-migrate-3.0.0.js"></script>
        <script src="/static/js/jquery-ui.min.js"></script>
        {/*  Popper JS */}
        <script src="/static/js/popper.min.js"></script>
        {/*  Bootstrap JS */}
        <script src="/static/js/bootstrap.min.js"></script>
        {/*  Color JS */}
        <script src="/static/js/colors.js"></script>
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
      </Head>
      <Component {...pageProps} />

    </Provider>
  );
}

export default MyApp;
