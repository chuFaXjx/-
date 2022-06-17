
searchBooks()
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

layui.use('table', function () {
    let table = layui.table;

    table.render({
        elem: '#test',
        method:'get',
        url: 'http://localhost:3005/books',
        cellMinWidth: 100, //全局定义常规单元格的最小宽度
        page: true ,//开启分页
        cols: [[
            { field: 'id', width: 180, title: '书名', sort: true, unresize :false,}
            , { field: 'username', width: 100, unresize: false, title: '封面图' }
            , { field: 'sex', width: 100, unresize: false, title: '作者' }
            , { field: 'city', width: 300, unresize: false, title: '简介' }
            , { field: 'score', width: 300, unresize: false, title: '评分', sort: true }
            , { field: 'classify', width: 100, unresize: false, title: '操作' }
        ]]
    });
});