$(document).ready(function () {

    $.ajax({
        url: "http://localhost:3000/invoices/",
        dataType: "json",
        success: function (result) {
            console.info(result);
            for (i = 0; i < result.length; i++) {
                $(".string_add").append(
                    "<tr>" +
                    "<td class='date_created-" + i + "'>" + result[i].date_created + "</td>" +
                    "<td><a data-num='" + i + "' data-id='" + result[i].id + "' href='#' class='NoIn NoIn-" + i + "'>INV-" + result[i].number + "</a></td>" +
                    "<td class='date_supply-" + i + "'>" + result[i].date_supply + "</td>" +
                    "<td class='comment-" + i + "'>" + result[i].comment + "</td>" +
                    "<td><button type='button' class='btn btn-info edit' data-edit='" + i + "'>Edit</button></td>" +
                    "<td><button type='button' class='btn btn-danger delete' data-del='" + i + "'>Delete</button></td>" +
                    "</tr>"
                );
            }
        }
    });

    $("body").on("click", ".NoIn", function () {
        var key_input = parseInt($(this).html().replace(/\D+/g, ""));
        $('.inputNumber').val(key_input);
        $('#createDate').val($('.date_created-' + $(this).data('num')).html());
        $('#supplyDate').val($('.date_supply-' + $(this).data('num')).html());
        $('#comment').val($('.comment-' + $(this).data('num')).html());
        //$('.inputNumber').prop('disabled', true); //disabled
        $('.save_data').attr('data-idinv', $(this).data('id'));
        $('#myModal').modal('show');
    });

    $("body").on("click", ".edit", function () {
        var key_input = parseInt($('.NoIn-' + $(this).data('edit')).html().replace(/\D+/g, ""));
        $('.inputNumber').val(key_input);
        $('#createDate').val($('.date_created-' + $(this).data('edit')).html());
        $('#supplyDate').val($('.date_supply-' + $(this).data('edit')).html());
        $('#comment').val($('.comment-' + $(this).data('edit')).html());
        //$('.inputNumber').prop('disabled', true); //disabled
        $('.save_data').attr('data-idinv', $(".NoIn-" + $(this).data('edit')).data('id'));
        $('#myModal').modal('show');
    });

    $("body").on("click", ".delete", function () {
        var del_data = $(this).data('del');
        var num = confirm("Confirm deletion?");
        if (num === true) {
            $.ajax({
                method: 'DELETE',
                url: "http://localhost:3000/invoices/" + $(".NoIn-" + del_data).data('id'),
                success: function () { alert("Deleted"); }
            });
        }
    });

    $(".save_data").click(function () {
        if (
            $("#inputNumber").val() != '' &&
            $("#createDate").val() != '' &&
            $("#supplyDate").val() != '' &&
            $("#comment").val() != ''
        ) {
            if ($('.save_data').attr('data-idinv') !== undefined) {
                $.ajax({
                    url: "http://localhost:3000/invoices/" + $(".save_data").data('idinv'),
                    type: 'PUT',
                    data: {
                        number: parseInt($("#inputNumber").val().replace(/\D+/g, "")),
                        date_created: $("#createDate").val(),
                        date_supply: $("#supplyDate").val(),
                        comment: $("#comment").val()
                    },
                    success: function (data) {
                        alert('Edited successfully');
                    }
                });
                $('#myModal').modal('hide');
                $('.save_data').removeAttr('data-idinv');
                $('.inputNumber').val('');
                $('#createDate').val('');
                $('#supplyDate').val('');
                $('#comment').val('');
            } else {
                var id_Inv = "5ac1f09a" + randString(16);
                var direction = randString(8) + '-' + randString(4) + '-' + randString(4) + '-' + randString(4) + '-' + randString(12);
                var Data = new Date();
                var Year = Data.getFullYear();
                var Month = Data.getMonth();
                var Day = Data.getDate();
                switch (Month) {
                    case 0: fMonth = "January"; break;
                    case 1: fMonth = "February"; break;
                    case 2: fMonth = "March"; break;
                    case 3: fMonth = "April"; break;
                    case 4: fMonth = "May"; break;
                    case 5: fMonth = "June"; break;
                    case 6: fMonth = "July"; break;
                    case 7: fMonth = "August"; break;
                    case 8: fMonth = "September"; break;
                    case 9: fMonth = "October"; break;
                    case 10: fMonth = "November"; break;
                    case 11: fMonth = "December"; break;
                }
                $.ajax({
                    type: "POST",
                    url: "http://localhost:3000/invoices/",
                    data: {
                        id: id_Inv,
                        direction: direction,
                        number: parseInt($("#inputNumber").val().replace(/\D+/g, "")),
                        date_created: $("#createDate").val(),
                        date_due: Day + " " + fMonth + " " + Year,
                        date_supply: $("#supplyDate").val(),
                        comment: $("#comment").val()
                    },
                    dataType: "json",
                    success: function (data) { alert("Data added!"); },
                    failure: function (errMsg) {
                        alert(errMsg);
                    }
                });
                $('#myModal').modal('hide');
                $('.save_data').removeAttr('data-idinv');
                $('.inputNumber').val('');
                $('#createDate').val('');
                $('#supplyDate').val('');
                $('#comment').val('');
            }
        } else { alert("Fill in the fields!"); }
    });

    $('.add-new-but').click(function () {
        $('.save_data').removeAttr('data-idinv');
        $('.inputNumber').val('');
        $('#createDate').val('');
        $('#supplyDate').val('');
        $('#comment').val('');
    });

    function randString(length_string) {
        var abc = "abcdefghijklmnopqrstuvwxyz12345678901234567890";
        var rs = "";
        while (rs.length < length_string) {
            rs += abc[Math.floor(Math.random() * abc.length)];
        }
        return rs;
    }
});