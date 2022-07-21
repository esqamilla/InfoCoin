import React, {FC, ReactElement, useState} from 'react'
import {Button, Modal as ModalAntd, Spin} from 'antd'
import style from "./modal.module.scss"
import {DownloadOutlined, LoadingOutlined} from '@ant-design/icons';

interface ModalProps {
  title: string;
	children: ReactElement | ReactElement[];
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  width?: number | string;
  onFinish?: () => void;
}

const Modal: FC<ModalProps> = ({ title, children, visible, setVisible, width = 690, onFinish }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);


  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <ModalAntd
      title={title}
      visible={visible}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
      closable={false}
      width={width}
      footer={(
        <div className={style.footer}>
          <Button
            onClick={handleCancel}
            className={style.btn}
            type={"primary"}
          >
            Назад
          </Button>
          <Button
            onClick={onFinish ? onFinish : handleOk}
            className={style.btn}
            type={"primary"}
            loading={confirmLoading}
          >
            Сохранить
          </Button>
        </div>
      )}
    >
      {children}
    </ModalAntd>
  )
}

export default Modal