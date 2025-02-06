@serial
Feature: StackEdit.io - Редактор

  Scenario: Очищение поля ввода
    Given Я открываю редактор
    When Я очищаю поле ввода
    Then Элемент "inputField" должен быть пустым
    And Элемент "outputField" должен быть пустым    

  Scenario Outline: Применение стиля "<стиль>" к тексту
    When Я очищаю поле ввода
    And Я ввожу текст "ABC"
    And Я выделяю текст
    And Я применяю стиль "<стиль>"
    Then Текст "ABC" в поле вывода должен быть со стилем "<стиль>"

    Examples:
      | стиль       |
      | жирный      |
      | курсив      |
      | зачеркнутый |
      | цитата      |

  Scenario Outline: Проверка распознавания Markdown нотации "<стиль>"
    When Я очищаю поле ввода
    And Я ввожу текст "ABC" при помощи Markdown нотации "<стиль>"
    Then Текст "ABC" в поле вывода должен быть со стилем "<стиль>"

    Examples:
      | стиль       |
      | жирный      |
      | курсив      |
      | зачеркнутый |
      | цитата      |
  
  Scenario Outline: Добавление картинки
    When Я очищаю поле ввода
    And Я добавляю картинку с URL "<URL>"
    Then В поле вывода появляется картинка с URL "<URL>"

    Examples:
    | URL                                                                                            |
    | https://preview.redd.it/wy925k0hmvk51.png?auto=webp&s=82a042d28b9ac65e3f3daac30c7cc2dc6490c7eb |

  Scenario Outline: Добавление ссылки
    When Я очищаю поле ввода
    And Я добавляю ссылку с URL "<URL>"
    Then В поле вывода появляется ссылка с URL "<URL>"

    Examples:
    | URL                                                                                            |
    | https://ya.ru |
