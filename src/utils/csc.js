import countryList1 from "country-state-city/lib/country.json";
import stateList1 from "country-state-city/lib/state.json";
import countryList2 from "./locations/country.json";
import stateList2 from "./locations/state.json";
const countryList = countryList1.concat(countryList2);
const stateList = stateList1.concat(stateList2);

export default {
  getCountryById(id) {
    return _findEntryById(countryList, id);
  },
  getStateById(id) {
    return _findEntryById(stateList, id);
  },
  getStatesOfCountry(countryId) {
    const states = stateList.filter(function (value, index) {
      return value.country_id === countryId;
    });
    return states.sort(compare);
  },
  getAllCountries() {
    return countryList;
  },
  getCountryByCode(code) {
    return _findEntryByCode(countryList, code);
  },
};

const _findEntryById = (source, id) => {
  if (id && source != null) {
    const idx = source.findIndex((c) => c.id === id);
    return idx !== -1 ? source[idx] : "";
  } else return "";
};

const _findEntryByCode = (source, code) => {
  if (code && source != null) {
    const codex = source.findIndex((c) => c.sortname === code);
    return codex !== -1 ? source[codex] : "";
  } else return "";
};

function compare(a, b) {
  if (a.name < b.name) return -1;
  if (a.name > b.name) return 1;
  return 0;
}
