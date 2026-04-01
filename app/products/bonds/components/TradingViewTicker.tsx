"use client";

import React, { useEffect, useRef } from 'react';

const TradingViewTicker: React.FC = () => {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (container.current) {
      container.current.innerHTML = '';
      const widgetDiv = document.createElement('div');
      widgetDiv.className = 'tradingview-widget-container__widget';
      container.current.appendChild(widgetDiv);

      const script = document.createElement("script");
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
      script.type = "text/javascript";
      script.async = true;
      script.innerHTML = JSON.stringify({
        "symbols": [
          {
            "proName": "FOREXCOM:SPXUSD",
            "title": "S&P 500 Index"
          },
          {
            "proName": "FX_IDC:USDINR",
            "title": "USD/INR"
          },
          {
            "description": "SENSEX",
            "proName": "BSE:SENSEX"
          },
          {
            "description": "BSE BANKEX",
            "proName": "BSE:BANKEX"
          },
          {
            "description": "India 10Y",
            "proName": "TVC:IN10Y"
          },
          {
            "description": "Gold",
            "proName": "OANDA:XAUUSD"
          }
        ],
        "showSymbolLogo": true,
        "isTransparent": false,
        "displayMode": "adaptive",
        "colorTheme": "light",
        "locale": "en"
      });
      container.current.appendChild(script);
    }
  }, []);

  return (
    <div className="tradingview-widget-container" ref={container}>
      <div className="tradingview-widget-container__widget"></div>
    </div>
  );
};

export default TradingViewTicker;
