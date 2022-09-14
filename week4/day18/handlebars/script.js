// 1st. Handlebars setup
/////////// do not touch ////////////
Handlebars.templates = Handlebars.templates || {};

var templates = document.querySelectorAll('script[type="text/x-handlebars-template"]');

templates.forEach(function (script) {
    Handlebars.templates[script.id] = Handlebars.compile(script.innerHTML);
});
/////////// do not touch ////////////

// 2nd.
// Get the data

// JS object method
/*
var authorData = {
    authors: [
        {
            name: "Kahlil Gibran",
            image: "https://upload.wikimedia.org/wikipedia/commons/3/34/Kahlil_Gibran_1913.jpg",
            born: 1883,
            died: 1931,
            selectedWritings: ["The Prophet", "Sand and Foam", "The Earth Gods"],
            quote: "We live only to discover beauty. All else is a form of waiting.",
            photo: "https://upload.wikimedia.org/wikipedia/commons/3/34/Kahlil_Gibran_1913.jpg",
        },
        {
            name: "Oscar Wilde",
            image: "https://www.maenner.media/downloads/56983/download/Bildschirmfoto%202019-01-24%20um%2010.44.34.png?cb=4cd53cb0ae35b83097d578effc4c33c6",
            born: 1854,
            died: 1900,
            selectedWritings: ["The Picture of Dorian Gray", "The Importance of Being Earnest", "De Profundis"],
            quote: "The bureaucracy is expanding to meet the needs of the expanding bureaucracy.",
            photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Oscar_Wilde_Sarony.jpg/800px-Oscar_Wilde_Sarony.jpg",
        },
        {
            name: "Maya Angelou",
            image: "https://i.etsystatic.com/9295365/r/il/4a1a13/1769914734/il_570xN.1769914734_bj50.jpg",
            born: 1928,
            died: 2014,
            selectedWritings: ["I Know Why the Caged Bird Sings", "Gather Together in My Name", "The Heart of a Woman"],
            quote: "I've learned that people will forget what you said, people will forget what you did, but people will never forget how you made them feel.",
            photo: "https://upload.wikimedia.org/wikipedia/commons/b/b4/Angelou_at_Clinton_inauguration.jpg",
        },
    ],
};
console.log("authorData :", authorData);
*/

// ajax method
var ajaxData;

$.ajax({
    url: "data.json",
    method: "GET",
    data: {
        limit: 3,
    },
    success: function (data) {
        ajaxData = data;

        console.log("ajaxData :", ajaxData);

        // 3rd. Link all 3 elements (div, template & data)
        $(".author-info").html(Handlebars.templates.authorId(ajaxData));
    },
});
