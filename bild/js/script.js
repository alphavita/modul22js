'use strict';

$(function () {

  var tests = [{
    questions: 'Река',
    answers: ['Америка', 'Сахара', 'Дунай', 'Гималаи'],
    rightAnswer: [0, 0, 1, 0]
  }, {
    questions: 'Цветок',
    answers: ['кирпич', 'одуванчик', 'астра', 'аспирин'],
    rightAnswer: [0, 1, 1, 0]
  }, {
    questions: 'Рыба',
    answers: ['питбуль', 'молоко', 'карась', 'самолет'],
    rightAnswer: [0, 0, 1, 0]

  }, {
    questions: 'Дерево ',
    answers: ['дуб', 'сметана', 'хлопок', 'планшет'],
    rightAnswer: [1, 0, 0, 0]
  }];

  localStorage.setItem('test', JSON.stringify(tests));

  var test = localStorage.getItem('test');
  test = JSON.parse(test);

  var $html = $('#test').html();
  var $template = tmpl($html, {
    data: test
  });

  $('body').append($template);

  function CheckAnswers() {

    var $listanswers = 0;
    var counter = 0;

    for (var i = 0; i < test.length; i++) {

      var $userAnswes = $('.block_answer' + i + ' input:checkbox');
      var $userAnswestext = $('.block_answer' + i + ' p');

      for (var j = 0; j < test[i].rightAnswer.length; j++) {

        var $inputs = $userAnswes[j].checked;
        var $text = $userAnswestext[j];
        var $textinputs = $userAnswes[j];
        var $localAnswer = test[i].rightAnswer[j];

        if ($localAnswer) {
          $listanswers++;
        }
        if ($inputs) {

          if ($inputs == $localAnswer) {
            counter++;
          }
        }
      }
    }
    if ($listanswers == counter) {
      $('.notification').append('<h6>Тест сдан</h6>');
      $('.notification h6').css({
        color: 'green'
      });
      $('.meseg').css({
        backgroundColor: 'rgba(127,255,0,0.9)'
      });
      $('.repeat').css({
        display: 'non'
      });
    } else {
      $('.notification').append('<h6>Тест не пройден</h6>');
      $('.notification h6').css({
        color: '#aa520'
      });
      $('.meseg').css({
        backgroundColor: 'rgba(220,20,60,0.9)'
      });
    }
    $('.modal').fadeIn().animate(200);
    $('.meseg').fadeIn().animate();

    $('.notification').append('<p>\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u044B\u0445 \u043E\u0442\u0432\u0435\u0442\u043E\u0432: ' + counter + ' \u0438\u0437 ' + $listanswers + '</p>');
  }
  $('.button').on('click', CheckAnswers);
  $('.exit').on('click', function () {
    $('input:checkbox').removeAttr('checked');
    location.reload();
    $('.notification').html('');
    $('.modal').fadeOut();
  });
});