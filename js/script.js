(function($) {

    "use strict";
    /*------------------------------------------
        = ACTIVE POPUP IMAGE
    -------------------------------------------*/
    if ($(".fancybox").length) {
        $(".fancybox").fancybox({
            openEffect  : "elastic",
            closeEffect : "elastic",
            wrapCSS     : "project-fancybox-title-style"
        });
    }


    /*------------------------------------------
        = POPUP VIDEO
    -------------------------------------------*/
    if ($(".video-play-btn").length) {
        $(".video-play-btn").on("click", function(){
            $.fancybox({
                href: this.href,
                type: $(this).data("type"),
                'title'         : this.title,
                helpers     : {
                    title : { type : 'inside' },
                    media : {}
                },

                beforeShow : function(){
                    $(".fancybox-wrap").addClass("gallery-fancybox");
                }
            });
            return false
        });
    }


    /* =================
        sampul awal THE BEGINING
    =================*/

    $('#konten').hide(); //hided konten scr deafult
    $(".thebegining").click(function(){
        $(this).hide(); //hide the begining
        $('#konten').show()  //show konten
        $("#audio").get(0).play(); //play musik
        document.documentElement.requestFullscreen();  //fullscreen
    
    });

     /*------------------------------------------
        = NAV BOTTOM BAR
    -------------------------------------------*/

    var navItems = document.querySelectorAll(".mobile-bottom-nav__item");
        navItems.forEach(function(e, i) {
            e.addEventListener("click", function(e) {
                navItems.forEach(function(e2, i2) {
                    e2.classList.remove("mobile-bottom-nav__item--active");
                })
                this.classList.add("mobile-bottom-nav__item--active");
            });
        });


    $(".icons").click(function(){

        $("#nav2").animate({
            height: "toggle",
            opacity: "toggle",
          },100, 'linear');

        $("#lain").animate({
            height: "toggle",
            opacity: "toggle",
          },200, 'linear');

        $("#tutup").toggleClass('rotate');

    });

    $("#lain").click(function(){

        $("#nav2").animate({
            height: "toggle",
            opacity: "toggle",
          },100, 'linear');

        $("#lain").animate({
            height: "toggle",
            opacity: "toggle",
          },200, 'linear');

        $("#tutup").toggleClass('rotate');

    });

    var $allContentDivs = $('#sampul-konten, #mempelai-konten, #acara-konten, #album-konten, #ucapan-konten, #lokasi-konten, #cerita-konten').hide(); // Hide All Content Divs
    
    $("#sampul-konten").show();
    $(".dekorasi-sampul").show();
    $(".dekorasi-all").hide();
    

    $('#sampul, #mempelai, #acara, #album, #ucapan, #lokasi, #cerita').click(function(){
        var $contentDiv = $("#" + this.id + "-konten");

        if(this.id == "sampul"){
            
            $("#imgbawah").hide();
            $(".dekorasi-sampul").show();
            $(".dekorasi-all").hide();
            // $("#imgatas").hide();

        }else{

            $("#imgbawah").show();
            $(".dekorasi-sampul").hide();
            $(".dekorasi-all").show();    

            
        }
        if($contentDiv.is(":visible")) {
        } else {            
            $allContentDivs.hide(); // Hide All Divs
            $contentDiv.show(); // Show Div
        }
        
        $('body,html').animate({
                scrollTop: 0
        }, 600);

    });

    /*=======================================
        Load more content with jQuery - May 21, 2013
        (c) 2013 @ElmahdiMahmoud
    ================================*/   

    $(".komen").slice(0, 4).show();
    $("#loadMore").on('click', function (e) {
        e.preventDefault();
        $(".komen:hidden").slice(0, 4).slideDown();
        if ($(".komen:hidden").length == 0) {
            $("#loadMore").fadeOut('slow');
        }
        $('html,body').animate({
            scrollTop: $(this).offset().top
        }, 1500);
    });


    /*=================
     FORMAT TANGGAL
    ======================= */
    moment.locale('id'); //set indonesian format

    //output = Senin, 17 Agustus 2020
    var date_resepsi = moment(tanggal_resepsi).format('dddd, Do MMMM YYYY'); 
    var date_akad = moment(tanggal_akad).format('dddd, Do MMMM YYYY'); 

    //output = 17 / 08 / 2020
    var date_pernikahan = moment(tanggal_resepsi).format('DD / MM / YYYY'); //untuk sampul


    $('#tanggal-acara-resepsi').html(date_resepsi);
    $('#tanggal-acara-akad').html(date_akad);
    $('.tanggal-weddingnya').html(date_pernikahan); //untuk sampul

    /*=================
     ADD KOMENTAR
    ======================= */
    $('#submitKomen').on('click', function(event) {
        $("form[name='rsvpucapan']").validate({
            ignore: ".ignore",
            rules: {
                namatamu: "required",
                kehadiran: "required",
                pesantamu: "required",
            },
            errorClass: 'isidulu',
            errorPlacement: function(error, element) {
            },
            submitHandler: function(form) {
                $('#loading_').css('display','inline');
                $('#submitKomen').css('display','none');
                var nama =  $('#nama').val();
                var kehadiran =  $('#kehadiran').val();
                var komentar =  $('#komentar').val();
                $.ajax({
                    url : base_url+'/add_komentar',
                    method : "POST",
                    data : {nama: nama,kehadiran: kehadiran,komentar: komentar},
                    async : true,
                    dataType : 'html',
                    success: function(hasil){
                        var json = JSON.parse(hasil);
                        var status = json.status;
                        var nama = json.nama;
                        var kehadiran = json.kehadiran;
                        var komentar = json.komentar;
                        console.log(json);
        
                        if(status == 'sukses'){
                            $('.layout-komen2').append("<div class='komen2' style='display:block'><div class='col-12 komen-nama'>"+nama+"<i class='"+kehadiran+"' style='margin-left:3px;border-radius:2px;font-size:10px;padding:2px;padding-left:5px;padding-right:5px;'>"+kehadiran+"</i></div><div class='col-12 komen-isi'>"+komentar+"</div></div>");
                            $('html, body').animate({
                                scrollTop: $("#komen-netizen").offset().top
                            }, 2000);
                            $('.layout-komen2').css('display', '');
                            $('#loading_').css('display','none');
                            $('#submitKomen').css('display','block');
                            $('#submitKomen').prop('disabled', true); 
                        }
                    }
                });
            }
        });
    });

})(window.jQuery);

