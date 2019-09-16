var {defineSupportCode} = require('cucumber');
var {expect} = require('chai');

defineSupportCode(({Given, When, Then}) => {
  Given('I go to losestudiantes home screen', () => {
    browser.url('/');
    if($('button=Cerrar').isDisplayed()) {
      $('button=Cerrar').click();
    }
  });
  When('I open the login screen', () => {
      $('button=Ingresar').waitForExist(5000);
     $('button=Ingresar').waitForDisplayed(5000);
     $('button=Ingresar').click();
  });
  /*When('I fill a wrong email and password', () => {
      var cajaLogIn = $('.cajaLogIn');
      var mailInput = cajaLogIn.$('input[name="correo"]');
      mailInput.click();
      mailInput.setValue('wrongemail@example.com');​
      var passwordInput = cajaLogIn.$('input[name="password"]');
      passwordInput.click();
      passwordInput.setValue('123467891');
  });*/
  When('I try to login', () => {
    var cajaLogIn = $('.cajaLogIn');
    cajaLogIn.$('button=Ingresar').click();
  });
  When('I try to register', () => {
      var cajaSignUp = $('.cajaSignUp');
      cajaSignUp.$('button=Registrarse').click()
  });
  When('I check my program', () => {
      var cajaSignUp = $('.cajaSignUp');
      var universityInput = cajaSignUp.$('select[name="idUniversidad"]');
      var programCheckbox=cajaSignUp.$('input[type=checkbox]');
      console.log("Valor del checkbox: ",programCheckbox);
      programCheckbox.click();
      var program=cajaSignUp.$('select[name="idPrograma"]');
      program.waitForDisplayed(2000);
      program.click();
      program.waitForDisplayed(2000);
      console.log("programHTML: ",program.getHTML());
      console.log("programValue: ",program.getValue());
      program.selectByAttribute('value', "16");
      console.log("programValueNext: ",program.getValue());
      expect(program.getValue()).to.eq("16");
  });
  When('I accept terms', () => {
      var cajaSignUp = $('.cajaSignUp');
      var acceptCheckbox=cajaSignUp.$('input[name=acepta]');
      acceptCheckbox.click();
  });
  Then('I expect to not be able to login', () => {
    var aviso = $('.aviso.alert.alert-danger').waitForDisplayed(5000);
  });
  When(/^I fill with (.*) and (.*)$/ , (email, password) => {
      var cajaLogIn = $('.cajaLogIn');
      var mailInput = cajaLogIn.$('input[name="correo"]');
      mailInput.click();
      mailInput.keys(email);

      var passwordInput = cajaLogIn.$('input[name="password"]');
      passwordInput.click();
      passwordInput.keys(password)
  });
  When(/^I register with (.*) and (.*) and (.*) and (.*)$/, (name, lastName, email, password) => {
        var cajaSignUp = $('.cajaSignUp');

        //browser.waitForVisible('.cajaLogIn', 5000);
        if(cajaSignUp.isDisplayed()){
          console.log("Entra a llenar form");
          //var cajaSignUp = $('.cajaSignUp');
          var nameInput = cajaSignUp.$('input[name="nombre"]');
          var lastNameInput = cajaSignUp.$('input[name="apellido"]');
          var mailInput = cajaSignUp.$('input[name="correo"]');
          nameInput.click();
          nameInput.keys(name);
          lastNameInput.click();
          lastNameInput.keys(lastName);
          mailInput.click();
          mailInput.keys(email);
          var passwordInput = cajaSignUp.$('input[name="password"]');
          passwordInput.click();
          passwordInput.keys(password);
        }
  });


  Then('I expect to see {string}', error => {
        var aviso=$('.aviso.alert.alert-danger');
        aviso.waitForExist(5000);
        aviso.waitForDisplayed(5000);
        var alertText = aviso.getText();
        expect(alertText).to.include(error);
  });

  Then('I dont expect to see Ingresar', () => {
        browser.url('/');
        if(!$('button=Ingresar').isDisplayed()) {
          console.log("Login success");
          var cuenta=$('button[id=cuenta]');
          cuenta.click();
          browser.element("a=Salir").click();
        }
  });

  Then('I expect to login', () => {
    var cuenta=$('#cuenta').waitForDisplayed(5000);
    expect($('#cuenta').isDisplayed()).to.be.true;
  });

});
