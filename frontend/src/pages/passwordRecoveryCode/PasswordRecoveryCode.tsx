import {Button, Form, Input, message} from 'antd'
import React, {FC} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import FormWrapper from '../../components/formWrapper/FormWrapper'
import {RecoveryCodeData} from '../../types/types'
import style from "./password-recovery-code.module.scss"

const PasswordRecoveryCode: FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = (values: RecoveryCodeData) => {
    message.success('Введите новый пароль!');

    navigate("/passwordRecoveryChanging", { replace: true });
  };

  const onFinishFailed = () => {
    message.error('Пожалуйста, введите код!');
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
          name="Code"
          rules={[
            {
              required: true,
              message: 'Поле должно быть заполнено'
            },
            { type: 'string', min: 6, max: 6, message: 'Код состоит из 6 цифр' }
          ]}
        >
          <Input placeholder="Введите код" />
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
        <Link to={"/passwordRecovery"}>Назад</Link>
      </div>
    </FormWrapper>
  )
}

export default PasswordRecoveryCode