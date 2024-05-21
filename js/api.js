var webmaster_id = 911444;
var webmaster_api = "bcf9ebaca42b6e24ed90a0a2d81a5b59";
var product_id = document.querySelector("input[name=product_id]").value;


/* not change */
let lnk = 3504233;
let langCode = "";
var client_ip = "127.0.0.1";
var client_s = "";
var client_w = "";
var client_t = "";
var client_p = "";
var client_m = "";
var pixel = "";

function sendData(client_name, client_phone) {
  $.ajax({
    type: "POST",
    data: {
      ref: webmaster_id,
      api_key: webmaster_api,
      product_id: product_id,
      phone: client_phone,
      name: client_name,
      ip: client_ip,
      s: client_s,
      w: client_w,
      t: client_t,
      p: client_p,
      m: client_m,
      referer: document.referrer,
      langCode: langCode,
      lnk: lnk,
    },
    url: "https://m1.top/send_order/",
    success: function (data) {
      //console.log(data);
      data = JSON.parse(data);
      if (data.result == "ok") {
        //alert('Заказ создан, ID:' + data.id);
        window.location.replace(
          "success.php?order_id=" +
            data.id +
            "&s=" +
            client_s +
            "&w=" +
            client_w +
            "&t=" +
            client_t +
            "&p=" +
            client_p +
            "&m=" +
            client_m +
            "&pixel=" +
            pixel
        );
      } else {
        //alert('Заказ НЕ создан, ответ: ' + data);
        window.location.replace(
          "error.php?s=" +
            client_s +
            "&w=" +
            client_w +
            "&t=" +
            client_t +
            "&p=" +
            client_p +
            "&m=" +
            client_m
        );
      }
    },
    error: function (xhr, status, error) {
      // if error occured
      console.log(xhr.statusText, xhr.responseText, status, error);

      respjs = JSON.parse(xhr.responseText);
      //alert('Заказ НЕ создан, ответ: ' + respjs.message);
      window.location.replace(
        "error.php?s=" +
          client_s +
          "&w=" +
          client_w +
          "&t=" +
          client_t +
          "&p=" +
          client_p +
          "&m=" +
          client_m
      ); //$(placeholder).append(xhr.statusText + xhr.responseText);
      //$(placeholder).removeClass('loading');
    },
  });
  return false;
}

$(document).ready(function () {
  langCode = document.querySelector("input[name=langCode]").value;
  client_s = document.querySelector("input[name=s]").value;
  client_w = document.querySelector("input[name=w]").value;
  client_t = document.querySelector("input[name=t]").value;
  client_p = document.querySelector("input[name=p]").value;
  client_m = document.querySelector("input[name=m]").value;
  pixel = document.querySelector("input[name=pixel]").value;

  $.getJSON("https://ipapi.co/json/", function (data) {
    //console.log(JSON.stringify(data, null, 2));
    json_data = data;
    client_ip = json_data.ip;
    // console.log(client_ip);
  });

  $("form").submit(function () {
    var elem = $(this),
      button = $("[type=submit], button", elem);

    $("input[name=name]", this).val($.trim($("input[name=name]", this).val()));
    if (!$("input[name=name]", this).val()) {
      alert("Укажите корректные ФИО!");
      return false;
    }

    if (
      !$("input[name=phone]", this).val() ||
      $("input[name=phone]", this).val().length < 7
    ) {
      alert("Укажите корректный телефон!");
      return false;
    }

    button.prop("disabled", true);
    sendData(
      $("input[name=name]", this).val(),
      $("input[name=phone]", this).val()
    );
    return false;
  });
});
