import './index.css';

export const StatusBlock = (props) => {
    const { type } = props;
    let statusInfo = 'Успешно!';

    if (!type) {
        return null;
    }

    if (type === 'alert') {
        statusInfo = 'Заполните все поля!';
    }

    return (
        <div className={`StatusBlock StatusBlock_type_${type}`}><div>{statusInfo}</div></div>
    );
};
