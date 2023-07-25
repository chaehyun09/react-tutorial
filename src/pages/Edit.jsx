import React, { Fragment } from "react";
import Header from "../common/Header";
import Container from "../common/Container";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

export default function Edit({datas, editButtonClickHandler}) {
  const {id} = useParams();
  const data = datas.find((d) => d.id === Number(id))
  const navigate = useNavigate();

  // 수정페이지에서 입력한 제목과 내용을 임시적으로 담아줄 state 필요
  const [editedData, setEditedData] = useState({
    id: data.id,
    title: data.title,
    content: data.content,
    author: data.author,
  })

  return (
    <Fragment>
      <Header />
      <Container>
        <form
          style={{
            height: "600px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
          }}
          onSubmit={(e) => {
            e.preventDefault();
            // 폼 제출 시 수정버튼클릭함수로 수정된 내용을 담은 state 전달
            editButtonClickHandler(editedData)
            navigate("/")
          }}
        >
          <div>
            <input
              placeholder=""
              style={{
                width: "100%",
                height: "60px",
                fontSize: "18px",
                borderRadius: "12px",
                border: "1px solid lightgrey",
                padding: "8px",
                boxSizing: "border-box",
              }}
              // editedData에 일단 원래 state 값들 담아줘서 화면에 나타나 있게
              // 그리고 수정이 일어나면 setState로 수정되게끔
              value={editedData.title}
              onChange={(e) => setEditedData({...editedData, title: e.target.value})}
            />
          </div>
          <div
            style={{
              height: "400px",
            }}
          >
            <textarea
              placeholder="내용"
              style={{
                resize: "none",
                height: "100%",
                width: "100%",
                fontSize: "18px",
                borderRadius: "12px",
                border: "1px solid lightgrey",
                padding: "12px",
                boxSizing: "border-box",
              }}
              value={editedData.content}
              onChange={(e) => setEditedData({...editedData, content: e.target.value})}
            />
          </div>
          <button
            style={{
              width: "100%",
              height: "40px",
              border: "none",
              color: "white",
              borderRadius: "12px",
              backgroundColor: "orange",
              cursor: "pointer",
            }}
          >
            수정하기
          </button>
        </form>
      </Container>
    </Fragment>
  );
}
