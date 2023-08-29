function AuthPage() {
  const url = new URL(window.location.href);
  const code = url.searchParams.get("code");

  console.log(code);
  return <></>;
}

export default AuthPage;
