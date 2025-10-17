# RiderVolt End-to-End Tests

This project contains end-to-end tests for the RiderVolt application using CodeceptJS with Playwright and Allure reporting.

## Prerequisites

- Node.js (Latest LTS version recommended)
- npm (comes with Node.js)

## Setup

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Create `.env` file from `.env.example`:
```bash
cp .env.example .env
```

4. Configure your environment variables in `.env`:
```
END_POINT=your_application_url
EMAIL_LOGIN=your_email
PASS_LOGIN=your_password
```

## Running Tests

There are several ways to run the tests:

1. Run tests with basic output:
```bash
npm run test
```

2. Run tests with Allure reporting:
```bash
npm run test:allure
```

3. Run a specific test file:
```bash
npx codeceptjs run tests/mainflow_test.js
```

## Viewing Test Reports

After running tests with Allure reporting, you can:

1. Generate and view the Allure report in your browser:
```bash
npm run allure:serve
```

2. Generate a static HTML report:
```bash
npm run allure:report
```
The report will be available in the `output/allure-report` directory.

## Writing Tests

### Project Structure
```
├── codecept.conf.js      # Test configuration
├── steps_file.js         # Contains reusable test actions (actor)
├── tests/                # Test scenarios
│   └── mainflow_test.js  # Main test flows
├── output/               # Test outputs and reports
│   ├── allure-results/   # Raw Allure results
│   └── allure-report/    # Generated HTML reports
└── .env                  # Environment variables
```

### Step 1: Define Actions in steps_file.js

The `steps_file.js` is where you define reusable actions that can be used across different test scenarios. Each action is defined in the actor object.

Example structure:
```javascript
module.exports = function() {
  return actor({
    // Login action example
    login(web, email, password) {
      this.amOnPage(web);
      this.click('Đăng nhập');
      this.fillField('Email', email);
      this.fillField('Mật khẩu', password);
      this.click('Đăng nhập');
      this.waitForText('Đăng nhập thành công', 10);
    },

    // Add new action example
    searchProduct(productName) {
      this.fillField('Search', productName);
      this.click('Search Button');
      this.waitForText(productName, 10);
    }
  });
}
```

Available CodeceptJS methods in actions:
- `this.amOnPage(url)` - Navigate to a page
- `this.click(text/button)` - Click on element
- `this.fillField(field, value)` - Fill input field
- `this.waitForText(text, seconds)` - Wait for text to appear
- `this.see(text)` - Verify text is visible
- `this.seeElement(element)` - Verify element is visible

### Step 2: Create Test Scenarios

Create test files in the `tests` directory that use the actions defined in `steps_file.js`.

Example test file structure:
```javascript
Feature('Feature Name');

// Simple scenario using default values
Scenario('Login successfully', async ({ I }) => {
  I.login();
});

// Scenario with custom parameters
Scenario('Login with specific credentials', async ({ I }) => {
  I.login('https://example.com', 'test@email.com', 'password123');
});

// Scenario combining multiple actions
Scenario('Login and search product', async ({ I }) => {
  I.login();
  I.searchProduct('iPhone');
});
```

### Best Practices

1. Action Organization:
   - Keep related actions together in `steps_file.js`
   - Use meaningful names for actions
   - Add comments to explain complex actions
   - Use default parameters when possible

2. Test Structure:
   - Group related scenarios under the same Feature
   - Use descriptive scenario names
   - Keep scenarios focused and independent
   - Reuse actions from `steps_file.js` instead of repeating code

3. Error Handling:
   - Add appropriate wait times for elements
   - Include error checks in actions
   - Use try-catch blocks for critical operations

### Example: Complete Test Flow

1. First, add a new action in `steps_file.js`:
```javascript
module.exports = function() {
  return actor({
    checkoutProduct(productName) {
      this.click(productName);
      this.click('Add to Cart');
      this.click('Checkout');
      this.waitForText('Order Confirmation', 10);
    }
  });
}
```

2. Then use it in your test file:
```javascript
Feature('Shopping Flow');

Scenario('Complete purchase flow', async ({ I }) => {
  I.login();
  I.searchProduct('Helmet');
  I.checkoutProduct('Racing Helmet');
});
```

## Failed Tests

When a test fails, screenshots are automatically saved in the `output` directory with the format `[test_name].failed.png`.

## Failed Tests

When a test fails, screenshots are automatically saved in the `output` directory with the format `[test_name].failed.png`.

## Contributing

1. Create a new branch for your tests
2. Write and test your changes
3. Submit a pull request with a clear description of the changes

## Troubleshooting

If you encounter issues:

1. Check that all environment variables are set correctly
2. Ensure all dependencies are installed
3. Clear the `output` directory if it gets too large
4. Make sure the application under test is running and accessible

## Bonus
🌐 Điều hướng & URL
I.amOnPage('/login') → Mở trang /login (nối với baseURL trong config).

I.refreshPage() → Reload lại trang hiện tại.

I.wait(2) → Chờ 2 giây (ít dùng, nên ưu tiên waitFor...).

🖱️ Tương tác với phần tử
I.click('Đăng nhập') → Click vào nút/link có text “Đăng nhập”.

I.click('#submit') → Click vào phần tử theo CSS selector.

I.fillField('Email', 'test@example.com') → Nhập text vào input.

I.clearField('Email') → Xóa nội dung trong input.

I.selectOption('Country', 'Vietnam') → Chọn option trong dropdown.

I.checkOption('Tôi đồng ý') → Tick checkbox.

I.uncheckOption('Tôi đồng ý') → Bỏ tick checkbox.

👀 Kiểm tra nội dung
I.see('Welcome') → Kiểm tra có text “Welcome” trên trang.

I.dontSee('Error') → Kiểm tra KHÔNG có text “Error”.

I.seeElement('#profile') → Kiểm tra phần tử tồn tại.

I.dontSeeElement('.loading') → Kiểm tra phần tử không tồn tại.

⏳ Chờ đợi (wait)
I.waitForText('Welcome', 10) → Chờ tối đa 10s cho đến khi thấy text.

I.waitForElement('#profile', 5) → Chờ tối đa 5s cho đến khi phần tử xuất hiện.

I.waitForInvisible('.loading', 10) → Chờ phần tử biến mất.

🔄 Điều hướng nâng cao
I.goBack() → Quay lại trang trước.

I.goForward() → Tiến tới trang sau.

I.switchToNextTab() / I.switchToPreviousTab() → Chuyển tab trình duyệt.

📦 Lấy dữ liệu (grab)
const text = await I.grabTextFrom('#username') → Lấy text từ phần tử.

const val = await I.grabValueFrom('input[name=email]') → Lấy giá trị input.

const url = await I.grabCurrentUrl() → Lấy URL hiện tại.

🔐 Authentication
I.acceptPopup() → Chấp nhận alert/confirm.

I.cancelPopup() → Cancel alert/confirm.

I.seeInPopup('Bạn có chắc không?') → Kiểm tra nội dung popup.
