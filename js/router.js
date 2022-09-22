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
    let routerList = ['', 'home','about','service/consultancy','service/project','service/critical','service/connected','protection/application','protection/origin','protection/dns','contact','privacy'];

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
    $('#topMenu li').removeClass('--on');
});
Router.route('/about', function() {
    mainInclude('tpl/about.html');
    $('#topMenu li').removeClass('--on');
    $('#toAbout').addClass('--on');
});


Router.route('/service/consultancy', function() {
    mainInclude('tpl/consultancy.html');
    chServiceMenu(0);
});
Router.route('/service/project', function() {
    mainInclude('tpl/project.html');
    chServiceMenu(1);
});
Router.route('/service/critical', function() {
    mainInclude('tpl/critical.html');
    chServiceMenu(2);
});
Router.route('/service/connected', function() {
    mainInclude('tpl/connected.html');
    chServiceMenu(3);
});
function chServiceMenu(num){
    $('#topMenu li').removeClass('--on');
    $('#toService').addClass('--on');
    $(`#toService li:eq(${num})`).addClass('--on');
}


Router.route('/protection/application', function() {
    mainInclude('tpl/application.html');
    chProtectionMenu(0);
});
Router.route('/protection/origin', function() {
    mainInclude('tpl/origin.html');
    chProtectionMenu(1);
});
Router.route('/protection/dns', function() {
    mainInclude('tpl/dns.html');
    chProtectionMenu(2);
});
function chProtectionMenu(num){
    $('#topMenu li').removeClass('--on');
    $('#toProtection').addClass('--on');
    $(`#toProtection li:eq(${num})`).addClass('--on');
}



Router.route('/contact', function() {
    mainInclude('tpl/contact.html');
    $('#topMenu li').removeClass('--on');
    $('#toContact').addClass('--on');
});

Router.route('/privacy', function() {
    mainInclude('tpl/privacy.html');
    $('#topMenu li').removeClass('--on');
});


function mainInclude(src) {
    $('#load').css('display','block');  
    $.ajax({
        url: src,
        success: function(html) {  
            $("#content").html(html);   
            window.scrollTo({ top: 0 });  
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


