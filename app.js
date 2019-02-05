
async function get(url){
  const response = await fetch(url);
  const resData = response.json();
  return resData;
}


//get the list of currencies
get('https://openexchangerates.org/api/currencies.json?app_id=3f4e150b3eaa4cd0ac6c0ad3be19c1a8')
  .then(data => {
    const list = data;
    keys = Object.keys(list);
    // create a 'option' element for each list item
    keys.forEach(function(key){
      const option = document.createElement('option');
      const textNode = document.createTextNode(list[key]);
      option.appendChild(textNode);

      option.setAttribute('id', key);
      if(key == 'USD'){
        option.setAttribute('selected', '');
        document.querySelector('#input-bc').value = 1;
      }

      // append 'option' element to the firs 'select' element (base-currency)
      document.querySelector('#base-currency').appendChild(option);
    })

    keys.forEach(function(key){
      const option = document.createElement('option');
      const textNode = document.createTextNode(list[key]);
      option.appendChild(textNode);

      option.setAttribute('id', 'C-'+ key);

      // append 'option' element to the firs 'select' element (base-currency)
      document.querySelector('#converted-currency').appendChild(option);
    })

    function calculate() {
      let baseIndex = document.querySelector('#base-currency').selectedIndex;

      let currencieIndex = document.querySelector('#converted-currency').selectedIndex;
           
      get(`https://openexchangerates.org/api/latest.json?app_id=3f4e150b3eaa4cd0ac6c0ad3be19c1a8&base=${keys[baseIndex]}`)
        .then(data => {
          const rates = data.rates;
          const i = keys[currencieIndex];
          const ratesIndexes = Object.keys(rates);

          ratesIndexes.forEach(function(ratesIndex){
            if (ratesIndex == i){
              const value = document.querySelector('#input-bc').value;
              const result = value * rates[ratesIndex];
              
              document.querySelector('#input-cc').value = result.toFixed(2);
            }
          })


        })
        
    }

    calculate();

    document.querySelector('#input-bc').addEventListener('keydown', calculate);

    document.querySelector('#base-currency').addEventListener('click', calculate);

    document.querySelector('#converted-currency').addEventListener('click', calculate);
  })


