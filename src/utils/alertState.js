const lastSent = new Map();

function canSendAlert(symbol, cooldownMs) {
  const now = Date.now();
  const last = lastSent.get(symbol);

  if (last && now - last < cooldownMs) {
    return false;
  }

  lastSent.set(symbol, now);
  return true;
}

module.exports= canSendAlert