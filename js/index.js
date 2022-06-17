// 初始化轮播图
var swiper = new Swiper(".mySwiper", {
    slidesPerView: 3,
    spaceBetween: 30,
    grabCursor: true, // 鼠标移入变为小手
    effect: 'coverflow',// 切换效果为3D
    autoplay: true,// 自动播放
    loop: true,
    centeredSlides: true,
    coverflowEffect: {
        rotate: 30,
        stretch: 10,
        depth: 60,
        modifier: 2,
        slideShadows: false
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});


searchBooks()
slideshow()
topShow()

// 搜索书名
function searchBooks() {
    $('.btn').click(async function () {
        $('.searchLists').css('display', 'block')
        try {
            let { data } = await axios({
                method: 'get',
                url: 'http://localhost:3005/books',
                params: {
                    name_like: $('#searchInput').val()
                }
            })
            data.data.forEach(function (item, idx) {
                let li = $(`
                        <li class="searchList"><a href="#">${item.name} 作者：${item.author}</a></li>
                    `)
                $('.searchLists').append(li)
            })
        } catch (e) {
            console.log(e);
        }
    })
}

// 渲染轮播图
async function slideshow() {
    try {
        let { data } = await axios({
            metod: 'get',
            url: 'http://localhost:3005/books'
        })
        console.log(data.data);
        data.data.forEach(function (item, idx) {
            let div = $(`<div class="swiper-slide" id="eachSlide"></div>`)
            let img = $(`<img src="${item.coverImg}" alt="" id="slide""></img>`)
            $(div).append(img)
            $('#slideShow').append(div)
        })
    } catch (error) {
        console.log(error);
    }
}

// 渲染排行榜
async function topShow() {
    try {
        let { data } = await axios({
            method: 'get',
            url: 'http://localhost:3005/books',
            params: {
                _sort: 'rate',
                _order: 'desc',
                _start: '0',
                _limit: '5',
            }
        })
        data.data.forEach(function (item, idx) {
            let img = $(`<img src="${item.coverImg}" alt="">`)
            $('.topBox').append(img)
        })
    } catch (error) {
        console.log(error);
    }
}