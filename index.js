const root = ReactDOM.createRoot(document.getElementById("root"))

function Currencies() {
    const header = new Headers()
    header.append("apikey", api_token.apikey)

    const [value, setValue] = React.useState(1)
    const [data, setData] = React.useState([])
    const [list_currencies, setListCurrencies] = React.useState([])
    const [currency, setCurrency] = React.useState("AED")

    const req_sets = {headers: header}

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

    const result = Number(data*value)
    const price = result.toLocaleString("pt-BR", {style:"currency", currency:"BRL"})

    return (
        <section id="content">
            <h1>Cotação de moedas</h1>
            <select 
                className="entries" 
                onChange={(e) => setCurrency(e.target.value)}> 
                {list_currencies.map((currencies, index) => <option key={index}>{currencies}</option>)}
            </select>

            <input 
                type="number"
                className="entries"
                placeholder="Quantidade" 
                min="1"
                max="10000000000"
                onChange={(e) => setValue(e.target.value)}>
            </input>

            <h2>Cotação atual: <span id="bid">{price}</span></h2>
        </section>
    )
}

function App() {
    return (
        <div>
            <Currencies/>
        </div>
    )
}

root.render(<App/>)