/* ============================================
   IBON GLOBAL — chat.js
   AI Chat + WhatsApp Business Integration
   ⚙️  Change WHATSAPP_NUMBER before deploy!
============================================ */

// ✅ PUT YOUR WHATSAPP BUSINESS NUMBER HERE (with country code, no + or spaces)
const WHATSAPP_NUMBER = '8801XXXXXXXXX';

/* ========================
   AI AUTO ANSWERS DATABASE
   Add more Q&A pairs here!
======================== */
const AI_ANSWERS = {
  'how to register':    '📝 Registration is easy!\n1️⃣ Click "Register Free"\n2️⃣ Fill name, email & phone\n3️⃣ Set a strong password\n4️⃣ Verify your email\n✅ Account is ready!',
  'register':           '📝 Click "Register Free" at the top, fill your details and verify email. Takes less than 2 minutes!',
  'how to deposit':     '💰 To deposit:\n1️⃣ Login → Wallet → Deposit\n2️⃣ Choose crypto (BTC/ETH/USDT)\n3️⃣ Copy wallet address\n4️⃣ Send from external wallet\n⏱️ Credited in 10–30 minutes.',
  'deposit':            '💰 Login → Wallet → Deposit. Select crypto, copy address and send. Credited in 10–30 minutes!',
  'how to withdraw':    '🏧 Withdrawal steps:\n1️⃣ Login → Wallet → Withdraw\n2️⃣ Enter amount & wallet address\n3️⃣ Confirm with OTP\n⏱️ Processing: 1–24 hours\n💡 Minimum: $10',
  'withdraw':           '🏧 Wallet → Withdraw, enter amount and address, confirm OTP. Processing up to 24 hours. Minimum $10.',
  'referral bonus':     '🎁 Referral Program:\n✅ Share your unique link\n💸 Earn up to 10% commission\n🔄 Lifetime earnings!\nDashboard → Referral to get your link.',
  'referral':           '🎁 Earn up to 10% lifetime commission on every referral! Go to Dashboard → Referral for your link.',
  'staking income':     '📈 Staking Info:\n🏦 Stake your crypto\n📅 Earn daily passive income\n💎 Higher stake = Higher rewards\n🔓 Flexible & Fixed plans\nDashboard → Staking to start!',
  'staking':            '📈 Stake crypto on IBON and earn daily passive income. Go to Dashboard → Staking for plans and APY rates.',
  'is ibon safe':       '🔒 Yes! 100% Secure:\n✅ Multi-layer encryption\n✅ 2FA authentication\n✅ Cold wallet storage\n✅ SSL secured\n✅ 120K+ trusted global users',
  'safe':               '🔒 IBON uses bank-grade security — multi-layer encryption, 2FA, cold wallet storage. 120K+ global users trust us!',
  'support':            '📞 24/7 Support available!\n📧 support@ibocoin.org\n💬 Live chat (this window)\n📱 WhatsApp Business\nWe respond within minutes!',
  'contact':            '📧 Email: support@ibocoin.org | WhatsApp button on this page. Available 24/7!',
  'hello':              '👋 Hello! Welcome to IBON Support. How can I help you today?\nAsk about registration, deposit, staking, referrals or anything else!',
  'hi':                 '👋 Hi there! Welcome to IBON Global. What would you like to know?',
  'minimum deposit':    '💰 Minimum deposit: $10 USDT equivalent. We support BTC, ETH, BNB, USDT and more!',
  'minimum':            '💰 Minimum deposit: $10 | Minimum withdrawal: $10.',
  'kyc':                '📋 KYC required for withdrawals above $500. Dashboard → Profile → KYC. Upload ID/passport.',
  'verify':             '📋 Check your inbox for the email verification link. For KYC go to Dashboard → Profile.',
  'profit':             '📈 Multiple income streams: staking rewards, referral commissions, trading profits. Returns depend on your investment.',
  'earn':               '💸 Ways to earn:\n1️⃣ Trading profits\n2️⃣ Staking daily income\n3️⃣ Referral commissions (up to 10%)\n4️⃣ DeFi yield farming\nStart with just $10!',
  'bangladesh':         '🇧🇩 Fully available in Bangladesh! Deposit/withdraw via USDT (TRC20/BEP20). Bkash/Nagad coming soon!',
  'country':            '🌍 IBON supports 180+ countries worldwide. Fully global platform!',
  'ibon coin':          '🪙 IBO Coin powers the IBON ecosystem — trading fees, staking rewards, governance and exclusive benefits. Listing on exchanges coming soon!',
  'token':              '🪙 IBO Token is the utility coin of the ecosystem. Stake it for rewards, reduced fees and exclusive opportunities.',
  'password':           '🔑 Forgot password? Go to Login page → "Forgot Password" → Enter your email → Check inbox for reset link.',
  'forgot':             '🔑 Click "Forgot Password" on the Login page and follow the email instructions to reset.',
  'fees':               '💡 IBON charges minimal trading fees. Check Dashboard → Fees for the full breakdown. Holding IBO Token reduces fees!',
};

