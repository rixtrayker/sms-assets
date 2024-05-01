//General Setting
$("#generalMessage").hide();
function updateGeneralSetting() {
    $("#generalForm").validate({
        rules: {
            status: {
                required: true
            },
            sid: {
                required: true
            },
            token: {
                required: true
            }
        },
        invalidHandler: function (event, validator) {
            var errors = validator.numberOfInvalids();
            if (errors) {
                $("#generalMessage").removeClass("alert-success").addClass("alert-danger");
                var errorMessage = "Please Fillup The Required Fields";
                $("#generalMessage").html(errorMessage);
                $("#generalMessage").show();
                setTimeout(function () {
                    $("#generalMessage").hide();
                }, 3000);
            } else {
                $("#generalMessage").hide();
            }
        },
        submitHandler: function (form) {
            $.ajax({
                type: "POST",
                url: global_site_url + "admin/WhatsApp/update_general_setting",
                data: $('#generalForm').serialize(),
                dataType: 'json',
                success: function (response) {
                    if (response.status == 'success') {
                        $("#generalMessage").removeClass("alert-danger").addClass("alert-success");
                        $("#generalMessage").html(response.message);
                        $("#generalMessage").show();
                        setTimeout(function () {
                            $("#generalMessage").hide();
                        }, 3000);
                    } else {
                        $("#generalMessage").removeClass("alert-success").addClass("alert-danger");
                        $("#generalMessage").html(response.message);
                        $("#generalMessage").show();
                        setTimeout(function () {
                            $("#generalMessage").hide();
                        }, 3000);
                    }
                }
            });
        }
    });
}

//Countery/Cost
function getCountries() {
    $('#tableCountries').DataTable({
        "ajax": global_site_url + "admin/WhatsApp/get_countries",
        "columns": [
            {
                "data": "id",
                "render": function (data, type, row, meta) {
                    return meta.row + meta.settings._iDisplayStart + 1;
                }
            },
            {"data": "country_code"},
            {"data": "name_en"},
            {"data": "min_number_count"},
            {"data": "max_number_count"},
            {"data": "price"},
            {
                "data": "status",
                "render": function (data, type, row, meta) {
                    if (data == 1) {
                        return "Active";
                    } else {
                        return "In-Active";
                    }
                }
            },
            {
                "data": "status",
                "render": function (data, type, row, meta) {
                    return `<button type="button" class="btn btn-icon-only purple" onclick='openEditModal(` + row.id + `)'><i class="fa fa-edit"></i></button>`;
                }
            }
        ]
    });
}

function openEditModal(id) {
    $.ajax({
        type: "GET",
        url: global_site_url + "admin/WhatsApp/get_country_by_id",
        data: {id: id},
        dataType: 'json',
        success: function (response) {
            if (response.status == 'success') {
                var data = response.data;
                $("#id").val(data.id);
                $("#name").val(data.name_en);
                $("#min_number_count").val(data.min_number_count);
                $("#max_number_count").val(data.max_number_count);
                $("#price").val(data.price);
                $("#status").val(data.status);
                $("#countryCostModal").modal();
            }
        }
    });
}

