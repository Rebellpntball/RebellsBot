const botConfig = require('../../config/bot');
function isOwner(userId) {
  const owners = (process.env.OWNER_IDS || '').split(',').map((s) => s.trim()).filter(Boolean);
  return owners.includes(userId);
}
function hasRole(member, roleIds = []) {
  if (!member?.roles?.cache || !roleIds.length) return false;
  return roleIds.some((id) => member.roles.cache.has(id));
}
function isAdmin(member) {
  if (!member) return false;
  if (isOwner(member.id)) return true;
  if (member.permissions?.has?.('Administrator')) return true;
  return hasRole(member, botConfig.roles.admin);
}
function isStaff(member) {
  if (isAdmin(member)) return true;
  return hasRole(member, botConfig.roles.staff);
}
module.exports = { isOwner, isAdmin, isStaff, hasRole };
