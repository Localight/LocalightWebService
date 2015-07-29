'use strict';

/**
 * @ngdoc service
 * @name angularLocalightApp.OccasionService
 * @description
 * # OccasionService
 * Service in the angularLocalightApp.
 */
angular.module('angularLocalightApp')
  .service('OccasionService', function(){
  var occasions = [
      {
        name: 'birthday',
        images: {
          normal: '../images/occasion-birthday-icon-wht.png',
          selected: '../images/occasion-birthday-icon-blk.png',
          iconId: "0"
        },
        alt: 'Birthday',
        text: 'Variety is the spice of life. So I’m giving you the gift of choice!'
      },
      {
        name: 'anniversary',
        images: {
          normal: '../images/occasion-anniversary-icon-wht.png',
          selected: '../images/occasion-anniversary-icon-blk.png',
          iconId: "1"
        },
        alt: 'Anniversary',
        text: 'You remind me of time itself for you are my Past, Future, and Forever. Happy Anniversary!'
      },
      {
        name: 'love',
        images: {
          normal: '../images/occasion-love-icon-wht.png',
          selected: '../images/occasion-love-icon-blk.png',
          iconId: "2"
        },
        alt: 'I Love You',
        text: 'I Iove you for all that you are, all you have been, and all you\'re yet to be.'
      },
      {
        name: 'getwell',
        images: {
          normal: '../images/occasion-getwell-icon-wht.png',
          selected: '../images/occasion-getwell-icon-blk.png',
          iconId: "3"
        },
        alt: 'Get Well',
        text: 'I look forward to your speedy recovery. Get well soon!'
      },
      {
        name: 'congrats',
        images: {
          normal: '../images/occasion-congrats-icon-wht.png',
          selected: '../images/occasion-congrats-icon-blk.png',
          iconId: "4"
        },
        alt: 'Congrats',
        text: 'Spread joy. Chase your wildest dreams. Congratulations!'
      },
      {
        name: 'wedding',
        images: {
          normal: '../images/occasion-wedding-icon-wht.png',
          selected: '../images/occasion-wedding-icon-blk.png',
          iconId: "5"
        },
        alt: 'Wedding',
        text: 'Falling in love is easy. Staying in love is AMAZING. Congrats on your marriage!'
      },
      {
        name: 'baby',
        images: {
          normal: '../images/occasion-baby-icon-wht.png',
          selected: '../images/occasion-baby-icon-blk.png',
          iconId: "6"
        },
        alt: 'Baby',
        text: 'Congratulations on the birth of your child!'
      },
      {
        name: 'sympathy',
        images: {
          normal: '../images/occasion-sympathy-icon-wht.png',
          selected: '../images/occasion-sympathy-icon-blk.png',
          iconId: "7"
        },
        alt: 'Sympathy',
        text: 'Our collective hearts are heavy with sympathy.'
      },
      {
        name: 'thankyou',
        images: {
          normal: '../images/occasion-thankyou-icon-wht.png',
          selected: '../images/occasion-thankyou-icon-blk.png',
          iconId: "8"
        },
        alt: 'Thank You',
        text: 'You’re the best! You deserve some retail therapy.'
      },
      {
        name: 'custom',
        images: {
          normal: '../images/occasion-custom-icon-wht.png',
          selected: '../images/occasion-custom-icon-blk.png',
          iconId: "9"
        },
        alt: 'Custom',
        text: 'If you want to be loved for who you are, just be yourself.'
      }
    ];
    return occasions;
 });
