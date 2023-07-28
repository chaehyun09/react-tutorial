import React from "react";
import Header from "../common/Header";
import Container from "../common/Container";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { deletePost } from "../redux/modules/posts";
import { useDispatch, useSelector } from "react-redux";

export default function Detail() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts)
  // url parameter에서 아이디값을 가지고와서 id로 선언해줌
  const {id} = useParams();
  // 위에서 선언해준 아이디와 아이디가 일치하는 데이터를 찾아서 선언
  const post = posts.find((p) => p.id === id)
  return (
    <>
      <Header />
      <Container>
        <h1
          style={{
            border: "1px solid lightgray",
            borderRadius: "12px",
            padding: "12px",
          }}
        >
          {/* ?로 optional chaining? 해줘야 함. 안해주면 예를 들어 사용자가 없는 아이디를 URL에 치면 에러가 뜨니까 에러처리*/}
          {post?.title}
          {/* {post && post.title} */}
        </h1>
        <div
          style={{
            height: "400px",
            border: "1px solid lightgray",
            borderRadius: "12px",
            padding: "12px",
          }}
        >
          {post?.content}
        </div>
        <div
          style={{
            marginTop: "12px",
            display: "flex",
            justifyContent: "end",
          }}
        >
          <button
            onClick={() => {
              navigate(`/edit`, {
                state: {
                  post
                }
                // 콘솔 한 번 찍어보기
              });
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
              if(window.confirm("정말 삭제하시겠습니까?")){
                dispatch(deletePost(post.id))
                navigate("/")}
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
      </Container>
    </>
  );
}