$("#countryResponseMessage").hide();
$("#countryCostErrorMessage").hide();
function updateCountryCost() {
    $("#countryCostForm").validate({
        rules: {
            min_number_count: {
                required: true
            },
            max_number_count: {
                required: true
            },
            price: {
                required: true
            },
            status: {
                required: true
            }
        },
        invalidHandler: function (event, validator) {
            var errors = validator.numberOfInvalids();
            if (errors) {
                $("#countryCostErrorMessage").removeClass("alert-success").addClass("alert-danger");
                var errorMessage = "Please Fillup The Required Fields";
                $("#countryCostErrorMessage").html(errorMessage);
                $("#countryCostErrorMessage").show();
                setTimeout(function () {
                    $("#countryCostErrorMessage").hide();
                }, 3000);
            } else {
                $("#countryCostErrorMessage").hide();
            }
        },
        submitHandler: function (form) {
            $.ajax({
                type: "POST",
                url: global_site_url + "admin/WhatsApp/update_country_cost",
                data: $('#countryCostForm').serialize(),
                dataType: 'json',
                success: function (response) {
                    if (response.status == 'success') {
                        $("#countryResponseMessage").removeClass("alert-danger").addClass("alert-success");
                        $("#countryResponseMessage").html(response.message);
                        $("#countryResponseMessage").show();
                        $("#countryCostModal").modal('hide');
                        $('#tableCountries').DataTable().ajax.reload(null, false);
                        setTimeout(function () {
                            $("#countryResponseMessage").hide();
                        }, 3000);
                    } else {
                        $("#countryResponseMessage").removeClass("alert-success").addClass("alert-danger");
                        $("#countryResponseMessage").html(response.message);
                        $("#countryResponseMessage").show();
                        setTimeout(function () {
                            $("#countryResponseMessage").hide();
                        }, 3000);
                    }
                }
            });
        }
    });
}

//Senders
function readSenders() {
    $('#tableSenders').DataTable({
        "ajax": global_site_url + "admin/WhatsApp/read_senders",
        "columns": [
            {
                "data": "id",
                "render": function (data, type, row, meta) {
                    return meta.row + meta.settings._iDisplayStart + 1;
                }
            },
            {"data": "username"},
            {"data": "balance"},
            {"data": "name"},
            {"data": "address"},
            {"data": "email"},
            {"data": "website"},
            {"data": "logo_link"},
            {"data": "note"},
            {
                "data": "status",
                "render": function (data, type, row, meta) {
                    if (data == 0) {
                        return "Pending";
                    } else if (data == 1) {
                        return "Active";
                    } else {
                        return "Suspend";
                    }
                }
            },
            {"data": "created_at"},
            {
                "data": "status",
                "render": function (data, type, row, meta) {
                    return `<button type="button" class="btn btn-icon-only purple" onclick='openEditSenderModal(` + row.id + `)'><i class="fa fa-edit"></i></button>`;
                }
            }
        ]
    });
}

$("#senderMessage").hide();
$("#senderErrorMessage").hide();
function openEditSenderModal(id) {
    $.ajax({
        type: "GET",
        url: global_site_url + "admin/WhatsApp/get_sender_by_id",
        data: {id: id},
        dataType: 'json',
        success: function (response) {
            if (response.status == 'success') {
                var data = response.data;
                $("#senderId").val(data.id);
                $("#senderUsername").val(data.username);
                $("#senderName").val(data.name);
                $("#senderAdd").val(data.address);
                $("#senderEmail").val(data.email);
                $("#senderWebsite").val(data.website);
                $("#senderLogoUrl").val(data.logo_link);
                $("#senderNote").val(data.note);
                $("#senderUpdateModal").modal();
            }
        }
    });
}

function updateSender() {
    $("#senderUpdateForm").validate({
        rules: {
            senderName: {
                required: true
            },
            senderUsername: {
                required: true
            },
            status: {
                required: true
            }
        },
        invalidHandler: function (event, validator) {
            var errors = validator.numberOfInvalids();
            if (errors) {
                $("#senderErrorMessage").removeClass("alert-success").addClass("alert-danger");
                var errorMessage = "Please Fillup The Required Fields";
                $("#senderErrorMessage").html(errorMessage);
                $("#senderErrorMessage").show();
                setTimeout(function () {
                    $("#senderErrorMessage").hide();
                }, 3000);
            } else {
                $("#senderErrorMessage").hide();
            }
        },
        submitHandler: function (form) {
            $.ajax({
                type: "POST",
                url: global_site_url + "admin/WhatsApp/update_sender",
                data: $('#senderUpdateForm').serialize(),
                dataType: 'json',
                success: function (response) {
                    if (response.status == 'success') {
                        $("#senderMessage").removeClass("alert-danger").addClass("alert-success");
                        $("#senderMessage").html(response.message);
                        $("#senderMessage").show();
                        $("#senderUpdateModal").modal('hide');
                        $('#tableSenders').DataTable().ajax.reload(null, false);
                        setTimeout(function () {
                            $("#senderMessage").hide();
                        }, 3000);
                    } else {
                        $("#senderErrorMessage").removeClass("alert-success").addClass("alert-danger");
                        $("#senderErrorMessage").html(response.message);
                        $("#senderErrorMessage").show();
                        setTimeout(function () {
                            $("#senderErrorMessage").hide();
                        }, 3000);
                    }
                }
            });
        }
    });
}

