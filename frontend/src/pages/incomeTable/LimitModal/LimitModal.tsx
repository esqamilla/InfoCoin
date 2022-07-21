import {Button, Form, Input, InputNumber, message, Popover, Select} from 'antd';
import React, {FC, useEffect, useState} from 'react'
import Modal from '../../../components/modal/Modal'
import {Category, Limits} from '../../../models/Models';
import concatClasses from '../../../utils/concatClasses';
import style from './limit-modal.module.scss';

import { SketchPicker } from 'react-color';
import {DeleteOutlined} from '@ant-design/icons';
import {createDeleteRequest, createPatchRequest, createPostRequest} from '../../../api/Api';

interface LimitModalProps {
	title: string;
	visible: boolean;
	setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  categories: Category[];
  limits: Limits[];
  reloadData: () => void;
}

const LimitModal: FC<LimitModalProps> = ({
  title,
  visible,
  setVisible,
  categories,
  limits,
  reloadData
}) => {
  const [form] = Form.useForm();
  const [selectedCategoryId, setSelectedCategoryId] = useState<number>();
  const [disabled, sedDisabled] = useState<boolean>(false);

  useEffect(() => {
    if (limits.find(limit => limit.CategoryID === selectedCategoryId)?.LimitValue)
      sedDisabled(false)
    else sedDisabled(true)

    form.setFieldsValue({
      Limit: limits.find(limit => limit.CategoryID === selectedCategoryId)?.LimitValue ?? 0
    });
  }, [selectedCategoryId])

  const onFinish = () => {
    form.validateFields()
      .then( async () => {
        const fields = form.getFieldsValue();
        const findedLimit = limits.find(limit => limit.CategoryID === selectedCategoryId);

        if (!!findedLimit) {
          await createPatchRequest("Limits", {
            ...findedLimit,
            LimitValue: fields.Limit
          })
        } else {
          await createPostRequest("Limits", {
            LimitValue: fields.Limit,
            CategoryID: selectedCategoryId
          })
        }

        setVisible(false)
        message.success('Лимит успешно обновлен!');
        reloadData();
      })
      .catch(() => {
        message.error('Пожалуйста, заполните все поля!');
      });
  };

  return (
    <Modal title={title} visible={visible} setVisible={setVisible} onFinish={onFinish}>
      <Form
        form={form}
        layout="vertical"
        className={style.form}
      >
        <Form.Item
          name="CategoryId"
          className='formItem'
          rules={[
            {
              required: true,
              message: 'Поле должно быть заполнено'
            }
          ]}
        >
          <Select
            placeholder="Категория"
            className="selectAntd"
            dropdownStyle={{ zIndex: 1080 }}
            dropdownClassName={"selectAntdDropdown"}
            onChange={(id) => setSelectedCategoryId(id)}
          >
            {categories.map((category, index) => (
              <Select.Option key={index} value={category.CategoryID}>
                {category.Name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Input.Group compact>
          <Form.Item
            name="Limit"
            className='formItem'
            rules={[{
              type: "number",
              required: true,
              validator: (rule: any, value: any) => new Promise((resolve, reject) => {
                if (isNaN(value)) reject("Введите число");
                else resolve("");
              })
            }]}
          >
            <Input
              style={{ width: "calc(100% + 55px)", borderRadius: "10px 0 0 10px" }}
              placeholder="Лимит"
              size='small'
            />
          </Form.Item>
          <Button
            style={{ height: "60px", width: "70px", borderRadius: "0 10px 10px 0", marginLeft: "55px" }}
            icon={<DeleteOutlined style={{ fontSize: "32px" }} />}
            type="default"
            disabled={disabled}
            onClick={() =>
              createDeleteRequest("Limits", limits.find(limit => limit.CategoryID === selectedCategoryId)?.LimitID ?? 0)
                .then(() => {
                  setVisible(false);
                  message.success('Лимит успешно обновлен!');
                  reloadData();
                })
            }
          />
        </Input.Group>
      </Form>
    </Modal>
  )
}

export default LimitModal