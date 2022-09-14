(function () {
    ////// DO NOT TOUCH
    [id] = Handlebars.compile(script.innerHTML);

    ///// DO NOT TOUCH

    var juniperObj = {
        name: "Juniper",
        nickname: "Junes",
        favoriteFoods: [
            "pizza",
            "currywurst",
            "rainbow cake",
            "rice",
            "hamburgers",
        ],
    };

    // 1st. Connect the 3 elements
    $(".juniper-container").html(Handlebars.templates.juniperId(juniperObj));
})();