//User Senders
$("#whatsAppUserSenderMessage").hide();
function readUserSenderName() {
    $('#tableWhatsAppUserSenderName').DataTable({
        "ajax": global_site_url + "user/WhatsApp/read_sender_name",
        "columns": [
            {
                "data": "id",
                "render": function (data, type, row, meta) {
                    return meta.row + meta.settings._iDisplayStart + 1;
                }
            },
            {"data": "name"},
            {"data": "address"},
            {"data": "email"},
            {"data": "website"},
            {"data": "logo_link"},
            {"data": "note"},
            {
                "data": "status",
                "render": function (data, type, row, meta) {
                    if (data == 0) {
                        return "Pending";
                    } else if (data == 1) {
                        return "Active";
                    } else {
                        return "Suspend";
                    }
                }
            },
            {"data": "created_at"},
            {
                "data": "status",
                "render": function (data, type, row, meta) {
                    var button = '';
                    if (data == 0) {
                        button += `<a type="button" style="margin-right:5px;" class="btn btn-icon-only purple" onclick='openUserSenderUpdateModal(` + row.id + `)'><i class="fa fa-edit"></i></a>`;
                    }

                    button += `<a type="button" style="margin-right:5px;" class="btn btn-icon-only red" onclick='openUserSenderDeleteModal(` + row.id + `)'><i class="fa fa-trash"></i></a>`;
                    return button;
                }
            }
        ]
    });
}

function addUserSenderModal() {
    $("#userSenderForm")[0].reset();
    $("#userSenderForm").validate().destroy();
    $("#userSenderErrorMessage").hide();
    $("#userSenderModal").modal();
}

$("#userSenderErrorMessage").hide();
function userSenderSave() {
    $("#userSenderForm").validate({
        rules: {
            senderName: {
                required: true
            }
        },
        invalidHandler: function (event, validator) {
            var errors = validator.numberOfInvalids();
            if (errors) {
                $("#userSenderErrorMessage").removeClass("alert-success").addClass("alert-danger");
                var errorMessage = "Please Fillup The Required Fields";
                $("#userSenderErrorMessage").html(errorMessage);
                $("#userSenderErrorMessage").show();
                setTimeout(function () {
                    $("#userSenderErrorMessage").hide();
                }, 3000);
            } else {
                $("#userSenderErrorMessage").hide();
            }
        },
        submitHandler: function (form) {
            $.ajax({
                type: "POST",
                url: global_site_url + "user/WhatsApp/send_user_sender_request",
                data: $('#userSenderForm').serialize(),
                dataType: 'json',
                success: function (response) {
                    if (response.status == 'success') {
                        $("#whatsAppUserSenderMessage").removeClass("alert-danger").addClass("alert-success");
                        $("#whatsAppUserSenderMessage").html(response.message);
                        $("#whatsAppUserSenderMessage").show();
                        $("#userSenderModal").modal('hide');
                        $('#tableWhatsAppUserSenderName').DataTable().ajax.reload(null, false);
                        setTimeout(function () {
                            $("#whatsAppUserSenderMessage").hide();
                        }, 3000);
                    } else {
                        $("#userSenderErrorMessage").removeClass("alert-success").addClass("alert-danger");
                        $("#userSenderErrorMessage").html(response.message);
                        $("#userSenderErrorMessage").show();
                        setTimeout(function () {
                            $("#userSenderErrorMessage").hide();
                        }, 3000);
                    }
                }
            });
        }
    });

}

