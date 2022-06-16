// 初始化轮播图
var mySwiper = new Swiper('.swiper', {
    direction: 'horizontal', // 水平切换选项
    loop: true, // 循环模式选项
    grabCursor: true, // 鼠标移入变为小手
    createElements: true,//自动生成元素
    effect: 'coverflow',// 切换效果为3D
    slidesPerView: 3,
    centeredSlides: true,
    coverflowEffect: {
        rotate: 30,
        stretch: 10,
        depth: 60,
        modifier: 2,
        slideShadows: false
    },
    // 如果需要分页器
    pagination: {
        el: '.swiper-pagination',
        clickable: true, //点击分页器的指示点分页器会控制Swiper切换。
        // type:'custom'
    },

    // 如果需要前进后退按钮
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',

    },

    // 如果需要滚动条
    scrollbar: {
        el: '.swiper-scrollbar',
    },
})