import {Button, Form, Input, message} from 'antd'
import React, {FC} from 'react'
import {Link, useLocation, useNavigate} from 'react-router-dom'
import FormWrapper from '../../components/formWrapper/FormWrapper'
import {RecoveryData} from '../../types/types'
import style from "./password-recovery.module.scss"

const PasswordRecovery: FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = (values: RecoveryData) => {
    message.success('Код отправлен на указанный эл. адрес!');

    navigate("/passwordRecoveryCode", { replace: true });
  };

  const onFinishFailed = () => {
    message.error('Пожалуйста, заполните Email!');
  };

  return (
	  <FormWrapper title="Восстановление пароля">
      <Form
        form={form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        layout="vertical"
        className={style.form}
      >
        <Form.Item
          name="Email"
          rules={[
            {
              required: true,
              message: 'Поле должно быть заполнено'
            },
            {
              type: "email",
              message: 'Указан некорректный адрес эл. почты'
            }
          ]}
        >
          <Input placeholder="Email" />
        </Form.Item>

        <Button
          className={style.btn}
          type="primary"
          htmlType="submit"
          block
          size='large'
        >
          Далее
        </Button>
      </Form>

      <div className={style.subInfo}>
        <Link to={"/authorization"}>Вход</Link>
        <Link to={"/registration"}>Регистрация</Link>
      </div>
    </FormWrapper>
  )
}

export default PasswordRecovery