$("#userSenderUpdateErrorMessage").hide();
function openUserSenderUpdateModal(id) {
    $.ajax({
        type: "GET",
        url: global_site_url + "user/WhatsApp/get_sender_by_id",
        data: {id: id},
        dataType: 'json',
        success: function (response) {
            if (response.status == 'success') {
                var data = response.data;
                $("#userSenderId").val(data.id);
                $("#senderNameUpdate").val(data.name);
                $("#senderAddUpdate").val(data.address);
                $("#senderEmailUpdate").val(data.email);
                $("#senderWebsiteUpdate").val(data.website);
                $("#senderLogoUrlUpdate").val(data.logo_link);
                $("#senderNoteUpdate").val(data.note);
                $("#userSenderUpdateModal").modal();
            } else {
                $("#whatsAppUserSenderMessage").removeClass("alert-success").addClass("alert-danger");
                $("#whatsAppUserSenderMessage").html(response.message);
                $("#whatsAppUserSenderMessage").show();
                setTimeout(function () {
                    $("#whatsAppUserSenderMessage").hide();
                }, 3000);

            }
        }
    });

}

function userSenderUpdate() {
    $("#userSenderUpdateForm").validate({
        rules: {
            senderName: {
                required: true
            }
        },
        invalidHandler: function (event, validator) {
            var errors = validator.numberOfInvalids();
            if (errors) {
                $("#userSenderUpdateErrorMessage").removeClass("alert-success").addClass("alert-danger");
                var errorMessage = "Please Fillup The Required Fields";
                $("#userSenderUpdateErrorMessage").html(errorMessage);
                $("#userSenderUpdateErrorMessage").show();
                setTimeout(function () {
                    $("#userSenderUpdateErrorMessage").hide();
                }, 3000);
            } else {
                $("#userSenderUpdateErrorMessage").hide();
            }
        },
        submitHandler: function (form) {
            $.ajax({
                type: "POST",
                url: global_site_url + "user/WhatsApp/update_user_sender_request",
                data: $('#userSenderUpdateForm').serialize(),
                dataType: 'json',
                success: function (response) {
                    if (response.status == 'success') {
                        $("#whatsAppUserSenderMessage").removeClass("alert-danger").addClass("alert-success");
                        $("#whatsAppUserSenderMessage").html(response.message);
                        $("#whatsAppUserSenderMessage").show();
                        $("#userSenderUpdateModal").modal('hide');
                        $('#tableWhatsAppUserSenderName').DataTable().ajax.reload(null, false);
                        setTimeout(function () {
                            $("#whatsAppUserSenderMessage").hide();
                        }, 3000);
                    } else {
                        $("#userSenderUpdateErrorMessage").removeClass("alert-success").addClass("alert-danger");
                        $("#userSenderUpdateErrorMessage").html(response.message);
                        $("#userSenderUpdateErrorMessage").show();
                        setTimeout(function () {
                            $("#userSenderUpdateErrorMessage").hide();
                        }, 3000);
                    }
                }
            });
        }
    });
}

function openUserSenderDeleteModal(id) {
    $("#deleteId").val(id);
    $("#userSenderDeleteModal").modal();
}

function userSenderDelete() {
    $.ajax({
        type: "POST",
        url: global_site_url + "user/WhatsApp/delete_user_sender",
        data: $('#userSenderDeleteForm').serialize(),
        dataType: 'json',
        success: function (response) {
            if (response.status == 'success') {
                $("#whatsAppUserSenderMessage").removeClass("alert-danger").addClass("alert-success");
                $("#whatsAppUserSenderMessage").html(response.message);
                $("#whatsAppUserSenderMessage").show();
                $('#tableWhatsAppUserSenderName').DataTable().ajax.reload(null, false);
            } else {
                $("#whatsAppUserSenderMessage").removeClass("alert-success").addClass("alert-danger");
                $("#whatsAppUserSenderMessage").html(response.message);
                $("#whatsAppUserSenderMessage").show();
            }

            $("#userSenderDeleteModal").modal('hide');
            setTimeout(function () {
                $("#whatsAppUserSenderMessage").hide();
            }, 3000);
        }
    });

}