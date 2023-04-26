import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  background-color: ${(props) => props.theme.bgColor};
`;

const H1 = styled.h1`
  color: ${(props) => props.theme.textColor};
`;

//함수와 인자들의 타입을 지정
//컴포넌트의 prop들의 타입 지정법
interface DummyPorps {
  text: string;
  active?: boolean; //prop들을 선택적으로 만들 수 있는지, 또는 필수적으로 만드는지
}

//prop에 기본 값을 주는 방법 ex)active = false
function Dummy({ text, active = false }: DummyPorps) {
  return <h1>{text}</h1>;
}

function App() {
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {};
  return (
    <Container>
      <Dummy active text="hello" />
      <button onClick={onClick}>click me</button>
    </Container>
  );
}

export default App;
