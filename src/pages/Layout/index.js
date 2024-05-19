import { request } from "@/utils";
import { useEffect } from "react";

const Layout = () => {
  // token测试
  useEffect(() => {
    request.get("/user/profile");
  }, []);
  return <div>layout</div>;
};

export default Layout;
