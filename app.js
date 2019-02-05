
async function get(url){
  const response = await fetch(url);
  const resData = response.json();
  return resData;
}


//get the list of currencies
get('http://apilayer.net/api/list?access_key=07681efcccebdce0607eb820f6b00e3d')
  .then(data => {
    const list = data.currencies;
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
      let sourceIndex = document.querySelector('#base-currency').selectedIndex;

      let currenciesIndex = document.querySelector('#converted-currency').selectedIndex;
           
      get(`http://apilayer.net/api/live?access_key=07681efcccebdce0607eb820f6b00e3d&source=${keys[sourceIndex]}`)
        .then(data => {
          const quotes = data.quotes;
          const i = keys[sourceIndex] + keys[currenciesIndex];
          const quotesIndexes = Object.keys(quotes)
          quotesIndexes.forEach(function(quotesIndex){
            // console.log(quotesIndex);
            // console.log(i);
            if(quotesIndex == i){
              const value = document.querySelector('#input-bc').value

              const result = value * quotes[quotesIndex];
              
              document.querySelector('#input-cc').value = result.toFixed(2);
            }
          });
        })
        
    }

    calculate();

    document.querySelector('#input-bc').addEventListener('keydown', calculate);

    document.querySelector('#base-currency').addEventListener('click', calculate);

    document.querySelector('#converted-currency').addEventListener('click', calculate);
  })


