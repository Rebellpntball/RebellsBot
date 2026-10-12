const baskets = new Map();
function getBasket(userId) {
  if (!baskets.has(userId)) baskets.set(userId, []);
  return baskets.get(userId);
}
function clearBasket(userId) { baskets.set(userId, []); }
function basketTotal(userId) {
  return getBasket(userId).reduce((sum, i) => sum + i.price * i.qty, 0);
}
function basketCount(userId) {
  return getBasket(userId).reduce((sum, i) => sum + i.qty, 0);
}
module.exports = { getBasket, clearBasket, basketTotal, basketCount };
