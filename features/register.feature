@Register
Feature: Register into losestudiantes
    As an user I want to Register myself within losestudiantes website in order to rate teachers

Scenario Outline: Register failed with wrong email and password

  #Comment Given I go to losestudiantes home screen
    #Comment When I open the login screen
    #Comment And I register with <name> and <lastName> and <email> and <password>
    #Comment And I check my program
    #Comment And I accept terms
    #Comment And I try to register
    #Comment Then I expect to see <error>

    Examples:
      | name            | lastName |email                | password   | error|
      | usuario         | pruebas  |                     |            |Ingresa tu correo|
      | usuario         | pruebas  | notengo@notengo.com |            |Ingresa una contraseña|
      | usuario         | pruebas  |                     |    1234    |Ingresa tu correo|
      | usuario         | pruebas  | notengo@notengo.com |    1234    |La contraseña debe|

Scenario Outline: Register failed with no name or no lastName

  #Comment Given I go to losestudiantes home screen
    #Comment When I open the login screen
    #Comment And I register with <name> and <lastName> and <email> and <password>
    #Comment And I check my program
    #Comment And I accept terms
    #Comment And I try to register
    #Comment Then I expect to see empty value

    Examples:
      | name            | lastName |email                | password |
      |                 |          | notengo@notengo.com | 12345678 |
      | usuario         |          | notengo@notengo.com | 12345678 |
      | usuario         | pruebas  | notengo@notengo.com | 12345678 |
      |                 | pruebas  | notengo@notengo.com | 12345678 |

Scenario Outline: Register success

  Given I go to losestudiantes home screen
    When I open the login screen
    And I register with <name> and <lastName> and <email> and <password>
    And I check my program
    And I accept terms
    And I try to register
    Then I expect to see register <message>

    Examples:
      | name            | lastName |email                | password | message|
      | usuario         | pruebas  | fake2@fake.com      | 12345678 | Registro exitoso|
