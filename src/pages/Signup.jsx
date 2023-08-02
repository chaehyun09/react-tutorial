import React, { useState } from "react";
import Header from "../common/Header";
import Container from "../common/Container";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const signUp = async (event) => {
    event.preventDefault();
    if(confirmPassword === "") {
      alert("비밀번호 확인을 입력해주세요!")
      return
    }
    if(confirmPassword !== password && password!==""){
      alert("비밀번호가 일치하지 않습니다!")
      return
    }
    
    try{
      const userCredntial = await createUserWithEmailAndPassword(auth, email, password)
      alert("회원가입에 성공했습니다!")
      navigate("/")
    }catch(error){
      const errorCode = error.code;
      const errorMessage = error.message;
      if(errorCode === "auth/missing-email") {
        alert("이메일 주소를 입력해주세요!")
        return
      }
      if(errorCode === "auth/invalid-email") {
        alert("이메일 주소를 올바르게 입력해주세요!")
      return
    }
      if(errorCode === "auth/weak-password") {
        alert("비밀번호를 6자 이상 입력해주세요!")
      return
    }
      alert(errorCode + errorMessage)
    }
  }

  return (
    <>
      <Header />
      <Container>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            height: "600px",
            alignItems: "center",
          }}
        >
          <form>
            <div
              style={{
                width: "360px",
                marginBottom: "12px",
              }}
            >
              <input
                placeholder="이메일"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: "100%",
                  height: "40px",
                  fontSize: "16px",
                  borderRadius: "8px",
                  border: "1px solid lightgrey",
                  padding: "8px",
                  boxSizing: "border-box",
                }}
              />
            </div>
            <div
              style={{
                width: "360px",
                marginBottom: "12px",
              }}
            >
              <input
                placeholder="비밀번호"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: "100%",
                  height: "40px",
                  fontSize: "16px",
                  borderRadius: "8px",
                  border: "1px solid lightgrey",
                  padding: "8px",
                  boxSizing: "border-box",
                }}
              />
            </div>
            <div
              style={{
                width: "360px",
                marginBottom: "12px",
              }}
            >
              <input
                placeholder="비밀번호 확인"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                style={{
                  width: "100%",
                  height: "40px",
                  fontSize: "16px",
                  borderRadius: "8px",
                  border: "1px solid lightgrey",
                  padding: "8px",
                  boxSizing: "border-box",
                }}
              />
            </div>
            <div
              style={{
                width: "360px",
                marginBottom: "12px",
              }}
            >
              <button
                style={{
                  width: "100%",
                  border: "none",
                  padding: "12px",
                  borderRadius: "6px",
                  backgroundColor: "#FF6969",
                  color: "white",
                  cursor: "pointer",
                }}
                onClick={signUp}
              >
                회원가입하기
              </button>
            </div>
            <div
              style={{
                width: "360px",
              }}
            >
              <button
                style={{
                  width: "100%",
                  border: "none",
                  padding: "12px",
                  borderRadius: "6px",
                  backgroundColor: "#78C1F3",
                  color: "white",
                  cursor: "pointer",
                }}
                onClick={()=>navigate('/login')}
              >
                로그인하러 가기
              </button>
            </div>
          </form>
        </div>
      </Container>
    </>
  );
}
