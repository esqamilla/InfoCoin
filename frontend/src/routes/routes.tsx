import loadable, { LoadableComponent } from "@loadable/component";
import { Path } from "./path";
import { ReactElement } from "react";

type TRouteComponents = {
  [key in keyof typeof Path]: LoadableComponent<any>;
};

type Routes = {
  [key in keyof typeof Path]: {
    path: string;
    element: ReactElement;
  };
};

const RouteComponents: TRouteComponents = {
  Index: loadable(() => import("../pages/home/Home")),
  Auth: loadable(() => import("../pages/authorization/Authorization")),
  Reg: loadable(() => import("../pages/registration/Registration")),
  PasswordRecovery: loadable(() => import("../pages/passwordRecovery/PasswordRecovery")),
  PasswordRecoveryCode: loadable(() => import("../pages/passwordRecoveryCode/PasswordRecoveryCode")),
  PasswordRecoveryChanging: loadable(() => import("../pages/passwordRecoveryChanging/PasswordRecoveryChanging")),
};

export const routes: Routes = {
  Index: {
    path: Path.Index,
    element: <RouteComponents.Index />,
  },
  Auth: {
    path: Path.Auth,
    element: <RouteComponents.Auth />,
  },
  Reg: {
    path: Path.Reg,
    element: <RouteComponents.Reg />,
  },
  PasswordRecovery: {
    path: Path.PasswordRecovery,
    element: <RouteComponents.PasswordRecovery />,
  },
  PasswordRecoveryCode: {
    path: Path.PasswordRecoveryCode,
    element: <RouteComponents.PasswordRecoveryCode />,
  },
  PasswordRecoveryChanging: {
    path: Path.PasswordRecoveryChanging,
    element: <RouteComponents.PasswordRecoveryChanging />,
  },
};
