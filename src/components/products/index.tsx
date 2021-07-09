import React, { useEffect, useState } from "react";
import { useTranslation } from 'next-i18next'
import { Item } from "./item"
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProduct, searchAllProduct } from "@redux/slices/product/apiThunk";
import { selectAllProduct } from "@redux/slices/product";
import { Loading } from "@components/loading";
import { Button } from "@components/button"
import { intitalParamsPage, IParamsPage } from "src/constant/IParams";
import { PARAMS_PRODUCT_DEFAULT } from "src/constant";
import queryString from "query-string"
import {useRouter} from "next/router";

export const Products: React.FC = () => {
  const router = useRouter()
  const { q, category } = router.query
  const { t } = useTranslation("products")
  const [paramsPage, setParamsPage] = useState<IParamsPage | any>(intitalParamsPage)
  const dispatch = useDispatch()
  const { data, loading } = useSelector(selectAllProduct)
  const products = data?.result || []
  const getAllProducts = async (params) => {
    await dispatch(fetchAllProduct(params))
  }
  const searchAllproduct = async (params) => {
    await dispatch(searchAllProduct(params))
  }
  const _handleNextPage = () => {
    const querySearch = queryString.parse(window.location.search)

    const nextPage = {
      pageNumber: paramsPage.pageNumber + 1,
      limit: paramsPage.limit,
      q: querySearch?.q,
      category: querySearch?.querySearch
    }

    setParamsPage(nextPage)
    getAllProducts(nextPage)

  }
  useEffect(() => {
    const querySearch = queryString.parse(window.location.search)

    searchAllproduct({ ...paramsPage, ...querySearch })
  }, [category,q])
  return (
    <div className="product-area section">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="section-title">
              <h2>{t('product')}</h2>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="product-info">
              <div className="tab-content" id="myTabContent">
                {/* Start Single Tab */}
                <div className="tab-pane fade show active" id="man" role="tabpanel">
                  <div className="tab-single">
                    <div className="row">
                      {
                        products.map((v, index) => (
                          <Item item={v} key={index} />
                        ))
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {loading && <Loading />}

        {data.total !== products.length ? <Button onClick={_handleNextPage} className="d-block m-auto mt-5">{t('show_more')}</Button> : null}

      </div>
    </div>
  );
};


