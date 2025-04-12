import {  useForm } from "react-hook-form";
import { useState,useEffect } from "react";
import React from 'react';
import { useParams,useNavigate } from "react-router-dom";
import { useToken } from "../context/TokenContext";
import { useDiaryDate } from "../context/DiaryContext";
// import { DatePicker, Space } from 'antd';
// const onChange = (date, dateString) => {
//   console.log(date, dateString);
// };

export default function JournalForm() {
    const token = useToken();

    const navigate = useNavigate();

    const { paramData } = useParams();

    const {register , handleSubmit, setError,reset,setValue, formState:{ errors } } = useForm();

    const [nowDate, setnowDate] = useState(null); //日历点击传递状态  

    const [isCreate, setIsCreate] = useState(true);//验证表单是否为空

    

    const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // 月份从0开始，所以要加1
    const day = String(today.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
    };
    const todayDate = getTodayDate();
    // console.log(todayDate);
        //读全局钩日期

        //无尽渲染 问题未处理
    const [diaryDate, setDiaryDate] = useState(todayDate);
    const diaryDateContext = useDiaryDate();
    // setDiaryDate(diaryDateContext);
    // setDiaryDate(todayDate);

    useEffect(() => {
        console.log("Diary钩子,diaryDateContext", diaryDateContext.selectedDate);

        //无尽渲染 问题未处理
        if (diaryDateContext && diaryDateContext.selectedDate) {
        //暂时找不到什么时候渲染成空了 已解决
            setDiaryDate(diaryDateContext.selectedDate);
            console.log("Diary钩子,setDiaryDate", diaryDateContext.selectedDate);
        }
        // console.log("Diary钩子,setDiaryDate", diaryDate);

        const fetchDiary = async () => {
            try {
                if (!diaryDate) {
                    console.log("Diary日期不存在，不进行请求");
                    return;
                }
                const response = await fetch(`http://localhost:5505/api/diary/${diaryDate}`,{
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'authorization': token.token //检查此处 可能时node缓存存在问题
                    }
                }); 
                // console.log("JF",token.token);

                const data = await response.json();

                if(!response.ok) {
                     navigate('/api/login'); // 重定向到登录页
                     console.log("finbyDate被触发了");
                }

                if (data) {
                    setIsCreate(false);
                    setnowDate(data); 
                    setValue('title', data.title);
                    setValue('date', data.beWriteDate);
                    setValue('content', data.content);
                }else{
                    console.log("Diary数据", data);
                    setValue('title', '');
                    setValue('date', diaryDate);
                    setValue('content', '');
                }
                

            } catch (error) {
                console.error('获取日记失败:', error);
                navigate('/api/login'); // 重定向到登录页
            } 
        };

        fetchDiary(); 
    }, [paramData,token,navigate,setValue,diaryDateContext,diaryDate]); //依赖不能添加diaryDate初始值莫名bad Request

    // console.log("ASDAS", nowDate);
    /// 表单提交

    const onSubmit = async data =>{
        const diary = {
            beWriteDate: data.date,
            title: data.title,
            content: data.content
        };
        
        try {
            if (isCreate) {
                const response = await fetch("http://localhost:5505/api/diary/", {
                    method: "POST",
                    body: JSON.stringify(diary),
                    headers: {
                        "Content-Type": "application/json",
                        'authorization': token.token
                    }
                });
                console.log(diary);
    
                const body = await response.text();
                const newDiary = JSON.parse(body);
                
                if (!response.ok) {
                    setError('title', { type: 'manual', message: '您的数据被吞掉了' });
                    navigate('/api/login'); // 重定向到登录页
                }
                else {
                    reset( { title :'',date:'',content : ''});
                    console.log('新建',newDiary);
                }
            }else {//更新
                const response = await fetch(`http://localhost:5505/api/diary/${nowDate._id}`, {
                    method: "PATCH", 
                    body: JSON.stringify(diary),
                    headers: {
                        "Content-Type": "application/json",
                        'authorization': token.token
                    }
                });
                if(!response.ok) {
                    
               }
                console.log(diary);

                const body = await response.text();
                const newDiary = JSON.parse(body);

                if (!response.ok) {
                    setError('title', { type: 'manual', message: '您的数据被吞掉了' });
                    navigate('/api/login'); // 重定向到登录页
                }
                else {
                    console.log('更新', newDiary); 
                }

            }
            
        }catch(err){
                console.log(err);
                navigate('/api/login'); // 重定向到登录页
            }
            window.location.reload();
        }

  
        //清空
        const resetFrom = () => {
            reset( { title :'',date:todayDate,content : ''});
        }


    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} >
                <input
                    type="text"
                    // required : '必填'
                    {...register("title", { })} 
                    style={{ width: '80%',margin: ' auto'}}
                />
                <p>{errors.title?.message}</p>
                {/* <Space direction="vertical">
                    <DatePicker onChange={onChange} />
                </Space> */}
                <input
                    type = "date"
                    {...register("date", { required : '必填'})}   
                    style={{ width: '80%',margin: ' auto'}}            
                />
                <p>{errors.date?.message}</p>
                <textarea
                    rows= "25"
                    {...register("content", { })}
                    placeholder="输入内容"
                    style={{ width: '80%',margin: ' auto'}}
                />
                <p>{errors.content?.message}</p>
                <button 
                type="submit"
                style={{ width: '20%',marginRight: '5rem'}}
                >提交
                </button>
                <button 
                type="button" 
                onClick={resetFrom}
                style={{ width: '20%'}}
                >清空</button>
            </form>
        </>
    )
}