module.exports = function() {
  return actor({
    login(web = process.env.END_POINT,email = process.env.EMAIL_LOGIN, password = process.env.PASS_LOGIN) {
      this.amOnPage(web);
      this.fillField('Wifi Username', email);
      this.fillField('Password', password);
      this.click('Log in');
      this.waitForText('Hi, Cuong!',10);
    },
    
    loginFail(web = process.env.END_POINT, invalidEmail = 'invalid@email.com', invalidPassword = 'wrongpassword') {
      this.amOnPage(web);
      this.fillField('Wifi Username', invalidEmail);
      this.fillField('Password', invalidPassword);
      this.click('Log in');
      this.waitForText('Invalid login, please try again', 10);
    }
    
  });
}
