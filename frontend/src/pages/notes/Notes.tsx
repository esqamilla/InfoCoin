import {Button, Card, Col, Drawer, Row, Space, Tooltip} from 'antd'
import Paragraph from 'antd/lib/typography/Paragraph';
import Title from 'antd/lib/typography/Title';
import {FC, useEffect, useState} from 'react'
import style from "./notes.module.scss"

const Notes: FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [visible, setVisible] = useState(false);
  const [text, setText] = useState('Текст');
  const [title, setTitle] = useState('Заголовок');

  useEffect(() => {
    setTimeout(() => setLoading(false), 2000)
  }, []);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
	<>
		<Row gutter={[35, 35]} className={style.wrapper}>
      <Col span={6} key={1}>
        <Card
          title={
            <Tooltip title={"ЗаголовокЗаголовокЗаголовокЗаголовокЗаголовок"} placement="topLeft">
              ЗаголовокЗаголовокЗаголовокЗаголовокЗаголовокЗаголовокЗаголовокЗаголовок
            </Tooltip>
          }
          loading={loading}
          size={"small"}
          extra={
            <Button
              onClick={showDrawer}
              className={style.link}
              type={"link"}
            >
              Еще...
            </Button>
          }
        >
          <Paragraph
            ellipsis={{
              rows: 5,
            }}
          >
            Card contentCard contentCard contentCard contentCard contentCard contentCard contentCard contentCard contentCard contentCard contentCard contentCard contentCard contentCard contentCard contentCard contentCard contentCard contentCard contentCard contentCard contentCard contentCard contentCard contentCard contentCard contentCard contentCard contentCard contentCard contentCard contentCard content
          </Paragraph>
        </Card>
      </Col>
		</Row>

    <Drawer
        title={
          <Title
            level={5}
            className={style.title}
            ellipsis={{ rows: 1 }}
            editable={{
              tooltip: title,
              onChange: setTitle,
              triggerType: ["icon"],
            }}
          >
            {title}
          </Title>
        }
        placement={"right"}
        width={500}
        onClose={onClose}
        visible={visible}
        extra={
          <Space>
            <Button onClick={onClose}>Назад</Button>
            <Button type="primary" onClick={onClose}>Сохранить</Button>
          </Space>
        }
      >
        <Paragraph
          editable={{
            tooltip: 'Нажмите для редактирования',
            onChange: setText,
            triggerType: ["text"],
          }}
          className={style.text}
        >
          {text}
        </Paragraph>
      </Drawer>
	</>
  )
}

export default Notes