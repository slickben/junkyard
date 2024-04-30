import { defineStore } from 'pinia'
import  { type Plan, type GroupPlans} from '@/composables/useTypes'
export const useStore = defineStore('systemStore', {
  // arrow function recommended for full type inference
  state: () => {
    return {
      // all these properties will have their type inferred automatically
      selectedPlan: [] as Plan[],
    }
  },
  persist: true,
})