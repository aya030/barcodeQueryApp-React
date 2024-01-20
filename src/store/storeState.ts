import { create } from 'zustand';
import { ResBody, Item } from '../types/type';
type State = {
  barcodeLists: ResBody[];
  updateBarcodeLists: (payload: ResBody[]) => void;
  soloData: ResBody[];
  updateSoloData: (payload: ResBody[]) => void;
  cartData: Item[];
  updateCartData: (payload: Item[]) => void;
  modalOpen: boolean;
  updateModalOpen: () => void;
  number: string;
  updateNumber: (number: string) => void

}


export const useStore = create<State>((set) => ({
  barcodeLists: [],
  updateBarcodeLists: (payload) => set({ barcodeLists: payload }),
  soloData: [],
  updateSoloData: (payload) => set({
    soloData: payload
  }),
  cartData: [],
  updateCartData: (payload) => set({ cartData: payload }),
  modalOpen: false,
  updateModalOpen: () => set((state) => ({ modalOpen: !state.modalOpen })),
  number: "",
  updateNumber: (number) => set(({ number: number }))
}));

export default useStore