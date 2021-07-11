import React, { useEffect, useState } from "react";
import { useTranslation } from 'next-i18next'
import { CONFIG, ICards, INFORMATION_SHOP } from "src/constant";
import router, { useRouter } from "next/router";
import queryString, { ParsedQuery } from "query-string"
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProduct, searchAllProduct } from "@redux/slices/product/apiThunk";
import { intitalParamsPage, IParamsPage } from "src/constant/IParams";
import { PATH } from "src/constant/path";
import { Cards } from "@components"
import { CardStore, makeid } from "src/until";
import { getAllCard, removeItemToCard, selectAllCards } from "@redux/slices/card";
import { IBaseRedux } from "src/constant/IBaseRedux";
import MessengerCustomerChat from 'react-messenger-customer-chat';

const Category: React.FC<any> = ({ data }) => {
    const _handleFilterCategory = (id) => {
        router.push({
            pathname: PATH.ALL_PRODUCTS,
            query: {
                q: "",
                category: id
            }
        })
    }
    return (data || []).map((cate) => {
        return cate.children ? (
            <li key={makeid(3)}>
                <a onClick={() => _handleFilterCategory(cate.id)} >{cate.title}
                    <i className="fa fa-angle-right" aria-hidden="true" />
                </a>
                <ul className="sub-category">
                    <Category data={cate.children} />
                </ul>
            </li>) : (
            <li key={makeid(3)}>
                <a onClick={() => _handleFilterCategory(cate.id)} >{cate.title}</a>
            </li>
        )
    })
}

