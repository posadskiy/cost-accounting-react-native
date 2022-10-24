import {loadCurrencies} from "../../../actions/moneyActionsActions";

const useReceiveCurrencies = () => {
  const [currencies, setCurrencies] = useState();

  useEffect(() => {
    const receiveCurrencies = async () => {
      const currencies = await loadCurrencies();

      setCurrencies(currencies);
    };

    receiveCurrencies();
  }, [currencies.length]);
  
  return currencies;
}

export default useReceiveCurrencies;
