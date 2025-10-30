const { getPublicationsHomeData } = require('../../repositories/publications.repository');

const {validatePaginationParams} = require('../../validators/publicationValidator');


async function getPublicationsHome(data) {
  const { error, value } =  validatePaginationParams (data);
  if (error) {
    throw new Error(`Validation failed: ${error.details[0].message}`);
  } 
  const premiumCount = value.premiumCount || 10;
  const nonPremiumCount = value.nonPremiumCount || 6;
  const lastPremiumKey = value.lastPremiumKey || '';
  const lastNonPremiumKey = value.lastNonPremiumKey || '';

  const result = await getPublicationsHomeData(
    premiumCount,
    nonPremiumCount,
    lastPremiumKey,
    lastNonPremiumKey
  );
  return result;
}

module.exports = { getPublicationsHome };