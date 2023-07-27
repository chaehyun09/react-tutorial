import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    id: 1,
    title: "제목1",
    content: "내용1입니다.",
    author: "김채현",
  },
  {
    id: 2,
    title: "제목2",
    content: "내용2입니다.",
    author: "스폰지밥",
  },
  {
    id: 3,
    title: "제목3",
    content: "내용3입니다.",
    author: "집게사장",
  },
];

const posts = createSlice({
  name: "posts",
  initialState,
  reducers: {
    createPost: (state, action) => {
      state.push(action.payload);
    },
    editPost: (state, action) => {
      return state.map((p) =>
        p.id === action.payload.id
          ? {
              ...p,
              title: action.payload.title,
              content: action.payload.content,
            }
          : { ...p }
      );
    },
    deletePost: (state, action) => {
      return state.filter((post) => {
        return action.payload !== post.id;
      });
    },
  },
});

export default posts;
export const { createPost, editPost, deletePost } = posts.actions;
