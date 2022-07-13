import {Button, Form, Input, message} from 'antd'
import React, {FC} from 'react'
import {Link} from 'react-router-dom'
import FormWrapper from '../../components/formWrapper/FormWrapper'
import {Path} from '../../routes/path'
import {RegistrationData} from '../../types/types'
import style from "./registration.module.scss"

const Registration: FC = () => {
  const [form] = Form.useForm();

  const onFinish = (values: RegistrationData) => {
    message.success('Регистрация прошла успешно!');

    console.log("values", values);
  };

  const onFinishFailed = () => {
    message.error('Пожалуйста, заполните все поля!');
  };

  return (
	  <FormWrapper title="Регистрация">
      <Form
        form={form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        layout="vertical"
        className={style.form}
      >
        <Form.Item
          name="Name"
          rules={[
            {
              required: true,
              message: 'Поле должно быть заполнено'
            }
          ]}
        >
          <Input placeholder="Укажите имя" />
        </Form.Item>

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
          <Input placeholder="Укажите email" />
        </Form.Item>

        <Form.Item
          name="Password"
          rules={[
            {
              required: true,
              message: 'Поле должно быть заполнено'
            },
            { type: 'string', min: 8, message: 'Пароль должен содержать не меньше 8 символов' }
          ]}
        >
          <Input.Password placeholder="Введите пароль" />
        </Form.Item>

        <Form.Item
          name="RepeatPassword"
          dependencies={['Password']}
          rules={[
            {
              required: true,
              message: 'Поле должно быть заполнено'
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('Password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('Пароли не совпадают'));
              },
            }),
          ]}
        >
          <Input.Password placeholder="Повторите пароль" />
        </Form.Item>

        <Button
          className={style.btn}
          type="primary"
          htmlType="submit"
          block
          size='large'
        >
          Зарегистрироваться
        </Button>
      </Form>

      <div className={style.subInfo}>
        Уже есть аккаунт? <Link to={"/authorization"}>Войти</Link>
      </div>
    </FormWrapper>
  )
}

export default Registration