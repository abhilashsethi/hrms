import { Tender } from 'types';
import {create} from 'zustand';
type FormStoreState = {
     tender: any;
     setTender: any;
  
};
const useFormStore = create<FormStoreState>((set) => ({
  tender: {},
 
  setTender: async (data: FormStoreState) => set({ tender: {...data} }),
}));

export default useFormStore;