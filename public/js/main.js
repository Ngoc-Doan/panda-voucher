/*price range*/

if ($.fn.slider) {
    $('#sl2').slider();
}

var RGBChange = function () {
    $('#RGB').css('background', 'rgb(' + r.getValue() + ',' + g.getValue() + ',' + b.getValue() + ')')
};

/*scroll to top*/

// Thêm sản phẩm vào danh sách ưu thích
function addProductIntoFavorite(element) {
    const user = element.dataset.user
    const product = element.dataset.product

    const query = {
        user,
        voucher: product
    }

    fetch('./api/favorites', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(query)
    }).then(res => res.text())
    .then(data => {
        data = JSON.parse(data)
        if (data.status) {
            $('.messsageAlertPage #message-alert-show .content').html(data.message)
            $('.messsageAlertPage #message-alert-show').fadeIn();

            setTimeout(() => {
                $('.messsageAlertPage #message-alert-show').fadeOut();
            },3000)
        }
        else {
            $('.messsageAlertPage #message-alert-show .content').html(data.error)
            $('.messsageAlertPage #message-alert-show').fadeIn();

            setTimeout(() => {
                $('.messsageAlertPage #message-alert-show').fadeOut();
            },3000)
        }
    }).catch(e => {
        $('.messsageAlertPage #message-alert-show .content').html(e.message)
        $('.messsageAlertPage #message-alert-show').fadeIn();

        setTimeout(() => {
            $('.messsageAlertPage #message-alert-show').fadeOut();
        },3000)
    })
}

// update receive check for purchase of user
function updateReceivePurchase(element) {
    const id = element.dataset.buy
    console.log(id)
    fetch('./api/buys/receive', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({id})
    }).then(res => res.text())
    .then(data => {
        data = JSON.parse(data)
        if (data.status) {
            var date = new Date(data.Buy.receive.date)
            $('.paymentDetailPage .order-status').html(`
            <div class="order-status-false">
            KHÁCH HÀNG ĐÃ NHẬN HÀNG vào ${moment(date).format('HH:mm')} ngày ${moment(date).format('DD/MM/YYYY')}
            </div>
            `)
            $('.messsageAlertPage #message-alert-show .content').html(data.message)
            $('.messsageAlertPage #message-alert-show').fadeIn();

            $(".paymentDetailPage #mi-modal").modal('hide');
            $('body').removeClass('modal-open');
            $('.modal-backdrop').remove();
            setTimeout(() => {
                $('.messsageAlertPage #message-alert-show').fadeOut();
            },3000)
        }
        else {
            $('.messsageAlertPage #message-alert-show .content').html(data.error)
            $('.messsageAlertPage #message-alert-show').fadeIn();

            setTimeout(() => {
                $('.messsageAlertPage #message-alert-show').fadeOut();
            },3000)
        }
    }).catch(e => {
        $('.messsageAlertPage #message-alert-show .content').html(e.message)
        $('.messsageAlertPage #message-alert-show').fadeIn();

        setTimeout(() => {
            $('.messsageAlertPage #message-alert-show').fadeOut();
        },3000)
    })
}

function getLinkHrefPrice(element) {
    const range = $('.left-sidebar .price-range #amount_range').val()
    element.href = `./search?range=${range}`
}

function getLinkSearch(element) {
    const keyword = $('#header .header-bottom .search_box .keyword_search').val()
    console.log(keyword)
    element.href = `./search?keyword=${keyword}`
}

// pagination - detail product

function paginationDetailProduct(element) {
    $('.detailPage .review-data').html(`
    <div class="display-loader-center">
        <div class="loader-center">
            <div class="loader"></div>
        </div>
    </div>
    `)
    var pages = document.querySelector('.pagination').dataset.pages
    var page = element.dataset.page
    var voucher = document.querySelector('.detailPage .get-data-review').dataset.voucher
    for (var i = 1; i <= pages; i++) {
        if (i != page) {
            $(`.pagination .page-${i}`).removeClass('active')
        }
    }
    $(`.pagination .page-${page}`).addClass('active')

    fetch(`./api/reviews/${page}/${voucher}`, {
        method: 'GET'
    }).then(res => res.text())
    .then(data => {
        data = JSON.parse(data)
        if (data.status) {
            var tempString = ""
            data.review.forEach(r => {
                var tempStar = ""
                for (var i = 1;i <= 5; i++) {
                    if (i <= r.star) {
                        tempStar += `<span class="fa fa-star checked-star" style="margin-right:3px"></span>`
                    }
                    else {
                        tempStar += `<span class="fa fa-star" style="margin-right:3px"></span>`
                    }
                }
                var date = new Date(r.date)
                var time = moment(date).format('HH:mm')
                tempString += `
                <hr>
                <div style="margin-top: 20px;">
                    <ul>
                        <li><a href=""><i class="fa fa-user"></i>${r.name}</a></li>
                        <li><a href=""><i class="fa fa-clock-o"></i>${time}</a></li>
                        <li><a href=""><i class="fa fa-calendar-o"></i>${date.toLocaleDateString('en-GB')}</a></li>
                    </ul>
                    <p style="text-align:justify;">${r.review}</p>

                    ${tempStar}
                </div>
                `
            });
            $('.detailPage .review-data').html(tempString)

            $('.messsageAlertPage #message-alert-show .content').html(data.message)
            $('.messsageAlertPage #message-alert-show').fadeIn();
    
            setTimeout(() => {
                $('.messsageAlertPage #message-alert-show').fadeOut();
            },1000)
        }
        else {
            $('.messsageAlertPage #message-alert-show .content').html(data.error)
            $('.messsageAlertPage #message-alert-show').fadeIn();
    
            setTimeout(() => {
                $('.messsageAlertPage #message-alert-show').fadeOut();
            },3000)
        }
    }).catch(e => {
        $('.messsageAlertPage #message-alert-show .content').html(e.message)
        $('.messsageAlertPage #message-alert-show').fadeIn();

        setTimeout(() => {
            $('.messsageAlertPage #message-alert-show').fadeOut();
        },3000)
    })
}

// pagination - index

