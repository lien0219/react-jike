import { useState, useEffect } from "react";
import { getChannelAPI } from "@/apis/article";

// 频道列表
function useChannel() {
  // 频道列表
  const [channelList, setChannelList] = useState([]);
  useEffect(() => {
    const getChannelList = async () => {
      const res = await getChannelAPI();
      setChannelList(res.data.channels);
    };
    getChannelList();
  }, []);
  return {
    channelList,
  };
}

export { useChannel };
