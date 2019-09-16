var {defineSupportCode} = require('cucumber');
var {expect} = require('chai');

defineSupportCode(({Given, When, Then}) => {
  Given('I go to losestudiantes home screen', () => {
    browser.url('/');
    if(browser.isVisible('button=Cerrar')) {
      browser.click('button=Cerrar');
    }
  });

  When('I open the login screen', () => {
   browser.waitForVisible('button=Ingresar', 5000);
   setTimeout(function(){
       browser.click('button=Ingresar');
   }, 3000);
   browser.waitForVisible('.cajaSignUp', 5000);
 });
 When('I fill a wrong email and password', () => {
     var cajaLogIn = browser.element('.cajaLogIn');

     var mailInput = cajaLogIn.element('input[name="correo"]');
     mailInput.click();
     mailInput.keys('wrongemail@example.com');

     var passwordInput = cajaLogIn.element('input[name="password"]');
     passwordInput.click();
     passwordInput.keys('123467891')
   });

 When('I try to login', () => {
    var cajaLogIn = browser.element('.cajaLogIn');
    cajaLogIn.element('button=Ingresar').click()
  });

  When('I try to register', () => {
    browser.waitForVisible('.cajaSignUp', 5000);
    var cajaSignUp = browser.element('.cajaSignUp');
    cajaSignUp.element('button=Registrarse').click()
  });

  When('I check my program', () => {
    browser.waitForVisible('.cajaSignUp', 5000);
    var cajaSignUp = browser.element('.cajaSignUp');
    var universityInput = cajaSignUp.element('select[name="idUniversidad"]');
    var programCheckbox=cajaSignUp.element('input[type=checkbox]');
    console.log("Valor del checkbox: ",programCheckbox);
    programCheckbox.click();

      var program=cajaSignUp.element('select[name="idPrograma"]');
      program.waitForVisible(2000);
      program.click();
      program.waitForVisible(2000);
      //program.selectByVisibleText("Maestría en Ingeniería de Software"));
      program.selectByIndex(3);
      program.waitForValue(5000);
      expect(program.getValue()).to.eq(3);
  });

  When('I accept terms', () => {
    var cajaSignUp = browser.element('.cajaSignUp');
    var acceptCheckbox=cajaSignUp.element('input[name=acepta]');
    setTimeout(function(){
        acceptCheckbox.click();
        if(acceptCheckbox.getValue()==true){
          console.log("checkbox check true");
        }else{
          acceptCheckbox.click();
          console.log("checkbox check false");
        }
    },3000);
  });

  Then('I expect to not be able to login', () => {
    browser.waitForVisible('.aviso.alert.alert-danger', 5000);
  });

  When(/^I fill with (.*) and (.*)$/ , (email, password) => {
    browser.waitForVisible('.cajaLogIn', 5000);
    var cajaLogIn = browser.element('.cajaLogIn');
    var mailInput = cajaLogIn.element('input[name="correo"]');
    mailInput.click();
    mailInput.keys(email);

    var passwordInput = cajaLogIn.element('input[name="password"]');
    passwordInput.click();
    passwordInput.keys(password)
  });

  When(/^I register with (.*) and (.*) and (.*) and (.*)$/, (name, lastName, email, password) => {
      browser.waitForVisible('.cajaSignUp', 5000);

      //browser.waitForVisible('.cajaLogIn', 5000);
      if(browser.isVisible('.cajaSignUp')){
        console.log("Entra a llenar form");
        var cajaSignUp = browser.element('.cajaSignUp');
        var nameInput = cajaSignUp.element('input[name="nombre"]');
        var lastNameInput = cajaSignUp.element('input[name="apellido"]');
        var mailInput = cajaSignUp.element('input[name="correo"]');
        nameInput.click();
        nameInput.keys(name);
        lastNameInput.click();
        lastNameInput.keys(lastName);
        mailInput.click();
        mailInput.keys(email);
        var passwordInput = cajaSignUp.element('input[name="password"]');
        passwordInput.click();
        passwordInput.keys(password)
      }
    });


  Then('I expect to see {string}', error => {
      browser.waitForVisible('.aviso.alert.alert-danger', 5000);
      var alertText = browser.element('.aviso.alert.alert-danger').getText();
      expect(alertText).to.include(error);
  });

  Then('I dont expect to see Ingresar', () => {
      browser.url('/');
      if(!browser.isVisible('button=Ingresar')) {
        console.log("Login success");
        var cuenta=browser.element('button[id=cuenta]');
        cuenta.click();
        browser.element("a=Salir").click();
      }

  });
  Then('I expect to see empty value', () => {
    browser.waitForVisible('.cajaSignUp', 5000);
    var cajaSignUp = browser.element('.cajaSignUp');
    var nameInput = cajaSignUp.element('input[name="nombre"]');
    var lastNameInput = cajaSignUp.element('input[name="apellido"]');
    if( nameInput.getValue()=="" || lastNameInput.getValue()==""){
      console.log("Input validation success");
    }else{
      console.log("Input validation fails");
    }
  });

  Then('I expect to see register {string}', message => {
      browser.waitForVisible('.sweet-alert', 5000);
      var successText = browser.element('.sweet-alert');
      console.log("Mensaje Registro: ",(successText.element('.h2').getText()));
      expect(successText.element('.h2').getText()).to.include(message);
  });

});
