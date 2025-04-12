import Diray from "../components/Diary";
import { useState,useEffect } from "react";
import JournalHead from "../components/JournalHead";
import JournalForm from "../components/JournalFrom";
import { useToken } from "../context/TokenContext";
import { useNavigate } from 'react-router-dom';

export default function Home() {
    const navigate = useNavigate();
    // const [diaryData, setDiaryData] = useState(null); // 存储从 Diray 组件获取的单个日记数据传递给Journal
    //  // 回调函数，用于从 Diray 组件获取日记数据
    //  const handleFetchDiary = (data) => {
    //     setDiaryData(data); // 更新单个日记数据
    // };
    // // console.log(diaryData);

    const [diarys, setdiary] = useState([]);//左侧前三页面状态JournalHead
    const { token } = useToken();
    // console.log("token",token);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('http://localhost:5505/api/diary',{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': token
                }
            });
            
            console.log("token",token);
            if(!response.ok) {
                navigate('/api/login'); // 重定向到登录页
           }
            const data = await response.json();
            setdiary(data);
        };
        fetchData();         
    }, [token]);
    // console.log(diarys);

    return (
        <div>
            <main style={{ display: 'flex', height: '90vh' }}>
                <div style={{ flex: 1, padding: '20px', borderRight: '1px solid #ccc' }}>
                    <ul>
                        {diarys && diarys.map(diart =>(
                            <JournalHead key = {diart._id} diary = {diart} />
                        ))}
                    </ul>
                    {/* onFetchDiary={handleFetchDiary}  */}
                    <Diray   />
                </div>
                <div style={{ flex: 1, padding: '20px' }}>
                    {/*  diaryData = {diaryData}  */}
                    <JournalForm />
                </div>
            </main>
  
        
        </div>
    )
}