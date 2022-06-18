


searchBooks()// 搜索书名

booksShow() // 请求数据并渲染表格

sortUp() //书名根据id排正序 从小到大

sortDown() //书名根据id排倒序 从大到小

sortRateUp() // 根据评分排序  从小到大

sortRateDown() // 根据评分排序  从大到小

topScroll() // 点击返回顶部

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
                // $('.searchLists').html('')
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

// 请求数据并渲染表格
async function booksShow() {
    try {
        let { data } = await axios({
            method: 'get',
            url: 'http://localhost:3005/books'
        })
        show(data);
    } catch (error) {
        console.log(error);
    }
}

//书名根据id排正序 从小到大
function sortUp() {
    $('.up').click(async () => {
        try {
            let { data } = await axios({
                method: 'get',
                url: 'http://localhost:3005/books',
                params: {
                    _sort: 'id',
                    _order: 'asc',
                }
            })
            $('.bookFrom tr:not(:first)').remove()
            show(data);
        } catch (error) {
            console.log(error);
        }
    })
}

//书名根据id排倒序 从大到小
function sortDown() {
    $('.down').click(async () => {
        try {
            let { data } = await axios({
                method: 'get',
                url: 'http://localhost:3005/books',
                params: {
                    _sort: 'id',
                    _order: 'desc',
                }
            })
            $('.bookFrom tr:not(:first)').remove()
            show(data);
        } catch (error) {
            console.log(error);
        }
    })
}

// 根据评分排序  从小到大
function sortRateUp() {
    $('.rateUp').click(async () => {
        try {
            let { data } = await axios({
                method: 'get',
                url: 'http://localhost:3005/books',
                params: {
                    _sort: 'rate',
                    _order: 'asc',
                }
            })
            $('.bookFrom tr:not(:first)').remove()
            show(data);
        } catch (error) {
            console.log(error);
        }
    })
}

// 根据评分排序  从大到小
function sortRateDown() {
    $('.rateDown').click(async () => {
        try {
            let { data } = await axios({
                method: 'get',
                url: 'http://localhost:3005/books',
                params: {
                    _sort: 'rate',
                    _order: 'desc',
                }
            })
            $('.bookFrom tr:not(:first)').remove()
            show(data);
        } catch (error) {
            console.log(error);
        }
    })
}

// 点击返回顶部
function topScroll() {
    $(document).ready(function () {
        $(window).scroll(function () {
            if ($(document).scrollTop() <= 0) {
                $("#topScroll").hide();
            }
            if ($(document).scrollTop() >= $(window).height()) {
                $("#topScroll").show();
                $("#topScroll").click(function () {
                    // 设置滚动行为改为平滑的滚动
                    window.scrollTo({
                        top: 0,
                        behavior: "smooth",
                    });
                });
            }
        });
    });
}

// 渲染表格函数
function show(data) {
    data.data.forEach(function (item, idx) {
        let tr = $(`
                <tr>
                    <td class="bookName">${item.name}</td>
                    <td class="coverImg"><img src="${item.coverImg}" alt=""></td>
                    <td class="bookAuthor">${item.author}</td>
                    <td class="bookDesc">${item.desc}</td>
                    <td class="rate"><div class="test${idx}"></div></td>
                    <td class="handle">
                        <a href="detailPage.html?id=${item.id}"><span class="glyphicon glyphicon-paperclip"></span> 详情</a>
                        <a href="#"><span class="glyphicon glyphicon-edit"></span> 编辑</a>
                        <a href="#"><span class="glyphicon glyphicon-trash"></span> 删除</a>
                    </td>
                </tr>`)

        layui.use('rate', function () {
            //渲染
            layui.rate.render({
                elem: '.test' + idx,
                value: item.rate,
                half: true,
                text: true,
                length: 10,
                readonly: true,
            })
        });
        $('.bookTop').append(tr)
    })
}

// 