/* ========================
   CHAT STATE
======================== */
let chatOpen = false;

/* ========================
   TOGGLE CHAT
======================== */
function toggleChat() {
  chatOpen = !chatOpen;
  const win   = document.getElementById('chatWindow');
  const badge = document.getElementById('chatBadge');
  win.classList.toggle('open', chatOpen);
  if (chatOpen) {
    badge.style.display = 'none';
    if (document.getElementById('chatMessages').children.length === 0) {
      showWelcome();
    }
    setTimeout(() => document.getElementById('chatInput').focus(), 400);
  }
}

/* ========================
   WELCOME MESSAGE
======================== */
function showWelcome() {
  document.getElementById('chatMessages').innerHTML = '';
  addMsg('ai',
    '👋 Welcome to <strong>IBON Global Support!</strong><br><br>' +
    'I\'m your AI assistant. I can answer common questions instantly. ' +
    'For specific account issues, our admin team will assist you.<br><br>' +
    'How can I help you today?'
  );
}

/* ========================
   ADD MESSAGE TO CHAT
======================== */
function addMsg(type, text, isAdmin = false) {
  const msgs  = document.getElementById('chatMessages');
  const time  = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const avatar = type === 'user' ? '👤' : '🤖';
  const adminLabel = isAdmin ? `<div class="admin-tag">👨‍💼 Admin Reply</div>` : '';
  msgs.innerHTML += `
    ${adminLabel}
    <div class="msg ${type}-msg">
      <div class="msg-avatar ${type === 'user' ? 'user' : 'ai'}">${avatar}</div>
      <div>
        <div class="msg-bubble ${type === 'user' ? 'user' : 'ai'}">${text}</div>
        <div class="msg-time">${time}</div>
      </div>
    </div>`;
  msgs.scrollTop = msgs.scrollHeight;
}

/* ========================
   TYPING INDICATOR
======================== */
function showTyping() {
  const msgs = document.getElementById('chatMessages');
  const id   = 'typing-' + Date.now();
  msgs.innerHTML += `
    <div class="msg" id="${id}">
      <div class="msg-avatar ai">🤖</div>
      <div class="typing-indicator">
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
      </div>
    </div>`;
  msgs.scrollTop = msgs.scrollHeight;
  return id;
}
function removeTyping(id) {
  const el = document.getElementById(id);
  if (el) el.remove();
}

/* ========================
   FIND AI ANSWER
======================== */
function findAIAnswer(q) {
  const lower = q.toLowerCase().trim();
  for (const key in AI_ANSWERS) {
    if (lower.includes(key)) return AI_ANSWERS[key];
  }
  return null;
}

/* ========================
   SEND MESSAGE
======================== */
function sendMsg() {
  const input = document.getElementById('chatInput');
  const text  = input.value.trim();
  if (!text) return;
  input.value = '';
  addMsg('user', text);

  const typId = showTyping();
  const aiAns = findAIAnswer(text);

  setTimeout(() => {
    removeTyping(typId);
    if (aiAns) {
      // AI knows the answer
      addMsg('ai', aiAns.replace(/\n/g, '<br>'));
    } else {
      // Escalate to admin
      addMsg('ai',
        '🤔 I\'m checking with our admin team for this specific question. ' +
        'They\'ll reply shortly!<br><br>' +
        'For urgent help, reach us on <strong>WhatsApp Business</strong> →'
      );
      showAdminEscalation(text);
      addMsg('ai', '📬 Your message has been forwarded to our admin. Expected reply: <strong>Within 1 hour</strong>');
    }
  }, 1000 + Math.random() * 800);
}

/* ========================
   QUICK QUESTION SHORTCUT
======================== */
function quickAsk(q) {
  document.getElementById('chatInput').value = q;
  sendMsg();
}

/* ========================
   ADMIN ESCALATION
   Opens WhatsApp Business with user's message
======================== */
function showAdminEscalation(userMsg) {
  const waMsg = encodeURIComponent('🔔 New User Query from IBON Chat:\n\n"' + userMsg + '"\n\nPlease reply to this user.');
  const msgs  = document.getElementById('chatMessages');
  const time  = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  msgs.innerHTML += `
    <div class="msg ai-msg">
      <div class="msg-avatar ai">🤖</div>
      <div>
        <div class="msg-bubble ai" style="border-color:rgba(250,204,21,0.3);">
          📲 <strong>Connect with Admin directly:</strong><br>
          <a href="https://wa.me/${WHATSAPP_NUMBER}?text=${waMsg}" target="_blank"
             style="color:#25D366;font-weight:700;text-decoration:none;">
            💬 Open WhatsApp Business Chat →
          </a>
        </div>
        <div class="msg-time">${time}</div>
      </div>
    </div>`;
  msgs.scrollTop = msgs.scrollHeight;
}

/* ========================
   ENTER KEY TO SEND
======================== */
document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('chatInput');
  if (input) {
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') sendMsg();
    });
  }
});