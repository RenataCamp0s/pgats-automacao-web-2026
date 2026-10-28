describe('Automation Exercise', () => {
    it('Cadastrar um novo usuário com sucesso', () => {
        const email = `juan.smith.${Date.now()}@example.com`;

        // Visit the Automation Exercise website
        cy.visit('https://automationexercise.com');

        // Click on the "Signup / Login" button
        cy.get('a[href*=login]').click();

        // Fill in the signup form
        cy.get('input[data-qa="signup-name"]').type('Juan Smith');
        cy.get('input[data-qa="signup-email"]').type(email);

        // Click on the "Signup" button
        cy.get('button[data-qa="signup-button"]').click();

        // Select the title (Mr./Mrs.) radio button, date of birth, and other required fields
        cy.get('#id_gender1').should('be.visible');
        cy.get('#id_gender1').check();
        cy.get('select[data-qa="days"]').type('1');
        cy.get('select[data-qa="months"]').type('1');
        cy.get('select[data-qa="years"]').type('1990');
        cy.get('input[id="newsletter"]').check();
        cy.get('input[id="optin"]').check();


        // Fill in the account information form
        cy.get('input[data-qa="password"]').type('Password123');
        cy.get('input[data-qa="first_name"]').type('Juan');
        cy.get('input[data-qa="last_name"]').type('Smith');
        cy.get('input[data-qa="address"]').type('123 Main St');
        cy.get('input[data-qa="city"]').type('New York');
        cy.get('select[data-qa="country"]').select('United States');
        cy.get('input[data-qa="state"]').type('NY');
        cy.get('input[data-qa="zipcode"]').type('10001');
        cy.get('input[data-qa="mobile_number"]').type('+1234567890');

        // Click on the "Create Account" button
        cy.get('button[data-qa="create-account"]').click();

        // Verify that the account was created successfully
        cy.get('h2[data-qa="account-created"]').should('contain', 'Account Created!');

        // Click on the "Continue" button
        cy.get('a[data-qa="continue-button"]').click();

        // Verify that the user is logged in
        cy.get('a[href*=logout]').should('be.visible');

        // Delete the account to clean up after the test
        cy.get('a[href*=delete_account]').click();
        cy.get('h2[data-qa="account-deleted"]').should('contain', 'Account Deleted!');
        cy.get('a[data-qa="continue-button"]').click();

    });
    it('Login com email e senha válidos', () => {
        // Visit the Automation Exercise website
        cy.visit('https://automationexercise.com');

        // Click on the "Signup / Login" button
        cy.get('a[href*=login]').click();

        // Fill in the login form with valid credentials
        cy.get('input[data-qa="login-email"]').type('william.smith@example.com');
        cy.get('input[data-qa="login-password"]').type('Password123');

        // Click on the "Login" button
        cy.get('button[data-qa="login-button"]').click();

        // Verify that the user is logged in
        cy.get('a[href*=logout]').should('be.visible');
    });
    it('Login com email e senha inválidos', () => {
        // Visit the Automation Exercise website
        cy.visit('https://automationexercise.com');

        // Click on the "Signup / Login" button
        cy.get('a[href*=login]').click();

        // Fill in the login form with invalid credentials
        cy.get('input[data-qa="login-email"]').type('invalid@example.com');
        cy.get('input[data-qa="login-password"]').type('InvalidPassword123');

        // Click on the "Login" button
        cy.get('button[data-qa="login-button"]').click();

        // Verify that the login failed
        cy.get('p[style*="color: red"]').should('contain', 'Your email or password is incorrect!');
    });
    it('Logout com sucesso', () => {
        // Visit the Automation Exercise website
        cy.visit('https://automationexercise.com');

        // Click on the "Signup / Login" button
        cy.get('a[href*=login]').click();

        // Fill in the login form with valid credentials
        cy.get('input[data-qa="login-email"]').type('william.smith@example.com');
        cy.get('input[data-qa="login-password"]').type('Password123');

        // Click on the "Login" button
        cy.get('button[data-qa="login-button"]').click();

        // Click on the "Logout" button
        cy.get('a[href*=logout]').click();

        // Verify that the user is logged out
        cy.get('a[href*=login]').should('be.visible');
    });
    it('Cadastrar usuário com email já existente', () => {
        // Visit the Automation Exercise website
        cy.visit('https://automationexercise.com');

        // Click on the "Signup / Login" button
        cy.get('a[href*=login]').click();

        // Fill in the signup form with an existing email
        cy.get('input[data-qa="signup-name"]').type('Existing User');
        cy.get('input[data-qa="signup-email"]').type('william.smith@example.com');

        // Click on the "Signup" button
        cy.get('button[data-qa="signup-button"]').click();

        // Verify that the signup failed
        cy.get('p[style*="color: red"]').should('contain', 'Email Address already exist!');
    });
});