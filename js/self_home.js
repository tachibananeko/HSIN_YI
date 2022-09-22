$(window).ready(function() {
    // 頂部輪播
    $("#nivoslider").nivoSlider({
        effect: "random",
        slices: 15,
        boxCols: 8,
        boxRows: 4,
        animSpeed: 800,
        pauseTime: 4000,
        startSlide: 0,
        directionNav: false,
        controlNav: false,
        controlNavThumbs: false,
        pauseOnHover: false,
        manualAdvance: false
    });

    // 伺服器(servicest)輪播
    $('#servicesCarouse').owlCarousel({     
        nav: false,
        dots:true,
        loop: true,
        responsive: {
            0: {
                items: 1,
                margin: 32
            },
            599: {
                items: 2,
                margin: 32
            },
            996: {
                items: 3,
                margin: 32
            },
            1024: {
                items: 3,
                margin: 32
            },
            1180: {
                items: 4,
                margin: 64
            }
        }
    })

    let coorX,coorY;
    $('#servicesCarouse').mousedown(function(e){
        coorX = event.clientX + document.body.scrollLeft;
        coorY = event.clientY + document.body.scrollTop;      
    })

    $('.serviceHref').mouseup(function(e){
        let nowX = event.clientX + document.body.scrollLeft;
        let nowY = event.clientY + document.body.scrollTop; 
        if(nowX == coorX && nowY == coorY){
            $('#toService,#toProtection').removeClass('--active');
            location = $(this).attr('data-href');
            location.reload();
        }   
    })
 
    // 客戶(client)輪播
    $('#clientCarousel').owlCarousel({
        nav: false,
        dots:false,
        loop: true,
        items: 1
    })

});

// 客戶(client)輪播箭頭控制
$('#client_prev').click(function () {
    $("#clientCarousel").trigger('prev.owl.carousel')  
})
$('#client_next').click(function () {
    $("#clientCarousel").trigger('next.owl.carousel')  
})
