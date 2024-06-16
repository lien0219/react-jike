import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Radio,
  Input,
  Upload,
  Space,
  Select,
  message,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import "./index.scss";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import {
  getChannelAPI,
  createArticleAPI,
  getArticleById,
  updateArticleAPI,
} from "@/apis/article";
import { useEffect, useState, useRef } from "react";
import { useChannel } from "@/hooks/useChannel";

const { Option } = Select;

const Publish = () => {
  // 频道列表
  const { channelList } = useChannel();

  // 提交表单
  const onFinish = (formValue) => {
    // console.log(formValue);
    if (imageList.length !== imageType)
      return message.warning("封面类型和数量不匹配");
    const { title, content, channel_id } = formValue;
    const reqdata = {
      title,
      content,
      cover: {
        type: imageType,
        // 兼容编辑时处理
        image: imageList.map((item) => {
          if (item.response) {
            return item.response.data.url;
          } else {
            return item.url;
          }
        }),
      },
      channel_id,
    };
    if (articleId) {
      // 编辑
      updateArticleAPI(reqdata);
    } else {
      // 新增
      createArticleAPI({ ...reqdata, id: articleId });
    }
    message.success(`${articleId ? "编辑" : "发布"}文章成功`);
  };
  // 上传
  const cacheImageList = useRef([]);
  const [imageList, setImageList] = useState([]);
  const onUploadChange = (value) => {
    // console.log(1);
    setImageList(value.fileList);
    cacheImageList.current = value.fileList;
  };
  // 控制图片Type
  const [imageType, setImageType] = useState(0);
  const onTypeChange = (e) => {
    const type = e.target.value;
    setImageType(type);
    if (type === 1) {
      // 单图，截取第一张展示
      const imgList = cacheImageList.current[0]
        ? [cacheImageList.current[0]]
        : [];
      setImageList(imgList);
    } else if (type === 3) {
      // 三图，取所有图片展示
      setImageList(cacheImageList.current);
    }
  };

  // 回填数据
  const [searchParams] = useSearchParams();
  const articleId = searchParams.get("id");
  const [form] = Form.useForm();
  useEffect(() => {
    async function getArticle() {
      const res = await getArticleById(articleId);
      const { cover, ...formValue } = res.data;
      // 设置表单数据
      form.setFieldsValue({ ...formValue, type: cover.type });
      // 封面图片
      setImageType(cover.type); // 封面类型
      setImageList(
        cover.images.map((url) => {
          return { url };
        })
      );
    }
    if (articleId) {
      getArticle();
    }
  }, [articleId, form]);

  return (
    <div className="publish">
      <Card
        title={
          <Breadcrumb
            items={[
              { title: <Link to={"/"}>首页</Link> },
              { title: `${articleId ? "编辑文章" : "发布文章"}` },
            ]}
          />
        }
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ type: 0 }}
          onFinish={onFinish}
          form={form}
        >
          <Form.Item
            label="标题"
            name="title"
            rules={[{ required: true, message: "请输入文章标题" }]}
          >
            <Input placeholder="请输入文章标题" style={{ width: 400 }} />
          </Form.Item>
          <Form.Item
            label="频道"
            name="channel_id"
            rules={[{ required: true, message: "请选择文章频道" }]}
          >
            <Select placeholder="请选择文章频道" style={{ width: 400 }}>
              {channelList.map((item) => (
                <Option key={item.id} value={item.id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="封面">
            <Form.Item name="type">
              <Radio.Group onChange={onTypeChange}>
                <Radio value={1}>单图</Radio>
                <Radio value={3}>三图</Radio>
                <Radio value={0}>无图</Radio>
              </Radio.Group>
            </Form.Item>
            {imageType > 0 && (
              <Upload
                listType="picture-card"
                showUploadList
                action={"http://geek.itheima.net/v1_0/upload"}
                onChange={onUploadChange}
                name="image"
                maxCount={imageType}
                multiple={imageType > 1}
                fileList={imageList}
              >
                <div style={{ marginTop: 8 }}>
                  <PlusOutlined />
                </div>
              </Upload>
            )}
          </Form.Item>
          <Form.Item
            label="内容"
            name="content"
            rules={[{ required: true, message: "请输入文章内容" }]}
          >
            <ReactQuill
              className="publish-quill"
              theme="snow"
              placeholder="请输入文章内容"
            />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 4 }}>
            <Space>
              <Button size="large" type="primary" htmlType="submit">
                发布文章
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Publish;
