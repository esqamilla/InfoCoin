import React, {FC, ReactElement, useEffect} from 'react'
import { Link, useLocation, useNavigate } from "react-router-dom";

interface LayoutProps {
	children: ReactElement;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  const token = "token";
  const navigate = useNavigate();
  const location = useLocation();

	useEffect(() => {
		if (!token) {
			navigate("/authorization", { replace: true, state: location });
		}
  }, [token]);

  return (
    <div>
      Layout
      {children}
    </div>
  )
}

export default Layout