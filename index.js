function addSocksCard(params) {

    const template = document.querySelector("#catalogo-template");
    const container = document.querySelector(".catalogo-contenedor");

    template.content.querySelector(".sock-img").src = params.img;
    template.content.querySelector(".titulo").textContent = params.title;
    template.content.querySelector(".precio").textContent = "$ " + params.price;


    var clone = document.importNode(template.content, true);
    container.appendChild(clone);
};

function getSocks() {
    const api = "https://cdn.contentful.com/spaces/9q9oe5euxfzw/environments/master/entries?access_token=-V2I4w9sW7Kn7oNQU0ieDpn3YEvsatJ1gNcyRGfqiPw";

    return fetch(api)
        .then(res => {
            return res.json()
        })
        .then((data) => {

            console.log(data);

            var fieldsCollections = data.includes.Asset.map((item) => {

                return {
                    title: item.fields.title,
                    price: item.fields.description,
                    img: item.fields.file.url
                }
            })

            return fieldsCollections;

        });
}

function main() {
    getSocks().then(function (medias) {
        for (const m of medias) {
            addSocksCard(m);
        }
    })
};

main()

