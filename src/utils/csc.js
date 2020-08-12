import countryList1 from "country-state-city/lib/country.json";
import stateList1 from "country-state-city/lib/state.json";
import cityList1 from "country-state-city/lib/city.json";
import countryList2 from "./locations/country.json";
import stateList2 from "./locations/state.json";
import cityList2 from "./locations/city.json";
const countryList = countryList1.concat(countryList2);
const stateList = stateList1.concat(stateList2);
const cityList = cityList1.concat(cityList2);

export default {
  getCountryById(id) {
    return _findEntryById(countryList, id);
  },
  getStateById(id) {
    return _findEntryById(stateList, id);
  },
  getCityById(id) {
    return _findEntryById(cityList, id);
  },
  getStatesOfCountry(countryId) {
    const states = stateList.filter(function (value, index) {
      return value.country_id === countryId;
    });
    return states.sort(compare);
  },
  getCitiesOfState(stateId) {
    const cities = cityList.filter(function (value, index) {
      return value.state_id === stateId;
    });
    return cities.sort(compare);
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
