import { create } from "zustand";
import { getAllStates } from "../services/state.service";
import { getCitiesByState } from "../services/city.service";

export const useLocationStore = create((set) => ({
  states: [],
  cities: [],
  loading: false,
  error: null,

  fetchStates: async () => {
    try {
      set({ loading: true });
      const res = await getAllStates();
      set({ states: res.data, loading: false });
    } catch (err) {
      set({ error: err, loading: false });
    }
  },

  fetchCitiesByState: async (stateId) => {
    try {
      set({ loading: true });
      const res = await getCitiesByState(stateId);
      set({ cities: res.data, loading: false });
    } catch (err) {
      set({ error: err, loading: false });
    }
  },
}));
