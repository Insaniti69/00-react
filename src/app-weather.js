const reactSection = document.querySelector('#react-section')
const h1 = document.querySelector('h1')

class CodeCountry extends React.Component {
	render(){
		console.log(this.props.countryName)
		return <div>
			<h2>CODE {this.props.code}</h2>
			{this.props.countryName === 'Spain' && <p>{this.props.countryName}</p>}
		</div>
	}
}

async function getIp(){
	const data = await axios.get('https://www.cloudflare.com/cdn-cgi/trace')
	const regex = /ip=(.*?)$/gmi
	const ip = regex.exec(data.data)
	const dataIp = await axios.get(`http://api.ipstack.com/${ip[1]}?access_key=479532addda6a49c78cd6860c0f9ffb4&format=1`)
	const countryName = await getCountryInfo(dataIp.data.country_code)
	h1.textContent = `Your ip ${ip[1]} is located in ${countryName.data.name}`
}

function getCountryInfo(code){
	return axios.get(`https://restcountries.eu/rest/v2/alpha/${code}`)
}

const getCountry = async(e) =>{
	try{
		const code = e.value
		const res = await getCountryInfo(e.value)
		if(res.data.alpha2Code.toLowerCase() === code.toLowerCase()){
			ReactDOM.render(<CodeCountry code={code} countryName={res.data.name}/>,reactSection)
		}
	}catch (e){
		ReactDOM.render(<CodeCountry code="Not Found" countryName="Not Found"/>,reactSection)
	}
}

getIp()