function paginationIndex(element) {
    $('.indexPage .features_items .pagination-data').html(`
        <div class="display-loader-center">
            <div class="loader-center">
                <div class="loader"></div>
            </div>
        </div>`
    )
    var pages = document.querySelector('.pagination').dataset.pages
    var page = element.dataset.page
    var user = element.dataset.user
    // console.log(user)
    // console.log(page)
    // console.log(pages)
    for (var i = 1; i <= pages; i++) {
        if (i != page) {
            $(`.pagination .page-${i}`).removeClass('active')
        }
    }
    $(`.pagination .page-${page}`).addClass('active')

    // $('.indexPage .features_items .pagination-data').html("")
    fetch(`./api/vouchers/${page}`, {
        method: 'GET'
    }).then(res => res.text())
    .then(data => {
        data = JSON.parse(data)
        if (data.status) {
            var tempString = ""
            data.vouchers.forEach(v => {
                if (user != undefined || user != "") {
                    var temp = `
                    <a class="btn btn-default add-to-cart add-to-cart-show-hover-main" data-user="${user}" data-voucher="${v._id}"><i class="fa fa-shopping-cart"></i>Thêm vào giỏ hàng</a>
                    `
                    var tempFavorite = `
                    <li style="cursor: pointer;" onclick="addProductIntoFavorite(this)" data-user="${user}" data-product="${v._id}"><a><i class="fa fa-plus-square"></i>Ưa thích</a></li>
                    `
                }
                else {
                    var temp = `
                    <a class="btn btn-default add-to-cart add-to-cart-show-hover-main" data-user="" data-voucher="${v._id}"><i class="fa fa-shopping-cart"></i>Thêm vào giỏ hàng</a>
                    `
                    var tempFavorite = `
                    <li style="cursor: pointer;" onclick="addProductIntoFavorite(this)" data-user="" data-product="${v._id}"><a><i class="fa fa-plus-square"></i>Ưa thích</a></li>
                    `
                }
                tempString += `
                <div class="col-sm-4">
                    <div class="product-image-wrapper">
                        <div class="single-products">
                            <div class="productinfo text-center">
                                <img src="${v.image[0]}" alt="" width="200px" height="220px"/>
                                <h2>${v.price.toLocaleString()}đ </h2>
                                <p style="height: 80px;"><i>${v.name}</i></p>
                                <a class="btn btn-default add-to-cart"><i class="fa fa-shopping-cart"></i>Thêm vào giỏ hàng</a>
                            </div>
                            <a href="/detail?id=${v._id}">
                                <div class="product-overlay">
                                    <div class="overlay-content">
                                        <h2>${v.price.toLocaleString()}đ</h2>
                                        <p style="height: 80px;"><i>${v.name}</i></p>
                                        ${temp}
                                    </div>
                                </div>
                            </a>
                        </div>
                        <div class="choose">
                            <ul class="nav nav-pills nav-justified">
                                ${tempFavorite}
                                <li><a href="#"><i class="fa fa-plus-square"></i>So sánh</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                `
            })
            $('.indexPage .features_items .pagination-data').html(tempString)

            $('.messsageAlertPage #message-alert-show .content').html(data.message)
            $('.messsageAlertPage #message-alert-show').fadeIn();
    
            setTimeout(() => {
                $('.messsageAlertPage #message-alert-show').fadeOut();
            },3000)
        }
        else {
            $('.messsageAlertPage #message-alert-show .content').html(data.error)
            $('.messsageAlertPage #message-alert-show').fadeIn();
    
            setTimeout(() => {
                $('.messsageAlertPage #message-alert-show').fadeOut();
            },3000)
        }
    }).catch(e => {
        $('.messsageAlertPage #message-alert-show .content').html(e.message)
        $('.messsageAlertPage #message-alert-show').fadeIn();

        setTimeout(() => {
            $('.messsageAlertPage #message-alert-show').fadeOut();
        },3000)
    })
}

// Giảm số lượng sản phẩm - cart
function subQuantityItemCart(element) {
    const amount = -1
    const user = document.querySelector(".cartPage").dataset.user
    const product = element.dataset.product
    if (user !== "" && product !== "" && user && product) {
        const query = {
            amount,
            user,
            product
        }

        fetch('./api/carts/quantity', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(query)
        })
        .then(res => res.text())
        .then(data => {
            data = JSON.parse(data)
            if (data.status) {
                data.Cart.products.forEach(p => {
                    if (p._id == product) {
                        $(`.cartPage #cart_items .table-condensed .cart_quantity${product} .cart_quantity_input`).val(p.amount)
                        $(`.cartPage #cart_items .table-condensed .cart_total_price${product}`).html(`${(p.amount*p.voucher.price).toLocaleString()}đ`)
                    }
                });
                $('.cartPage #do_action .total_area .total_price').html(`${data.Cart.totalPrice.toLocaleString()}đ`)
            }
            else {
                $('.messsageAlertPage #message-alert-show .content').html(data.error)
                $('.messsageAlertPage #message-alert-show').fadeIn();
        
                setTimeout(() => {
                    $('.messsageAlertPage #message-alert-show').fadeOut();
                },3000)
            }
        }).catch(e => {
            $('.messsageAlertPage #message-alert-show .content').html(e.message)
            $('.messsageAlertPage #message-alert-show').fadeIn();
    
            setTimeout(() => {
                $('.messsageAlertPage #message-alert-show').fadeOut();
            },3000)
        })
    }
    else if (!product || product == "") {
        // $('.messsageAlertPage #message-alert-show .main-title').html("Thông báo")
        $('.messsageAlertPage #message-alert-show .content').html("Xảy ra lỗi, vui lòng refresh lại")
        $('.messsageAlertPage #message-alert-show').fadeIn();

        setTimeout(() => {
            $('.messsageAlertPage #message-alert-show').fadeOut();
        },3000)
    }
    else if (!user || user == "") {
        $('.messsageAlertPage #message-alert-show .content').html("Vui lòng đăng nhập")
        $('.messsageAlertPage #message-alert-show').fadeIn();

        setTimeout(() => {
            $('.messsageAlertPage #message-alert-show').fadeOut();
        },3000)
    }
}

