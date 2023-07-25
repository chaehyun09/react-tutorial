import React from "react";
import { useState } from "react";
import Header from "../common/Header";
import Container from "../common/Container";
import { useNavigate } from "react-router-dom";

export default function Create({number, datas, addButtonClickHandler}) {
  const navigate = useNavigate();
  // 추가 데이터 담아줄 state 선언
  const [createdData, setCreatedData] = useState({
    id: number,
    title: "",
    content: "",
    author: "",
  })
  return (
    <>
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
            addButtonClickHandler(createdData)
            navigate('/')
          }}
        >
          <div>
            <input
              placeholder="제목"
              style={{
                width: "100%",
                height: "60px",
                fontSize: "18px",
                borderRadius: "12px",
                border: "1px solid lightgrey",
                padding: "8px",
                boxSizing: "border-box",
              }}
              value={createdData.title}
              // 입력 일어나면 입력된 내용을 createdData의 title에 담아주기
              onChange={(e) => setCreatedData({...createdData, title: e.target.value})}
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
              value={createdData.content}
              // 입력 일어나면 입력된 내용을 createdData의 content에 담아주기
              onChange={(e) => setCreatedData({...createdData, content: e.target.value})}
            />
          </div>
          <button
            style={{
              width: "100%",
              height: "40px",
              border: "none",
              color: "white",
              borderRadius: "12px",
              backgroundColor: "skyblue",
              cursor: "pointer",
            }}
          >
            추가하기
          </button>
        </form>
      </Container>
    </>
  );
}
