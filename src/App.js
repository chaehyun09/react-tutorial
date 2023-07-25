import { Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import Detail from "./pages/Detail";
import Create from "./pages/Create";
import Edit from "./pages/Edit";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { useState } from "react";

function App() {
  // 데이터를 메인페이지에서도 써야 하고 수정페이지, 디테일페이지에서도 써야 하니까 부모에서 선언해줌
  const [datas, setDatas] = useState([
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
  ]);

  // 수정, 삭제 함수를 만들어 props로 내려줘서 datas를 수정,삭제할 수 있게끔
  const editButtonClickHandler = (data) => {
    const newDatas = datas.map((d) => {
      if (d.id === data.id) {
        return { ...d, title: data.title, content: data.content };
      } else {
        return { ...d };
      }
    });
    setDatas(newDatas);
  };

  const deleteButtonClickHandler = (id) => {
    const newDatas = datas.filter((d) => {
      return id !== d.id;
    });
    setDatas(newDatas);
  };

  return (
    // 페이지 이동에 사용되는 Route 태그를 위해선 Routes로 먼저 감싸야 한다.
    <Routes>
      {/* path="/"이기 때문에 '<주소>/'인 주소로 접속할 경우 Main 컴포넌트가 화면에 보여지게 된다.  */}
      <Route
        path="/"
        element={
          <Main
            datas={datas}
            deleteButtonClickHandler={deleteButtonClickHandler}
          />
        }
      />
      <Route
        path="/detail/:id"
        element={
          <Detail
            datas={datas}
            deleteButtonClickHandler={deleteButtonClickHandler}
          />
        }
      />
      <Route path="/create" element={<Create />} />
      <Route
        path="/edit/:id"
        element={
          <Edit datas={datas} editButtonClickHandler={editButtonClickHandler} />
        }
      />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