// Thêm số lượng sản phẩm - cart
function addQuantityItemCart(element) {
    const amount = 1
    const user = document.querySelector(".cartPage").dataset.user
    const product = element.dataset.product
    if (user !== "" && product !== "" && user && product) {
        const query = {
            amount,
            user,
            product
        }

        fetch('./api/carts/quantity', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(query)
        })
        .then(res => res.text())
        .then(data => {
            data = JSON.parse(data)
            if (data.status) {
                data.Cart.products.forEach(p => {
                    if (p._id == product) {
                        $(`.cartPage #cart_items .table-condensed .cart_quantity${product} .cart_quantity_input`).val(p.amount)
                        $(`.cartPage #cart_items .table-condensed .cart_total_price${product}`).html(`${(p.amount*p.voucher.price).toLocaleString()}đ`)
                    }
                });
                $('.cartPage #do_action .total_area .total_price').html(`${data.Cart.totalPrice.toLocaleString()}đ`)
            }
            else {
                $('.messsageAlertPage #message-alert-show .content').html(data.error)
                $('.messsageAlertPage #message-alert-show').fadeIn();
        
                setTimeout(() => {
                    $('.messsageAlertPage #message-alert-show').fadeOut();
                },3000)
            }
        }).catch(e => {
            $('.messsageAlertPage #message-alert-show .content').html(e.message)
            $('.messsageAlertPage #message-alert-show').fadeIn();
    
            setTimeout(() => {
                $('.messsageAlertPage #message-alert-show').fadeOut();
            },3000)
        })
    }
    else if (!product || product == "") {
        // $('.messsageAlertPage #message-alert-show .main-title').html("Thông báo")
        $('.messsageAlertPage #message-alert-show .content').html("Xảy ra lỗi, vui lòng refresh lại")
        $('.messsageAlertPage #message-alert-show').fadeIn();

        setTimeout(() => {
            $('.messsageAlertPage #message-alert-show').fadeOut();
        },3000)
    }
    else if (!user || user == "") {
        $('.messsageAlertPage #message-alert-show .content').html("Vui lòng đăng nhập")
        $('.messsageAlertPage #message-alert-show').fadeIn();

        setTimeout(() => {
            $('.messsageAlertPage #message-alert-show').fadeOut();
        },3000)
    }
}

// Xoá 1 sản phẩm ra giỏ hàng - ajax - đồng thời cập nhật tổng giá
function deleteItemProductCart(element) {
    const user = document.querySelector(".cartPage").dataset.user
    const product = element.dataset.product

    if (user !== "" && product !== "" && user && product) {
        query = {
            user,
            product
        }
        
        fetch('./api/carts', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(query)
        })
        .then(res => res.text())
        .then(data => {
            data = JSON.parse(data)
            if (data.status) {
                $(`.cartPage #cart_items .cart_info .table-condensed .${product}`).remove()
                $('.cartPage #do_action .total_area .total_price').html(`${data.Cart.totalPrice.toLocaleString()}đ`)
                $('.cartPage #do_action .total_area #check-out-profile').attr('data-length',`${data.Cart.products.length}`)
            }
            else {
                $('.messsageAlertPage #message-alert-show .content').html(data.error)
                $('.messsageAlertPage #message-alert-show').fadeIn();
        
                setTimeout(() => {
                    $('.messsageAlertPage #message-alert-show').fadeOut();
                },3000)
            }
        }).catch(e => {
            $('.messsageAlertPage #message-alert-show .content').html(e.message)
            $('.messsageAlertPage #message-alert-show').fadeIn();
    
            setTimeout(() => {
                $('.messsageAlertPage #message-alert-show').fadeOut();
            },3000)
        })
    }
    else if (!product || product == "") {
        // $('.messsageAlertPage #message-alert-show .main-title').html("Thông báo")
        $('.messsageAlertPage #message-alert-show .content').html("Xảy ra lỗi, vui lòng refresh lại")
        $('.messsageAlertPage #message-alert-show').fadeIn();

        setTimeout(() => {
            $('.messsageAlertPage #message-alert-show').fadeOut();
        },3000)
    }
    else if (!user || user == "") {
        $('.messsageAlertPage #message-alert-show .content').html("Vui lòng đăng nhập")
        $('.messsageAlertPage #message-alert-show').fadeIn();

        setTimeout(() => {
            $('.messsageAlertPage #message-alert-show').fadeOut();
        },3000)
    }

}

// UPLOAD IMAGE
function readURL(input) {
    if (input.files && input.files[0]) {
  
      var reader = new FileReader();
  
      reader.onload = function(e) {
        $('.image-upload-wrap').hide();
  
        $('.file-upload-image').attr('src', e.target.result);
        // base 64 image encoder
        // console.log(e.target.result)
        $('.file-upload-content').show();
  
        $('.image-title').html(input.files[0].name);
      };
  
      reader.readAsDataURL(input.files[0]);
  
    } else {
      removeUpload();
    }
  }
  
function removeUpload() {
    $('.file-upload-input').replaceWith($('.file-upload-input').clone());
    $('.file-upload-content').hide();
    $('.image-upload-wrap').show();
    $('.loginPage .file-upload-image').attr('src', "undefined")
    // gán lại giá trị null cho file ảnh được upload
    $('.file-upload-input').val(null)
}
$('.image-upload-wrap').bind('dragover', function () {
    $('.image-upload-wrap').addClass('image-dropping');
});
$('.image-upload-wrap').bind('dragleave', function () {
    $('.image-upload-wrap').removeClass('image-dropping');
});

