const signalData = [
  {
    symbol: 'TSLA',
    name: 'Tesla Inc.',
    category: 'stocks',
    signal: 'STRONG BUY',
    confidence: 92,
    sentiment: 'buy',
    price: '$262.50',
    bestLap: '15m',
    rationale: 'Bullish flag continuation, strong volume, and rising momentum confirm a fresh upside breakout above the short-term consolidation zone.'
  },
  {
    symbol: 'NVDA',
    name: 'NVIDIA Corp.',
    category: 'stocks',
    signal: 'STRONG BUY',
    confidence: 95,
    sentiment: 'buy',
    price: '$128.20',
    bestLap: '5m',
    rationale: 'Exceptional trend alignment across intraday timeframes with clean EMA support and acceleration in participation.'
  },
  {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    category: 'stocks',
    signal: 'NEUTRAL',
    confidence: 58,
    sentiment: 'neutral',
    price: '$215.30',
    bestLap: '1D',
    rationale: 'The stock is range-bound while the daily trend remains structurally intact. Traders should wait for a decisive breakout or rejection.'
  },
  {
    symbol: 'MSFT',
    name: 'Microsoft Corp.',
    category: 'stocks',
    signal: 'SELL',
    confidence: 72,
    sentiment: 'sell',
    price: '$418.50',
    bestLap: '1h',
    rationale: 'The 1h breakdown below moving-average support and bearish divergence suggest a continuation lower toward the next demand area.'
  },
  {
    symbol: 'BTCUSD',
    name: 'Bitcoin / Dollar',
    category: 'crypto',
    signal: 'STRONG BUY',
    confidence: 90,
    sentiment: 'buy',
    price: '$61,250',
    bestLap: '1h',
    rationale: 'A reclaimed liquidity zone and expanding trend strength support continued upside with solid buyer participation.'
  },
  {
    symbol: 'ETHUSD',
    name: 'Ethereum / Dollar',
    category: 'crypto',
    signal: 'BUY',
    confidence: 71,
    sentiment: 'buy',
    price: '$3,380',
    bestLap: '15m',
    rationale: 'Accumulation near key support and positive short-term structure are encouraging a continuation push above the local resistance shelf.'
  },
  {
    symbol: 'EURUSD',
    name: 'Euro / Dollar',
    category: 'forex',
    signal: 'NEUTRAL',
    confidence: 51,
    sentiment: 'neutral',
    price: '1.0820',
    bestLap: '1D',
    rationale: 'Price is trading in a compressed range ahead of macro catalysts, limiting directional conviction until a clear breakout develops.'
  },
  {
    symbol: 'GBPUSD',
    name: 'Pound / Dollar',
    category: 'forex',
    signal: 'BUY',
    confidence: 66,
    sentiment: 'buy',
    price: '1.2750',
    bestLap: '1h',
    rationale: 'The hourly structure remains constructive after support held, with buyers defending the channel and trend strength improving.'
  },
  {
    symbol: 'USDJPY',
    name: 'US Dollar / Japanese Yen',
    category: 'forex',
    signal: 'SELL',
    confidence: 68,
    sentiment: 'sell',
    price: '157.85',
    bestLap: '15m',
    rationale: 'Short-term momentum is fading beneath local resistance, pointing to a retracement as the pair loses upward pressure.'
  },
  {
    symbol: 'GOLD',
    name: 'Gold Spot',
    category: 'commodities',
    signal: 'STRONG BUY',
    confidence: 92,
    sentiment: 'buy',
    price: '$2,360.50',
    bestLap: '1D',
    rationale: 'Macro demand, strong trend continuation, and persistent safe-haven flows keep the long bias intact with healthy structure.'
  },
  {
    symbol: 'OIL',
    name: 'Crude Oil Brent',
    category: 'commodities',
    signal: 'SELL',
    confidence: 69,
    sentiment: 'sell',
    price: '$85.40',
    bestLap: '15m',
    rationale: 'Failure to defend key support and steepening downside momentum suggest continued pressure toward lower demand zones.'
  },
  {
    symbol: 'RELIANCE',
    name: 'Reliance Industries',
    category: 'stocks',
    signal: 'BUY',
    confidence: 74,
    sentiment: 'buy',
    price: '₹2,950.75',
    bestLap: '1h',
    rationale: 'Strong breakout behavior and sustained buying after consolidation favor continuation toward the next resistance cluster.'
  }
];

const signalFeed = document.getElementById('signal-feed');
const bullishCount = document.getElementById('bullishCount');
const bearishCount = document.getElementById('bearishCount');
const avgConfidence = document.getElementById('avgConfidence');
const marketPulse = document.getElementById('marketPulse');
const filterButtons = document.querySelectorAll('.signal-filter');

function renderSignals(filter = 'all') {
  const visibleSignals = signalData.filter(item => filter === 'all' || item.sentiment === filter);

  signalFeed.innerHTML = visibleSignals.map((item) => {
    const toneClass = {
      buy: 'signal-card--buy',
      sell: 'signal-card--sell',
      neutral: 'signal-card--neutral'
    }[item.sentiment] || 'signal-card--neutral';

    return `
      <article class="signal-card ${toneClass}">
        <div class="signal-card__header">
          <div>
            <p class="signal-card__symbol">${item.symbol}</p>
            <h3>${item.name}</h3>
          </div>
          <span class="signal-badge signal-badge--${item.sentiment}">${item.signal}</span>
        </div>

        <div class="signal-card__meta">
          <span>${item.category}</span>
          <span>Best lap: ${item.bestLap}</span>
          <span>${item.price}</span>
        </div>

        <div class="signal-card__confidence">
          <div class="confidence-row">
            <span>AI confidence</span>
            <strong>${item.confidence}%</strong>
          </div>
          <div class="confidence-bar">
            <span style="width:${item.confidence}%"></span>
          </div>
        </div>

        <p class="signal-card__rationale">${item.rationale}</p>
      </article>
    `;
  }).join('');

  if (!visibleSignals.length) {
    signalFeed.innerHTML = '<div class="signal-empty">No signals match this filter.</div>';
  }
}

function updateSummary() {
  const buySignals = signalData.filter(item => item.sentiment === 'buy').length;
  const sellSignals = signalData.filter(item => item.sentiment === 'sell').length;
  const neutralSignals = signalData.filter(item => item.sentiment === 'neutral').length;
  const avg = Math.round(signalData.reduce((sum, item) => sum + item.confidence, 0) / signalData.length);

  bullishCount.textContent = buySignals;
  bearishCount.textContent = sellSignals;
  avgConfidence.textContent = `${avg}%`;

  if (buySignals > sellSignals) {
    marketPulse.textContent = 'Bullish';
  } else if (sellSignals > buySignals) {
    marketPulse.textContent = 'Bearish';
  } else {
    marketPulse.textContent = neutralSignals > 0 ? 'Mixed' : 'Neutral';
  }
}

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    filterButtons.forEach(btn => btn.classList.toggle('is-active', btn === button));
    renderSignals(button.dataset.filter);
  });
});

updateSummary();
renderSignals();
