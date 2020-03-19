import filterNil from "filter-nil"
import hasContent from "has-content"
import {sortBy, uniq} from "lodash"

const perksCount = 4
const addOnsCount = 2

function normalizeCommon(data, normalizedData) {
  if (hasContent(data.title)) {
    normalizedData.title = data.title.trim()
  }
  if (hasContent(data.description)) {
    normalizedData.description = data.description.trim()
  }
}

export default {
  survivorLoadout(data) {
    const normalizedData = {}
    const perksInput = [
      data.perk1,
      data.perk2,
      data.perk3,
      data.perk4,
    ]
    const perkIds = sortBy(uniq(filterNil(perksInput)))
    for (let i = 0; i !== perksCount; i++) {
      if (perkIds.length > i) {
        normalizedData[`perk${i + 1}`] = perkIds[i].trim()
      }
    }
    if (hasContent(data.offering)) {
      normalizedData.offering = data.offering.trim()
    }
    if (hasContent(data.survivor)) {
      normalizedData.survivor = data.survivor.trim()
    }
    if (hasContent(data.item)) {
      normalizedData.item = data.item.trim()
      const addOnsInput = [
        data.addOn1,
        data.addOn2,
      ]
      const addOnIds = sortBy(uniq(filterNil(addOnsInput)))
      for (let i = 0; i !== addOnsCount; i++) {
        if (addOnIds.length > i) {
          normalizedData[`addOn${i + 1}`] = addOnIds[i].trim()
        }
      }
    }
    normalizeCommon(data, normalizedData)
    return normalizedData
  },
  killerLoadout(data) {
    const normalizedData = {}
    const perksInput = [
      data.perk1,
      data.perk2,
      data.perk3,
      data.perk4,
    ]
    const perkIds = sortBy(uniq(filterNil(perksInput)))
    for (let i = 0; i !== perksCount; i++) {
      if (perkIds.length > i) {
        normalizedData[`perk${i + 1}`] = perkIds[i].trim()
      }
    }
    if (hasContent(data.offering)) {
      normalizedData.offering = data.offering.trim()
    }
    if (hasContent(data.killer)) {
      normalizedData.killer = data.killer.trim()
      const addOnsInput = [
        data.addOn1,
        data.addOn2,
      ]
      const addOnIds = sortBy(uniq(filterNil(addOnsInput)))
      for (let i = 0; i !== addOnsCount; i++) {
        if (addOnIds.length > i) {
          normalizedData[`addOn${i + 1}`] = addOnIds[i].trim()
        }
      }
    }
    normalizeCommon(data, normalizedData)
    return normalizedData
  },
  killerTierList(data) {
    const normalizedData = {
      tiers: {},
    }
    normalizeCommon(data, normalizedData)
    const killerIds = sortBy(Object.keys(data.tiers))
    for (const killerId of killerIds) {
      const normalizedId = killerId.trim()
      const tier = data.tiers[killerId].tier
      if (!tier || tier === "unrated") {
        continue
      }
      normalizedData.tiers[normalizedId] = {
        tier,
      }
      if (hasContent(data.tiers[killerId].comment)) {
        normalizedData.tiers[normalizedId].comment = data.tiers[killerId].comment.trim()
      }
    }
    return normalizedData
  },
}