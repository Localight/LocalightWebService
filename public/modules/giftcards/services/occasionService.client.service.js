//Ocasion service for populating
'use strict';

// Occasion service used to communicate to Giftcard Controller, just for
// populating the occasions in the front end.
angular.module('giftcards').factory('OccasionService', function(){
  var occasions = [
      {
        name: 'birthday',
        images: {
          normal: 'modules/giftcards/img/occasion-birthday-icon-wht.png',
          selected: 'modules/giftcards/img/occasion-birthday-icon-blk.png'
        },
        alt: 'Birthday',
        text: 'Variety is the spice of life. So I’m giving you the gift of choice!'
      },
      {
        name: 'anniversary',
        images: {
          normal: 'modules/giftcards/img/occasion-anniversary-icon-wht.png',
          selected: 'modules/giftcards/img/occasion-anniversary-icon-blk.png'
        },
        alt: 'Anniversary',
        text: 'You remind me of time itself for you are my Past, Future, and Forever. Happy Anniversary!'
      },
      {
        name: 'love',
        images: {
          normal: 'modules/giftcards/img/occasion-love-icon-wht.png',
          selected: 'modules/giftcards/img/occasion-love-icon-blk.png'
        },
        alt: 'I Love You',
        text: 'I Iove you for all that you are, all you have been, and all you\'re yet to be.'
      },
      {
        name: 'getwell',
        images: {
          normal: 'modules/giftcards/img/occasion-getwell-icon-wht.png',
          selected: 'modules/giftcards/img/occasion-getwell-icon-blk.png'
        },
        alt: 'Get Well',
        text: 'I look forward to your speedy recovery. Get well soon!'
      },
      {
        name: 'congrats',
        images: {
          normal: 'modules/giftcards/img/occasion-congrats-icon-wht.png',
          selected: 'modules/giftcards/img/occasion-congrats-icon-blk.png'
        },
        alt: 'Congrats',
        text: 'Spread joy. Chase your wildest dreams. Congratulations!'
      },
      {
        name: 'wedding',
        images: {
          normal: 'modules/giftcards/img/occasion-wedding-icon-wht.png',
          selected: 'modules/giftcards/img/occasion-wedding-icon-blk.png'
        },
        alt: 'Wedding',
        text: 'Falling in love is easy. Staying in love is AMAZING. Congrats on your marriage!'
      },
      {
        name: 'baby',
        images: {
          normal: 'modules/giftcards/img/occasion-baby-icon-wht.png',
          selected: 'modules/giftcards/img/occasion-baby-icon-blk.png'
        },
        alt: 'Baby',
        text: 'Congratulations on the birth of your child!'
      },
      {
        name: 'sympathy',
        images: {
          normal: 'modules/giftcards/img/occasion-sympathy-icon-wht.png',
          selected: 'modules/giftcards/img/occasion-sympathy-icon-blk.png'
        },
        alt: 'Sympathy',
        text: 'Our collective hearts are heavy with sympathy.'
      },
      {
        name: 'thankyou',
        images: {
          normal: 'modules/giftcards/img/occasion-thankyou-icon-wht.png',
          selected: 'modules/giftcards/img/occasion-thankyou-icon-blk.png'
        },
        alt: 'Thank You',
        text: 'You’re the best! You deserve some retail therapy.'
      },
      {
        name: 'custom',
        images: {
          normal: 'modules/giftcards/img/occasion-custom-icon-wht.png',
          selected: 'modules/giftcards/img/occasion-custom-icon-blk.png'
        },
        alt: 'Custom',
        text: 'If you want to be loved for who you are, just be yourself.'
      }
    ];
    return occasions;
 });
