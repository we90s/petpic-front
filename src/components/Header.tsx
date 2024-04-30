import Link from "next/link";
import styled from "styled-components";
import LOGO from "#assets/logo.svg";
import theme from "#styles/Theme";

export default function Header() {
  return (
    <Container>
      <Link href="/">
        <LOGO />
      </Link>
      <StyledLink href="/signIn">로그인</StyledLink>
    </Container>
  );
}

const Container = styled.header`
  padding: 18px 40px;
  border-bottom: 1px solid #dbdbdb;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StyledLink = styled(Link)`
  color: #717176;
  font-size: ${theme.fontSize.xl};
  text-decoration: none;
`;
