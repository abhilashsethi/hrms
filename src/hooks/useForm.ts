import {create} from 'zustand';
type FormStoreState = {
     tender: any;
     setTender: any;
  
};
const UseForm = create<FormStoreState>((set) => ({
  tender: {},
 
  setTender: async (data: FormStoreState) => set({ tender: {...data} }),
}));

export default UseForm;