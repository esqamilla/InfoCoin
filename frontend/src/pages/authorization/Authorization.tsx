import {Button, Form, Input, message} from 'antd'
import React, {FC} from 'react'
import {Link} from 'react-router-dom'
import FormWrapper from '../../components/formWrapper/FormWrapper'
import {Path} from '../../routes/path'
import {AuthorizationData} from '../../types/types'
import style from "./authorization.module.scss"

const Authorization: FC = () => {
  const [form] = Form.useForm();

  const onFinish = (values: AuthorizationData) => {
    message.success('Авторизация прошла успешно!');
  };

  const onFinishFailed = () => {
    message.error('Пожалуйста, заполните все поля!');
  };

  return (
	  <FormWrapper title="Вход">
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

        <Form.Item
          name="Password"
          rules={[{
            required: true,
            message: 'Поле должно быть заполнено'
          }]}
        >
          <Input.Password placeholder="Пароль" />
        </Form.Item>

        <Link to="/passwordRecovery" className={style.forgotPassword}>Забыли пароль?</Link>

        <Button
          className={style.btn}
          type="primary"
          htmlType="submit"
          block
          size='large'
        >
          Войти
        </Button>
      </Form>

      <div className={style.subInfo}>
        Еще нет аккаунта? <Link to={"/registration"}>Зарегистрироваться</Link>
      </div>
    </FormWrapper>
  )
}

export default Authorization