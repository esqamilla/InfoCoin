import React, {FC, ReactElement} from 'react'
import style from "./container.module.scss"

interface ContainerProps {
	children: ReactElement;
}

const Contanier: FC<ContainerProps> = ({ children }) => {
  return (
	<div className={style.container}>
		{children}
	</div>
  )
}

export default Contanier