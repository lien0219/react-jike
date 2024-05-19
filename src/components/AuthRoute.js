import { getToken } from "@/utils";
import { Navigate } from "react-router-dom";

// 封装高阶组件
export const AuthRoute = ({ children }) => {
  const token = getToken();
  if (token) {
    return <>{children}</>;
  } else {
    return <Navigate to={"/login"} replace />;
  }
};
