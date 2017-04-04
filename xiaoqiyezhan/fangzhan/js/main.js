/**
 * Created by Administrator on 2016/10/12.
 */
require.config({
    baseUrl:'js',

    paths: {
        "carousel": "carousel",
        "carousel2": "carousel2",
        "jquery":'jquery'
    }
});
require(['jquery','carousel'],function($,carousel){
    var carousel_1 = new carousel.Carousel($('.carousel-1'));
});
require(['jquery','carousel2'],function($,carousel2){
    var carousel_2 = new carousel2.carousel2($('.carousel-2'));
});
require(['jquery','lazyload'],function($,lazyload){
    var lazy_1 = new lazyload.lazy($('body'));
});