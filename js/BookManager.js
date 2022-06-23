

searchBooks()// 搜索书名

booksShow() // 请求数据并渲染表格

sortUp() //书名根据id排正序 从小到大

sortDown() //书名根据id排倒序 从大到小

sortRateUp() // 根据评分排序  从小到大

sortRateDown() // 根据评分排序  从大到小

topScroll() // 点击返回顶部

sorter() // 分页器功能

// 保存当前是第几页
let currentPage = 1;

//保存当前当前页面展示几条内容
let pageSize = 5;

// 保存排序方式
let _sort = '';

// 保存正序倒序
let _order = 'asc';

// 保存请求回来的数据在全局里  在编辑删除中调用
let pageData = [];

// 搜索书名
function searchBooks() {
    $('#btn').click(async function () {
        if ($('#searchInput').val() !== '') {
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
                $('.searchLists').html('')
                data.data.forEach(function (item, idx) {
                    let li = $(`
                        <li class="searchList"><a href="detailPage.html?id=${item.id}">${item.name} 作者：${item.author}</a></li>
                    `)
                    $('.searchLists').append(li)
                })
            } catch (e) {
                console.log(e);
            }
        }
    })

    $('.close').click(function () {
        $('#searchInput').val('')
        $('.sanjiao').hide()
        $('.searchLists').hide();
        $('.close').hide();
    })
}

// 首次渲染表格
async function booksShow() {
    try {
        let { data } = await axios({
            method: 'get',
            url: 'http://localhost:3005/books'
        })
        $('.bookFrom tr:not(:first)').remove();
        readerTable(data.data);
    } catch (error) {
        console.log(error);
    }
}

// 给图片绑定点击事件 点击打开预览
$('.bookTop').on('click', 'img', async function () {
    let { data } = await getPage(currentPage, pageSize, _sort, _order);

    let imgIdx = $(this).parent().parent().index() - 1

    let imgArr = [];
    data.data.forEach(function (item, idx) {
        let arr = {
            src: item.coverImg,
            title: item.name
        }
        imgArr.push(arr)
    })
    // 定义选项
    var options = {  // optionName: 'option value'
        index: imgIdx,// 从第一张图片开始
        fixedModalSize: true, //设置照片查看器打开时的大小
        modalWidth: '80%',
        modalHeight: '80%',
        initMaximized: false,//模态大小将设置为图像大小或您使用 modalWidth 和 modalHeight 设置的大小
        initModalPos: { //手动设置模态位置
            top: '60px',
            left: '150px',
        },
        initAnimation: false,//如果为 false，则在插件初始化时不会有动画。
        i18n: {
            close: '关闭',
            minimize: '最小化',
            maximize: '最大化',
            prev: '上一张',
            next: '下一张',
            fullscreen: '全屏',
            actualSize: '实际尺寸',
        }
    }
    // 初始化插件
    var viewer = new PhotoViewer(imgArr, options);
})

//书名根据id排正序 从小到大
function sortUp() {
    $('.up').click(async () => {
        _order = 'asc';
        _sort = 'id';
        $('.up').addClass('active')
        $('.down').removeClass('active')
        let { data } = await getPage(currentPage, pageSize, _sort, _order)
        $('.bookFrom tr:not(:first)').remove()
        readerTable(data.data);
    })
}

//书名根据id排倒序 从大到小
function sortDown() {
    $('.down').click(async () => {
        _order = 'desc';
        _sort = 'id';
        $('.up').removeClass('active')
        $('.down').addClass('active')
        let { data } = await getPage(currentPage, pageSize, _sort, _order)
        $('.bookFrom tr:not(:first)').remove()
        readerTable(data.data);
    })
}

// 根据评分排序  从小到大
function sortRateUp() {
    $('.rateUp').click(async () => {
        _order = 'asc';
        _sort = 'rate';
        $('.rateDown').removeClass('active')
        $('.rateUp').addClass('active')
        let { data } = await getPage(currentPage, pageSize, _sort, _order)
        $('.bookFrom tr:not(:first)').remove()
        readerTable(data.data);
    })
}

