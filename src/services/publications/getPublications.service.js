const { getPublicationsDataHome, getPublicationDataId } = require('../../repositories/publications.repository');

const {validatePagination, validatePublicationId} = require('../../validators/publicationValidator');


async function getPublicationsHome(data) {
  const { error, value } =  validatePagination (data);
  if (error) {
    throw new Error(`Validation failed: ${error.details[0].message}`);
  } 
  const premiumCount = value.premiumCount || 4;
  const nonPremiumCount = value.nonPremiumCount || 2;
  const lastPremiumKey = value.lastPremiumKey || '';
  const lastNonPremiumKey = value.lastNonPremiumKey || '';
  try {
  const publicationsPaginated = await getPublicationsDataHome(
    premiumCount,
    nonPremiumCount,
    lastPremiumKey,
    lastNonPremiumKey
  );
  return publicationsPaginated;
  } catch{
    throw new Error (error.message)
  }
}

async function getPublicationId(data) {
  const {error, value} = validatePublicationId(data);
  if(error){
    throw new Error (`Validation failied: ${error.details[0].message} `);
  }
  try {
    const publication = await getPublicationDataId(value.id);
  return publication;
  } catch (error) {
    throw new Error (error.message)
  }
  
}

module.exports = { getPublicationsHome, getPublicationId };