
let data = [];

// Fetch data using async/await
async function fetchData() {
try {
  const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false');
  data = await response.json();
  fetchTable(data);
} catch (error) {
  console.error('Error:', error);
}
}
fetchData();

//Fetching data using .then
/*fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false')
.then(response => response.json())
.then(dataResponse => {
  data = dataResponse;
  fetchTable(data);
})
.catch(error => {
  console.error('Error:', error);
});*/

function fetchTable(data) {
  const tableBody = document.getElementById('tableBody');
  tableBody.innerHTML = '';

  data.forEach(item => {
    const row = document.createElement('tr');
    const percentageChange = item.price_change_percentage_24h;
    const percentageChangeClass = percentageChange >= 0 ? 'positive-change' : 'negative-change';

    row.innerHTML = `
      <td id ="data1"><img src="${item.image}" alt="${item.name}" width="20"></td>
      <td>${item.name}</td>
      <td>${item.symbol}</td>
      <td>${item.id}</td>
      <td>${"$"+item.current_price}</td>
      <td class="${percentageChangeClass}">${item.price_change_percentage_24h}%</td>
      <td>${"Mkt Cap : $"+item.total_volume}</td>
    `;

    row.classList.add('table-row-border');
    tableBody.appendChild(row);
  });
}

document.getElementById('searchBtn').addEventListener('click', () => {
  const searchInput = document.getElementById('searchInput');
  const searchitem = searchInput.value.toLowerCase();

  const filteredData = data.filter(item => {
    const itemName = item.name.toLowerCase();
    const itemSymbol = item.symbol.toLowerCase();
    return itemName.includes(searchitem) || itemSymbol.includes(searchitem);
  });

  fetchTable(filteredData);
});

document.getElementById('sortMktCapBtn').addEventListener('click', () => {
  data.sort((x, y) => y.total_volume - x.total_volume);
  fetchTable(data);
  });

document.getElementById('sortPercentBtn').addEventListener('click', () => {
  data.sort((x, y) => y.price_change_percentage_24h - x.price_change_percentage_24h);
  fetchTable(data);
});