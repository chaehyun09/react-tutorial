import React, { Fragment } from "react";
import Header from "../common/Header";
import Container from "../common/Container";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { editPost } from "../redux/modules/posts";
import { useDispatch } from "react-redux";

export default function Edit() {
  // const {id} = useParams();
  const {state} = useLocation();


  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 원래 props로 받던 애들을 useSelector로 가져와줌
  // const posts = useSelector((state) => state.posts)

  // const post = posts.find((p) => p.id === id)

  // 수정페이지에서 입력한 제목과 내용을 임시적으로 담아줄 state 필요
  const [editedPost, setEditedPost] = useState({
    ...state.post
    // 어차피 다 넣을거면 spread operator
    // id랑 작성자는 필요없음!
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
            dispatch(editPost(editedPost))
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
              // editedPost에 일단 원래 state 값들 담아줘서 화면에 나타나 있게
              // 그리고 수정이 일어나면 setState로 수정되게끔
              value={editedPost.title}
              onChange={(e) => setEditedPost({...editedPost, title: e.target.value})}
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
              value={editedPost.content}
              onChange={(e) => setEditedPost({...editedPost, content: e.target.value})}
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
