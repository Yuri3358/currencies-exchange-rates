const root = ReactDOM.createRoot(document.getElementById("root"))

function Currencies() {
    const header = new Headers()
    header.append("apikey", api_token.apikey)

    const [currency, setCurrency] = React.useState("USD")
    const [data, setData] = React.useState([])
    const [list_currencies, setListCurrencies] = React.useState([])
    const req_sets = {
        headers: header,
    }

    React.useEffect(() => {
    fetch(`https://api.apilayer.com/exchangerates_data/latest?symbols=BRL&base=${currency}`, req_sets)
    .then(response => response.json())
    .then(output => setData(output.rates.BRL))
    }, [currency])

    React.useEffect(() => {
        fetch(`https://api.apilayer.com/exchangerates_data/symbols`, req_sets)
        .then(response => response.json())
        .then(output => setListCurrencies(Object.keys(output.symbols)))
    }, [currency])

    const price = data.toLocaleString("pt-BR", {style:"currency", currency:"BRL"})
    
    return (
        <section id="content">
            <h1>Cotação de moedas</h1>
            <select id="currency_list" onChange={(e) => setCurrency(e.target.value)}> 
                {list_currencies.map((currencies, index) => <option key={index}>{currencies}</option>)}
            </select>
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