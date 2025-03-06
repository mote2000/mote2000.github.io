/**
 * Created by admin on 2017/10/20.
 */
/*导航*/
$(function () {
    FastClick.attach(document.body);//解决300ms延迟
    $('.menu-click').on('click',function () {
            if($('.header-mobil').width()>0){
                $('.header-mobil').width(0)
            }else {
                $('.header-mobil').width(160)
            }
        }
    )
    if($(window).width()>500){
        $(window).on('scroll',function () {
            $('.header').css('zIndex',40);
            if($(window).scrollTop()==0){
                $('.header').css('zIndex',20);
            }
        });

        /*底部轮播*/

        var mySwiper = new Swiper ('.swiper-container', {
            direction: 'horizontal',
            loop: true,
            autoplay: 2000,
            speed:1000,
            slidesPerView : 4,
            spaceBetween : 20,
            // 如果需要前进后退按钮
            nextButton: '.swiper-button-next',
            prevButton: '.swiper-button-prev',

        })
    }else {
        $(document).on('click', function (e) {
            if ($('.header-mobil').width() > 0) {
                $('.header-mobil').width(0)
            }
        })
        var mySwiper = new Swiper ('.swiper-container', {
            direction: 'horizontal',
            loop: true,
            autoplay: 2000,
            speed:1000,
            slidesPerView : 1,
            // 如果需要前进后退按钮
            nextButton: '.swiper-button-next',
            prevButton: '.swiper-button-prev',

        })
    }




})
