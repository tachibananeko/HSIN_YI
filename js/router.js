function Router() {
    this.routes = {};
    this.currentUrl = '';
}

Router.prototype.route = function(path, callback) {
    this.routes[path] = callback || function() {};
    //给不同的hash设置不同的回调函数
};
Router.prototype.refresh = function() {
    // 路由清單
    let routerList = ['', 'home','about','service/consultancy','service/project','service/critical','service/connected','contact'];

    //获取到相应的hash值
    let index = routerList.indexOf(location.hash.slice(2))
    if (index == -1) {
        this.currentUrl = '/home'
        location.href = "#/home"
    } else {
        this.currentUrl = location.hash.slice(1) || '/home';
    }
    // this.currentUrl = location.hash.slice(1) || '/home'; 
    //如果存在hash值则获取到，否则设置hash值为/
    // console.log(this.currentUrl);
    if (this.currentUrl && this.currentUrl != '/') {
        this.routes[this.currentUrl](); //根据当前的hash值来调用相对应的回调函数
    }

};
Router.prototype.init = function() {
    window.addEventListener('load', this.refresh.bind(this), false);
    window.addEventListener('hashchange', this.refresh.bind(this), false);
}

//给window对象挂载属性
window.Router = new Router();
window.Router.init();

// 路由呼叫路徑
Router.route('/home', function() {
    mainInclude('tpl/home.html');
});
Router.route('/about', function() {
    mainInclude('tpl/about.html');
});


Router.route('/service/consultancy', function() {
    mainInclude('tpl/consultancy.html');
});
Router.route('/service/project', function() {
    mainInclude('tpl/project.html');
});
Router.route('/service/critical', function() {
    mainInclude('tpl/critical.html');
});
Router.route('/service/connected', function() {
    mainInclude('tpl/connected.html');
});



Router.route('/contact', function() {
    mainInclude('tpl/contact.html');
});


function mainInclude(src) {
    $.ajax({
        url: src,
        success: function(html) {
            $("#content").html(html);
        },
        // 發送前
        beforeSend: function() {},
        // 完成
        complete: function() {},
        error: function(error) {
            location.href = "#/home"
        }
    });
}

