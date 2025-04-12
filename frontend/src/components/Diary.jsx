// import React, { useEffect,useState } from 'react';
import { Calendar, ConfigProvider, theme } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import { useDiaryDate } from '../context/DiaryContext';


const onPanelChange = (value, mode) => {
  console.log(value.format('YYYY-MM-DD'), mode);
};


const Diray = () => {

  const { dispatch } = useDiaryDate();

    const handleDateClick = (date) => {
        dispatch({ type: 'SET_SELECTED_DATE', payload: date });
    };
//   const [nowDate, setnowDate] = useState(null); //日历点击传递状态

//   const getTodayDate = () => {
//     const today = new Date();
//     const year = today.getFullYear();
//     const month = String(today.getMonth() + 1).padStart(2, '0'); // 月份从0开始，所以要加1
//     const day = String(today.getDate()).padStart(2, '0');

//     return `${year}-${month}-${day}`;
// };

//   setnowDate(getTodayDate()); // 输出示例：2024-12-23


//   useEffect(() => {
//     const fetchDiary = async () => {
//         try {
//             const response = await fetch('http://localhost:5505/api/diary/date/2024-12-23'); // 替换为获取单个日记的实际 API
//             const data = await response.json();
//             if (data) {
//                 onFetchDiary(data); // 通过回调函数传递数据
//             }
//         } catch (error) {
//             console.error('获取日记失败:', error);
//         }
//     };

//     fetchDiary(); // 组件挂载时获取日记
// }, [onFetchDiary]); // 将 onFetchDiary 作为依赖项

  
  const { token } = theme.useToken();
  const wrapperStyle = {
    width: 300,
    border: `1px solid ${token.colorBorderSecondary}`,
    borderRadius: token.borderRadiusLG,
  };
  return (
    <ConfigProvider locale={zhCN}>
    <div style={wrapperStyle}>
      <Calendar 
      fullscreen={false} 
      PanelChange={onPanelChange}
      onSelect={(date, { source }) => {
        if (source === 'date') {
          // console.log(date.format('YYYY-MM-DD'));
          handleDateClick(date.format('YYYY-MM-DD'));
          // setnowDate('2023-12-23');   
        }
      }}
      
      />
    </div>
    </ConfigProvider>
  );
};
export default Diray;