import { request } from "@/utils";

// 频道列表
export function getChannelAPI() {
  return request({
    url: "/channels",
    method: "GET",
  });
}
