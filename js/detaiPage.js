

searchBooks() // 搜索书名

window.onload = () => {
    //console.log(location.search.slice(4));
    let bookId = location.search.slice(4);
    detailPage(bookId) // 渲染书籍详情页面
}

// 搜索书名
function searchBooks() {
    $('#searchInput').keyup(async function () {
        $('.sanjiao').show()
        $('.searchLists').show();
        $('.close').show();
        try {
            let { data } = await axios({
                method: 'get',
                url: 'http://localhost:3005/books',
                params: {
                    name_like: $('#searchInput').val()
                }
            })
            data.data.forEach(function (item, idx) {
                $('.searchLists').html('')
                let li = $(`
                        <li class="searchList"><a href="detailPage.html?id=${item.id}">${item.name} 作者：${item.author}</a></li>
                    `)
                $('.searchLists').append(li)
            })
        } catch (e) {
            console.log(e);
        }
    })

    $('.close').click(function () {
        $('#searchInput').val('')
        $('.sanjiao').hide()
        $('.searchLists').hide();
        $('.close').hide();
    })
}

// 渲染书籍详情页面
async function detailPage(bookId) {
    try {
        let { data } = await axios({
            method: 'get',
            url: 'http://localhost:3005/books',
            params: {
                id: bookId
            }
        })
        data.data.forEach(function (item, idx) {
            $('#searchInput').val(item.name)
            $('#coverImg').attr('src', item.coverImg)
            $('.bookName').text(item.name)
            $('.Author').text(item.author)
            $('.bookDesc').text(item.desc)

            layui.use('rate', function () {
                //渲染
                layui.rate.render({
                    elem: '.score',
                    value: item.rate,
                    half: true,
                    text: true,
                    length: 10,
                    readonly: true,
                })
            });
        })
    } catch (error) {
        console.log(error);
    }
}