document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.cost-item').forEach(item => {
        item.addEventListener('change', function() {
            updateTotalCost();
        });
    });

    function updateTotalCost() {
        const costs = Array.from(document.querySelectorAll('.cost-item:checked')).map(item => parseInt(item.dataset.cost));
        fetch(`http://localhost:4000/api/total-repair-cost?costs=${costs.join(',')}`)
            .then(response => response.json())
            .then(data => {
                document.getElementById('repairCost').innerText = `Total Repair Cost: $${data.total}`;
            })
            .catch(error => console.error('Error:', error));
    }

    document.getElementById('carForm').addEventListener('submit', function(event) {
        event.preventDefault();
        let askingPrice = parseFloat(document.getElementById('askingPrice').value);
        let perfectConditionPrice = parseFloat(document.getElementById('perfectConditionPrice').value);
        let repairCostText = document.getElementById('repairCost').textContent;
        let repairCost = parseFloat(repairCostText.substring(repairCostText.indexOf('$') + 1));

        fetch('http://localhost:4000/api/car-evaluation', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ askingPrice, perfectConditionPrice, repairCost })
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            document.getElementById('notification').textContent = data.message;
            document.getElementById('notification').style.display = 'block';
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('notification').textContent = "Failed to evaluate the car";
            document.getElementById('notification').style.display = 'block';
        });
    });

    document.getElementById('donateButton').onclick = function() {
        fetch('http://localhost:4000/api/button-style', {
            method: 'PUT', 
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ color: '#d67e5b' })
        })
        .then(response => response.json())
        .then(data => {
            console.log(data.message);
            this.style.backgroundColor = '#d67e5b'; 
        })
        .catch(error => console.error('Error:', error));
    };
});
