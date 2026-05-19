const categoryImages = {
    Tech: [
        "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&h=350&q=80",
        "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&h=350&q=80",
        "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=600&h=350&q=80"
    ],
    Finance: [
        "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=600&h=350&q=80",
        "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=600&h=350&q=80",
        "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=600&h=350&q=80"
    ],
    AI: [
        "https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=600&h=350&q=80",
        "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=600&h=350&q=80",
        "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&h=350&q=80"
    ],
    World: [
        "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&h=350&q=80",
        "https://images.unsplash.com/photo-1508962914676-134849a727f0?auto=format&fit=crop&w=600&h=350&q=80",
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&h=350&q=80"
    ]
};

const newsData = Array.from({ length: 150 }, (_, i) => {
    const category = ["Tech", "Finance", "AI", "World"][i % 4];
    const imageList = categoryImages[category];
    const image = imageList[i % imageList.length];
    return {
        id: i + 1,
        category,
        image,
        title: `${["Breaking:", "Update:", "Exclusive:", "Alert:", "Report:"][i % 5]} ${[
            "New AI Regulation Passed in EU Commission",
            "Bitcoin Surge Continues to Defy Expectations",
            "SpaceX Launches Record-Breaking Orbital Mission",
            "Quantum Computing Superpositions Breakthrough Announced",
            "Global Semiconductor Trade Agreement Reached",
            "New Micro-Fusion Sustainable Energy Source Discovered",
            "Tech Giant Announces Massive Structural Layoffs",
            "Breakthrough in Alzheimer Synaptic Repair Research"
        ][i % 8]} - ID #${1000 + i}`,
        content: "Full details of this developing story are being analyzed by our investigative editorial team. Stay tuned for live updates, data maps, and macro expert analysis.",
        time: `${(i % 23) + 1} hours ago`
    };
});

const tickerContainer = document.getElementById('newsTicker');
const feedContainer = document.getElementById('newsFeed');
let currentCategory = 'all';

function renderTicker() {
    if (!tickerContainer) return;
    tickerContainer.innerHTML = '';

    // Render 10 active ticker highlights
    newsData.slice(0, 10).forEach(news => {
        const span = document.createElement('span');
        span.className = 'ticker__item';
        span.innerText = `⚡ ${news.title.toUpperCase()} • `;
        tickerContainer.appendChild(span);
    });
}

function renderFeed() {
    if (!feedContainer) return;
    feedContainer.innerHTML = '';

    const filtered = currentCategory === 'all' 
        ? newsData 
        : newsData.filter(news => news.category === currentCategory);

    filtered.forEach((news, index) => {
        const card = document.createElement('article');
        card.className = 'news-card';
        card.style.cursor = 'pointer';
        card.addEventListener('click', () => {
            showSessionInterstitialAd(() => {
                openDetail(news.id);
            });
        });

        card.innerHTML = `
            <div class="news-img-wrap">
                <img src="${news.image}" alt="${news.category}">
            </div>
            <div class="news-content-wrap">
                <span class="tag">${news.category}</span>
                <h2>${news.title}</h2>
                <p>${news.content.substring(0, 110)}...</p>
                <div class="meta"><span>${news.time}</span></div>
            </div>
        `;

        feedContainer.appendChild(card);

        // Inject Native Sponsored update every 4 articles
        if ((index + 1) % 4 === 0) {
            const adCard = document.createElement('article');
            adCard.className = 'news-card ad-card';
            adCard.innerHTML = `
                <div class="news-img-wrap">
                    <img src="https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=600&h=350&q=80" alt="Sponsored">
                </div>
                <div class="news-content-wrap">
                    <span class="tag" style="color:var(--primary);">SPONSORED CAMPAIGN</span>
                    <h2>How to Trade the 2026 Macro Markets: Strategy Guide.</h2>
                    <p>Learn the exact strategies used by professional brokerage analysts to hedge against major inflation shifts.</p>
                    <div class="meta"><button class="ad-btn" style="margin-top:1rem; width: 100%;">Get Pro Guide</button></div>
                </div>
            `;
            feedContainer.appendChild(adCard);
        }
    });
}

// Hook Nav tab triggers
document.querySelectorAll('.nav-tab').forEach(tab => {
    tab.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        
        currentCategory = this.dataset.cat;
        
        showSessionInterstitialAd(() => {
            renderFeed();
        });
    });
});

