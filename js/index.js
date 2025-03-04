/**
 * Created by admin on 2017/10/18.
 */
$(() => {
    /*手机端*/
    FastClick.attach(document.body);//解决300ms延迟
    if ($(window).width() < 500) {
        $('.menu-click').on('click', function () {
            if ($('.header-mobil').width() > 0) {
                $('.header-mobil').width(0)
            } else {
                $('.header-mobil').width(160)
            }
        }
        )
        $(document).on('click', function (e) {
            if ($('.header-mobil').width() > 0) {
                $('.header-mobil').width(0)
            }
        })

    }


    //图片懒加载
    // console.log('.........',$('.lazyImg').eq(0).offset().top,$(document).scrollTop(),$(window).height());
    $('.lazyImg').each(function (i, item) {
        if ($(item).offset().top < $(document).scrollTop() + $(window).height() + 70) {//首屏加载
            $(item).attr('src', $(item).attr('trueSrc'))
        } else {//非首屏
            clearTimeout(time);
            var time = setTimeout(function () {
                $(item).attr('src', $(item).attr('trueSrc'))
            }, 2000)
        }
    })

    /*动画*/

    $('.one').addClass('animated fadeInRight');
    setTimeout(function () {
        $('.two').addClass('animated fadeInRight');
    }, 1000);
    setTimeout(function () {
        $('.three').addClass('animated fadeInRight');
    }, 2000);


    /*导航*/
    var scroll = function () {

        if ($(window).width() > 500) {
            $('.header').css('zIndex', 40);
            if ($(window).scrollTop() == 0) {
                $('.header').css('zIndex', 20);
            }
        }
        $('.lazyImg').each(function (i, item) {
            if (!$(item).attr('src')) {
                if ($(item).offset().top < $(document).scrollTop() + $(window).height() + 70) {
                    $(item).attr('src', $(item).attr('trueSrc'))
                }
            }

        })

        $('.nav li').removeClass('name');
        let top = $(window).scrollTop()
        if ($(window).width() > 500) {
            if (top >= 0 && top < 600) {
                $('.nav li').eq(1).addClass('name');
            } else if (top >= 600 && top < 1000) {

                $('.nav li').eq(2).addClass('name');
                //$('#twoPage .pageRight').addClass('animated fadeInUp')
            } else if (top >= 1000 && top < 1700) {
                //top >= 1230 && top < 1700
                $('.nav li').eq(3).addClass('name');
                /*加动画*/
                /*  if ($(window).width() > 1200) {
                      $('#fivePage .after').addClass('animated fadeIn');
                  } else {
                      $('#fivePage .after').css({opacity: 1});
                  }*/


            } else if (top >= 1700 && top < 2300) {
                //top>= 1830 && top < 2300
                $('.nav li').eq(4).addClass('name');


                /* if ($(window).width() > 1200) {
                     $('#threePage .pageRight').addClass('move');
                     $('#threePage .front').addClass('animated fadeInDown').css('opacity', 1);
                     setTimeout(() => {
                         $('#threePage .after').addClass('animated bounceIn')
                     }, 900)
                 } else {
                     $('#threePage .pageRight').css('opacity', 1);
                     $('#threePage .front').css('opacity', 1);
                     $('#threePage .after').css('opacity', 1);
                 }*/


            } else if (top >= 2300 && top < 2900) {
                //top >= 2430 && top < 2900)
                //联系我们
                $('.nav li').eq(5).addClass('name');
                /* if ($(window).width() > 1200) {
                     $('#fourPage .front').addClass('animated fadeInDown').css('opacity', 1);
                     setTimeout(() => {
                         $('#fourPage .after').addClass('animated bounceIn')
                     }, 900)

                 } else {
                     $('#fourPage .front').css('opacity', 1);
                 }*/


            }
        } else {
            console.log(top)
            if (top >= 0 && top < 400) {
                $('.header-mobil li').eq(0).addClass('name');

            } else if (top >= 400 && top < 980) {
                $('.header-mobil li').eq(1).addClass('name');
                //$('#twoPage .pageRight').addClass('animated fadeInUp')
            } else if (top >= 980 && top < 1580) {
                //top >= 1230 && top < 1700
                $('.header-mobil li').eq(2).addClass('name');
                /*加动画*/

            } else if (top >= 1580 && top < 2125) {
                //top>= 1830 && top < 2300
                $('.header-mobil li').eq(3).addClass('name');

            } else if (top >= 2125 && top < 2900) {

                //联系我们
                $('.header-mobil li').eq(4).addClass('name');



            }
        }

    }
    scroll();

    $(window).on('scroll', scroll);


    var scroll1 = function () {

        $('.nav li').removeClass('name');
        $(this).addClass('name');
        if ($(window).width() < 500) {

            if ($('.nav li')[1] == this) {
                $(window).scrollTop(0);
            } else if ($('.nav li')[2] == this) {
                $(window).scrollTop(424);
            } else if ($('.nav li')[3] == this) {
                $(window).scrollTop(1030);
            } else if ($('.nav li')[4] == this) {
                $(window).scrollTop(1620);
            } else if ($('.nav li')[5] == this) {
                $(window).scrollTop(2129);
            }
            $('.header-mobil').width(0)
        } else {
            if ($('.nav li')[1] == this) {
                $(window).scrollTop(0);
            } else if ($('.nav li')[2] == this) {
                $(window).scrollTop(700);
            } else if ($('.nav li')[3] == this) {
                $(window).scrollTop(1300);
            } else if ($('.nav li')[4] == this) {
                $(window).scrollTop(1900);
            } else if ($('.nav li')[5] == this) {
                $(window).scrollTop(2800);
            }
        }


    }


    $('.nav li:not(".logo")').on('click', scroll1);
    /*轮播图*/
    /* $('#dg-container').gallery({
         autoplay: true,
         interval: 3000
     });*/

    $('.newclick').on('click', () => {
        $(window).scrollTop(1900);
    })


});
