module.exports = function() {
  return actor({
    login(web = process.env.END_POINT,email = process.env.EMAIL_LOGIN, password = process.env.PASS_LOGIN) {
      this.amOnPage(web);
      this.click('Đăng nhập');
      this.fillField('Email', email);
      this.fillField('Mật khẩu', password);
      this.click('Đăng nhập');
      this.waitForText('Đăng nhập thành công',10);
    }
  });
}