const FINANCIAL_CAMPAIGNS = [
    {
        title: 'CapitalOne: Commission Free',
        desc: 'Trade stock indices, crypto pairs, and commodities with zero commission fees.',
        promo: 'CODE "FREETRADE" FOR ZERO FEES',
        img: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=200&h=200&q=80'
    },
    {
        title: 'Morningstar Stock Analytics',
        desc: 'Unlock independent qualitative reports, gold star ratings, and fair value estimations.',
        promo: 'CODE "STARINVEST" FOR GOLD RATING',
        img: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=200&h=200&q=80'
    },
    {
        title: 'TradingView Pro Charts',
        desc: 'Supercharge your technical indicators, multi-timeframe logs, and custom pine scripts.',
        promo: 'CLAIM 30% CHANNELS SAVING: CHARTPRO30',
        img: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=200&h=200&q=80'
    },
    {
        title: 'Wall Street Journal Digital',
        desc: 'Unfiltered global financial journalism, corporate reviews, and economic calendars.',
        promo: 'CLAIM 50% DIGITAL ACCESS: WSJSUB50',
        img: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=200&h=200&q=80'
    },
    {
        title: 'Bloomberg Terminal Access',
        desc: 'Real-time corporate trade execution, instant squawk wires, and macro datasets.',
        promo: 'INSTANT TERMINAL CODE: BLOOMBERGTERM',
        img: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=200&h=200&q=80'
    },
    {
        title: 'Coinbase Web3 Crypto Vault',
        desc: 'Secure your hardware crypto keys, stake liquidity pools, and trade decentralized swatches.',
        promo: 'COINBASE VAULT CODE: COINBASEVAULT',
        img: 'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?auto=format&fit=crop&w=200&h=200&q=80'
    }
];

let adsDisabled = false;
let interactionCount = 0;

// Inspect breaking news detailed modal popup
function openDetail(id) {
    const news = newsData.find(item => item.id === id);
    const modal = document.getElementById('detailModal');
    const body = document.getElementById('modalBody');
    if (!modal || !body) return;

    body.innerHTML = `
        <div class="modal-hero" style="background:url('${news.image}') center/cover; height:260px; border-radius:16px; margin-bottom:2rem; box-shadow:0 10px 25px rgba(0,0,0,0.05); border:1px solid var(--border);"></div>
        <span class="tag">${news.category}</span>
        <h2 style="font-size:2.2rem; font-family:'Archivo Black',sans-serif; font-weight:700; margin:1rem 0; color:#090b0e; letter-spacing:-1px; text-transform:uppercase; line-height:1.1;">${news.title}</h2>
        <p style="font-size:1.05rem; color:#444; line-height:1.6; margin-bottom:2rem;">${news.content} Additional microinvestigations confirm that global trade flows are factoring in these sudden regulatory updates, with localized stock portfolios responding actively.</p>
        
        <div class="extensive-info" style="border-left:5px solid var(--primary); padding-left:1.8rem; margin-bottom:2rem;">
            <h3 style="font-size:1.1rem; color:#090b0e; font-family:'Archivo Black',sans-serif; text-transform:uppercase; margin-bottom:0.5rem;">Key Takeaways</h3>
            <ul style="list-style:none; padding:0; color:#444; font-size:0.88rem; display:flex; flex-direction:column; gap:0.4rem;">
                <li><strong>Report Status:</strong> Verified Flash wire Intelligence</li>
                <li><strong>Timestamp:</strong> ${new Date().toLocaleString()}</li>
                <li><strong>Priority Baseline:</strong> High Velocity Alert</li>
            </ul>
        </div>
    `;
    
    // Choose details modal sponsor campaign
    const detailCampaign = FINANCIAL_CAMPAIGNS[id % FINANCIAL_CAMPAIGNS.length];
    const detailImg = document.getElementById('detail-ad-img');
    const detailTitle = document.getElementById('detail-ad-title');
    const detailDesc = document.getElementById('detail-ad-desc');
    
    if (detailImg) detailImg.src = detailCampaign.img;
    if (detailTitle) detailTitle.innerText = detailCampaign.title;
    if (detailDesc) detailDesc.innerText = detailCampaign.desc;

    modal.style.display = 'flex';
}

document.querySelector('.close-modal')?.addEventListener('click', () => {
    document.getElementById('detailModal').style.display = 'none';
});

