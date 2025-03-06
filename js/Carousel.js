/**
 * Created by admin on 2017/10/20.
 */
$(function () {/*底部轮播*/
    if($(window).width()>500){
        var mySwiper = new Swiper ('.swiper-container', {
            direction: 'horizontal',
            loop: true,
            speed:1000,
            autoplay: 3000,
            slidesPerView : 3,
            spaceBetween:30,
            // 如果需要前进后退按钮
            nextButton: '.swiper-button-next',
            prevButton: '.swiper-button-prev',

        })
    }else {
        var mySwiper = new Swiper ('.swiper-container', {
            direction: 'horizontal',
            loop: true,
            autoplay: 3000,
            speed:1000,
            slidesPerView : 1,
            // 如果需要前进后退按钮
            nextButton: '.swiper-button-next',
            prevButton: '.swiper-button-prev',

        })

    }


})





