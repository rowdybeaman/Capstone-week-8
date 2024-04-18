module.exports = {
    carEvaluation: (req, res) => {
        const { askingPrice, perfectConditionPrice, repairCost } = req.body;

        const totalCost = askingPrice + repairCost;

        if (totalCost <= perfectConditionPrice) {
            res.json({ message: "The price is Fair based on the information given" });
        } else {
            res.status(400).json({ message: "The price is not Fair based on the information given" });
        }
    },

    calculateRepair: (req, res) => {
        const costs = req.query.costs.split(',').map(cost => parseFloat(cost));
        const total = costs.reduce((acc, curr) => acc + curr, 0);
        res.json({ total: total.toFixed(2) });
    }
};


