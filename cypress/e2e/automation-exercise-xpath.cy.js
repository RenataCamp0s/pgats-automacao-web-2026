import '@cypress/xpath'; 

describe('Automation Exercise', () => {
    it('Cadastrar um novo usuário com sucesso', () => {
        // Visit the Automation Exercise website
        cy.visit('https://automationexercise.com');

        // Click on the "Signup / Login" button
        cy.xpath('//a[@href="/login"]').click();

        // Fill in the signup form
        cy.xpath('//input[@data-qa="signup-name"]').type('Valter Smith');
        cy.xpath('//input[@data-qa="signup-email"]').type('valter.smith@example.com');

        // Click on the "Signup" button
        cy.xpath('//button[@data-qa="signup-button"]').click();

        // Select the title (Mr./Mrs.) radio button, date of birth, and other required fields
        cy.xpath('//input[@id="id_gender1"]').should('be.visible');
        cy.xpath('//input[@id="id_gender1"]').check();
        cy.xpath('//select[@data-qa="days"]').type('1');
        cy.xpath('//select[@data-qa="months"]').type('1');
        cy.xpath('//select[@data-qa="years"]').type('1990');
        cy.xpath('//input[@id="newsletter"]').check();
        cy.xpath('//input[@id="optin"]').check();


        // Fill in the account information form
        cy.xpath('//input[@data-qa="password"]').type('Password123');
        cy.xpath('//input[@data-qa="first_name"]').type('Valter');
        cy.xpath('//input[@data-qa="last_name"]').type('Smith');
        cy.xpath('//input[@data-qa="address"]').type('123 Main St');
        cy.xpath('//input[@data-qa="city"]').type('New York');
        cy.xpath('//select[@data-qa="country"]').select('United States');
        cy.xpath('//input[@data-qa="state"]').type('NY');
        cy.xpath('//input[@data-qa="zipcode"]').type('10001');
        cy.xpath('//input[@data-qa="mobile_number"]').type('+1234567890');

        // Click on the "Create Account" button
        cy.xpath('//button[@data-qa="create-account"]').click();

        // Verify that the account was created successfully
        cy.xpath('//h2[@data-qa="account-created"]').should('contain', 'Account Created!');

        // Click on the "Continue" button
        cy.xpath('//a[@data-qa="continue-button"]').click();

        // Verify that the user is logged in
        cy.xpath('//a[@href="/logout"]').should('be.visible');

        // Delete the account to clean up after the test
        cy.xpath('//a[@href="/delete_account"]').click();
        cy.xpath('//h2[@data-qa="account-deleted"]').should('contain', 'Account Deleted!');
        cy.xpath('//a[@data-qa="continue-button"]').click();

    });
    it('Login com email e senha válidos', () => {
        // Visit the Automation Exercise website
        cy.visit('https://automationexercise.com');

        // Click on the "Signup / Login" button
        cy.xpath('//a[@href="/login"]').click();

        // Fill in the login form with valid credentials
        cy.xpath('//input[@data-qa="login-email"]').type('william.smith@example.com');
        cy.xpath('//input[@data-qa="login-password"]').type('Password123');

        // Click on the "Login" button
        cy.xpath('//button[@data-qa="login-button"]').click();

        // Verify that the user is logged in
        cy.xpath('//a[@href="/logout"]').should('be.visible');
    });
    it('Login com email e senha inválidos', () => {
        // Visit the Automation Exercise website
        cy.visit('https://automationexercise.com');

        // Click on the "Signup / Login" button
        cy.xpath('//a[@href="/login"]').click();

        // Fill in the login form with invalid credentials
        cy.xpath('//input[@data-qa="login-email"]').type('invalid@example.com');
        cy.xpath('//input[@data-qa="login-password"]').type('InvalidPassword123');

        // Click on the "Login" button
        cy.xpath('//button[@data-qa="login-button"]').click();

        // Verify that the login failed
        cy.xpath('//p[@style="color: red;"]').should('contain', 'Your email or password is incorrect!');
    });
    it('Logout com sucesso', () => {
        // Visit the Automation Exercise website
        cy.visit('https://automationexercise.com');

        // Click on the "Signup / Login" button
        cy.xpath('//a[@href="/login"]').click();

        // Fill in the login form with valid credentials
        cy.xpath('//input[@data-qa="login-email"]').type('william.smith@example.com');
        cy.xpath('//input[@data-qa="login-password"]').type('Password123');

        // Click on the "Login" button
        cy.xpath('//button[@data-qa="login-button"]').click();

        // Click on the "Logout" button
        cy.xpath('//a[@href="/logout"]').click();

        // Verify that the user is logged out
        cy.xpath('//a[@href="/login"]').should('be.visible');
    });
    it('Cadastrar usuário com email já existente', () => {
        // Visit the Automation Exercise website
        cy.visit('https://automationexercise.com');

        // Click on the "Signup / Login" button
        cy.xpath('//a[@href="/login"]').click();

        // Fill in the signup form with an existing email
        cy.xpath('//input[@data-qa="signup-name"]').type('Existing User');
        cy.xpath('//input[@data-qa="signup-email"]').type('william.smith@example.com');

        // Click on the "Signup" button
        cy.xpath('//button[@data-qa="signup-button"]').click();

        // Verify that the signup failed
        cy.xpath('//p[@style="color: red;"]').should('contain', 'Email Address already exist!');
    });
});