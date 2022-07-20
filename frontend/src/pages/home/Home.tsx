import {EditOutlined, FolderAddOutlined, LineChartOutlined, PieChartOutlined, UsergroupAddOutlined, WarningOutlined} from '@ant-design/icons'
import {Button} from 'antd'
import React, {FC} from 'react'
import {Link} from 'react-router-dom'
import {Path} from '../../routes/path'
import style from './home.module.scss'
import HomeItem from './HomeItem'

const homeItems = [
  {
    icon: <FolderAddOutlined className={style.icon} />,
    title: "Персональные категории",
    description: "Создавайте персональные категории трат и источники доходов. Настройте сервис под себя"
  },
  {
    icon: <WarningOutlined className={style.icon} />,
    title: "Лимит расходов",
    description: "Установите ограничения для каждой категории и всегда будете знать, если потратите больше запланированного"
  },
  {
    icon: <LineChartOutlined className={style.icon} />,
    title: "Прогнозирование трат",
    description: "Не беспокойтесь, что забыли установить лимиты на следующий месяц, сервис сделает это за Вас"
  },
  {
    icon: <PieChartOutlined className={style.icon} />,
    title: "Ежемесячная аналитика",
    description: "Узнайте на какие категории было потрачено больше всего денег и наглядно отследите динамику трат"
  },
  {
    icon: <UsergroupAddOutlined className={style.icon} />,
    title: "Совместный доступ",
    description: "Ведите личный или семейный бюджет. Самостоятельно или совместно с близкими сразу с нескольких устройств"
  },
  {
    icon: <EditOutlined className={style.icon} />,
    title: "Планирование целей",
    description: "Не держите всю информацию в голове, запишите в заметках все необходимое"
  }
]

const Home: FC = () => {
  return (
	  <div className={style.wrapper}>
      <h1 className={style.title}>
        Планировать бюджет просто с <span>InfoCoin</span>
      </h1>
      <div className={style.text}>
        InfoCoin позволяет планировать доходы и расходы, долги и кредиты, инвестиции и накопления, чтобы Вы всегда могли отсделить состояние Вашего бюджета и своевременно внести необходимые платежи.
      </div>
      <div className={style.inner}>

        {homeItems.map((item, index) => (
          <HomeItem
            key={index}
            icon={item.icon}
            title={item.title}
            description={item.description}
          />
        ))}

      </div>

      <div className={style.btnWrapper}>
        <Link to={Path.Auth}>
          <Button
            type='primary'
            className={"btn"}
          >
            Начать сейчас
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default Home