export const Header: React.FC<any> = ({ categorys }) => {

    const { t } = useTranslation("header")
    const dispatch = useDispatch()
    const [url, setUtl] = useState<string>("")
    const [q, setQ] = useState<string | string[]>("")
    const cardsRedux: IBaseRedux<ICards> = useSelector(selectAllCards)
    const cards: ICards = cardsRedux.data
    // const [cards, setCards] = useState<ICards>()
    const RouterNext = useRouter()

    const _handleRemoveItemToCard = (id: string): void => {
        dispatch(removeItemToCard(id))
    }
    const _handleChangeSearch = (e) => {
        setQ(e.target.value)
    }
    const _handleSearch = async () => {
        router.push({
            pathname: PATH.ALL_PRODUCTS,
            query: { q, category: "" }

        })

    }
    const _handleClickLogo = () => {
        RouterNext.push(PATH.HOME)
    }
    const _handleChangePage = (path) => {
        router.push(path)

    }
    useEffect(() => {
        const querySearch = queryString.parse(window.location.search)
        dispatch(getAllCard())
        setUtl(router.pathname)
        setQ(querySearch?.q || "")
    }, [])
    return (
        <header className="header shop">
            {/* Topbar */}
            <div className="topbar">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-5 col-md-12 col-12">
                            {/* Top Left */}
                            <div className="top-left">
                                <ul className="list-main">
                                    <li><i className="ti-headphone-alt" /> {INFORMATION_SHOP.PHONE_NUMBER}</li>
                                    <li><i className="ti-email" />{INFORMATION_SHOP.EMAIL}</li>
                                </ul>
                            </div>
                            {/*/ End Top Left */}
                        </div>
                        <div className="col-lg-7 col-md-12 col-12">
                            {/* Top Right */}
                            <div className="right-content">
                                <ul className="list-main">
                                    <li><h1 style={{color:"#333",fontSize:13,fontWeight:500}}><i className="ti-home" />{INFORMATION_SHOP.NAME_SHOP}</h1> </li>

                                    <li> <a href={INFORMATION_SHOP.ADDRESS} target="blank"><i className="ti-location-pin" /> {t('store_location')}</a> </li>
                                    <li><i className="ti-user" /> <a>{t('my_account')}</a></li>
                                    <li><i className="ti-power-off" /><a >{t('login')}</a></li>
                                </ul>
                            </div>
                            {/* End Top Right */}
                        </div>
                    </div>
                </div>
            </div>
            {/* End Topbar */}
            <div className="middle-inner">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-2 col-md-2 col-12">
                            {/* Logo */}
                            <div className="logo" onClick={_handleClickLogo}>
                                <a onClick={_handleClickLogo}><img src={INFORMATION_SHOP.LOGO} /></a>
                            </div>
                            {/*/ End Logo */}
                            {/* Search Form */}
                            <div className="search-top">
                                <div className="top-search"><a><i className="ti-search" /></a></div>
                                {/* Search Form */}
                                <div className="search-top">
                                    <form className="search-form">
                                        <input onChange={_handleChangeSearch} type="text" value={q} placeholder="Tìm kiếm...." name="search" />
                                        <button onClick={_handleSearch} value="Tìm Kiếm" type="submit"><i className="ti-search" /></button>
                                    </form>
                                </div>
                                {/*/ End Search Form */}
                            </div>
                            {/*/ End Search Form */}
                            <div className="mobile-nav" />
                        </div>
                        <div className="col-lg-8 col-md-7 col-12">
                            <div className="search-bar-top">
                                <div className="search-bar">
                                    <input onChange={_handleChangeSearch} value={q} name="search" placeholder={t('search_product')} type="search" />
                                    <button onClick={_handleSearch} className="btnn"><i className="ti-search" /></button>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-3 col-12">
                            <div className="right-bar">
                                {/* Search Form */}
                                {/* <div className="sinlge-bar">
                                    <a className="single-icon"><i className="fa fa-heart-o" aria-hidden="true" /></a>
                                </div>
                                <div className="sinlge-bar">
                                    <a className="single-icon"><i className="fa fa-user-circle-o" aria-hidden="true" /></a>
                                </div> */}
                                <div className="sinlge-bar shopping">
                                    <a className="single-icon"><i className="ti-bag" /> <span className="total-count">{(cards?.cards || []).length}</span></a>
                                    {/* Shopping Item */}

                                    <Cards cards={cards} handleRemoveItemToCard={(id: string) => _handleRemoveItemToCard(id)} />

                                    {/*/ End Shopping Item */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Header Inner */}
            <div className="header-inner">
                <div className="container">
                    <div className="cat-nav-head">
                        <div className="row">
                            <div className="col-lg-3">
                                <div className="all-category">
                                    <h3 className="cat-heading"><i className="fa fa-bars" aria-hidden="true" />{t('all_category')}</h3>
                                    <ul className="main-category category">

                                        <Category data={categorys} />

                                    </ul>
                                </div>
                            </div>
                            <div className="col-lg-9 col-12">
                                <div className="menu-area">
                                    {/* Main Menu */}
                                    <nav className="navbar navbar-expand-lg">
                                        <div className="navbar-collapse">
                                            <div className="nav-inner">
                                                <ul className="nav main-menu menu navbar-nav">
                                                    <li className={url === PATH.HOME ? "active" : null}><a onClick={() => router.push(PATH.HOME)}>{t('home')}</a></li>
                                                    <li className={url === PATH.ALL_PRODUCTS ? "active" : null}><a onClick={() => router.push(PATH.ALL_PRODUCTS)}>{t('product')}</a></li>
                                                    <li><a>{t('service')}</a></li>
                                                    <li className={url === PATH.ALL_CARDS ? "active" : null}><a>{t('shop')}<i className="ti-angle-down" /><span className="new">{t('new')}</span></a>
                                                        <ul className="dropdown">
                                                            <li><a onClick={() => _handleChangePage(PATH.ALL_CARDS)}>{t('cart')}</a></li>
                                                            <li><a onClick={() => _handleChangePage(PATH.FEED_BACK)}>{t('checkout')}</a></li>
                                                        </ul>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </nav>
                                    {/*/ End Main Menu */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/*/ End Header Inner */}
        </header>
    );
};

