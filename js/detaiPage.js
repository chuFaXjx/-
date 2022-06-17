
searchBooks()
detailPage()


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

// 渲染书籍详情页面
async function detailPage() {
    try {
        let {data:name} = await axios({
            method: 'get',
            url: 'http://localhost:3005/books',
            params: {
                name_like: $('#searchInput').val()
            }
        }) 
        
        console.log(name.data);

        let { data } = await axios({
            method: 'put',
            url: 'http://localhost:3005/books',
            params: {
                id: '',
                name: '',
                author: '',
                desc: '',
                coverImg:'',
            }
        })
    } catch (error) {
        console.log(error);
    }
}