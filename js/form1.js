class KichBan{
    constructor(id) {
        let me = this;

        me.form = $(`#${id}`);
        me.modal = $("#modal");

        me.getData();
        me.initEvents();
    }

    initEvents() {
        let me = this;
        let btnSub = me.form.find("#btnSub");
        btnSub.click(function (e) { 
            e.preventDefault();
            let body = me.collectData();
            
            $.ajax({
                type: "POST",
                url: "http://localhost:8081/api/kichBan1",
                data: JSON.stringify(body),
                contentType: "application/json",
                dataType: "json",
                error: function(response) {
                    console.log(response);
                },
                success: function(response) {
                    me.modal.find('#message').empty();
                    me.modal.find('#message').append($(`<span style="white-space: pre-line" class="message">${response.message}</span>`));
                    me.modal.show();
                },

            });

        });

        me.popupEvents();
    }

    collectData () {
        let me = this;
        let gender = me.form.find("#gender").find('input[name="Gender"]:checked').val();
        let year = me.form.find("#year").val();
        let month = me.form.find("#month").val();
        let height =  me.form.find("#height").val();
        let weight =  me.form.find("#weight").val();

        return {
            old: parseInt(year)*12 + parseInt(month),
            weight: weight,
            height: height,
            gender: gender
        }
    }

    getData() {

    }

    popupEvents() {
        let me = this;
        me.modal.hide();
        me.modal.find("#iconClose").click(()=> {
            me.modal.toggle();
        })
        me.modal.find("#btnClose").click(()=> {
            me.modal.toggle();
        })
    }
}

let kichBan = new KichBan("form1");