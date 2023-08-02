import React, { useState } from "react";
import Header from "../common/Header";
import Container from "../common/Container";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { useEffect } from "react";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const signIn = async(event) => {
    event.preventDefault();
    if(email === ""){
      alert("이메일을 입력해주세요!")
      return
    }
    if(password === ""){
      alert("비밀번호를 입력해주세요!")
      return
    }
    try{
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      navigate("/")
    } catch(error){
      const errorCode = error.code;
      const errorMessage = error.message;
      if(errorCode === "auth/invalid-email"){
        alert("이메일 주소를 올바르게 입력해주세요!")
        return
      }
      if(errorCode === "auth/user-not-found"){
        alert("사용자를 찾을 수 없습니다!")
        return
      }
      if(errorCode === "auth/wrong-password"){
        alert("비밀번호가 일치하지 않습니다!")
        return
      }
      alert( errorCode + errorMessage)
    }
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log("user", user)
    })
  }, [])
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
                onClick={signIn}
              >
                로그인하기
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
                  backgroundColor: "#FF6969",
                  color: "white",
                  cursor: "pointer",
                }}
                onClick={() => navigate("/signup")}
              >
                회원가입하러 가기
              </button>
            </div>
          </form>
        </div>
      </Container>
    </>
  );
}
