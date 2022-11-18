const fs = require("fs");

class ContainerChat {
    constructor() {}
    getAll = async () => {
        try {
            const archive = await fs.promises.readFile("./chat.json", "utf-8");
            const products = JSON.parse(archive);
            return products;
        } catch (e) {
            console.log(e);
        }
    };
    save = async (newProduct) => {
        try {
            const products = await this.getAll();
            const id = products.length + 1;
            newProduct.id = id;
            products.push(newProduct);

            const productsString = JSON.stringify(products);

            await fs.promises.writeFile("./chat.json", productsString);
        } catch (e) {
            console.log(e);
        }
    };
};

module.exports = ContainerChat;