import { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import { useToken } from "../context/TokenContext";
import { customFetch } from "../units/useFetchInterceptors";

const Journal = () => {
    //写法赘余了，没必要params了直接仅做id就行
    const { token } = useToken();
    const { paramData } = useParams();
    console.log(paramData);
    const [id, setID] = useState([]);
    const [diary, setdiary] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`http://localhost:5505/api/diary/${paramData}`,{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': token
                }
            });
            const data = await response.json();
            if(response.ok) {
                setdiary(data);
                setID(data._id);
            }
        };
        fetchData();         
    }, [paramData]);
 

        if (!diary) {
            // return <div>数据加载中...</div>;
            return null;
        }

    return (
        
        <div>
                <div>
                <h3>{diary.title}</h3>
                <span>{diary.content}</span>
                <span>{diary.updatedAt}</span>
            </div>
           
        </div>
        
        
    );
}

export default Journal;
