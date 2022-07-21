import {PlusOutlined} from '@ant-design/icons';
import {Button, Card, Col, Drawer, Row, Space, Tooltip} from 'antd'
import Paragraph from 'antd/lib/typography/Paragraph';
import Title from 'antd/lib/typography/Title';
import {FC, useEffect, useState} from 'react'
import {createGetRequest, createPatchRequest, createPostRequest} from '../../api/Api';
import {Notes as NotesType} from '../../models/Models';
import style from "./notes.module.scss"

const Notes: FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [visible, setVisible] = useState(false);
  const [text, setText] = useState('Текст');
  const [title, setTitle] = useState('Заголовок');
  const [notes, setNotes] = useState<NotesType[] | undefined>();
  const [selectedNoteId, selectNoteId] = useState<number>(-1);

  console.log("selectedNoteId", selectedNoteId);

  const reload = () => {
    setLoading(true)

    createGetRequest("Notes").then(data => {
      setNotes(data)
      setLoading(false)
    })
  }

  useEffect(() => {
    createGetRequest("Notes").then(data => {
      setNotes(data)
      setLoading(false)
    })
  }, []);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    console.log("selectedNoteId", selectedNoteId);
    if (selectedNoteId !== -1) {
      const note = notes?.find((item) => item.NoteID === selectedNoteId);

      console.log("note", note);

      createPatchRequest("Notes", {
        ...note,
        Name: title,
        Description: text
      })
      .then(reload)
    } else {
      createPostRequest("Notes", {
        UserID: 1,
        Name: title,
        Description: text
      })
      .then(reload)
    }

    setVisible(false);
  };

  const onAdd = () => {
    setTitle("Новая заметка");
    setText("Текст...");
    selectNoteId(-1);
    showDrawer();
  }

  return (
	<>
		<Row gutter={[35, 35]} className={style.wrapper} align="middle">
      {notes?.map((note, index) => (
        <Col span={6} key={index}>
          <Card
            title={
              <Tooltip title={note.Name} placement="topLeft">
                {note.Name}
              </Tooltip>
            }
            loading={loading}
            size={"small"}
            extra={
              <Button
                onClick={() => {
                  showDrawer();
                  setTitle(note.Name);
                  setText(note.Description);
                  selectNoteId(note.NoteID);
                }}
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
              {note.Description}
            </Paragraph>
          </Card>
        </Col>
      ))}
      <Button
        className={style.btn}
        size='large'
        type='default'
        onClick={onAdd}
        icon={<PlusOutlined />}
      />
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