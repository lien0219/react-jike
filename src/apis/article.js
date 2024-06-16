import { request } from "@/utils";

// 频道列表
export function getChannelAPI() {
  return request({
    url: "/channels",
    method: "GET",
  });
}

// 文章表单
export function createArticleAPI(data) {
  return request({
    url: "/mp/articles?draft=false",
    method: "POST",
    data,
  });
}

// 文章列表
export function getArticleListAPI(params) {
  return request({
    url: "/mp/articles",
    method: "GET",
    params,
  });
}

// 删除文章
export function delArticleAPI(id) {
  return request({
    url: `/mp/articles/${id}`,
    method: "DELETE",
  });
}
