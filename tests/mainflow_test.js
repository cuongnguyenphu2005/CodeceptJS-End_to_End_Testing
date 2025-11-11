Feature('User Main Flow');

Scenario('Đăng nhập thành công', async ({ I }) => {
  I.login();
});

Scenario('Đăng nhập thất bại', async ({ I }) => {
  I.loginFail();
});
