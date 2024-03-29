import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import styled from "styled-components";

import Spinner from "../components/Spinner.js";
import { UserContext } from "../context/UserContext.js";

export default function SignIn() {

  const { setUser, setToken } = useContext(UserContext);
  const [formEnabled, setFormEnabled] = useState(true);
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  function handleForm(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  function signIn(e) {
    e.preventDefault();
    setFormEnabled(false);
    axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/auth`, form)
      .then(res => {
        setUser(res.data.name);
        setToken(res.data.token);
        navigate("/");
      })
      .catch(err => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: err.response.data.error
        });
        setForm({
          ...form,
          password: ""
        });
        setFormEnabled(true);
      });
  }

  return (
    <Container>
      <Form onSubmit={signIn}>
        <Input
          type="email"
          placeholder="E-mail"
          name="email"
          value={form.email}
          onChange={handleForm}
          disabled={!formEnabled}
          required
        />

        <Input
          type="password"
          placeholder="Senha"
          name="password"
          value={form.password}
          onChange={handleForm}
          disabled={!formEnabled}
          required
        />

        <Button
          type="submit"
          title={formEnabled ? "Fazer login" : "aguarde..."}
          disabled={!formEnabled}
        >
          {formEnabled ? "Entrar" : <Spinner />}
        </Button>
      </Form>
    </Container>
  );
}

const Container = styled.section`
  width: 100%;
  height: 100%;
  max-width: 770px;
  padding: 15px;
  margin-top: 5%;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Input = styled.input`
  width: 100%;
  max-width: 769px;
  height: 60px;
  background-color: #FFFFFF;
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  color: #9C9C9C;
  border: 1px solid rgba(120, 177, 89, 0.25);
  box-shadow: 0px 4px 24px rgba(120, 177, 89, 0.12);
  border-radius: 12px;
  margin: 13px 0px;
  padding: 0px 22px;

  &::placeholder {
    font-weight: 400;
    font-size: 14px;
    line-height: 18px;
  }

  &:focus {
    outline: none;
    font-weight: 400;
    font-size: 14px;
    line-height: 18px;
    color: #474747;
    background-color: #FFFFFF;
  }

  &:disabled {
    color: #AFAFAF;
    background-color: #F2F2F2;
    -webkit-text-fill-color: #AFAFAF;
    -webkit-box-shadow: 0 0 0px 45px #F2F2F2 inset;
    box-shadow: 0 0 0px 45px #F2F2F2 inset;
  }
`;

const Button = styled.button`
  width: 182px;
  height: 60px;
  background: #5D9040;
  border-radius: 12px;
  border: none;
  outline: none;
  font-weight: 700;
  font-size: 14px;
  line-height: 18px;
  text-align: center;
  color: #FFFFFF;
  margin: 55px 0px;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    transform: scale(1.05);
    cursor: pointer;
  }

  &:disabled {
    transform: none;
    cursor: default;
  }
`;