$(document).ready(function () {
    $(function () {
        $.scrollUp({
            scrollName: 'scrollUp', // Element ID
            scrollDistance: 300, // Distance from top/bottom before showing element (px)
            scrollFrom: 'top', // 'top' or 'bottom'
            scrollSpeed: 300, // Speed back to top (ms)
            easingType: 'linear', // Scroll to top easing (see http://easings.net/)
            animation: 'fade', // Fade, slide, none
            animationSpeed: 200, // Animation in speed (ms)
            scrollTrigger: false, // Set a custom triggering element. Can be an HTML string or jQuery object
            //scrollTarget: false, // Set a custom target element for scrolling to the top
            scrollText: '<i class="fa fa-angle-up"></i>', // Text for element, can contain HTML
            scrollTitle: false, // Set a custom <a> title if required.
            scrollImg: false, // Set true to use image
            activeOverlay: false, // Set CSS color to display scrollUp active point, e.g '#00FFFF'
            zIndex: 2147483647 // Z-Index for the overlay
        });
    });

    // hiện modal huỷ đơn hàng

    $('.paymentDetailPage .cancel-purchase-order').click(e => {
        $(".paymentDetailPage #mi-modal").modal('show');
    })

    $(".paymentDetailPage #mi-modal #modal-btn-no").click(e => {
        $(".paymentDetailPage #mi-modal").modal('hide');
    })

    $(".paymentDetailPage #mi-modal #modal-btn-yes").click(e => {
        const id = e.target.dataset.id
        console.log(id)
        let query = {
            id
        }
        fetch('./api/buys/cancel', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(query)
        }).then(res => res.text())
        .then(data => {
            data = JSON.parse(data)
            if (data.status) {
                var date = new Date(data.Buy.cancel.date)
                $('.paymentDetailPage .order-status').html(`
                <div class="order-status-false">
                    Đơn hàng đã bị huỷ vào ${moment(date).format('HH:mm')} ngày ${moment(date).format('DD/MM/YYYY')}
                </div>
                `)
                $('.messsageAlertPage #message-alert-show .content').html(data.message)
                $('.messsageAlertPage #message-alert-show').fadeIn();
    
                $(".paymentDetailPage #mi-modal").modal('hide');
                $('body').removeClass('modal-open');
                $('.modal-backdrop').remove();
                setTimeout(() => {
                    $('.messsageAlertPage #message-alert-show').fadeOut();
                },3000)
            }
            else {
                $('.messsageAlertPage #message-alert-show .content').html(data.error)
                $('.messsageAlertPage #message-alert-show').fadeIn();
    
                setTimeout(() => {
                    $('.messsageAlertPage #message-alert-show').fadeOut();
                },3000)
            }
        })
        .catch(e => {
            $('.messsageAlertPage #message-alert-show .content').html(e.message)
            $('.messsageAlertPage #message-alert-show').fadeIn();

            setTimeout(() => {
                $('.messsageAlertPage #message-alert-show').fadeOut();
            },3000)
        })
    })

    // Đăng nhập
    $('.loginPage #login-button').click(e => {
        e.preventDefault()
        const [username, password] = $("#login_form").serializeArray();
        // $.post("/login",, function( data ) {
        //     if(!data.error){
        //         location.reload();
        //     }else{
        //         console.log(data.error)

        //     }
            
        // });
        fetch("/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username: username.value, password: password.value})
        })
        .then(res => res.text())
        .then(data => {
            data = JSON.parse(data)
            if (!data.error) {
                location.reload()
            }
            else {
                $('.loginPage .show-error-message-signup').html("")
                if (data.status) {
                    $('.loginPage .show-error-message-signup').html(data.message)
                }
                else {
                    $('.loginPage .show-error-message-signup').html(data.error)
                }
    
                $('.loginPage .show-error-message-signup').fadeIn(500)
    
                setTimeout(() => {
                    $('.loginPage .show-error-message-signup').fadeOut(1000)
                },1500)
            }
        }).catch(e => console.log(e))
    })
    // Đăng ký
    $('.loginPage #register').click(e => {
        $('.loginPage .div-loader').show()
        var [name,username,email,password,re_password] = $(".loginPage #signup_form").serializeArray();
        var img = document.querySelector('.loginPage .file-upload-image').getAttribute('src')
        // lấy ảnh ra
        var image = $('.file-upload-input').prop('files')[0]
        // console.log(image)
        const user = {
            name: name.value,
            username: username.value,
            email: email.value,
            img: img,
            password: password.value,
            re_password: re_password.value
        }
        // console.log(user.img)
        // var form_data = new FormData()
        // form_data.append('name',name.value)
        // form_data.append('username',username.value)
        // form_data.append('email',email.value)
        // form_data.append('img',img)
        // form_data.append('password',password.value)
        // form_data.append('re_password',re_password.value)
        // console.log(form_data.get('img'))

        fetch('/login/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(res => res.text())
        .then(data => {
            data = JSON.parse(data)
            $('.loginPage .show-error-message-signup').html("")
            if (data.status) {
                $('.loginPage .show-error-message-signup').html(data.message)
                $('.loginPage #name').val("")
                $('.loginPage #username').val("")
                $('.loginPage #email').val("")
                $('.loginPage #password').val("")
                $('.loginPage #re_password').val("")
                $('.loginPage .file-upload .remove-image').trigger('click')
            }
            else {
                $('.loginPage .show-error-message-signup').html(data.error)
            }
            $('.loginPage .div-loader').hide()

            $('.loginPage .show-error-message-signup').fadeIn(500)

            setTimeout(() => {
                $('.loginPage .show-error-message-signup').fadeOut(1000)
            },1500)
        }).catch(e => {
            console.log(e)
        })
    })

    $('.profilePage .btn-edit-profile').click(e => {
        $('.profilePage .edit-profile-form').show()
        $('.profilePage .profile-show').hide()
    })

    $('.profilePage .btn-cancel-edit').click(e => {
        $('.profilePage .edit-profile-form').hide()
        $('.profilePage .profile-show').show()
    })
    // Chỉnh sửa thông tin người dùng
    $('.profilePage .btn-update-edit').click(e => {
        const id = $(`.profilePage .btn-update-edit`).data("id")
        var [name, email, phone, url, street, city, district, code, desc, password] = $(".profilePage #form-edit-profile").serializeArray();
        const user = {
            name: name.value,
            email: email.value,
            phone: phone.value,
            url: url.value,
            street: street.value,
            city: city.value,
            district: district.value,
            code: code.value,
            desc: desc.value,
            password: password.value
        }
        fetch(`/api/users/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(res => res.text())
        .then(data => {
            data = JSON.parse(data)
            $('.profilePage .show-error-message-edit-profile').html("")
            if (data.status) {
                $('.profilePage .show-error-message-edit-profile').html(data.message)

                $('.profilePage .content-profile-name').html(data.user.name)
                $('.profilePage .content-profile-email').html(data.user.email)
                $('.profilePage .content-profile-phone').html(data.user.phone)
                $('.profilePage .content-profile-url').html(data.user.url)
                $('.profilePage .content-profile-street').html(data.user.street)
                $('.profilePage .content-profile-city').html(data.user.city)
                $('.profilePage .content-profile-district').html(data.user.district)
                $('.profilePage .content-profile-code').html(data.user.code)

                $('.profilePage .content-main-name').html(data.user.name)
                $('.profilePage .content-main-email').html(data.user.email)
                $('.profilePage .content-main-desc').html(data.user.desc)
            }
            else {
                $('.profilePage .show-error-message-edit-profile').html(data.error)
            }

            $('.profilePage .show-error-message-edit-profile').fadeIn(500)

            setTimeout(() => {
                $('.profilePage .show-error-message-edit-profile').fadeOut(1000)
            },1500)

            if (data.status) {
                setTimeout(() => {
                    $('.profilePage .edit-profile-form').hide()
                    $('.profilePage .profile-show').show()
                },1000)
            }
        }).catch(e => {
            console.log(e)
        })
    })


    // thêm sản phẩm vào giỏ hàng

    $('.detailPage .product-information .add-to-cart-each').click(e => {
        console.log('check')
        const amount = $('.detailPage .product-information input.amount-product-cart').val()
        const {user, voucher} = e.target.dataset
        if (user !== "" && voucher !== "" && user && voucher) {
            let query = {
                user: user,
                voucher: voucher,
                amount : parseInt(amount)
            }
    
            // console.log(query)
    
            fetch('./api/carts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(query)
            }).then(res => res.text())
            .then(data => {
                data = JSON.parse(data)
                $('.detailPage .show-error-message-detail').html("")
                // console.log(data)
                if (data.status) {
                    $('.detailPage .show-error-message-detail').html(data.message)
                }
                else {
                    $('.detailPage .show-error-message-detail').html(data.error)
                }
    
                $('.detailPage .show-error-message-detail').fadeIn(500)
    
                setTimeout(() => {
                    $('.detailPage .show-error-message-detail').fadeOut(1000)
                },1500)
            }).catch(e => {
                console.log(e)
            })
        }
        else if (!user || user == "") {
            $('.detailPage .show-error-message-detail').html("")
            // console.log(data)
            $('.detailPage .show-error-message-detail').html("Vui lòng đăng nhập")

            $('.detailPage .show-error-message-detail').fadeIn(500)

            setTimeout(() => {
                $('.detailPage .show-error-message-detail').fadeOut(1000)
            },1500)
        }
        else if (!voucher || voucher == "") {
            $('.detailPage .show-error-message-detail').html("")
            // console.log(data)
            $('.detailPage .show-error-message-detail').html("Xảy ra lỗi, vui lòng refresh lại")

            $('.detailPage .show-error-message-detail').fadeIn(500)

            setTimeout(() => {
                $('.detailPage .show-error-message-detail').fadeOut(1000)
            },1500)
        }
    })

    // Thêm sản phẩm vào giỏ hàng - category-tab

    $('.category-tab .add-to-cart-show-hover-category-tab').click(e => {
        $('.messsageAlertPage #message-alert-show .content').html("")
        const {user,voucher} = e.target.dataset
        if (user !== "" && voucher !== "" && user && voucher) {
            let query = {
                user: user,
                voucher: voucher,
                amount : 1
            }
            fetch('./api/carts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(query)
            }).then(res => res.text())
            .then(data => {
                data = JSON.parse(data)
                // console.log(data)
                if (data.status) {
                    $('.messsageAlertPage #message-alert-show .content').html(data.message)
                }
                else {
                    $('.messsageAlertPage #message-alert-show .content').html(data.error)
                }
    
                $('.messsageAlertPage #message-alert-show').fadeIn();
    
                setTimeout(() => {
                    $('.messsageAlertPage #message-alert-show').fadeOut();
                },3000)
            }).catch(e => {

                $('.messsageAlertPage #message-alert-show .content').html(e.message)
                $('.messsageAlertPage #message-alert-show').fadeIn();
    
                setTimeout(() => {
                    $('.messsageAlertPage #message-alert-show').fadeOut();
                },3000)
            })
        }
        else if (!voucher || voucher == "") {
            // $('.messsageAlertPage #message-alert-show .main-title').html("Thông báo")
            $('.messsageAlertPage #message-alert-show .content').html("Xảy ra lỗi, vui lòng refresh lại")
            $('.messsageAlertPage #message-alert-show').fadeIn();
    
            setTimeout(() => {
                $('.messsageAlertPage #message-alert-show').fadeOut();
            },3000)
        }
        else if (!user || user == "") {
            $('.messsageAlertPage #message-alert-show .content').html("Vui lòng đăng nhập")
            $('.messsageAlertPage #message-alert-show').fadeIn();
    
            setTimeout(() => {
                $('.messsageAlertPage #message-alert-show').fadeOut();
            },3000)
        }
    })


    // Thêm sản phẩm vào giỏ hàng - recommend-item
    $('.recommended_items .add-to-cart-show-hover-recommend').click(e => {
        $('.messsageAlertPage #message-alert-show .content').html("")
        const {user,voucher} = e.target.dataset
        if (user !== "" && voucher !== "" && user && voucher) {
            let query = {
                user: user,
                voucher: voucher,
                amount : 1
            }
            fetch('./api/carts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(query)
            }).then(res => res.text())
            .then(data => {
                data = JSON.parse(data)
                // console.log(data)
                if (data.status) {
                    $('.messsageAlertPage #message-alert-show .content').html(data.message)
                }
                else {
                    $('.messsageAlertPage #message-alert-show .content').html(data.error)
                }
    
                $('.messsageAlertPage #message-alert-show').fadeIn();
    
                setTimeout(() => {
                    $('.messsageAlertPage #message-alert-show').fadeOut();
                },3000)
            }).catch(e => {

                $('.messsageAlertPage #message-alert-show .content').html(e.message)
                $('.messsageAlertPage #message-alert-show').fadeIn();
    
                setTimeout(() => {
                    $('.messsageAlertPage #message-alert-show').fadeOut();
                },3000)
            })
        }
        else if (!voucher || voucher == "") {
            // $('.messsageAlertPage #message-alert-show .main-title').html("Thông báo")
            $('.messsageAlertPage #message-alert-show .content').html("Xảy ra lỗi, vui lòng refresh lại")
            $('.messsageAlertPage #message-alert-show').fadeIn();
    
            setTimeout(() => {
                $('.messsageAlertPage #message-alert-show').fadeOut();
            },3000)
        }
        else if (!user || user == "") {
            $('.messsageAlertPage #message-alert-show .content').html("Vui lòng đăng nhập")
            $('.messsageAlertPage #message-alert-show').fadeIn();
    
            setTimeout(() => {
                $('.messsageAlertPage #message-alert-show').fadeOut();
            },3000)
        }
    })

    // Thêm sản phẩm vào giỏ hàng - index

    $(document).on('click','.indexPage .product-overlay .overlay-content .add-to-cart-show-hover-main',e => {
        $('.messsageAlertPage #message-alert-show .content').html("")
        const {user,voucher} = e.target.dataset
        if (user !== "" && voucher !== "" && user && voucher) {
            let query = {
                user: user,
                voucher: voucher,
                amount : 1
            }
            fetch('./api/carts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(query)
            }).then(res => res.text())
            .then(data => {
                data = JSON.parse(data)
                // console.log(data)
                if (data.status) {
                    $('.messsageAlertPage #message-alert-show .content').html(data.message)
                }
                else {
                    $('.messsageAlertPage #message-alert-show .content').html(data.error)
                }
    
                $('.messsageAlertPage #message-alert-show').fadeIn();
    
                setTimeout(() => {
                    $('.messsageAlertPage #message-alert-show').fadeOut();
                },3000)
            }).catch(e => {

                $('.messsageAlertPage #message-alert-show .content').html(e.message)
                $('.messsageAlertPage #message-alert-show').fadeIn();
    
                setTimeout(() => {
                    $('.messsageAlertPage #message-alert-show').fadeOut();
                },3000)
            })
        }
        else if (!voucher || voucher == "") {
            // $('.messsageAlertPage #message-alert-show .main-title').html("Thông báo")
            $('.messsageAlertPage #message-alert-show .content').html("Xảy ra lỗi, vui lòng refresh lại")
            $('.messsageAlertPage #message-alert-show').fadeIn();
    
            setTimeout(() => {
                $('.messsageAlertPage #message-alert-show').fadeOut();
            },3000)
        }
        else if (!user || user == "") {
            $('.messsageAlertPage #message-alert-show .content').html("Vui lòng đăng nhập")
            $('.messsageAlertPage #message-alert-show').fadeIn();
    
            setTimeout(() => {
                $('.messsageAlertPage #message-alert-show').fadeOut();
            },3000)
        }
    })

    // Thêm sản phẩm vào giỏ hàng - search

    $('.searchPage .product-overlay .overlay-content .add-to-cart-show-hover-search').click(e => {
        $('.messsageAlertPage #message-alert-show .content').html("")
        const {user,voucher} = e.target.dataset
        if (user !== "" && voucher !== "" && user && voucher) {
            let query = {
                user: user,
                voucher: voucher,
                amount : 1
            }
            console.log(query)
            fetch('./api/carts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(query)
            }).then(res => res.text())
            .then(data => {
                data = JSON.parse(data)
                // console.log(data)
                if (data.status) {
                    $('.messsageAlertPage #message-alert-show .content').html(data.message)
                }
                else {
                    $('.messsageAlertPage #message-alert-show .content').html(data.error)
                }
    
                $('.messsageAlertPage #message-alert-show').fadeIn();
    
                setTimeout(() => {
                    $('.messsageAlertPage #message-alert-show').fadeOut();
                },3000)
            }).catch(e => {

                $('.messsageAlertPage #message-alert-show .content').html(e.message)
                $('.messsageAlertPage #message-alert-show').fadeIn();
    
                setTimeout(() => {
                    $('.messsageAlertPage #message-alert-show').fadeOut();
                },3000)
            })
        }
        else if (!voucher || voucher == "") {
            // $('.messsageAlertPage #message-alert-show .main-title').html("Thông báo")
            $('.messsageAlertPage #message-alert-show .content').html("Xảy ra lỗi, vui lòng refresh lại")
            $('.messsageAlertPage #message-alert-show').fadeIn();
    
            setTimeout(() => {
                $('.messsageAlertPage #message-alert-show').fadeOut();
            },3000)
        }
        else if (!user || user == "") {
            $('.messsageAlertPage #message-alert-show .content').html("Vui lòng đăng nhập")
            $('.messsageAlertPage #message-alert-show').fadeIn();
    
            setTimeout(() => {
                $('.messsageAlertPage #message-alert-show').fadeOut();
            },3000)
        }
    })

    // Thêm sản phẩm vào giỏ hàng - product

    $('.productPage .product-overlay .overlay-content .add-to-cart-show-hover-product').click(e => {
        $('.messsageAlertPage #message-alert-show .content').html("")
        const {user,voucher} = e.target.dataset
        if (user !== "" && voucher !== "" && user && voucher) {
            let query = {
                user: user,
                voucher: voucher,
                amount : 1
            }
            console.log(query)
            fetch('./api/carts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(query)
            }).then(res => res.text())
            .then(data => {
                data = JSON.parse(data)
                // console.log(data)
                if (data.status) {
                    $('.messsageAlertPage #message-alert-show .content').html(data.message)
                }
                else {
                    $('.messsageAlertPage #message-alert-show .content').html(data.error)
                }
    
                $('.messsageAlertPage #message-alert-show').fadeIn();
    
                setTimeout(() => {
                    $('.messsageAlertPage #message-alert-show').fadeOut();
                },3000)
            }).catch(e => {

                $('.messsageAlertPage #message-alert-show .content').html(e.message)
                $('.messsageAlertPage #message-alert-show').fadeIn();
    
                setTimeout(() => {
                    $('.messsageAlertPage #message-alert-show').fadeOut();
                },3000)
            })
        }
        else if (!voucher || voucher == "") {
            // $('.messsageAlertPage #message-alert-show .main-title').html("Thông báo")
            $('.messsageAlertPage #message-alert-show .content').html("Xảy ra lỗi, vui lòng refresh lại")
            $('.messsageAlertPage #message-alert-show').fadeIn();
    
            setTimeout(() => {
                $('.messsageAlertPage #message-alert-show').fadeOut();
            },3000)
        }
        else if (!user || user == "") {
            $('.messsageAlertPage #message-alert-show .content').html("Vui lòng đăng nhập")
            $('.messsageAlertPage #message-alert-show').fadeIn();
    
            setTimeout(() => {
                $('.messsageAlertPage #message-alert-show').fadeOut();
            },3000)
        }
    })

    // hide show left sidebar button
    $('.left-sidebar .brands_products .more-brands-view').click(e => {
        var lengthCity = $('.left-sidebar .brands_products .brands-name .li-left-sidebar').length
        // console.log(lengthCity)
        if (lengthCity <= 7) {
            $('.left-sidebar .brands_products .more-brands-view .panel-title .icon-arrow').remove()
            $('.left-sidebar .brands_products .more-brands-view .panel-title').append('<i class="fas fa-angle-double-up icon-arrow"></i>')
            $('.left-sidebar .brands_products li.show-hide-left-sidebar').addClass('li-left-sidebar')
            $('.left-sidebar .brands_products .show-hide-left-sidebar-panel').removeClass('active-panel-left-sidebar')
            $('.left-sidebar .brands_products li.show-hide-left-sidebar').slideDown()
        }
        else {
            $('.left-sidebar .brands_products .more-brands-view .panel-title .icon-arrow').remove()
            $('.left-sidebar .brands_products .more-brands-view .panel-title').append('<i class="fas fa-angle-double-down icon-arrow"></i>')
            $('.left-sidebar .brands_products li.show-hide-left-sidebar').removeClass('li-left-sidebar')
            $('.left-sidebar .brands_products .show-hide-left-sidebar-panel').addClass('active-panel-left-sidebar')
            $('.left-sidebar .brands_products li.show-hide-left-sidebar').slideUp()
        }
    })

    // Chọn tỉnh thành - cart

    $('.cartPage #do_action .user_info #select_city_cart').on('change',function() {
        const id = this.value
        if (id == '608be99d5a0c80ffe8df3b06'){
            $('.cartPage #do_action .user_info .input_city_other').fadeIn()
        }
        else {
            $('.cartPage #do_action .user_info .input_city_other').fadeOut()
        }
    })

    // Chọn nhà vận chuyển - checkout
    $('.checkoutPage .form-two #select-shipper-checkout').on('change', function() {
        // id shipper - this.value
        const city_id = document.querySelector('.checkoutPage .shopper-informations .bill-to .form-one .city-checkout').dataset.id
        const id = this.value
        const totalPrice = document.querySelector('.checkoutPage #cart_items .cart_info .table.table-condensed.total-result .all-price').dataset.price
        if (id != 'undefined') {
            fetch(`./api/shippers/${id}`, {
                method: 'GET',
            })
            .then(res => res.text())
            .then(data => {
                data = JSON.parse(data)
                if (data.status) {
                    const shipper = data.Shipper
                    shipper.city.forEach(c => {
                        if (c.item == city_id) {
                            $('.checkoutPage .shopper-informations .bill-to .form-two .price-ship').val(c.price.toLocaleString())
                            $('.checkoutPage .shopper-informations .bill-to .form-two .price-ship').attr("data-price", parseInt(c.price))
                            $('.checkoutPage #cart_items .cart_info .table.table-condensed.total-result .name-shipper').html(`${shipper.name}`)
                            $('.checkoutPage #cart_items .cart_info .table.table-condensed.total-result .price-ship').html(c.price.toLocaleString())
                            $('.checkoutPage #cart_items .cart_info .table.table-condensed.total-result .all-price-total').html((parseInt(totalPrice) + parseInt(c.price)).toLocaleString())
                        }
                    })
                    $('.messsageAlertPage #message-alert-show .content').html("Cập nhật phí vận chuyển thành công")
                }
                else {
                    $('.messsageAlertPage #message-alert-show .content').html(data.error)
                }
    
                $('.messsageAlertPage #message-alert-show').fadeIn();
    
                setTimeout(() => {
                    $('.messsageAlertPage #message-alert-show').fadeOut();
                },3000)
            }).catch(e => {
                
                $('.messsageAlertPage #message-alert-show .content').html(e.message)
                $('.messsageAlertPage #message-alert-show').fadeIn();
    
                setTimeout(() => {
                    $('.messsageAlertPage #message-alert-show').fadeOut();
                },3000)
            })
        }
        else if (id == 'undefined') {
            $('.checkoutPage .shopper-informations .bill-to .form-two .price-ship').val(0)
            $('.checkoutPage .shopper-informations .bill-to .form-two .price-ship').attr("data-price",0)
            $('.checkoutPage #cart_items .cart_info .table.table-condensed.total-result .name-shipper').html(`Vui lòng chọn nhà vận chuyển`)
            $('.checkoutPage #cart_items .cart_info .table.table-condensed.total-result .price-ship').html(0)
            $('.checkoutPage #cart_items .cart_info .table.table-condensed.total-result .all-price-total').html(parseInt(totalPrice).toLocaleString())
            $('.messsageAlertPage #message-alert-show .content').html('Vui lòng chọn nhà vận chuyển')
            $('.messsageAlertPage #message-alert-show').fadeIn();

            setTimeout(() => {
                $('.messsageAlertPage #message-alert-show').fadeOut();
            },3000)
            
        }

    });


    // Thanh toán hoá đơn giỏ hàng - checkout

    $('.checkoutPage .payment-button .snip1582').click(e => {
        // shopper - information
        var name = $('.checkoutPage .shopper-informations .shopper-info .name-checkout').val()
        var phone = $('.checkoutPage .shopper-informations .shopper-info .phone-checkout').val()
        var password = $('.checkoutPage .shopper-informations .shopper-info .password-checkout').val()

        // console.log(`shopper - information --- ${name}-${phone}-${password}`)
        // bill - information

        var city_id = $('.checkoutPage .shopper-informations .bill-to .city-checkout').data('id')
        var city = $('.checkoutPage .shopper-informations .bill-to .city-checkout').val()
        var email = $('.checkoutPage .shopper-informations .bill-to .email-checkout').val()
        var district = $('.checkoutPage .shopper-informations .bill-to .district-checkout').val()
        var address = $('.checkoutPage .shopper-informations .bill-to .address-checkout').val()

        // console.log(`bill - information --- ${city_id}-${city}-${email}-${district}-${address}`)

        // shipper - information

        var shipper = $('.checkoutPage .bill-to #select-shipper-checkout').val()
        var price_ship = $('.checkoutPage .shopper-informations .bill-to .form-two .price-ship').attr('data-price')

        // console.log(`shipper - information --- ${shipper}-${price_ship}`)

        // note

        var note = $('.checkoutPage .order-message .note-ship').val()

        // console.log(`note --- ${note}`)

        // cart id
        var cart = e.target.dataset.cart
        var user = e.target.dataset.user

        // console.log(`cart id --- ${cart}`)


        // Kiểm tra sau khi giao hàng

        var check = $('.checkoutPage .payment-options #check-payment-after').is(':checked')
        // console.log(`Kiểm tra sau khi giao hàng --- ${check}`)
        var query = {
            "user": user,
            "validation": false,
            "check": check,
            "name": name,
            "phone": phone,
            "email":email,
            "cart": cart,
            "shipper": {
                "item": shipper,
                "price": parseInt(price_ship)
            },
            "address": address,
            "district": district,
            "city": {
                "item": city_id,
                "name": city
            },
            "note": note,
            "password": password
        }
        fetch('./api/buys', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(query)
        }).then(res => res.text())
        .then(data => {
            data = JSON.parse(data)
            if(data.status) {
                $('.messsageAlertPage #message-alert-show .content').html(data.message)
                setTimeout(() => {
                    window.location.href = './payment';
                }, 3000)
            }
            else {
                $('.messsageAlertPage #message-alert-show .content').html(data.error)
            }

            $('.messsageAlertPage #message-alert-show').fadeIn();
    
            setTimeout(() => {
                $('.messsageAlertPage #message-alert-show').fadeOut();
            },3000)
        }).catch(e => {
            $('.messsageAlertPage #message-alert-show .content').html(e.message)
            $('.messsageAlertPage #message-alert-show').fadeIn();

            setTimeout(() => {
                $('.messsageAlertPage #message-alert-show').fadeOut();
            },3000)
        })
    })

    // Thêm review mới - page detail product
    $('.detailPage .get-data-review').click(e => {
        var name = $('.detailPage #name-review').val()
        var email = $('.detailPage #email-review').val()
        var review = $('.detailPage .comment-review').val()
        var star = $(".detailPage .rate input[name='rate']:checked").val()
        var voucher = e.target.dataset.voucher

        if (star == undefined) {
            star = 0
        }

        query = {
            name,
            email,
            review,
            star: parseInt(star),
            voucher
        }

        fetch('./api/reviews', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(query)
        }).then(res => res.text())
        .then(data => {
            data = JSON.parse(data)
            if (data.status) {
                $('.detailPage #name-review').val("")
                $('.detailPage #email-review').val("")
                $('.detailPage .comment-review').val("")
                $('.messsageAlertPage #message-alert-show .content').html(data.message)
                $('.messsageAlertPage #message-alert-show').fadeIn();
    
                setTimeout(() => {
                    $('.messsageAlertPage #message-alert-show').fadeOut();
                },1000)
            }
            else {
                $('.messsageAlertPage #message-alert-show .content').html(data.error)
                $('.messsageAlertPage #message-alert-show').fadeIn();
    
                setTimeout(() => {
                    $('.messsageAlertPage #message-alert-show').fadeOut();
                },3000)
            }
        }).catch(e => {
            $('.messsageAlertPage #message-alert-show .content').html(e.message)
            $('.messsageAlertPage #message-alert-show').fadeIn();

            setTimeout(() => {
                $('.messsageAlertPage #message-alert-show').fadeOut();
            },3000)
        })
    })
});

// chuyển qa routes checkout
function redirectCheckout(element) {
    var cart_length = element.dataset.length
    if (parseInt(cart_length) != 0) {
        var cart_id = element.dataset.cart
        var city_id = $('.cartPage #do_action .user_info #select_city_cart').val()
        var district = $('.cartPage #do_action .user_info .district_cart').val()
        var address = $('.cartPage #do_action .user_info .address_cart').val()

        let error = ""
        // xết điều kiện là thành phố, tỉnh thành khác
        if (city_id == '608be99d5a0c80ffe8df3b06') {
            var city = $('.cartPage #do_action .user_info .input_city_other .city').val()
            if (city == "" || city == undefined) {
                error = "vui lòng cung cấp thông tin tỉnh / thành phố khác"
                $('.messsageAlertPage #message-alert-show .content').html(error)
                $('.messsageAlertPage #message-alert-show').fadeIn();
            
                setTimeout(() => {
                    $('.messsageAlertPage #message-alert-show').fadeOut();
                },3000)
            }
            else if (district == "" || district == undefined) {
                error = "vui lòng cung cấp thông tin Quận / Thị xã"
                $('.messsageAlertPage #message-alert-show .content').html(error)
                $('.messsageAlertPage #message-alert-show').fadeIn();
            
                setTimeout(() => {
                    $('.messsageAlertPage #message-alert-show').fadeOut();
                },3000)
            }
            else if (address == "" || address == undefined) {
                error = "Vui lòng cung cấp thông tin Địa Chỉ"
                $('.messsageAlertPage #message-alert-show .content').html(error)
                $('.messsageAlertPage #message-alert-show').fadeIn();
            
                setTimeout(() => {
                    $('.messsageAlertPage #message-alert-show').fadeOut();
                },3000)
            }
            else if (address != "" && district != "" && address != undefined && district != undefined && cart_id != "" && cart_id != undefined && city != "" && city != undefined) {
                document.getElementById('check-out-profile').href = `./checkout?cart=${cart_id}&district=${district}&city_id=${city_id}&address=${address}&city=${city}`
        
            }
            else {
                error = "Lỗi xảy ra - vui lòng refresh lại trang"
                $('.messsageAlertPage #message-alert-show .content').html(error)
                $('.messsageAlertPage #message-alert-show').fadeIn();
            
                setTimeout(() => {
                    $('.messsageAlertPage #message-alert-show').fadeOut();
                },3000)
            }
        }
        else {
            if (district == "" || district == undefined) {
                error = "vui lòng cung cấp thông tin Quận / Thị xã"
                $('.messsageAlertPage #message-alert-show .content').html(error)
                $('.messsageAlertPage #message-alert-show').fadeIn();
            
                setTimeout(() => {
                    $('.messsageAlertPage #message-alert-show').fadeOut();
                },3000)
            }
            else if (address == "" || address == undefined) {
                error = "Vui lòng cung cấp thông tin Địa Chỉ"
                $('.messsageAlertPage #message-alert-show .content').html(error)
                $('.messsageAlertPage #message-alert-show').fadeIn();
            
                setTimeout(() => {
                    $('.messsageAlertPage #message-alert-show').fadeOut();
                },3000)
            }
            else if (address != "" && district != "" && address != undefined && district != undefined && cart_id != "" & cart_id != undefined) {
                document.getElementById('check-out-profile').href = `./checkout?cart=${cart_id}&district=${district}&city_id=${city_id}&address=${address}`
        
            }
            else {
                error = "Lỗi xảy ra - vui lòng refresh lại trang"
                $('.messsageAlertPage #message-alert-show .content').html(error)
                $('.messsageAlertPage #message-alert-show').fadeIn();
            
                setTimeout(() => {
                    $('.messsageAlertPage #message-alert-show').fadeOut();
                },3000)
            }
        }
    }
    else {
        $('.messsageAlertPage #message-alert-show .content').html("Không có sản phẩm, vui lòng thêm sản phẩm vào giỏ hàng")
        $('.messsageAlertPage #message-alert-show').fadeIn();
    
        setTimeout(() => {
            $('.messsageAlertPage #message-alert-show').fadeOut();
        },3000)
    }
}
