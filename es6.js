
$(function(){

const tests =[
{
  questions: 'Река',
  answers: ['Америка','Сахара','Дунай','Гималаи',],
    rightAnswer: [0, 0, 1, 0]
},
{
  questions: 'Цветок',
  answers: ['кирпич','одуванчик','астра','аспирин',],
    rightAnswer: [0, 1, 1, 0]
},
{
  questions: 'Рыба',
  answers: ['питбуль','молоко','карась','самолет'],
  rightAnswer: [0, 0, 1,0]

},
{
  questions: 'Дерево ',
  answers: ['дуб','сметана','хлопок','планшет'],
  rightAnswer: [1, 0, 0,0]
},
];

localStorage.setItem('test', JSON.stringify(tests));

let test =  localStorage.getItem('test');
    test = JSON.parse(test);


let $html = $('#test').html();
let $template = tmpl($html,{
    data: test
});


$('body').append($template);


function CheckAnswers(){

let $listanswers = 0;
let counter = 0;

for(let i = 0; i < test.length; i++){

   let  $userAnswes = $('.block_answer' +i+' input:checkbox');
   let  $userAnswestext = $('.block_answer' +i+' p');

        for (let j = 0; j <  test[i].rightAnswer.length; j++) {

          let $inputs = $userAnswes[j].checked;
          let $text = $userAnswestext[j];
          let $textinputs = $userAnswes[j];
          let $localAnswer = test[i].rightAnswer[j];

            if($localAnswer){
              $listanswers++
            }
           if($inputs){

           if (($inputs == $localAnswer)){
             counter++;
           }
       }
     }
}
  if($listanswers == counter ){
    $('.notification').append('<h6>Тест сдан</h6>');
    $('.notification h6').css({
      color:'green'
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
      color:'#aa520'
  });
    $('.meseg').css({
      backgroundColor: 'rgba(220,20,60,0.9)'
    });

  }
  $('.modal').fadeIn().animate(200);
  $('.meseg').fadeIn().animate();


  $('.notification').append(`<p>правильных ответов: ${counter} из ${$listanswers}</p>` );
}
$('.button').on('click',CheckAnswers);
$('.exit').on('click', function(){
   $('input:checkbox').removeAttr('checked');
   location.reload();
   $('.notification').html('');
   $('.modal').fadeOut();
 })

});