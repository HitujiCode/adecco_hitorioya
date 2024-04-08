jQuery(function ($) {
  // この中であればWordpressでも「$」が使用可能になる

  // ハンバーガーメニュー
  let scrollPosition = 0;

  function openDrawer() {
    scrollPosition = $(window).scrollTop();
    $(".js-header .header__inner").addClass("is-open");
    $(".js-drawer").addClass("is-open");
    $(".js-hamburger").addClass("is-open");
    $("body").addClass("is-fixed").css("top", -scrollPosition);
  }

  function closeDrawer() {
    $(".js-header .header__inner").removeClass("is-open");
    $(".js-drawer").removeClass("is-open");
    $(".js-hamburger").removeClass("is-open");
    $("body").removeClass("is-fixed").css("top", "");
    $(window).scrollTop(scrollPosition);
  }

  $(".js-hamburger").click(function () {
    $(this).toggleClass("is-open");
    if ($(this).hasClass("is-open")) {
      openDrawer();
    } else {
      closeDrawer();
    }
  });

  $(".js-drawer, .js-drawer a[href]").on("click", function () {
    closeDrawer();
  });

  $(window).on("resize", function () {
    if (window.matchMedia("(min-width: 768px)").matches) {
      closeDrawer();
    }
  });

  // Q&Aアコーディオン
  $(".js-faq").on("click", function () {
    $(this).next().slideToggle();
    $(this).toggleClass("is-open");
  });

  // スムーススクロール
  // アンカーリンク
  // $(document).ready(function () {
  //   const fixedHeaderHeight = 50; // 固定ヘッダーの高さ
  //   let lastWindowHeight = $(window).height(); // 初期ウィンドウの高さ

  //   function adjustAnchorOffset() {
  //     $('a[href^="#"]')
  //       .off("click")
  //       .on("click", function (e) {
  //         const href = $(this).attr("href");

  //         if (href.length > 1 && href.startsWith("#")) {
  //           e.preventDefault();

  //           const targetElement = $(href);

  //           if (targetElement.length) {
  //             const elementPosition = targetElement.offset().top;
  //             const currentWindowHeight = $(window).height();
  //             const progressBarHeight = lastWindowHeight - currentWindowHeight;

  //             const offsetPosition =
  //               elementPosition - fixedHeaderHeight - progressBarHeight;

  //             $("html, body").animate(
  //               {
  //                 scrollTop: offsetPosition,
  //               },
  //               "smooth"
  //             );

  //             lastWindowHeight = currentWindowHeight; // ウィンドウの高さを更新
  //           }
  //         }
  //       });
  //   }

  //   // リサイズ時にウィンドウの高さを更新
  //   $(window).on("resize scroll", function () {
  //     lastWindowHeight = $(window).height();
  //   });

  //   adjustAnchorOffset(); // 初期読み込み時に実行
  // });

  $(function () {
    var headerHeight = $("js-header").height();

    $('a[href^="#"]').click(function (e) {
      var href = $(this).attr("href");
      var target = $(href == "#" || href == "" ? "html" : href);
      var position = target.offset().top - headerHeight;

      $.when(
        $("html, body").animate(
          {
            scrollTop: position,
          },
          400,
          "swing"
        ),
        e.preventDefault()
      ).done(function () {
        var diff = target.offset().top - headerHeight;
        if (diff === position) {
        } else {
          $("html, body").animate(
            {
              scrollTop: diff,
            },
            10,
            "swing"
          );
        }
      });
    });
  });
});
