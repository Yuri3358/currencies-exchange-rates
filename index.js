const root = ReactDOM.createRoot(document.getElementById("root"))

function Currencies() {
    const [currency, setCurrency] = React.useState("USD")
    const [data, setData] = React.useState([])
    
    React.useEffect(() => {
        fetch(`https://economia.awesomeapi.com.br/json/last/${currency}-BRL`)
        .then(response => response.json())
        .then(response => setData(response[`${currency}BRL`]))
    }, [currency])
    const bid = Math.round(Number(data.bid)*100) / 100
    const price = bid.toLocaleString("pt-BR", {style:"currency", currency:`${currency}`})
    
    return (
        <section id="content">
            <h1>Cotação de moedas</h1>
            <button className="currencies" onClick={() => setCurrency("EUR")}>Euro</button>
            <button className="currencies" onClick={() => setCurrency("USD")}>Dólar</button>
            <button className="currencies" onClick={() => setCurrency("GBP")}>Libra</button>

            <h2>Cotação atual: <span id="bid">{price}</span></h2>
        </section>
    )
}


function App() {
    return (
        <Currencies/>
    )
}

root.render(<App/>)