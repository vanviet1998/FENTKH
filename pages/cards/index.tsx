import 'reflect-metadata';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import React, { useEffect } from "react";
import { Header, Footer, Button } from "@components";
import { service } from '@services';
import { convertToTreeData, formatPrice } from 'src/until';
import { useDispatch, useSelector } from 'react-redux';
import { IAddAmountItemCard, ICards } from 'src/constant';
import { addAmountToItemCards, getAllCard, removeItemToCard, selectAllCards } from '@redux/slices/card';
import { IBaseRedux } from 'src/constant/IBaseRedux';
import { Host } from '@services/host';
import { UIInput } from '@components/ui';
import { Table, Tag, Space, Avatar } from 'antd';
import { useRouter } from 'next/router';
import { PATH } from 'src/constant/path';
import { parse } from 'node:path';

const ProductPage: React.FC<any> = ({ categorys }) => {
    const router = useRouter()
    const cards: IBaseRedux<ICards> = useSelector(selectAllCards)
    const dispatch = useDispatch()
    const columns = [
        {
            title: 'Hình',
            dataIndex: 'image',
            key: 'name',
            render: text => <Avatar src={Host.getImageUrl(text)} size={60} shape="square"></Avatar>
        },
        {
            title: 'Tên Sản Phẩm',
            dataIndex: 'name',
            key: 'name',
            render: text => <a>{text}</a>,
        },
        {
            title: 'Số Lượng',
            dataIndex: 'amount',
            key: 'amount',
            render: (text,record) => 
            <UIInput
            min={0}
            onChange={(e)=>{
                
                const amount =  +e.target.value
                if(amount<0) return
                const variable:IAddAmountItemCard={
                    id:record._id,
                    amount:amount
                }
                dispatch(addAmountToItemCards(variable))
            }} value={text} type="number" style={{ width: 60 }} />,
    
        },
        {
            title: 'Giá Tiền',
            dataIndex: 'price',
            key: 'price',
            render: text => <p>{formatPrice(text)}</p>,
    
        },
        {
            title: 'Tổng',
            dataIndex: 'total',
            key: 'total',
            render: text => <p>{formatPrice(text)}</p>,
    
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <Button onClick={()=>{
                        console.log(record)
                        dispatch(removeItemToCard(record._id))
                    }}>Delete</Button>
                </Space>
            ),
        },
    ];
    useEffect(() => {
        return () => {

        }
    }, [])

    return (
        <div>
            <Header categorys={categorys} />
            <div className="container" style={{ minHeight: "100vh" }}>
                <div className="row">
                    <div className="col-24">
                        <div style={{ margin: 16 }}>
                            <h3 style={{ textAlign: "center", fontSize: 19, marginBottom: 16 }}>Bạn có tất cả {(cards?.data?.cards || []).length} sản phẩm trong giỏ hàng</h3>
                            <Table
                                columns={columns}
                                dataSource={(cards?.data?.cards || [])}
                                pagination={false}
                                summary={() => (
                                    <Table.Summary.Row>
                                        <Table.Summary.Cell index={0}></Table.Summary.Cell>
                                        <Table.Summary.Cell index={1}></Table.Summary.Cell>
                                        <Table.Summary.Cell index={2}></Table.Summary.Cell>

                                        <Table.Summary.Cell index={4}>Tổng</Table.Summary.Cell>
                                        <Table.Summary.Cell index={5}> <p style={{ fontSize: 17, color: 'black' }}>{formatPrice(cards?.data?.total || 0)}</p></Table.Summary.Cell>
                                    </Table.Summary.Row>
                                )}
                            />
                            <div style={{
                                marginTop: 16,
                                float: "right",
                                backgroundColor: "white",
                                display: "flex",
                                justifyContent: "flex-end",
                                alignContent: "center",
                                width: "100%",
                                height: 65,
                                alignItems:"center"
                            }} >
                                <Button onClick={()=> router.push(PATH.ALL_PRODUCTS)} size={"large"} style={{ marginRight: 16 }}>Tiếp tục mua hàng</Button>
                                <Button size={"large"} style={{ marginRight: 22 }}> Đặt Hàng </Button>
                            </div>
                        </div>

                    </div>


                </div>
            </div>
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

export default ProductPage;
