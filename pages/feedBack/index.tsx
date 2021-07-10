import 'reflect-metadata';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import React, { useEffect, useState } from "react";
import { Header, Footer, Button, Cards } from "@components";
import { service } from '@services';
import { convertToTreeData, formatPrice } from 'src/until';
import { useDispatch, useSelector } from 'react-redux';
import { UIInput } from '@components/ui';
import { useRouter } from 'next/router';
import { Card, Form, Select, List, Avatar, Badge } from 'antd';
import { IBaseRedux } from 'src/constant/IBaseRedux';
import { BodyPayLoadFeedBack, ICards, Type_Noti } from 'src/constant';
import card, { removeAllToCard, removeItemToCard, selectAllCards } from '@redux/slices/card';
import { Host } from '@services/host';
import { plainToClass } from 'class-transformer';
import { useNotification } from 'src/hook';
import { PATH } from 'src/constant/path';


const ProductPage: React.FC<any> = ({ categorys, province }) => {
    const router = useRouter()
    const dispatch = useDispatch()
    const {openNotification}=useNotification()
    const [district, setDistrict] = useState([])
    const cardsRedux: IBaseRedux<ICards> = useSelector(selectAllCards)
    const _handleRemoveItemToCard = (id: string): void => {
        dispatch(removeItemToCard(id))
    }
    const cards: ICards = cardsRedux.data
    const _handleOnChangeProvince = async (e) => {
        const distric = await service.getDistrict(e)
        setDistrict(distric?.results || [])
    }
    const onFinish = async(values: any) => {
        try {
            const payload = plainToClass(BodyPayLoadFeedBack,values)
            payload.total = cards.total
            payload.cards = cards.cards
            await service.createFeedBack(payload)
            if(!(cards?.cards || []).length){
                openNotification({
                    type:Type_Noti.error,
                    message:"Bạn chưa chọn sản phẩm!"
                })
            }
            openNotification({
                type:Type_Noti.success,
                message:"Yêu Cầu thực hiện thành công!!"
            })
            dispatch(removeAllToCard())
        } catch (error) {
            openNotification({
                type:Type_Noti.error,
                message:"Some things went wrong!!!"
            })
        }
       
    };

    const onFinishFailed = (errorInfo: any) => {
    };
    useEffect(() => {
        return () => {

        }
    }, [])

    return (
        <div>
            <Header categorys={categorys} />
            <div className="container" style={{ minHeight: "100vh" }}>
                <div className="row">
                    <div className="col-12">
                        <div style={{ marginTop: 24, marginBottom: 24 }} className="section-title">
                            <h2>Thông Tin Mua Hàng</h2>
                        </div>
                    </div>
                    <div className="col-24">

                        <Card title="Vui lòng nhập đầy đủ thông tin để mua hàng!" bordered>
                            <div className="row">
                                <div className="col-lg-6 col-12">
                                    <Form
                                        name="basic"
                                        labelCol={{ span: 6 }}
                                        wrapperCol={{ span: 18 }}
                                        initialValues={{ remember: true }}
                                        onFinish={onFinish}
                                        onFinishFailed={onFinishFailed}
                                    >
                                        <Form.Item
                                            label="Họ Và Tên"
                                            name="name"
                                            rules={[{ required: true, message: 'Nhập đầy đủ họ và tên!' }]}
                                        >
                                            <UIInput placeholder="Họ Và Tên" />
                                        </Form.Item>
                                        <Form.Item
                                            label="Email"
                                            name="email"
                                            rules={[{ required: false }]}
                                        >
                                            <UIInput placeholder="Email" />
                                        </Form.Item>
                                        <Form.Item
                                            label="Số Điện Thoại"
                                            name="phone"
                                            rules={[{ required: true, message: 'Nhập đầy đủ số điện thoại' }]}
                                        >
                                            <UIInput type="Number" placeholder="Số Điện Thoại" />
                                        </Form.Item>
                                        <Form.Item
                                            label="Địa Chỉ"
                                            name="address"
                                            rules={[{ required: true, message: 'Nhập đầy đủ địa chĩ' }]}
                                        >
                                            <UIInput placeholder="Địa Chỉ" />
                                        </Form.Item>
                                        <Form.Item
                                            label="Tỉnh"
                                            name="province"
                                            rules={[{ required: true, message: 'Nhập đầy đủ địa chĩ' }]}
                                        >
                                            <Select showSearch onChange={(e) => _handleOnChangeProvince(e)}>
                                                {province.map((item, index) => (
                                                    <Select.Option value={item.province_id} key={index}>{item.province_name}</Select.Option>
                                                ))}
                                            </Select>
                                        </Form.Item>
                                        <Form.Item

                                            label="Quận Huyện"
                                            name="district"
                                            rules={[{ required: true, message: 'Nhập đầy đủ địa chĩ' }]}
                                        >
                                            <Select showSearch >
                                                {district.map((item, index) => (
                                                    <Select.Option value={item.district_id} key={index}>{item.district_name}</Select.Option>
                                                ))}
                                            </Select>
                                        </Form.Item>
                                        <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                            <Button style={{ marginRight: 16 }}>Quay Về  Giỏ Hàng</Button>
                                            <Button type="primary" htmlType="submit" style={{ marginRight: 16 }}>Hoàn Tất Đơn Hàng</Button>

                                        </div>
                                    </Form>

                                </div>
                                <div style={{ height: 312, overflow: "auto" }} className="col-lg-6 col-12">
                                    <List
                                        itemLayout="horizontal"
                                        dataSource={cards?.cards || []}
                                        renderItem={item => (
                                            <List.Item>
                                                <List.Item.Meta
                                                    avatar={
                                                        <Badge count={item.amount}>

                                                            <Avatar size={60} src={Host.getImageUrl(item.image)} shape={"square"} />
                                                        </Badge>

                                                    }
                                                    title={item.name}
                                                    description={formatPrice(item.total)}
                                                />
                                            </List.Item>
                                        )}

                                    />
                                     {(cards?.cards || []).length ? <span>Tổng Cộng:</span> : null}

                                    {(cards?.cards || []).length ? <p style={{ fontSize: 17, color: 'black' }}>{formatPrice(cards?.total || 0)}</p>:null}
                                </div>

                             




                            </div>


                        </Card>


                    </div>
                </div>
            </div>
            <Footer />

        </div>
    );
};
export const getStaticProps = async ({ locale }) => {
    const category = await service.getAllCategory()
    const province = await service.getProvince()
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
            categorys: cates,
            province: province?.results || []

        },
    }
}

export default ProductPage;
