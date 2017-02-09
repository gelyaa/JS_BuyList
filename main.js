$(function () {
    addItem("Tomatoes");
    addItem("Cookies");
    addItem("Cheese");
});

$(function () {
    $('.addbutton').click(function () {
        addItem_getName();
    });
    $(".input").keypress(function () {
        if (event.which == 13) addItem_getName();
    });
});

var LIST_OF_ITEMS = $('.items-list');
var LIST_OF_LEFT_ITEMS = $('.items-left');
var LIST_OF_BOUGHT_ITEMS = $('.items-bought');
var ITEM_TEMPLATE = $('.template-item').html();
var LABEL_TEMPLATE = $('.template-label').html();

function addItem_getName() {
    var toAdd = $('.input').val();
    //if(toAdd.length > 20) alert("Number of characters: 1-20."); else
    if (toAdd.length != 0) addItem(toAdd);
}

function addItem(title) {
    var node = $(ITEM_TEMPLATE);
    var label = $(LABEL_TEMPLATE);
    label.find('.item').text(title);
    node.find('.name').text(title);
    node.find('.cancelbutton').click(function () {
        $(node).slideUp(function () {
            node.remove();
            label.fadeOut(function(){
                label.remove();
            });
        });
    });
    LIST_OF_ITEMS.append(node);
    LIST_OF_LEFT_ITEMS.append(label);
    $(node).hide().slideDown("slow");
    $(label).hide().fadeIn();
    $('.input').val("").focus();

    node.find('.name').on('click', function () {
        var name = $(this);
        if(!$(node).hasClass('bought-mode'))
            editMode(name,node,label);
    });

    node.find('.boughtbutton').click(function () {
        bought_not_bought_Mode(node);
        boughtMode(label);
    });
    node.find('.notboughtbutton').click(function () {
        bought_not_bought_Mode(node);
        notBoughtMode(label);
    });

    node.find('.plusbutton').click(function () {
        plus(node,label);
    });
    node.find('.minusbutton').click(function () {
        minus(this,node,label);
    });

}

function bought_not_bought_Mode(node){
    $(node).find('.line').fadeOut(function(){
        $(node).toggleClass('bought-mode');
    });
    $(node).find('.line').fadeIn();
}

function boughtMode(label){
    $(label).addClass('bought-mode');
    LIST_OF_BOUGHT_ITEMS.append(label);
    LIST_OF_LEFT_ITEMS.hide(label);
}

function notBoughtMode(label){
    $(label).removeClass('bought-mode');
    LIST_OF_LEFT_ITEMS.append(label);
    LIST_OF_BOUGHT_ITEMS.hide(label);
}

function plus(node,label){
    var quantity = node.find('.quantity');
    var num = parseInt(quantity.html());
    quantity.fadeOut(function(){
        quantity.text(1+num);
    });
    quantity.fadeIn();
    if(num==1) node.find('.minusbutton').attr("disabled", false);
    label.find('.quantity2').text(num+1);
}

function minus(button,node,label){
    var quantity =  node.find('.quantity');
    var num = parseInt(quantity.html());
    if(num == 2)  $(button).attr("disabled", true);
    quantity.fadeOut(function(){
        quantity.text(num-1);
    });
    quantity.fadeIn();
    label.find('.quantity2').text(num-1);
}

function editMode(name,node,label){
    var input = $(node).find('.input-edit');
    $(node).addClass('edit-mode');
    $(input).focus();
    $(input).val(name.html());
    $('.name-edit').focusout(function () {
        var newName = $(input).val();
        if (newName.length != 0) {
            label.find('.item').text(newName);
            $(name).text(newName);
        }
        $(node).removeClass('edit-mode');
    });
}