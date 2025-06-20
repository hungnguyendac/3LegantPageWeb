// Close Top-bar
$(".top_bar .btn_close").on("click", () => {
  $(".top_bar").hide();
});

// Open & Close popup menu, popup cart
const openPopup = () => {
  $(".popup_menu").append($(".header_list"));
  $(".header").addClass("menu_open");
  $("body").addClass("no-scroll");
};
const closePopup = () => {
  $(".header_menu").append($(".header_list"));
  $(".header").removeClass("menu_open");
  $("body").removeClass("no-scroll");
};

const openCartPopup = () => {
  $(".header").addClass("cart_open");
  $("body").addClass("no-scroll");
};
const closeCartPopup = () => {
  $(".header").removeClass("cart_open");
  $("body").removeClass("no-scroll");
};

$(".icon_bars").on("click", openPopup);
$(".bag_button").on("click", openCartPopup)

$(".popup .icon_close, .cart_popup .button .icon_close, .dimmed").on("click", () => {
  closePopup();
  closeCartPopup();
});

$(window).on("resize", () => {
  const width = $(window).width();
  if ($(".header").hasClass("menu_open") && width >= 770) {
    closePopup();
  }
});

$(document).on("click", ".button_decrease, .button_increase", function () {
  const $control = $(this).closest(".quantity_actions, .quantity_selector");
  const $input = $control.find(".quantity_input");
  let current = parseInt($input.val(), 10);
  if (isNaN(current)) current = 1;

  if ($(this).hasClass("button_decrease")) {
    if (current > 1) $input.val(current - 1);
  } else {
    if (current < 99) $input.val(current + 1);
  }
});

$(document).on("input", ".quantity_input", function () {
  this.value = this.value.replace(/[^\d]/g, '');
  if (this.value.length > 2) {
    this.value = this.value.slice(0, 2);
  }
  let val = parseInt(this.value, 10);
  if (!isNaN(val) && val > 99) {
    this.value = 99;
  }
});

$(document).on("blur", ".quantity_input", function () {
  let val = parseInt($(this).val(), 10);
  if (isNaN(val) || val < 1) $(this).val(1);
});

// Run date and time Product
$(document).ready(() => {
  const endTime =
    new Date().getTime() +
    2 * 24 * 60 * 60 * 1000 +
    12 * 60 * 60 * 1000 +
    45 * 60 * 1000 +
    5 * 1000;

  const updateCountdown = () => {
    const now = new Date().getTime();
    const distance = endTime - now;

    if (distance <= 0) {
      $("#days, #hours, #minutes, #seconds").text("00");
      clearInterval(timer);
      return;
    }

    const totalSeconds = Math.floor(distance / 1000);
    const days = Math.floor(totalSeconds / (60 * 60 * 24));
    const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60));
    const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
    const seconds = totalSeconds % 60;

    $("#days").text(String(days).padStart(2, "0"));
    $("#hours").text(String(hours).padStart(2, "0"));
    $("#minutes").text(String(minutes).padStart(2, "0"));
    $("#seconds").text(String(seconds).padStart(2, "0"));
  };

  updateCountdown();
  const timer = setInterval(updateCountdown, 250);
});

// Increase width textarea
// $(document).ready(function() {
//   const $textarea = $(".feedback_input");
//   const baseHeight = $textarea[0].scrollHeight;

//   $textarea.css("height", baseHeight + "px");

//   $textarea.on("input", function () {
//     $(this).css("height", "auto");

//     if ($(this).val().trim() === "") {
//       $(this).css("height", baseHeight + "px");
//     } else {
//       $(this).css("height", this.scrollHeight + "px");
//     }
//   });
// });

