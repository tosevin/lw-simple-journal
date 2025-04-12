// 日记数据库模型
import { Schema, model } from "mongoose";

const diarychema = new Schema({
  title: {
    type: String,
    required: true,//强请求，即非空
  },    
  content: {
    type: String,
    required: true,
  },
  // date: {
  //   type: Date,
  //   default: Date.now,
  // },
  beWriteDate: {
    type: String,
    unique: true, // 唯一
    required: true, 
    validate: {
      validator: function(v) {
        // 简单验证一下 应考虑其他验证方法
        return /^\d{4}-\d{1,2}-\d{1,2}$/.test(v);
      },
      message: props => `${props.value} 不是有效的日期格式!`
    }
  }
  }
,{
    timestamps: true
});

export default model("diarychema", diarychema);