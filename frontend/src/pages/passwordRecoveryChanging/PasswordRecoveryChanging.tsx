import {Button, Form, Input, message} from 'antd'
import React, {FC} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import FormWrapper from '../../components/formWrapper/FormWrapper'
import {RecoveryChangingData} from '../../types/types'
import style from "./password-recovery-changing.module.scss"

const PasswordRecoveryCode: FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = (values: RecoveryChangingData) => {
    message.success('Пароль успешно изменен!');

    navigate("/authorization", { replace: true });
  };

  const onFinishFailed = () => {
    message.error('Пожалуйста, заполните все поля!');
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
          name="NewPassword"
          rules={[
            {
              required: true,
              message: 'Поле должно быть заполнено'
            },
            { type: 'string', min: 8, message: 'Пароль должен содержать не меньше 8 символов' }
          ]}
        >
          <Input.Password placeholder="Введите новый пароль" />
        </Form.Item>

        <Form.Item
          name="RepeatPassword"
          dependencies={['NewPassword']}
          rules={[
            {
              required: true,
              message: 'Поле должно быть заполнено'
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('NewPassword') === value) {
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
          Сменить пароль
        </Button>
      </Form>

      <div className={style.subInfo}>
        <Link to={"/passwordRecoveryCode"}>Назад</Link>
      </div>
    </FormWrapper>
  )
}

export default PasswordRecoveryCode