import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";

export default function Header() {
  const navigate = useNavigate();
  const [isLogIn, setIsLogIn] = useState(false)
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      user !== null ? setIsLogIn(true) : setIsLogIn(false)
    })
  }, [])

  const logOut = async(event) => {
    await signOut(auth);
    alert("로그아웃 되었습니다!")
  }

  return (
    <header
      style={{
        height: "100px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 24px 0 24px",
      }}
    >
      <h1
        style={{
          color: "gray",
          cursor: "pointer",
        }}
        // 로고 클릭하면 홈으로 이동
        onClick={() => {navigate("/")}}
      >
        <FaHome />
      </h1>
      {isLogIn?
         <div
         style={{
           display: "flex",
           gap: "12px",
         }}
       >
         <button>이메일</button>
         <button onClick={logOut}>로그아웃</button>
       </div>
       :
       <div
       style={{
         display: "flex",
         gap: "12px",
       }}
     >
       <Link to="/login">로그인</Link>
       <Link to="/signup">회원가입</Link>
     </div>
    }
    </header>
  );
}
