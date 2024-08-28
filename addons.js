$(document).ready(function() {
    updateCryptoData();
    setInterval(updateCryptoData, 10000); // Update every 10 seconds
});

function updateCryptoData() {
    $.get("https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC,ETH,TON,NOT,DOGS&tsyms=USDT")
        .done(function(data) {
            updateCoinData(data, "BTC", "#btcLogo", "#btcSymbol", "#btcPrice", "#btcChange", "#btcVol", "#btcCap", "#btcTime");
            updateCoinData(data, "ETH", "#ethLogo", "#ethSymbol", "#ethPrice", "#ethChange", "#ethVol", "#ethCap");
            updateCoinData(data, "TON", "#tonLogo", "#tonSymbol", "#tonPrice", "#tonChange", "#tonVol", "#tonCap");
            updateCoinData(data, "NOT", "#notLogo", "#notSymbol", "#notPrice", "#notChange", "#notVol", "#notCap");
            updateCoinData(data, "DOGS", "#dogsLogo", "#dogsSymbol", "#dogsPrice", "#dogsChange", "#dogsVol", "#dogsCap");
        });
}

function updateCoinData(data, coin, logoSelector, symbolSelector, priceSelector, changeSelector, volumeSelector, capSelector, timeSelector = null) {
    const coinData = data.RAW[coin].USDT;
    
    $(logoSelector).html('<img src="https://cryptocompare.com' + coinData.IMAGEURL + '" alt="' + coin + ' Logo">');
    $(symbolSelector).text(coinData.FROMSYMBOL);
    $(priceSelector).text(coinData.PRICE.toLocaleString("en-US", { style: "currency", currency: "USD" }));
    $(changeSelector).text(coinData.CHANGEPCT24HOUR.toFixed(2) + "%")
        .removeClass("positive negative")
        .addClass(coinData.CHANGEPCT24HOUR >= 0 ? "positive" : "negative");
    $(volumeSelector).text(coinData.VOLUME24HOUR.toLocaleString("en-US", { style: "currency", currency: "USD" }));
    $(capSelector).text(coinData.MKTCAP.toLocaleString("en-US", { style: "currency", currency: "USD" }));
    
    if (timeSelector) {
        $(timeSelector).text(new Date(coinData.LASTUPDATE * 1000).toLocaleString());
    }
}
