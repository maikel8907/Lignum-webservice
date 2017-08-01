$(document).ready(function() {
  var walletSection = $('section#wallet').css({ display: 'none' });
  var connectSection = $('section#connect');
  var wordSection = $('.popup.word-confirmation')
  var pinSection = $('.pin.popup');
  var recoverySection = $('#recovery-setup');
  var doneSection = $('.popup#done');

  $('a#wallet').click(function() {
    walletSection.css({ display: 'block' });
    connectSection.css({ display: 'none' });

    setTimeout(function() {
      walletSection.find('div#connected').css({ display: 'none' });
    }, 1000);

    walletSection.find('.btn').click(function() {
      $(this).parents('.popup').css({ display: 'none' });
    });
  });

  walletSection.find('.close-btn').click(function() {
    walletSection.css({ display: 'none' });
  });

  wordSection.find('.word-list li').click(function() {
    $(this).parents('.popup').css({ display: 'none' });
  });

  $('#word-confirmation').find('.word-list li').click(function() {
    setTimeout(function() {
      doneSection.css({ display: 'none' });
    }, 1000);
  });

  pinSection.find('.key').click(function() {
    $(this).parents('.virtual-keyboard').find('.value-container').append('<span class="item"></span>');
  });

  $('.popup#confirm-device-pin').find('.btn').click(function() {
    recoverySection.css({ display: 'none' });
    setTimeout(function() {
      recoverySection.css({ display: 'none' });
    }, 1000);
  });

});