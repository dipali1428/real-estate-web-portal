"use client";

import React, { useEffect, useRef } from 'react';

const TradingViewYieldTicker: React.FC = () => {
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
          { "proName": "TVC:IN10Y", "title": "India 10Y" },
          { "proName": "TVC:US10Y", "title": "US 10Y" },
          { "proName": "TVC:UK10Y", "title": "UK 10Y" },
          { "proName": "TVC:EU10Y", "title": "Euro 10Y" }
        ],
        "showSymbolLogo": true,
        "isTransparent": true,
        "displayMode": "adaptive",
        "colorTheme": "light",
        "locale": "en"
      });
      container.current.appendChild(script);
    }
  }, []);

  return (
    <div className="bg-white border-b border-slate-100 overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="tradingview-widget-container" ref={container}>
          <div className="tradingview-widget-container__widget"></div>
        </div>
      </div>
      {/* TradingView Attribution Disclaimer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-1">
        <p className="text-[10px] text-slate-400 text-center">
          Market data provided by{" "}
          <a
            href="https://www.tradingview.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#2076C7] hover:underline"
          >
            TradingView
          </a>
          . Data is for informational purposes only and may be delayed. Not financial advice.
        </p>
      </div>
    </div>
  );
};

export default TradingViewYieldTicker;
