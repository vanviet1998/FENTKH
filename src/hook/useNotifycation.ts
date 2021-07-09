import {  notification} from 'antd';
import { Type_Noti } from 'src/constant';
import { makeid } from 'src/until';


interface IProps {
    type?: Type_Noti;
    message?: string;
    description?: string;
}

export const useNotification = () => {
    const openNotification = (props: IProps) => {
        const { type, message, description } = props
        const key = makeid(5)
        notification[type]({
            key,
            message,
            description,
        });
    };

    return { openNotification };
};

