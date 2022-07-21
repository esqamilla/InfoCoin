import {Button, DatePicker, Form, Input, InputNumber, message, Popover, Select} from 'antd';
import React, {FC, useEffect, useState} from 'react'
import Modal from '../../../components/modal/Modal'
import {Category, FinanceItem, Limits} from '../../../models/Models';
import concatClasses from '../../../utils/concatClasses';
import style from './finance-item-modal.module.scss';

import { SketchPicker } from 'react-color';
import moment from 'moment';
import {createDeleteRequest, createPatchRequest, createPostRequest} from '../../../api/Api';
import {DeleteOutlined} from '@ant-design/icons';

interface FinanceItemModalProps {
	title: string;
	visible: boolean;
	setVisible: React.Dispatch<React.SetStateAction<boolean>>;
	financeItem?: {
    date: string | undefined;
    category: number | undefined;
    cost: number;
    description: string;
  };
  categories: Category[];
  reloadData: () => void;
  financeItemId?: number;
}

const FinanceItemModal: FC<FinanceItemModalProps> = ({
  title,
  visible,
  setVisible,
  financeItem,
  categories,
  reloadData,
  financeItemId
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (financeItem)
      form.setFieldsValue({
        CategoryId: financeItem?.category ?? "",
        Cost: financeItem?.cost ?? "",
        Date: moment(moment(financeItem?.date, 'DD.MM.YYYY').format('YYYY-MM-DD hh:mm:ssZ')) ?? "",
        Description: financeItem?.description ?? ""
      });
    else
      form.setFieldsValue({
        Date: moment(),
      });
  }, [visible])

  const onFinish = () => {
    form.validateFields()
      .then(() => {
        const fields = form.getFieldsValue();

        const financeItem = {
          cost: fields.Cost,
          description: fields.Description,
          date: fields.Date,
          financeId: 1,
          categoryId: fields.CategoryId
        }

        if (!financeItemId)
          createPostRequest("FinanceItem", financeItem)
            .then(() => {
              setVisible(false)
              message.success("Трата успешно добавлена!");
              reloadData();
            })
            .catch(() => {
              message.error('Произошла ошибка!');
            });
        else
          createPatchRequest("FinanceItem", {...financeItem, financeItemId: financeItemId})
            .then(() => {
              setVisible(false)
              message.success("Трата успешно обновлена!");
              reloadData();
            })
            .catch(() => {
              message.error('Произошла ошибка!');
            });
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
          >
            {categories.map((category, index) => (
              <Select.Option key={index} value={category.CategoryID}>
                {category.Name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="Cost"
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
          <Input placeholder="Трата" size='small' />
        </Form.Item>

        <Form.Item
          name="Date"
          className='formItem'
          rules={[{
            required: true,
            message: 'Поле должно быть заполнено'
          }]}
        >
          <DatePicker
            format={"DD.MM.YYYY"}
            className="datepicker"
            dropdownClassName={'dateDropdown'}
            placeholder="Дата"
            allowClear={false}
          />
        </Form.Item>

        <Form.Item
          name="Description"
          className='formItem'
          rules={[{
            required: true,
            message: 'Поле должно быть заполнено'
          }]}
        >
          <Input.TextArea placeholder="Описание" size='small'  />
        </Form.Item>

        {financeItemId && (
          <div style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}>
            <Button
              type={"link"}
              style={{ width: "32px", height: "32px", marginRight: "0", marginLeft: "auto" }}
              icon={<DeleteOutlined style={{ fontSize: "32px" }} />}
              onClick={() => createDeleteRequest("FinanceItem", financeItemId).then(reloadData)}
            />
          </div>
        )}
      </Form>
    </Modal>
  )
}

export default FinanceItemModal