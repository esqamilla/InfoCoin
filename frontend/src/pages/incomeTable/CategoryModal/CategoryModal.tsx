import {Form, Input, InputNumber, message, Popover} from 'antd';
import React, {FC, useEffect, useState} from 'react'
import Modal from '../../../components/modal/Modal'
import {Category, Limits} from '../../../models/Models';
import concatClasses from '../../../utils/concatClasses';
import style from './category-modal.module.scss';

import { SketchPicker } from 'react-color';
import {createGetRequest, createPatchRequest, createPostRequest} from '../../../api/Api';

interface CategoryModalProps {
	title: string;
	visible: boolean;
	setVisible: React.Dispatch<React.SetStateAction<boolean>>;
	category?: Category;
  limit?: Limits;
  reloadData: () => void;
}

const CategoryModal: FC<CategoryModalProps> = ({ title, visible, setVisible, category, limit, reloadData }) => {
  const [form] = Form.useForm();
  const [popoverVisible, setPopoverVisible] = useState(false);
  const [color, setColor] = useState<string>();

  useEffect(() => {
    form.setFieldsValue({
      Color: color,
      Name: category?.Name ?? "",
      LimitValue: limit?.LimitValue ?? "",
    });
  }, [visible])

  useEffect(() => {
    if (category) {
      form.setFieldsValue({
        Color: category?.Color,
      });
      setColor(category?.Color)
    }
  }, [visible])

  const onFinish = () => {
    form.validateFields()
      .then(async () => {
        const fields = form.getFieldsValue();

        if (!category) {
          await createPostRequest("Category", {
            Icon: "",
            Color: fields.Color,
            Name: fields.Name,
            TypeId: 1
          })
          if (fields.LimitValue) {
            await createGetRequest("Category").then(data => {
              createPostRequest("Limits", {
                LimitValue: fields.LimitValue,
                StartDate: null,
                EndDate: null,
                CategoryID: data[data.length - 1].CategoryID
              })
            });
          }
        } else {
          await createPatchRequest("Category", {
            ...category,
            Color: fields.Color,
            Name: fields.Name,
          })
          if (fields.LimitValue && !limit) {
            await createPostRequest("Limits", {
              LimitValue: fields.LimitValue,
              StartDate: null,
              EndDate: null,
              CategoryID: category.CategoryID
            })
          } else {
            await createPatchRequest("Limits", {
              ...limit,
              LimitValue: fields.LimitValue,
              CategoryID: category.CategoryID
            })
          }
        }

        setVisible(false)
        setColor("");
        message.success(category ? 'Категория успешно обновлена!' : "Категория успешно добавлена!");
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
          name="Name"
          className='formItem'
          rules={[
            {
              required: true,
              message: 'Поле должно быть заполнено'
            }
          ]}
        >
          <Input placeholder="Название" size='small'/>
        </Form.Item>

        <div className={style.wrapper}>
          <Form.Item
            name="Color"
            className={concatClasses(style.formPopover, 'formItem')}
            rules={[{
              required: true,
              message: 'Обязательно'
            }]}
          >
            <Input placeholder="Цвет" value={color} size='small'/>
            <span className={style.inputColor} style={{ backgroundColor: color }}></span>
            <Popover
              content={
                <SketchPicker
                  color={color}
                  onChange={({ hex }) => {
                    setColor(hex);
                    form.setFieldsValue({
                      Color: hex,
                    });
                  }}
                />
              }
              trigger="click"
              visible={popoverVisible}
              onVisibleChange={(value) => setPopoverVisible(value)}
              overlayClassName={"popoverColor"}
            >
              <span className={style.input}></span>
            </Popover>
          </Form.Item>
        </div>

        <Form.Item
          name="LimitValue"
          className='formItem'
          rules={[{
            type: "number",
            validator: (rule: any, value: any) => new Promise((resolve, reject) => {
              if (isNaN(value)) reject("Введите число");
              else resolve("");
            })
          }]}
        >
          <Input placeholder="Лимит" size='small' />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default CategoryModal