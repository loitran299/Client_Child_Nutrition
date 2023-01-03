
class KichBan2 {
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
            let param = me.collectData();

            $.ajax({
                type: "POST",
                url: `http://localhost:8081/api/kichBan2?hienTuong=${param}`,
                contentType: "application/json",
                dataType: "json",
                error: function (response) {
                    console.log(response);
                },
                success: function (response) {
                    me.modal.find('#message').empty();
                    me.modal.find('#message').append($(`<span style="white-space: pre-line" class="message">${response.message}</span>`));
                    me.modal.show();
                },

            });

        });
        me.selectBoxEvents();
        me.popupEvents();
    }

    collectData() {
        let me = this;
        let items = $('.item.checked');
        let arr = [];
        for(let i = 0; i< items.length; i++) {
            arr.push(items[i].outerText)
        }
        let query = arr.join(";");
        return query
    }

    getData() {

    }

    popupEvents() {
        let me = this;
        me.modal.hide();
        me.modal.find("#iconClose").click(() => {
            me.modal.toggle();
        })
        me.modal.find("#btnClose").click(() => {
            me.modal.toggle();
        })
    }

    async selectBoxEvents() {
        let me = this;

        await me.initBoxData();
        const selectBtn = $(".select-btn");
        let listItems = $('.list-items');

        selectBtn.click(() => {
            listItems.toggle();
            selectBtn.toggleClass("open");
        });

    }

    initBoxData() {
        let me = this;
        let listItems = $('.list-items');
        listItems.empty();
        $.ajax({
            type: "GET",
            url: "http://localhost:8081/api/hien-tuong",
            contentType: "application/json",
            dataType: "json",
            error: function (response) {
                console.log(response);
            },
            success: function (response) {
                response.forEach((item) => {
                    let li = $(`<li class="item">
                                    <span class="checkbox">
                                        <i class="fa-solid fa-check check-icon"></i>
                                    </span>
                                    <span class="item-text">${item.bieuHien}</span>
                                </li>`)
                    li.data("data", item);
                    li.click(() => {
                        li.toggleClass("checked");
        
                        let checked = $(".checked"),
                            btnText = $(".btn-text");
        
                        if (checked && checked.length > 0) {
                            btnText.innerText = `${checked.length} Selected`;
                        } else {
                            btnText.innerText = "Chọn hiện tượng";
                        }
                    });
                    listItems.append(li);
                })
            },

        });

    }
}

let kichBan2 = new KichBan2("form2");