const swiperBanner = new Swiper(".mySwiper", {
  slidesPerView: "auto",
  spaceBetween: 10,
  touchReleaseOnEdges: true,
  loop: true,
  centeredSlides: true,
  mousewheel: false,
  autoplay: {
    delay: 3000,
    disableOnInteraction: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

const swiperProducts = new Swiper(".product_slides", {
  slidesPerView: "auto",
  spaceBetween: 16,
  touchReleaseOnEdges: true,
  breakpoints: {
    768: {
      spaceBetween: 24,
    },
  },
  scrollbar: {
    el: ".swiper-scrollbar",
    draggable: true,
  },
  mousewheel: false,
});

const swiperProductsPage = new Swiper(".productPage", {
  slidesPerView: "auto",
  spaceBetween: 16,
  touchReleaseOnEdges: true,
  breakpoints: {
    768: {
      spaceBetween: 24,
    },
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  scrollbar: {
    el: ".swiper-scrollbar",
    draggable: false,
  },
});

$('.product_list_img .item_img').each(function (index) {
  $(this).on('click', function () {
    swiperProductsPage.slideTo(index);
    
    $('.product_list_img .item_img').removeClass('active');
    $(this).addClass('active');
  });
});

$(".img_area img").each(function (index) {
  $(this).on("click", function () {
    swiperProductsPage.slideTo(index + 4);
  });
});

// Event click Newest
$(document).ready(function () {
  const $btnList = $(".btn_option");
  const $menuList = $(".select_option");

  $btnList.on("click", function (e) {
    e.stopPropagation(); 
    $btnList.toggleClass("is_active");
    $menuList.toggleClass("is_show");
  });

  $(document).on("click", function (e) {
    const $target = $(e.target);
    const isClickOutside =
      !$btnList.is($target) &&
      !$btnList.has($target).length &&
      !$menuList.is($target) &&
      !$menuList.has($target).length;
    const isLargeScreen = $(window).width() > 768;

    if (isClickOutside || isLargeScreen) {
      $btnList.removeClass("is_active");
      $menuList.removeClass("is_show");
    }
  });

  $(window).on("resize", function () {
    if ($(window).width() > 768) {
      if ($menuList.hasClass("is_show")) {
        $btnList.removeClass("is_active");
        $menuList.removeClass("is_show");
      }
    }
  });
});

// Events click data-tab
$(document).ready(function () {
  $(".tab_button").on("click", function () {
    const selectedTab = $(this).data("tab");

    $(".tab_button").removeClass("active");
    $(this).addClass("active");

    $(".tab_content").removeClass("active");
    $('.tab_content[data-tab="' + selectedTab + '"]').addClass("active");

    // Toggle hiển thị info_mobile
    if (selectedTab === "review") {
      $(".info_mobile").stop().animate({ height: "auto", opacity: 1 }, 300);
    } else {
      $(".info_mobile").stop().animate({ height: 0, opacity: 0 }, 300);
    }
  });

  $('.tab_button[data-tab="review"]').addClass("active");
  $('.tab_content[data-tab="review"]').addClass("active");
  $(".info_mobile").css({ height: "auto", opacity: 1 }); 
});

// Emoticon event
const reactionBox = document.getElementById("reactionBox");
let longPressTimer = null;
let $currentBtn = null;

function showReactionBox(offset) {
  reactionBox.style.left = offset.left - 80 + "px";
  reactionBox.style.top = offset.top - 50 + "px";
  reactionBox.style.opacity = "1";
  reactionBox.style.visibility = "visible";
  reactionBox.style.pointerEvents = "auto";
}

function hideReactionBox() {
  reactionBox.style.opacity = "0";
  reactionBox.style.visibility = "hidden";
  reactionBox.style.pointerEvents = "none";
}

function initReactionEvents() {
  $(".comment_like").each(function () {
    const $btn = $(this);

    if ($btn.data("initialized")) return;
    $btn.data("initialized", true);

    let isLiked = false;

    $btn.on("mouseenter", function () {
      $currentBtn = $btn;
      const offset = $btn.offset();
      showReactionBox(offset);
    });

    $btn.on("mousedown", function () {
      $currentBtn = $btn;
      longPressTimer = setTimeout(() => {
        const offset = $btn.offset();
        showReactionBox(offset);
      }, 300);
    });

    $btn.on("mouseup mouseleave", function () {
      clearTimeout(longPressTimer);
      setTimeout(() => {
        if (!reactionBox.matches(":hover")) {
          hideReactionBox();
        }
      }, 200);
    });

    $btn.on("click", function () {
      if (!isLiked) {
        $btn.html(`
          <span class="reaction_display">
            <img class="reaction_img" src="/src/img/emoticons/like.png" alt="Like">
            <span class="reaction_count">12</span>
          </span>
        `);
        isLiked = true;
      } else {
        $btn.html('<button class="button button_like" type="button">Like</button>');
        isLiked = false;
      }
    });

    $btn.data("liked", () => isLiked);
    $btn.data("setLiked", (val) => {
      isLiked = val;
    });
  });
}

$(".reaction_box .reaction_img").on("click", function () {
  if (!$currentBtn) return;

  const imgSrc = $(this).attr("src");
  const altText = $(this).attr("alt");

  $currentBtn.html(`
    <span class="reaction_display">
      <img class="reaction_img" src="${imgSrc}" alt="${altText}">
      <span class="reaction_count">12</span>
    </span>
  `);
  $currentBtn.data("setLiked")(true);
  hideReactionBox();
});

$("#reactionBox").on("mouseleave", function () {
  hideReactionBox();
});