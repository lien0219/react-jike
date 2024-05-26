import * as echarts from "echarts";
import { useEffect, useRef } from "react";

const BarChart = ({ title }) => {
  const chartRef = useRef(null);
  useEffect(() => {
    // 1. 生成实例
    // const chartDom = document.getElementById("main");
    const myChart = echarts.init(chartRef.current);
    // 2. 准备图表参数
    const option = {
      title: {
        text: title,
      },
      xAxis: {
        type: "category",
        data: ["Vue", "React", "Angular"],
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: [10, 40, 70],
          type: "bar",
        },
      ],
    };
    // 3. 渲染参数
    myChart.setOption(option);
  }, []);
  return (
    <div
      ref={chartRef}
      id="main"
      style={{ width: "500px", height: "400px" }}
    ></div>
  );
};

export default BarChart;
