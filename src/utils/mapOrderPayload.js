function mapOrderPayload(input) {
    if (!input) {
        throw new Error("Payload de pedido é obrigatório!")
    }

    const { numeroPedido, valorTotal, dataCriacao, items } = input;

    if (!numeroPedido) {
        throw new Error("numeroPedido é obrigatório!")
    }

    if (!valorTotal) {
        throw new Error("valorTotal é obrigatório!")
    }

    if (!dataCriacao) {
        throw new Error("dataCriacao é obrigatória!")
    }

    if (!Array.isArray(items) || items.length === 0) {
        throw new Error("items deve conter pelo menos um item!")
    }

    const mappedItems = items.map((item, index) => {
        const { idItem, quantidadeItem, valorItem } = item;

        if (!idItem) {
            throw new Error(`items[${index}].idItem é obrigatório!`);
        }

        if (quantidadeItem == null) {
            throw new Error(`items[${index}].quantidadeItem é obrigatório!`)
        }

        if (valorItem == null) {
            throw new Error(`items[${index}].valorItem é obrigatório!`)
        }

        return {
            productId: String(idItem),
            quantity: quantidadeItem,
            price: valorItem
        };
    });

    return {
        orderId: String(numeroPedido),
        value: valorTotal,
        creationDate: new Date(dataCriacao),
        items: mappedItems
    };
}

module.exports = mapOrderPayload;