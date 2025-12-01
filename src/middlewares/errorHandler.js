function errorHandler(err, req, res, next) {
    console.log(err);

    if (err.message && err.message.toLowerCase().includes("Obrigatóri")) {
        return res.status(400).json({ message: err.message });
    }

    return res.status(500).json({
        message: "Erro interno no servidor",
        detail: err.message
    });
}

module.exports = errorHandler;