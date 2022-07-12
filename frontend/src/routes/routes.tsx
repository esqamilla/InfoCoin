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
  // Reg: loadable(() => import("../pages/registration/Registration")),
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
};
