import { Card } from "antd";
import { Link } from "react-router-dom";

export default function JournalHead({ diary}) {
    // console.log(diary)
    return (
        <div style={{ marginTop: 20 }}>
              <Card
                title={<Link to={`/api/diary/${diary._id}`}>{diary.title}</Link>} // 直接使用 JSX
                bordered={false}
                style={{
                width: 300,
                }}
            >
                <p>{diary.content.substring(0, 100) + '...'}</p>
                <p>日期:{diary.beWriteDate}</p>
                <p>最后修改时间:{diary.updatedAt}</p>
            </Card>
            {/* <ul>
                <span></span>
                <h2>
                <Link to = {`/api/diary/${diary._id}`}>{diary.title}</Link>
                </h2>
                <p></p>
                <div></div>
             </ul>     */}
        </div>
    )
}