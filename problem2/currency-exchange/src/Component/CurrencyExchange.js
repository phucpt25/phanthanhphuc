import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  TextField,
  MenuItem,
  Button,
  FormControl,
  InputLabel,
  Select,
  FormHelperText,
  CircularProgress,
  Snackbar,
  Alert,
} from '@mui/material';
const imageStoreURL = 'https://raw.githubusercontent.com/Switcheo/token-icons/20e1a09cdeb28696105a16d9e95b1a5a69532061/tokens/';
const CurrencyExchange = () => {
    const [currencies, setCurrencies] = useState([]);
    const [fromCurrency, setFromCurrency] = useState('');
    const [toCurrency, setToCurrency] = useState('');
    const [amount, setAmount] = useState('');
    const [error, setError] = useState('');
    const [conversionResult, setConversionResult] = useState(null);
    const [loading, setLoading] = useState(true);
    const [openSnackbar, setOpenSnackbar] = useState(false);

    useEffect(() => {
     const fetchData = async () => {
        try{
            const reponse = await axios.get('https://interview.switcheo.com/prices.json');
            setCurrencies(reponse.data);
            setLoading(false);
        } catch(error) {
            console.error(error);
            setLoading(false);
        }
     };

     fetchData();
    }, []);

    const handleConvert = () => {
        if(!fromCurrency || !toCurrency || !amount) {
            setError('All fields is required!');
            return;
        };

        if(amount <= 0){
            setError('Amount must be greater than 0');
            return;
        };
        const fromRate = currencies.find(c => c.currency === fromCurrency).price;
        const toRate = currencies.find(c => c.currency === toCurrency).price;

        if(fromRate && toRate){
            const result = (amount * fromRate) / toRate;
            setConversionResult(result);
            setError('');
            setOpenSnackbar(true);
        } else{
            setError('Something wrong');
        }
    };

    const generateUniqueKey = (currency, index) => `${currency}-${index}`;

    return (
        <Container>
        <Typography variant="h1" gutterBottom>
          Currency Exchange
        </Typography>
        {loading ? (
          <CircularProgress />
        ) : (
          <>
            <FormControl fullWidth margin="normal">
              <InputLabel>From Currency</InputLabel>
              <Select
                value={fromCurrency}
                onChange={(e) => setFromCurrency(e.target.value)}
                label="From Currency"
              >
                {currencies.map((currency, index) => (
                  <MenuItem key={generateUniqueKey(currency.currency, index)} value={currency.currency}>
                    <img
                      src={`${imageStoreURL}${currency.currency}.svg`}
                      alt={currency.currency}
                      style={{ width: 24, height: 24, marginRight: 8 }}
                    />
                    {currency.currency}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>Select the currency to exchange from</FormHelperText>
            </FormControl>
  
            <FormControl fullWidth margin="normal">
              <InputLabel>To Currency</InputLabel>
              <Select
                value={toCurrency}
                onChange={(e) => setToCurrency(e.target.value)}
                label="To Currency"
              >
                {currencies.map((currency, index) => (
                  <MenuItem key={generateUniqueKey(currency.currency, index)} value={currency.currency}>
                    <img
                      src={`${imageStoreURL}${currency.currency}.svg`}
                      alt={currency.currency}
                      style={{ width: 24, height: 24, marginRight: 8 }}
                    />
                    {currency.currency}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>Select the currency to exchange to</FormHelperText>
            </FormControl>
  
            <TextField
              fullWidth
              label="Amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              margin="normal"
              variant="outlined"
            />
  
            <Button variant="contained" color="primary" onClick={handleConvert}>
              Convert
            </Button>
  
            {error && <Typography color="error">{error}</Typography>}
  
            {conversionResult && (
              <Typography variant="body1" margin="normal">
                Conversion Result: {conversionResult}
              </Typography>
            )}
  
            <Snackbar
              open={openSnackbar}
              autoHideDuration={6000}
              onClose={() => setOpenSnackbar(false)}
            >
              <Alert onClose={() => setOpenSnackbar(false)} severity="success">
                Conversion successful!
              </Alert>
            </Snackbar>
          </>
        )}
      </Container>
    )

}

export default CurrencyExchange;