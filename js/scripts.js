tailwind.config = {
            theme: {
                extend: {
                    fontFamily: {
                        sans: ['Inter', 'sans-serif'],
                        display: ['"Space Grotesk"', 'sans-serif'],
                        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
                    },
                    colors: {
                        ink: { 950: '#06070f', 900: '#0a0b1e', 800: '#101235', 700: '#1a1d4a' },
                        brand: { cyan: '#22d3ee', teal: '#10b981', violet: '#8b5cf6' }
                    },
                    animation: {
                        'float': 'float 6s ease-in-out infinite',
                        pulseGlow: 'pulseGlow 2.4s ease-in-out infinite',
                        signalPop: 'pop .5s cubic-bezier(.16,1,.3,1)',
                        scanline: 'scan 1.5s linear infinite',
                        aurora: 'aurora 5s ease-in-out infinite',
                        fadeInUp: 'fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) both'
                    },
                    keyframes: {
                        float: {
                            '0%, 100%': { transform: 'translateY(0)' },
                            '50%': { transform: 'translateY(-20px)' },
                        },
                        pulseGlow: { '0%,100%': { opacity: '.5' }, '50%': { opacity: '1' } },
                        pop: { '0%': { transform: 'scale(.96)', opacity: '0' }, '60%': { transform: 'scale(1.02)' }, '100%': { transform: 'scale(1)', opacity: '1' } },
                        scan: { '0%': { transform: 'translateY(-32px)', opacity: '0' }, '20%': { opacity: '.7' }, '100%': { transform: 'translateY(180px)', opacity: '0' } },
                        aurora: { '0%,100%': { transform: 'translate(0,0) scale(1)' }, '33%': { transform: 'translate(30px,-20px) scale(1.3)' }, '66%': { transform: 'translate(-20px,20px) scale(.95)' } },
                        fadeInUp: { '0%': { opacity: '0', transform: 'translateY(30px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } }
                    }
                }
            }
        }

        //Cards animation
        document.addEventListener('DOMContentLoaded', () => {

            //CARD 1
            const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

            const exchangeChart = document.querySelector('.exchange-chart');
            if (exchangeChart) {
                const exchangeCard = exchangeChart.closest('.module-glass');
                const exchangePlot = exchangeChart.closest('.exchange-plot');
                const exchangeInputs = [...(exchangeCard?.querySelectorAll('.exchange-order-input') || [])];
                const longButton = exchangeCard?.querySelector('.exchange-open-long');
                const candles = [...exchangeChart.querySelectorAll('.exchange-candle')];
                const takeProfitLine = exchangeChart.querySelector('.exchange-tp-line');
                const takeProfitFlag = exchangeChart.querySelector('.exchange-tp-flag');
                const livePoints = [...exchangeChart.querySelectorAll('.exchange-live-point')];
                const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
                let exchangeCardIsVisible = false;

                const typeExchangeValue = async (input) => {
                    const value = input.dataset.demoValue || '';
                    input.value = '';
                    for (const character of value) {
                        input.value += character;
                        if (!reduceMotion) await wait(48);
                    }
                };

                let exchangeAnimationRunning = false;

                const resetExchangeAnimation = () => {
                    exchangeInputs.forEach(input => { input.value = ''; });
                    candles.forEach(candle => candle.classList.remove('is-visible'));
                    takeProfitLine?.classList.remove('is-visible');
                    takeProfitFlag?.classList.remove('is-visible');
                    exchangePlot?.classList.remove('is-tp-hit');
                    livePoints.forEach(point => point.classList.remove('is-visible'));
                    longButton?.classList.remove('is-pressed');
                };

                const playExchangeCycle = async () => {
                    if (exchangeAnimationRunning) return;
                    exchangeAnimationRunning = true;

                    while (exchangeCardIsVisible) {
                        resetExchangeAnimation();
                        if (!reduceMotion) await wait(450);
                        if (!exchangeCardIsVisible) break;

                        for (const input of exchangeInputs) {
                            await typeExchangeValue(input);
                            if (!reduceMotion) await wait(180);
                        }
                        if (!exchangeCardIsVisible) break;

                        if (longButton && !reduceMotion) {
                            longButton.classList.add('is-pressed');
                            await wait(180);
                            longButton.classList.remove('is-pressed');
                        }
                        if (!exchangeCardIsVisible) break;

                        takeProfitLine?.classList.add('is-visible');
                        takeProfitFlag?.classList.add('is-visible');
                        for (const candle of candles) {
                            candle.classList.add('is-visible');
                            if (candle.dataset.tpCrossing === 'true') {
                                exchangePlot?.classList.add('is-tp-hit');
                            }
                            if (!reduceMotion) await wait(110);
                        }
                        livePoints.forEach(point => point.classList.add('is-visible'));

                        if (!exchangeCardIsVisible) break;
                        await wait(reduceMotion ? 2200 : 2600);
                    }

                    resetExchangeAnimation();
                    exchangeAnimationRunning = false;
                    if (exchangeCardIsVisible) playExchangeCycle();
                };

                if (exchangeCard && 'IntersectionObserver' in window) {
                    const exchangeObserver = new IntersectionObserver((entries) => {
                        exchangeCardIsVisible = entries.some(entry => entry.isIntersecting);
                        if (exchangeCardIsVisible) playExchangeCycle();
                    }, { threshold: 0.25 });
                    exchangeObserver.observe(exchangeCard);
                } else {
                    exchangeCardIsVisible = true;
                    playExchangeCycle();
                }
            }

            const terminal = document.getElementById('crypto-terminal');
            const glow = document.getElementById('term-glow');
            const scanline = document.getElementById('term-scanline');
            const termLogo = document.getElementById('term-logo');
            const termPair = document.getElementById('term-pair');
            const chartContainer = document.getElementById('chart-candles');
            const yAxis = document.getElementById('y-axis');
            const xAxis = document.getElementById('x-axis');

            const ohlcO = document.getElementById('ohlc-o');
            const ohlcH = document.getElementById('ohlc-h');
            const ohlcL = document.getElementById('ohlc-l');
            const ohlcC = document.getElementById('ohlc-c');
            const ohlcV = document.getElementById('ohlc-v');

            const btcLogo = `<svg viewBox="0 0 32 32" fill="currentColor" class="w-full h-full"><path d="M21.57 14.98c.32-2.14-1.32-3.3-3.56-4.07l.73-2.92-1.78-.45-.71 2.85c-.47-.12-.95-.23-1.43-.34l.72-2.89-1.78-.45-.73 2.92c-.39-.09-.77-.18-1.15-.27l.01-.06-2.48-.62-.48 1.93s1.33.3 1.3.32c.72.18.85.66.83 1.04l-.84 3.37c.05.01.11.03.17.05l-.17-.04-1.18 4.74c-.09.22-.32.55-.83.42.03.05-1.3-.32-1.3-.32l-.89 2.05 2.34.58c.44.11.87.23 1.3.34l-.73 2.94 1.78.45.73-2.92c.49.13.97.26 1.45.38l-.72 2.9 1.78.45.73-2.94c3 .57 5.25.34 6.2-2.37.76-2.16-.04-3.41-1.59-4.22 1.13-.26 1.98-1 2.2-2.53zm-3.93 5.51c-.53 2.14-4.11.98-5.27.7l.94-3.77c1.16.29 4.88.85 4.33 3.07zm.53-5.54c-.48 1.94-3.47.95-4.44.71l.85-3.41c.97.24 4.08.73 3.59 2.7z"/></svg>`;
            const ethLogo = `<svg viewBox="0 0 784.37 1277.39" fill="currentColor" class="w-full h-full"><path d="M392.07,0L383.5,28.1V872.4L392.07,881l392.23-231.5L392.07,0Z" opacity="0.6"/><path d="M392.07,0L0,649.5,392.07,881V487.6V0Z" opacity="0.9"/><path d="M392.07,956.52l-4.21,5.13V1275.6l4.21,1.79,392.3-556.12-392.3,235.25Z" opacity="0.6"/><path d="M392.07,1277.39V956.52L0,721.28l392.07,556.11Z" opacity="0.9"/><path d="M392.07,881l392.23-231.5L392.07,487.6V881Z" opacity="0.4"/><path d="M0,649.5,392.07,881V487.6L0,649.5Z" opacity="0.7"/></svg>`;

            function setTerminalState(state) {
                terminal.classList.remove('border-rose-500/50', 'border-emerald-500/50', 'border-white/5');
                glow.classList.remove('bg-rose-500/10', 'bg-emerald-500/10', 'opacity-0', 'opacity-100');
                scanline.classList.remove('bg-white/20', 'bg-rose-500/80', 'bg-emerald-400/60', 'shadow-[0_0_10px_rgba(255,255,255,0.1)]', 'shadow-[0_0_10px_#f43f5e]', 'shadow-[0_0_12px_#10b981]', 'animate-scan-v');

                if(state === 'neutral') {
                    terminal.classList.add('border-white/5');
                    glow.classList.add('opacity-0');
                    scanline.classList.add('animate-scan-v', 'bg-white/20', 'shadow-[0_0_10px_rgba(255,255,255,0.1)]');
                } else if (state === 'error') {
                    terminal.classList.add('border-rose-500/50');
                    glow.classList.add('bg-rose-500/10', 'opacity-100');
                    scanline.classList.add('bg-rose-500/80', 'shadow-[0_0_10px_#f43f5e]'); 
                } else if (state === 'success') {
                    terminal.classList.add('border-emerald-500/50');
                    glow.classList.add('bg-emerald-500/10', 'opacity-100');
                    scanline.classList.add('animate-scan-v', 'bg-emerald-400/60', 'shadow-[0_0_12px_#10b981]');
                }
            }

            function generateChartData(basePrice, volatility, count) {
                let data = [];
                let price = basePrice;
                for(let i = 0; i < count; i++) {
                    let open = price;
                    let move = (Math.random() - 0.45) * volatility; 
                    let close = open + move;
                    let high = Math.max(open, close) + Math.random() * (volatility * 0.8);
                    let low = Math.min(open, close) - Math.random() * (volatility * 0.8);
                    let volume = Math.floor(Math.random() * 850 + 120);
                    data.push({open, close, high, low, volume});
                    price = close;
                }
                return data;
            }

            function renderChart(data) {
                let rawMin = Math.min(...data.map(d => d.low));
                let rawMax = Math.max(...data.map(d => d.high));
                let padding = (rawMax - rawMin) * 0.3;
                let min = rawMin - padding;
                let max = rawMax + padding;
                let range = max - min;

                let html = '';
                data.forEach((d, i) => {
                    let isUp = d.close >= d.open;
                    let colorClass = isUp ? 'bg-emerald-500' : 'bg-rose-500';
                    let topWick = 100 - ((d.high - min) / range * 100);
                    let bottomWick = 100 - ((d.low - min) / range * 100);
                    let topBody = 100 - ((Math.max(d.open, d.close) - min) / range * 100);
                    let bottomBody = 100 - ((Math.min(d.open, d.close) - min) / range * 100);
                    let heightWick = bottomWick - topWick;
                    let heightBody = Math.max(bottomBody - topBody, 1);

                    let isLast = i === data.length - 1;
                    let wickId = isLast ? 'id="live-candle-wick"' : '';
                    let bodyId = isLast ? 'id="live-candle-body"' : '';
                    let opacity = isLast ? 1 : 0.4 + (i / data.length) * 0.5;

                    html += `
                        <div class="relative flex-1 min-w-0 max-w-[8px] h-full shrink flex flex-col justify-end" style="opacity: ${opacity}">
                            <div ${wickId} class="absolute w-[1px] ${colorClass} opacity-80 left-1/2 -translate-x-1/2" style="top: ${topWick}%; height: ${heightWick}%;"></div>
                            <div ${bodyId} class="absolute w-full ${colorClass} rounded-[1px]" style="top: ${topBody}%; height: ${heightBody}%;"></div>
                        </div>
                    `;
                });

                chartContainer.innerHTML = html;

                let formatPrice = (val) => val > 10000 ? val.toFixed(0) : val.toFixed(1);
                yAxis.innerHTML = `
                    <span>${formatPrice(max)}</span>
                    <span>${formatPrice((max + min) / 2)}</span>
                    <span>${formatPrice(min)}</span>
                `;

                return {min, max, range, lastCandle: data[data.length - 1]};
            }

            function simulateLiveCandle(startCandle, min, max, durationMs) {
                return new Promise(resolve => {
                    let startTime = performance.now();
                    let {open, close, high, low, volume} = startCandle;
                    let range = max - min;
                    let maxTick = range * 0.015; 
                    let lastUpdate = 0;
                    let currentVol = volume;

                    function updatePrice(time) {
                        let elapsed = time - startTime;
                        if (elapsed > durationMs) {
                            resolve({open, close, high, low, volume: currentVol});
                            return;
                        }

                        if (time - lastUpdate > 60) {
                            lastUpdate = time;
                            let tick = (Math.random() - 0.5) * maxTick; 
                            let meanReversion = (startCandle.close - close) * 0.05; 
                            close += tick + meanReversion;
                            close = Math.max(min + (range * 0.05), Math.min(max - (range * 0.05), close));

                            if (close > high) high = close + (Math.random() * maxTick);
                            if (close < low) low = close - (Math.random() * maxTick);
                            
                            high = Math.min(high, max - (range * 0.01));
                            low = Math.max(low, min + (range * 0.01));
                            currentVol += Math.floor(Math.random() * 5);

                            let topWick = Math.max(0, 100 - ((high - min) / range * 100));
                            let bottomWick = Math.min(100, 100 - ((low - min) / range * 100));
                            let topBody = Math.max(0, 100 - ((Math.max(open, close) - min) / range * 100));
                            let bottomBody = Math.min(100, 100 - ((Math.min(open, close) - min) / range * 100));
                            let heightWick = Math.max(bottomWick - topWick, 0.5);
                            let heightBody = Math.max(bottomBody - topBody, 1);

                            let isUp = close >= open;
                            let colorClass = isUp ? 'bg-emerald-500' : 'bg-rose-500';
                            let textColorClass = isUp ? 'text-emerald-400' : 'text-rose-400';
                            let borderColorClass = isUp ? 'border-emerald-500/40' : 'border-rose-500/40';

                            const bodyEl = document.getElementById('live-candle-body');
                            const wickEl = document.getElementById('live-candle-wick');
                            if(bodyEl && wickEl) {
                                bodyEl.style.top = topBody + '%';
                                bodyEl.style.height = heightBody + '%';
                                bodyEl.className = `absolute w-full rounded-[1px] ${colorClass}`;
                                wickEl.style.top = topWick + '%';
                                wickEl.style.height = heightWick + '%';
                                wickEl.className = `absolute w-[1px] opacity-80 left-1/2 -translate-x-1/2 ${colorClass}`;
                            }

                            const priceLine = document.getElementById('live-price-container');
                            const priceText = document.getElementById('live-price');
                            if(priceLine && priceText) {
                                let pricePercentTop = 100 - ((close - min) / range * 100);
                                priceLine.style.top = pricePercentTop + '%';
                                priceText.innerText = close > 10000 ? close.toFixed(0) : close.toFixed(1);
                                priceText.className = `inline-block bg-[#06070f] border ${borderColorClass} px-1 rounded-[3px] text-[9px] font-bold relative right-0 transition-colors font-mono ${textColorClass}`;
                            }

                            const formatVal = (v) => v > 10000 ? v.toFixed(0) : v.toFixed(1);
                            ohlcO.innerText = formatVal(open);
                            ohlcH.innerText = formatVal(high);
                            ohlcL.innerText = formatVal(low);
                            ohlcC.innerText = formatVal(close);
                            ohlcC.className = `${textColorClass} font-semibold`;
                            ohlcV.innerText = currentVol + 'K';
                        }
                        
                        requestAnimationFrame(updatePrice);
                    }
                    requestAnimationFrame(updatePrice);
                });
            }

            async function runScannerAnimation() {
                const candleCount = 40; 
                const btcData = generateChartData(64320, 180, candleCount);
                const ethData = generateChartData(3480, 12, candleCount);

                while (true) {
                    setTerminalState('neutral');
                    termLogo.innerHTML = btcLogo;
                    termLogo.className = "w-5 h-5 bg-[#F7931A]/10 text-[#F7931A] rounded-full flex items-center justify-center p-0.5";
                    termPair.innerText = "BTC/USDT";
                    xAxis.innerHTML = `<span>14:00</span><span>14:15</span><span>14:30</span><span>14:45</span>`;

                    let btcMetrics = renderChart(btcData);
                    await simulateLiveCandle(btcMetrics.lastCandle, btcMetrics.min, btcMetrics.max, 8000);

                    setTerminalState('error');
                    terminal.style.transform = "translateX(-3px)";
                    await wait(50);
                    terminal.style.transform = "translateX(3px)";
                    await wait(50);
                    terminal.style.transform = "translateX(0)";
                    await wait(2500); 

                    setTerminalState('neutral');
                    termLogo.innerHTML = ethLogo;
                    termLogo.className = "w-5 h-5 bg-[#627EEA]/10 text-[#627EEA] rounded-full flex items-center justify-center p-0.5";
                    termPair.innerText = "ETH/USDT";
                    xAxis.innerHTML = `<span>15:00</span><span>15:15</span><span>15:30</span><span>15:45</span>`;

                    let ethMetrics = renderChart(ethData);
                    await simulateLiveCandle(ethMetrics.lastCandle, ethMetrics.min, ethMetrics.max, 8000);

                    setTerminalState('success');
                    await wait(3500); 
                    await wait(500);
                }
            }

            runScannerAnimation();

            //Card 2
            const pipelineStatus = document.getElementById('pipeline-status-text');
            const pipelineGlow = document.getElementById('pipeline-glow');

            // Elements for Stage 0
            const termS0 = document.getElementById('terminal-s0');
            const dotS0 = document.getElementById('dot-s0');
            const glowS0 = document.getElementById('glow-s0');
            const codeS0 = document.getElementById('code-s0');
            const scoreS0 = document.getElementById('score-s0');
            const badgeS0 = document.getElementById('badge-s0');

            // Elements for Stage 1
            const termS1 = document.getElementById('terminal-s1');
            const dotS1 = document.getElementById('dot-s1');
            const glowS1 = document.getElementById('glow-s1');
            const codeS1 = document.getElementById('code-s1');
            const scoreS1 = document.getElementById('score-s1');
            const badgeS1 = document.getElementById('badge-s1');

            // Elements for Stage 2
            const termS2 = document.getElementById('terminal-s2');
            const dotS2 = document.getElementById('dot-s2');
            const glowS2 = document.getElementById('glow-s2');
            const codeS2 = document.getElementById('code-s2');
            const scoreS2 = document.getElementById('score-s2');
            const badgeS2 = document.getElementById('badge-s2');

            // Helper to count confidence percentage smoothly
            async function animateScore(element, start, end, duration) {
                const startTime = performance.now();
                return new Promise(resolve => {
                    function update(now) {
                        const progress = Math.min((now - startTime) / duration, 1);
                        const current = (start + (end - start) * progress).toFixed(1);
                        element.innerText = current + '%';
                        if (progress < 1) {
                            requestAnimationFrame(update);
                        } else {
                            resolve();
                        }
                    }
                    requestAnimationFrame(update);
                });
            }

            // Helper to type/append code lines smoothly
            async function streamLines(container, lines, delayBetween = 450) {
                container.innerHTML = '';
                for (let i = 0; i < lines.length; i++) {
                    const lineEl = document.createElement('div');
                    lineEl.innerHTML = lines[i];
                    lineEl.className = "truncate opacity-0 transition-opacity duration-300";
                    container.appendChild(lineEl);
                    await wait(20);
                    lineEl.classList.remove('opacity-0');
                    await wait(delayBetween);
                }
            }

            async function runMultiStagePipeline() {
                while (true) {

                    pipelineStatus.innerText = "ІНІЦІАЛІЗАЦІЯ ПАЙПЛАЙНУ...";
                    pipelineStatus.className = "text-slate-400 font-semibold transition-colors duration-300";
                    pipelineGlow.className = "absolute inset-0 opacity-0 transition-opacity duration-700 pointer-events-none";

                    // Скидання S0
                    termS0.className = "flex flex-col justify-between bg-[#04050a]/90 rounded-xl border border-white/5 p-1.5 sm:p-2 relative transition-all duration-500 overflow-hidden shadow-sm";
                    dotS0.className = "w-1.5 h-1.5 rounded-full bg-slate-600 transition-colors";
                    glowS0.className = "absolute inset-0 bg-brand-violet/0 transition-all duration-500 pointer-events-none";
                    codeS0.innerHTML = '<div class="text-slate-600">&gt; init noise_filter()</div>';
                    scoreS0.innerText = "--%";
                    scoreS0.className = "font-bold text-slate-400";
                    badgeS0.className = "text-center text-[7px] sm:text-[7.5px] font-mono py-0.5 px-1 rounded bg-white/5 text-slate-500 border border-white/5 transition-all truncate";
                    badgeS0.innerText = "WAITING";

                    // Скидання S1
                    termS1.className = "flex flex-col justify-between bg-[#04050a]/90 rounded-xl border border-white/5 p-1.5 sm:p-2 relative transition-all duration-500 overflow-hidden shadow-sm";
                    dotS1.className = "w-1.5 h-1.5 rounded-full bg-slate-600 transition-colors";
                    glowS1.className = "absolute inset-0 bg-brand-cyan/0 transition-all duration-500 pointer-events-none";
                    codeS1.innerHTML = '<div class="text-slate-600">&gt; awaiting stage0...</div>';
                    scoreS1.innerText = "--%";
                    scoreS1.className = "font-bold text-slate-400";
                    badgeS1.className = "text-center text-[7px] sm:text-[7.5px] font-mono py-0.5 px-1 rounded bg-white/5 text-slate-500 border border-white/5 transition-all truncate";
                    badgeS1.innerText = "IDLE";

                    // Скидання S2
                    termS2.className = "flex flex-col justify-between bg-[#04050a]/90 rounded-xl border border-white/5 p-1.5 sm:p-2 relative transition-all duration-500 overflow-hidden shadow-sm";
                    dotS2.className = "w-1.5 h-1.5 rounded-full bg-slate-600 transition-colors";
                    glowS2.className = "absolute inset-0 bg-emerald-500/0 transition-all duration-500 pointer-events-none";
                    codeS2.innerHTML = '<div class="text-slate-600">&gt; awaiting stage1...</div>';
                    scoreS2.innerText = "--%";
                    scoreS2.className = "font-bold text-slate-400";
                    badgeS2.className = "text-center text-[7px] sm:text-[7.5px] font-mono py-0.5 px-1 rounded bg-white/5 text-slate-500 border border-white/5 transition-all truncate";
                    badgeS2.innerText = "IDLE";

                    await wait(800);


                    // Активація терміналу S0
                    pipelineStatus.innerText = "STAGE 0: АНАЛІЗ НА ШУМ & СПРЕД";
                    pipelineStatus.className = "text-brand-violet font-semibold transition-colors duration-300";

                    termS0.classList.remove('border-white/5');
                    termS0.classList.add('border-brand-violet/50', 'shadow-[0_0_15px_rgba(139,92,246,0.15)]');
                    dotS0.className = "w-1.5 h-1.5 rounded-full bg-brand-violet animate-pulse shadow-[0_0_8px_#8b5cf6]";
                    glowS0.className = "absolute inset-0 bg-brand-violet/10 transition-all duration-500 pointer-events-none";
                    badgeS0.className = "text-center text-[7px] sm:text-[7.5px] font-mono py-0.5 px-1 rounded bg-brand-violet/20 text-brand-violet border border-brand-violet/40 font-bold transition-all truncate";
                    badgeS0.innerText = "COMPUTING...";

                    const s0Lines = [
                        '<span class="text-slate-500">&gt;</span> <span class="text-brand-violet">filter</span>.flat_check()',
                        '<span class="text-slate-500">&gt;</span> spread: <span class="text-emerald-400">&lt;0.03%</span> <span class="text-slate-400">[OK]</span>',
                        '<span class="text-slate-500">&gt;</span> drop_manip(depth)',
                        '<span class="text-slate-500">&gt;</span> passed: <span class="text-brand-cyan font-bold">32/120</span>'
                    ];

                    // Одночасний стрімінг команд та підрахунок впевненості
                    const s0ScoreAnim = animateScore(scoreS0, 24.0, 94.8, 1900);
                    await streamLines(codeS0, s0Lines, 420);
                    await s0ScoreAnim;

                    scoreS0.className = "font-bold text-brand-violet";
                    badgeS0.className = "text-center text-[7px] sm:text-[7.5px] font-mono py-0.5 px-1 rounded bg-brand-violet/25 text-purple-200 border border-brand-violet/50 font-bold transition-all shadow-[0_0_10px_rgba(139,92,246,0.25)] truncate";
                    badgeS0.innerText = "✓ VALIDATED";
                    dotS0.className = "w-1.5 h-1.5 rounded-full bg-brand-violet shadow-[0_0_8px_#8b5cf6]";
                    termS0.classList.remove('border-brand-violet/50');
                    termS0.classList.add('border-brand-violet/40', 'shadow-[0_0_12px_rgba(139,92,246,0.15)]');

                    await wait(600);

                    
                    // Активація терміналу S1
                    pipelineStatus.innerText = "STAGE 1: ПЕРЕВІРКА ОБ'ЄМУ ТА ТРЕНДУ";
                    pipelineStatus.className = "text-brand-cyan font-semibold transition-colors duration-300";

                    termS1.classList.remove('border-white/5');
                    termS1.classList.add('border-brand-cyan/50', 'shadow-[0_0_15px_rgba(34,211,238,0.15)]');
                    dotS1.className = "w-1.5 h-1.5 rounded-full bg-brand-cyan animate-pulse shadow-[0_0_8px_#22d3ee]";
                    glowS1.className = "absolute inset-0 bg-brand-cyan/10 transition-all duration-500 pointer-events-none";
                    badgeS1.className = "text-center text-[7px] sm:text-[7.5px] font-mono py-0.5 px-1 rounded bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/40 font-bold transition-all truncate";
                    badgeS1.innerText = "ANALYZING...";

                    const s1Lines = [
                        '<span class="text-slate-500">&gt;</span> <span class="text-brand-cyan">eval</span>.cvd_delta()',
                        '<span class="text-slate-500">&gt;</span> vol_surge: <span class="text-emerald-400">+248%</span>',
                        '<span class="text-slate-500">&gt;</span> fake_break: <span class="text-slate-400">NONE</span>',
                        '<span class="text-slate-500">&gt;</span> candidates: <span class="text-brand-cyan font-bold">8/32</span>'
                    ];

                    const s1ScoreAnim = animateScore(scoreS1, 40.0, 96.2, 1900);
                    await streamLines(codeS1, s1Lines, 420);
                    await s1ScoreAnim;

                    scoreS1.className = "font-bold text-brand-cyan";
                    badgeS1.className = "text-center text-[7px] sm:text-[7.5px] font-mono py-0.5 px-1 rounded bg-brand-cyan/25 text-cyan-200 border border-brand-cyan/50 font-bold transition-all shadow-[0_0_10px_rgba(34,211,238,0.25)] truncate";
                    badgeS1.innerText = "✓ CONFIRMED";
                    dotS1.className = "w-1.5 h-1.5 rounded-full bg-brand-cyan shadow-[0_0_8px_#22d3ee]";
                    termS1.classList.remove('border-brand-cyan/50');
                    termS1.classList.add('border-brand-cyan/40', 'shadow-[0_0_12px_rgba(34,211,238,0.15)]');

                    await wait(600);

                    // Активація терміналу S2
                    pipelineStatus.innerText = "STAGE 2: НЕЙРОМЕРЕЖЕВИЙ СКОРИНГ...";
                    pipelineStatus.className = "text-emerald-400 font-semibold transition-colors duration-300";

                    termS2.classList.remove('border-white/5');
                    termS2.classList.add('border-emerald-500/50', 'shadow-[0_0_15px_rgba(16,185,129,0.15)]');
                    dotS2.className = "w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#10b981]";
                    glowS2.className = "absolute inset-0 bg-emerald-500/10 transition-all duration-500 pointer-events-none";
                    badgeS2.className = "text-center text-[7px] sm:text-[7.5px] font-mono py-0.5 px-1 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 font-bold transition-all truncate";
                    badgeS2.innerText = "NN WEIGHTS...";

                    const s2Lines = [
                        '<span class="text-slate-500">&gt;</span> <span class="text-emerald-400">nn</span>.score(ETH/USDT)',
                        '<span class="text-slate-500">&gt;</span> risk_reward: <span class="text-emerald-400">1:3.4</span>',
                        '<span class="text-slate-500">&gt;</span> win_rate: <span class="text-brand-cyan font-bold">&gt;98%</span>',
                        '<span class="text-slate-500">&gt;</span> EXECUTE: <span class="text-emerald-400 font-bold">LONG A+</span>'
                    ];

                    const s2ScoreAnim = animateScore(scoreS2, 55.0, 99.4, 2000);
                    await streamLines(codeS2, s2Lines, 440);
                    await s2ScoreAnim;

                    scoreS2.className = "font-bold text-emerald-400";
                    badgeS2.className = "text-center text-[7px] sm:text-[7.5px] font-mono py-0.5 px-1 rounded bg-emerald-500/30 text-emerald-300 border border-emerald-400/60 font-bold transition-all shadow-[0_0_12px_rgba(16,185,129,0.3)] truncate";
                    badgeS2.innerText = "★ VALIDATED";
                    dotS2.className = "w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_#10b981]";


                    pipelineStatus.innerText = "✓ ПАЙПЛАЙН ЗАВЕРШЕНО: СЕТАП ЗАТВЕРДЖЕНО";
                    pipelineStatus.className = "text-emerald-400 font-bold tracking-wider";
                    pipelineGlow.className = "absolute inset-0 bg-white/[0.02] opacity-100 transition-opacity duration-700 pointer-events-none";

                    await wait(5000);
                }
            }

            runMultiStagePipeline();


            //Card 3
            const mathTerminal = document.getElementById('math-terminal');
            const mathGlow = document.getElementById('math-glow');
            const mathStatus = document.getElementById('math-status-badge');
            const chartViewport = document.getElementById('chart-viewport');
            const predCandles = document.getElementById('prediction-candles');
            const targetNodes = document.getElementById('target-nodes');

            const ghostC1 = document.getElementById('ghost-c1');
            const ghostC2 = document.getElementById('ghost-c2');
            const ghostC3 = document.getElementById('ghost-c3');
            const ghostC4 = document.getElementById('ghost-c4');
            const ghostC5 = document.getElementById('ghost-c5');
            const mathChartSvg = document.getElementById('math-chart-svg');
            const candlesHistory = document.getElementById('candles-history');
            const volumeBars = document.getElementById('volume-bars');

            function syncMathChartHistory() {
                if (!mathChartSvg || !candlesHistory || !volumeBars || !mathTerminal) return;

                const isWideChart = mathTerminal.clientWidth >= 360;
                mathChartSvg.setAttribute(
                    'viewBox',
                    isWideChart ? '-160 -30 540 172' : '0 -30 380 172'
                );

                candlesHistory.querySelectorAll('[data-responsive-history]').forEach((candle) => candle.remove());
                volumeBars.querySelectorAll('[data-responsive-volume]').forEach((bar) => bar.remove());
                if (!isWideChart) return;

                const history = [
                    [-153, 57, 87, 72, 18, '#f43f5e'],
                    [-140, 52, 79, 62, 24, '#10b981'],
                    [-127, 62, 91, 76, 16, '#f43f5e'],
                    [-114, 49, 75, 58, 19, '#10b981'],
                    [-101, 55, 84, 68, 23, '#10b981'],
                    [-88, 47, 73, 59, 17, '#f43f5e'],
                    [-75, 52, 80, 64, 21, '#10b981'],
                    [-62, 43, 70, 51, 18, '#10b981'],
                    [-49, 48, 76, 60, 22, '#f43f5e'],
                    [-36, 40, 68, 51, 20, '#10b981'],
                    [-23, 44, 72, 56, 19, '#10b981']
                ];

                history.forEach(([x, wickTop, wickBottom, bodyTop, bodyHeight, color]) => {
                    const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
                    group.setAttribute('data-responsive-history', 'true');
                    group.innerHTML = `
                        <line x1="${x}" y1="${wickTop}" x2="${x}" y2="${wickBottom}" stroke="${color}" stroke-width="1.1" opacity="0.65"/>
                        <rect x="${x - 3}" y="${bodyTop}" width="7" height="${bodyHeight}" fill="${color}" rx="1" opacity="0.78"/>
                    `;
                    candlesHistory.insertBefore(group, candlesHistory.firstChild);
                });

                const volumeHistory = [
                    [-153, 8, '#f43f5e'],
                    [-140, 13, '#10b981'],
                    [-127, 7, '#f43f5e'],
                    [-114, 11, '#10b981'],
                    [-101, 15, '#10b981'],
                    [-88, 9, '#f43f5e'],
                    [-75, 12, '#10b981'],
                    [-62, 17, '#10b981'],
                    [-49, 10, '#f43f5e'],
                    [-36, 14, '#10b981'],
                    [-23, 8, '#10b981']
                ];

                volumeHistory.forEach(([x, height, color]) => {
                    const bar = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
                    bar.setAttribute('data-responsive-volume', 'true');
                    bar.setAttribute('x', x);
                    bar.setAttribute('y', 133 - height);
                    bar.setAttribute('width', '5');
                    bar.setAttribute('height', height);
                    bar.setAttribute('fill', color);
                    volumeBars.appendChild(bar);
                });
            }

            const mathChartResizeObserver = new ResizeObserver(syncMathChartHistory);
            mathChartResizeObserver.observe(mathTerminal);
            syncMathChartHistory();

            async function runEthMathPrediction() {
                while (true) {
                    // ФАЗА 1: Початковий статичний стан (детальний графік з осями)
                    mathStatus.innerText = "СТРУКТУРА СФОРМОВАНА";
                    mathStatus.className = "text-slate-400 font-semibold transition-colors truncate";
                    mathGlow.className = "absolute inset-0 bg-brand-teal/10 opacity-0 transition-opacity duration-700 pointer-events-none";
                    mathTerminal.classList.remove('border-brand-teal/50');
                    mathTerminal.classList.add('border-white/5');

                    chartViewport.style.transform = "translate(0px, 0px) scale(1)";
                    predCandles.classList.add('opacity-0');
                    targetNodes.classList.add('opacity-0');

                    [ghostC1, ghostC2, ghostC3, ghostC4, ghostC5].forEach(el => {
                        if (el) el.classList.add('opacity-0');
                    });

                    // Статична експозиція перед початком аналізу
                    await wait(2400);

                    // ФАЗА 2: Збільшення масштабу та плавний зсув свічок вліво для фокусу на сетапі
                    mathStatus.innerText = "МАСШТАБУВАННЯ СЕКТОРА...";
                    mathStatus.className = "text-brand-cyan font-semibold transition-colors truncate";
                    
                    // Зсув вліво та плавний зум з додатковим вертикальним кліренсом
                    chartViewport.style.transform = "translate(-65px, 6px) scale(1.12)";
                    await wait(1000);

                    // ФАЗА 3: Послідовне моделювання тьмяних прогнозованих свічок майбутнього руху
                    mathStatus.innerText = "ШІ МОДЕЛЮВАННЯ ТРАЄКТОРІЇ...";
                    mathStatus.className = "text-amber-300 font-semibold transition-colors truncate";
                    predCandles.classList.remove('opacity-0');

                    const ghostList = [ghostC1, ghostC2, ghostC3, ghostC4, ghostC5];
                    for (let i = 0; i < ghostList.length; i++) {
                        if (ghostList[i]) {
                            ghostList[i].classList.remove('opacity-0');
                            await wait(350);
                        }
                    }

                    await wait(250);

                    // ФАЗА 4: Поява точок на графіку (SL, Entry, Target 1, Target 2)
                    mathStatus.innerText = "✓ ТОЧКИ РОЗРАХОВАНО: TP1 / TP2";
                    mathStatus.className = "text-brand-teal font-bold transition-colors truncate";
                    
                    targetNodes.classList.remove('opacity-0');
                    mathTerminal.classList.remove('border-white/5');
                    mathTerminal.classList.add('border-brand-teal/50');
                    mathGlow.className = "absolute inset-0 bg-brand-teal/15 opacity-100 transition-opacity duration-700 pointer-events-none";

                    // Утримуємо результат для перегляду
                    await wait(7500);
                }
            }

            runEthMathPrediction();

            const deliveryTerminal = document.getElementById('delivery-terminal');
            const deliveryGlow = document.getElementById('delivery-glow');
            const latencyVal = document.getElementById('latency-val');
            const latencyBadge = document.getElementById('latency-badge');
            const deliveryPhase = document.getElementById('delivery-phase');

            const flightPath = document.getElementById('flight-path');
            const flightTrail = document.getElementById('flight-trail');
            const flightAura = document.getElementById('flight-aura');
            const flightHead = document.getElementById('flight-head');
            const flightHeadGlow = document.getElementById('flight-head-glow');
            const tgStationNode = document.getElementById('tg-station-node');
            const tgShock1 = document.getElementById('tg-shock-1');
            const tgShock2 = document.getElementById('tg-shock-2');

            const tgStandbyPlaceholder = document.getElementById('tg-standby-placeholder');
            const phonePushCard = document.getElementById('phone-push-card');

            const pathTotalLen = flightPath ? flightPath.getTotalLength() : 268;
            if (flightTrail) {
                flightTrail.setAttribute('stroke-dasharray', `${pathTotalLen}`);
                flightTrail.setAttribute('stroke-dashoffset', `${pathTotalLen}`);
            }
            if (flightAura) {
                flightAura.setAttribute('stroke-dasharray', `${pathTotalLen}`);
                flightAura.setAttribute('stroke-dashoffset', `${pathTotalLen}`);
            }

            function animateLineDrawing(durationMs) {
                return new Promise(resolve => {
                    const startTime = performance.now();
                    if (flightHead) flightHead.setAttribute('opacity', '1');
                    if (flightHeadGlow) flightHeadGlow.setAttribute('opacity', '0.6');

                    function step(time) {
                        const elapsed = time - startTime;
                        const progress = Math.min(elapsed / durationMs, 1);
                        
                        // Плавне прискорення
                        const ease = progress < 0.5 
                            ? 2 * progress * progress 
                            : -1 + (4 - 2 * progress) * progress;

                        const currentLen = ease * pathTotalLen;
                        const offsetVal = pathTotalLen - currentLen;
                        flightTrail.setAttribute('stroke-dashoffset', `${offsetVal}`);
                        if (flightAura) flightAura.setAttribute('stroke-dashoffset', `${offsetVal}`);

                        if (flightHead) {
                            const pt = flightPath.getPointAtLength(currentLen);
                            flightHead.setAttribute('cx', pt.x);
                            flightHead.setAttribute('cy', pt.y);
                            if (flightHeadGlow) {
                                flightHeadGlow.setAttribute('cx', pt.x);
                                flightHeadGlow.setAttribute('cy', pt.y);
                            }
                        }

                        // Живий лічильник затримки
                        const currentMs = (progress * 48.2).toFixed(1);
                        latencyVal.innerText = currentMs + ' ms';

                        if (progress < 1) {
                            requestAnimationFrame(step);
                        } else {
                            if (flightHead) flightHead.setAttribute('opacity', '0');
                            if (flightHeadGlow) flightHeadGlow.setAttribute('opacity', '0');
                            resolve();
                        }
                    }

                    requestAnimationFrame(step);
                });
            }

            function triggerTelegramShockwave() {
                return new Promise(resolve => {
                    const startTime = performance.now();
                    const duration = 650;

                    function waveStep(now) {
                        const elapsed = now - startTime;
                        const p = Math.min(elapsed / duration, 1);

                        // Розширення першої хвилі
                        const r1 = 10 + p * 18;
                        const op1 = Math.max(0, 0.8 * (1 - p));
                        tgShock1.setAttribute('r', r1.toFixed(1));
                        tgShock1.setAttribute('opacity', op1.toFixed(2));

                        // Розширення другої хвилі з затримкою
                        const p2 = Math.max(0, (p - 0.2) / 0.8);
                        const r2 = 10 + p2 * 14;
                        const op2 = Math.max(0, 0.5 * (1 - p2));
                        tgShock2.setAttribute('r', r2.toFixed(1));
                        tgShock2.setAttribute('opacity', op2.toFixed(2));

                        if (p < 1) {
                            requestAnimationFrame(waveStep);
                        } else {
                            tgShock1.setAttribute('opacity', '0');
                            tgShock2.setAttribute('opacity', '0');
                            resolve();
                        }
                    }

                    requestAnimationFrame(waveStep);
                });
            }

            async function runDeliverySimulation() {
                while (true) {
                    // ФАЗА 1: Очікування відправки (Standby)
                    deliveryTerminal.classList.remove('border-cyan-400/50', 'shadow-[0_0_20px_rgba(34,211,238,0.2)]');
                    deliveryTerminal.classList.add('border-white/5');
                    deliveryGlow.className = "absolute inset-0 bg-cyan-400/10 opacity-0 transition-opacity duration-700 pointer-events-none";
                    
                    latencyBadge.className = "flex items-center gap-1 text-[7.5px] sm:text-[8px] font-mono bg-white/5 text-slate-400 border border-white/10 px-2 py-0.5 rounded font-bold transition-all";
                    latencyVal.innerText = "STANDBY";
                    if (deliveryPhase) deliveryPhase.innerText = "ROUTED";
                    deliveryTerminal.classList.remove('is-delivered');

                    // Сховати телефонний пуш і показати очікування
                    if (phonePushCard && tgStandbyPlaceholder) {
                        phonePushCard.classList.add('translate-y-3', 'scale-90', 'opacity-0', 'pointer-events-none');
                        phonePushCard.classList.remove('translate-y-0', 'scale-100', 'opacity-100');
                        tgStandbyPlaceholder.classList.remove('opacity-0');
                    }

                    // Скидання лінії та головної точки
                    flightTrail.setAttribute('stroke-dashoffset', `${pathTotalLen}`);
                    if (flightAura) flightAura.setAttribute('stroke-dashoffset', `${pathTotalLen}`);
                    if (flightHead) {
                        flightHead.setAttribute('cx', '36');
                        flightHead.setAttribute('cy', '26');
                        flightHead.setAttribute('opacity', '0');
                    }
                    if (flightHeadGlow) {
                        flightHeadGlow.setAttribute('cx', '36');
                        flightHeadGlow.setAttribute('cy', '26');
                        flightHeadGlow.setAttribute('opacity', '0');
                    }

                    tgStationNode.style.transform = 'translate(304px, 26px) scale(1)';

                    await wait(1500);

                    // ФАЗА 2: Малювання прямої горизонтальної лінії передачі
                    latencyBadge.className = "flex items-center gap-1 text-[7.5px] sm:text-[8px] font-mono bg-cyan-400/15 text-cyan-300 border border-cyan-400/30 px-2 py-0.5 rounded font-bold transition-all";
                    if (deliveryPhase) deliveryPhase.innerText = "TRANSMITTING";
                    await animateLineDrawing(1100);

                    // ФАЗА 3: Дотик до Telegram, імпульс і спливання push-сповіщення
                    tgStationNode.style.transform = 'translate(304px, 26px) scale(1.15)';
                    setTimeout(() => { tgStationNode.style.transform = 'translate(304px, 26px) scale(1)'; }, 250);
                    triggerTelegramShockwave();

                    latencyVal.innerText = "48.2 ms";
                    if (deliveryPhase) deliveryPhase.innerText = "DELIVERED";
                    deliveryTerminal.classList.add('is-delivered');
                    latencyBadge.className = "flex items-center gap-1 text-[7.5px] sm:text-[8px] font-mono bg-cyan-400/25 text-cyan-200 border border-cyan-400/60 px-2 py-0.5 rounded font-bold transition-all shadow-[0_0_12px_rgba(34,211,238,0.3)]";

                    deliveryTerminal.classList.remove('border-white/5');
                    deliveryTerminal.classList.add('border-cyan-400/50', 'shadow-[0_0_20px_rgba(34,211,238,0.2)]');
                    deliveryGlow.className = "absolute inset-0 bg-cyan-400/15 opacity-100 transition-opacity duration-700 pointer-events-none";

                    // ВИСКАКУВАННЯ ТЕЛЕФОННОГО ПУШ-СПОВІЩЕННЯ (Лише після приходу лінії)
                    if (phonePushCard && tgStandbyPlaceholder) {
                        tgStandbyPlaceholder.classList.add('opacity-0');
                        await wait(60);
                        phonePushCard.classList.remove('translate-y-3', 'scale-90', 'opacity-0', 'pointer-events-none');
                        phonePushCard.classList.add('translate-y-0', 'scale-100', 'opacity-100');
                    }

                    // Пауза для перегляду результату
                    await wait(6500);
                }
            }

            runDeliverySimulation();
        });



        // Advanced Switcher Logic
        function switchPipeline(type) {
            const sysEl = document.getElementById('pipeline-system');
            const userEl = document.getElementById('pipeline-user');
            const btnSys = document.getElementById('btn-system');
            const btnUser = document.getElementById('btn-user');
            const indicator = document.getElementById('switch-indicator');

            if (type === 'system') {
                // Update indicator position
                indicator.style.transform = 'translateX(0)';
                
                // Button styles
                btnSys.classList.remove('text-slate-400');
                btnSys.classList.add('text-ink-950');
                btnUser.classList.remove('text-ink-950');
                btnUser.classList.add('text-slate-400');
                
                // Container visibility with animation
                userEl.style.opacity = '0';
                userEl.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    userEl.classList.add('absolute', 'pointer-events-none');
                    sysEl.classList.remove('absolute', 'pointer-events-none');
                    
                    // Small delay to allow display change before transition
                    setTimeout(() => {
                        sysEl.style.opacity = '1';
                        sysEl.style.transform = 'translateY(0)';
                    }, 50);
                }, 400); // Wait for fade out

            } else {
                // Update indicator position
                indicator.style.transform = 'translateX(100%)';
                
                // Button styles
                btnUser.classList.remove('text-slate-400');
                btnUser.classList.add('text-ink-950');
                btnSys.classList.remove('text-ink-950');
                btnSys.classList.add('text-slate-400');
                
                // Container visibility with animation
                sysEl.style.opacity = '0';
                sysEl.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    sysEl.classList.add('absolute', 'pointer-events-none');
                    userEl.classList.remove('absolute', 'pointer-events-none');
                    
                    // Small delay to allow display change before transition
                    setTimeout(() => {
                        userEl.style.opacity = '1';
                        userEl.style.transform = 'translateY(0)';
                    }, 50);
                }, 400); // Wait for fade out
            }
        }




        document.addEventListener('DOMContentLoaded', () => {
            /* Scroll Progress Bar */
            window.addEventListener('scroll', () => {
                const h = document.documentElement.scrollHeight - window.innerHeight;
                const scrolled = h > 0 ? (window.scrollY / h) * 100 : 0;
                const bar = document.getElementById('scroll-progress');
                if(bar) bar.style.width = scrolled + '%';
            });

            /* Navbar scroll effect */
            const navbar = document.getElementById('navbar');
            window.addEventListener('scroll', () => {
                if (window.scrollY > 20) {
                    navbar.classList.add('glass', 'shadow-lg', 'border-white/5');
                    navbar.classList.remove('border-transparent');
                } else {
                    navbar.classList.remove('glass', 'shadow-lg', 'border-white/5');
                    navbar.classList.add('border-transparent');
                }
            });

            /* FAQ Accordion Logic */
            const faqBtns = document.querySelectorAll('.faq-btn');
            faqBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    const content = btn.nextElementSibling;
                    const icon = btn.querySelector('svg');
                    
                    faqBtns.forEach(otherBtn => {
                        if (otherBtn !== btn) {
                            otherBtn.nextElementSibling.style.maxHeight = null;
                            otherBtn.querySelector('svg').classList.remove('rotate-180');
                        }
                    });

                    if (content.style.maxHeight) {
                        content.style.maxHeight = null;
                        icon.classList.remove('rotate-180');
                    } else {
                        content.style.maxHeight = content.scrollHeight + "px";
                        icon.classList.add('rotate-180');
                    }
                });
            });

            /* Intersection Observer for scroll animations */
            const revealElements = document.querySelectorAll('.reveal');
            const revealOptions = { threshold: 0.15, rootMargin: "0px 0px -50px 0px" };

            const revealOnScroll = new IntersectionObserver(function(entries, observer) {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('active');
                        observer.unobserve(entry.target);
                    }
                });
            }, revealOptions);

            revealElements.forEach(el => {
                if(!el.classList.contains('active')) revealOnScroll.observe(el);
            });

            /* Testimonials and case study carousels */
            /* Логіка IntersectionObserver для паузи Терміналу */
            const terminalWrapper = document.getElementById('ai-terminal-wrapper');
            if (terminalWrapper) {
                const terminalObserver = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            startAnalysis();
                        } else {
                            clearAllTimers();
                        }
                    });
                }, { threshold: 0.1 }); 
                
                terminalObserver.observe(terminalWrapper);
            }
        });

        /* Form submit handler (Mock) */
        function showSuccessMessage() {
            const formInputs = document.querySelectorAll('form input, form button');
            formInputs.forEach(el => el.style.display = 'none');
            const successMsg = document.getElementById('success-message');
            successMsg.classList.remove('hidden');
            successMsg.classList.add('block');
        }

        const COINS = [
                    { sym: 'BTC', name: 'Bitcoin', id: 'btc', color: '#f7931a' },
                    { sym: 'ETH', name: 'Ethereum', id: 'eth', color: '#627eea' },
                    { sym: 'SOL', name: 'Solana', id: 'sol', color: '#14f195' },
                    { sym: 'XRP', name: 'XRP', id: 'xrp', color: '#4a90d9' }
                ];

        const ANALYSIS = {
            BTC: { lines: ['Підключаю потік 15m · 1H · 4H', 'RSI 62 · MACD — бичачий перетин', 'Тренд висхідний, обсяг зростає', 'Stage 1 ✓ впевненість 0.83', 'Stage 2 → формую угоду'], side: 'LONG', entry: '64 850', tp1: '66 100', tp2: '67 420', sl: '63 780', reasoning: 'Сильний висхідний тренд підтверджено індикаторами RSI та MACD. Локальне накопичення завершено, ймовірність подальшого імпульсу висока.' },
            ETH: { lines: ['Підключаю потік 15m · 1H · 4H', 'EMA50 > EMA200 · імпульс росте', 'Пробій опору підтверджено', 'Stage 1 ✓ впевненість 0.79', 'Stage 2 → формую угоду'], side: 'LONG', entry: '3 420', tp1: '3 510', tp2: '3 610', sl: '3 335', reasoning: 'Пробій ключового рівня опору на підвищених обсягах. Ковзні середні (EMA) вказують на продовження висхідного руху.' },
            SOL: { lines: ['Підключаю потік 15m · 1H · 4H', 'Пробій локальної підтримки', 'Обсяг продажів зростає', 'Stage 1 ✓ впевненість 0.82', 'Stage 2 → формую угоду'], side: 'SHORT', entry: '152.4', tp1: '146.0', tp2: '141.0', sl: '155.8', reasoning: 'Пробій локальної підтримки на високих обсягах. Ведмежа дивергенція по RSI вказує на продовження низхідного руху, формуємо шорт-позицію.' },
            XRP: { lines: ['Підключаю потік 15m · 1H · 4H', 'Обсяг падає · тренд слабкий', 'Ринок у флеті, чіткого руху немає', 'Stage 1 ✗ впевненість 0.34', 'Пропускаю — бережу депозит'], side: 'SKIP', reasoning: 'Відсутність чітко вираженого тренду (флет) та критичне падіння торгових обсягів. Ризик хибного пробою занадто високий для безпечного входу.' },
        };

        const order = ['BTC', 'ETH', 'SOL', 'XRP'];
        let currentIndex = 1; 
        let timers = [];
        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        function getCoinIconHTML(coin) {
            const url = `https://cdn.jsdelivr.net/npm/cryptocurrency-icons@0.18.1/svg/color/${coin.id}.svg`;
            return `<img src="${url}" width="16" height="16" alt="${coin.name}" loading="lazy" class="rounded-full" onerror="this.outerHTML='<span class=\\'grid place-items-center rounded-full font-bold text-ink-950\\' style=\\'width:16px;height:16px;background:${coin.color};font-size:6px\\'>${coin.sym[0]}</span>'" />`;
        }

        function renderTabs() {
            const tabsContainer = document.getElementById('coin-tabs');
            if (!tabsContainer) return;
            tabsContainer.innerHTML = '';
            order.forEach((sym, i) => {
                const coin = COINS.find(c => c.sym === sym);
                const btn = document.createElement('button');
                
                if (i === currentIndex) {
                    btn.className = "flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold transition bg-brand-cyan/20 text-brand-cyan ring-1 ring-brand-cyan/40";
                } else {
                    btn.className = "flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold transition bg-white/5 text-slate-400 hover:bg-white/10";
                }
                
                btn.innerHTML = `${getCoinIconHTML(coin)} ${sym}`;
                btn.onclick = () => {
                    if (currentIndex !== i) {
                        currentIndex = i;
                        startAnalysis();
                    }
                };
                tabsContainer.appendChild(btn);
            });
        }

        function clearAllTimers() {
            timers.forEach(t => clearTimeout(t));
            timers = [];
        }

        function showResult(sym) {
            const resultContainer = document.getElementById('signal-result-container');
            const a = ANALYSIS[sym];
            const coin = COINS.find(c => c.sym === sym);
            if(!resultContainer) return;
            
            if (a.side === 'SKIP') {
                const bigIconUrl = `https://cdn.jsdelivr.net/npm/cryptocurrency-icons@0.18.1/svg/color/${coin.id}.svg`;
                const iconHtml = `<img src="${bigIconUrl}" width="22" height="22" class="rounded-full bg-white/10 p-[1px] shadow-[0_0_8px_rgba(255,255,255,0.1)]" onerror="this.style.display='none'">`;

                resultContainer.innerHTML = `
                    <div class="animate-signalPop mt-3 flex flex-col gap-2 rounded-2xl bg-amber-400/10 p-3 ring-1 ring-amber-400/30">
                         <div class="flex items-center justify-between">
                            <div class="flex items-center gap-2.5">
                                ${iconHtml}
                                <div class="flex flex-col">
                                    <span class="font-display font-semibold text-white leading-none">${sym}/USDT</span>
                                    <span class="text-[10px] text-amber-400/80 mt-1">Пропуск сигналу</span>
                                </div>
                            </div>
                            <span class="rounded-full bg-amber-400/20 px-2.5 py-0.5 text-xs font-bold text-amber-400 tracking-wide">${a.side}</span>
                        </div>
                        <div class="mt-3 rounded-lg bg-black/20 p-2.5 border border-white/5">
                            <div class="flex items-center gap-1.5 mb-1 text-[11px] font-semibold text-brand-cyan">
                                <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                                Аналіз ШІ
                            </div>
                            <p class="text-xs text-slate-400 leading-relaxed">${a.reasoning}</p>
                        </div>
                    </div>
                `;
            } else {
                const bigIconUrl = `https://cdn.jsdelivr.net/npm/cryptocurrency-icons@0.18.1/svg/color/${coin.id}.svg`;
                const iconHtml = `<img src="${bigIconUrl}" width="22" height="22" class="rounded-full" onerror="this.style.display='none'">`;
                
                const isShort = a.side === 'SHORT';
                const containerClasses = isShort ? 'bg-brand-teal/10 ring-brand-teal/30' : 'bg-brand-teal/10 ring-brand-teal/30';
                const badgeClasses = isShort ? 'bg-rose-500/20 text-rose-400' : 'bg-brand-teal/20 text-brand-teal';

                resultContainer.innerHTML = `
                    <div class="animate-signalPop mt-3 rounded-2xl ${containerClasses} p-3 ring-1">
                        <div class="flex items-center justify-between">
                            <div class="flex items-center gap-2">${iconHtml}<span class="font-display font-semibold text-white">${sym}/USDT</span></div>
                            <span class="rounded-full ${badgeClasses} px-2.5 py-0.5 text-xs font-semibold tracking-wide">${a.side}</span>
                        </div>
                        <div class="mt-3 grid grid-cols-4 gap-1.5 text-center text-xs">
                            <div class="flex flex-col justify-center rounded-lg bg-white/5 p-1.5"><p class="text-[10px] font-bold text-slate-400">Вхід</p><p class="mt-0.5 font-bold text-white whitespace-nowrap">$${a.entry}</p></div>
                            <div class="flex flex-col justify-center rounded-lg bg-brand-teal/10 p-1.5"><p class="text-[10px] font-bold text-slate-400">Ціль 1</p><p class="mt-0.5 font-bold text-brand-teal whitespace-nowrap">$${a.tp1}</p></div>
                            <div class="flex flex-col justify-center rounded-lg bg-brand-teal/10 p-1.5"><p class="text-[10px] font-bold text-slate-400">Ціль 2</p><p class="mt-0.5 font-bold text-brand-teal whitespace-nowrap">$${a.tp2}</p></div>
                            <div class="flex flex-col justify-center rounded-lg bg-rose-500/10 p-1.5"><p class="text-[10px] font-bold text-slate-400">Стоп</p><p class="mt-0.5 font-bold text-rose-300 whitespace-nowrap">$${a.sl}</p></div>
                        </div>
                        <div class="mt-3 rounded-lg bg-black/20 p-2.5 border border-white/5">
                            <div class="flex items-center gap-1.5 mb-1 text-[11px] font-semibold text-brand-cyan">
                                <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                                Аналіз ШІ
                            </div>
                            <p class="text-xs text-slate-400 leading-relaxed">${a.reasoning}</p>
                        </div>
                    </div>
                `;
            }

            timers.push(setTimeout(() => {
                currentIndex = (currentIndex + 1) % order.length;
                startAnalysis();
            }, 10000));
        }

        function startAnalysis() {
            const analyzeTarget = document.getElementById('analyze-target');
            const consoleOutput = document.getElementById('console-output');
            const typingWrapper = document.getElementById('typing-wrapper');
            const typingText = document.getElementById('typing-text');
            const resultContainer = document.getElementById('signal-result-container');
            const scanline = document.getElementById('scanline');

            if (!analyzeTarget || !consoleOutput || !typingWrapper || !typingText) return;
            
            clearAllTimers();
            renderTabs();
            
            const sym = order[currentIndex];
            const a = ANALYSIS[sym];
            
            analyzeTarget.innerText = `${sym}/USDT`;
            consoleOutput.innerHTML = '';
            typingText.innerText = '';
            if(resultContainer) resultContainer.innerHTML = '';
            typingWrapper.style.display = 'block';
            if (!reducedMotion && scanline) scanline.style.display = 'block';

            if (reducedMotion) {
                a.lines.forEach(line => {
                    const p = document.createElement('p');
                    p.className = line.includes('✓') ? 'text-brand-teal' : line.includes('✗') ? 'text-amber-300' : 'text-slate-300';
                    p.innerHTML = `<span class="text-brand-cyan">›</span> ${line}`;
                    consoleOutput.appendChild(p);
                });
                typingWrapper.style.display = 'none';
                if(scanline) scanline.style.display = 'none';
                showResult(sym);
                return;
            }

            let lineIndex = 0;
            
            const typeLine = () => {
                const fullText = a.lines[lineIndex];
                let charIndex = 0;
                typingText.innerText = '';

                const typeChar = () => {
                    charIndex++;
                    typingText.innerText = fullText.slice(0, charIndex);
                    
                    if (charIndex < fullText.length) {
                        timers.push(setTimeout(typeChar, 24));
                    } else {
                        const p = document.createElement('p');
                        p.className = fullText.includes('✓') ? 'text-brand-teal' : fullText.includes('✗') ? 'text-amber-300' : 'text-slate-300';
                        p.innerHTML = `<span class="text-brand-cyan">›</span> ${fullText}`;
                        consoleOutput.appendChild(p);
                        
                        typingText.innerText = '';
                        lineIndex++;
                        
                        if (lineIndex < a.lines.length) {
                            timers.push(setTimeout(typeLine, 300));
                        } else {
                            typingWrapper.style.display = 'none';
                            if(scanline) scanline.style.display = 'none';
                            showResult(sym);
                        }
                    }
                };
                timers.push(setTimeout(typeChar, 24));
            };
            
            timers.push(setTimeout(typeLine, 350));
        }

        //Results Block Slider Logic
        let currentResultIndex = 0;
        const totalResultSlides = 3;

        function updateResultUI(index, shouldScroll = true) {
            currentResultIndex = index;
            const slider = document.getElementById('results-slider');
            const slides = slider ? slider.querySelectorAll('.result-slide') : [];
            
            if (shouldScroll && slides[index] && slider) {
                const sliderRect = slider.getBoundingClientRect();
                const slideRect = slides[index].getBoundingClientRect();
                // Розраховуємо зміщення слайда відносно центру контейнера
                const deltaX = (slideRect.left - sliderRect.left) - (slider.clientWidth - slideRect.width) / 2;
                
                // Прокручуємо виключно сам контейнер слайдера без зачіпання сторінки (window)
                slider.scrollBy({ left: deltaX, behavior: 'smooth' });
            }

            // Оновлення стану індикаторів (булетів)
            for (let i = 0; i < totalResultSlides; i++) {
                const dot = document.getElementById(`dot-period-${i}`);
                if (dot) {
                    if (i === index) {
                        dot.className = "w-7 h-1.5 rounded-full bg-brand-cyan transition-all duration-300";
                    } else {
                        dot.className = "w-2 h-1.5 rounded-full bg-white/20 transition-all duration-300 hover:bg-white/40";
                    }
                }
            }
        }

        function goToResultSlide(index) {
            updateResultUI(index);
        }

        function slideResultsPrev() {
            const nextIdx = (currentResultIndex - 1 + totalResultSlides) % totalResultSlides;
            updateResultUI(nextIdx);
        }

        function slideResultsNext() {
            const nextIdx = (currentResultIndex + 1) % totalResultSlides;
            updateResultUI(nextIdx);
        }

        // Автоматична синхронізація при свайпі на мобільних телефонах
        document.addEventListener('DOMContentLoaded', () => {
            const slider = document.getElementById('results-slider');
            if (!slider) return;

            let scrollTimer;
            slider.addEventListener('scroll', () => {
                window.clearTimeout(scrollTimer);
                scrollTimer = setTimeout(() => {
                    const scrollLeft = slider.scrollLeft;
                    const cardWidth = slider.querySelector('.result-slide')?.offsetWidth || 1;
                    const newIndex = Math.round(scrollLeft / cardWidth);
                    if (newIndex >= 0 && newIndex < totalResultSlides && newIndex !== currentResultIndex) {
                        // Передаємо shouldScroll = false, оскільки користувач уже скролить пальцем
                        updateResultUI(newIndex, false);
                    }
                }, 75);
            }, { passive: true });
        });

        // Логіка слайдера для відгуків
                document.addEventListener('DOMContentLoaded', function initQuantXReviewsSlider() {
            const track = document.getElementById('reviews-track');
            const dotsContainer = document.getElementById('reviews-dots');
            const reviewsSection = document.getElementById('reviews'); // Головна обгортка секції

            if (!track || !dotsContainer || !reviewsSection) return;

            const cards = Array.from(track.querySelectorAll('.review-card'));
            let activeIndex = 0;
            let maxIndex = 0;
            
            // Нова логіка точної синхронізації JS та CSS
            let autoplayTimer = null;
            let isHovered = false;
            const AUTOPLAY_DELAY = 5500;
            let timeRemaining = AUTOPLAY_DELAY;
            let lastStartTime = 0;

            // Обчислення кількості видимих карток та реальних кроків скролу
            function calculateSteps() {
                if (!cards.length) return 1;
                
                const trackWidth = track.clientWidth;
                const paddingLeft = parseInt(window.getComputedStyle(track).paddingLeft) || 0;
                const gap = parseInt(window.getComputedStyle(track).gap) || 0;
                const cardWidth = cards[0].offsetWidth;
                
                const visibleCards = Math.max(1, Math.floor((trackWidth - paddingLeft) / (cardWidth + gap)));
                
                maxIndex = Math.max(0, cards.length - visibleCards);
                if (activeIndex > maxIndex) activeIndex = maxIndex;
                
                return maxIndex + 1;
            }

            // Створення точок пагінації
            function renderDots() {
                const stepsCount = calculateSteps();
                dotsContainer.innerHTML = '';

                for (let idx = 0; idx < stepsCount; idx++) {
                    const dot = document.createElement('button');
                    dot.type = 'button';
                    dot.className = `reviews-dot ${idx === activeIndex ? 'is-active' : ''} ${isHovered ? 'is-paused' : ''}`;
                    dot.setAttribute('aria-label', `Перейти до слайду ${idx + 1}`);
                    dot.innerHTML = '<span class="reviews-dot-fill"></span>';
                    
                    dot.addEventListener('click', () => {
                        scrollToStep(idx);
                    });
                    
                    dotsContainer.appendChild(dot);
                }
            }

            // Оновлення активного індикатора з перезапуском CSS-анімації
            function updateDotsState(resetAnimation = false) {
                const dots = dotsContainer.querySelectorAll('.reviews-dot');
                dots.forEach((dot, idx) => {
                    const isActive = idx === activeIndex;
                    if (resetAnimation && isActive) {
                        dot.classList.remove('is-active');
                        void dot.offsetWidth; // Force reflow для чистого старту анімації
                    }
                    dot.classList.toggle('is-active', isActive);
                    dot.classList.toggle('is-paused', isActive && isHovered);
                });
            }

            // Плавна прокрутка до потрібного кроку та скидання таймера
            function scrollToStep(index) {
                if (!cards.length) return;
                const clampedIndex = Math.max(0, Math.min(index, maxIndex));
                const targetCard = cards[clampedIndex];
                if (!targetCard) return;

                activeIndex = clampedIndex;
                const paddingLeft = parseInt(window.getComputedStyle(track).paddingLeft) || 0;
                
                const scrollLeftTarget = targetCard.offsetLeft - track.offsetLeft - paddingLeft;

                track.scrollTo({
                    left: scrollLeftTarget,
                    behavior: 'smooth'
                });

                updateDotsState(true);

                // Синхронізація: скидаємо таймер при кожному зміщенні
                timeRemaining = AUTOPLAY_DELAY;
                lastStartTime = Date.now();
                stopAutoplay();
                if (!isHovered) {
                    startAutoplay();
                }
            }

            // Синхронізація активної точки під час ручного скролу/свайпу
            function handleTrackScroll() {
                if (!cards.length) return;
                const trackLeft = track.scrollLeft;
                const paddingLeft = parseInt(window.getComputedStyle(track).paddingLeft) || 0;
                let closestIdx = 0;
                let minDistance = Infinity;

                for (let idx = 0; idx <= maxIndex; idx++) {
                    const cardOffset = cards[idx].offsetLeft - track.offsetLeft - paddingLeft;
                    const distance = Math.abs(cardOffset - trackLeft);
                    if (distance < minDistance) {
                        minDistance = distance;
                        closestIdx = idx;
                    }
                }

                if (closestIdx !== activeIndex) {
                    activeIndex = closestIdx;
                    updateDotsState(true);
                    
                    // Скидаємо таймер, якщо користувач просвайпав слайд
                    timeRemaining = AUTOPLAY_DELAY;
                    lastStartTime = Date.now();
                    stopAutoplay();
                    if (!isDown && !isHovered) {
                        startAutoplay();
                    }
                }
            }

            // Автопрокрутка з урахуванням залишкового часу
            function startAutoplay() {
                stopAutoplay();
                if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || maxIndex <= 0) return;
                
                lastStartTime = Date.now();
                autoplayTimer = setTimeout(() => {
                    const nextIndex = activeIndex + 1 <= maxIndex ? activeIndex + 1 : 0;
                    scrollToStep(nextIndex); // Ця функція сама перезапустить startAutoplay
                }, timeRemaining);
            }

            function stopAutoplay() {
                if (autoplayTimer) {
                    clearTimeout(autoplayTimer);
                    autoplayTimer = null;
                }
            }

            // Пауза з вирахуванням пройденого часу
            function pauseAutoplay() {
                if (!isHovered) {
                    isHovered = true;
                    stopAutoplay();
                    timeRemaining -= (Date.now() - lastStartTime);
                    updateDotsState(false);
                }
            }

            // Відновлення з того ж місця, де зупинились
            function resumeAutoplay() {
                if (isHovered) {
                    isHovered = false;
                    updateDotsState(false);
                    if (timeRemaining <= 0) timeRemaining = AUTOPLAY_DELAY; // Fallback
                    startAutoplay();
                }
            }

            // Підтримка перетягування мишкою (Drag-to-scroll)
            let isDown = false;
            let hasDragged = false;
            let startX = 0;
            let scrollLeftStart = 0;

            track.addEventListener('mousedown', (e) => {
                isDown = true;
                hasDragged = false;
                startX = e.pageX - track.offsetLeft;
                scrollLeftStart = track.scrollLeft;
                stopAutoplay();
            });

            window.addEventListener('mouseup', () => {
                if (!isDown) return;
                isDown = false;
                track.classList.remove('is-dragging');
                if (hasDragged) {
                    handleTrackScroll();
                    scrollToStep(activeIndex); // Вирівнюємо картку по snap-точці
                }
                if (!isHovered) {
                    startAutoplay();
                }
            });

            track.addEventListener('mousemove', (e) => {
                if (!isDown) return;
                const x = e.pageX - track.offsetLeft;
                const walk = (x - startX) * 1.5; // Прискорення драгу
                if (Math.abs(walk) > 5) {
                    hasDragged = true;
                    track.classList.add('is-dragging');
                    e.preventDefault();
                    track.scrollLeft = scrollLeftStart - walk;
                }
            });

            // Відстеження ховеру тільки на треку з картками (щоб наведення на пагінацію не ставило на паузу)
            track.addEventListener('mouseenter', pauseAutoplay);
            track.addEventListener('mouseleave', resumeAutoplay);

            // Відстеження скролу (наприклад, тач-свайпи на мобільних)
            let scrollTimeout;
            track.addEventListener('scroll', () => {
                if (isDown) return;
                clearTimeout(scrollTimeout);
                scrollTimeout = setTimeout(handleTrackScroll, 60);
            }, { passive: true });

            window.addEventListener('resize', () => {
                renderDots();
            });

            // Ініціалізація
            renderDots();
            startAutoplay();
        });

        // ===== ПОЧАТОК БЛОКУ ДАНИХ ЗВІТІВ ТА ГЕНЕРАЦІЇ УГОД =====
        const reportsData = [
            {
                id: "period-1",
                dates: ["03.07", "04.07"],
                totalPnl: "+32.76%",
                trades: [
                    { pair: "ADAUSDT", type: "LONG", action: "TP2", pnl: "+2.55%", isProfit: true },
                    { pair: "BTCUSDT", type: "LONG", action: "TP2", pnl: "+0.91%", isProfit: true },
                    { pair: "ADAUSDT", type: "LONG", action: "TP2", pnl: "+1.42%", isProfit: true },
                    { pair: "ETHUSDT", type: "LONG", action: "TP2", pnl: "+1.71%", isProfit: true },
                    { pair: "ADAUSDT", type: "LONG", action: "TP2", pnl: "+3.76%", isProfit: true },
                    { pair: "SOLUSDT", type: "LONG", action: "SL", pnl: "-0.99%", isProfit: false },
                    { pair: "ADAUSDT", type: "LONG", action: "SL", pnl: "-1.08%", isProfit: false },
                    { pair: "BTCUSDT", type: "LONG", action: "TP2", pnl: "+0.92%", isProfit: true },
                    { pair: "ADAUSDT", type: "LONG", action: "TP2", pnl: "+3.63%", isProfit: true },
                    { pair: "SOLUSDT", type: "LONG", action: "TP2", pnl: "+1.22%", isProfit: true },
                    { pair: "ADAUSDT", type: "LONG", action: "TP2", pnl: "+4.70%", isProfit: true },
                    { pair: "BNBUSDT", type: "LONG", action: "TP2", pnl: "+1.13%", isProfit: true },
                    { pair: "BTCUSDT", type: "LONG", action: "TP2", pnl: "+0.85%", isProfit: true },
                    { pair: "SOLUSDT", type: "LONG", action: "TP2", pnl: "+1.46%", isProfit: true },
                    { pair: "ETHUSDT", type: "LONG", action: "TP2", pnl: "+1.41%", isProfit: true },
                    { pair: "ADAUSDT", type: "LONG", action: "SL", pnl: "-2.59%", isProfit: false },
                    { pair: "BTCUSDT", type: "LONG", action: "TP1", pnl: "+0.49%", isProfit: true },
                    { pair: "ETHUSDT", type: "LONG", action: "TP2", pnl: "+1.65%", isProfit: true },
                    { pair: "ETHUSDT", type: "LONG", action: "SL", pnl: "-1.03%", isProfit: false },
                    { pair: "XRPUSDT", type: "LONG", action: "TP2", pnl: "+1.10%", isProfit: true },
                    { pair: "BTCUSDT", type: "LONG", action: "TP2", pnl: "+0.63%", isProfit: true },
                    { pair: "XRPUSDT", type: "LONG", action: "TP2", pnl: "+1.44%", isProfit: true },
                    { pair: "BTCUSDT", type: "LONG", action: "SL", pnl: "-0.53%", isProfit: false },
                    { pair: "ETHUSDT", type: "LONG", action: "TP2", pnl: "+1.17%", isProfit: true },
                    { pair: "SOLUSDT", type: "LONG", action: "TP2", pnl: "+1.01%", isProfit: true },
                    { pair: "ETHUSDT", type: "LONG", action: "TP2", pnl: "+1.38%", isProfit: true },
                    { pair: "ADAUSDT", type: "LONG", action: "TP2", pnl: "+2.49%", isProfit: true },
                    { pair: "XRPUSDT", type: "LONG", action: "TP2", pnl: "+0.78%", isProfit: true },
                    { pair: "SOLUSDT", type: "LONG", action: "TP2", pnl: "+1.13%", isProfit: true }
                ]
            },
            {
                id: "period-2",
                dates: ["05.07"],
                totalPnl: "-6.76%",
                trades: [
                    { pair: "BTCUSDT", type: "LONG", action: "TP1", pnl: "+0.46%", isProfit: true, note: "Розворот по SL" },
                    { pair: "ETHUSDT", type: "LONG", action: "SL", pnl: "-1.38%", isProfit: false },
                    { pair: "XRPUSDT", type: "LONG", action: "SL", pnl: "-1.45%", isProfit: false },
                    { pair: "ADAUSDT", type: "LONG", action: "SL", pnl: "-3.32%", isProfit: false },
                    { pair: "BTCUSDT", type: "LONG", action: "SL", pnl: "-0.80%", isProfit: false },
                    { pair: "XRPUSDT", type: "LONG", action: "SL", pnl: "-0.89%", isProfit: false },
                    { pair: "BTCUSDT", type: "LONG", action: "SL", pnl: "-0.58%", isProfit: false },
                    { pair: "XRPUSDT", type: "LONG", action: "SL", pnl: "-0.81%", isProfit: false },
                    { pair: "BNBUSDT", type: "SHORT", action: "TP1", pnl: "+0.38%", isProfit: true, note: "Розворот по SL" },
                    { pair: "XRPUSDT", type: "SHORT", action: "TP1", pnl: "+0.55%", isProfit: true },
                    { pair: "ETHUSDT", type: "SHORT", action: "TP1", pnl: "+0.54%", isProfit: true },
                    { pair: "BTCUSDT", type: "SHORT", action: "SL", pnl: "-0.65%", isProfit: false },
                    { pair: "BNBUSDT", type: "SHORT", action: "SL", pnl: "-0.55%", isProfit: false },
                    { pair: "ETHUSDT", type: "LONG", action: "TP1", pnl: "+0.47%", isProfit: true },
                    { pair: "BTCUSDT", type: "LONG", action: "TP1", pnl: "+0.27%", isProfit: true },
                    { pair: "XRPUSDT", type: "LONG", action: "TP1", pnl: "+0.50%", isProfit: true, note: "Розворот по SL" },
                    { pair: "ETHUSDT", type: "LONG", action: "TP1", pnl: "+0.46%", isProfit: true, note: "Розворот по SL" },
                    { pair: "BTCUSDT", type: "SHORT", action: "SL", pnl: "-0.49%", isProfit: false },
                    { pair: "BNBUSDT", type: "LONG", action: "TP2", pnl: "+1.18%", isProfit: true },
                    { pair: "SOLUSDT", type: "SHORT", action: "SL", pnl: "-0.66%", isProfit: false }
                ]
            },
            {
                id: "period-3",
                dates: ["06.07"],
                totalPnl: "+3.00%",
                trades: [
                    { pair: "BNBUSDT", type: "LONG", action: "SL", pnl: "-0.71%", isProfit: false },
                    { pair: "BNBUSDT", type: "LONG", action: "SL", pnl: "-0.73%", isProfit: false },
                    { pair: "ADAUSDT", type: "SHORT", action: "TP2", pnl: "+2.52%", isProfit: true },
                    { pair: "ETHUSDT", type: "SHORT", action: "TP2", pnl: "+1.34%", isProfit: true },
                    { pair: "ADAUSDT", type: "SHORT", action: "SL", pnl: "-1.20%", isProfit: false },
                    { pair: "SOLUSDT", type: "LONG", action: "TP1", pnl: "+0.36%", isProfit: true, note: "Розворот по SL" },
                    { pair: "BTCUSDT", type: "LONG", action: "SL", pnl: "-0.44%", isProfit: false },
                    { pair: "XRPUSDT", type: "SHORT", action: "TP2", pnl: "+1.06%", isProfit: true },
                    { pair: "BNBUSDT", type: "SHORT", action: "TP1", pnl: "+0.59%", isProfit: true, note: "Розворот по SL" },
                    { pair: "BTCUSDT", type: "LONG", action: "SL", pnl: "-0.90%", isProfit: false },
                    { pair: "ETHUSDT", type: "SHORT", action: "TP1", pnl: "+0.48%", isProfit: true, note: "Розворот по SL" },
                    { pair: "SOLUSDT", type: "SHORT", action: "SL", pnl: "-0.67%", isProfit: false },
                    { pair: "XRPUSDT", type: "SHORT", action: "SL", pnl: "-0.92%", isProfit: false },
                    { pair: "ADAUSDT", type: "LONG", action: "TP2", pnl: "+2.23%", isProfit: true }
                ]
            },
            {
                id: "period-4",
                dates: ["07.07", "08.07", "09.07"],
                totalPnl: "+13.84%",
                trades: [
                    { pair: "ETHUSDT", type: "LONG", action: "SL", pnl: "-0.66%", isProfit: false },
                    { pair: "ADAUSDT", type: "SHORT", action: "TP2", pnl: "+2.75%", isProfit: true },
                    { pair: "ADAUSDT", type: "SHORT", action: "TP2", pnl: "+2.54%", isProfit: true },
                    { pair: "ADAUSDT", type: "SHORT", action: "TP2", pnl: "+1.97%", isProfit: true },
                    { pair: "XRPUSDT", type: "SHORT", action: "SL", pnl: "-1.08%", isProfit: false },
                    { pair: "ADAUSDT", type: "SHORT", action: "TP2", pnl: "+3.38%", isProfit: true },
                    { pair: "ADAUSDT", type: "SHORT", action: "TP2", pnl: "+3.11%", isProfit: true },
                    { pair: "ADAUSDT", type: "SHORT", action: "TP2", pnl: "+2.88%", isProfit: true },
                    { pair: "XRPUSDT", type: "SHORT", action: "TP2", pnl: "+0.96%", isProfit: true },
                    { pair: "ADAUSDT", type: "SHORT", action: "TP2", pnl: "+2.25%", isProfit: true },
                    { pair: "ADAUSDT", type: "SHORT", action: "TP1", pnl: "+0.84%", isProfit: true },
                    { pair: "ADAUSDT", type: "SHORT", action: "SL", pnl: "-1.50%", isProfit: false },
                    { pair: "XRPUSDT", type: "SHORT", action: "SL", pnl: "-0.88%", isProfit: false },
                    { pair: "ADAUSDT", type: "SHORT", action: "SL", pnl: "-0.84%", isProfit: false },
                    { pair: "XRPUSDT", type: "LONG", action: "SL", pnl: "-1.01%", isProfit: false },
                    { pair: "BTCUSDT", type: "LONG", action: "SL", pnl: "-0.85%", isProfit: false },
                    { pair: "ADAUSDT", type: "LONG", action: "TP1", pnl: "+1.08%", isProfit: true },
                    { pair: "ETHUSDT", type: "SHORT", action: "SL", pnl: "-1.32%", isProfit: false },
                    { pair: "XRPUSDT", type: "SHORT", action: "SL", pnl: "-1.19%", isProfit: false },
                    { pair: "XRPUSDT", type: "SHORT", action: "TP1", pnl: "+0.23%", isProfit: true, note: "Розворот по SL" },
                    { pair: "BNBUSDT", type: "LONG", action: "TP1", pnl: "+0.45%", isProfit: true, note: "Розворот по SL" },
                    { pair: "SOLUSDT", type: "LONG", action: "TP1", pnl: "+0.42%", isProfit: true, note: "Розворот по SL" },
                    { pair: "XRPUSDT", type: "LONG", action: "TP1", pnl: "+0.34%", isProfit: true, note: "Розворот по SL" }
                ]
            },
            {
                id: "period-5",
                dates: ["10.07"],
                totalPnl: "-0.85%",
                trades: [
                    { pair: "SOLUSDT", type: "LONG", action: "TP1", pnl: "+0.32%", isProfit: true, note: "Розворот по SL" },
                    { pair: "SOLUSDT", type: "LONG", action: "TP1", pnl: "+0.20%", isProfit: true, note: "Розворот по SL" },
                    { pair: "BTCUSDT", type: "LONG", action: "TP1", pnl: "+0.33%", isProfit: true, note: "Розворот по SL" },
                    { pair: "XRPUSDT", type: "LONG", action: "SL", pnl: "-0.45%", isProfit: false },
                    { pair: "BTCUSDT", type: "LONG", action: "SL", pnl: "-0.62%", isProfit: false },
                    { pair: "XRPUSDT", type: "SHORT", action: "SL", pnl: "-0.62%", isProfit: false }
                ]
            }
        ];

        const reportsDataNext = [
            {
                id: "period-6",
                dates: ["11.07"],
                totalPnl: "+4.99%",
                trades: [
                    { pair: "ETHUSDT", type: "LONG", action: "TP2", pnl: "+0.64%", isProfit: true },
                    { pair: "ETHUSDT", type: "LONG", action: "TP2", pnl: "+0.74%", isProfit: true },
                    { pair: "BTCUSDT", type: "LONG", action: "TP2", pnl: "+0.37%", isProfit: true },
                    { pair: "BNBUSDT", type: "LONG", action: "TP2", pnl: "+0.48%", isProfit: true },
                    { pair: "BNBUSDT", type: "LONG", action: "TP1", pnl: "+0.22%", isProfit: true, note: "Розворот по SL" },
                    { pair: "ETHUSDT", type: "LONG", action: "TP2", pnl: "+0.54%", isProfit: true },
                    { pair: "XRPUSDT", type: "LONG", action: "TP2", pnl: "+0.42%", isProfit: true },
                    { pair: "BTCUSDT", type: "LONG", action: "SL", pnl: "-0.35%", isProfit: false },
                    { pair: "ETHUSDT", type: "LONG", action: "TP1", pnl: "+0.43%", isProfit: true, note: "Розворот по SL" },
                    { pair: "ADAUSDT", type: "LONG", action: "TP1", pnl: "+0.70%", isProfit: true, note: "Розворот по SL" },
                    { pair: "BTCUSDT", type: "LONG", action: "TP1", pnl: "+0.30%", isProfit: true, note: "Розворот по SL" },
                    { pair: "ETHUSDT", type: "LONG", action: "TP1", pnl: "+0.50%", isProfit: true, note: "Розворот по SL" }
                ]
            },
            {
                id: "period-7",
                dates: ["12.07"],
                totalPnl: "-1.28%",
                trades: [
                    { pair: "XRPUSDT", type: "SHORT", action: "SL", pnl: "-0.61%", isProfit: false },
                    { pair: "BTCUSDT", type: "SHORT", action: "SL", pnl: "-0.68%", isProfit: false }
                ]
            },
            {
                id: "period-8",
                dates: ["13.07", "14.07", "15.07", "16.07"],
                totalPnl: "+5.67%",
                trades: [
                    { pair: "XRPUSDT", type: "SHORT", action: "SL", pnl: "-0.61%", isProfit: false },
                    { pair: "BTCUSDT", type: "SHORT", action: "SL", pnl: "-0.68%", isProfit: false },
                    { pair: "ETHUSDT", type: "LONG", action: "SL", pnl: "-0.81%", isProfit: false },
                    { pair: "XRPUSDT", type: "LONG", action: "TP2", pnl: "+0.97%", isProfit: true },
                    { pair: "ETHUSDT", type: "LONG", action: "SL", pnl: "-1.72%", isProfit: false },
                    { pair: "XRPUSDT", type: "SHORT", action: "SL", pnl: "-0.88%", isProfit: false },
                    { pair: "BTCUSDT", type: "LONG", action: "TP1", pnl: "+0.55%", isProfit: true, note: "Розворот по SL" },
                    { pair: "ETHUSDT", type: "LONG", action: "TP1", pnl: "+0.50%", isProfit: true, note: "Розворот по SL" },
                    { pair: "BTCUSDT", type: "LONG", action: "TP1", pnl: "+0.52%", isProfit: true, note: "Розворот по SL" },
                    { pair: "BTCUSDT", type: "LONG", action: "SL", pnl: "-0.56%", isProfit: false },
                    { pair: "XRPUSDT", type: "SHORT", action: "SL", pnl: "-0.64%", isProfit: false },
                    { pair: "SOLUSDT", type: "LONG", action: "SL", pnl: "-1.57%", isProfit: false },
                    { pair: "XRPUSDT", type: "SHORT", action: "TP2", pnl: "+1.12%", isProfit: true },
                    { pair: "SOLUSDT", type: "SHORT", action: "TP1", pnl: "+0.66%", isProfit: true, note: "Розворот по SL" },
                    { pair: "XRPUSDT", type: "LONG", action: "TP2", pnl: "+1.04%", isProfit: true },
                    { pair: "XRPUSDT", type: "SHORT", action: "TP1", pnl: "+0.29%", isProfit: true, note: "Розворот по SL" },
                    { pair: "ADAUSDT", type: "LONG", action: "TP2", pnl: "+1.59%", isProfit: true },
                    { pair: "SOLUSDT", type: "SHORT", action: "TP1", pnl: "+0.37%", isProfit: true, note: "Розворот по SL" },
                    { pair: "SOLUSDT", type: "SHORT", action: "SL", pnl: "-0.71%", isProfit: false },
                    { pair: "ETHUSDT", type: "LONG", action: "TP2", pnl: "+0.92%", isProfit: true },
                    { pair: "BNBUSDT", type: "LONG", action: "TP2", pnl: "+0.28%", isProfit: true },
                    { pair: "SOLUSDT", type: "LONG", action: "TP2", pnl: "+1.56%", isProfit: true },
                    { pair: "XRPUSDT", type: "LONG", action: "TP2", pnl: "+1.25%", isProfit: true },
                    { pair: "BNBUSDT", type: "LONG", action: "TP1", pnl: "+0.60%", isProfit: true, note: "Розворот по SL" },
                    { pair: "ETHUSDT", type: "LONG", action: "TP2", pnl: "+1.94%", isProfit: true },
                    { pair: "BTCUSDT", type: "LONG", action: "TP1", pnl: "+0.61%", isProfit: true },
                    { pair: "SOLUSDT", type: "LONG", action: "TP2", pnl: "+1.66%", isProfit: true },
                    { pair: "ETHUSDT", type: "LONG", action: "TP2", pnl: "+1.84%", isProfit: true },
                    { pair: "XRPUSDT", type: "LONG", action: "TP2", pnl: "+1.16%", isProfit: true },
                    { pair: "BTCUSDT", type: "LONG", action: "TP2", pnl: "+0.67%", isProfit: true },
                    { pair: "BTCUSDT", type: "LONG", action: "SL", pnl: "-0.79%", isProfit: false },
                    { pair: "BNBUSDT", type: "LONG", action: "SL", pnl: "-0.47%", isProfit: false },
                    { pair: "ETHUSDT", type: "LONG", action: "SL", pnl: "-1.53%", isProfit: false },
                    { pair: "XRPUSDT", type: "LONG", action: "SL", pnl: "-1.04%", isProfit: false },
                    { pair: "BTCUSDT", type: "LONG", action: "SL", pnl: "-0.66%", isProfit: false },
                    { pair: "ETHUSDT", type: "LONG", action: "TP1", pnl: "+0.17%", isProfit: true, note: "Розворот по SL" },
                    { pair: "SOLUSDT", type: "SHORT", action: "TP2", pnl: "+1.40%", isProfit: true },
                    { pair: "ETHUSDT", type: "LONG", action: "SL", pnl: "-1.40%", isProfit: false },
                    { pair: "ETHUSDT", type: "LONG", action: "SL", pnl: "-1.21%", isProfit: false },
                    { pair: "ETHUSDT", type: "LONG", action: "SL", pnl: "-0.80%", isProfit: false },
                    { pair: "XRPUSDT", type: "LONG", action: "SL", pnl: "-0.50%", isProfit: false },
                    { pair: "ETHUSDT", type: "LONG", action: "TP1", pnl: "+0.55%", isProfit: true, note: "Розворот по SL" }
                ]
            },
            {
                id: "period-9",
                dates: ["17.07"],
                totalPnl: "+1.50%",
                trades: [
                    { pair: "ADAUSDT", type: "SHORT", action: "SL", pnl: "-1.70%", isProfit: false },
                    { pair: "BTCUSDT", type: "SHORT", action: "TP1", pnl: "+0.26%", isProfit: true, note: "Розворот по SL" },
                    { pair: "ETHUSDT", type: "SHORT", action: "TP2", pnl: "+1.51%", isProfit: true },
                    { pair: "XRPUSDT", type: "SHORT", action: "TP2", pnl: "+0.73%", isProfit: true },
                    { pair: "BNBUSDT", type: "SHORT", action: "TP2", pnl: "+1.10%", isProfit: true },
                    { pair: "BNBUSDT", type: "SHORT", action: "TP2", pnl: "+0.67%", isProfit: true },
                    { pair: "BTCUSDT", type: "SHORT", action: "SL", pnl: "-0.42%", isProfit: false },
                    { pair: "SOLUSDT", type: "SHORT", action: "SL", pnl: "-0.64%", isProfit: false }
                ]
            }
        ];

        const reportsDataAugust = [
            {
                id: "august-1",
                dates: ["01.08"],
                totalPnl: "+3.54%",
                trades: [
                    { pair: "ADAUSDT", type: "LONG", action: "TP2", pnl: "+1.97%", isProfit: true },
                    { pair: "ADAUSDT", type: "LONG", action: "TP2", pnl: "+2.21%", isProfit: true },
                    { pair: "ADAUSDT", type: "LONG", action: "TP2", pnl: "+2.03%", isProfit: true },
                    { pair: "ADAUSDT", type: "LONG", action: "SL", pnl: "-1.77%", isProfit: false },
                    { pair: "ETHUSDT", type: "LONG", action: "SL", pnl: "-0.39%", isProfit: false },
                    { pair: "BTCUSDT", type: "SHORT", action: "SL", pnl: "-0.50%", isProfit: false }
                ]
            },
            {
                id: "august-2",
                dates: ["02.08", "03.08"],
                totalPnl: "-3.77%",
                trades: [
                    { pair: "ADAUSDT", type: "LONG", action: "SL", pnl: "-2.21%", isProfit: false },
                    { pair: "BNBUSDT", type: "LONG", action: "TP2", pnl: "+0.58%", isProfit: true },
                    { pair: "ADAUSDT", type: "LONG", action: "SL", pnl: "-2.21%", isProfit: false },
                    { pair: "BNBUSDT", type: "LONG", action: "TP2", pnl: "+0.44%", isProfit: true },
                    { pair: "ADAUSDT", type: "LONG", action: "SL", pnl: "-1.37%", isProfit: false },
                    { pair: "ETHUSDT", type: "LONG", action: "TP2", pnl: "+0.49%", isProfit: true },
                    { pair: "SOLUSDT", type: "LONG", action: "TP2", pnl: "+0.67%", isProfit: true },
                    { pair: "BTCUSDT", type: "LONG", action: "TP1", pnl: "+0.26%", isProfit: true, note: "Розворот по SL" },
                    { pair: "ETHUSDT", type: "LONG", action: "TP2", pnl: "+0.81%", isProfit: true },
                    { pair: "ETHUSDT", type: "LONG", action: "TP1", pnl: "+0.34%", isProfit: true, note: "Розворот по SL" },
                    { pair: "ADAUSDT", type: "LONG", action: "SL", pnl: "-1.79%", isProfit: false },
                    { pair: "BTCUSDT", type: "LONG", action: "TP1", pnl: "+0.24%", isProfit: true, note: "Розворот по SL" }
                ]
            },
            {
                id: "august-3",
                dates: ["04.08"],
                totalPnl: "+1.76%",
                trades: [
                    { pair: "ETHUSDT", type: "LONG", action: "TP2", pnl: "+0.78%", isProfit: true },
                    { pair: "BTCUSDT", type: "LONG", action: "TP2", pnl: "+0.98%", isProfit: true }
                ]
            },
            {
                id: "august-4",
                dates: ["05.08"],
                totalPnl: "+0.39%",
                trades: [
                    { pair: "BNBUSDT", type: "LONG", action: "SL", pnl: "-0.45%", isProfit: false },
                    { pair: "ADAUSDT", type: "LONG", action: "TP1", pnl: "+1.02%", isProfit: true, note: "Розворот по SL" },
                    { pair: "ADAUSDT", type: "LONG", action: "SL", pnl: "-1.68%", isProfit: false },
                    { pair: "BTCUSDT", type: "LONG", action: "SL", pnl: "-0.62%", isProfit: false },
                    { pair: "BNBUSDT", type: "LONG", action: "TP1", pnl: "+0.47%", isProfit: true, note: "Розворот по SL" },
                    { pair: "BNBUSDT", type: "LONG", action: "SL", pnl: "-0.60%", isProfit: false },
                    { pair: "ETHUSDT", type: "LONG", action: "TP2", pnl: "+0.80%", isProfit: true },
                    { pair: "ETHUSDT", type: "LONG", action: "TP1", pnl: "+0.82%", isProfit: true },
                    { pair: "BTCUSDT", type: "LONG", action: "TP1", pnl: "+0.31%", isProfit: true },
                    { pair: "BTCUSDT", type: "LONG", action: "TP1", pnl: "+0.34%", isProfit: true, note: "Розворот по SL" }
                ]
            },
            {
                id: "august-5",
                dates: ["06.08"],
                totalPnl: "-2.89%",
                trades: [
                    { pair: "ETHUSDT", type: "LONG", action: "TP2", pnl: "+2.03%", isProfit: true },
                    { pair: "BTCUSDT", type: "LONG", action: "TP1", pnl: "+0.31%", isProfit: true, note: "Розворот по SL" },
                    { pair: "ETHUSDT", type: "LONG", action: "SL", pnl: "-0.51%", isProfit: false },
                    { pair: "BTCUSDT", type: "LONG", action: "TP1", pnl: "+0.17%", isProfit: true, note: "Розворот по SL" },
                    { pair: "ETHUSDT", type: "LONG", action: "TP1", pnl: "+0.29%", isProfit: true, note: "Розворот по SL" },
                    { pair: "BTCUSDT", type: "LONG", action: "TP1", pnl: "+0.15%", isProfit: true, note: "Розворот по SL" },
                    { pair: "BTCUSDT", type: "LONG", action: "SL", pnl: "-0.27%", isProfit: false },
                    { pair: "BTCUSDT", type: "LONG", action: "SL", pnl: "-0.34%", isProfit: false },
                    { pair: "ADAUSDT", type: "LONG", action: "TP2", pnl: "+3.76%", isProfit: true },
                    { pair: "ADAUSDT", type: "LONG", action: "SL", pnl: "-5.49%", isProfit: false },
                    { pair: "ADAUSDT", type: "LONG", action: "SL", pnl: "-2.99%", isProfit: false }
                ]
            },
            {
                id: "august-6",
                dates: ["07.08", "08.08"],
                totalPnl: "+3.79%",
                trades: [
                    { pair: "BTCUSDT", type: "LONG", action: "TP1", pnl: "+0.12%", isProfit: true, note: "Розворот по SL" },
                    { pair: "BTCUSDT", type: "LONG", action: "TP1", pnl: "+0.12%", isProfit: true, note: "Розворот по SL" },
                    { pair: "ETHUSDT", type: "LONG", action: "TP2", pnl: "+0.41%", isProfit: true },
                    { pair: "SOLUSDT", type: "LONG", action: "TP2", pnl: "+1.29%", isProfit: true },
                    { pair: "BTCUSDT", type: "LONG", action: "TP1", pnl: "+0.12%", isProfit: true, note: "Розворот по SL" },
                    { pair: "BNBUSDT", type: "LONG", action: "TP2", pnl: "+0.40%", isProfit: true },
                    { pair: "ETHUSDT", type: "LONG", action: "TP2", pnl: "+0.27%", isProfit: true },
                    { pair: "ETHUSDT", type: "LONG", action: "TP1", pnl: "+0.11%", isProfit: true, note: "Розворот по SL" },
                    { pair: "XRPUSDT", type: "LONG", action: "TP2", pnl: "+0.83%", isProfit: true },
                    { pair: "ETHUSDT", type: "LONG", action: "TP1", pnl: "+0.12%", isProfit: true, note: "Розворот по SL" }
                ]
            },
            {
                id: "august-7",
                dates: ["09.08"],
                totalPnl: "+3.19%",
                trades: [
                    { pair: "BNBUSDT", type: "LONG", action: "TP2", pnl: "+0.59%", isProfit: true },
                    { pair: "SOLUSDT", type: "LONG", action: "TP2", pnl: "+0.70%", isProfit: true },
                    { pair: "BNBUSDT", type: "LONG", action: "TP2", pnl: "+0.48%", isProfit: true },
                    { pair: "SOLUSDT", type: "LONG", action: "TP2", pnl: "+0.75%", isProfit: true },
                    { pair: "ETHUSDT", type: "LONG", action: "TP1", pnl: "+0.14%", isProfit: true, note: "Розворот по SL" },
                    { pair: "ETHUSDT", type: "LONG", action: "SL", pnl: "-0.26%", isProfit: false },
                    { pair: "BTCUSDT", type: "LONG", action: "TP2", pnl: "+0.31%", isProfit: true },
                    { pair: "BNBUSDT", type: "LONG", action: "TP1", pnl: "+0.36%", isProfit: true },
                    { pair: "ETHUSDT", type: "LONG", action: "TP1", pnl: "+0.13%", isProfit: true }
                ]
            },
            {
                id: "august-8",
                dates: ["10.08"],
                totalPnl: "+3.15%",
                trades: [
                    { pair: "BNBUSDT", type: "LONG", action: "TP2", pnl: "+0.59%", isProfit: true },
                    { pair: "SOLUSDT", type: "LONG", action: "TP2", pnl: "+0.70%", isProfit: true },
                    { pair: "BNBUSDT", type: "LONG", action: "TP2", pnl: "+0.48%", isProfit: true },
                    { pair: "SOLUSDT", type: "LONG", action: "TP2", pnl: "+0.75%", isProfit: true },
                    { pair: "ETHUSDT", type: "LONG", action: "TP1", pnl: "+0.14%", isProfit: true, note: "Розворот по SL" },
                    { pair: "ETHUSDT", type: "LONG", action: "SL", pnl: "-0.26%", isProfit: false },
                    { pair: "BTCUSDT", type: "LONG", action: "TP2", pnl: "+0.31%", isProfit: true },
                    { pair: "BNBUSDT", type: "LONG", action: "TP1", pnl: "+0.36%", isProfit: true, note: "Розворот по SL" },
                    { pair: "BTCUSDT", type: "LONG", action: "TP1", pnl: "+0.20%", isProfit: true, note: "Розворот по SL" },
                    { pair: "ETHUSDT", type: "LONG", action: "TP2", pnl: "+0.41%", isProfit: true },
                    { pair: "ETHUSDT", type: "LONG", action: "TP1", pnl: "+0.32%", isProfit: true, note: "Розворот по SL" },
                    { pair: "BTCUSDT", type: "LONG", action: "TP1", pnl: "+0.21%", isProfit: true, note: "Розворот по SL" },
                    { pair: "SOLUSDT", type: "LONG", action: "TP1", pnl: "+0.64%", isProfit: true, note: "Розворот по SL" },
                    { pair: "ADAUSDT", type: "LONG", action: "SL", pnl: "-0.76%", isProfit: false },
                    { pair: "SOLUSDT", type: "LONG", action: "SL", pnl: "-0.70%", isProfit: false },
                    { pair: "BNBUSDT", type: "LONG", action: "TP2", pnl: "+0.39%", isProfit: true },
                    { pair: "BNBUSDT", type: "LONG", action: "SL", pnl: "-0.63%", isProfit: false }
                ]
            }
        ];

        function renderReports(containerId, reports) {
            const container = document.getElementById(containerId);
            if (!container) return;

            container.innerHTML = reports.flatMap((report) => report.dates.map((date, dayIndex) => {
                const start = Math.floor(dayIndex * report.trades.length / report.dates.length);
                const end = Math.floor((dayIndex + 1) * report.trades.length / report.dates.length);
                const trades = report.trades.slice(start, end);
                const closedTrades = trades.filter((trade) => !trade.isOpen);
                const openTrades = trades.length - closedTrades.length;
                const wins = closedTrades.filter((trade) => trade.isProfit).length;
                const losses = closedTrades.length - wins;
                const winrate = closedTrades.length
                    ? `${(wins / closedTrades.length * 100).toFixed(1).replace(".", ",")}%`
                    : "—";
                const tradesPnl = closedTrades.reduce((sum, trade) => {
                    return sum + Number.parseFloat(trade.pnl);
                }, 0);
                const reportPnl = Number.parseFloat(report.totalPnl);
                const reportTradesPnl = report.trades.reduce((sum, trade) => {
                    return sum + (trade.isOpen ? 0 : Number.parseFloat(trade.pnl));
                }, 0);
                const pnlAdjustment = dayIndex === report.dates.length - 1
                    ? reportPnl - reportTradesPnl
                    : 0;
                const dailyPnl = report.dates.length === 1 ? reportPnl : tradesPnl + pnlAdjustment;
                const totalPnl = `${dailyPnl >= 0 ? "+" : ""}${dailyPnl.toFixed(2)}%`;
                const isProfit = dailyPnl >= 0;

                return `
                <details id="${report.id}-${dayIndex + 1}" class="group rounded-xl bg-white/[0.02] border border-white/5">
                    <summary class="list-none cursor-pointer p-3 hover:bg-white/[0.04] transition-colors font-mono text-xs">
                        <div class="flex items-center justify-between gap-3">
                            <div class="flex items-center gap-3 min-w-0">
                                <span class="px-2 py-1 rounded-lg text-[10px] font-bold text-brand-cyan border border-brand-cyan/30 bg-brand-cyan/10">Розгорнути</span>
                                <div class="min-w-0">
                                    <p class="font-bold text-white font-display text-sm">${wins} успішні / ${losses} збиткові</p>
                                    <p class="text-[11px] text-slate-400">${closedTrades.length} закритих угод · Winrate ${winrate}${openTrades ? ` · ${openTrades} відкрита` : ""}</p>
                                </div>
                            </div>
                            <div class="text-right shrink-0">
                                <span class="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-brand-cyan/10 text-brand-cyan border border-brand-cyan/30">${date}</span>
                                <p class="font-bold text-sm ${isProfit ? "text-emerald-400" : "text-rose-400"}">${totalPnl}</p>
                                <p class="text-[10px] text-slate-500">PNL за період</p>
                            </div>
                        </div>
                    </summary>
                    <ul class="grid grid-cols-1 sm:grid-cols-2 gap-1.5 p-3 pt-0 font-mono text-[11px]">
                        ${trades.map((trade) => `
                            <li class="rounded-lg bg-white/[0.03] px-2.5 py-2 text-slate-300">
                                ${trade.isOpen ? "🟨" : trade.action === "TP2" ? "🔥" : trade.action === "TP1" ? "🟩" : "🟥"}
                                ${trade.pair} (${trade.type}) · ${trade.action === "OPEN" ? "Відкрита позиція" : trade.action}
                                <span class="${trade.isOpen ? "text-amber-300" : trade.isProfit ? "text-emerald-400" : "text-rose-400"}">${trade.pnl}</span>
                                ${trade.note ? `<span class="text-slate-400">(${trade.note})</span>` : ""}
                            </li>
                        `).join("")}
                    </ul>
                </details>
                `;
            })).join("");
        }

        document.addEventListener("DOMContentLoaded", () => {
            renderReports("trades-container-1", reportsData);
            renderReports("trades-container-2", reportsDataNext);
            renderReports("trades-container-3", reportsDataAugust);
        });
        // ===== КІНЕЦЬ БЛОКУ ДАНИХ ЗВІТІВ ТА ГЕНЕРАЦІЇ УГОД =====



        document.addEventListener('DOMContentLoaded', () => {
            const section = document.getElementById('start');
            const canvas = document.getElementById('particleNet');
            if (!canvas || !section) return;
            const ctx = canvas.getContext('2d', { alpha: true });
            
            let width = 0;
            let height = 0;
            let particles = [];
            let animationFrameId = null;
            let isVisible = false;

            class Particle {
                constructor() {
                    this.reset();
                    this.y = Math.random() * height; 
                }
                
                reset() {
                    const isLeft = Math.random() > 0.5;
                    const edgeOffset = Math.random() * (width * 0.42); 
                    
                    this.x = isLeft ? edgeOffset : width - edgeOffset;
                    this.y = Math.random() * height;
                    
                    this.vx = (Math.random() - 0.5) * 0.32;
                    this.vy = (Math.random() - 0.5) * 0.32;
                    this.neighbors = [];
                }
                
                update() {
                    this.x += this.vx;
                    this.y += this.vy;
                    
                    if (this.x < 0 || this.x > width) this.vx *= -1;
                    if (this.y < 0 || this.y > height) this.vy *= -1;
                    this.neighbors.length = 0;
                }
            }
            
            function initCanvas() {
                const rect = canvas.getBoundingClientRect();
                width = rect.width || window.innerWidth;
                height = rect.height || 450;
                
                const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
                
                canvas.width = Math.floor(width * dpr);
                canvas.height = Math.floor(height * dpr);
                ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
                
                particles = [];
                const count = width < 640 ? 32 : (width < 1024 ? 48 : 65);
                
                for (let i = 0; i < count; i++) {
                    particles.push(new Particle());
                }
            }
            
            function animate() {
                if (!isVisible) return;

                ctx.clearRect(0, 0, width, height);
                ctx.globalCompositeOperation = 'screen';
                
                const count = particles.length;
                for (let i = 0; i < count; i++) {
                    particles[i].update();
                }
                
                const connectionDist = width < 640 ? 125 : (width < 1024 ? 155 : 185);
                const maxDistSq = connectionDist * connectionDist;
                const halfWidth = width * 0.5;
                const pairs = [];
                
                for (let i = 0; i < count; i++) {
                    const p1 = particles[i];
                    for (let j = i + 1; j < count; j++) {
                        const p2 = particles[j];
                        const dx = p1.x - p2.x;
                        const dy = p1.y - p2.y;
                        const distSq = dx * dx + dy * dy;
                        
                        if (distSq < maxDistSq) {
                            const dist = Math.sqrt(distSq);
                            p1.neighbors.push(j);
                            pairs.push({ i, j, dist });
                        }
                    }
                }
                
                const pairsCount = pairs.length;

                for (let p = 0; p < pairsCount; p++) {
                    const pair = pairs[p];
                    const p1 = particles[pair.i];
                    const p2 = particles[pair.j];
                    const p1Neighbors = p1.neighbors;
                    const nLen = p1Neighbors.length;

                    for (let n = 0; n < nLen; n++) {
                        const k = p1Neighbors[n];
                        if (k > pair.j && p2.neighbors.includes(k)) {
                            const p3 = particles[k];
                            const d2 = Math.hypot(p2.x - p3.x, p2.y - p3.y);
                            const d3 = Math.hypot(p1.x - p3.x, p1.y - p3.y);
                            
                            const midX = (p1.x + p2.x + p3.x) / 3;
                            const distFromCenter = Math.abs(midX - halfWidth) / halfWidth;
                            const centerFade = Math.pow(distFromCenter, 1.4);
                            
                            const polyOpacity = (1 - (pair.dist + d2 + d3) / (connectionDist * 3)) * 0.09 * centerFade;
                            
                            if (polyOpacity > 0.003) {
                                const c1x = (p1.x + p2.x) * 0.5;
                                const c1y = (p1.y + p2.y) * 0.5;
                                const c2x = (p2.x + p3.x) * 0.5;
                                const c2y = (p2.y + p3.y) * 0.5;
                                
                                ctx.beginPath();
                                ctx.moveTo(p1.x, p1.y);
                                ctx.quadraticCurveTo(p2.x, p2.y, c2x, c2y);
                                ctx.quadraticCurveTo(p3.x, p3.y, c1x, c1y);
                                ctx.closePath();
                                
                                ctx.fillStyle = `rgba(0, 190, 255, ${polyOpacity})`;
                                ctx.fill();
                            }
                        }
                    }
                }
                
                for (let p = 0; p < pairsCount; p++) {
                    const pair = pairs[p];
                    const p1 = particles[pair.i];
                    const p2 = particles[pair.j];
                    
                    let opacity = (1 - pair.dist / connectionDist) * 0.32;
                    const midX = (p1.x + p2.x) * 0.5;
                    const distFromCenter = Math.abs(midX - halfWidth) / halfWidth;
                    opacity *= Math.pow(distFromCenter, 1.3);
                    
                    if (opacity > 0.015) {
                        ctx.beginPath();
                        ctx.moveTo(p1.x, p1.y);
                        
                        const ctrlX = (p1.x + p2.x) * 0.5 + (p1.y - p2.y) * 0.08;
                        const ctrlY = (p1.y + p2.y) * 0.5 + (p2.x - p1.x) * 0.08;
                        
                        ctx.quadraticCurveTo(ctrlX, ctrlY, p2.x, p2.y);
                        
                        const grad = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
                        grad.addColorStop(0, `rgba(139, 92, 246, ${opacity * 0.8})`);
                        grad.addColorStop(1, `rgba(34, 211, 238, ${opacity})`);
                        
                        ctx.strokeStyle = grad;
                        ctx.lineWidth = 0.85;
                        ctx.stroke();
                    }
                }
                
                animationFrameId = requestAnimationFrame(animate);
            }
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    isVisible = entry.isIntersecting;
                    if (isVisible) {
                        if (!animationFrameId) {
                            animationFrameId = requestAnimationFrame(animate);
                        }
                    } else {
                        if (animationFrameId) {
                            cancelAnimationFrame(animationFrameId);
                            animationFrameId = null;
                        }
                    }
                });
            }, { rootMargin: '100px 0px', threshold: 0.01 });

            observer.observe(section);

            document.addEventListener('visibilitychange', () => {
                if (document.hidden && animationFrameId) {
                    cancelAnimationFrame(animationFrameId);
                    animationFrameId = null;
                } else if (!document.hidden && isVisible && !animationFrameId) {
                    animationFrameId = requestAnimationFrame(animate);
                }
            });

            let resizeTimer;
            window.addEventListener('resize', () => {
                clearTimeout(resizeTimer);
                resizeTimer = setTimeout(() => {
                    initCanvas();
                }, 150);
            });
            
            initCanvas();
        });