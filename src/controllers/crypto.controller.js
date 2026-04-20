const { fetchCryptoData } = require("../services/crypto.service");

const getCryptoData = async (req, res) => {
    // const { coins } = req.data;
    try {
        const data = await fetchCryptoData(["bitcoin",
            "ethereum",
            "solana",])
        res.status(200).json({
            success: true,
            data: data
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            data: {
                message: "failed to collect coin data"
            }
        })
    }
}

module.exports = {
    getCryptoData
}