window.onclick = (event) => {
    const modal = document.getElementById('detailModal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}


// --- 1.5 Shuffle/Reload News Stories ---
const btnShuffleNews = document.getElementById('btn-shuffle-news');
if (btnShuffleNews) {
    btnShuffleNews.addEventListener('click', () => {
        // Fisher-Yates Shuffle Algorithm
        for (let i = newsData.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newsData[i], newsData[j]] = [newsData[j], newsData[i]];
        }
        
        // Dynamic scale feedback on click
        btnShuffleNews.style.transform = 'scale(0.95)';
        setTimeout(() => {
            btnShuffleNews.style.transform = 'scale(1)';
        }, 150);

        // Render feed and scrolling ticker in random order
        showSessionInterstitialAd(() => {
            renderFeed();
            renderTicker();
        });
    });
}


// --- 2. Custom Price Limit Alert Tickers ---
const alertModal = document.getElementById('alertModal');
const btnOpenAlertCreator = document.getElementById('btn-open-alert-creator');
const btnCloseAlertModal = document.getElementById('btn-close-alert-modal');

if (btnOpenAlertCreator) {
    btnOpenAlertCreator.addEventListener('click', () => {
        if (alertModal) alertModal.style.display = 'flex';
    });
}

if (btnCloseAlertModal) {
    btnCloseAlertModal.addEventListener('click', () => {
        if (alertModal) alertModal.style.display = 'none';
    });
}

function submitCustomAlert() {
    const symbol = document.getElementById('alert-index-symbol').value.trim().toUpperCase();
    const price = document.getElementById('alert-trigger-price').value.trim();

    if (!symbol || !price) {
        alert('❌ Please supply target ticker variables.');
        return;
    }

    const alertTitle = `ALERT: ${symbol} Crossed target price thresholds at $${price}! Programmatic index update.`;
    
    if (alertModal) alertModal.style.display = 'none';
    document.getElementById('custom-alert-form').reset();

    // Trigger interstitial skip-ad overlay before updating
    showSessionInterstitialAd(() => {
        const newNews = {
            id: newsData.length + 1,
            category: "Finance",
            title: alertTitle,
            content: `The price index trigger for ${symbol} was breached at $${price}. Corporate trade desks report massive volume surges globally.`,
            time: "Just Now"
        };
        newsData.unshift(newNews);
        renderTicker();
        renderFeed();
    });
}


// --- 3. Programmatic Rotating Sponsor Banner ---
let bannerIndex = 0;
function startRotatingBanner() {
    const banner = document.getElementById('floating-ad-banner');
    if (!banner || adsDisabled) return;

    const campaign = FINANCIAL_CAMPAIGNS[bannerIndex];
    bannerIndex = (bannerIndex + 1) % FINANCIAL_CAMPAIGNS.length;

    banner.innerHTML = `
        <div class="ad-sponsor-container">
            <img src="${campaign.img}" alt="${campaign.title}">
            <div class="banner-content">
                <p>Curated Flash Sponsor</p>
                <strong>${campaign.title}</strong>
            </div>
        </div>
        <div class="banner-actions">
            <button class="btn-banner-action" id="btn-banner-claim">Claim Resource</button>
            <button class="btn-banner-close" id="btn-banner-close">×</button>
        </div>
    `;

    banner.style.display = 'flex';

    // Hook listeners
    document.getElementById('btn-banner-claim')?.addEventListener('click', () => {
        alert(`🎉 Copied coupon code: "${campaign.promo.split('"')[1] || 'FREETRADE'}" to clipboard!`);
        window.open('#', '_blank');
    });

    document.getElementById('btn-banner-close')?.addEventListener('click', () => {
        banner.style.display = 'none';
    });
}

// Initial banner launch and rotate every 10 seconds
setTimeout(() => {
    startRotatingBanner();
    setInterval(startRotatingBanner, 10000);
}, 2000);


// --- 4. Decoupled Timed Interstitial Countdown System ---
let interstitialCallback = null;
let interstitialTimer = null;
const interstitialModal = document.getElementById('interstitialModal');
const btnSkipAd = document.getElementById('btn-skip-ad');
const btnClaimAd = document.getElementById('btn-claim-ad');

function showSessionInterstitialAd(onClosed) {
    if (adsDisabled || !interstitialModal) {
        onClosed();
        return;
    }
    
    interstitialCallback = onClosed;
    
    // Choose a random campaign
    const campaign = FINANCIAL_CAMPAIGNS[Math.floor(Math.random() * FINANCIAL_CAMPAIGNS.length)];
    const imgEl = document.getElementById('interstitial-ad-img');
    const titleEl = document.getElementById('interstitial-ad-title');
    const descEl = document.getElementById('interstitial-ad-desc');
    const promoEl = document.getElementById('interstitial-ad-promo');
    
    if (imgEl) imgEl.src = campaign.img;
    if (titleEl) titleEl.innerText = campaign.title;
    if (descEl) descEl.innerText = campaign.desc;
    if (promoEl) promoEl.innerText = campaign.promo;

    interstitialModal.style.display = 'flex';
    
    btnSkipAd.disabled = true;
    btnSkipAd.style.opacity = '0.4';
    btnSkipAd.style.cursor = 'not-allowed';
    btnSkipAd.innerText = 'Skip Ad in 5s';
    
    let count = 5;
    if (interstitialTimer) clearInterval(interstitialTimer);
    
    interstitialTimer = setInterval(() => {
        count--;
        if (count > 0) {
            btnSkipAd.innerText = `Skip Ad in ${count}s`;
        } else {
            clearInterval(interstitialTimer);
            btnSkipAd.innerText = 'Skip Ad';
            btnSkipAd.disabled = false;
            btnSkipAd.style.opacity = '1';
            btnSkipAd.style.cursor = 'pointer';
        }
    }, 1000);
}

if (btnSkipAd) {
    btnSkipAd.addEventListener('click', () => {
        interstitialModal.style.display = 'none';
        
        // Trigger success synchronization celebration modal!
        const celebrationModal = document.getElementById('celebrationModal');
        if (celebrationModal) {
            celebrationModal.style.display = 'flex';
        } else if (interstitialCallback) {
            interstitialCallback();
        }
    });
}

if (btnClaimAd) {
    btnClaimAd.addEventListener('click', () => {
        alert('🎉 Market tracker whitelist coupon saved!');
        interstitialModal.style.display = 'none';
        
        const celebrationModal = document.getElementById('celebrationModal');
        if (celebrationModal) {
            celebrationModal.style.display = 'flex';
        } else if (interstitialCallback) {
            interstitialCallback();
        }
    });
}

// Celebration close handler
const btnCloseCelebrationModal = document.getElementById('btn-close-celebration');
if (btnCloseCelebrationModal) {
    btnCloseCelebrationModal.addEventListener('click', () => {
        document.getElementById('celebrationModal').style.display = 'none';
        if (interstitialCallback) {
            interstitialCallback();
            interstitialCallback = null;
        }
    });
}


// --- 5. Scarcity Upgrade Tier & Timer Engine ---
let upgradeTimer = null;
const premiumUpgradeModal = document.getElementById('premiumUpgradeModal');

function triggerUpgradeModal() {
    if (adsDisabled || !premiumUpgradeModal) return;
    
    premiumUpgradeModal.style.display = 'flex';
    let duration = 600; // 10 minutes
    const countdownEl = document.getElementById('scarcity-countdown');

    if (upgradeTimer) clearInterval(upgradeTimer);

    upgradeTimer = setInterval(() => {
        duration--;
        const minutes = Math.floor(duration / 60);
        const seconds = duration % 60;
        if (countdownEl) {
            countdownEl.innerText = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }
        if (duration <= 0) {
            clearInterval(upgradeTimer);
            premiumUpgradeModal.style.display = 'none';
        }
    }, 1000);
}

// Trigger upgrade modal after 40 seconds of active news browsing
setTimeout(triggerUpgradeModal, 40000);

document.getElementById('btn-skip-upgrade')?.addEventListener('click', () => {
    premiumUpgradeModal.style.display = 'none';
    clearInterval(upgradeTimer);
});

// Acknowledge upgrade purchase (disable ads)
document.getElementById('btn-upgrade-now')?.addEventListener('click', () => {
    alert('🏆 Welcome to Flash News Pro! Enterprise stock squawks unlocked, news sponsors deactivated.');
    adsDisabled = true;
    premiumUpgradeModal.style.display = 'none';
    const banner = document.getElementById('floating-ad-banner');
    if (banner) banner.style.display = 'none';
    clearInterval(upgradeTimer);
});


// --- 6. Exit Intent & Mock Ad-Blocker Overlays ---
let exitIntentShown = false;
document.addEventListener("mouseout", (e) => {
    if (e.clientY < 0 && !exitIntentShown && !adsDisabled) {
        exitIntentShown = true;
        const exitModal = document.getElementById("exitIntentModal");
        if (exitModal) exitModal.style.display = "flex";
    }
});

document.getElementById("closeExitIntent")?.addEventListener("click", () => {
    document.getElementById("exitIntentModal").style.display = "none";
});
document.getElementById("declineExitIntent")?.addEventListener("click", (e) => {
    e.preventDefault();
    document.getElementById("exitIntentModal").style.display = "none";
});

// Trigger Mock ad blocker Whitelist popups after 5 seconds
setTimeout(() => {
    if (adsDisabled) return;
    const isAdBlockerActive = Math.random() < 0.15; // 15% simulation chance
    if (isAdBlockerActive) {
        const adBlockModal = document.getElementById("adBlockModal");
        if (adBlockModal) adBlockModal.style.display = "flex";
    }
}, 5000);

document.getElementById('btn-adblock-premium')?.addEventListener('click', () => {
    alert('🏆 Pro Activated! Ad banners disabled.');
    adsDisabled = true;
    document.getElementById("adBlockModal").style.display = "none";
    const banner = document.getElementById('floating-ad-banner');
    if (banner) banner.style.display = 'none';
});

// Initial compile
window.onload = () => {
    renderTicker();
    renderFeed();
};
