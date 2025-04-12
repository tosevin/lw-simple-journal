import mongoose from "mongoose";
import  diarychema  from "../models/diaryModels.js";

export const getAllDiary = async (req, res) => {
    try {
        const diarys = await diarychema.find({}).sort({createdAt: -1}).limit(2);
        res.json(diarys);
        } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

export const createDiary = async (req, res) => {
    console.log("createDiary",req.body);
    const { title, content,beWriteDate } = req.body;
    try {
        const newDiary = await diarychema.create({
            title,
            content,
            beWriteDate
        });
        return res.json(newDiary);
    }catch (error){
        return  res.status(400).json({error: error.message});
    }


};

export const updateDiary = async (req, res) => {

    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ error: "不存在" });

    try {

        const diary = await diarychema.findById(id);
        if (!diary) {
            return res.status(404).json({ error: "日志不存在" });
        }
        const updateDiary = await diarychema.findByIdAndUpdate({_id: id},{...req.body});
        return res.json(updateDiary);
    }catch (error){
        return  res.status(400).json({error: error.message});
    }

};

export const deleteDiary = async (req, res) => {
    //计划不使用
    res.json({msg: "deletePost deleted successfully!"});  

};

export const getDiaryById = async (req, res) => {

    const  id  = req.params.param;
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ error: "不存在" });

    try {
        const diary = await diarychema.findById(id);
        if (!diary) {
            return res.status(404).json({ error: "Diary not found" });
        }
        return res.json(diary);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

export const getDiaryByDate = async (req, res) => { 
    const  beWriteDate  = req.params.param;

    // console.log( req);

    try {
        const diary = await diarychema.findOne({ beWriteDate });
        //不存在就不显示就行了
        // if (!diary) {
        //     return res.status(404).json({ error: "Diary not found" });
        // }
        return res.json(diary);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};