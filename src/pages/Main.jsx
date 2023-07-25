import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../common/Header";
import Container from "../common/Container";


export default function Main({datas, deleteButtonClickHandler}) {
  // props로 datas 넘겨주기. props는 객체로 받아오니까 구조분해할당으로.
  const navigate = useNavigate();
 
  return (
    <>
      <Header />
      <Container>
        <div
          style={{
            display: "flex",
            justifyContent: "end",
            padding: "12px",
          }}
        >
          <button
            onClick={() => {
              navigate("/create");
            }}
            style={{
              border: "none",
              padding: "8px",
              borderRadius: "6px",
              backgroundColor: "skyblue",
              color: "white",
              cursor: "pointer",
            }}
          >
            추가
          </button>
        </div>
        {datas.map((d) => (
          // map으로 배열에 들어있는 요소들을 하나하나 돌면서 map안에 있는 콜백함수를 실행해줌
          <div
            key={d.id}
            style={{
              backgroundColor: "#EEEEEE",
              height: "100px",
              borderRadius: "24px",
              marginBottom: "12px",
              display: "flex",
              padding: "12px 16px 12px 16px",
            }}
          >
            <div
              onClick={() => {
                // 클릭하면 각 아이디에 맞게 상세페이지 그려줄 수 있게끔
                // app.js에서 route path를 '/detail/:id'로 해주고
                // 여기서 id값 넘겨준 다음
                // 디테일 페이지에서 일치하는 애들끼리 그려주게
                navigate(`/detail/${d.id}`);
              }}
              style={{
                flex: 4,
                borderRight: "1px solid lightgrey",
                cursor: "pointer",
              }}
            >
              <h2>{d.title}</h2>
              <p
                style={{
                  width: "300px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {d.content}
              </p>
            </div>
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "end",
                justifyContent: "space-around",
                gap: "12px",
              }}
            >
              <div>{d.author}</div>
              <div>
                <button
                  onClick={() => {
                    navigate(`/edit/${d.id}`);
                  }}
                  style={{
                    border: "none",
                    padding: "8px",
                    borderRadius: "6px",
                    backgroundColor: "orange",
                    color: "white",
                    cursor: "pointer",
                    marginRight: "6px",
                  }}
                >
                  수정
                </button>
                <button
                  onClick={() => {
                    deleteButtonClickHandler(d.id)
                  }}
                  style={{
                    border: "none",
                    padding: "8px",
                    borderRadius: "6px",
                    backgroundColor: "red",
                    color: "white",
                    cursor: "pointer",
                  }}
                >
                  삭제
                </button>
              </div>
            </div>
          </div>
        ))}
      </Container>
    </>
  );
}
