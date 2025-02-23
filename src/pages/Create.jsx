import React, { useEffect } from "react";
import { useState } from "react";
import Header from "../common/Header";
import Container from "../common/Container";
import { useNavigate } from "react-router-dom";
import { createPost } from "../redux/modules/posts";
import { useDispatch } from "react-redux";
import { nanoid } from "nanoid";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";


export default function Create() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [createdPost, setCreatedPost] = useState({
    id: nanoid(),
    title: "",
    content: "",
    author: "",
    // 여긴 id랑 author를 굳이 넣어줄 필요 없음! 제목과 내용만 입력받고, id랑 author는 밑에서 넣어주면 됨. 변하는 게 아니니까!
  })

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
    setCreatedPost({...createdPost, author: user.email})
    })
  }, [])


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
            if(createdPost.title === "" || createdPost.content === "") {
              alert("제목과 내용을 모두 입력해주세요!")
            } else {
              dispatch(createPost(createdPost))
              console.log(createdPost)
              navigate('/')}
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
              value={createdPost.title}
              // 입력 일어나면 입력된 내용을 createdPost의 title에 담아주기
              onChange={(e) => setCreatedPost({...createdPost, title: e.target.value})}
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
              value={createdPost.content}
              // 입력 일어나면 입력된 내용을 createdPost의 content에 담아주기
              onChange={(e) => setCreatedPost({...createdPost, content: e.target.value})}
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
