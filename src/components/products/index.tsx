import React, { useEffect, useState } from "react";
import { useTranslation } from 'next-i18next'
import { Item } from "./item"
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProduct } from "@redux/slices/product/apiThunk";
import { selectAllProduct } from "@redux/slices/product";
import { Loading } from "@components/loading";
import { Button } from "@components/button"
import { IParamsPage } from "src/constant/IParams";
import { PARAMS_PRODUCT_DEFAULT } from "src/constant";

export const Products: React.FC = () => {

  const { t } = useTranslation("products")
  const [paramsPage, setParamsPage] = useState<IParamsPage>({
    pageNumber: PARAMS_PRODUCT_DEFAULT.pageNumber,
    limit: PARAMS_PRODUCT_DEFAULT.limit
  })
  const dispatch = useDispatch()
  const { data, loading } = useSelector(selectAllProduct)
  const products = data?.result || []
  const getAllProducts = async (params) => {
    await dispatch(fetchAllProduct(params))
  }
  const _handleNextPage = () => {
    const nextPage = {
      pageNumber: paramsPage.pageNumber + 1, limit: paramsPage.limit
    }

    setParamsPage(nextPage)
    getAllProducts(nextPage)

  }
  useEffect(() => {
    getAllProducts(paramsPage)
  }, [])
  console.log("du con di me",data.total,products.length)
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
        {loading && <Loading/>}

        {data.total !== products.length ? <Button onClick={_handleNextPage} className="d-block m-auto mt-5">{t('show_more')}</Button> : null}

      </div>
    </div>
  );
};


