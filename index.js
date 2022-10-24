const root = ReactDOM.createRoot(document.getElementById("root"))

function Currencies() {
    const [currency, setCurrency] = React.useState("USD")
    const [data, setData] = React.useState([])
    
    React.useEffect(() => {
        fetch(`https://economia.awesomeapi.com.br/json/last/${currency}-BRL`)
        .then(response => response.json())
        .then(output => setData(output[`${currency}BRL`]))
    }, [currency])

    const bid = Number(data.bid).toLocaleString("pt-BR", {style:"currency", currency:`${currency}`})
    
    return (
        <section id="content">
            <h1>Cotação de moedas</h1>
            <button className="currencies" onClick={() => setCurrency("EUR")}>Euro</button>
            <button className="currencies" onClick={() => setCurrency("USD")}>Dólar</button>
            <button className="currencies" onClick={() => setCurrency("GBP")}>Libra</button>

            <h2>Cotação atual: <span id="bid">{bid}</span></h2>
        </section>
    )
}


function App() {
    return (
        <Currencies/>
    )
}

root.render(<App/>)