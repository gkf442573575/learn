
import '../css/index.scss';

import app from '../lib/app';

import $ from 'jquery';

window.onload = function(){
    console.log(1);
    console.log(new Date());
    
    console.log('app',app.id);
    
    $('.logo').addClass('logomain');
}