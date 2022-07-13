import React, {FC, ReactElement} from 'react'
import concatClasses from '../../utils/concatClasses';
import style from './form-wrapper.module.scss'

interface FormWrapperProps {
	children: ReactElement[] | ReactElement;
	title: string;
	titleClassName?: string;
}

const FormWrapper: FC<FormWrapperProps> = ({ children, title, titleClassName }) => {
  return (
	<div className={style.formWrapper}>
		<div className={concatClasses(style.title, titleClassName)}>
			{title}
		</div>
		{children}
	</div>
  )
}

export default FormWrapper