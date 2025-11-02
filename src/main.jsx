import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { store } from './store/store';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { FavoritesProvider } from './context/FavoritesContext.jsx'; 
import { ThemeProvider } from './components/theme-provider';
createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <FavoritesProvider> 
      <BrowserRouter>
      <ThemeProvider>
        <App />
        </ThemeProvider>
      </BrowserRouter>
    </FavoritesProvider>
  </Provider>
);