// 根据评分排序  从大到小
function sortRateDown() {
    $('.rateDown').click(async () => {
        _order = 'desc';
        _sort = 'rate';
        $('.rateUp').removeClass('active')
        $('.rateDown').addClass('active')
        let { data } = await getPage(currentPage, pageSize, _sort, _order)
        $('.bookFrom tr:not(:first)').remove()
        readerTable(data.data);
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

// 编辑按钮绑定点击事件
$('.bookTop').on('click', '.editBtn', function () {
    // 拿到当前行的index
    let idx = $(this).parent().parent().index() - 1;
    // 后台返回的数据  根据索引拿到当前点击的数据
    let item = pageData[idx];
    layer.open({
        title: '编辑',
        content: `
                <div class="model-add">
                    <form>
                        <div class="form-group form-inline">
                            <label for="name">*书名：</label>
                            <input value=${item.name} type="text" class="form-control" id="shuName" placeholder="请输入书名">
                        </div>
                        <div class="form-group form-inline">
                            <label for="author">*封面图</label>
                            <input value=${item.coverImg} type="text" class="form-control" id="coverImg" placeholder="请输入封面地址">
                        </div>
                        <div class="form-group form-inline">
                            <label for="author">*作者</label>
                            <input value=${item.author} type="text" class="form-control" id="authorName" placeholder="请输入作者">
                        </div>
                        <div class="form-group form-inline">
                            <label for="rate">*评分</label>
                            <div class="test"></div>
                        </div>
                        <div class="form-group form-inline">
                            <label for="intro">*简介</label>
                            <textarea value=${item.desc}  class="form-control" name="" id="jianjie"  cols="90" row="150" placeholder="请输入简介"></textarea>
                        </div>
                    </form>
                </div>`});
    $('#jianjie').text(item.desc)

    let rateValue = 0;

    layui.use('rate', function () {
        //渲染
        layui.rate.render({
            elem: '.test',
            value: item.rate,
            half: true,
            text: true,
            length: 10,
            choose: function (value) {
                rateValue = value
            }
        })
    });

    $('.layui-layer-btn0').click(async function () {
        try {
            let { data } = await axios({
                method: 'PUT',
                url: `http://localhost:3005/books/${item.id}`,
                data: {
                    name: $("#shuName").val(),
                    author: $("#authorName").val(),
                    desc: $("#jianjie").val(),
                    rate: rateValue,
                    coverImg: item.coverImg,
                }
            })
            layer.msg('编辑成功', { icon: 1, time: 1000 });
            let res = getPage(currentPage, pageSize, _sort, _order)

            res.then(value => {
                $('.bookFrom tr:not(:first)').remove()
                readerTable(value.data.data)
            }, error => {
                console.log(error);
            })
        } catch (error) {
            console.log(error);
        }
    })
})


//删除按钮绑定点击事件
$('.bookTop').on('click', '.delBtn', function () {
    // 拿到当前行的index
    let idx = $(this).parent().parent().index() - 1;
    // 后台返回的数据  根据索引拿到当前点击的数据
    let item = pageData[idx];
    layer.open({
        title: '警告',
        content: `
                <span class="layui-icon layui-icon-notice jinggao"></span>
                <p class="isSure">您确定要删除${item.name}这本书吗？</p>
                `
    })
    $('.layui-layer-btn0').click(async function () {
        try {
            let { data } = await axios({
                method: 'DELETE',
                url: `http://localhost:3005/books/${item.id}`,
            })

            let res = getPage(currentPage, pageSize, _sort, _order)
            res.then(value => {
                $('.bookFrom tr:not(:first)').remove()
                readerTable(value.data.data)
                layer.msg('删除成功', { icon: 2, time: 1000 });
            }, error => {
                console.log(error);
            })
        } catch (error) {
            console.log(error);
        }
    })
})

// 分页器功能
function sorter() {
    layui.use('laypage', function () {
        var laypage = layui.laypage;
        let res = getPage(1, 5, '', '')
        res.then(value => {
            //执行一个laypage实例
            laypage.render({
                elem: 'test1',//注意，这里的 test1 是 ID，不用加 # 号
                count: value.headers['x-total-count'],//数据总数，从服务端得到
                layout: ['count', 'prev', 'page', 'next', 'limit', 'skip'],
                limit: 5, //每页显示的条数。laypage将会借助 count 和 limit 计算出分页数。
                limits: [5, 10, 20, 30, 40, 50, 100],
                hash: true,
                jump: async function (obj, first) {
                    let { data } = await getPage(obj.curr, obj.limit, _sort, _order)
                    $('.bookFrom tr:not(:first)').remove();
                    readerTable(data.data);

                    // 保存当前是第几页
                    currentPage = obj.curr;

                    //保存当前当前页面展示几条内容
                    pageSize = obj.limit;

                    //return currentPage, pageSize
                    //首次不执行
                    if (!first) {
                        //do something
                    }
                }
            });
        }, reason => {
            console.log(reason);
        })
    });
}

//封装分页请求函数
async function getPage(page, limit, sort, order) {
    try {
        let res = await axios({
            method: 'get',
            url: 'http://localhost:3005/books',
            params: {
                _page: page,
                _limit: limit,
                _sort: sort,
                _order: order
            }
        })
        pageData = res.data.data
        return res
    } catch (error) {
        console.log(error);
    }
}

// 渲染表格函数
function readerTable(data) {
    data.forEach(function (item, idx) {
        let tr = $(`
                <tr>
                    <td class="bookName">${item.name}</td>
                    <td class="coverImg"><img src="${item.coverImg}" alt=""></td>
                    <td class="bookAuthor">${item.author}</td>
                    <td class="bookDesc">${item.desc}</td>
                    <td class="rate"><div class="test${idx}"></div></td>
                    <td class="handle">
                        <span class="glyphicon glyphicon-paperclip"></span>
                        <a style="color:skyblue" href="detailPage.html?id=${item.id}">详情</a>
                        <span class="glyphicon glyphicon-edit "></span>
                        <button class="active editBtn">编辑</button>
                        <span class="glyphicon glyphicon-trash"></span>
                        <button class="delBtn" style="color:red">删除</button>
                    </td>
                </tr>`)

        $('.bookTop').append(tr)


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
    })
}

// 新增功能
$('#newAdd').click(async function () {
    layer.open({
        title: '编辑',
        content: `
        <div class="model-add">
            <form>
                <div class="form-group form-inline">
                    <label for="name">*书名</label>
                    <input type="text" class="form-control" id="shuName" placeholder="请输入书名">
                </div>
                <div class="form-group form-inline">
                    <label for="author">*封面图</label>
                    <input type="text" class="form-control" id="coverImg" placeholder="请输入封面地址">
                </div>
                <div class="form-group form-inline">
                    <label for="author">*作者</label>
                    <input type="text" class="form-control" id="authorName" placeholder="请输入作者">
                </div>
                <div class="form-group form-inline">
                    <label for="rate">*评分</label>
                    <div class="test"></div>
                </div>
                <div class="form-group form-inline">
                    <label for="intro">*简介</label>
                    <textarea  class="form-control" name="" id="jianjie"  cols="90" row="150" placeholder="请输入简介"></textarea>
                </div>
            </form>
        </div>
        `
    });

    // 保存评分值
    let rateValue = 0;

    layui.use('rate', function () {
        //渲染
        layui.rate.render({
            elem: '.test',
            value: 0,
            half: true,
            text: true,
            length: 10,
            choose: function (value) {
                rateValue = value
            }
        })
    });

    $('.layui-layer-btn0').click(async function () {
        if ($('#shuName').val() !== '' && $('#coverImg').val() !== '' && $('#authorName').val() !== '' && $('#jianjie').val() !== '') {
            try {
                let { data } = await axios({
                    method: 'post',
                    url: 'http://localhost:3005/books',
                    data: {
                        name: $('#shuName').val(),
                        author: $('#authorName').val(),
                        desc: $('#jianjie').val(),
                        coverImg: $('#coverImg').val(),
                        rate: rateValue,
                    }
                })
            } catch (error) {
                console.log(error);
            }
            layer.msg('新增书籍成功', { icon: 1, time: 1000 });
            sorter()
        } else {
            layer.msg('输入内容不能为空，请重新输入', { icon: 2, time: 1000 });
        }
    })
})

// 将一个sheet转成最终的excel文件的blob对象，然后利用URL.createObjectURL下载
function sheet2blob(sheet, sheetName) {
    sheetName = sheetName || 'sheet1';
    var workbook = {
        SheetNames: [sheetName],
        Sheets: {}
    };
    workbook.Sheets[sheetName] = sheet;
    // 生成excel的配置项
    var wopts = {
        bookType: 'xlsx', // 要生成的文件类型
        bookSST: false, // 是否生成Shared String Table，官方解释是，如果开启生成速度会下降，但在低版本IOS设备上有更好的兼容性
        type: 'binary'
    };
    var wbout = XLSX.write(workbook, wopts);
    var blob = new Blob([s2ab(wbout)], { type: "application/octet-stream" });
    // 字符串转ArrayBuffer
    function s2ab(s) {
        var buf = new ArrayBuffer(s.length);
        var view = new Uint8Array(buf);
        for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
        return buf;
    }
    return blob;
}

/**
* 通用的打开下载对话框方法，没有测试过具体兼容性
* @param url 下载地址，也可以是一个blob对象，必选
* @param saveName 保存文件名，可选
*/
function openDownloadDialog(url, saveName) {
    if (typeof url == 'object' && url instanceof Blob) {
        url = URL.createObjectURL(url); // 创建blob地址
    }
    var aLink = document.createElement('a');
    aLink.href = url;
    aLink.download = saveName || ''; // HTML5新增的属性，指定保存文件名，可以不要后缀，注意，file:///模式下不会生效
    var event;
    if (window.MouseEvent) event = new MouseEvent('click');
    else {
        event = document.createEvent('MouseEvents');
        event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    }
    aLink.dispatchEvent(event);
}

// 导出Excel表格功能
$('#export').click(async function () {
    let books = [['书名', '作者', '封面图', '简介', '评分']];

    let { data } = await getPage('', '', '', '')
    console.log(data);

    data.data.forEach(function (item, idx) {
        let arr = [item.name, item.author, item.coverImg, item.desc, item.rate]
        books.push(arr);
    })
    let sheet = XLSX.utils.aoa_to_sheet(books);
    openDownloadDialog(sheet2blob(sheet), '三味书屋.xlsx');
})

// 打印功能
$('.dayin').click(function () {
    printJS({
        printable: 'bookTop',
        type: 'html',
        // header: '三味书屋',
    })
})



